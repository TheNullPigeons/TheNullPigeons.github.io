import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { SeoMeta } from './SeoMeta';
import { AirmailBar, ArrowUpRight, DiscordIcon, GithubIcon } from './Mail';

const navLinks = [
  { to: '/', label: 'Overview', end: true },
  { to: '/blog', label: 'Blog' },
  { to: '/community', label: 'Community' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/docs', label: 'Docs' },
];

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  'group relative flex items-center gap-2 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ' +
  (isActive ? 'text-paper' : 'text-slate-400 hover:text-paper');

const footerLinks = [
  {
    title: 'Nihil',
    links: [
      { to: '/docs', label: 'Install' },
      { to: '/docs/usage', label: 'CLI reference' },
      { to: '/docs/images', label: 'Images' },
      { to: '/#transmissions', label: 'Watch it work' },
    ],
  },
  {
    title: 'Project',
    links: [
      { to: '/source-code', label: 'Source code' },
      { to: '/blog', label: 'Blog' },
      { to: '/community', label: 'Community' },
      { to: '/pricing', label: 'Pricing' },
    ],
  },
];

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const fullBleed = location.pathname === '/';

  React.useEffect(() => { setMenuOpen(false); }, [location]);

  // Scroll to the home demo reel; navigate home first when on another page.
  const watchDemos = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    if (location.pathname === '/') {
      document.getElementById('transmissions')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#transmissions');
    }
  };

  return (
    <div className="grain min-h-screen bg-ink text-slate-100 flex flex-col relative">
      <SeoMeta />
      <header className="sticky top-0 z-50 bg-ink/85 backdrop-blur-xl border-b border-slate-800/80">
        <AirmailBar className="h-1" />
        <div className="max-w-[88rem] mx-auto px-5 md:px-8 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/assets/thenullpigeonslogo.png"
              alt=""
              className="h-9 w-9 object-contain transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110"
            />
            <span className="flex flex-col leading-none">
              <span className="display text-paper text-[22px] leading-none">TheNullPigeons</span>
              <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-slate-500 mt-1">
                Offensive mail service
              </span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center">
            {navLinks.map(({ to, label, end }, i) => (
              <NavLink key={to} to={to} className={navLinkClass} end={end}>
                {({ isActive }) => (
                  <>
                    <span className={isActive ? 'text-amber-500' : 'text-slate-600 group-hover:text-amber-500 transition-colors'}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {label}
                    {isActive && <span className="absolute left-3 right-3 -bottom-[13px] h-[2px] bg-amber-500" />}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <NavLink
              to="/source-code"
              className={({ isActive }) =>
                'flex items-center justify-center w-9 h-9 transition-colors ' +
                (isActive ? 'text-paper' : 'text-slate-400 hover:text-paper')
              }
              aria-label="Source code"
            >
              <GithubIcon className="w-[18px] h-[18px]" />
            </NavLink>
            <a
              href="/#transmissions"
              onClick={watchDemos}
              className="flex items-center gap-2 h-9 px-3.5 bg-paper text-ink font-mono text-[11px] uppercase tracking-[0.14em] font-semibold hover:bg-amber-500 transition-colors"
            >
              Watch it work
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden flex items-center gap-2 h-9 px-3 border border-slate-700 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-200"
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-ink px-5 py-4">
            {[...navLinks, { to: '/source-code', label: 'Source code', end: false }].map(
              ({ to, label, end }, i) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    'flex items-baseline gap-4 py-3 border-b border-slate-800/80 display text-4xl ' +
                    (isActive ? 'text-amber-500' : 'text-paper')
                  }
                >
                  <span className="font-mono text-[11px] text-slate-500">{String(i + 1).padStart(2, '0')}</span>
                  {label}
                </NavLink>
              ),
            )}
          </div>
        )}
      </header>

      <main className="flex-1 relative z-10">
        {fullBleed ? children : <div className="max-w-[88rem] mx-auto px-5 md:px-8 py-12 md:py-16">{children}</div>}
      </main>

      <footer className="relative z-10 border-t border-slate-800 bg-ink overflow-hidden">
        <div className="max-w-[88rem] mx-auto px-5 md:px-8 pt-16 pb-8">
          <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div className="space-y-5 max-w-sm">
              <p className="display text-3xl text-paper leading-tight">
                Open-source offensive tooling,{' '}
                <span className="stencil text-amber-500">hand-delivered.</span>
              </p>
              <p className="text-sm text-slate-400 leading-relaxed">
                No telemetry, no licence key, no black box. Just Dockerfiles, a CLI, and a flock of
                pigeons with better opsec than most.
              </p>
            </div>
            {footerLinks.map((col) => (
              <div key={col.title} className="space-y-4">
                <p className="eyebrow">{col.title}</p>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.to}>
                      <Link to={l.to} className="text-sm text-slate-300 hover:text-amber-500 transition-colors">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="space-y-4">
              <p className="eyebrow">Elsewhere</p>
              <ul className="space-y-2.5">
                <li>
                  <a href="https://github.com/TheNullPigeons" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-amber-500 transition-colors">
                    <GithubIcon className="w-3.5 h-3.5" /> GitHub
                  </a>
                </li>
                <li>
                  <a href="https://discord.gg/YzjaNpRRPX" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-amber-500 transition-colors">
                    <DiscordIcon className="w-3.5 h-3.5" /> Discord
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-amber-500 text-ink select-none overflow-hidden" aria-hidden>
          <div className="@container max-w-[88rem] mx-auto px-5 md:px-8">
            {/* Line-height equals the cap height (0.81em), so equal padding centres the capitals vertically.
                The ink is 6.55em wide; sizing in cqw makes it fill the container exactly. */}
            <p className="display whitespace-nowrap text-center leading-[0.81] pt-[0.13em] pb-[0.10em] text-[length:calc(100cqw/6.6)]">
              TheNull<span className="stencil">Pigeons</span>
            </p>
          </div>
        </div>

        <div className="border-t border-slate-800">
          <div className="max-w-[88rem] mx-auto px-5 md:px-8 py-4 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-slate-500">
            <span>
              Built by{' '}
              <a href="https://github.com/0xbbuddha" target="_blank" rel="noreferrer" className="text-slate-300 hover:text-amber-500 transition-colors">
                Killian Prin-Abeil
              </a>{' '}&amp;{' '}
              <a href="https://github.com/Goultarde" target="_blank" rel="noreferrer" className="text-slate-300 hover:text-amber-500 transition-colors">
                Harouna Coulibaly
              </a>
            </span>
            <span>90% coffee · 10% exploits · 100% pigeons</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
