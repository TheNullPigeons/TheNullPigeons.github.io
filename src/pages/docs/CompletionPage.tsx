import React from 'react';
import { SectionToc } from '../../components/SectionToc';
import { Callout, TldrBlock } from '../../components/DocsBlocks';

export const CompletionPage: React.FC = () => {
  return (
    <div className="space-y-8 w-full">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          Docs / <span className="text-amber-400">Shell Completion</span>
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          Shell Completion
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl">
          Enable tab completion for Nihil commands and options in bash or zsh.
        </p>
      </header>

      <div className="grid sm:grid-cols-[minmax(0,_1fr)_180px] gap-8 items-start">
        <div className="space-y-10 min-w-0">
          <section id="tldr">
            <TldrBlock
              items={[
                'Generate completion with nihil completion bash/zsh.',
                'Load completion in shell startup file.',
                'Reload shell and test with TAB TAB.',
                'Use troubleshooting steps if completion does not trigger.',
              ]}
            />
          </section>

          <section id="prereqs" className="space-y-3">
            <h2 className="text-xl font-semibold text-white">Prerequisites</h2>
            <p className="text-slate-400 text-sm">
              Shell completion relies on <code className="text-xs bg-slate-900 px-1 py-0.5 rounded border border-slate-700">argcomplete</code>, which is installed automatically with Nihil.
            </p>
            <p className="text-slate-500 text-xs">Quick check: <code>pip show argcomplete</code></p>
          </section>

          <section id="bash" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Bash</h2>
            <div className="space-y-3">
              <p className="text-slate-300 text-sm font-medium">Recommended (current user):</p>
              <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`mkdir -p ~/.config/bash_completion.d
nihil completion bash > ~/.config/bash_completion.d/nihil

# Add to ~/.bashrc
echo 'for f in ~/.config/bash_completion.d/*; do [ -r "$f" ] && . "$f"; done' >> ~/.bashrc
source ~/.bashrc`}
              </pre>
              <p className="text-slate-500 text-xs">
                For a system-wide install, write the generated file under <code>/etc/bash_completion.d/</code>.
              </p>
            </div>
          </section>

          <section id="zsh" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Zsh</h2>
            <div className="space-y-3">
              <p className="text-slate-300 text-sm font-medium">With oh-my-zsh:</p>
              <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`mkdir -p ~/.oh-my-zsh/completions
nihil completion zsh > ~/.oh-my-zsh/completions/_nihil

# Add to ~/.zshrc if not already there
echo 'fpath+=(~/.oh-my-zsh/completions)' >> ~/.zshrc
echo 'autoload -Uz compinit && compinit' >> ~/.zshrc

source ~/.zshrc`}
              </pre>
              <p className="text-slate-500 text-xs">
                Without oh-my-zsh, use the same flow with a custom completion directory like <code>~/.zfunc</code>.
              </p>
            </div>
          </section>

          <section id="test" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Test it</h2>
            <p className="text-slate-400 text-sm">
              Test quickly with <code>nihil &lt;TAB&gt;&lt;TAB&gt;</code> then <code>nihil start --&lt;TAB&gt;&lt;TAB&gt;</code>. You should see commands/options suggestions.
            </p>
            <Callout variant="tip" title="Quality of life">
              Completion is most useful with shell history search (<code>Ctrl+R</code>) and short aliases.
            </Callout>
          </section>

          <section id="troubleshoot" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Troubleshooting</h2>
            <div className="space-y-4">
              <div>
                <p className="text-slate-300 text-sm font-medium mb-2">Completion not working:</p>
                <ol className="list-decimal list-inside text-slate-400 text-sm space-y-1">
                  <li>Check argcomplete is installed: <code className="text-xs bg-slate-900 px-1 py-0.5 rounded border border-slate-700">pip show argcomplete</code></li>
                  <li>Reload your shell: <code className="text-xs bg-slate-900 px-1 py-0.5 rounded border border-slate-700">source ~/.zshrc</code></li>
                  <li>Check file permissions: <code className="text-xs bg-slate-900 px-1 py-0.5 rounded border border-slate-700">ls -la ~/.zfunc/_nihil</code></li>
                </ol>
              </div>
              <div>
                <p className="text-slate-300 text-sm font-medium mb-2">Error: command not found: register-python-argcomplete</p>
                <p className="text-slate-400 text-sm">Add user bin path once in your shell profile: <code>export PATH="$PATH:$(python3 -m site --user-base)/bin"</code>.</p>
              </div>
              <div>
                <p className="text-slate-300 text-sm font-medium mb-2">Clear zsh completion cache:</p>
                <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`rm ~/.zcompdump*
compinit`}
                </pre>
              </div>
            </div>
          </section>
        </div>

        <SectionToc
          items={[
            { id: 'tldr', label: 'TL;DR' },
            { id: 'prereqs', label: 'Prerequisites' },
            { id: 'bash', label: 'Bash' },
            { id: 'zsh', label: 'Zsh' },
            { id: 'test', label: 'Test it' },
            { id: 'troubleshoot', label: 'Troubleshooting' },
          ]}
        />
      </div>
    </div>
  );
};
