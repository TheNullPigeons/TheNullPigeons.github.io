import React from 'react';
import { SectionToc } from '../../components/SectionToc';
import { Callout, StepList, TldrBlock } from '../../components/DocsBlocks';

export const InstallationPage: React.FC = () => {
  return (
    <div className="space-y-8 w-full">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          Docs / <span className="text-amber-400">Installation</span>
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          Install Nihil on Linux
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl">
          Install nihil quickly, verify your environment, and launch a first container with clean defaults.
        </p>
      </header>

      <div className="grid sm:grid-cols-[minmax(0,_1fr)_180px] gap-8 items-start">
        <div className="space-y-10 min-w-0">
          <section id="tldr">
            <TldrBlock
              items={[
                'Use pipx for a clean install.',
                'Run nihil doctor before first use.',
                'Pull image with nihil install (full/ad/web/ctf).',
                'Start with nihil start <name> --workspace <path>.',
              ]}
            />
          </section>

          <section id="prereqs" className="space-y-3">
            <h2 className="text-xl font-semibold text-white">Prerequisites</h2>
            <p className="text-slate-400 text-sm">Required baseline on Linux host:</p>
            <ul className="list-disc list-inside text-slate-300 text-sm space-y-1">
              <li>Docker installed and running</li>
              <li>Python 3.12 or newer</li>
              <li><code>pipx</code> available (recommended)</li>
            </ul>
            <Callout variant="note" title="Quick check">
              Run <code>docker --version</code> and <code>docker ps</code>. If Docker is not accessible, fix that first.
            </Callout>
          </section>

          <section id="install-pipx" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Install with pipx (recommended)</h2>
            <StepList
              steps={[
                { title: 'Clone the repository', detail: 'Use the official nihil repository as installation source.' },
                { title: 'Install with pipx editable mode', detail: 'Keeps your Python environment clean and easy to update.' },
                { title: 'Validate command availability', detail: 'Run nihil --version to confirm the wrapper is ready.' },
              ]}
            />
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`python3 -m pip install --user pipx
python3 -m pipx ensurepath
pipx install "git+https://github.com/TheNullPigeons/nihil.git"`}
            </pre>
          </section>

          <section id="install-pip" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Install with pip (alternative)</h2>
            <Callout variant="warning" title="When to use">
              Use this only if pipx is unavailable. pipx is safer for long-term maintenance.
            </Callout>
            <p className="text-slate-400 text-sm">
              Alternative command: <code>pip install -e .</code> after cloning the repository.
            </p>
          </section>

          <section id="pull-image" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Pull a Nihil image</h2>
            <p className="text-slate-400 text-sm">Pull interactively first, then pin a specific image when needed.</p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`nihil install
nihil install full
nihil install ad
nihil install web
nihil install ctf`}
            </pre>
          </section>

          <section id="verify" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Verify the installation</h2>
            <StepList
              steps={[
                { title: 'Check version', detail: 'Confirm wrapper command is available.' },
                { title: 'Run diagnostics', detail: 'Validate Docker, Python, and image state with nihil doctor.' },
                { title: 'Inspect local status', detail: 'Use nihil info to list containers and images.' },
              ]}
            />
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">{`nihil --version
nihil doctor
nihil info`}</pre>
          </section>

          <section id="first-container" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">First container</h2>
            <p className="text-slate-400 text-sm">Start simple, then add network/capability options only if needed.</p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`nihil start my-pentest --workspace ~/projects/pentest
nihil start network-pentest --privileged --network host
nihil start web-pentest --image web --workspace ~/projects/pentest-web`}
            </pre>
            <Callout variant="tip" title="Good default">
              Always set <code>--workspace</code> so your findings persist outside the container lifecycle.
            </Callout>
          </section>

          <section id="update-uninstall" className="space-y-3">
            <h2 className="text-xl font-semibold text-white">Update / Uninstall</h2>
            <Callout variant="note" title="Update vs upgrade">
              <code>nihil update</code> refreshes local images. <code>nihil upgrade</code> recreates existing containers so they use updated images.
            </Callout>
            <div className="space-y-2">
              <p className="text-slate-300 text-sm font-medium">Update images:</p>
              <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`# Update all installed images
nihil update

# Update a specific variant
nihil update ad

# Recreate running environment with latest image
nihil upgrade`}
              </pre>
            </div>
            <div className="space-y-2">
              <p className="text-slate-300 text-sm font-medium">Update the wrapper:</p>
              <p className="text-slate-400 text-sm">
                Pull latest code then reinstall editable with <code>pipx install -e . --force</code>.
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-slate-300 text-sm font-medium">Uninstall:</p>
              <p className="text-slate-400 text-sm">
                Remove wrapper with <code>pipx uninstall nihil</code>, then images with <code>nihil uninstall</code>.
              </p>
            </div>
            <section id="troubleshooting" className="space-y-3">
              <h3 className="text-base font-semibold text-white">Troubleshooting quick wins</h3>
              <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
                <li>Run <code>nihil doctor</code> first for most setup issues.</li>
                <li>If Docker access fails, add your user to docker group and relog.</li>
                <li>If command is missing after install, open a new shell session.</li>
              </ul>
            </section>
          </section>
        </div>

        <SectionToc
          items={[
            { id: 'tldr', label: 'TL;DR' },
            { id: 'prereqs', label: 'Prerequisites' },
            { id: 'install-pipx', label: 'Install with pipx' },
            { id: 'install-pip', label: 'Install with pip' },
            { id: 'pull-image', label: 'Pull a Nihil image' },
            { id: 'verify', label: 'Verify installation' },
            { id: 'first-container', label: 'First container' },
            { id: 'update-uninstall', label: 'Update / Uninstall' },
            { id: 'troubleshooting', label: 'Troubleshooting' },
          ]}
        />
      </div>
    </div>
  );
};
