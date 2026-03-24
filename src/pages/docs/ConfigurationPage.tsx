import React from 'react';
import { SectionToc } from '../../components/SectionToc';

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
          {['config.toml', 'my-resources', 'env vars', 'history.log'].map((badge) => (
            <span key={badge} className="text-[10px] px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300/90 font-semibold tracking-wide">
              {badge}
            </span>
          ))}
        </div>
      </header>

      <div className="grid sm:grid-cols-[minmax(0,_1fr)_180px] gap-8 items-start">
        <div className="space-y-10 min-w-0">

          {/* Config file */}
          <section id="config-file" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Config file</h2>
            <p className="text-slate-400 text-sm">
              Nihil stores its configuration at <code className="text-xs bg-slate-900 px-1 py-0.5 rounded border border-slate-700 font-mono">~/.nihil/config.toml</code>.
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`# View current config
nihil config

# Open in editor
nihil config --edit`}
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

              <div className="space-y-2">
                <p className="text-sm text-slate-300 font-medium">Tmux config</p>
                <p className="text-xs text-slate-500 font-mono">~/.nihil/my-resources/setup/tmux/tmux.conf</p>
                <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`set -g mouse on
set -g history-limit 50000
bind r source-file ~/.tmux.conf`}
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
{`2026-03-24T14:30:00 nihil start pentest --image ad --privileged
2026-03-24T14:35:12 nihil exec pentest`}
            </pre>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`# Search your history
grep "start" ~/.config/nihil/history.log`}
            </pre>
          </section>

        </div>

        <SectionToc
          items={[
            { id: 'config-file', label: 'Config file' },
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
