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
          Nihil automatically logs every command you run so you can find and reuse complex invocations later.
        </p>
      </header>

      <div className="grid sm:grid-cols-[minmax(0,_1fr)_180px] gap-8 items-start">
        <div className="space-y-10 min-w-0">
          <section id="tldr">
            <TldrBlock
              items={[
                'Nihil logs executed commands automatically.',
                'Use grep/fzf to recover previous workflows quickly.',
                'Rotate file periodically if engagement volume is high.',
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
            <p className="text-slate-400 text-sm">Each line is the full command that was run:</p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`nihil start my-pentest --privileged
nihil exec my-pentest nmap -sn 192.168.1.0/24
nihil stop my-pentest
nihil remove my-pentest --force`}
            </pre>
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
