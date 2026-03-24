import React from 'react';
import { SectionToc } from '../../components/SectionToc';

export const ContributingPage: React.FC = () => {
  return (
    <div className="space-y-8 w-full">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          Docs / <span className="text-amber-400">Contributing</span>
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          Contributing
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl">
          Report bugs, request tools, or contribute code to the nihil ecosystem.
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {['Issues', 'Tool requests', 'Dev setup', 'Custom images'].map((badge) => (
            <span key={badge} className="text-[10px] px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300/90 font-semibold tracking-wide">
              {badge}
            </span>
          ))}
        </div>
      </header>

      <div className="grid sm:grid-cols-[minmax(0,_1fr)_180px] gap-8 items-start">
        <div className="space-y-10 min-w-0">

          {/* Bug reports */}
          <section id="bugs" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Report a bug</h2>
            <p className="text-slate-400 text-sm">Open an issue on the relevant repository:</p>
            <div className="space-y-2">
              {[
                { name: 'nihil', desc: 'CLI wrapper', url: 'https://github.com/TheNullPigeons/nihil/issues' },
                { name: 'nihil-images', desc: 'Docker images', url: 'https://github.com/TheNullPigeons/nihil-images/issues' },
                { name: 'nihil-history', desc: 'Engagement manager', url: 'https://github.com/TheNullPigeons/nihil-history/issues' },
              ].map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/50 border border-slate-800 hover:border-amber-500/30 transition-colors group"
                >
                  <div>
                    <p className="text-sm font-medium text-white group-hover:text-amber-300 transition-colors">{repo.name}</p>
                    <p className="text-xs text-slate-500">{repo.desc}</p>
                  </div>
                  <svg className="w-4 h-4 text-slate-600 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ))}
            </div>
            <div className="space-y-2">
              <p className="text-sm text-slate-300 font-medium">Include in your issue:</p>
              <ul className="list-disc list-inside text-slate-400 text-xs space-y-1">
                <li>What you did</li>
                <li>What you expected</li>
                <li>What happened instead</li>
                <li><code className="text-amber-300 font-mono">nihil doctor</code> output</li>
                <li><code className="text-amber-300 font-mono">nihil --version</code></li>
              </ul>
            </div>
          </section>

          {/* Add a tool */}
          <section id="add-tool" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Add a tool to the images</h2>
            <p className="text-slate-400 text-sm">Want a tool added? Two options:</p>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800">
                <p className="text-sm font-medium text-amber-300">1. Open an issue</p>
                <p className="text-xs text-slate-400 mt-1">
                  On <a href="https://github.com/TheNullPigeons/nihil-images/issues" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">nihil-images</a> with
                  the tool name and install method.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800">
                <p className="text-sm font-medium text-amber-300">2. Submit a PR</p>
                <p className="text-xs text-slate-400 mt-1">
                  Add the tool to the appropriate module in <code className="font-mono text-slate-300">build/modules/</code> and
                  register it in <code className="font-mono text-slate-300">build/config/tools.json</code>.
                </p>
              </div>
            </div>
          </section>

          {/* Dev setup */}
          <section id="dev-setup" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Development setup</h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-base font-medium text-white">nihil CLI</h3>
                <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`git clone https://github.com/TheNullPigeons/nihil.git
cd nihil
pipx install -e .

# Run tests
pytest`}
                </pre>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-medium text-white">nihil-history</h3>
                <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`git clone https://github.com/TheNullPigeons/nihil-history.git
cd nihil-history
pipx install -e .

# Run tests
pytest`}
                </pre>
              </div>
            </div>
          </section>

          {/* Build custom image */}
          <section id="custom-image" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Build a custom image</h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-base font-medium text-white">From source</h3>
                <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`git clone https://github.com/TheNullPigeons/nihil-images.git
cd nihil-images

# Full image
docker build -f Dockerfile -t nihil:full .

# AD image
docker build -f Dockerfile.ad -t nihil:ad .

# Web image
docker build -f Dockerfile.web -t nihil:web .`}
                </pre>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-medium text-white">Derived image</h3>
                <p className="text-slate-400 text-xs">Extend an existing nihil image with your own tools:</p>
                <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`FROM ghcr.io/thenullpigeons/ad:latest

RUN pacman -Sy --noconfirm && \\
    pacman -S --noconfirm my-custom-tool && \\
    pacman -Sc --noconfirm`}
                </pre>
                <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`docker build -t nihil:custom .`}
                </pre>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-medium text-white">Custom module</h3>
                <p className="text-slate-400 text-xs">Create a new module for permanent tool additions:</p>
                <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`# build/modules/redteam_custom.sh
#!/bin/bash
SCRIPT_DIR="$(cd "$(dirname "\${BASH_SOURCE[0]}")" && pwd)"
source "\${SCRIPT_DIR}/../lib/common.sh"
source "\${SCRIPT_DIR}/../lib/registry/redteam_pipx.sh"

function install_redteam_custom() {
    colorecho "Installing custom tools"
    install_pipx_tool "mytool" "mytool-package"
    colorecho "Custom tools installed"
}`}
                </pre>
                <p className="text-slate-400 text-xs">Then add to the Dockerfile:</p>
                <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`RUN ./entrypoint.sh install_redteam_custom`}
                </pre>
              </div>
            </div>
          </section>

        </div>

        <SectionToc
          items={[
            { id: 'bugs', label: 'Report a bug' },
            { id: 'add-tool', label: 'Add a tool' },
            { id: 'dev-setup', label: 'Dev setup' },
            { id: 'custom-image', label: 'Custom image' },
          ]}
        />
      </div>
    </div>
  );
};
