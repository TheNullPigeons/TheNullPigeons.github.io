import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FlyingPigeons } from './FlyingPigeons';

const navLinks = [
  { to: '/', label: 'Overview', end: true },
  { to: '/blog', label: 'Blog' },
  { to: '/community', label: 'Community' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/docs', label: 'Docs' },
];

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ' +
  (isActive
    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
    : 'text-slate-400 hover:text-white hover:bg-slate-800/80 border border-transparent');

const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  'block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ' +
  (isActive
    ? 'bg-cyan-500/20 text-cyan-300'
    : 'text-slate-300 hover:text-white hover:bg-slate-800/60');

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu on navigation
  React.useEffect(() => { setMenuOpen(false); }, [location]);

  return (
    <div className="min-h-screen bg-black text-slate-100 flex flex-col relative">
      <FlyingPigeons />
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-black/85 backdrop-blur-xl">
        <div className="max-w-[96rem] mx-auto px-4 py-3 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/assets/thenullpigeonslogo.png"
              alt="TheNullPigeons"
              className="h-10 w-10 object-contain transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-semibold tracking-tight text-white">TheNullPigeons</span>
              <span className="text-xs text-slate-400">Offensive tooling</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map(({ to, label, end }) => (
              <NavLink key={to} to={to} className={navLinkClass} end={end}>
                {label}
              </NavLink>
            ))}
            <NavLink
              to="/source-code"
              className={({ isActive }) =>
                'flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200 border ' +
                (isActive
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/80 border-transparent')
              }
              aria-label="Source Code"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.372 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.578 0-.285-.011-1.04-.016-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.93 0-1.31.468-2.382 1.236-3.22-.124-.303-.536-1.524.116-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.984-.399 3.004-.404 1.02.005 2.047.138 3.005.404 2.292-1.552 3.298-1.23 3.298-1.23.653 1.652.24 2.873.118 3.176.77.838 1.235 1.91 1.235 3.22 0 4.61-2.807 5.624-5.48 5.92.43.372.814 1.103.814 2.222 0 1.604-.015 2.896-.015 3.29 0 .319.192.694.8.576C20.565 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </NavLink>
          </nav>

          {/* Hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-slate-700 bg-slate-900/60 text-slate-300 hover:text-white hover:border-slate-600 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-slate-800/80 bg-black/95 px-4 py-3 space-y-1">
            {navLinks.map(({ to, label, end }) => (
              <NavLink key={to} to={to} className={mobileNavLinkClass} end={end}>
                {label}
              </NavLink>
            ))}
            <NavLink to="/source-code" className={mobileNavLinkClass}>
              <span className="inline-flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.372 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.578 0-.285-.011-1.04-.016-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.93 0-1.31.468-2.382 1.236-3.22-.124-.303-.536-1.524.116-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.984-.399 3.004-.404 1.02.005 2.047.138 3.005.404 2.292-1.552 3.298-1.23 3.298-1.23.653 1.652.24 2.873.118 3.176.77.838 1.235 1.91 1.235 3.22 0 4.61-2.807 5.624-5.48 5.92.43.372.814 1.103.814 2.222 0 1.604-.015 2.896-.015 3.29 0 .319.192.694.8.576C20.565 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                Source Code
              </span>
            </NavLink>
          </div>
        )}
      </header>

      <main className="flex-1">
        <div className="max-w-[96rem] mx-auto px-4 py-10">{children}</div>
      </main>

      <footer className="border-t border-slate-800 bg-black/90 text-xs text-slate-500">
        <div className="max-w-[96rem] mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-2">
          <span>
            Built by{' '}
            <a href="https://github.com/0xbbuddha" target="_blank" rel="noreferrer"
              className="text-slate-300 hover:text-amber-400 transition-colors underline-offset-2 hover:underline">
              Killian Prin-Abeil
            </a>{' '}&{' '}
            <a href="https://github.com/Goultarde" target="_blank" rel="noreferrer"
              className="text-slate-300 hover:text-amber-400 transition-colors underline-offset-2 hover:underline">
              Harouna Coulibaly
            </a>
          </span>
          <span className="text-slate-600">90% coffee, 10% exploits. 100% pigeons.</span>
        </div>
      </footer>
    </div>
  );
};
