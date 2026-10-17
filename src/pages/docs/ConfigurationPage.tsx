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
{`# Print the current configuration
nihil config

# Open the file in $EDITOR
nihil config --edit`}
            </pre>
            <p className="text-slate-400 text-sm">
              The file is created on first run with inline comments. Every key below shows its default:
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`network:
  default_network: host        # host | docker | nat | disabled

workspace:
  default_path: null           # absolute path used as default workspace (null = none)

shell:
  default_shell: zsh           # zsh | bash | tmux
  logging:
    always_enable: false       # always record shell sessions with asciinema
    method: asciinema          # asciinema | script

my_resources:
  enabled: true                # mount ~/.nihil/my-resources in every container
  path: ~/.nihil/my-resources

nihil_resources:
  enabled: true                # mount the shared nihil-resources catalog (read-only)
  path: ~/.nihil/nihil-resources
  auto_update: false           # git pull nihil-resources on every container start

display:
  x11_by_default: true         # X11 / XWayland forwarding
  wayland_by_default: true     # Wayland socket forwarding

updates:
  auto_check: true             # check for image updates on start

build:
  images_path: null            # path to a nihil-images source dir (for nihil build)

image_sources:
  active: upstream             # upstream | personal
  channel: main                # main | dev (upstream images)
  upstream_repo: TheNullPigeons/nihil-images
  personal_repo: null          # GitHub fork used for customized images
  personal_branch: null        # branch used for customized images`}
            </pre>
          </section>

          <section id="image-sources" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Image sources</h2>
            <p className="text-slate-400 text-sm">
              Nihil keeps an upstream clone of <code>nihil-images</code> and can also track a personal fork for custom images.
              Switching sources changes which image tags and build source are considered active.
              The upstream channel defaults to <code>main</code> (the <code>:latest</code> tag).
              Select <code>dev</code> to pull <code>:dev</code> images; personal forks keep their own branch tags.
              Choosing <code>never</code> during installation saves <code>image_sources.prompt_for_dev: false</code>.
              Set it back to <code>true</code> to offer the development channel again.
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
  prompt_for_dev: true
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

          <section id="firefox" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Firefox extensions</h2>
            <p className="text-slate-400 text-sm">
              The full, AD, and web images include FoxyProxy, Cookie-Editor, Wappalyzer,
              Multi-Account Containers, and User-Agent Switcher. FoxyProxy has a Burp Suite
              proxy preset for <code>127.0.0.1:8080</code>, with proxying disabled by default.
              Select that preset in FoxyProxy when you want to send traffic through Burp.
              Disabling proxying keeps all extensions installed.
            </p>
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
    │   ├── zshrc               # Custom zsh config (sourced automatically)
    │   ├── aliases             # Custom aliases
    │   └── history             # Extra history commands
    ├── nvim/
    │   └── init.vim            # Neovim config (copied to ~/.config/nvim/)
    ├── tmux/
    │   └── tmux.conf           # Merged into ~/.tmux.conf
    └── load_user_setup.sh      # Runs once on first container start`}
            </pre>
            <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
              <p className="text-xs text-emerald-300">
                These files are created automatically on first run with helpful comments. Edit them to customize your
                environment. Put one-off installs or setup commands in <code className="font-mono">load_user_setup.sh</code>:
                it runs once, the first time a container starts.
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
            { id: 'firefox', label: 'Firefox' },
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
