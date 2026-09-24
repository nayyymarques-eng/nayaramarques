#!/usr/bin/env python3
"""Package the design system for Claude Design and list what changed since the last handoff.

    python3 .claude/skills/ds-handoff/scripts/handoff.py            # drift report + package
    python3 .claude/skills/ds-handoff/scripts/handoff.py --drift    # drift report only
    python3 .claude/skills/ds-handoff/scripts/handoff.py --mark-sent
        # after Nayara confirms Claude Design matches: record the current tokens as sent

The package goes to ~/Downloads/nayara-marques-design-system/ (+ .zip):
tokens/*.css, readme.md, _ds_manifest.json, styles.css, _ds_bundle.js, RULES.md (CLAUDE.md), logo-mark.svg.
"Last handoff" is a copy of the token files kept in .claude/skills/ds-handoff/last-handoff/.
"""
import glob
import os
import re
import shutil
import sys

ROOT = __file__.split('/.claude/')[0] + '/'
DS = ROOT + '_ds/nayara-silva-design-system-5f30f372-bc41-4da8-94b0-1429300e4b96/'
LAST = ROOT + '.claude/skills/ds-handoff/last-handoff/'
OUT = os.path.expanduser('~/Downloads/nayara-marques-design-system')

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
        print('No previous handoff recorded: everything counts as new. Run --mark-sent once Claude Design matches.')
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
        print('No token drift: Claude Design should match the repo.')
    else:
        print('Token changes since the last handoff (Claude Design still has the old side):')
        for kind, f, k, old, new in changes:
            print('  %-8s %-14s --%s: %s -> %s' % (kind, f, k, old or '(none)', new or '(none)'))
    return changes


def package():
    if os.path.exists(OUT):
        shutil.rmtree(OUT)
    os.makedirs(OUT + '/tokens')
    for f in glob.glob(DS + 'tokens/*.css'):
        shutil.copy(f, OUT + '/tokens/')
    for f in ('readme.md', '_ds_manifest.json', 'styles.css', '_ds_bundle.js'):
        shutil.copy(DS + f, OUT)
    shutil.copy(ROOT + 'CLAUDE.md', OUT + '/RULES.md')
    shutil.copy(ROOT + 'favicon.svg', OUT + '/logo-mark.svg')
    zip_path = shutil.make_archive(OUT, 'zip', os.path.dirname(OUT), os.path.basename(OUT))
    print('\nPackage: %s/ and %s (%d KB)' % (OUT, zip_path, os.path.getsize(zip_path) // 1024))


def mark_sent():
    if os.path.exists(LAST):
        shutil.rmtree(LAST)
    os.makedirs(LAST)
    for f in glob.glob(DS + 'tokens/*.css'):
        shutil.copy(f, LAST)
    print('Recorded the current tokens as the last handoff.')


if __name__ == '__main__':
    if '--mark-sent' in sys.argv:
        mark_sent()
    else:
        drift()
        if '--drift' not in sys.argv:
            package()
