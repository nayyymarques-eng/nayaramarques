// Rendered-page checks from the command line: every page, at desktop and phone width, in headless Chrome.
// Called by harness/check.py (which serves the repo); run it directly with: node harness/check_pages_cli.mjs <base-url> <page.html>...
// Prints one line per page and width; exits 1 if any page fails.
import { spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// Chrome: the CHROME variable when set (GitHub Actions sets it to google-chrome on its Linux runner), else the Mac's Google Chrome.
const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const WIDTHS = [1400, 375];
const [base, ...pages] = process.argv.slice(2);
const script = readFileSync(fileURLToPath(new URL('./check_pages.js', import.meta.url)), 'utf8');
const port = 9400 + Math.floor(Math.random() * 400);

// On a CI runner (CI=true) Chrome runs without its sandbox, which a Linux runner may not allow; it only opens this repo's pages.
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${port}`, '--hide-scrollbars', ...(process.env.CI ? ['--no-sandbox'] : []), 'about:blank'], { stdio: 'ignore' });
chrome.on('error', e => { console.log(`FAIL  Chrome did not start (${CHROME}: ${e.code || e.message}). Set CHROME to the browser's path.`); process.exit(1); });
const sleep = ms => new Promise(r => setTimeout(r, ms));
let tabs;
for (let i = 0; i < 40 && !tabs; i++) { await sleep(250); try { tabs = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); } catch {} }
if (!tabs) { console.log(`FAIL  Chrome did not answer (${CHROME}). Set CHROME to the browser's path.`); chrome.kill(); process.exit(1); }
const ws = new WebSocket(tabs.find(t => t.type === 'page').webSocketDebuggerUrl);
let id = 0; const pend = {};
ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend[m.id]) { pend[m.id](m); delete pend[m.id]; } };
await new Promise(r => (ws.onopen = r));
const send = (method, params = {}) => new Promise(r => { const i = ++id; pend[i] = r; ws.send(JSON.stringify({ id: i, method, params })); });

// Rules that depend on the font's metrics (wraps, widths set by text); see the CI note below.
const FONTE = ['LAY-06', 'SEC-06', 'SKY-02', 'TYP-04', 'ILL-07'];
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
    // On a CI runner the system face (SF Pro) is missing and Linux substitutes a wider one, so rules that measure
    // text wraps and widths can fail there only. On CI, a page whose every finding is one of those rules is a
    // warning ("só no Mac"); her Mac run (harness/check.py) still enforces them.
    const fonte = process.env.CI && !ok && text.split('::').slice(1).join('::').split(/\s;\s|\n/).map(x => x.trim()).filter(Boolean).every(x => FONTE.some(r => x.startsWith(r)));
    if (!ok && !fonte) failed++;
    console.log(`${ok ? 'pass' : fonte ? 'aviso (só no Mac)' : 'FAIL'}  ${String(w).padStart(4)}px  ${p}${ok ? '' : '\n      ' + text.split('\n').join('\n      ')}`);
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
