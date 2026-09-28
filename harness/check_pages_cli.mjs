// Rendered-page checks from the command line: every page, at desktop and phone width, in headless Chrome.
// Called by harness/check.py (which serves the repo); run it directly with: node harness/check_pages_cli.mjs <base-url> <page.html>...
// Prints one line per page and width; exits 1 if any page fails.
import { spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const WIDTHS = [1400, 375];
const [base, ...pages] = process.argv.slice(2);
const script = readFileSync(fileURLToPath(new URL('./check_pages.js', import.meta.url)), 'utf8');
const port = 9400 + Math.floor(Math.random() * 400);

const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${port}`, '--hide-scrollbars', 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
let tabs;
for (let i = 0; i < 40 && !tabs; i++) { await sleep(250); try { tabs = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); } catch {} }
const ws = new WebSocket(tabs.find(t => t.type === 'page').webSocketDebuggerUrl);
let id = 0; const pend = {};
ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend[m.id]) { pend[m.id](m); delete pend[m.id]; } };
await new Promise(r => (ws.onopen = r));
const send = (method, params = {}) => new Promise(r => { const i = ++id; pend[i] = r; ws.send(JSON.stringify({ id: i, method, params })); });

let failed = 0;
for (const w of WIDTHS) {
  await send('Emulation.setDeviceMetricsOverride', { width: w, height: 900, deviceScaleFactor: 1, mobile: w < 768 });
  for (const p of pages) {
    await send('Page.navigate', { url: `${base}/${p}` });
    await sleep(4500); // dc components, the sky and the case index render after load
    const r = await send('Runtime.evaluate', { expression: script, returnByValue: true, awaitPromise: true });
    const v = r.result?.result?.value;
    const text = typeof v === 'string' ? v : JSON.stringify(v ?? r.result?.exceptionDetails?.text ?? 'no result');
    const ok = /::\s*pass\s*$/.test(text.trim());
    if (!ok) failed++;
    console.log(`${ok ? 'pass' : 'FAIL'}  ${String(w).padStart(4)}px  ${p}${ok ? '' : '\n      ' + text.split('\n').join('\n      ')}`);
  }
}
// once with reduced motion on (MOT-01, ILL-03), for the pages with case scenes: nothing loops, scenes rest resolved
const still = pages.filter(p => ['index.html', 'work.html'].includes(p));
if (still.length) {
  await send('Emulation.setDeviceMetricsOverride', { width: 1400, height: 900, deviceScaleFactor: 1, mobile: false });
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  for (const p of still) {
    await send('Page.navigate', { url: `${base}/${p}` });
    await sleep(4500);
    const r = await send('Runtime.evaluate', { expression: script, returnByValue: true, awaitPromise: true });
    const v = r.result?.result?.value;
    const text = typeof v === 'string' ? v : JSON.stringify(v ?? r.result?.exceptionDetails?.text ?? 'no result');
    const ok = /::\s*pass\s*$/.test(text.trim());
    if (!ok) failed++;
    console.log(`${ok ? 'pass' : 'FAIL'}  1400px  ${p} (reduced motion)${ok ? '' : '\n      ' + text.split('\n').join('\n      ')}`);
  }
}
ws.close(); chrome.kill();
process.exit(failed ? 1 : 0);
