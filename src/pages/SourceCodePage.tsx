import React from 'react';
import { ArrowUpRight, SectionLabel } from '../components/Mail';

const repos = [
  {
    name: 'nihil',
    description: 'The CLI wrapper: manage your offensive containers from the terminal.',
    href: 'https://github.com/TheNullPigeons/nihil',
  },
  {
    name: 'nihil-images',
    description: 'Docker images for pentest, AD, web: Arch-based, fully open.',
    href: 'https://github.com/TheNullPigeons/nihil-images',
  },
  {
    name: 'nihil-history',
    description: 'Persistent command history across containers: never lose a shell command.',
    href: 'https://github.com/TheNullPigeons/nihil-history',
  },
  {
    name: 'nihil-resources',
    description: 'Curated offensive security resources: wordlists, payloads, and references for pentest workflows.',
    href: 'https://github.com/TheNullPigeons/nihil-resources',
  },
  {
    name: 'nihil-mcp',
    description: 'MCP server exposing nihil tooling to AI agents and Claude Code.',
    href: 'https://github.com/TheNullPigeons/nihil-mcp',
  },
];

export const SourceCodePage: React.FC = () => {
  return (
    <div className="space-y-16">
      <header className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6 items-end">
        <div className="space-y-5">
          <SectionLabel index="00">Manifest</SectionLabel>
          <h1 className="text-5xl md:text-8xl font-bold display text-paper leading-[0.9]">
            Nothing to <br />
            <span className="stencil logo-blue-text">declare.</span>
          </h1>
        </div>
        <p className="text-slate-400 md:text-lg leading-relaxed max-w-md md:justify-self-end">
          Everything is open. Browse it, fork it, audit it, contribute to it.
        </p>
      </header>

      <section className="border-t border-slate-800">
        {repos.map((repo, i) => (
          <a
            key={repo.name}
            href={repo.href}
            target="_blank"
            rel="noreferrer"
            className="group grid grid-cols-[2.5rem_minmax(0,1fr)_auto] md:grid-cols-[4rem_minmax(0,22rem)_minmax(0,1fr)_auto] gap-x-4 md:gap-x-8 gap-y-2 items-center px-2 md:px-4 py-7 md:py-9 border-b border-slate-800 hover:bg-paper hover:text-ink transition-colors duration-200"
          >
            <span className="font-mono text-xs text-slate-500 group-hover:text-ink/50">{String(i + 1).padStart(2, '0')}</span>
            <h2 className="font-mono text-2xl md:text-3xl font-semibold tracking-tight text-paper group-hover:text-ink">
              {repo.name}
            </h2>
            <ArrowUpRight className="w-6 h-6 text-slate-500 group-hover:text-amber-600 md:order-last transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            <p className="col-start-2 col-span-2 md:col-start-auto md:col-span-1 text-slate-400 group-hover:text-ink/70 leading-relaxed">
              {repo.description}
            </p>
          </a>
        ))}
      </section>

      <p className="font-mono text-xs text-slate-500">
        <span className="text-amber-500">$</span> git clone https://github.com/TheNullPigeons/nihil.git
      </p>
    </div>
  );
};
