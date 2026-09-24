#!/usr/bin/env python3
"""Find components that need a verdict, and record verdicts.

    python3 .claude/skills/ds-proposals/scripts/proposals.py scan [--all] [--json]
    python3 .claude/skills/ds-proposals/scripts/proposals.py record <fingerprint> <verdict> --note "…" [--who Nayara]
    python3 .claude/skills/ds-proposals/scripts/proposals.py stats

scan    lists every item that needs a person, marked NEW (never judged) or EXPIRED (judged, then changed).
        Judged items are counted, not listed (--all lists them too). Kinds:
          marker    a <!-- proposal: … --> comment on a page (CMP-03): AI drew something it found no fit for
          copy      a site component (*.dc.html) with the same name as a design-system component, used by no page
          shadow    a site component with a design-system twin that pages DO use instead of the system one
          orphan    a site component with no design-system twin, used by no page
        It also prints, as context and not as findings, the design-system components no page uses:
        where a page hand-draws one of those, that is a fold waiting to be found.
record  stores a verdict in harness/verdicts.json against the item's current value, so the verdict
        expires by itself when the item changes. Verdicts: promote, fold, keep-local, retire.
stats   verdict counts by kind: the Learn stage (which parts AI keeps missing, which rules are unclear).

Fingerprint = kind|file|subject (never a line number). Value = a hash of what was judged.
"""
import datetime
import glob
import hashlib
import json
import os
import re
import sys

sys.path.insert(0, __file__.split('/.claude/')[0] + '/.claude/skills/ds-handoff/scripts')
from handoff import DS, ROOT  # noqa: E402  (one definition of the repo root and the _ds path)

VERDICTS = ROOT + 'harness/verdicts.json'
VALID = ('promote', 'fold', 'keep-local', 'retire')
MARKER = re.compile(r'<!--\s*proposal:(.*?)-->', re.S)


def manifest():
    m = json.load(open(DS + '_ds_manifest.json'))
    return m['namespace'], {c['name'] for c in m['components']}


def h(text):
    return hashlib.sha1(text.encode()).hexdigest()[:12]


def items():
    ns, system = manifest()
    pages = sorted(p for p in glob.glob(ROOT + '*.html') if not p.endswith('.dc.html'))
    local = {os.path.basename(p)[:-len('.dc.html')]: p for p in glob.glob(ROOT + '*.dc.html')}
    src = {p: open(p).read() for p in pages + list(local.values())}

    # Which site components a page reaches, following imports between components.
    def imports(text):
        return set(re.findall(r'<dc-import name="([A-Za-z]+)"', text))
    used, todo = set(), set().union(*(imports(src[p]) for p in pages))
    while todo:
        n = todo.pop()
        if n in used or n not in local:
            continue
        used.add(n)
        todo |= imports(src[local[n]])
    used_system = set().union(*(set(re.findall(re.escape(ns) + r'\.([A-Za-z]+)', src[p])) for p in pages))

    out = []
    for p in pages:
        text, name = src[p], os.path.basename(p)
        for m in MARKER.finditer(text):
            note = ' '.join(m.group(1).split())
            after = text[m.end():m.end() + 600]
            out.append(dict(kind='marker', file=name, subject=note[:80], line=text.count('\n', 0, m.start()) + 1,
                            value=h(note + after), detail=note))
    for n, p in sorted(local.items()):
        f = os.path.basename(p)
        if n in system and n not in used:
            out.append(dict(kind='copy', file=f, subject=n, value=h(src[p]),
                            detail='same name as system %s; no page imports it' % n))
        elif n in system:
            users = [os.path.basename(q) for q in pages if '<dc-import name="%s"' % n in src[q]]
            out.append(dict(kind='shadow', file=f, subject=n, value=h(src[p]),
                            detail='pages use this instead of system %s (%d pages)' % (n, len(users))))
        elif n not in used:
            out.append(dict(kind='orphan', file=f, subject=n, value=h(src[p]),
                            detail='no system twin; no page imports it'))
    for it in out:
        it['fingerprint'] = '%s|%s|%s' % (it['kind'], it['file'], it['subject'])
    unused_system = sorted(system - used_system - used)
    return out, unused_system


def load():
    return json.load(open(VERDICTS)) if os.path.exists(VERDICTS) else []


def status(it, verdicts):
    v = next((v for v in verdicts if v['fingerprint'] == it['fingerprint']), None)
    if not v:
        return 'NEW', None
    return ('JUDGED' if v['value'] == it['value'] else 'EXPIRED'), v


def scan(show_all, as_json):
    found, unused_system = items()
    verdicts = load()
    rows = []
    for it in found:
        st, v = status(it, verdicts)
        rows.append(dict(it, status=st, verdict=v))
    if as_json:
        print(json.dumps(dict(items=rows, unused_system=unused_system), indent=1))
        return
    open_rows = [r for r in rows if r['status'] != 'JUDGED']
    for r in (rows if show_all else open_rows):
        where = r['file'] + (':%d' % r['line'] if 'line' in r else '')
        print('%-8s %-7s %-28s %s' % (r['status'], r['kind'], where, r['detail']))
        if r['verdict']:
            v = r['verdict']
            print('         was: %s by %s on %s (%s)' % (v['verdict'], v['who'], v['when'], v['note']))
        print('         fingerprint: %s' % r['fingerprint'])
    judged = len(rows) - len(open_rows)
    print('\n%d need a verdict, %d judged.' % (len(open_rows), judged))
    print('System components no page uses (look for hand-drawn copies of these): ' +
          (', '.join(unused_system) or 'none'))


def record(fp, verdict, note, who):
    if verdict not in VALID:
        sys.exit('verdict must be one of: ' + ', '.join(VALID))
    if not note:
        sys.exit('--note is required: say why, in one line')
    it = next((i for i in items()[0] if i['fingerprint'] == fp), None)
    if not it:
        sys.exit('no current item has that fingerprint; run scan and copy it exactly')
    verdicts = [v for v in load() if v['fingerprint'] != fp]
    verdicts.append(dict(fingerprint=fp, value=it['value'], verdict=verdict, who=who,
                         when=datetime.date.today().isoformat(), note=note))
    verdicts.sort(key=lambda v: v['fingerprint'])
    with open(VERDICTS, 'w') as f:
        json.dump(verdicts, f, indent=2, ensure_ascii=False)
        f.write('\n')
    print('Recorded %s for %s.' % (verdict, fp))


def stats():
    verdicts = load()
    if not verdicts:
        print('No verdicts yet.')
        return
    table = {}
    for v in verdicts:
        kind = v['fingerprint'].split('|')[0]
        table.setdefault(kind, {}).setdefault(v['verdict'], 0)
        table[kind][v['verdict']] += 1
    for kind, counts in sorted(table.items()):
        print('%-8s %s' % (kind, ', '.join('%s %d' % kv for kv in sorted(counts.items()))))
    print('\nMany folds on markers: AI is missing existing parts, so sharpen their rules. '
          'Many promotes: the system has real gaps.')


if __name__ == '__main__':
    a = sys.argv[1:]
    if not a or a[0] not in ('scan', 'record', 'stats'):
        sys.exit(__doc__)
    if a[0] == 'scan':
        scan('--all' in a, '--json' in a)
    elif a[0] == 'stats':
        stats()
    else:
        if len(a) < 3:
            sys.exit(__doc__)
        opt = lambda k, d='': a[a.index(k) + 1] if k in a else d  # noqa: E731
        record(a[1], a[2], opt('--note'), opt('--who', 'Nayara'))
