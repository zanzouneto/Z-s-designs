// Builds /project/<slug>.html for every entry in content/projects.json.
// Runs automatically on every Vercel deploy (see vercel.json). Local run: node scripts/build-projects.mjs
// No dependencies. If the data has a mistake, the build stops with a clear message and the live site stays as it was.

import { readFileSync, writeFileSync, mkdirSync, copyFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://www.zanzouneto.com';
const OUT = join(ROOT, 'project');
const TEMPLATE_DIR = join(ROOT, 'templates', 'project');
const SIZES = ['w50', 'w60', 'w70', 'w80', 'w90'];
const BLOCK_KEYS = ['caption', 'image', 'images', 'youtube', 'size', 'align', 'rounded'];
const PROJECT_KEYS = ['slug', 'title', 'pageTitle', 'description', 'client', 'year', 'liveUrl', 'hero', 'contribution', 'blocks'];

const { projects } = JSON.parse(readFileSync(join(ROOT, 'content', 'projects.json'), 'utf8'));

// ---------- validation ----------
const errors = [];
const seen = new Set();
const assetExists = (f) => existsSync(join(ROOT, 'assets', f));
projects.forEach((p, i) => {
  const where = `projects[${i}]${p.slug ? ` (${p.slug})` : ''}`;
  for (const k of ['slug', 'title', 'hero', 'contribution', 'blocks']) if (!p[k]) errors.push(`${where}: missing "${k}"`);
  Object.keys(p).forEach((k) => { if (!PROJECT_KEYS.includes(k)) errors.push(`${where}: unknown field "${k}"`); });
  if (p.slug && !/^[A-Za-z0-9-]+$/.test(p.slug)) errors.push(`${where}: slug may only use letters, numbers and dashes`);
  if (p.slug && seen.has(p.slug.toLowerCase())) errors.push(`${where}: duplicate slug`);
  if (p.slug) seen.add(p.slug.toLowerCase());
  if (p.hero?.image && !assetExists(p.hero.image)) errors.push(`${where}: hero image not found in /assets: "${p.hero.image}"`);
  if (p.hero?.size && !SIZES.includes(p.hero.size)) errors.push(`${where}: hero size must be one of ${SIZES.join(', ')}`);
  (p.blocks || []).forEach((b, j) => {
    const bw = `${where} block ${j + 1}`;
    Object.keys(b).forEach((k) => { if (!BLOCK_KEYS.includes(k)) errors.push(`${bw}: unknown field "${k}"`); });
    const media = ['image', 'images', 'youtube'].filter((k) => b[k]);
    if (media.length > 1) errors.push(`${bw}: use only one of image / images / youtube`);
    if (!media.length && !b.caption) errors.push(`${bw}: needs an image, images, youtube or caption`);
    if (b.size && !SIZES.includes(b.size)) errors.push(`${bw}: size must be one of ${SIZES.join(', ')}`);
    if (b.align && !['left', 'right'].includes(b.align)) errors.push(`${bw}: align must be "left" or "right"`);
    [b.image, ...(b.images || [])].filter(Boolean).forEach((f) => { if (!assetExists(f)) errors.push(`${bw}: image not found in /assets: "${f}"`); });
  });
});
if (errors.length) {
  console.error('\ncontent/projects.json has problems:\n- ' + errors.join('\n- ') + '\n');
  process.exit(1);
}

// ---------- helpers ----------
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const asset = (f) => esc('/assets/' + encodeURI(f));
const lines = (v) => (Array.isArray(v) ? v : [v]);
const isPhoto = (f) => /\.(jpe?g)$/i.test(f);
const host = (u) => u.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '');
// size (w50…w90) and align (left/right) keep working: they set the image width inside its card
const imgStyle = (o) => [o.size && `max-width:${o.size.slice(1)}%`, o.align === 'left' && 'margin-left:0', o.align === 'right' && 'margin-right:0'].filter(Boolean).join(';');
const img = (file, o, alt, lazy = true) => {
  const st = imgStyle(o);
  return `<img src="${asset(file)}" alt="${esc(alt)}"${st ? ` style="${st}"` : ''}${o.rounded ? ' class="rounded"' : ''}${lazy ? ' loading="lazy"' : ''}>`;
};
const figure = (inner, flush) => `<figure class="p-figure${flush ? ' is-flush' : ''}">${inner}</figure>`;

function media(b, p, alt) {
  if (b.image) return figure(img(b.image, b, alt), isPhoto(b.image) && !b.size);
  if (b.images) return figure(`<div class="p-panel">${b.images.map((f) => img(f, {}, alt)).join('<span class="p-divider" aria-hidden="true"></span>')}</div>`);
  if (b.youtube) {
    const id = encodeURIComponent(b.youtube);
    return figure(`<div class="p-video"><iframe src="https://www.youtube.com/embed/${id}?autoplay=1&amp;mute=1&amp;loop=1&amp;playlist=${id}&amp;playsinline=1&amp;rel=0" title="${esc(p.title)} video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy"></iframe></div>`, true);
  }
  return '';
}

// a block with a caption becomes a numbered feature (text beside the media);
// a block without one is a full-width image card
function block(b, p, n) {
  const cap = b.caption ? lines(b.caption) : [];
  const alt = `${p.title} — ${cap[0] || 'project image'}`;
  const m = media(b, p, alt);
  if (!cap.length) return `
        <section class="p-block reveal">${m}</section>`;
  const [head, ...rest] = cap;
  const text = `<div class="p-text">
                <span class="p-num">${String(n).padStart(2, '0')}</span>
                <h2>${esc(head)}</h2>${rest.length ? `
                <ul>${rest.map((l) => `<li>${esc(l)}</li>`).join('')}</ul>` : ''}
            </div>`;
  return `
        <section class="p-feature reveal${n % 2 === 0 ? ' is-flip' : ''}${m ? '' : ' is-text'}">
            ${text}${m ? `
            <div class="p-media">${m}</div>` : ''}
        </section>`;
}

function page(p, next) {
  const pageTitle = p.pageTitle || `${p.title} project`;
  const url = `${SITE}/project/${p.slug}`;
  let n = 0;
  const blocks = p.blocks.map((b) => block(b, p, b.caption ? ++n : 0)).join('');
  const facts = [
    ['My role', esc(p.contribution.join(', '))],
    p.client && ['Client', esc(p.client)],
    p.year && ['When', esc(p.year)],
    p.liveUrl && (/apps\.apple\.com/.test(p.liveUrl)
      ? ['Download', `<a class="zs-ylink" href="${esc(p.liveUrl)}" target="_blank" rel="noopener">App Store ↗</a>`]
      : ['Live site', `<a class="zs-ylink" href="${esc(p.liveUrl)}" target="_blank" rel="noopener">${esc(host(p.liveUrl))} ↗</a>`]),
  ].filter(Boolean).map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('\n                ');
  return `<!DOCTYPE html>
<!-- GENERATED from content/projects.json by scripts/build-projects.mjs. Edit the JSON, not this file. -->
<html lang="en">
<head>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-6YZQRLN0R4"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-6YZQRLN0R4');
    </script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${esc(pageTitle)} · Zeina Saade</title>${p.description ? `
    <meta name="description" content="${esc(p.description)}">` : ''}
    <link rel="canonical" href="${esc(url)}">
    <meta property="og:title" content="${esc(pageTitle)}">${p.description ? `
    <meta property="og:description" content="${esc(p.description)}">` : ''}
    <meta property="og:image" content="${esc(SITE + '/assets/' + encodeURI(p.hero.image))}">
    <meta property="og:url" content="${esc(url)}">
    <link rel="icon" href="/assets/favicon.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap">
    <link rel="stylesheet" href="/site.css">
    <link rel="stylesheet" href="/project/project.css">
</head>
<body>
    <nav-menu></nav-menu>
    <main class="zs-wrap p-wrap">
        <section class="p-head">
            <a class="zs-ylink p-back" href="/portfolio">← All work</a>
            <h1 class="zs-display">${esc(p.title)}</h1>${p.description ? `
            <p class="zs-lead">${esc(p.description)}</p>` : ''}
            <dl class="p-facts">
                ${facts}
            </dl>
        </section>
        <div class="p-hero">${p.hero.dark ? figure(img(p.hero.image, { size: p.hero.size }, `${p.title} project cover`, false)) : figure(img(p.hero.image, { size: p.hero.size }, `${p.title} project cover`, false), isPhoto(p.hero.image) && !p.hero.size)}</div>
        <div class="p-blocks">${blocks}
        </div>
        <a class="p-next" href="/project/${esc(next.slug)}">
            <span><span class="zs-kicker">Next project</span><span class="p-next-title">${esc(next.title)}</span></span>
            <span class="p-next-arrow" aria-hidden="true"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="13 6 19 12 13 18"/></svg></span>
        </a>
    </main>
    <main-footer></main-footer>
    <hire-me-component></hire-me-component>
    <script src="/navigation.js"></script>
    <script src="/project/project.js"></script>
</body>
</html>
`;
}

// ---------- write ----------
mkdirSync(OUT, { recursive: true });
for (const f of readdirSync(TEMPLATE_DIR)) copyFileSync(join(TEMPLATE_DIR, f), join(OUT, f));
projects.forEach((p, i) => {
  writeFileSync(join(OUT, `${p.slug}.html`), page(p, projects[(i + 1) % projects.length]));
});
console.log(`Built ${projects.length} project pages into /project`);
