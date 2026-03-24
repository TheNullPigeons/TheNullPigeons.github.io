import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

interface SidebarSection {
  title: string;
  icon: React.ReactNode;
  items: { label: string; to: string }[];
}

const sections: SidebarSection[] = [
  {
    title: 'Getting Started',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m5.96 5.96a14.926 14.926 0 01-5.84 2.58m0 0a14.926 14.926 0 01-5.84-2.58" />
      </svg>
    ),
    items: [
      { label: 'Linux', to: '/docs/installation/linux' },
      { label: 'macOS', to: '/docs/installation/macos' },
      { label: 'Windows', to: '/docs/installation/windows' },
    ],
  },
  {
    title: 'Usage',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    items: [
      { label: 'CLI Commands', to: '/docs/usage' },
      { label: 'Configuration', to: '/docs/configuration' },
    ],
  },
  {
    title: 'Images',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
      </svg>
    ),
    items: [
      { label: 'Available Images', to: '/docs/images' },
    ],
  },
  {
    title: 'nihil-history',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    items: [
      { label: 'Overview & CLI', to: '/docs/nihil-history' },
    ],
  },
  {
    title: 'Features',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
    items: [
      { label: 'Shell Completion', to: '/docs/completion' },
      { label: 'Command History', to: '/docs/history' },
    ],
  },
  {
    title: 'Project',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
      </svg>
    ),
    items: [
      { label: 'Architecture', to: '/docs/architecture' },
      { label: 'Contributing', to: '/docs/contributing' },
    ],
  },
  {
    title: 'More',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    items: [
      { label: 'FAQ', to: '/docs/faq' },
      { label: 'About', to: '/docs/about' },
    ],
  },
];

const SidebarSection: React.FC<{ section: SidebarSection; defaultOpen: boolean }> = ({ section, defaultOpen }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-left group transition-colors hover:bg-slate-800/40"
      >
        <span className="text-slate-500 group-hover:text-amber-400 transition-colors">
          {section.icon}
        </span>
        <span className="text-[12px] font-semibold uppercase tracking-wider text-slate-400 group-hover:text-slate-200 transition-colors flex-1">
          {section.title}
        </span>
        <svg
          className={
            'w-3.5 h-3.5 text-slate-600 transition-transform duration-200 ' +
            (open ? 'rotate-90' : '')
          }
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      <div
        className={
          'overflow-hidden transition-all duration-200 ' +
          (open ? 'max-h-96 opacity-100 mt-1' : 'max-h-0 opacity-0')
        }
      >
        <nav className="space-y-0.5 ml-3 pl-3 border-l border-slate-800/80">
          {section.items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                'block px-3 py-1.5 rounded-md text-[13px] transition-all duration-150 ' +
                (isActive
                  ? 'bg-gradient-to-r from-amber-400/10 to-transparent text-amber-300 font-medium border-l-2 border-amber-400 -ml-[13px] pl-[23px]'
                  : 'text-slate-500 hover:text-slate-200 hover:bg-slate-800/40')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export const DocsLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  // Auto-open the section that contains the current page
  const isInSection = (section: SidebarSection) =>
    section.items.some((item) => location.pathname === item.to);

  return (
    <div className="flex gap-12 items-start">
      <aside className="w-60 shrink-0 sticky top-24 hidden md:block">
        <div className="space-y-1 p-2 rounded-xl bg-slate-900/30 border border-slate-800/50 backdrop-blur-sm">
          <div className="px-3 pt-1 pb-2 mb-1 border-b border-slate-800/50">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-600">Documentation</p>
          </div>
          {sections.map((section) => (
            <SidebarSection
              key={section.title}
              section={section}
              defaultOpen={isInSection(section)}
            />
          ))}
        </div>
      </aside>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
};
