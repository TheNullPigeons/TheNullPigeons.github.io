import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchIndex, type SearchEntry } from '../config/searchIndex';

function scoreEntry(entry: SearchEntry, query: string): number {
  const haystack = `${entry.page} ${entry.label} ${(entry.keywords ?? []).join(' ')}`.toLowerCase();
  if (!haystack.includes(query)) return -1;

  let score = 0;
  if (entry.page.toLowerCase().startsWith(query)) score += 3;
  if (entry.label.toLowerCase().startsWith(query)) score += 2;
  if (entry.label.toLowerCase().includes(query)) score += 1;
  return score;
}

function useFilteredResults(query: string): SearchEntry[] {
  return useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return searchIndex
      .map((entry) => ({ entry, score: scoreEntry(entry, q) }))
      .filter(({ score }) => score >= 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map(({ entry }) => entry);
  }, [query]);
}

export const DocsSearch: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const results = useFilteredResults(query);

  const close = () => {
    setOpen(false);
    setQuery('');
    setActiveIndex(0);
  };

  const go = (entry: SearchEntry) => {
    navigate(entry.path);
    close();
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === 'Escape') {
        close();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const picked = results[activeIndex];
      if (picked) go(picked);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-left text-sm text-slate-400 bg-slate-950/60 border border-slate-800 hover:border-slate-700 hover:text-slate-200 transition-colors"
      >
        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M19 11a8 8 0 11-16 0 8 8 0 0116 0z" />
        </svg>
        <span className="flex-1">Search docs</span>
        <kbd className="hidden md:inline text-[10px] px-1.5 py-0.5 rounded border border-slate-700 text-slate-500">
          Ctrl K
        </kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4 bg-black/70 backdrop-blur-sm"
          onClick={close}
        >
          <div
            className="w-full max-w-lg rounded-xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-3">
              <svg className="w-4 h-4 text-slate-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M19 11a8 8 0 11-16 0 8 8 0 0116 0z" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Search the docs..."
                className="flex-1 bg-transparent text-sm text-slate-100 placeholder:text-slate-500 outline-none"
              />
              <kbd className="text-[10px] px-1.5 py-0.5 rounded border border-slate-700 text-slate-500">Esc</kbd>
            </div>

            {query.trim() !== '' && (
              <ul className="max-h-80 overflow-y-auto py-2">
                {results.length === 0 && (
                  <li className="px-4 py-6 text-center text-sm text-slate-500">No results for "{query}"</li>
                )}
                {results.map((entry, i) => (
                  <li key={entry.path}>
                    <button
                      type="button"
                      onMouseEnter={() => setActiveIndex(i)}
                      onClick={() => go(entry)}
                      className={
                        'w-full text-left px-4 py-2.5 flex flex-col gap-0.5 transition-colors ' +
                        (i === activeIndex ? 'bg-amber-500/10' : 'hover:bg-slate-800/60')
                      }
                    >
                      <span className={'text-sm ' + (i === activeIndex ? 'text-amber-300' : 'text-slate-200')}>
                        {entry.label}
                      </span>
                      <span className="text-xs text-slate-500">{entry.page}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
};
