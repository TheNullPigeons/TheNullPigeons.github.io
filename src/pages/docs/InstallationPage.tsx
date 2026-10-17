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
                'Pull image with nihil install (full/ad/web/blueteam).',
                'Use nh as the short alias installed with nihil.',
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
                { title: 'Install pipx', detail: 'pipx keeps nihil isolated in its own virtual environment.' },
                { title: 'Install nihil from GitHub', detail: 'pipx installs directly from the official repository, no manual clone needed.' },
                { title: 'Validate command availability', detail: 'Run nihil --version to confirm the wrapper is ready.' },
              ]}
            />
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`python3 -m pip install --user pipx
python3 -m pipx ensurepath
pipx install "git+https://github.com/TheNullPigeons/nihil.git"
nihil --version
nh --version`}
            </pre>
          </section>

          <section id="install-pip" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Install with pip (alternative)</h2>
            <Callout variant="warning" title="When to use">
              Use this only if pipx is unavailable. pipx is safer for long-term maintenance.
            </Callout>
            <p className="text-slate-400 text-sm">
              Install from the same source with pip:
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">{`pip install --user "git+https://github.com/TheNullPigeons/nihil.git"`}</pre>
            <p className="text-slate-400 text-sm">
              Contributors who want an editable checkout clone the repo first, then run <code>pip install -e .</code> from it.
            </p>
          </section>

          <section id="image-channel" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Choose an image channel (main / dev)</h2>
            <p className="text-slate-400 text-sm">
              Upstream images are published on two channels. <code>main</code> (the default) pulls the stable{' '}
              <code>:latest</code> tags; <code>dev</code> pulls the <code>:dev</code> tags built from the development
              branch, so you get new tools and fixes before they are merged. Pick a channel before pulling.
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`# Show the current channel
nihil image channel

# Switch to development images
nihil image channel dev

# Back to stable images
nihil image channel main`}
            </pre>
            <Callout variant="note" title="Saved in your config">
              The choice is stored in your nihil config and applies to every upstream variant (full, ad, web, blueteam).
              If you already have images installed, run <code>nihil update</code> after switching to pull them from the
              new channel. The channel is ignored while a personal image source is active.
            </Callout>
          </section>

          <section id="pull-image" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Pull a Nihil image</h2>
            <p className="text-slate-400 text-sm">Pull interactively first, then pin a specific image when needed.</p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`nihil image list
nihil install
nihil install full
nihil install ad
nihil install web
nihil install blueteam`}
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
nihil start web-pentest --image web --workspace ~/projects/pentest-web
nihil start vpn-lab --vpn ~/vpn/client.ovpn --network docker
nihil start quick -W --tmux`}
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
nihil upgrade --all --pull
nihil upgrade my-pentest --privileged --network host -W --start

# Remove images unused by any container
nihil uninstall --unused`}
              </pre>
            </div>
            <div className="space-y-2">
              <p className="text-slate-300 text-sm font-medium">Update the wrapper:</p>
              <p className="text-slate-400 text-sm">
                Re-pull the latest wrapper from GitHub with <code>pipx upgrade nihil</code>. If the install metadata is
                missing, reinstall with <code>pipx install &quot;git+https://github.com/TheNullPigeons/nihil.git&quot; --force</code>.
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
            { id: 'image-channel', label: 'Image channel' },
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
