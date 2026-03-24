import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LinuxLogo, AppleLogo, WindowsLogo } from '../components/OsLogos';

const GITHUB_RELEASES = 'https://github.com/TheNullPigeons/nihil/releases';

type OS = 'linux' | 'macos' | 'windows';

const osOptions: { id: OS; label: string; Logo: React.FC<{ className?: string }> }[] = [
  { id: 'linux', label: 'Linux', Logo: LinuxLogo },
  { id: 'macos', label: 'macOS', Logo: AppleLogo },
  { id: 'windows', label: 'Windows', Logo: WindowsLogo },
];

const linuxSteps = [
  {
    title: 'Install the Nihil CLI',
    code: `# With pipx (recommended)
pipx install git+https://github.com/TheNullPigeons/nihil.git

# Or from a clone
git clone https://github.com/TheNullPigeons/nihil.git && cd nihil
pip install -e .`,
    note: 'Requires Python 3.12+ and Docker. The CLI will pull images from GitHub Container Registry, no manual docker build needed.',
  },
  {
    title: 'Pull an image (optional)',
    code: `# List available variants
nihil images

# Pull the image you need (e.g. base or active-directory)
nihil install base
nihil install active-directory`,
    note: 'If you skip this step, nihil start will offer to pull the image when you pick a variant.',
  },
  {
    title: 'Start a container',
    code: `# Create and start a container (pulls image if needed)
nihil start demo --image base

# Or use the AD image
nihil start lab --image active-directory`,
    note: 'You get an interactive shell. Use --workspace, --network host, --privileged as needed (see full docs).',
  },
  {
    title: 'Useful commands',
    note: 'nihil info: list images and containers. nihil doctor: check Docker and config. Inside the container, Ctrl+R in zsh to search tool names (bloodhound, netexec, etc.) in history.',
  },
];

const macosSteps = [
  {
    title: 'Coming soon',
    note: 'macOS support (Docker Desktop) is on the roadmap. We recommend Linux to avoid Docker Desktop limitations (e.g. host network mode, device sharing). For now, use a Linux host or VM.',
  },
];

const windowsSteps = [
  {
    title: 'Coming soon',
    note: 'Windows support (WSL2 or native) is on the roadmap. For now, use WSL2 and follow the Linux instructions above.',
  },
];

const stepsByOs: Record<OS, typeof linuxSteps> = {
  linux: linuxSteps,
  macos: macosSteps,
  windows: windowsSteps,
};

export const InstallPage: React.FC = () => {
  const [os, setOs] = useState<OS>('linux');

  const steps = stepsByOs[os];

  return (
    <div className="space-y-12">
      {/* Hero - TheNullPigeons présente son outil */}
      <header className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          <span className="text-amber-400">Discover our tool</span>
          <span className="block text-white text-xl md:text-2xl mt-2 font-normal text-slate-200">
            Nihil, our offensive environment, directly on your host.
          </span>
        </h1>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto">
          We built Nihil for real-world offensive work: infra, Windows, and web. Choose your platform and follow the steps below.
        </p>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto">
          We recommend Linux to avoid Docker Desktop limitations on Windows and macOS (e.g. host network mode, device sharing).
        </p>
      </header>

      {/* Choix OS - switch simple + steps en dessous */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-sm text-slate-400">
            <p className="font-medium text-slate-200">Choose your platform</p>
            <p className="text-xs text-slate-500">
              Linux is fully documented. macOS & Windows are on the roadmap.
            </p>
          </div>
          <div className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/70 p-1 text-xs sm:text-sm">
            {osOptions.map((opt) => {
              const isActive = os === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setOs(opt.id)}
                  className={
                    'flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-200 ' +
                    (isActive
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800')
                  }
                >
                  <opt.Logo className="w-4 h-4 sm:w-5 sm:h-5 text-slate-200" />
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <section className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg md:text-xl font-semibold text-white">
              {os === 'linux' ? 'Linux install (short version)' : os === 'macos' ? 'macOS status' : 'Windows status'}
            </h2>
            {os === 'linux' && (
              <Link
                to="/docs/linux"
                className="text-xs font-medium text-amber-400 hover:text-amber-300 hover:underline underline-offset-2"
              >
                Open full Linux docs
              </Link>
            )}
          </div>

          <div className="space-y-4">
            {steps.map((step, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/20 text-amber-400 text-xs font-semibold">
                    {i + 1}
                  </span>
                  <h3 className="font-medium text-white">{step.title}</h3>
                </div>
                {'code' in step && step.code && (
                  <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto text-slate-200 font-mono">
                    {step.code}
                  </pre>
                )}
                {'note' in step && step.note && (
                  <p className="text-slate-400 text-sm">{step.note}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      </section>

      {/* Footer - notre outil open source */}
      <footer className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-800">
        <p className="text-slate-500 text-sm max-w-md">
          Our tool is open source. Feel free to review the code on GitHub. Use of the code is subject to the terms of the license.
        </p>
        <a
          href={GITHUB_RELEASES}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-600 bg-slate-800/80 text-white text-sm font-medium hover:border-amber-500/40 hover:bg-slate-700/80 transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
          Latest GitHub release
        </a>
      </footer>
    </div>
  );
};
