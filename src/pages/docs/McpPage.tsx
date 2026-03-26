import React from 'react';

export const McpPage: React.FC = () => {
  return (
    <div className="space-y-8 w-full">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          Docs / <span className="text-amber-400">Nihil MCP</span>
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          Nihil MCP
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl">
          Model Context Protocol integration for nihil.
        </p>
      </header>

      <div className="space-y-10 min-w-0">
        <p className="text-slate-500 text-sm italic">
          Content coming soon.
        </p>
      </div>
    </div>
  );
};
