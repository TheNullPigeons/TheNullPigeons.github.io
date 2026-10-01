import React from 'react';
import { SectionToc } from '../../components/SectionToc';
import { Callout, TldrBlock } from '../../components/DocsBlocks';

export const ConfigurationPage: React.FC = () => {
  return (
    <div className="space-y-8 w-full">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          Docs / <span className="text-amber-400">Configuration</span>
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          Configuration
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl">
          Customize nihil: config file, my-resources, environment variables, and command history.
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {['config.yml', 'image sources', 'display', 'resources'].map((badge) => (
            <span key={badge} className="text-[10px] px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300/90 font-semibold tracking-wide">
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
                'config.yml controls wrapper behavior.',
                'my-resources is mounted in every container.',
                'X11 and Wayland forwarding are enabled by default for new containers.',
                'image_sources tracks upstream and personal nihil-images clones.',
                'EDITOR and DOCKER_HOST are useful runtime env vars.',
              ]}
            />
          </section>

          {/* Config file */}
          <section id="config-file" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Config file</h2>
            <p className="text-slate-400 text-sm">
              Nihil stores its configuration at <code className="text-xs bg-slate-900 px-1 py-0.5 rounded border border-slate-700 font-mono">~/.nihil/config.yml</code>.
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`# View current config
nihil config

# Open in editor
nihil config --edit

# Common keys
display.x11_by_default: true
display.wayland_by_default: true
network.default_network: host
image_sources.active: upstream
image_sources.channel: main`}
            </pre>
          </section>

          <section id="image-sources" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Image sources</h2>
            <p className="text-slate-400 text-sm">
              Nihil keeps an upstream clone of <code>nihil-images</code> and can also track a personal fork for custom images.
              Switching sources changes which image tags and build source are considered active.
              The upstream channel defaults to <code>main</code> (the <code>:latest</code> tag).
              Select <code>dev</code> to pull <code>:dev</code> images; personal forks keep their own branch tags.
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`nihil image status
nihil image switch upstream
nihil image switch personal
nihil image channel dev
nihil image channel main

image_sources:
  active: upstream
  channel: main
  upstream_repo: TheNullPigeons/nihil-images
  personal_repo: <owner>/nihil-images
  personal_branch: nihil/full-custom`}
            </pre>
          </section>

          <section id="display" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Display forwarding</h2>
            <p className="text-slate-400 text-sm">
              New containers receive both X11/XWayland and Wayland socket mounts by default. An upgrade refreshes these mounts from the current configuration, so older containers receive newly enabled display forwarding too. Use start flags when a specific new container should not receive one of them.
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`nihil start gui
nihil start no-x11 --disable-x11
nihil start no-wayland --disable-wayland`}
            </pre>
          </section>

          {/* My Resources */}
          <section id="my-resources" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">My Resources</h2>
            <p className="text-slate-400 text-sm">
              The <code className="text-xs bg-slate-900 px-1 py-0.5 rounded border border-slate-700 font-mono">~/.nihil/my-resources/</code> directory
              is automatically mounted into every container at <code className="text-xs bg-slate-900 px-1 py-0.5 rounded border border-slate-700 font-mono">/opt/my-resources/</code>.
              Use it to persist your custom configuration across containers.
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`~/.nihil/my-resources/
└── setup/
    ├── zsh/
    │   ├── zshrc      # Custom zsh config (sourced automatically)
    │   ├── aliases     # Custom aliases
    │   └── history     # Extra history commands
    ├── nvim/
    │   └── init.vim    # Neovim config
    └── tmux/
        └── tmux.conf   # Tmux config`}
            </pre>
            <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
              <p className="text-xs text-emerald-300">
                These files are created automatically on first run with helpful comments. Edit them to customize your environment.
              </p>
            </div>
            <Callout variant="tip" title="Team productivity">
              Share a baseline <code>my-resources</code> profile across team members to standardize aliases and tooling behavior.
            </Callout>
          </section>

          {/* Examples */}
          <section id="examples" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Examples</h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-slate-300 font-medium">Custom aliases</p>
                <p className="text-xs text-slate-500 font-mono">~/.nihil/my-resources/setup/zsh/aliases</p>
                <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`alias ll='ls -lah'
alias serve='python3 -m http.server 8080'
alias clip='xclip -selection clipboard'`}
                </pre>
              </div>
            </div>
          </section>

          {/* Environment variables */}
          <section id="env-vars" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Environment variables</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-700/80">
                    <th className="text-left py-1.5 pr-3 text-slate-500 font-medium">Variable</th>
                    <th className="text-left py-1.5 text-slate-500 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr className="border-b border-slate-800/40">
                    <td className="py-1.5 pr-3 text-amber-300 font-mono">DOCKER_HOST</td>
                    <td className="py-1.5 text-slate-400">Override Docker socket path</td>
                  </tr>
                  <tr className="border-b border-slate-800/40">
                    <td className="py-1.5 pr-3 text-amber-300 font-mono">EDITOR</td>
                    <td className="py-1.5 text-slate-400">Editor used by nihil config --edit</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Command history */}
          <section id="cmd-history" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Command history</h2>
            <p className="text-slate-400 text-sm">
              Nihil logs every command you run to <code className="text-xs bg-slate-900 px-1 py-0.5 rounded border border-slate-700 font-mono">~/.config/nihil/history.log</code>.
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-400 font-mono">
{`nihil start pentest --image ad --privileged
nihil exec pentest`}
            </pre>
            <p className="text-slate-500 text-xs">
              Quick lookup: <code>grep "start" ~/.config/nihil/history.log</code>
            </p>
          </section>

        </div>

        <SectionToc
          items={[
            { id: 'tldr', label: 'TL;DR' },
            { id: 'config-file', label: 'Config file' },
            { id: 'image-sources', label: 'Image sources' },
            { id: 'display', label: 'Display' },
            { id: 'my-resources', label: 'My Resources' },
            { id: 'examples', label: 'Examples' },
            { id: 'env-vars', label: 'Environment variables' },
            { id: 'cmd-history', label: 'Command history' },
          ]}
        />
      </div>
    </div>
  );
};
