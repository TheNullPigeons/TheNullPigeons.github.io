import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import dockerfile from 'highlight.js/lib/languages/dockerfile';
import ini from 'highlight.js/lib/languages/ini';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import powershell from 'highlight.js/lib/languages/powershell';
import python from 'highlight.js/lib/languages/python';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import yaml from 'highlight.js/lib/languages/yaml';

hljs.registerLanguage('bash', bash);
hljs.registerLanguage('dockerfile', dockerfile);
hljs.registerLanguage('ini', ini);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('json', json);
hljs.registerLanguage('powershell', powershell);
hljs.registerLanguage('python', python);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('yaml', yaml);

interface SidebarSection {
  title: string;
  icon: React.ReactNode;
  items: { label: string; to: string }[];
}

const sections: SidebarSection[] = [
  {
    title: 'Nihil Wrapper',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m5.96 5.96a14.926 14.926 0 01-5.84 2.58m0 0a14.926 14.926 0 01-5.84-2.58" />
      </svg>
    ),
    items: [
      { label: 'Linux', to: '/docs/installation/linux' },
      { label: 'macOS', to: '/docs/installation/macos' },
      { label: 'Windows', to: '/docs/installation/windows' },
      { label: 'CLI Commands', to: '/docs/usage' },
      { label: 'Configuration', to: '/docs/configuration' },
      { label: 'Services', to: '/docs/service' },
      { label: 'Shell Completion', to: '/docs/completion' },
      { label: 'Command History', to: '/docs/history' },
    ],
  },
  {
    title: 'Nihil Images',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    items: [
      { label: 'Available Images', to: '/docs/images' },
      { label: 'Architecture', to: '/docs/architecture' },
    ],
  },
  {
    title: 'Nihil History',
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
    title: 'Nihil MCP',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    items: [
      { label: 'Overview', to: '/docs/mcp' },
    ],
  },
  {
    title: 'About',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
      </svg>
    ),
    items: [
      { label: 'About Nihil', to: '/docs/about' },
      { label: 'FAQ', to: '/docs/faq' },
      { label: 'Contributing', to: '/docs/contributing' },
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

  useEffect(() => {
    const candidates = ['bash', 'powershell', 'json', 'yaml', 'python', 'xml', 'javascript', 'typescript', 'ini', 'dockerfile'];
    const commandLineRe = /^\s*(\$|#)?\s*[a-zA-Z0-9_.-]+(?:\s+[-][-\w]+|\s+[A-Za-z0-9_./~:@'"=+-]+)*\s*$/;
    const terminalPrefixes = ['nihil ', 'nhi ', 'nxh ', 'docker ', 'git ', 'pip ', 'pipx ', 'python ', 'npm ', 'pnpm ', 'yarn ', 'curl ', 'wget ', 'sudo '];
    const looksLikeTerminal = (text: string) => {
      const lines = text
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);
      if (!lines.length) return false;
      const matches = lines.filter((line) => {
        const lower = line.toLowerCase();
        if (lower.startsWith('#')) return true;
        if (terminalPrefixes.some((prefix) => lower.startsWith(prefix))) return true;
        return commandLineRe.test(line);
      }).length;
      return matches / lines.length >= 0.6;
    };
    const escapeHtml = (value: string) =>
      value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;');
    const renderTerminalHtml = (text: string) => {
      const lines = text.split('\n');
      return lines
        .map((rawLine) => {
          const line = rawLine.trim();
          if (!line) return '<span class="cmd-line"></span>';
          if (line.startsWith('#')) {
            return `<span class="cmd-comment">${escapeHtml(rawLine)}</span>`;
          }
          const tokens = line.split(/\s+/);
          let prompt = '';
          let command = tokens[0] ?? '';
          let rest = tokens.slice(1);
          if ((command === '$' || command === '#') && tokens.length > 1) {
            prompt = command;
            command = tokens[1];
            rest = tokens.slice(2);
          }
          const promptPart = prompt
            ? `<span class="cmd-prompt">${escapeHtml(prompt)}</span> `
            : '';
          const commandPart = `<span class="cmd-bin">${escapeHtml(command)}</span>`;
          const argsPart = rest.length
            ? ` <span class="cmd-args">${escapeHtml(rest.join(' '))}</span>`
            : '';
          return `<span class="cmd-line">${promptPart}${commandPart}${argsPart}</span>`;
        })
        .join('');
    };

    const blocks = document.querySelectorAll('.docs-content pre');
    blocks.forEach((pre) => {
      if (pre.dataset.enhanced === '1') return;
      pre.dataset.enhanced = '1';

      let code = pre.querySelector('code');
      if (!code) {
        code = document.createElement('code');
        code.textContent = pre.textContent ?? '';
        pre.textContent = '';
        pre.appendChild(code);
      }

      const source = code.textContent ?? '';
      const isTerminal = looksLikeTerminal(source);
      const highlighted = isTerminal
        ? { value: renderTerminalHtml(source) }
        : hljs.highlightAuto(source, candidates);
      const language = isTerminal ? 'shell' : (highlighted.language ?? 'text');
      code.innerHTML = highlighted.value;
      code.classList.add('hljs', `language-${language}`);

      const wrapper = document.createElement('div');
      wrapper.className = 'code-shell';
      pre.parentNode?.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      const header = document.createElement('div');
      header.className = 'code-shell-head';

      const label = document.createElement('span');
      label.className = 'code-shell-lang';
      label.textContent = language;

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'code-shell-copy';
      button.textContent = 'Copy';
      button.onclick = async () => {
        try {
          await navigator.clipboard.writeText(source);
          button.textContent = 'Copied';
          window.setTimeout(() => {
            button.textContent = 'Copy';
          }, 1200);
        } catch {
          button.textContent = 'Error';
          window.setTimeout(() => {
            button.textContent = 'Copy';
          }, 1200);
        }
      };

      header.append(label, button);
      wrapper.prepend(header);
      pre.classList.add('code-shell-pre');
    });
  }, [location.pathname]);

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
      <div className="flex-1 min-w-0 docs-content">{children}</div>
    </div>
  );
};
