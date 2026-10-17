import React from 'react';
import { SectionToc } from '../../components/SectionToc';
import { Callout, TldrBlock } from '../../components/DocsBlocks';

export const HistoryPage: React.FC = () => {
  return (
    <div className="space-y-8 w-full">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          Docs / <span className="text-amber-400">Command History</span>
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          Command History
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl">
          Nihil logs every nihil command you run to its own history file, so you can find and reuse complex invocations later. This is separate from your shell history.
        </p>
      </header>

      <div className="grid sm:grid-cols-[minmax(0,_1fr)_180px] gap-8 items-start">
        <div className="space-y-10 min-w-0">
          <section id="tldr">
            <TldrBlock
              items={[
                'Nihil logs every nihil command you run to ~/.config/nihil/history.log.',
                'Sensitive values (--env, --vpn, --workspace, --browser-ui-password) are masked as ***.',
                'The file is never purged automatically, not even by nihil remove.',
                'Use grep/fzf to recover previous workflows quickly.',
              ]}
            />
          </section>

          <section id="location" className="space-y-3">
            <h2 className="text-xl font-semibold text-white">Location</h2>
            <p className="text-slate-400 text-sm">The history file is stored at:</p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`~/.config/nihil/history.log`}
            </pre>
            <p className="text-slate-400 text-sm">
              The file and its parent directory are created automatically on first use.
            </p>
          </section>

          <section id="format" className="space-y-3">
            <h2 className="text-xl font-semibold text-white">Format</h2>
            <p className="text-slate-400 text-sm">
              Each line is the nihil command that was run, with sensitive option values replaced by <code>***</code>:
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`nihil start my-pentest --privileged
nihil exec my-pentest nmap -sn 192.168.1.0/24
nihil start vpn-lab --vpn *** --network docker
nihil remove my-pentest --force`}
            </pre>
            <Callout variant="note" title="Secrets are masked, and nothing is auto-deleted">
              The values of <code>--env</code>, <code>--vpn</code>, <code>--workspace</code> and
              <code>--browser-ui-password</code> are written as <code>***</code>, so client paths and secrets never land
              in the log. The file is never purged automatically, not even by <code>nihil remove</code>: delete it
              yourself when an engagement ends.
            </Callout>
          </section>

          <section id="usage" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Usage</h2>
            <div className="space-y-3">
              <p className="text-slate-300 text-sm font-medium">Browse the history:</p>
              <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`tail -20 ~/.config/nihil/history.log
grep "start" ~/.config/nihil/history.log`}
              </pre>
              <p className="text-slate-300 text-sm font-medium">Interactive search with fzf:</p>
              <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`cat ~/.config/nihil/history.log | fzf`}
              </pre>
              <p className="text-slate-300 text-sm font-medium">Reverse search with fzf and <code className="text-amber-300">Ctrl+R</code>:</p>
              <p className="text-slate-400 text-sm">
                The log is a plain text file, so you can bind it to an <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono">Ctrl+R</kbd>-style
                picker. For example, select a past nihil command and drop it on the prompt:
              </p>
              <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`# zsh/bash widget: fuzzy-pick a past nihil command
print -z "$(tac ~/.config/nihil/history.log | fzf)"`}
              </pre>
            </div>
          </section>
          <Callout variant="note" title="Operational hygiene">
            Avoid storing sensitive raw secrets in shell command arguments when possible.
          </Callout>

          <section id="cleanup" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Cleanup</h2>
            <p className="text-slate-400 text-sm">Keep only the last 1000 lines:</p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`tail -1000 ~/.config/nihil/history.log > ~/.config/nihil/history.log.tmp
mv ~/.config/nihil/history.log.tmp ~/.config/nihil/history.log`}
            </pre>
          </section>

        </div>

        <SectionToc
          items={[
            { id: 'tldr', label: 'TL;DR' },
            { id: 'location', label: 'Location' },
            { id: 'format', label: 'Format' },
            { id: 'usage', label: 'Usage' },
            { id: 'cleanup', label: 'Cleanup' },
          ]}
        />
      </div>
    </div>
  );
};
