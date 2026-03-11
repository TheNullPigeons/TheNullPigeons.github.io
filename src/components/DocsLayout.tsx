import React from 'react';
import { NavLink } from 'react-router-dom';

const sections = [
  {
    title: 'Getting Started',
    items: [
      { label: 'Linux', to: '/docs/installation/linux' },
      { label: 'macOS', to: '/docs/installation/macos' },
      { label: 'Windows', to: '/docs/installation/windows' },
    ],
  },
  {
    title: 'Usage',
    items: [
      { label: 'CLI Commands', to: '/docs/usage' },
    ],
  },
  {
    title: 'Features',
    items: [
      { label: 'Shell Completion', to: '/docs/completion' },
      { label: 'Command History', to: '/docs/history' },
    ],
  },
  {
    title: 'More',
    items: [
      { label: 'FAQ', to: '/docs/faq' },
      { label: 'About', to: '/docs/about' },
    ],
  },
];

export const DocsLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex gap-10 items-start">
      <aside className="w-48 shrink-0 sticky top-24 hidden md:block">
        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.title}>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 mb-2 px-3">
                {section.title}
              </p>
              <nav className="space-y-0.5">
                {section.items.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      'block px-3 py-1.5 rounded-md text-sm transition-colors ' +
                      (isActive
                        ? 'bg-amber-400/10 text-amber-300 font-medium'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60')
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </aside>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
};
