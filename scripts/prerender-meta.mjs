import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const BASE_URL = 'https://thenullpigeons.org';
const DIST_DIR = path.resolve('dist');
const BASE_HTML = path.join(DIST_DIR, 'index.html');

const DEFAULT_META = {
  title: 'TheNullPigeons',
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

const baseHtml = await readFile(BASE_HTML, 'utf-8');

for (const [route, meta] of ROUTES) {
  const html = setMeta(baseHtml, route, meta);
  const outputDir = route === '/' ? DIST_DIR : path.join(DIST_DIR, route.replace(/^\//, ''));
  await mkdir(outputDir, { recursive: true });
  await writeFile(path.join(outputDir, 'index.html'), html, 'utf-8');
}

console.log(`Prerendered metadata for ${ROUTES.length} routes.`);
