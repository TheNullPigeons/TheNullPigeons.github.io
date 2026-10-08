import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const BASE_URL = 'https://thenullpigeons.org';
const DIST_DIR = path.resolve('dist');
const BASE_HTML = path.join(DIST_DIR, 'index.html');

const DEFAULT_META = {
  title: 'TheNullPigeons - Offensive Security Lab & Nihil CLI',
  description: 'Professional offensive lab environment for security professionals.',
};

const ROUTES = [
  ['/', DEFAULT_META],
  ['/community', { title: 'TheNullPigeons - Community', description: 'Join discussions, share feedback, and follow project updates.' }],
  ['/pricing', { title: 'TheNullPigeons - Pricing', description: 'Project support options for individuals and teams.' }],
  ['/source-code', { title: 'TheNullPigeons - Source Code', description: 'Browse repositories behind nihil and nihil-images.' }],
  ['/blog', { title: 'TheNullPigeons - Blog', description: 'News, release notes, and practical offensive workflow updates.' }],
  ['/docs', { title: 'TheNullPigeons - Docs', description: 'Official documentation for nihil usage, setup, and workflows.' }],
  ['/docs/installation/linux', { title: 'TheNullPigeons - Installation', description: 'Install nihil quickly and start your first offensive containers.' }],
  ['/docs/installation/macos', { title: 'TheNullPigeons - Installation', description: 'Install nihil quickly and start your first offensive containers.' }],
  ['/docs/installation/windows', { title: 'TheNullPigeons - Installation', description: 'Install nihil quickly and start your first offensive containers.' }],
  ['/docs/usage', { title: 'TheNullPigeons - CLI Commands', description: 'Complete reference for nihil CLI commands and workflows.' }],
  ['/docs/completion', { title: 'TheNullPigeons - Shell Completion', description: 'Enable shell autocompletion for nihil commands.' }],
  ['/docs/history', { title: 'TheNullPigeons - Command History', description: 'Understand and manage nihil command history files.' }],
  ['/docs/images', { title: 'TheNullPigeons - Images', description: 'Compare nihil images and pick the best stack for your engagement.' }],
  ['/docs/nihil-history', { title: 'TheNullPigeons - nihil-history', description: 'Track credentials, hosts, and access links across engagements.' }],
  ['/docs/architecture', { title: 'TheNullPigeons - Architecture', description: 'Understand how nihil CLI, Docker manager, and image pipeline fit together.' }],
  ['/docs/configuration', { title: 'TheNullPigeons - Configuration', description: 'Configure nihil paths, resources, env variables, and command history.' }],
  ['/docs/service', { title: 'TheNullPigeons - Services', description: 'Understand session services in nihil, including Desktop Browser UI and port behavior.' }],
  ['/docs/mcp', { title: 'TheNullPigeons - nihil-mcp', description: 'Model Context Protocol server that lets an AI assistant manage Nihil containers and run tooling via natural-language requests.' }],
  ['/docs/tools', { title: 'TheNullPigeons - Tools', description: 'Browse all offensive security tools included in nihil images by category and image variant.' }],
  ['/docs/resources', { title: 'TheNullPigeons - Resources', description: 'Versioned shared resource catalog for nihil. Scripts, payloads, binaries, and wordlists mounted in every container.' }],
  ['/docs/resources/catalog', { title: 'TheNullPigeons - Resource Catalog', description: 'Browse all nihil-resources entries: webshells, Windows binaries, Linux helpers, AD scripts, and wordlists.' }],
  ['/docs/nihil-ntp', { title: 'TheNullPigeons - nihil-ntp', description: 'Synchronize container time with a domain controller for reliable Kerberos authentication.' }],
  ['/docs/contributing', { title: 'TheNullPigeons - Contributing', description: 'Report bugs, request tools, and contribute to the nihil ecosystem.' }],
  ['/docs/faq', { title: 'TheNullPigeons - FAQ', description: 'Answers to frequent questions about nihil setup and usage.' }],
  ['/docs/about', { title: 'TheNullPigeons - About', description: 'Why nihil was built and how the project is structured.' }],
];

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function upsertTag(html, pattern, replacement, anchor) {
  if (pattern.test(html)) {
    return html.replace(pattern, replacement);
  }
  return html.replace(anchor, `${anchor}\n    ${replacement}`);
}

function setMeta(html, route, meta) {
  const url = `${BASE_URL}${route}`;
  const title = escapeHtml(meta.title);
  const desc = escapeHtml(meta.description);

  let out = html;
  out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
  out = upsertTag(out, /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/, `<meta name="description" content="${desc}" />`, '<meta name="viewport" content="width=device-width, initial-scale=1.0" />');
  out = upsertTag(out, /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`, '<meta name="robots" content="index,follow" />');
  out = upsertTag(out, /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${title}" />`, '<meta property="og:site_name" content="TheNullPigeons" />');
  out = upsertTag(out, /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${desc}" />`, '<meta property="og:title" content="TheNullPigeons" />');
  out = upsertTag(out, /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${url}" />`, '<meta property="og:description" content="" />');
  out = upsertTag(out, /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${title}" />`, '<meta name="twitter:card" content="summary" />');
  out = upsertTag(out, /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${desc}" />`, '<meta name="twitter:title" content="TheNullPigeons" />');
  return out;
}

function buildSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = ROUTES.map(([route]) => {
    const loc = `${BASE_URL}${route}`;
    const priority = route === '/' ? '1.0' : route.startsWith('/docs') ? '0.8' : '0.6';
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
  }).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

const baseHtml = await readFile(BASE_HTML, 'utf-8');

for (const [route, meta] of ROUTES) {
  const html = setMeta(baseHtml, route, meta);
  const outputDir = route === '/' ? DIST_DIR : path.join(DIST_DIR, route.replace(/^\//, ''));
  await mkdir(outputDir, { recursive: true });
  await writeFile(path.join(outputDir, 'index.html'), html, 'utf-8');
}

// GitHub Pages has no server-side router: unknown deep links hit this file,
// so it must boot the same SPA as index.html and let react-router take over.
await writeFile(path.join(DIST_DIR, '404.html'), setMeta(baseHtml, '/', DEFAULT_META), 'utf-8');

await writeFile(path.join(DIST_DIR, 'sitemap.xml'), buildSitemap(), 'utf-8');

console.log(`Prerendered metadata for ${ROUTES.length} routes, plus sitemap.xml and 404.html.`);
