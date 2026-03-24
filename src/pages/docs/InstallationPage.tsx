import React from 'react';
import { SectionToc } from '../../components/SectionToc';

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
          Everything you need to install Nihil, pull the Docker image, verify the setup and start your
          first containers on a Linux host.
        </p>
      </header>

      <div className="grid sm:grid-cols-[minmax(0,_1fr)_180px] gap-8 items-start">
        <div className="space-y-10 min-w-0">
          <section id="prereqs" className="space-y-3">
            <h2 className="text-xl font-semibold text-white">Prerequisites</h2>
            <p className="text-slate-400 text-sm">Before installing Nihil, make sure you have:</p>
            <ul className="list-disc list-inside text-slate-300 text-sm space-y-1">
              <li>Docker installed and running</li>
              <li>Python 3.12 or newer</li>
              <li>
                <code className="text-xs bg-slate-900 px-1 py-0.5 rounded border border-slate-700">pipx</code>
                {' '}(recommended) or{' '}
                <code className="text-xs bg-slate-900 px-1 py-0.5 rounded border border-slate-700">pip</code>
              </li>
            </ul>
            <div className="space-y-2 text-sm">
              <p className="text-slate-300 font-medium">Verify Docker:</p>
              <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`docker --version
docker ps`}
              </pre>
            </div>
          </section>

          <section id="install-pipx" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">
              Install with <code className="text-sm">pipx</code> (recommended)
            </h2>
            <p className="text-slate-400 text-sm">
              Installs Nihil in an isolated environment without polluting your global Python install.
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`# Install pipx if needed
python3 -m pip install --user pipx
python3 -m pipx ensurepath

# Clone the Nihil repository
git clone https://github.com/TheNullPigeons/nihil.git
cd nihil

# Install Nihil in dev mode
pipx install -e .`}
            </pre>
          </section>

          <section id="install-pip" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">
              Install with <code className="text-sm">pip</code> (alternative)
            </h2>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`git clone https://github.com/TheNullPigeons/nihil.git
cd nihil
pip install -e .`}
            </pre>
          </section>

          <section id="pull-image" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Pull a Nihil image</h2>
            <p className="text-slate-400 text-sm">
              Nihil images are hosted on the GitHub Container Registry. Pull the one you need:
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`# Pull interactively (prompts for variant selection)
nihil install

# Or pull a specific variant directly
nihil install base
nihil install ad
nihil install web`}
            </pre>
          </section>

          <section id="verify" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Verify the installation</h2>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`# Check nihil is installed
nihil --version

# Run environment checks
nihil doctor

# List images and containers
nihil info`}
            </pre>
          </section>

          <section id="first-container" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">First container</h2>
            <p className="text-slate-400 text-sm">
              Minimal examples to get a container up and running:
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`# Simple container (pulls image if not present)
nihil start my-pentest

# Privileged + host network for network recon
nihil start network-pentest --privileged --network host

# Mount a local workspace
nihil start web-pentest --workspace ~/projects/pentest-web`}
            </pre>
          </section>

          <section id="update-uninstall" className="space-y-3">
            <h2 className="text-xl font-semibold text-white">Update / Uninstall</h2>
            <div className="space-y-2">
              <p className="text-slate-300 text-sm font-medium">Update images:</p>
              <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`# Update all installed images
nihil update

# Update a specific variant
nihil update ad`}
              </pre>
            </div>
            <div className="space-y-2">
              <p className="text-slate-300 text-sm font-medium">Update the wrapper:</p>
              <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`cd nihil
git pull
pipx install -e . --force`}
              </pre>
            </div>
            <div className="space-y-2">
              <p className="text-slate-300 text-sm font-medium">Uninstall:</p>
              <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`# Remove nihil wrapper
pipx uninstall nihil

# Remove Docker images
nihil uninstall`}
              </pre>
            </div>
          </section>
        </div>

        <SectionToc
          items={[
            { id: 'prereqs', label: 'Prerequisites' },
            { id: 'install-pipx', label: 'Install with pipx' },
            { id: 'install-pip', label: 'Install with pip' },
            { id: 'pull-image', label: 'Pull a Nihil image' },
            { id: 'verify', label: 'Verify installation' },
            { id: 'first-container', label: 'First container' },
            { id: 'update-uninstall', label: 'Update / Uninstall' },
          ]}
        />
      </div>
    </div>
  );
};
