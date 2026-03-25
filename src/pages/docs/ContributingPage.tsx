import React from 'react';
import { SectionToc } from '../../components/SectionToc';
import { Callout, StepList, TldrBlock } from '../../components/DocsBlocks';

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
          <section id="tldr">
            <TldrBlock
              items={[
                'Use issues first for bugs/tool requests.',
                'Open PRs with reproducible steps and context.',
                'Focus on maintainable modules + tools.json updates.',
                'Prefer small incremental contributions.',
              ]}
            />
          </section>

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
            <Callout variant="tip" title="Fast acceptance path">
              Small, scoped PRs (one tool or one module change) are easier to review and merge.
            </Callout>
          </section>

          {/* Dev setup */}
          <section id="dev-setup" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Development setup</h2>
            <StepList
              steps={[
                { title: 'Clone target repo', detail: 'Pick nihil, nihil-images, or nihil-history.' },
                { title: 'Use the repo-native workflow', detail: 'Wrapper/history use pipx editable. nihil-images uses Docker build scripts.' },
                { title: 'Run validation before PR', detail: 'Tests for Python repos, build/check scripts for image repo.' },
              ]}
            />
            <div className="space-y-3">
              <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-3">
                <p className="text-xs text-slate-300 font-medium mb-2">nihil / nihil-history</p>
                <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`git clone <repo-url>
cd <repo>
pipx install -e .
pytest`}
                </pre>
              </div>
              <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-3">
                <p className="text-xs text-slate-300 font-medium mb-2">nihil-images</p>
                <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`git clone https://github.com/TheNullPigeons/nihil-images.git
cd nihil-images
docker build -f Dockerfile -t nihil:full .`}
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
docker build -f Dockerfile -t nihil:full .
docker build -f Dockerfile.ad -t nihil:ad .`}
                </pre>
                <p className="text-slate-500 text-xs">
                  Build only the variant you need for faster iteration.
                </p>
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
                <p className="text-slate-400 text-xs">
                  Add a module in <code>build/modules/</code>, call the right registry helper, then wire it into the Dockerfile.
                </p>
                <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`RUN ./entrypoint.sh install_redteam_custom`}
                </pre>
              </div>
            </div>
          </section>

        </div>

        <SectionToc
          items={[
            { id: 'tldr', label: 'TL;DR' },
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
