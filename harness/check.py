#!/usr/bin/env python3
"""One command for "done": the source rules, then every page rendered at 1400px and 375px.

    python3 harness/check.py              # every page
    python3 harness/check.py about.html   # only these pages (the source check always runs on everything)

Serves the repo on a free local port, runs check_source.py, then check_pages_cli.mjs (headless Chrome).
Ends with one line: PASS or FAIL. Exit code 0 only when both pass.
"""
import glob
import os
import socket
import subprocess
import sys
import threading
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


class Quiet(SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass


def free_port():
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


def main():
    pages = sys.argv[1:] or sorted(
        os.path.basename(p) for p in glob.glob(os.path.join(ROOT, "*.html")) if not p.endswith(".dc.html")
    )

    print("== Source rules", flush=True)
    src = subprocess.run([sys.executable, os.path.join(ROOT, "harness", "check_source.py")], cwd=ROOT)

    port = free_port()
    server = ThreadingHTTPServer(("127.0.0.1", port), partial(Quiet, directory=ROOT))
    threading.Thread(target=server.serve_forever, daemon=True).start()
    print(f"\n== Rendered pages ({len(pages)} pages x 2 widths)", flush=True)
    try:
        pg = subprocess.run(["node", os.path.join(ROOT, "harness", "check_pages_cli.mjs"), f"http://127.0.0.1:{port}", *pages], cwd=ROOT)
    finally:
        server.shutdown()

    ok = src.returncode == 0 and pg.returncode == 0
    print("\n" + ("PASS" if ok else "FAIL") + f"  source {'ok' if src.returncode == 0 else 'failed'}, pages {'ok' if pg.returncode == 0 else 'failed'}")
    sys.exit(0 if ok else 1)


if __name__ == "__main__":
    main()
