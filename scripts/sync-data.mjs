// Pulls the tool manifest and the resource catalog from the main branch of
// nihil-images and nihil-resources, and writes them to src/data/*.json.
// The docs pages render from those files, so they never drift from the repos.
//
// Usage: npm run sync-data
// On failure the committed JSON files are left untouched.

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const RAW = 'https://raw.githubusercontent.com/TheNullPigeons';
const API = 'https://api.github.com/repos/TheNullPigeons';
const OUT_DIR = path.resolve('src/data');

const VARIANTS = {
  full: 'Dockerfile',
  ad: 'Dockerfile.ad',
  web: 'Dockerfile.web',
  blueteam: 'Dockerfile.blueteam',
};

const MODULE_CATEGORY = {
  core_tools: 'Core',
  mod_ad: 'Active Directory',
  mod_web: 'Web',
  mod_osint: 'OSINT',
  mod_network: 'Network',
  mod_credential: 'Credential',
  mod_pwn: 'Pwn',
  mod_reverse: 'Reverse Engineering',
  mod_crypto: 'Crypto',
  mod_forensics: 'Forensics',
  mod_c2: 'C2',
  mod_misc: 'Misc',
  mod_wordlists: 'Wordlists',
  mod_dfir: 'Blue Team',
  mod_hunt: 'Blue Team',
};

// The site only names TheNullPigeons: vendor and organisation names that the
// upstream descriptions carry are stripped before publishing.
const VENDORS = ['Fortra', 'ProjectDiscovery', 'OWASP', 'NSA', 'FLARE', 'Mandiant', 'SpecterOps', 'GhostPack'];

function stripVendors(text) {
  let out = text;
  for (const v of VENDORS) {
    out = out
      .replace(new RegExp(`\\s*\\(${v}\\)`, 'g'), '')
      .replace(new RegExp(`\\b${v}\\s+`, 'g'), '');
  }
  out = out.replace(/\s{2,}/g, ' ').trim();
  return out.charAt(0).toUpperCase() + out.slice(1);
}

async function get(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'thenullpigeons-site' } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.text();
}

async function headCommit(repo) {
  try {
    const data = JSON.parse(await get(`${API}/${repo}/commits/main`));
    return { sha: data.sha.slice(0, 7), date: data.commit.committer.date.slice(0, 10) };
  } catch {
    return null;
  }
}

/** Minimal TOML reader for the catalog files: tables, arrays of tables, strings, booleans, numbers and string arrays. */
function parseToml(text) {
  const root = {};
  let current = root;
  for (const raw of text.split('\n')) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    let m;
    if ((m = line.match(/^\[\[([\w.]+)\]\]$/))) {
      const list = (root[m[1]] ??= []);
      current = {};
      list.push(current);
    } else if ((m = line.match(/^\[([\w.]+)\]$/))) {
      current = root;
      for (const part of m[1].split('.')) current = current[part] ??= {};
    } else if ((m = line.match(/^([\w-]+)\s*=\s*(.+)$/))) {
      current[m[1]] = JSON.parse(m[2].replace(/^'(.*)'$/, '"$1"'));
    } else {
      throw new Error(`Unsupported TOML line: ${line}`);
    }
  }
  return root;
}

function repoLink(url) {
  const m = url?.match(/^https:\/\/(?:raw\.githubusercontent\.com|github\.com)\/([^/]+)\/([^/]+)/);
  return m ? `https://github.com/${m[1]}/${m[2].replace(/\.git$/, '')}` : undefined;
}

async function syncTools() {
  const manifest = JSON.parse(await get(`${RAW}/nihil-images/main/build/config/tools.json`));
  const modulesByVariant = {};
  for (const [variant, file] of Object.entries(VARIANTS)) {
    const dockerfile = await get(`${RAW}/nihil-images/main/${file}`);
    modulesByVariant[variant] = new Set(dockerfile.match(/\b(?:core_tools|mod_[a-z0-9_]+)\b/g));
  }

  const tools = [];
  for (const [module, entries] of Object.entries(manifest)) {
    const category = MODULE_CATEGORY[module];
    if (!category) throw new Error(`Unknown module ${module}: add it to MODULE_CATEGORY`);
    const images = Object.keys(VARIANTS).filter((v) => modulesByVariant[v].has(module));
    for (const t of entries) {
      tools.push({ name: t.name, cmd: t.cmd ?? '', desc: stripVendors(t.description ?? ''), module, category, images });
    }
  }

  const modules = Object.fromEntries(
    Object.entries(modulesByVariant).map(([v, set]) => [v, [...set].filter((m) => m in MODULE_CATEGORY)]),
  );
  return { tools, modules };
}

async function syncResources() {
  const catalog = parseToml(await get(`${RAW}/nihil-resources/main/catalog/resources.toml`));
  const profiles = parseToml(await get(`${RAW}/nihil-resources/main/catalog/profiles.toml`)).profile;
  const resources = catalog.resource.map((r) => ({
    id: r.id,
    name: r.name,
    category: r.category,
    profiles: r.profiles ?? [],
    target: r.target,
    kind: r.kind,
    enabled: r.enabled !== false,
    notes: stripVendors(r.notes ?? ''),
    link: repoLink(r.url),
  }));
  return { resources, profiles };
}

async function main() {
  const [{ tools, modules }, { resources, profiles }, images, res] = await Promise.all([
    syncTools(),
    syncResources(),
    headCommit('nihil-images'),
    headCommit('nihil-resources'),
  ]);

  await mkdir(OUT_DIR, { recursive: true });
  const write = (name, data) => writeFile(path.join(OUT_DIR, name), `${JSON.stringify(data, null, 2)}\n`);
  await write('tools.json', { source: { repo: 'nihil-images', ...images }, modules, tools });
  await write('resources.json', { source: { repo: 'nihil-resources', ...res }, profiles, resources });

  console.log(`tools: ${tools.length} (nihil-images ${images?.sha ?? '?'})`);
  console.log(`resources: ${resources.length} (nihil-resources ${res?.sha ?? '?'})`);
}

main().catch((err) => {
  console.error(`sync-data failed, keeping the committed data: ${err.message}`);
  process.exit(1);
});
