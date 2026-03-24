import React from 'react';
import { SectionToc } from '../../components/SectionToc';

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
          Complete reference for all Nihil commands and their options.
        </p>
      </header>

      <div className="grid sm:grid-cols-[minmax(0,_1fr)_180px] gap-8 items-start">
        <div className="space-y-10 min-w-0">

          <section id="start" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">
              <code className="text-amber-300">nihil start</code>
            </h2>
            <p className="text-slate-400 text-sm">
              Start a container. Creates it automatically if it doesn't exist yet.
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`nihil start <name> [options]`}
            </pre>
            <div className="space-y-1 text-sm">
              <p className="text-slate-300 font-medium">Options:</p>
              <ul className="space-y-1 text-slate-400 text-xs font-mono">
                <li><span className="text-slate-200">--image</span> {'<base|ad|web>'}  Image variant to use</li>
                <li><span className="text-slate-200">--privileged</span>              Privileged mode</li>
                <li><span className="text-slate-200">--network</span> {'<mode>'}        docker / host / disabled / nat</li>
                <li><span className="text-slate-200">--workspace</span> {'<path>'}      Mount a host directory at /workspace</li>
                <li><span className="text-slate-200">--workspace-here</span>          Mount current directory as /workspace</li>
                <li><span className="text-slate-200">--vpn</span> {'<file>'}            OpenVPN config (.ovpn) for this session</li>
                <li><span className="text-slate-200">--enable-x11</span>              Forward X11/XWayland display</li>
                <li><span className="text-slate-200">--browser-ui</span>              Enable noVNC browser desktop</li>
                <li><span className="text-slate-200">--log</span>                     Record shell session with asciinema</li>
                <li><span className="text-slate-200">--no-shell</span>                Don't open a shell after start</li>
              </ul>
            </div>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`# Simple container
nihil start my-pentest

# AD tools, privileged, host network
nihil start ad-lab --image ad --privileged --network host

# With workspace
nihil start web-pentest --workspace ~/projects/web

# VPN for this session only
nihil start vpn-lab --vpn ~/vpn/client.ovpn

# No shell (use nihil exec later)
nihil start background --no-shell`}
            </pre>
          </section>

          <section id="stop" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">
              <code className="text-amber-300">nihil stop</code>
            </h2>
            <p className="text-slate-400 text-sm">Stop a running container.</p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`nihil stop <name>

nihil stop my-pentest`}
            </pre>
          </section>

          <section id="exec" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">
              <code className="text-amber-300">nihil exec</code>
            </h2>
            <p className="text-slate-400 text-sm">
              Execute a command in a running container. Opens a zsh shell by default.
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`nihil exec <name> [command]

# Open a shell
nihil exec my-pentest

# Run a specific command
nihil exec my-pentest nmap -sn 192.168.1.0/24
nihil exec my-pentest python3 scan.py`}
            </pre>
          </section>

          <section id="remove" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">
              <code className="text-amber-300">nihil remove</code>
            </h2>
            <p className="text-slate-400 text-sm">
              Remove one or more containers. Without arguments, shows an interactive selection.
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`nihil remove [names...] [--force]

# Interactive selection
nihil remove

# Remove specific containers
nihil remove test1 test2 test3

# Force remove (even if running)
nihil remove old-container --force`}
            </pre>
          </section>

          <section id="install" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">
              <code className="text-amber-300">nihil install</code>
            </h2>
            <p className="text-slate-400 text-sm">
              Pull a Nihil image from the registry. Prompts for selection if no variant is given.
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`nihil install [base|ad|web]

# Interactive image selection
nihil install

# Pull a specific variant
nihil install ad`}
            </pre>
          </section>

          <section id="update" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">
              <code className="text-amber-300">nihil update</code>
            </h2>
            <p className="text-slate-400 text-sm">
              Re-pull installed Nihil images to get the latest version. Reports whether the image actually changed.
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`nihil update [base|ad|web]

# Update all installed images
nihil update

# Update a specific variant
nihil update ad`}
            </pre>
          </section>

          <section id="info" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">
              <code className="text-amber-300">nihil info</code>
            </h2>
            <p className="text-slate-400 text-sm">
              Show available image variants, installed images, and all containers with their status.
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`nihil info

# Show details for a specific container
nihil info --container my-pentest`}
            </pre>
          </section>

          <section id="doctor" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">
              <code className="text-amber-300">nihil doctor</code>
            </h2>
            <p className="text-slate-400 text-sm">
              Run environment diagnostics: checks Python version, Docker daemon, and image availability.
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`nihil doctor`}
            </pre>
          </section>

          <section id="uninstall" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">
              <code className="text-amber-300">nihil uninstall</code>
            </h2>
            <p className="text-slate-400 text-sm">
              Remove installed Nihil Docker images. Prompts to remove dependent containers.
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`nihil uninstall [names...] [--force]

# Interactive selection
nihil uninstall`}
            </pre>
          </section>

          <section id="usecases" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Common use cases</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-slate-300 text-sm font-medium">Web pentest with workspace:</p>
                <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`nihil start web-lab --image web --workspace ~/projects/web`}
                </pre>
              </div>
              <div className="space-y-2">
                <p className="text-slate-300 text-sm font-medium">CTF with full network access:</p>
                <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`nihil start ctf --privileged --network host`}
                </pre>
              </div>
              <div className="space-y-2">
                <p className="text-slate-300 text-sm font-medium">Active Directory lab:</p>
                <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`nihil start ad-lab --image ad --privileged --network host --workspace ~/ad-lab`}
                </pre>
              </div>
              <div className="space-y-2">
                <p className="text-slate-300 text-sm font-medium">Workspace persists after container removal:</p>
                <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`nihil start project --workspace ~/my-project
# ... work inside the container ...
nihil remove project
# Files in ~/my-project are still there`}
                </pre>
              </div>
            </div>
          </section>
        </div>

        <SectionToc
          items={[
            { id: 'start', label: 'nihil start' },
            { id: 'stop', label: 'nihil stop' },
            { id: 'exec', label: 'nihil exec' },
            { id: 'remove', label: 'nihil remove' },
            { id: 'install', label: 'nihil install' },
            { id: 'update', label: 'nihil update' },
            { id: 'info', label: 'nihil info' },
            { id: 'doctor', label: 'nihil doctor' },
            { id: 'uninstall', label: 'nihil uninstall' },
            { id: 'usecases', label: 'Use cases' },
          ]}
        />
      </div>
    </div>
  );
};
