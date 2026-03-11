import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { blogPosts } from '../config/blog';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <article className="max-w-3xl mx-auto space-y-8">
      {/* Back */}
      <Link
        to="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-amber-400 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to blog
      </Link>

      {/* Header */}
      <header className="space-y-3 border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-2">
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
        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-white">
          {post.title}
        </h1>
        <p className="text-slate-400 text-lg leading-relaxed">{post.excerpt}</p>
      </header>

      {/* Content */}
      <div
        className="prose prose-invert prose-slate max-w-none
          prose-headings:font-display prose-headings:tracking-tight
          prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline
          prose-code:text-amber-300 prose-code:bg-slate-800/80 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
          prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-700/80"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
};
