import React from 'react';
import { SectionToc } from '../../components/SectionToc';
import { Callout, TldrBlock } from '../../components/DocsBlocks';

/* ── SVG diagram: CLI flow ── */
const FlowDiagram: React.FC = () => (
  <div className="relative overflow-x-auto py-2">
    <svg viewBox="0 0 800 420" className="w-full min-w-[600px]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gAmber" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="gCyan" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="gEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="gPurple" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0.05" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <marker id="arrowAmber" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
        </marker>
        <marker id="arrowCyan" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6" fill="none" stroke="#06b6d4" strokeWidth="1.5" />
        </marker>
        <marker id="arrowEmerald" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6" fill="none" stroke="#10b981" strokeWidth="1.5" />
        </marker>
      </defs>

      {/* User */}
      <g>
        <circle cx="80" cy="70" r="28" fill="url(#gAmber)" stroke="#f59e0b" strokeWidth="1.5" opacity="0.9" />
        <text x="80" y="65" textAnchor="middle" fill="#fbbf24" fontSize="18" fontFamily="monospace">$</text>
        <text x="80" y="80" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="bold">USER</text>
      </g>

      {/* Arrow: User -> Parser */}
      <path d="M108,70 L175,70" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="6,3" markerEnd="url(#arrowAmber)" />
      <text x="142" y="62" textAnchor="middle" fill="#92400e" fontSize="7" fontFamily="monospace" opacity="0.7">nihil start</text>

      {/* Parser box */}
      <g>
        <rect x="185" y="42" width="130" height="56" rx="12" fill="url(#gAmber)" stroke="#f59e0b" strokeWidth="1" />
        <text x="250" y="65" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold" fontFamily="system-ui">parser.py</text>
        <text x="250" y="80" textAnchor="middle" fill="#92400e" fontSize="8" fontFamily="system-ui">Argument parsing</text>
      </g>

      {/* Arrow: Parser -> Controller */}
      <path d="M315,70 L365,70" fill="none" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowAmber)" />

      {/* Controller box */}
      <g>
        <rect x="375" y="42" width="140" height="56" rx="12" fill="url(#gAmber)" stroke="#f59e0b" strokeWidth="1" />
        <text x="445" y="65" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold" fontFamily="system-ui">controller.py</text>
        <text x="445" y="80" textAnchor="middle" fill="#92400e" fontSize="8" fontFamily="system-ui">Command dispatch</text>
      </g>

      {/* Arrow: Controller -> Manager */}
      <path d="M445,98 L445,140" fill="none" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowCyan)" />

      {/* Manager box - larger, central */}
      <g>
        <rect x="355" y="150" width="180" height="70" rx="14" fill="url(#gCyan)" stroke="#06b6d4" strokeWidth="1.5" />
        <rect x="355" y="150" width="180" height="70" rx="14" fill="none" stroke="#06b6d4" strokeWidth="0.5" strokeDasharray="4,4" strokeDashoffset="2" opacity="0.3" />
        <text x="445" y="178" textAnchor="middle" fill="#22d3ee" fontSize="13" fontWeight="bold" fontFamily="system-ui">manager.py</text>
        <text x="445" y="196" textAnchor="middle" fill="#0e7490" fontSize="9" fontFamily="system-ui">Docker SDK interactions</text>
      </g>

      {/* Arrow: Manager -> Docker Engine */}
      <path d="M445,220 L445,270" fill="none" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrowEmerald)" />

      {/* Docker Engine box */}
      <g>
        <rect x="345" y="280" width="200" height="65" rx="14" fill="url(#gEmerald)" stroke="#10b981" strokeWidth="1.5" />
        <text x="445" y="306" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold" fontFamily="system-ui">Docker Engine</text>
        <text x="445" y="324" textAnchor="middle" fill="#065f46" fontSize="9" fontFamily="system-ui">Container lifecycle</text>
      </g>

      {/* Arrow: Docker -> Container */}
      <path d="M445,345 L445,375" fill="none" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrowEmerald)" />

      {/* Container */}
      <g>
        <rect x="365" y="380" width="160" height="35" rx="8" fill="url(#gEmerald)" stroke="#10b981" strokeWidth="1" strokeDasharray="4,2" />
        <text x="445" y="402" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontWeight="bold" fontFamily="monospace">zsh session</text>
      </g>

      {/* Side: features/images.py */}
      <g>
        <rect x="580" y="42" width="140" height="56" rx="12" fill="url(#gPurple)" stroke="#a855f7" strokeWidth="1" />
        <text x="650" y="65" textAnchor="middle" fill="#c084fc" fontSize="11" fontWeight="bold" fontFamily="system-ui">images.py</text>
        <text x="650" y="80" textAnchor="middle" fill="#6b21a8" fontSize="8" fontFamily="system-ui">Image registry</text>
      </g>
      <path d="M515,60 L570,60" fill="none" stroke="#a855f7" strokeWidth="1" strokeDasharray="4,3" opacity="0.6" />

      {/* Side: ghcr.io */}
      <g>
        <rect x="600" y="170" width="170" height="80" rx="14" fill="url(#gPurple)" stroke="#a855f7" strokeWidth="1" />
        <text x="685" y="198" textAnchor="middle" fill="#c084fc" fontSize="10" fontWeight="bold" fontFamily="monospace">ghcr.io/thenullpigeons</text>
        <text x="685" y="218" textAnchor="middle" fill="#7e22ce" fontSize="8" fontFamily="system-ui">full:latest | ad:latest | web:latest</text>
        <text x="685" y="234" textAnchor="middle" fill="#7e22ce" fontSize="7" fontFamily="system-ui" opacity="0.6">:flock | :nest | :beak</text>
      </g>
      <path d="M535,185 L590,195" fill="none" stroke="#a855f7" strokeWidth="1" strokeDasharray="4,3" opacity="0.6" />

      {/* Side: volumes */}
      <g>
        <rect x="110" y="280" width="190" height="80" rx="12" fill="url(#gCyan)" stroke="#06b6d4" strokeWidth="1" opacity="0.8" />
        <text x="205" y="304" textAnchor="middle" fill="#22d3ee" fontSize="10" fontWeight="bold" fontFamily="system-ui">Mounted volumes</text>
        <text x="205" y="322" textAnchor="middle" fill="#0e7490" fontSize="8" fontFamily="monospace">/workspace</text>
        <text x="205" y="336" textAnchor="middle" fill="#0e7490" fontSize="8" fontFamily="monospace">/opt/my-resources</text>
        <text x="205" y="350" textAnchor="middle" fill="#0e7490" fontSize="8" fontFamily="monospace">/vpn (optional)</text>
      </g>
      <path d="M300,315 L340,310" fill="none" stroke="#06b6d4" strokeWidth="1" strokeDasharray="4,3" opacity="0.5" />

      {/* Side: console */}
      <g>
        <rect x="10" y="140" width="140" height="56" rx="12" fill="url(#gAmber)" stroke="#f59e0b" strokeWidth="1" opacity="0.7" />
        <text x="80" y="163" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold" fontFamily="system-ui">console/</text>
        <text x="80" y="178" textAnchor="middle" fill="#92400e" fontSize="8" fontFamily="system-ui">formatter.py + banner.py</text>
      </g>
      <path d="M150,168 L350,178" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4,3" opacity="0.4" />

      {/* Side: utils */}
      <g>
        <rect x="10" y="216" width="140" height="45" rx="12" fill="url(#gAmber)" stroke="#f59e0b" strokeWidth="1" opacity="0.7" />
        <text x="80" y="237" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold" fontFamily="system-ui">utils/</text>
        <text x="80" y="250" textAnchor="middle" fill="#92400e" fontSize="8" fontFamily="system-ui">doctor.py + history.py</text>
      </g>
      <path d="M150,238 L350,195" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4,3" opacity="0.4" />
    </svg>
  </div>
);

/* ── SVG diagram: Build pipeline ── */
const BuildDiagram: React.FC = () => (
  <div className="relative overflow-x-auto py-2">
    <svg viewBox="0 0 800 300" className="w-full min-w-[600px]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gBuild" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.04" />
        </linearGradient>
        <linearGradient id="gReg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.04" />
        </linearGradient>
        <linearGradient id="gOut" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0.04" />
        </linearGradient>
        <marker id="aRight" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6" fill="none" stroke="#64748b" strokeWidth="1.2" />
        </marker>
      </defs>

      {/* Dockerfile column */}
      <text x="100" y="24" textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="bold" fontFamily="system-ui" letterSpacing="2">DOCKERFILE</text>
      {[
        { y: 45, label: 'Dockerfile', sub: 'full', color: '#f59e0b' },
        { y: 105, label: 'Dockerfile.ad', sub: 'ad', color: '#22d3ee' },
        { y: 165, label: 'Dockerfile.web', sub: 'web', color: '#a855f7' },
      ].map((d) => (
        <g key={d.label}>
          <rect x="30" y={d.y} width="140" height="45" rx="10" fill="url(#gBuild)" stroke={d.color} strokeWidth="1" />
          <text x="100" y={d.y + 22} textAnchor="middle" fill={d.color} fontSize="10" fontWeight="bold" fontFamily="monospace">{d.label}</text>
          <text x="100" y={d.y + 36} textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="system-ui">{d.sub}</text>
        </g>
      ))}

      {/* Arrows to modules */}
      {[67, 127, 187].map((y) => (
        <path key={y} d={`M170,${y} L225,${y}`} fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="4,3" markerEnd="url(#aRight)" />
      ))}

      {/* Modules column */}
      <text x="320" y="24" textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="bold" fontFamily="system-ui" letterSpacing="2">MODULES</text>
      <rect x="235" y="38" width="170" height="195" rx="12" fill="url(#gReg)" stroke="#06b6d4" strokeWidth="1" />
      {[
        'base.sh',
        'core_tools.sh',
        'redteam_ad.sh',
        'redteam_web.sh',
        'redteam_pwn.sh',
        'redteam_network.sh',
        'redteam_credential.sh',
        'redteam_misc.sh',
        'redteam_c2.sh',
      ].map((m, i) => (
        <g key={m}>
          <rect x="248" y={52 + i * 25} width="144" height="20" rx="4" fill="#0f172a" stroke="#1e293b" strokeWidth="0.5" />
          <text x="320" y={66 + i * 25} textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">{m}</text>
        </g>
      ))}

      {/* Arrow to registries */}
      <path d="M405,135 L455,135" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="4,3" markerEnd="url(#aRight)" />

      {/* Registries */}
      <text x="550" y="24" textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="bold" fontFamily="system-ui" letterSpacing="2">REGISTRIES</text>
      <rect x="465" y="38" width="170" height="195" rx="12" fill="url(#gReg)" stroke="#06b6d4" strokeWidth="1" />
      {[
        { name: 'pacman', color: '#fbbf24' },
        { name: 'AUR', color: '#fbbf24' },
        { name: 'pipx', color: '#22d3ee' },
        { name: 'pipx-git', color: '#22d3ee' },
        { name: 'go', color: '#34d399' },
        { name: 'cargo', color: '#fb923c' },
        { name: 'git / curl', color: '#a78bfa' },
      ].map((r, i) => (
        <g key={r.name}>
          <rect x="478" y={52 + i * 25} width="144" height="20" rx="4" fill="#0f172a" stroke="#1e293b" strokeWidth="0.5" />
          <circle cx="490" cy={62 + i * 25} r="3" fill={r.color} opacity="0.8" />
          <text x="500" y={66 + i * 25} fill="#94a3b8" fontSize="8" fontFamily="monospace">{r.name}</text>
        </g>
      ))}

      {/* Arrow to output */}
      <path d="M635,135 L665,135" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="4,3" markerEnd="url(#aRight)" />

      {/* Output: GHCR */}
      <text x="730" y="24" textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="bold" fontFamily="system-ui" letterSpacing="2">OUTPUT</text>
      {[
        { y: 45, label: 'full:latest', tag: ':flock', color: '#f59e0b' },
        { y: 105, label: 'ad:latest', tag: ':nest', color: '#22d3ee' },
        { y: 165, label: 'web:latest', tag: ':beak', color: '#a855f7' },
      ].map((d) => (
        <g key={d.label}>
          <rect x="675" y={d.y} width="115" height="45" rx="10" fill="url(#gOut)" stroke="#10b981" strokeWidth="1" />
          <text x="732" y={d.y + 22} textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold" fontFamily="monospace">{d.label}</text>
          <text x="732" y={d.y + 36} textAnchor="middle" fill="#065f46" fontSize="7" fontFamily="monospace">{d.tag}</text>
        </g>
      ))}

      {/* Bottom: health check */}
      <rect x="235" y="250" width="400" height="35" rx="8" fill="url(#gOut)" stroke="#10b981" strokeWidth="1" strokeDasharray="4,2" />
      <text x="435" y="272" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontWeight="bold" fontFamily="system-ui">healthcheck.sh validates tools.json</text>
      <path d="M435,233 L435,248" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
    </svg>
  </div>
);

export const ArchitecturePage: React.FC = () => {
  return (
    <div className="space-y-8 w-full">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          Docs / <span className="text-amber-400">Architecture</span>
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          Architecture
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl">
          How nihil is structured: the CLI, Docker manager, image build system, and installation registries.
        </p>
      </header>

      <div className="grid sm:grid-cols-[minmax(0,_1fr)_180px] gap-8 items-start">
        <div className="space-y-10 min-w-0">
          <section id="tldr">
            <TldrBlock
              items={[
                'CLI parses args and dispatches command handlers.',
                'Manager orchestrates Docker lifecycle and mounts.',
                'Images are built from modular install scripts.',
                'CI publishes full/ad/web variants to GHCR.',
              ]}
            />
          </section>

          {/* Flow diagram */}
          <section id="flow" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Command flow</h2>
            <p className="text-slate-400 text-sm">
              What happens when you run <code className="text-xs bg-slate-900 px-1.5 py-0.5 rounded border border-slate-700 font-mono text-amber-300">nihil start pentest --image ad</code>
            </p>
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80">
              <FlowDiagram />
            </div>
          </section>

          {/* Step by step */}
          <section id="steps" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Step by step</h2>
            <div className="space-y-2">
              {[
                { step: '1', color: 'amber', title: 'CLI parses arguments', desc: 'parser.py handles argparse, controller.py dispatches to the right handler.' },
                { step: '2', color: 'cyan', title: 'Manager talks to Docker', desc: 'manager.py uses the Docker SDK to create, start, stop, and remove containers.' },
                { step: '3', color: 'purple', title: 'Image pulled if needed', desc: 'If the image isn\'t local, nihil pulls it from ghcr.io/thenullpigeons/ automatically.' },
                { step: '4', color: 'emerald', title: 'Container created', desc: 'Volumes mounted (workspace, my-resources, VPN), capabilities set, network configured.' },
                { step: '5', color: 'emerald', title: 'Shell attached', desc: 'A zsh session inside the container is attached to your terminal.' },
              ].map((s) => {
                const colors: Record<string, string> = {
                  amber: 'border-amber-500/30 bg-amber-500/5',
                  cyan: 'border-cyan-500/30 bg-cyan-500/5',
                  purple: 'border-purple-500/30 bg-purple-500/5',
                  emerald: 'border-emerald-500/30 bg-emerald-500/5',
                };
                const textColors: Record<string, string> = {
                  amber: 'text-amber-400',
                  cyan: 'text-cyan-400',
                  purple: 'text-purple-400',
                  emerald: 'text-emerald-400',
                };
                return (
                  <div key={s.step} className={`flex gap-3 p-3 rounded-xl border ${colors[s.color]} transition-all hover:scale-[1.01]`}>
                    <span className={`${textColors[s.color]} font-mono font-bold text-lg shrink-0 w-7 text-center`}>{s.step}</span>
                    <div>
                      <p className="text-sm font-medium text-white">{s.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{s.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Project structure */}
          <section id="structure" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Project structure</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { dir: 'cli/', files: 'controller.py, parser.py', desc: 'Command dispatch & argument parsing', color: 'amber' },
                { dir: 'manager/', files: 'manager.py', desc: 'Docker SDK interactions', color: 'cyan' },
                { dir: 'features/', files: 'images.py, browser_ui.py', desc: 'Image registry, noVNC UI', color: 'purple' },
                { dir: 'config/', files: 'defaults.py', desc: 'Paths & filesystem setup', color: 'slate' },
                { dir: 'console/', files: 'formatter.py, banner.py', desc: 'Output formatting & ASCII art', color: 'amber' },
                { dir: 'utils/', files: 'doctor.py, history.py', desc: 'Diagnostics & command logging', color: 'slate' },
              ].map((m) => {
                const borderColor: Record<string, string> = {
                  amber: 'border-amber-500/20 hover:border-amber-500/40',
                  cyan: 'border-cyan-500/20 hover:border-cyan-500/40',
                  purple: 'border-purple-500/20 hover:border-purple-500/40',
                  slate: 'border-slate-700/50 hover:border-slate-600/50',
                };
                const titleColor: Record<string, string> = {
                  amber: 'text-amber-300',
                  cyan: 'text-cyan-300',
                  purple: 'text-purple-300',
                  slate: 'text-slate-300',
                };
                return (
                  <div key={m.dir} className={`p-3 rounded-xl bg-slate-900/40 border ${borderColor[m.color]} transition-colors`}>
                    <p className={`text-sm font-bold font-mono ${titleColor[m.color]}`}>{m.dir}</p>
                    <p className="text-[11px] text-slate-500 font-mono mt-0.5">{m.files}</p>
                    <p className="text-xs text-slate-400 mt-1">{m.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Build pipeline diagram */}
          <section id="build-pipeline" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Build pipeline</h2>
            <p className="text-slate-400 text-sm">
              How images are built from Dockerfiles through modules and registries to published images.
            </p>
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80">
              <BuildDiagram />
            </div>
          </section>

          {/* Installation registries */}
          <section id="registries" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Installation registries</h2>
            <p className="text-slate-400 text-sm">
              8 installation methods are used in the build system. Post-install behavior differs by method, and tools metadata comes from <code>tools.json</code>.
            </p>
            <div className="grid sm:grid-cols-2 gap-2">
              {[
                { name: 'pacman', fn: 'install_pacman_tool', desc: 'Arch official + Chaotic-AUR', color: '#fbbf24' },
                { name: 'AUR', fn: 'install_aur_tool', desc: 'AUR community packages', color: '#fbbf24' },
                { name: 'pipx', fn: 'install_pipx_tool', desc: 'Python from PyPI', color: '#22d3ee' },
                { name: 'pipx-git', fn: 'install_pipx_tool_git', desc: 'Python from Git repos', color: '#22d3ee' },
                { name: 'go', fn: 'install_go_tool', desc: 'Go packages', color: '#34d399' },
                { name: 'cargo', fn: 'install_cargo_tool', desc: 'Rust packages', color: '#fb923c' },
                { name: 'git', fn: 'install_git_tool', desc: 'Clone + venv/symlink', color: '#a78bfa' },
                { name: 'curl', fn: 'install_tar_tool', desc: 'Direct binary downloads', color: '#a78bfa' },
              ].map((r) => (
                <div key={r.name} className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-900/40 border border-slate-800/60">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: r.color, opacity: 0.8 }} />
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-bold text-white">{r.name}</span>
                      <code className="text-[10px] text-slate-500 font-mono truncate">{r.fn}</code>
                    </div>
                    <p className="text-[11px] text-slate-500">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CI/CD */}
          <section id="ci" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">CI/CD</h2>
            <p className="text-slate-400 text-sm">
              GitHub Actions builds and publishes all three images in parallel.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { img: 'full', tag: ':flock', color: 'border-amber-500/30 bg-amber-500/5', text: 'text-amber-300' },
                { img: 'ad', tag: ':nest', color: 'border-cyan-500/30 bg-cyan-500/5', text: 'text-cyan-300' },
                { img: 'web', tag: ':beak', color: 'border-purple-500/30 bg-purple-500/5', text: 'text-purple-300' },
              ].map((b) => (
                <div key={b.img} className={`flex-1 min-w-[140px] p-3 rounded-xl border ${b.color} text-center`}>
                  <p className={`text-sm font-bold font-mono ${b.text}`}>{b.img}</p>
                  <p className="text-[10px] text-slate-500 font-mono mt-1">:latest &middot; {b.tag}</p>
                </div>
              ))}
            </div>
            <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
              <p className="text-xs text-emerald-300">
                <code className="font-mono text-emerald-200">healthcheck.sh</code> validates every tool in <code className="font-mono text-emerald-200">tools.json</code> after
                installation. Failed checks are reported and fail the build.
              </p>
            </div>
            <Callout variant="note" title="Why this matters">
              This architecture keeps runtime usage simple while preserving build-time transparency and reproducibility.
            </Callout>
          </section>

        </div>

        <SectionToc
          items={[
            { id: 'tldr', label: 'TL;DR' },
            { id: 'flow', label: 'Command flow' },
            { id: 'steps', label: 'Step by step' },
            { id: 'structure', label: 'Project structure' },
            { id: 'build-pipeline', label: 'Build pipeline' },
            { id: 'registries', label: 'Registries' },
            { id: 'ci', label: 'CI/CD' },
          ]}
        />
      </div>
    </div>
  );
};
