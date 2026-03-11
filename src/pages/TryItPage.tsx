import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

const PROMPT = 'nihil-demo ~ $ ';
const WELCOME = `Nihil demo. Try commands without installing. Nothing is executed on your machine.

Type 'nihil --help' to see all commands. Use ↑↓ to navigate history, or click a suggestion below.
`;

type OutputLine = { type: 'input' | 'output'; text: string };
type ImageVariant = 'base' | 'ad' | 'web';
type NetworkMode = 'host' | 'docker' | 'disabled' | 'nat';

interface Container {
  name: string;
  image: ImageVariant;
  privileged: boolean;
  network: NetworkMode;
  workspace: string | null;
  status: 'running' | 'stopped';
}

interface DemoState {
  containers: Map<string, Container>;
  installedImages: Set<ImageVariant>;
}

const IMAGE_META: Record<ImageVariant, { tag: string; description: string; size: string }> = {
  base: { tag: 'nihil',     description: 'Base image (OS + core tools)', size: '2.34 GB' },
  ad:   { tag: 'nihil-ad',  description: 'Active Directory tools',       size: '4.12 GB' },
  web:  { tag: 'nihil-web', description: 'Web / HTTP tools',             size: '3.01 GB' },
};

const IMAGE_ALIASES: Record<string, ImageVariant> = {
  base: 'base', ad: 'ad', 'active-directory': 'ad', web: 'web',
};

function pad(s: string, n: number) {
  return s + ' '.repeat(Math.max(0, n - s.length));
}

function initialState(): DemoState {
  return {
    containers: new Map([
      ['mybox', { name: 'mybox', image: 'ad', privileged: false, network: 'host', workspace: null, status: 'stopped' }],
    ]),
    installedImages: new Set<ImageVariant>(['base', 'ad']),
  };
}

function simulateNihil(
  line: string,
  state: DemoState,
  setState: React.Dispatch<React.SetStateAction<DemoState>>,
): string {
  const parts = line.trim().split(/\s+/);
  const root = parts[0].toLowerCase();

  if (root === 'ls')  return 'README.md  nihil  docs\n';
  if (root === 'pwd') return '/home/nihil-demo\n';
  if (root === 'help' || root === '?') return 'Try: nihil --help  |  nihil info  |  nihil start mybox\n';
  if (root !== 'nihil') return `bash: ${line.trim()}: command not found\n`;

  const sub  = parts[1]?.toLowerCase();
  const rest = parts.slice(2);

  // nihil / nihil --help
  if (!sub || sub === '--help' || sub === '-h') {
    return `usage: nihil [-h] [--version] COMMAND ...

Nihil - by TheNullPigeons

commands:
  info        Display information about images and containers
  images      List available image variants
  start       Start a container (creates it if it doesn't exist)
  stop        Stop a container
  exec        Execute a command in a container
  remove      Remove one or more containers
  install     Install or update nihil images
  uninstall   Remove nihil images
  update      Update installed nihil images
  doctor      Run diagnostics checks
  completion  Generate shell completion script
`;
  }

  // --version / version
  if (sub === '--version' || sub === '-v' || sub === 'version') {
    return 'nihil 0.1.0\n';
  }

  // images
  if (sub === 'images') {
    const variants = Object.keys(IMAGE_META) as ImageVariant[];
    let out = '\nAVAILABLE IMAGE VARIANTS\n';
    out += `  ${pad('VARIANT', 10)}${pad('IMAGE', 12)}${pad('DESCRIPTION', 32)}INSTALLED\n`;
    for (const v of variants) {
      const m = IMAGE_META[v];
      out += `  ${pad(v, 10)}${pad(m.tag, 12)}${pad(m.description, 32)}${state.installedImages.has(v) ? 'Yes' : 'No'}\n`;
    }
    out += '\n[*] Usage: nihil start <name> --image <variant>\n';
    return out;
  }

  // info
  if (sub === 'info') {
    const containerArg = rest.indexOf('--container');
    if (containerArg !== -1 && rest[containerArg + 1]) {
      const cname = rest[containerArg + 1];
      const c = state.containers.get(cname);
      if (!c) return `[!] Container '${cname}' not found.\n`;
      return `\nCONTAINER: ${c.name}
  Status     ${c.status}
  Image      ${IMAGE_META[c.image].tag}
  Network    ${c.network}
  Privileged ${c.privileged ? 'Yes' : 'No'}
  Workspace  ${c.workspace ?? '/workspace (not set)'}
`;
    }

    const variants = Object.keys(IMAGE_META) as ImageVariant[];
    let out = `\n[*] Nihil version 0.1.0\n\nAVAILABLE IMAGE VARIANTS\n`;
    out += `  ${pad('VARIANT', 10)}${pad('IMAGE', 12)}DESCRIPTION\n`;
    for (const v of variants) {
      const m = IMAGE_META[v];
      out += `  ${pad(v, 10)}${pad(m.tag, 12)}${m.description}\n`;
    }
    out += '\nINSTALLED IMAGES\n';
    if (state.installedImages.size === 0) {
      out += '  (none)\n';
    } else {
      out += `  ${pad('IMAGE', 12)}SIZE\n`;
      for (const v of state.installedImages) {
        out += `  ${pad(IMAGE_META[v].tag, 12)}${IMAGE_META[v].size}\n`;
      }
    }
    out += '\nCONTAINERS\n';
    if (state.containers.size === 0) {
      out += '  (none)\n';
    } else {
      out += `  ${pad('NAME', 14)}${pad('STATUS', 10)}${pad('IMAGE', 12)}CONFIG\n`;
      for (const [, c] of state.containers) {
        const config = [
          c.privileged ? 'privileged' : '',
          c.network !== 'host' ? `net:${c.network}` : '',
          c.workspace ? `ws:${c.workspace}` : '',
        ].filter(Boolean).join(', ') || 'Standard';
        out += `  ${pad(c.name, 14)}${pad(c.status, 10)}${pad(IMAGE_META[c.image].tag, 12)}${config}\n`;
      }
    }
    return out;
  }

  // doctor
  if (sub === 'doctor') {
    const webInstalled = state.installedImages.has('web');
    return `
[*] Running diagnostics...

  [✓] Python            3.12.3
  [✓] Docker daemon     running
  [✓] nihil-images-ad   installed (4.12 GB)
  [✓] nihil-images      installed (2.34 GB)
  ${webInstalled ? '[✓] nihil-images-web  installed (3.01 GB)' : "[!] nihil-images-web  not installed — run 'nihil install web'"}

[✓] All critical checks passed.
`;
  }

  // start
  if (sub === 'start') {
    const name = rest[0];
    if (!name || name.startsWith('-')) return `[!] Usage: nihil start <name> [options]\n`;

    const flags       = rest.slice(1);
    const imageIdx    = flags.indexOf('--image');
    const imageRaw    = imageIdx !== -1 ? flags[imageIdx + 1] : null;
    const imageKey    = imageRaw ? IMAGE_ALIASES[imageRaw] : null;
    const existing    = state.containers.get(name);

    if (imageRaw && !imageKey) {
      return `[!] Unknown image variant '${imageRaw}'. Choose from: base, ad, web\n`;
    }

    if (existing?.status === 'running') {
      return `[!] Container '${name}' is already running.\n[*] Use 'nihil exec ${name}' to connect.\n`;
    }

    const resolvedImage: ImageVariant = imageKey ?? existing?.image ?? 'ad';
    const privileged   = flags.includes('--privileged');
    const networkIdx   = flags.indexOf('--network');
    const network      = (networkIdx !== -1 ? flags[networkIdx + 1] : 'host') as NetworkMode;
    const workspaceIdx = flags.indexOf('--workspace');
    const workspace    = workspaceIdx !== -1 ? (flags[workspaceIdx + 1] ?? null) : (flags.includes('--workspace-here') ? '.' : null);
    const noShell      = flags.includes('--no-shell');

    if (!state.installedImages.has(resolvedImage)) {
      return `[*] Image '${IMAGE_META[resolvedImage].tag}' is not installed.\n[*] Run 'nihil install ${resolvedImage}' first.\n`;
    }

    const container: Container = { name, image: resolvedImage, privileged, network, workspace, status: 'running' };
    setState((s) => {
      const containers = new Map(s.containers);
      containers.set(name, container);
      return { ...s, containers };
    });

    const boxWidth = 43;
    const row = (label: string, value: string) => {
      const content = `${pad(label, 10)} ${pad(value, boxWidth - 14)}`;
      return `│ ${content}│`;
    };
    const border = `${'─'.repeat(boxWidth)}`;
    const summary = [
      `┌─ Container: ${name} ${border.slice(name.length + 14)}┐`,
      row('Image',      IMAGE_META[resolvedImage].tag),
      row('Network',    network),
      row('Privileged', privileged ? 'Yes' : 'No'),
      row('Workspace',  workspace ?? '(none)'),
      `└${border}┘`,
    ].join('\n');

    const isNew = !existing;
    let out = '\n';
    if (isNew) {
      out += `[*] Container '${name}' doesn't exist. Creating...\n`;
      out += `[*] Using image: ${IMAGE_META[resolvedImage].tag} (ghcr.io/thenullpigeons/${IMAGE_META[resolvedImage].tag}:latest)\n`;
      out += `[✓] Container '${name}' created and started successfully.\n\n`;
    } else {
      out += `[*] Starting existing container '${name}'...\n`;
      out += `[✓] Container '${name}' started.\n\n`;
    }
    out += summary + '\n';
    out += noShell
      ? `\n[*] Started in background (--no-shell). Use 'nihil exec ${name}' to connect.\n`
      : `\n[*] Connecting to '${name}'... (demo only — no real shell)\n`;
    return out;
  }

  // stop
  if (sub === 'stop') {
    const name = rest[0];
    if (!name) return `[!] Usage: nihil stop <name>\n`;
    const c = state.containers.get(name);
    if (!c) return `[!] Container '${name}' not found.\n`;
    if (c.status === 'stopped') return `[!] Container '${name}' is already stopped.\n`;
    setState((s) => {
      const containers = new Map(s.containers);
      containers.set(name, { ...c, status: 'stopped' });
      return { ...s, containers };
    });
    return `[*] Stopping container '${name}'...\n[✓] Container '${name}' stopped.\n`;
  }

  // exec
  if (sub === 'exec') {
    const name = rest[0];
    if (!name) return `[!] Usage: nihil exec <name> [command]\n`;
    const c = state.containers.get(name);
    if (!c) return `[!] Container '${name}' not found.\n`;
    if (c.status === 'stopped') {
      return `[!] Container '${name}' is stopped.\n[*] Start it first with 'nihil start ${name}'.\n`;
    }
    const command = rest.slice(1).join(' ') || 'zsh';
    if (['zsh', 'bash', 'sh'].includes(command)) {
      return `[*] Connecting to '${name}' (${IMAGE_META[c.image].tag})...\n[*] Opening ${command} shell\n\n[*] (demo only — no real shell is opened here)\n`;
    }
    return `[*] Executing in '${name}': ${command}\n[*] (demo only — nothing is actually run)\n`;
  }

  // remove
  if (sub === 'remove') {
    const force = rest.includes('--force') || rest.includes('-f');
    const names = rest.filter((r) => !r.startsWith('-'));
    if (names.length === 0) return `[!] Usage: nihil remove <name...> [--force]\n`;
    let out = '';
    for (const name of names) {
      const c = state.containers.get(name);
      if (!c) { out += `[!] Container '${name}' not found.\n`; continue; }
      if (c.status === 'running' && !force) {
        out += `[!] Container '${name}' is running. Use --force to remove anyway.\n`;
        continue;
      }
      setState((s) => {
        const containers = new Map(s.containers);
        containers.delete(name);
        return { ...s, containers };
      });
      out += `[✓] Container '${name}' removed.\n`;
    }
    return out;
  }

  // install
  if (sub === 'install') {
    const imageRaw = rest[0];
    const variant  = imageRaw ? IMAGE_ALIASES[imageRaw] as ImageVariant | undefined : undefined;
    if (imageRaw && !variant) return `[!] Unknown image '${imageRaw}'. Choose from: base, ad, web\n`;
    const toInstall: ImageVariant[] = variant
      ? [variant]
      : (Object.keys(IMAGE_META) as ImageVariant[]).filter((v) => !state.installedImages.has(v));
    if (toInstall.length === 0) {
      return variant
        ? `[✓] Image '${IMAGE_META[variant].tag}' is already installed.\n`
        : `[✓] All images are already installed.\n`;
    }
    setState((s) => {
      const installedImages = new Set(s.installedImages);
      for (const v of toInstall) installedImages.add(v);
      return { ...s, installedImages };
    });
    return toInstall.map((v) =>
      `[*] Pulling ${IMAGE_META[v].tag}:latest from ghcr.io...\n[✓] ${IMAGE_META[v].tag} installed (${IMAGE_META[v].size}).`
    ).join('\n') + '\n';
  }

  // update
  if (sub === 'update') {
    const imageRaw = rest[0];
    const variant  = imageRaw ? IMAGE_ALIASES[imageRaw] as ImageVariant | undefined : undefined;
    if (imageRaw && !variant) return `[!] Unknown image '${imageRaw}'. Choose from: base, ad, web\n`;
    const toUpdate = variant ? [variant] : Array.from(state.installedImages);
    if (toUpdate.length === 0) return `[!] No images installed. Run 'nihil install' first.\n`;
    if (variant && !state.installedImages.has(variant)) {
      return `[!] Image '${IMAGE_META[variant].tag}' is not installed. Run 'nihil install ${variant}' first.\n`;
    }
    return toUpdate.map((v) =>
      `[*] Checking ${IMAGE_META[v].tag}:latest...\n[✓] ${IMAGE_META[v].tag} is up to date.`
    ).join('\n') + '\n';
  }

  // uninstall
  if (sub === 'uninstall') {
    const force = rest.includes('--force') || rest.includes('-f');
    const names = rest.filter((r) => !r.startsWith('-'));
    if (names.length === 0) return `[!] Usage: nihil uninstall <image> [--force]\n`;
    let out = '';
    for (const name of names) {
      const variant = IMAGE_ALIASES[name] as ImageVariant | undefined;
      if (!variant) { out += `[!] Unknown image '${name}'. Choose from: base, ad, web\n`; continue; }
      if (!state.installedImages.has(variant)) { out += `[!] Image '${IMAGE_META[variant].tag}' is not installed.\n`; continue; }
      const dependents = Array.from(state.containers.values()).filter((c) => c.image === variant);
      if (dependents.length > 0 && !force) {
        out += `[!] Image '${IMAGE_META[variant].tag}' is used by: ${dependents.map((c) => c.name).join(', ')}. Use --force to remove anyway.\n`;
        continue;
      }
      setState((s) => {
        const installedImages = new Set(s.installedImages);
        installedImages.delete(variant);
        return { ...s, installedImages };
      });
      out += `[✓] Image '${IMAGE_META[variant].tag}' removed.\n`;
    }
    return out;
  }

  // completion
  if (sub === 'completion') {
    const shell = rest[0];
    if (shell === 'bash') {
      return `# Nihil bash completion
_nihil_completion() { ... }
complete -F _nihil_completion nihil

# Install system-wide:
#   nihil completion bash | sudo tee /etc/bash_completion.d/nihil
`;
    }
    if (shell === 'zsh') {
      return `# Nihil zsh completion
#compdef nihil
_nihil() { ... }
_nihil "$@"

# Install:
#   nihil completion zsh > ~/.zfunc/_nihil
`;
    }
    return `[!] Usage: nihil completion <bash|zsh>\n`;
  }

  return `nihil: '${sub}' is not a nihil command. See 'nihil --help'.\n`;
}

const SUGGESTIONS = [
  'nihil --help',
  'nihil info',
  'nihil images',
  'nihil doctor',
  'nihil start pentest --image ad --privileged --network host',
  'nihil start weblab --image web --workspace ~/projects',
  'nihil exec mybox',
  'nihil stop mybox',
  'nihil install web',
  'nihil update',
  'nihil remove mybox --force',
  'nihil completion zsh',
];

export const TryItPage: React.FC = () => {
  const [termHistory, setTermHistory] = useState<OutputLine[]>([{ type: 'output', text: WELCOME }]);
  const [demoState, setDemoState]     = useState<DemoState>(initialState);
  const [input, setInput]             = useState('');
  const [cmdHistory, setCmdHistory]   = useState<string[]>([]);
  const [historyIdx, setHistoryIdx]   = useState(-1);
  const [cursorVisible, setCursorVisible] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [termHistory]);

  useEffect(() => {
    const t = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(t);
  }, []);

  const submit = useCallback((line: string) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    const cmd = trimmed.split(/\s+/)[0].toLowerCase();
    if (cmd === 'clear') {
      setTermHistory([{ type: 'output', text: WELCOME }]);
      setDemoState(initialState());
      setInput('');
      setHistoryIdx(-1);
      return;
    }

    setCmdHistory((h) => [trimmed, ...h]);
    setHistoryIdx(-1);
    setTermHistory((h) => [...h, { type: 'input', text: PROMPT + trimmed }]);

    const out = simulateNihil(trimmed, demoState, setDemoState);
    if (out) {
      setTermHistory((h) => [...h, { type: 'output', text: out.trimEnd() }]);
    }
    setInput('');
  }, [demoState]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(historyIdx + 1, cmdHistory.length - 1);
      setHistoryIdx(next);
      setInput(cmdHistory[next] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = historyIdx - 1;
      if (next < 0) { setHistoryIdx(-1); setInput(''); }
      else { setHistoryIdx(next); setInput(cmdHistory[next] ?? ''); }
    }
  };

  return (
    <div className="space-y-6">
      <header className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          <span className="text-amber-400">Try Nihil</span>
        </h1>
        <p className="text-slate-400 mt-3 text-sm md:text-base">
          Interactive demo. Type commands below, nothing runs on your machine.
        </p>
        <p className="text-slate-500 text-xs mt-2">
          Real install: <Link to="/docs" className="text-amber-400 hover:underline">Get started</Link>
        </p>
      </header>

      {/* Suggestions */}
      <div className="flex flex-wrap gap-2 max-w-4xl mx-auto">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => { submit(s); inputRef.current?.focus(); }}
            className="text-xs font-mono px-2.5 py-1 rounded-md border border-slate-700 bg-slate-900/60 text-slate-400 hover:border-amber-500/40 hover:text-amber-300 transition-colors"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Terminal */}
      <section
        className="rounded-2xl border border-slate-700 bg-slate-950 overflow-hidden shadow-xl font-mono text-sm cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-800 bg-slate-900/80">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-500" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-500" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-500" />
          <span className="text-slate-500 ml-2 text-xs">nihil demo</span>
          <span className="ml-auto text-[10px] text-slate-600">↑↓ history · type 'clear' to reset</span>
        </div>
        <div className="p-4 min-h-[360px] max-h-[70vh] overflow-y-auto">
          {termHistory.map((line, i) => (
            <div key={i} className="mb-1">
              {line.type === 'input' ? (
                <div className="text-amber-200/90 text-xs">{line.text}</div>
              ) : (
                <pre className="text-slate-300 whitespace-pre-wrap break-words font-mono text-xs leading-relaxed">
                  {line.text.split('\n').map((l, j) => {
                    if (l.startsWith('[✓]')) return <span key={j} className="text-emerald-400">{l}{'\n'}</span>;
                    if (l.startsWith('[!]')) return <span key={j} className="text-amber-400">{l}{'\n'}</span>;
                    if (l.startsWith('[*]')) return <span key={j} className="text-sky-400">{l}{'\n'}</span>;
                    if (l.startsWith('  ') && l.trim()) return <span key={j} className="text-slate-400">{l}{'\n'}</span>;
                    return <span key={j}>{l}{'\n'}</span>;
                  })}
                </pre>
              )}
            </div>
          ))}
          <form onSubmit={handleSubmit} className="flex items-center mt-1">
            <span className="text-amber-200/90 select-none text-xs">{PROMPT}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-slate-200 text-xs outline-none caret-slate-300 min-w-0"
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              aria-label="Command input"
            />
            {cursorVisible && <span className="inline-block w-2 h-4 bg-amber-400/90 animate-pulse" />}
          </form>
        </div>
        <div ref={bottomRef} />
      </section>

      <p className="text-center text-slate-500 text-xs max-w-md mx-auto">
        This is a simulation. To run Nihil for real, follow the{' '}
        <Link to="/docs" className="text-amber-400 hover:underline">Get started</Link> guide.
      </p>
    </div>
  );
};
