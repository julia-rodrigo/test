// Renders the Pinterest pins (PNG, 1000x1500) and the lead-magnet PDF.
// Change BRAND or AFF_LINK below, then run: node business-kit/src/build.js
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BRAND = 'Solo Stack';
const AFF_LINK = 'systeme.io/?sa=YOUR-ID';
const CHECKED = 'Nov 2026';

const out = path.join(__dirname, '..');
const check = (c) =>
  `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="${c}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.5l5.2 5.2L20 6.8"/></svg>`;
const cross = (c) =>
  `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="${c}" stroke-width="3.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>`;

const base = `
*{box-sizing:border-box;margin:0;padding:0}
:root{--ink:#14172B;--cream:#F6F1E7;--coral:#FF5A3C;--sun:#FFD166;--mint:#1F9D76;--mute:#6B6F85}
html,body{width:1000px;height:1500px}
body{font-family:'Inter Display','Inter',sans-serif;-webkit-font-smoothing:antialiased;display:flex;flex-direction:column;padding:84px 80px 64px}
.eyebrow{font:700 26px/1 'Inter',sans-serif;letter-spacing:.16em;text-transform:uppercase}
.pill{display:inline-block;padding:16px 26px;border-radius:999px}
h1{font-weight:800;letter-spacing:-.035em;line-height:.98}
.foot{margin-top:auto;display:flex;justify-content:space-between;align-items:flex-end;font:600 24px/1.3 'Inter',sans-serif}
.brand{font:800 30px/1 'Inter Display',sans-serif;letter-spacing:-.02em}
.small{font:500 19px/1.35 'Inter',sans-serif;opacity:.7}
`;

const pins = {
  'pin-1-free-plan-review': `
<style>${base}
body{background:var(--ink);color:var(--cream)}
.pill{background:var(--coral);color:var(--ink)}
h1{font-size:120px;margin-top:56px}
h1 em{font-style:normal;color:var(--sun)}
.list{margin-top:60px;display:flex;flex-direction:column;gap:18px}
.row{display:flex;align-items:center;gap:22px;background:#1F2340;border-radius:22px;padding:34px 32px;font:700 44px/1 'Inter Display',sans-serif}
.row svg{font-size:40px;flex:none}
.sub{margin-top:52px;font:500 36px/1.3 'Inter',sans-serif;color:#C9CBDA}
.cta{margin-top:48px;align-self:flex-start;background:var(--coral);color:var(--ink);font:800 38px/1 'Inter Display',sans-serif;padding:30px 40px;border-radius:999px}
.sub b{color:var(--cream);font-weight:700}
</style>
<div><span class="eyebrow pill">Free plan review</span></div>
<h1>Website, email list &amp; sales page for <em>$0?</em></h1>
<div class="list">
  <div class="row">${check('#FFD166')}Landing pages &amp; funnels</div>
  <div class="row">${check('#FFD166')}Email list up to 2,000 contacts</div>
  <div class="row">${check('#FFD166')}Checkout, blog &amp; one course</div>
</div>
<p class="sub">What Systeme.io's free plan <b>actually includes</b> &mdash; and the <b>4 limits</b> to know before you sign up.</p>
<div class="cta">See the full breakdown &rarr;</div>
<div class="foot"><span class="brand">${BRAND}</span><span class="small">Contains an affiliate link</span></div>`,

  'pin-2-cheat-sheet': `
<style>${base}
body{background:var(--cream);color:var(--ink);padding-top:72px}
.eyebrow{color:var(--coral)}
h1{font-size:90px;margin-top:22px}
.panel{border-radius:28px;padding:34px 38px;margin-top:34px}
.get{background:#fff;border:3px solid var(--ink)}
.catch{background:var(--ink);color:var(--cream)}
.panel h2{font:800 30px/1 'Inter',sans-serif;letter-spacing:.12em;text-transform:uppercase;margin-bottom:22px}
.get h2{color:var(--mint)} .catch h2{color:var(--sun)}
li{list-style:none;display:flex;align-items:center;gap:18px;font:600 38px/1.2 'Inter',sans-serif;padding:13px 0}
li svg{font-size:32px;flex:none}
li b{font-weight:800}
</style>
<span class="eyebrow">Cheat sheet</span>
<h1>Systeme.io free plan: what $0 gets you</h1>
<div class="panel get"><h2>Included</h2><ul>
  <li>${check('#1F9D76')}<span><b>2,000</b> contacts</span></li>
  <li>${check('#1F9D76')}<span><b>3</b> sales funnels</span></li>
  <li>${check('#1F9D76')}<span><b>Unlimited</b> emails sent</span></li>
  <li>${check('#1F9D76')}<span><b>1</b> blog + <b>1</b> course (500 students)</span></li>
  <li>${check('#1F9D76')}<span><b>1</b> custom domain, no credit card</span></li>
</ul></div>
<div class="panel catch"><h2>The catches</h2><ul>
  <li>${cross('#FF5A3C')}<span>Only <b>1</b> email campaign</span></li>
  <li>${cross('#FF5A3C')}<span>Only <b>1</b> automation rule</span></li>
  <li>${cross('#FF5A3C')}<span><b>$10,000</b> total sales cap</span></li>
  <li>${cross('#FF5A3C')}<span>Deactivated after <b>6 months</b> idle</span></li>
</ul></div>
<div class="foot"><span class="brand">${BRAND}</span><span class="small">Checked against the official pricing page, ${CHECKED}.<br>Contains an affiliate link.</span></div>`,

  'pin-3-five-tools': `
<style>${base}
body{background:var(--coral);color:var(--ink)}
.eyebrow{opacity:.75}
h1{font-size:108px;margin-top:30px}
.stack{margin-top:60px;display:flex;flex-wrap:wrap;gap:16px}
.tool{font:700 40px/1 'Inter',sans-serif;padding:28px 34px;border-radius:18px;background:rgba(20,23,43,.12);text-decoration:line-through;text-decoration-thickness:4px}
.one{margin-top:28px;display:inline-flex;align-items:center;gap:18px;background:var(--ink);color:var(--cream);font:800 50px/1 'Inter Display',sans-serif;padding:36px 40px;border-radius:22px}
.one svg{font-size:44px}
.sub{margin-top:54px;font:600 40px/1.3 'Inter',sans-serif}
.cta{margin-top:48px;align-self:flex-start;border:4px solid var(--ink);font:800 36px/1 'Inter Display',sans-serif;padding:26px 38px;border-radius:999px}
.small{opacity:.8}
</style>
<span class="eyebrow">For one-person businesses</span>
<h1>Paying for 5 tools to run a business of one?</h1>
<div class="stack">
  <span class="tool">Page builder</span><span class="tool">Email tool</span><span class="tool">Checkout</span><span class="tool">Blog host</span><span class="tool">Course host</span>
</div>
<div><span class="one">${check('#FFD166')}One free plan covers all five</span></div>
<p class="sub">Here's what you get on Systeme.io for $0 &mdash; and what you don't.</p>
<div class="cta">See the full breakdown &rarr;</div>
<div class="foot"><span class="brand">${BRAND}</span><span class="small">Contains an affiliate link</span></div>`,

  'pin-4-free-checklist': `
<style>${base}
body{background:var(--sun);color:var(--ink)}
.pill{background:var(--ink);color:var(--sun)}
h1{font-size:106px;margin-top:52px}
.card{margin-top:56px;background:var(--cream);border:4px solid var(--ink);border-radius:30px;padding:26px 38px;box-shadow:14px 14px 0 var(--ink)}
.item{display:flex;align-items:center;gap:24px;padding:30px 0;border-bottom:2px solid rgba(20,23,43,.14);font:700 39px/1.2 'Inter',sans-serif}
.item:last-child{border:0}
.box{flex:none;width:52px;height:52px;border:4px solid var(--ink);border-radius:12px;display:grid;place-items:center;font-size:34px;background:#fff}
.item span span{display:block;font:500 26px/1.3 'Inter',sans-serif;color:var(--mute);margin-top:6px}
.cta{margin-top:56px;align-self:flex-start;background:var(--coral);color:var(--ink);font:800 38px/1 'Inter Display',sans-serif;padding:30px 40px;border-radius:999px}
</style>
<div><span class="eyebrow pill">Free checklist</span></div>
<h1>3 AI tools to try before you pay for anything</h1>
<div class="card">
  <div class="item"><div class="box">${check('#14172B')}</div><span>Write faster<span>emails, captions, product copy</span></span></div>
  <div class="item"><div class="box">${check('#14172B')}</div><span>Design without a designer<span>graphics, PDFs, pins</span></span></div>
  <div class="item"><div class="box">${check('#14172B')}</div><span>Collect emails &amp; sell<span>pages, list and checkout in one</span></span></div>
</div>
<div class="cta">Get the 1-page checklist &rarr;</div>
<div class="foot"><span class="brand">${BRAND}</span><span class="small">All three have free plans</span></div>`,
};

const pdf = `
<style>
*{box-sizing:border-box;margin:0;padding:0}
@page{size:Letter;margin:0}
body{font-family:'Inter',sans-serif;color:#14172B;background:#F6F1E7;width:8.5in;height:11in;padding:.55in .65in .45in;display:flex;flex-direction:column;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.eyebrow{font:700 10.5pt/1 'Inter';letter-spacing:.16em;text-transform:uppercase;color:#D8432A}
h1{font:800 31pt/1.02 'Inter Display';letter-spacing:-.03em;margin-top:8pt}
.lede{font:500 11.5pt/1.45 'Inter';color:#3D415A;margin-top:9pt;max-width:6.3in}
.tool{background:#fff;border:1.5pt solid #14172B;border-radius:12pt;padding:12pt 15pt;margin-top:11pt;display:grid;grid-template-columns:34pt 1fr;column-gap:12pt}
.num{width:34pt;height:34pt;border-radius:50%;background:#14172B;color:#FFD166;font:800 15pt/34pt 'Inter Display';text-align:center}
h2{font:800 14.5pt/1.15 'Inter Display';letter-spacing:-.01em}
h2 small{font:600 9.5pt/1 'Inter';color:#1F9D76;letter-spacing:.06em;text-transform:uppercase;margin-left:6pt}
p{font:400 10.3pt/1.45 'Inter';color:#3D415A;margin-top:3.5pt}
p b{color:#14172B}
.todo{display:flex;gap:8pt;align-items:flex-start;margin-top:6.5pt;font:600 10.3pt/1.4 'Inter'}
.box{flex:none;width:11pt;height:11pt;border:1.5pt solid #14172B;border-radius:2.5pt;margin-top:1.5pt;background:#fff}
.rule{margin-top:12pt;background:#14172B;color:#F6F1E7;border-radius:12pt;padding:12pt 15pt}
.rule h3{font:800 10.5pt/1 'Inter';letter-spacing:.12em;text-transform:uppercase;color:#FFD166}
.rule ol{margin:6pt 0 0 14pt;font:500 10.3pt/1.5 'Inter'}
.foot{margin-top:auto;padding-top:9pt;display:flex;justify-content:space-between;gap:20pt;align-items:flex-end;font:400 7.6pt/1.4 'Inter';color:#6B6F85}
.foot b{font:800 12pt/1 'Inter Display';color:#14172B;white-space:nowrap}
</style>
<span class="eyebrow">Free checklist</span>
<h1>The AI Tool Starter Checklist</h1>
<p class="lede">Three free tools cover writing, design, and selling for a one-person business. Set these up, use them for two weeks, and only then decide whether anything is worth paying for.</p>

<div class="tool"><div class="num">1</div><div>
  <h2>An AI assistant: ChatGPT or Claude <small>free plan</small></h2>
  <p><b>Use it for:</b> first drafts of emails, product descriptions, captions and content ideas. Pick one, not both.</p>
  <div class="todo"><div class="box"></div>Ask it for 3 versions of a one-sentence description of what you sell and who it's for.</div>
  <div class="todo"><div class="box"></div>Save the prompt that worked. Reusing good prompts is where the time savings come from.</div>
</div></div>

<div class="tool"><div class="num">2</div><div>
  <h2>Canva <small>free plan</small></h2>
  <p><b>Use it for:</b> social graphics, simple PDFs like this one, and anything visual you'd otherwise pay a designer for.</p>
  <div class="todo"><div class="box"></div>Pick 2 colors and 1 font, and build one template you'll reuse for every post.</div>
</div></div>

<div class="tool"><div class="num">3</div><div>
  <h2>Systeme.io <small>free plan</small></h2>
  <p><b>Use it for:</b> landing pages, your email list and a checkout in one account. The free plan includes 2,000 contacts, 3 sales funnels and unlimited emails, with no credit card. <b>Know the limits:</b> 1 email campaign and 1 automation rule.</p>
  <div class="todo"><div class="box"></div>Build one opt-in page that offers something useful in exchange for an email address.</div>
  <div class="todo"><div class="box"></div>Write a 3-email welcome sequence with your AI assistant from step 1.</div>
  <p style="margin-top:6pt"><b>Start free:</b> ${AFF_LINK}</p>
</div></div>

<div class="rule"><h3>Before you pay for any AI tool, ask</h3>
<ol><li>Does a free tool I already have do 80% of this?</li><li>Will I use it every week, or just this once?</li><li>Can I cancel monthly if it doesn't earn its keep?</li></ol></div>

<div class="foot"><span>The Systeme.io link is an affiliate link: if you later upgrade to a paid plan, I earn a commission at no extra cost to you. Systeme.io details checked against its pricing page, ${CHECKED}. Free plans change, so confirm on each tool's own pricing page.</span><b>${BRAND}</b></div>`;

(async () => {
  const browser = await chromium.launch();
  fs.mkdirSync(path.join(out, 'pins'), { recursive: true });
  fs.mkdirSync(path.join(out, 'lead-magnet'), { recursive: true });
  const page = await browser.newPage({ viewport: { width: 1000, height: 1500 }, deviceScaleFactor: 1 });
  for (const [name, html] of Object.entries(pins)) {
    await page.setContent(`<!doctype html><meta charset="utf-8">${html}`);
    const overflow = await page.evaluate(() => document.documentElement.scrollHeight > 1500);
    await page.screenshot({ path: path.join(out, 'pins', `${name}.png`) });
    console.log(name, overflow ? 'OVERFLOW' : 'ok');
  }
  await page.setContent(`<!doctype html><meta charset="utf-8">${pdf}`);
  await page.pdf({ path: path.join(out, 'lead-magnet', 'ai-tool-starter-checklist.pdf'), format: 'Letter', printBackground: true });
  await page.setViewportSize({ width: 816, height: 1056 });
  const pdfOverflow = await page.evaluate(() => document.documentElement.scrollHeight > 1056);
  await page.screenshot({ path: path.join(out, 'lead-magnet', 'preview.png') });
  console.log('pdf', pdfOverflow ? 'OVERFLOW' : 'ok');
  await browser.close();
})();
