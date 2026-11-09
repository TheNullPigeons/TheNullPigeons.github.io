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
          {['~/.nihil', 'config.yml', 'image sources', 'display', 'resources'].map((badge) => (
            <span key={badge} className="text-[0.625rem] px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300/90 font-semibold tracking-wide">
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
                'Everything nihil keeps on your host lives in ~/.nihil.',
                'config.yml controls wrapper behavior.',
                'my-resources is mounted in every container.',
                'X11 and Wayland forwarding are enabled by default for new containers.',
                'image_sources tracks upstream and personal nihil-images clones.',
                'EDITOR and DOCKER_HOST are useful runtime env vars.',
              ]}
            />
          </section>

          {/* ~/.nihil */}
          <section id="nihil-home" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">The ~/.nihil directory</h2>
            <p className="text-slate-400 text-sm">
              Everything nihil keeps on your host lives in <code>~/.nihil</code>. It is created the first time you run
              a command, and other folders appear as you use the related features.
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`~/.nihil/
├── config.yml                  # wrapper settings
├── my-resources/               # your dotfiles and setup, mounted in every container
├── nihil-resources/            # shared catalog (nihil resources install)
├── vpn/                        # .ovpn files used by --vpn
├── workspaces/<name>/          # default /workspace of each container
├── image-sources/              # nihil-images clones (upstream and personal fork)
├── state/<name>/hosts.tar      # /etc/hosts kept across stop / start
├── browser_ui_passwords.json   # Browser UI passwords
└── .xauth                      # X11 cookie when xhost is missing`}
            </pre>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-700/80">
                    <th className="text-left py-1.5 pr-3 text-slate-500 font-medium">Path</th>
                    <th className="text-left py-1.5 pr-3 text-slate-500 font-medium">What it holds</th>
                    <th className="text-left py-1.5 text-slate-500 font-medium">If you delete it</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr className="border-b border-slate-800/40 align-top">
                    <td className="py-1.5 pr-3 text-amber-300 font-mono whitespace-nowrap">{'config.yml'}</td>
                    <td className="py-1.5 pr-3 text-slate-400">Wrapper settings. Created on first run with inline comments.</td>
                    <td className="py-1.5 text-slate-500">Reset to defaults</td>
                  </tr>
                  <tr className="border-b border-slate-800/40 align-top">
                    <td className="py-1.5 pr-3 text-amber-300 font-mono whitespace-nowrap">{'my-resources/'}</td>
                    <td className="py-1.5 pr-3 text-slate-400">Your personal config, mounted read-write at /opt/my-resources in every container. Its setup/ files are applied on the first start of each container.</td>
                    <td className="py-1.5 text-slate-500">Your dotfiles are lost</td>
                  </tr>
                  <tr className="border-b border-slate-800/40 align-top">
                    <td className="py-1.5 pr-3 text-amber-300 font-mono whitespace-nowrap">{'nihil-resources/'}</td>
                    <td className="py-1.5 pr-3 text-slate-400">Clone of the shared resources catalog, created by nihil resources install and mounted read-only at /opt/resources.</td>
                    <td className="py-1.5 text-slate-500">Reinstall with nihil resources install</td>
                  </tr>
                  <tr className="border-b border-slate-800/40 align-top">
                    <td className="py-1.5 pr-3 text-amber-300 font-mono whitespace-nowrap">{'vpn/'}</td>
                    <td className="py-1.5 pr-3 text-slate-400">Your .ovpn files. --vpn with no path uses client.ovpn, or the only .ovpn in this folder.</td>
                    <td className="py-1.5 text-slate-500">Your VPN configs are lost</td>
                  </tr>
                  <tr className="border-b border-slate-800/40 align-top">
                    <td className="py-1.5 pr-3 text-amber-300 font-mono whitespace-nowrap">{'workspaces/<name>/'}</td>
                    <td className="py-1.5 pr-3 text-slate-400">Default /workspace of a container when you pass no --workspace and set no workspace.default_path. Shell recordings go to logs/ inside it.</td>
                    <td className="py-1.5 text-slate-500">Your engagement files are lost</td>
                  </tr>
                  <tr className="border-b border-slate-800/40 align-top">
                    <td className="py-1.5 pr-3 text-amber-300 font-mono whitespace-nowrap">{'image-sources/'}</td>
                    <td className="py-1.5 pr-3 text-slate-400">Git clones of nihil-images: upstream/nihil-images, plus {"<login>/<repo>"} for a personal fork made by nihil image customize.</td>
                    <td className="py-1.5 text-slate-500">Re-cloned when needed</td>
                  </tr>
                  <tr className="border-b border-slate-800/40 align-top">
                    <td className="py-1.5 pr-3 text-amber-300 font-mono whitespace-nowrap">{'state/<name>/hosts.tar'}</td>
                    <td className="py-1.5 pr-3 text-slate-400">Backup of the container's /etc/hosts, saved on stop and restored on start, because Docker rewrites the file. Deleted with the container.</td>
                    <td className="py-1.5 text-slate-500">Manual hosts entries are lost</td>
                  </tr>
                  <tr className="border-b border-slate-800/40 align-top">
                    <td className="py-1.5 pr-3 text-amber-300 font-mono whitespace-nowrap">{'browser_ui_passwords.json'}</td>
                    <td className="py-1.5 pr-3 text-slate-400">Browser UI password of each container (permissions 600), so a session keeps the same password across restarts.</td>
                    <td className="py-1.5 text-slate-500">New password on next start</td>
                  </tr>
                  <tr className="border-b border-slate-800/40 align-top">
                    <td className="py-1.5 pr-3 text-amber-300 font-mono whitespace-nowrap">{'.xauth'}</td>
                    <td className="py-1.5 pr-3 text-slate-400">Copy of your Xauthority, mounted read-only for X11 forwarding when xhost is not installed. Refreshed on every start.</td>
                    <td className="py-1.5 text-slate-500">Recreated on next start</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Callout variant="warning" title="Removing a container keeps its workspace">
              <code>nihil remove</code> deletes <code>state/&lt;name&gt;</code> but never <code>workspaces/&lt;name&gt;</code>.
              Your loot stays on disk until you delete the folder yourself.
            </Callout>
            <p className="text-slate-400 text-sm">
              If a command fails with a permission error, <code>~/.nihil</code> was probably created by root
              (for example by running nihil with sudo). <code>nihil doctor</code> detects it, and this fixes it:
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`sudo chown -R $USER ~/.nihil`}
            </pre>
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
nihil config --edit

# Create a preset and choose which config sections it uses
nihil config preset create vpn-lab

# Create one without prompts, keeping the current config and setting container options
nihil config preset create ad-lab --privileged --host
nihil config preset create corp-lab --image web --network corp-net \\
  --workspace ~/work/corp --disable-x11 --no-nihil-resources -e DOMAIN=corp.local
nihil config preset create codex --startup-script install-codex.sh

# Save and list the current config
nihil config preset save current-config
nihil config preset list

# Use one while creating a container (omit the name to choose interactively)
nihil start vpn-lab --preset vpn-lab
nihil start web-lab --preset`}
            </pre>
            <p className="text-slate-400 text-sm">
              With no start options, <code>nihil config preset create NAME</code> opens an editor whose section names
              match the top-level keys in <code>config.yml</code>; start-only options use the preset's <code>container</code> section.
              Select a row to see its current value, description,
              and accepted values; those values are also shown while editing. Press <code>/</code> to filter settings by
              section, name, CLI option, value, or description; press Escape to clear the filter. It does not change
              <code>~/.nihil/config.yml</code>. Use arrows or <code>j</code>/<code>k</code> to move, <code>gg</code>/<code>G</code> for first/last,
              <code>e</code> to edit a
              value, Enter to apply it, Space to cycle built-in values, <code>e</code> to enter custom values, and Ctrl+S to save. The command accepts the
              same container and session options as <code>nihil start</code>. Passing options uses the current config plus
              those overrides without opening the config editor. Command-line options to <code>nihil start</code> override
              saved values. Use repeatable <code>--startup-script NAME</code> to save scripts without prompts, or
              <code>--script</code> to choose them interactively.
              Presets live in <code>~/.nihil/config-presets/</code> and apply container startup defaults only
              when creating a new container. Existing files in <code>~/.nihil/config-templates/</code> and
              <code>~/.nihil/config-profiles/</code> remain available. Use <code>nihil config preset edit NAME</code> to edit one later,
              <code>nihil config preset save NAME --force</code> to replace it with the current config, or
              <code>nihil config preset delete NAME</code> to remove it.
            </p>
            <p className="text-slate-400 text-sm">
              The file is created on first run with inline comments. New settings are added to existing config files
              without replacing their current values. Every key below shows its default:
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`network:
  default_network: host        # host | docker | nat | disabled

container_defaults:
  privileged: false            # use Docker privileged mode for new containers

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
            <Callout variant="note" title="Expand variables in the current command">
              In Nihil's Zsh shell, press <code>ctrl-x</code> then <code>ctrl-e</code> (or <code>ctrl-x-e</code>) to expand variables and shell
              substitutions in the command line without executing it. Press <code>Ctrl-C</code> to discard the result.
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
            { id: 'nihil-home', label: '~/.nihil' },
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
