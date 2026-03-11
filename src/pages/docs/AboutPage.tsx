import React from 'react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          Docs / <span className="text-amber-400">About</span>
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          About Nihil
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl">
          Nihil is an offensive security environment built by TheNullPigeons: Arch-based Docker images
          paired with a Python CLI that gets you from zero to shell in seconds.
        </p>
      </header>

      <div className="grid md:grid-cols-[1fr,200px] gap-8 items-start">
        <div className="space-y-10 min-w-0">

          {/* Why */}
          <section id="why" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Why we built this</h2>
            <div className="text-slate-400 text-sm space-y-3 leading-relaxed">
              <p>
                Setting up a pentest environment takes time. Every engagement starts with the same
                ritual: installing tools, fixing broken dependencies, re-configuring your shell.
                We wanted a setup that was ready in one command, reproducible across machines, and
                fully transparent on what runs inside.
              </p>
              <p>
                Nihil is what we use on our own engagements. It's not a demo project or a portfolio
                piece, it's our actual toolbox, open to everyone.
              </p>
            </div>
          </section>

          {/* What it is */}
          <section id="components" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">What Nihil is</h2>
            <div className="text-slate-400 text-sm space-y-3 leading-relaxed">
              <p>Nihil has two main parts:</p>
            </div>
            <div className="space-y-3">
              {[
                {
                  name: 'Docker images',
                  desc: 'Arch-based containers pre-loaded with offensive tools. Three variants: base, ad (Active Directory), and web. Built from public Dockerfiles, no mystery layers.',
                },
                {
                  name: 'Python wrapper (nihil CLI)',
                  desc: 'Manages the full container lifecycle: pulling images, creating containers, mounting workspaces, handling VPN sessions, and launching shells. One command to get in, one to get out.',
                },
                {
                  name: 'my-resources',
                  desc: 'A directory on your host (~/.nihil/my-resources) mounted into every container. Drop your zsh config, aliases, nvim setup, and tmux config there and they follow you everywhere.',
                },
              ].map(({ name, desc }) => (
                <div
                  key={name}
                  className="rounded-xl border border-slate-700/80 bg-slate-900/50 p-4 space-y-1"
                >
                  <p className="text-white text-sm font-medium">{name}</p>
                  <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Design choices */}
          <section id="design" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Design choices</h2>
            <div className="text-slate-400 text-sm space-y-3 leading-relaxed">
              <p>
                <span className="text-white font-medium">Arch Linux as the base.</span>{' '}
                Rolling releases, minimal footprint, and full control over what goes in.
                Packages are up to date without waiting for distro packaging cycles.
              </p>
              <p>
                <span className="text-white font-medium">No bloat.</span>{' '}
                Every tool in the images earns its place. If something is redundant or unmaintained, it
                doesn't ship. You know exactly what runs in your container.
              </p>
              <p>
                <span className="text-white font-medium">No lock-in.</span>{' '}
                No telemetry, no account, no subscription, no dashboard. Pull the image, use it,
                fork it, break it. Everything is on GitHub.
              </p>
              <p>
                <span className="text-white font-medium">Transparent by design.</span>{' '}
                Every Dockerfile, every install script, the entire CLI codebase: all public.
                Nothing is hidden. If you don't trust something, read it.
              </p>
            </div>
          </section>

          {/* Who */}
          <section id="team" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Who we are</h2>
            <div className="text-slate-400 text-sm space-y-3 leading-relaxed">
              <p>
                We're <strong className="text-white">TheNullPigeons</strong>, a small team of
                two practitioners who work in offensive security.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { name: 'Killian Prin-Abeil', handle: '0xbbuddha', url: 'https://github.com/0xbbuddha' },
                { name: 'Harouna Coulibaly', handle: 'Goultarde', url: 'https://github.com/Goultarde' },
              ].map(({ name, handle, url }) => (
                <a
                  key={handle}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-700/80 bg-slate-900/50 hover:border-amber-500/30 hover:bg-slate-900/80 transition-all duration-200 group"
                >
                  <svg className="w-4 h-4 text-slate-400 group-hover:text-amber-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.73-4.03-1.61-4.03-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.08-.73.08-.73 1.2.09 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  <div>
                    <p className="text-white text-xs font-medium">{name}</p>
                    <p className="text-slate-500 text-xs">@{handle}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Links */}
          <section id="links" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Useful links</h2>
            <div className="space-y-2 text-sm">
              {[
                { label: 'GitHub — nihil wrapper', url: 'https://github.com/TheNullPigeons/nihil' },
                { label: 'GitHub — nihil images', url: 'https://github.com/TheNullPigeons/nihil-images' },
                { label: 'GitHub — TheNullPigeons org', url: 'https://github.com/TheNullPigeons' },
                { label: 'Report a bug', url: 'https://github.com/TheNullPigeons/nihil/issues' },
              ].map(({ label, url }) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-amber-400 hover:underline underline-offset-2"
                >
                  <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  {label}
                </a>
              ))}
            </div>
          </section>

        </div>

        {/* On this page */}
        <aside className="space-y-3 text-sm sticky top-24 hidden md:block">
          <p className="text-slate-500 font-medium">On this page</p>
          <nav className="space-y-1">
            <a href="#why" className="block text-slate-400 hover:text-amber-300 text-xs">Why we built this</a>
            <a href="#components" className="block text-slate-400 hover:text-amber-300 text-xs">What Nihil is</a>
            <a href="#design" className="block text-slate-400 hover:text-amber-300 text-xs">Design choices</a>
            <a href="#team" className="block text-slate-400 hover:text-amber-300 text-xs">Who we are</a>
            <a href="#links" className="block text-slate-400 hover:text-amber-300 text-xs">Useful links</a>
          </nav>
        </aside>
      </div>
    </div>
  );
};
