#!/usr/bin/env python3
"""List the token changes the design system artifact hasn't received since the last sync.

    python3 .claude/skills/ds-sync/scripts/drift.py --drift       # drift report
    python3 .claude/skills/ds-sync/scripts/drift.py --mark-sent   # after a verified sync: record the current tokens

"Last sync" is a copy of the token files kept in .claude/skills/ds-sync/last-sync/.
Other scripts import DS (the _ds path) and DECL (the token parser) from here.
"""
import glob
import os
import re
import shutil
import sys

ROOT = __file__.split('/.claude/')[0] + '/'
DS = ROOT + '_ds/nayara-silva-design-system-5f30f372-bc41-4da8-94b0-1429300e4b96/'
LAST = ROOT + '.claude/skills/ds-sync/last-sync/'

DECL = re.compile(r'--([a-z0-9-]+):\s*([^;]+);')


def tokens(folder):
    out = {}
    for f in sorted(glob.glob(folder + '*.css')):
        for k, v in DECL.findall(open(f).read()):
            out[k] = (v.strip(), os.path.basename(f))
    return out


def drift():
    now, last = tokens(DS + 'tokens/'), tokens(LAST)
    if not last:
        print('No previous sync recorded: everything counts as new. Run --mark-sent after a verified /ds-sync.')
        return []
    changes = []
    for k in sorted(set(now) | set(last)):
        a, b = last.get(k), now.get(k)
        if a and b and a[0] != b[0]:
            changes.append(('changed', b[1], k, a[0], b[0]))
        elif b and not a:
            changes.append(('added', b[1], k, '', b[0]))
        elif a and not b:
            changes.append(('removed', a[1], k, a[0], ''))
    if not changes:
        print('No token drift: the artifact should match the repo.')
    else:
        print('Token changes since the last sync (the artifact still has the old side):')
        for kind, f, k, old, new in changes:
            print('  %-8s %-14s --%s: %s -> %s' % (kind, f, k, old or '(none)', new or '(none)'))
    return changes


def mark_sent():
    if os.path.exists(LAST):
        shutil.rmtree(LAST)
    os.makedirs(LAST)
    for f in glob.glob(DS + 'tokens/*.css'):
        shutil.copy(f, LAST)
    print('Recorded the current tokens as the last sync.')


if __name__ == '__main__':
    if '--mark-sent' in sys.argv:
        mark_sent()
    else:
        drift()
