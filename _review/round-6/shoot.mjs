// Phone screenshots for round 6: node _review/round-6/shoot.mjs <before|after> [name...]
// 390x844 at deviceScaleFactor 2, headless Chrome, against the worktree served on 127.0.0.1:8812.
// Each shot scrolls a selector to `top` px below the viewport top, then captures the viewport.
import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE = process.env.BASE || 'http://127.0.0.1:8812';
const OUT = fileURLToPath(new URL('./', import.meta.url));
const [phase, ...only] = process.argv.slice(2);

const SHOTS = [
  // 1. spacing around dividers
  { name: 'i1-ai-surfaces-sub', page: 'ai-surfaces.html', sel: 'h3.subsection', top: 220 },
  { name: 'i1-card-insurance-fig', page: 'card-insurance.html', sel: '.figure', idx: 1, top: 120 },
  { name: 'i1-fleet-sections', page: 'fleet-optimizer.html', sel: '[data-rail]', idx: 2, top: 260 },
  // 2. prototypes keep desktop shape
  { name: 'i2-ai-surfaces-composer', page: 'ai-surfaces.html', sel: '.figure', idx: 0, top: 80 },
  { name: 'i2-composer-spec', page: 'composer-spec.html', sel: '.figure', idx: 0, top: 80 },
  // 3. flows bleed to the edge
  { name: 'i3-card-chains', page: 'card-insurance.html', sel: '.chain-block', idx: 0, top: 120 },
  { name: 'i3-card-flow', page: 'card-insurance.html', sel: '.fh-scroll', idx: 0, top: 160 },
  // 4. hero lede
  { name: 'i4-ai-surfaces-hero', page: 'ai-surfaces.html', sel: 'body', top: 0 },
  { name: 'i4-composer-hero', page: 'composer-spec.html', sel: 'body', top: 0 },
  // 5. case details
  { name: 'i5-ai-details', page: 'ai-surfaces.html', sel: '.case-details', top: 80 },
  { name: 'i5-card-details', page: 'card-insurance.html', sel: '.case-details', top: 80 },
  // 6. home chat
  { name: 'i6-home-0s', page: 'index.html', sel: 'body', top: 0, wait: 800 },
  { name: 'i6-home-8s', page: 'index.html', sel: 'body', top: 0, wait: 9000 },
  { name: 'i6-home-20s', page: 'index.html', sel: 'body', top: 0, wait: 22000 },
  // 7. eyebrow to heading
  { name: 'i7-audit-questions', page: 'design-system-audit.html', sel: '#ld-faq', top: 160 },
  { name: 'i7-audit-who', page: 'design-system-audit.html', sel: '#ld-who', top: 120 },
  { name: 'i7-audit-desk', page: 'design-system-audit.html', sel: '#ld-faq', top: 140, w: 1400, h: 900, dsf: 1 },
  { name: 'i7-audit-who-desk', page: 'design-system-audit.html', sel: '#ld-who', top: 200, w: 1400, h: 900, dsf: 1 },
];

const port = 9800 + Math.floor(Math.random() * 150);
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${port}`, '--hide-scrollbars', '--window-size=390,844', 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
let tabs;
for (let i = 0; i < 40 && !tabs; i++) { await sleep(250); try { tabs = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); } catch {} }
const ws = new WebSocket(tabs.find(t => t.type === 'page').webSocketDebuggerUrl);
let id = 0; const pend = {};
ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend[m.id]) { pend[m.id](m); delete pend[m.id]; } };
await new Promise(r => (ws.onopen = r));
const send = (method, params = {}) => new Promise(r => { const i = ++id; pend[i] = r; ws.send(JSON.stringify({ id: i, method, params })); });

for (const s of SHOTS) {
  if (only.length && !only.some(o => s.name.startsWith(o))) continue;
  const w = s.w || 390;
  await send('Emulation.setDeviceMetricsOverride', { width: w, height: s.h || 844, deviceScaleFactor: s.dsf || 2, mobile: w < 768 });
  await send('Emulation.setTouchEmulationEnabled', { enabled: w < 768, maxTouchPoints: 5 });
  await send('Page.navigate', { url: `${BASE}/${s.page}?r6=${Date.now()}` });
  await sleep(s.wait ?? 4500);
  if (s.sel !== 'body') {
    await send('Runtime.evaluate', { expression: `(() => { const el = document.querySelectorAll(${JSON.stringify(s.sel)})[${s.idx || 0}]; if (!el) return 'none'; const y = el.getBoundingClientRect().top + scrollY - ${s.top}; document.documentElement.style.scrollBehavior='auto'; scrollTo(0, y); return y; })()` });
    await sleep(1500);
  }
  const r = await send('Page.captureScreenshot', { format: 'png' });
  const file = `${OUT}${s.name}-${phase}.png`;
  writeFileSync(file, Buffer.from(r.result.data, 'base64'));
  console.log('wrote', file.split('/').pop());
}
ws.close(); chrome.kill();
