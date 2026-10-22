import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { DocsSearch } from './DocsSearch';
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
  items: { label: string; to: string }[];
}

const sections: SidebarSection[] = [
  {
    title: 'Nihil Wrapper',
    items: [
      { label: 'Linux', to: '/docs/installation/linux' },
      { label: 'macOS', to: '/docs/installation/macos' },
      { label: 'Windows', to: '/docs/installation/windows' },
      { label: 'CLI Commands', to: '/docs/usage' },
      { label: 'Configuration', to: '/docs/configuration' },
      { label: 'Network & VPN', to: '/docs/network-vpn' },
      { label: 'Shell Completion', to: '/docs/completion' },
      { label: 'Command History', to: '/docs/history' },
    ],
  },
  {
    title: 'Nihil Images',
    items: [
      { label: 'Available Images', to: '/docs/images' },
      { label: 'Tools', to: '/docs/tools' },
      { label: 'Architecture', to: '/docs/architecture' },
      { label: 'Services', to: '/docs/service' },
    ],
  },
  {
    title: 'Nihil Resources',
    items: [
      { label: 'Overview & Commands', to: '/docs/resources' },
      { label: 'Resource Catalog', to: '/docs/resources/catalog' },
    ],
  },
  {
    title: 'Nihil History',
    items: [
      { label: 'Overview & CLI', to: '/docs/nihil-history' },
    ],
  },
  {
    title: 'Nihil MCP',
    items: [
      { label: 'Overview', to: '/docs/mcp' },
    ],
  },
  {
    title: 'Nihil NTP',
    items: [
      { label: 'Overview & Commands', to: '/docs/nihil-ntp' },
    ],
  },
  {
    title: 'About',
    items: [
      { label: 'About Nihil', to: '/docs/about' },
      { label: 'FAQ', to: '/docs/faq' },
      { label: 'Contributing', to: '/docs/contributing' },
    ],
  },
];

const SidebarSection: React.FC<{ section: SidebarSection; index: number; defaultOpen: boolean }> = ({
  section,
  index,
  defaultOpen,
}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-slate-800/80 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 w-full py-3 text-left group"
        aria-expanded={open}
      >
        <span className="font-mono text-[10px] text-slate-600 group-hover:text-amber-500 transition-colors w-5">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-300 group-hover:text-paper transition-colors flex-1">
          {section.title}
        </span>
        <span className="relative w-2.5 h-2.5" aria-hidden>
          <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-slate-500" />
          <span
            className={
              'absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-slate-500 transition-transform duration-200 ' +
              (open ? 'scale-y-0' : '')
            }
          />
        </span>
      </button>
      <div
        className={
          'overflow-hidden transition-all duration-200 ' +
          (open ? 'max-h-96 opacity-100 pb-3' : 'max-h-0 opacity-0')
        }
      >
        <nav className="ml-8 border-l border-slate-800">
          {section.items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) =>
                'block -ml-px pl-4 py-1.5 text-[13.5px] border-l transition-colors duration-150 ' +
                (isActive
                  ? 'border-amber-500 text-paper font-medium'
                  : 'border-transparent text-slate-400 hover:text-paper hover:border-slate-500')
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

  // Search results can link to `/docs/x#section`; react-router doesn't
  // auto-scroll to a hash when the route itself also changes.
  useEffect(() => {
    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1));
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location.pathname, location.hash]);

  const current = sections.flatMap((sec) => sec.items).find((item) => item.to === location.pathname);

  return (
    <div className="lg:grid lg:grid-cols-[15.5rem_minmax(0,1fr)] gap-14 items-start">
      <aside className="hidden lg:block sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 -mr-2">
        <div className="space-y-5">
          <div className="space-y-3">
            <p className="eyebrow text-[10px]">
              Field manual
            </p>
            <DocsSearch />
          </div>
          <div className="border-t border-slate-800">
            {sections.map((section, i) => (
              <SidebarSection
                key={section.title}
                section={section}
                index={i}
                defaultOpen={isInSection(section)}
              />
            ))}
          </div>
        </div>
      </aside>

      {/* Mobile docs navigation */}
      <div className="lg:hidden mb-8 space-y-3">
        <DocsSearch hotkey={false} />
        <details className="group border border-slate-800">
          <summary className="faq-summary flex items-center justify-between gap-3 px-4 py-3 cursor-pointer">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-400">
              Docs / <span className="text-paper">{current?.label ?? 'Menu'}</span>
            </span>
            <span className="font-mono text-[11px] text-amber-500 group-open:hidden">Open</span>
            <span className="font-mono text-[11px] text-amber-500 hidden group-open:inline">Close</span>
          </summary>
          <div className="px-4 border-t border-slate-800">
            {sections.map((section, i) => (
              <SidebarSection key={section.title} section={section} index={i} defaultOpen={isInSection(section)} />
            ))}
          </div>
        </details>
      </div>

      <div className="min-w-0 docs-content animate-in-docs" key={location.pathname}>
        {children}
      </div>
    </div>
  );
};
