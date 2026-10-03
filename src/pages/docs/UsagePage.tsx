import React from 'react';
import { SectionToc } from '../../components/SectionToc';
import { Callout, StepList, TldrBlock } from '../../components/DocsBlocks';

export const UsagePage: React.FC = () => {
  return (
    <div className="space-y-8 w-full">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          Docs / <span className="text-amber-400">CLI Commands</span>
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          CLI Commands
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl">
          Core workflows and practical command patterns for daily nihil usage.
        </p>
      </header>

      <div className="grid sm:grid-cols-[minmax(0,_1fr)_180px] gap-8 items-start">
        <div className="space-y-10 min-w-0">
          <section id="tldr">
            <TldrBlock
              items={[
                'Use nihil start with --workspace for persistent work.',
                'X11 and Wayland forwarding are enabled by default; disable either one per container if needed.',
                'Use nihil exec for one-off commands in running containers.',
                'Use nihil upgrade to recreate containers while keeping saved tool state.',
                'Use nihil info, nihil image list and nihil doctor when debugging state issues.',
              ]}
            />
          </section>

          <section id="workflow" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Daily workflow</h2>
            <StepList
              steps={[
                { title: 'Start a container', detail: 'Use nihil start with explicit image/workspace options.' },
                { title: 'Run commands', detail: 'Use nihil exec for one-shot actions or shell access.' },
                { title: 'Inspect state', detail: 'Use nihil info to list container/image status.' },
                { title: 'Stop or remove', detail: 'Stop with nihil stop, cleanup with nihil remove.' },
              ]}
            />
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`# Start
nihil start my-pentest
nihil start web-pentest --workspace ~/projects/web
nihil start vpn-lab --vpn ~/vpn/client.ovpn --network docker
nihil start re --image full --tmux
# Exec / inspect
nihil exec my-pentest
nihil info --container my-pentest
# Stop
nihil stop my-pentest`}
            </pre>
            <Callout variant="tip" title="Most useful flags">
              <code>--image</code>, <code>--workspace</code>, <code>-W</code>, <code>--network</code>, <code>--privileged</code>, <code>--vpn</code>, <code>--tmux</code>.
            </Callout>
          </section>

          <section id="images" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Image lifecycle</h2>
            <p className="text-slate-400 text-sm">Pull, update, and remove images with explicit commands.</p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`nihil install
nihil install ad
nihil install blueteam
nihil image list
nihil update
nihil update web
nihil upgrade --all --pull
nihil upgrade serval --privileged --network host -W --start
nihil uninstall --unused`}
            </pre>
            <Callout variant="note" title="Image status">
              <code>nihil image list</code> shows registry availability before an image is installed. <code>Update available</code> means a newer remote image can be pulled; <code>Updated</code> means your local image matches the registry.
            </Callout>
          </section>

          <section id="custom-images" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Custom image sources</h2>
            <p className="text-slate-400 text-sm">
              Use <code>nihil image</code> to select tools for a personal <code>nihil-images</code> branch,
              trigger a variant build, and monitor the resulting GitHub Actions run.
            </p>
            <Callout variant="note" title="GitHub CLI required">
              This workflow uses the GitHub CLI (<code>gh</code>) to authenticate, manage the fork, push the personal
              branch, and dispatch GitHub Actions builds. Install <code>gh</code> and authenticate before starting:
              <pre className="mt-2 text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">{`gh auth login
gh auth status`}</pre>
            </Callout>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`# Inspect and select a personal image source
nihil image status
nihil image customize full

# Delete local clone, remote branch/packages, or both before setup
nihil image customize full --git-del local
nihil image customize full --git-del distant
nihil image customize full --git-del all

# Build one variant, or all variants when no variant is provided
nihil image build full --wait
nihil image build --wait

# Switch between upstream and personal sources
nihil image switch upstream
nihil image switch personal

# Use development images from the upstream repository
nihil image channel dev
nihil update
nihil image channel main`}
            </pre>
            <Callout variant="note" title="Build scope">
              <code>nihil image build full</code> builds only the Full image. Running <code>nihil image build</code> without
              a variant requests all image variants.
            </Callout>
          </section>

          <section id="profiles" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Container profiles</h2>
            <p className="text-slate-400 text-sm">
              Profiles keep reusable container creation settings in <code>~/.nihil/profiles/&lt;name&gt;.yml</code>.
              Run the creator without options for a guided setup, or provide known values and answer only the remaining questions.
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`# Fully interactive
nihil profile create

# Hybrid: pre-fill a few answers
nihil profile create redteam --image ad --network docker --privileged

# Scriptable: omitted settings use Nihil defaults
nihil profile create web --image web --network docker --non-interactive

nihil profile list
nihil profile show redteam
nihil start acme --profile redteam

# Command-line options override the profile
nihil start acme --profile redteam --standard --no-log`}
            </pre>
            <Callout variant="note" title="Creation-time settings">
              A profile applies only when Nihil creates the container. If the named container already exists, the profile is ignored. Profiles are plain YAML files, so do not store passwords or tokens in them.
            </Callout>
          </section>

          <section id="commands" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Command reference (short)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-700/80 text-slate-400">
                    <th className="text-left py-2 pr-3">Command</th>
                    <th className="text-left py-2">Use case</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300 text-sm">
                  {[
                    ['nihil start', 'Create/start a container'],
                    ['nihil exec', 'Open shell or run one command'],
                    ['nihil stop', 'Stop running container'],
                    ['nihil remove', 'Delete container(s)'],
                    ['nihil install', 'Pull image variant'],
                    ['nihil image list', 'List remote/local image variants'],
                    ['nihil image status', 'Show configured image sources'],
                    ['nihil image channel main|dev', 'Select stable or development upstream images'],
                    ['nihil image customize', 'Select tools for a personal image branch'],
                    ['nihil image build', 'Trigger a Docker build for a selected variant'],
                    ['nihil update', 'Pull newer images'],
                    ['nihil upgrade', 'Recreate containers from the selected image/config'],
                    ['nihil profile create|list|show', 'Manage reusable container creation profiles'],
                    ['nihil info', 'Show images/containers status'],
                    ['nihil doctor', 'Run environment diagnostics'],
                    ['nihil tools', 'List tools by image/category'],
                    ['nihil resources install', 'Clone the nihil-resources catalog'],
                    ['nihil resources update', 'Pull latest nihil-resources catalog'],
                    ['nihil resources sync', 'Fetch tools listed in the catalog'],
                    ['nihil resources status', 'Show local nihil-resources status'],
                    ['nihil config --edit', 'Open wrapper config in $EDITOR'],
                    ['nihil completion', 'Generate shell completion script'],
                    ['nihil version', 'Show wrapper version'],
                    ['nihil uninstall --unused', 'Remove local images unused by any container'],
                  ].map(([cmd, desc]) => (
                    <tr key={cmd} className="border-b border-slate-800/50">
                      <td className="py-2 pr-3 font-mono text-amber-300 text-xs">{cmd}</td>
                      <td className="py-2 text-slate-400">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="recipes" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Common recipes</h2>
            <p className="text-slate-400 text-sm">
              AD: <code>nihil start ad-lab --image ad --privileged --network host --workspace ~/ad-lab</code><br />
              Web: <code>nihil start web-lab --image web --workspace ~/projects/web</code><br />
              Recon: <code>nihil start net-lab --privileged --network host</code><br />
              Current directory: <code>nihil start quick -W --tmux</code>
            </p>
          </section>

          <section id="display" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">X11 / Wayland GUI support</h2>
            <p className="text-slate-400 text-sm">
              X11 and Wayland socket forwarding are <strong>enabled by default</strong>. GUI applications such as Burp Suite, Wireshark, Ghidra, IDA, browser tooling, and clipboard helpers can use the host display when the container is created with those mounts.
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`# Just start -- X11 and Wayland are on by default
nihil start gui-pentest

# Disable one display bridge for this container
nihil start gui-pentest --disable-x11
nihil start gui-pentest --disable-wayland

# Upgrade applies the current display defaults to existing containers
nihil upgrade gui-pentest --force`}
            </pre>
            <Callout variant="note" title="macOS">
              On macOS, XQuartz is still required for X11 GUI forwarding.
            </Callout>
          </section>

          <section id="troubleshooting" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Troubleshooting</h2>
            <Callout variant="note" title="If commands fail">
              Start with <code>nihil doctor</code>, then verify Docker daemon and your user permissions.
            </Callout>
            <p className="text-slate-400 text-sm">Quick triage: <code>nihil doctor</code>, then <code>docker ps</code>, then <code>nihil info</code>.</p>
          </section>
        </div>

        <SectionToc
          items={[
            { id: 'tldr', label: 'TL;DR' },
            { id: 'workflow', label: 'Daily workflow' },
            { id: 'images', label: 'Image lifecycle' },
            { id: 'custom-images', label: 'Custom image sources' },
            { id: 'profiles', label: 'Container profiles' },
            { id: 'commands', label: 'Command reference' },
            { id: 'recipes', label: 'Common recipes' },
            { id: 'display', label: 'GUI support' },
            { id: 'troubleshooting', label: 'Troubleshooting' },
          ]}
        />
      </div>
    </div>
  );
};
