#!/usr/bin/env python3
"""Compare the repo's token files with the design system artifact's tokens.json.

    python3 .claude/skills/ds-sync/scripts/diff.py <tokens.json>

<tokens.json> is `project/tokens.json`, read from the artifact. Per token it prints one of:
  changed        the artifact has another value than the repo
  missing        in the repo, not in the artifact
  artifact only  in the artifact, not in the repo
Tokens the artifact format cannot hold (shorthands, motion, font stacks) are listed as skipped. `var(--x)` in the repo equals `{x}` in the artifact; a `color-mix(in srgb, …)` is compared
as the hex Chrome paints. Exit code: 0 when the artifact matches, 1 when it does not.
"""
import glob
import json
import math
import os
import re
import sys

sys.path.insert(0, __file__.split('/.claude/')[0] + '/.claude/skills/ds-sync/scripts')
from drift import DS  # noqa: E402  (one definition of the _ds path)

LINE = re.compile(r'--([a-z0-9-]+):\s*([^;]+);')
VAR = re.compile(r'^var\(--([a-z0-9-]+)\)$')
# fonts.css: stacks live under type.families; motion.css: the format has no motion family
NOT_STORED = ('fonts.css', 'motion.css')
MIX = re.compile(r'^color-mix\(in srgb,\s*(\S+)\s+(\d+(?:\.\d+)?)%,\s*(\S+?)\)$')


def repo_tokens():
    """name -> (value, file), in file order."""
    out = {}
    for f in sorted(glob.glob(DS + 'tokens/*.css')):
        for k, v in LINE.findall(open(f).read()):
            out[k] = (v.strip(), os.path.basename(f))
    return out


def hexrgb(ref, repo):
    m = VAR.match(ref)
    if m:
        ref = repo[m.group(1)][0]
    ref = ref.lstrip('#')
    if len(ref) == 3:
        ref = ''.join(ch * 2 for ch in ref)
    return [int(ref[i:i + 2], 16) for i in (0, 2, 4)]


def to_artifact(value, repo):
    m = VAR.match(value)
    if m:
        return '{%s}' % m.group(1)
    m = MIX.match(value)
    if m:
        a, p, b = hexrgb(m.group(1), repo), float(m.group(2)) / 100, hexrgb(m.group(3), repo)
        # halves round down, as Chrome paints them (--note: blue 233.5 -> e9)
        return '#' + ''.join('%02x' % math.ceil(x * p + y * (1 - p) - 0.5) for x, y in zip(a, b))
    return value


def artifact_values(data):
    out = {}
    for block in data.values():
        if isinstance(block, dict) and isinstance(block.get('tokens'), list):
            for e in block['tokens']:
                v = e['value']
                out[e['name']] = v.get('light', next(iter(v.values()))) if isinstance(v, dict) else v
    return out


def main(path):
    repo, art = repo_tokens(), artifact_values(json.load(open(path)))
    lines, skipped = [], []
    for name, (value, fname) in repo.items():
        want = to_artifact(value, repo)
        if name in art:
            if str(art[name]).lower() != want.lower():
                lines.append('  changed        %-16s %s -> %s' % (name, art[name], want))
        elif fname == 'colors.css' or (fname not in NOT_STORED and not re.search(r'\s|var\(', value)):
            lines.append('  missing        %-16s %s' % (name, want))
        else:
            skipped.append(name)
    lines += ['  artifact only  %-16s %s' % (n, art[n]) for n in sorted(set(art) - set(repo))]
    print('\n'.join(lines) or 'The artifact matches the repo.')
    if skipped:
        print('Skipped, no place in the artifact format: ' + ', '.join(skipped))
    return 1 if lines else 0


if __name__ == '__main__':
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    sys.exit(main(sys.argv[1]))
