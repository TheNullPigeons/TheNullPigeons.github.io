import React, { useState, useMemo } from 'react';
import toolsData from '../../data/tools.json';

type ImageTag = 'full' | 'ad' | 'web' | 'blueteam';
type Category =
  | 'Core'
  | 'Active Directory'
  | 'Web'
  | 'OSINT'
  | 'Network'
  | 'Credential'
  | 'Pwn'
  | 'Reverse Engineering'
  | 'Crypto'
  | 'Forensics'
  | 'C2'
  | 'Misc'
  | 'Wordlists'
  | 'Blue Team';

interface Tool {
  name: string;
  cmd: string;
  desc: string;
  category: Category;
  images: ImageTag[];
  link?: string;
}

// Generated from nihil-images build/config/tools.json by scripts/sync-data.mjs.
const ALL: Tool[] = (toolsData.tools as Array<{ name: string; cmd: string; desc: string; category: string; images: string[] }>).map(
  (t) => ({ name: t.name, cmd: t.cmd, desc: t.desc, category: t.category as Category, images: t.images as ImageTag[] }),
);

const CATEGORIES: Category[] = [
  'Core', 'Active Directory', 'Web', 'OSINT', 'Network', 'Credential',
  'Pwn', 'Reverse Engineering', 'Crypto', 'Forensics', 'C2', 'Misc', 'Wordlists', 'Blue Team',
];

const IMAGE_COLORS: Record<ImageTag, string> = {
  full:     'bg-amber-500/15 text-amber-300 border-amber-500/30',
  ad:       'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
  web:      'bg-purple-500/15 text-purple-300 border-purple-500/30',
  blueteam: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
};

const CATEGORY_COLORS: Record<Category, string> = {
  'Core':               'bg-slate-500/20 text-slate-300',
  'Active Directory':   'bg-cyan-500/15 text-cyan-300',
  'Web':                'bg-purple-500/15 text-purple-300',
  'OSINT':              'bg-sky-500/15 text-sky-300',
  'Network':            'bg-emerald-500/15 text-emerald-300',
  'Credential':         'bg-orange-500/15 text-orange-300',
  'Pwn':                'bg-red-500/15 text-red-300',
  'Reverse Engineering':'bg-yellow-500/15 text-yellow-300',
  'Crypto':             'bg-teal-500/15 text-teal-300',
  'Forensics':          'bg-indigo-500/15 text-indigo-300',
  'C2':                 'bg-rose-500/15 text-rose-300',
  'Misc':               'bg-slate-500/15 text-slate-400',
  'Wordlists':          'bg-lime-500/15 text-lime-300',
  'Blue Team':          'bg-emerald-500/15 text-emerald-300',
};

export const ToolsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [activeImage, setActiveImage] = useState<ImageTag | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return ALL.filter((t) => {
      if (activeCategory && t.category !== activeCategory) return false;
      if (activeImage && !t.images.includes(activeImage)) return false;
      if (q && !t.name.toLowerCase().includes(q) && !t.cmd.toLowerCase().includes(q) && !t.desc.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [search, activeCategory, activeImage]);

  return (
    <div className="space-y-6 w-full">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          Docs / <span className="text-amber-400">Tools</span>
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Tools</h1>
        <p className="text-slate-400 text-sm max-w-2xl">
          {ALL.length} tools pre-installed across all nihil images. Filter by image variant or category.
        </p>
        <p className="text-slate-400 text-sm max-w-2xl">
          For Kerbrute output, run <code>kerbrute_users_dump kerbrute.log valid_users.txt</code> to extract unique usernames without their domain.
        </p>
      </header>

      {/* Filters */}
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Search by name, command or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-lg px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/60"
        />

        <div className="flex flex-wrap gap-2">
          {(['full','ad','web','blueteam'] as ImageTag[]).map((img) => (
            <button
              key={img}
              onClick={() => setActiveImage(activeImage === img ? null : img)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${
                activeImage === img
                  ? IMAGE_COLORS[img]
                  : 'bg-transparent border-slate-700 text-slate-500 hover:border-slate-500 hover:text-slate-300'
              }`}
            >
              {img}
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

        <p className="text-xs text-slate-500">
          {filtered.length === ALL.length ? `${ALL.length} tools` : `${filtered.length} / ${ALL.length} tools`}
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-slate-700/80 bg-slate-900/60">
              <th className="text-left py-2.5 px-4 text-slate-400 font-medium text-xs">Tool</th>
              <th className="text-left py-2.5 px-4 text-slate-400 font-medium text-xs">Command</th>
              <th className="text-left py-2.5 px-4 text-slate-400 font-medium text-xs">Description</th>
              <th className="text-left py-2.5 px-4 text-slate-400 font-medium text-xs">Category</th>
              <th className="text-left py-2.5 px-4 text-slate-400 font-medium text-xs">Images</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-500 text-sm">No tools match your filters.</td>
              </tr>
            ) : filtered.map((tool) => (
              <tr key={`${tool.name}-${tool.category}`} className="border-b border-slate-800/50 hover:bg-slate-900/40 transition-colors">
                <td className="py-2.5 px-4 font-medium text-slate-200 text-xs">
                  {tool.link ? (
                    <a href={tool.link} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
                      {tool.name}
                    </a>
                  ) : tool.name}
                </td>
                <td className="py-2.5 px-4 font-mono text-amber-300 text-xs">{tool.cmd}</td>
                <td className="py-2.5 px-4 text-slate-400 text-xs">{tool.desc}</td>
                <td className="py-2.5 px-4">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${CATEGORY_COLORS[tool.category]}`}>
                    {tool.category}
                  </span>
                </td>
                <td className="py-2.5 px-4">
                  <div className="flex flex-wrap gap-1">
                    {tool.images.map((img) => (
                      <span key={img} className={`text-[10px] px-1.5 py-0.5 rounded border font-mono ${IMAGE_COLORS[img]}`}>
                        {img}
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
