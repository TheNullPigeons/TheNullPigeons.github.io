import React from 'react';

export const InstallWindowsPage: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          Docs / Getting Started / <span className="text-amber-400">Windows</span>
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          Install Nihil on Windows
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl">
          Native Windows support is on the roadmap. For now, use WSL2 and follow the Linux guide.
        </p>
      </header>

      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-6 space-y-2">
        <p className="text-amber-300 font-medium text-sm">Work in progress</p>
        <p className="text-slate-400 text-sm">
          Windows support is not available yet. The recommended workaround is to use WSL2 (Windows Subsystem for Linux) with Docker Desktop.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">WSL2 workaround</h2>
        <ol className="list-decimal list-inside space-y-3 text-slate-400 text-sm">
          <li>
            Install WSL2:{' '}
            <code className="text-xs bg-slate-900 px-1 py-0.5 rounded border border-slate-700">wsl --install</code>
          </li>
          <li>Install Docker Desktop and enable the WSL2 backend</li>
          <li>Open a WSL2 terminal and follow the <a href="/docs/installation/linux" className="text-amber-400 hover:underline">Linux install guide</a></li>
        </ol>
      </div>
    </div>
  );
};
