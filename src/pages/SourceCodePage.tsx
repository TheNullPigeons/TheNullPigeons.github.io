import React from 'react';

const repos = [
  {
    name: 'nihil',
    description: 'The CLI wrapper — manage your offensive containers from the terminal.',
    href: 'https://github.com/TheNullPigeons/nihil',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    ),
  },
  {
    name: 'nihil-images',
    description: 'Docker images for pentest, AD, web — Arch-based, fully open.',
    href: 'https://github.com/TheNullPigeons/nihil-images',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <polyline points="16 3 12 7 8 3" />
      </svg>
    ),
  },
  {
    name: 'nihil-history',
    description: 'Persistent command history across containers — never lose a shell command.',
    href: 'https://github.com/TheNullPigeons/nihil-history',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

export const SourceCodePage: React.FC = () => {
  return (
    <div className="space-y-16">
      <section className="text-center space-y-5 pt-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          <span className="text-amber-400">Source Code</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
          Everything is open. Browse, fork, contribute.
        </p>
      </section>

      <section className="max-w-3xl mx-auto space-y-4">
        {repos.map((repo) => (
          <a
            key={repo.name}
            href={repo.href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-5 p-6 rounded-2xl border border-slate-700/80 bg-slate-900/50 hover:bg-slate-800/60 hover:border-amber-500/30 transition-all duration-200 group"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-amber-400 transition-colors">
              {repo.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white group-hover:text-amber-300 transition-colors">
                {repo.name}
              </h3>
              <p className="text-sm text-slate-400 mt-1">{repo.description}</p>
            </div>
            <svg className="w-5 h-5 text-slate-600 group-hover:text-amber-400 transition-colors flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        ))}
      </section>
    </div>
  );
};
