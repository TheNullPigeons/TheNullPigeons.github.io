import React, { useState, useMemo } from 'react';
import resourcesData from '../../data/resources.json';

type Profile = 'full' | 'ad' | 'web' | 'ctf';
type Category = 'active-directory' | 'linux' | 'windows' | 'web';
type Kind = 'url' | 'release_asset' | 'submodule';

interface Resource {
  id: string;
  name: string;
  category: Category;
  profiles: Profile[];
  target: string;
  kind: Kind;
  enabled: boolean;
  notes: string;
  link?: string;
}

// Generated from nihil-resources catalog/resources.toml by scripts/sync-data.mjs.
const ALL: Resource[] = (resourcesData.resources as Array<Omit<Resource, 'category' | 'profiles' | 'kind'> & { category: string; profiles: string[]; kind: string }>).map(
  (r) => ({ ...r, category: r.category as Category, profiles: r.profiles as Profile[], kind: r.kind as Kind }),
);

const CATEGORIES: Category[] = ['active-directory', 'linux', 'windows', 'web'];

const PROFILE_COLORS: Record<Profile, string> = {
  full: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  ad:   'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
  web:  'bg-purple-500/15 text-purple-300 border-purple-500/30',
  ctf:  'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
};

const CATEGORY_COLORS: Record<Category, string> = {
  'active-directory': 'bg-cyan-500/15 text-cyan-300',
  'linux':            'bg-emerald-500/15 text-emerald-300',
  'windows':          'bg-blue-500/15 text-blue-300',
  'web':              'bg-purple-500/15 text-purple-300',
};

const KIND_COLORS: Record<Kind, string> = {
  url:           'bg-slate-500/20 text-slate-400',
  release_asset: 'bg-green-500/15 text-green-300',
  submodule:     'bg-indigo-500/15 text-indigo-300',
};

const KIND_LABELS: Record<Kind, string> = {
  url:           'url',
  release_asset: 'release',
  submodule:     'submodule',
};

const ENABLED_COUNT = ALL.filter((r) => r.enabled).length;

export const ResourcesCatalogPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [activeProfile, setActiveProfile] = useState<Profile | null>(null);
  const [showDisabled, setShowDisabled] = useState(false);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return ALL.filter((r) => {
      if (!showDisabled && !r.enabled) return false;
      if (activeCategory && r.category !== activeCategory) return false;
      if (activeProfile && !r.profiles.includes(activeProfile)) return false;
      if (q && !r.name.toLowerCase().includes(q) && !r.target.toLowerCase().includes(q) && !r.notes.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [search, activeCategory, activeProfile, showDisabled]);

  return (
    <div className="space-y-6 w-full">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          Docs / <span className="text-amber-400">Resource Catalog</span>
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Resource Catalog</h1>
        <p className="text-slate-400 text-sm max-w-2xl">
          {ENABLED_COUNT} resources enabled in the nihil-resources catalog. Mounted read-only
          at <code className="text-amber-300">/opt/resources</code> inside every container.
        </p>
      </header>

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Search by name, path or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-lg px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/60"
        />

        <div className="flex flex-wrap gap-2">
          {(['full','ad','web','ctf'] as Profile[]).map((p) => (
            <button
              key={p}
              onClick={() => setActiveProfile(activeProfile === p ? null : p)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${
                activeProfile === p
                  ? PROFILE_COLORS[p]
                  : 'bg-transparent border-slate-700 text-slate-500 hover:border-slate-500 hover:text-slate-300'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                activeCategory === cat
                  ? `${CATEGORY_COLORS[cat]} border-current`
                  : 'bg-transparent border-slate-700 text-slate-500 hover:border-slate-500 hover:text-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-500">
            {filtered.length === ALL.length
              ? `${ALL.length} resources`
              : `${filtered.length} / ${ALL.length} resources`}
          </p>
          <label className="flex items-center gap-2 text-xs text-slate-500 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showDisabled}
              onChange={(e) => setShowDisabled(e.target.checked)}
              className="accent-amber-400"
            />
            Show disabled
          </label>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-slate-700/80 bg-slate-900/60">
              <th className="text-left py-2.5 px-4 text-slate-400 font-medium text-xs">Resource</th>
              <th className="text-left py-2.5 px-4 text-slate-400 font-medium text-xs">Target path</th>
              <th className="text-left py-2.5 px-4 text-slate-400 font-medium text-xs">Description</th>
              <th className="text-left py-2.5 px-4 text-slate-400 font-medium text-xs">Category</th>
              <th className="text-left py-2.5 px-4 text-slate-400 font-medium text-xs">Kind</th>
              <th className="text-left py-2.5 px-4 text-slate-400 font-medium text-xs">Profiles</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-500 text-sm">
                  No resources match your filters.
                </td>
              </tr>
            ) : filtered.map((r) => (
              <tr
                key={r.id}
                className={`border-b border-slate-800/50 transition-colors ${
                  r.enabled ? 'hover:bg-slate-900/40' : 'opacity-50 hover:opacity-70'
                }`}
              >
                <td className="py-2.5 px-4 font-medium text-slate-200 text-xs whitespace-nowrap">
                  {r.link ? (
                    <a href={r.link} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
                      {r.name}
                    </a>
                  ) : r.name}
                  {!r.enabled && (
                    <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-slate-700/60 text-slate-500 font-mono">
                      disabled
                    </span>
                  )}
                </td>
                <td className="py-2.5 px-4 font-mono text-amber-300 text-[11px] max-w-[240px]">
                  <span className="block truncate" title={r.target}>{r.target}</span>
                </td>
                <td className="py-2.5 px-4 text-slate-400 text-xs max-w-[260px]">{r.notes}</td>
                <td className="py-2.5 px-4 whitespace-nowrap">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${CATEGORY_COLORS[r.category]}`}>
                    {r.category}
                  </span>
                </td>
                <td className="py-2.5 px-4 whitespace-nowrap">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${KIND_COLORS[r.kind]}`}>
                    {KIND_LABELS[r.kind]}
                  </span>
                </td>
                <td className="py-2.5 px-4">
                  <div className="flex flex-wrap gap-1">
                    {r.profiles.map((p) => (
                      <span key={p} className={`text-[10px] px-1.5 py-0.5 rounded border font-mono ${PROFILE_COLORS[p]}`}>
                        {p}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
