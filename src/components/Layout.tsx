import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FlyingPigeons } from './FlyingPigeons';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ' +
  (isActive
    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
    : 'text-slate-400 hover:text-white hover:bg-slate-800/80 border border-transparent');

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-black text-slate-100 flex flex-col relative">
      <FlyingPigeons />
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-black/85 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/assets/thenullpigeonslogo.png"
              alt="TheNullPigeons"
              className="h-10 w-10 object-contain transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-semibold tracking-tight text-white">
                TheNullPigeons
              </span>
              <span className="text-xs text-slate-400">Offensive tooling</span>
            </div>
          </Link>
          <nav className="flex items-center gap-2">
            <NavLink to="/" className={navLinkClass} end>
              Overview
            </NavLink>
            <NavLink to="/community" className={navLinkClass}>
              Community
            </NavLink>
            <NavLink to="/pricing" className={navLinkClass}>
              Pricing
            </NavLink>
            <NavLink to="/docs" className={navLinkClass}>
              Docs
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-10">{children}</div>
      </main>
      <footer className="border-t border-slate-800 bg-black/90 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-2">
          <span>
            Built by{' '}
            <a
              href="https://github.com/0xbbuddha"
              target="_blank"
              rel="noreferrer"
              className="text-slate-300 hover:text-amber-400 transition-colors underline-offset-2 hover:underline"
            >
              Killian Prin-Abeil
            </a>{' '}
            &{' '}
            <a
              href="https://github.com/Goultarde"
              target="_blank"
              rel="noreferrer"
              className="text-slate-300 hover:text-amber-400 transition-colors underline-offset-2 hover:underline"
            >
              Harouna Coulibaly
            </a>
          </span>
          <span className="text-slate-600">90% coffee, 10% exploits. 100% pigeons.</span>
        </div>
      </footer>
    </div>
  );
};
