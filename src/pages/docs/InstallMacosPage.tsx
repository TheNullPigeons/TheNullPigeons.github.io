import React from 'react';

export const InstallMacosPage: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          Docs / Getting Started / <span className="text-amber-400">macOS</span>
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          Install Nihil on macOS
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl">
          macOS support is on the roadmap. In the meantime, you can run Nihil via Docker Desktop with some limitations.
        </p>
      </header>

      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-6 space-y-2">
        <p className="text-amber-300 font-medium text-sm">Work in progress</p>
        <p className="text-slate-400 text-sm">
          macOS is not fully supported yet. Docker Desktop on macOS has known limitations with host network mode and device sharing that affect some Nihil features. We recommend using a Linux host for the best experience.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Try it anyway (Docker Desktop)</h2>
        <p className="text-slate-400 text-sm">Install Docker Desktop, then follow the Linux steps:</p>
        <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`# Install pipx if needed
brew install pipx
pipx ensurepath

# Clone and install Nihil
git clone https://github.com/TheNullPigeons/nihil.git
cd nihil
pipx install -e .

# Pull an image and start
nihil install base
nihil start my-pentest`}
        </pre>
        <p className="text-slate-500 text-xs">
          Note: <code className="bg-slate-900 px-1 py-0.5 rounded border border-slate-800">--network host</code> and <code className="bg-slate-900 px-1 py-0.5 rounded border border-slate-800">--privileged</code> may not work as expected on macOS.
        </p>
      </div>
    </div>
  );
};
