import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../config/blog';
import { SectionLabel } from '../components/Mail';

export const BlogPage: React.FC = () => {
  const sorted = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="space-y-16">
      <header className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6 items-end">
        <div className="space-y-5">
          <SectionLabel index="00">Dispatches</SectionLabel>
          <h1 className="text-5xl md:text-8xl font-bold display text-paper leading-[0.9]">
            Notes from <br />
            <span className="stencil text-amber-500">the field.</span>
          </h1>
        </div>
        <p className="text-slate-400 md:text-lg leading-relaxed max-w-md md:justify-self-end">
          Write-ups, release notes and thoughts from TheNullPigeons.
        </p>
      </header>

      {sorted.length === 0 ? (
        <div className="airmail-frame max-w-3xl">
          <div className="bg-paper text-ink px-6 py-12 md:px-12 md:py-16 space-y-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50">Inbox · 0 messages</p>
            <p className="text-3xl md:text-5xl font-bold display leading-tight">
              No dispatches yet. <span className="stencil text-amber-600">Check back soon.</span>
            </p>
            <p className="text-ink/60">We&apos;re writing. Pigeons don&apos;t type fast.</p>
          </div>
        </div>
      ) : (
        <ul className="border-t border-slate-800">
          {sorted.map((post) => (
            <li key={post.slug}>
              <Link
                to={`/blog/${post.slug}`}
                className="group grid md:grid-cols-[10rem_minmax(0,1fr)] gap-x-10 gap-y-3 py-9 border-b border-slate-800"
              >
                <time className="font-mono text-xs text-slate-500 tabular-nums pt-2">{post.date}</time>
                <div className="space-y-3">
                  <h2 className="text-3xl md:text-4xl font-semibold display text-paper group-hover:text-amber-500 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-slate-400 leading-relaxed max-w-2xl">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="font-mono text-[10.5px] uppercase tracking-[0.14em] px-2 py-0.5 border border-slate-700 text-slate-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
