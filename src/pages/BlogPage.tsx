import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../config/blog';

export const BlogPage: React.FC = () => {
  const sorted = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="space-y-12 max-w-3xl mx-auto">
      <header className="space-y-3">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          <span className="text-amber-400">Blog</span>
        </h1>
        <p className="text-slate-400 text-lg">
          Notes, write-ups and thoughts from TheNullPigeons.
        </p>
      </header>

      {sorted.length === 0 ? (
        <div className="rounded-xl border border-slate-700/80 bg-slate-900/50 p-10 text-center space-y-3">
          <p className="text-slate-400 text-lg">No articles yet, check back soon.</p>
          <p className="text-slate-600 text-sm">We're writing. Pigeons don't type fast.</p>
        </div>
      ) : (
        <ul className="space-y-6">
          {sorted.map((post) => (
            <li key={post.slug}>
              <Link
                to={`/blog/${post.slug}`}
                className="group block rounded-xl border border-slate-700/80 bg-slate-900/50 p-6 hover:border-amber-500/30 hover:bg-slate-900/80 transition-all duration-200"
              >
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <time className="text-xs text-slate-500 tabular-nums">{post.date}</time>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-lg font-semibold text-white group-hover:text-amber-400 transition-colors mb-1">
                  {post.title}
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed">{post.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
