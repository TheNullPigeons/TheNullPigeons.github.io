import React from 'react';

export const HistoryPage: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl">
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

      <div className="grid md:grid-cols-[1fr,200px] gap-8 items-start">
        <div className="space-y-10 min-w-0">

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
{`# Show all
cat ~/.config/nihil/history.log

# Last 20 entries
tail -20 ~/.config/nihil/history.log

# Search for a keyword
grep "start" ~/.config/nihil/history.log
grep "privileged" ~/.config/nihil/history.log`}
              </pre>
              <p className="text-slate-300 text-sm font-medium">Interactive search with fzf:</p>
              <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`cat ~/.config/nihil/history.log | fzf`}
              </pre>
              <p className="text-slate-300 text-sm font-medium">Extract all start commands into a script:</p>
              <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`grep "^nihil start" ~/.config/nihil/history.log > start_commands.sh
chmod +x start_commands.sh`}
              </pre>
            </div>
          </section>

          <section id="cleanup" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Cleanup</h2>
            <p className="text-slate-400 text-sm">Keep only the last 1000 lines:</p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`tail -1000 ~/.config/nihil/history.log > ~/.config/nihil/history.log.tmp
mv ~/.config/nihil/history.log.tmp ~/.config/nihil/history.log`}
            </pre>
          </section>

        </div>

        <aside className="space-y-3 text-sm sticky top-24 hidden md:block">
          <p className="text-slate-500 font-medium">On this page</p>
          <nav className="space-y-1">
            <a href="#location" className="block text-slate-400 hover:text-amber-300 text-xs">Location</a>
            <a href="#format" className="block text-slate-400 hover:text-amber-300 text-xs">Format</a>
            <a href="#usage" className="block text-slate-400 hover:text-amber-300 text-xs">Usage</a>
            <a href="#cleanup" className="block text-slate-400 hover:text-amber-300 text-xs">Cleanup</a>
          </nav>
        </aside>
      </div>
    </div>
  );
};
