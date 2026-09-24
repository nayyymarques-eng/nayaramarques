#!/usr/bin/env python3
"""Compare the repo's token files with the copies fetched from Claude Design.

    python3 .claude/skills/ds-sync/scripts/diff.py <remote_dir>

<remote_dir> holds the files read with DesignSync get_file, saved under their project paths
(e.g. <remote_dir>/tokens/colors.css). Prints, per token file, whether Claude Design has it,
has it byte for byte, or differs (token by token, plus "comments/formatting only" when the
values agree but the text does not). Ends with the paths to put in the plan's writes.
Exit code: 0 when nothing needs writing, 1 when something does.
"""
import glob
import os
import sys

sys.path.insert(0, __file__.split('/.claude/')[0] + '/.claude/skills/ds-handoff/scripts')
from handoff import DECL, DS  # noqa: E402  (one definition of the token parser and the _ds path)


def decls(text):
    return {k: v.strip() for k, v in DECL.findall(text)}


def main(remote_dir):
    writes = []
    for local in sorted(glob.glob(DS + 'tokens/*.css')):
        path = 'tokens/' + os.path.basename(local)
        remote = os.path.join(remote_dir, path)
        mine = open(local).read()
        if not os.path.exists(remote):
            print('%-22s missing in Claude Design (new file)' % path)
            writes.append(path)
            continue
        theirs = open(remote).read()
        if theirs == mine:
            print('%-22s same' % path)
            continue
        a, b = decls(theirs), decls(mine)
        lines = []
        for k in sorted(set(a) | set(b)):
            if a.get(k) != b.get(k):
                lines.append('    --%s: %s -> %s' % (k, a.get(k, '(none)'), b.get(k, '(none)')))
        print('%-22s differs%s' % (path, '' if lines else ': comments/formatting only'))
        if lines:
            print('\n'.join(lines))
        writes.append(path)
    print('\nWrites: ' + (', '.join(writes) if writes else 'none, Claude Design matches the repo.'))
    return 1 if writes else 0


if __name__ == '__main__':
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    sys.exit(main(sys.argv[1]))
