import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Flock } from '../components/Flock';
import { DemoReel, type Demo } from '../components/DemoReel';
import { ArrowRight, ArrowUpRight, Postmark, SectionLabel, Stamp } from '../components/Mail';

const INSTALL_CMD = 'pipx install "git+https://github.com/TheNullPigeons/nihil.git"';

const demos: Demo[] = [
  {
    id: 'start-container',
    title: 'Start a container',
    command: 'nh start thenullpigeons --image full',
    description: 'From nothing to a fully-loaded offensive workspace in one command. Nihil pulls the right image, creates the container and drops you in.',
    src: '/assets/demos/start-container.mp4',
    poster: '/assets/demos/start-container.jpg',
  },
  {
    id: 'customizeimage',
    title: 'Customize your image',
    command: 'nh image customize full',
    description: 'Pick the tools you want in a personal image branch, then let GitHub Actions build it for you. Your flock, your rules.',
    src: '/assets/demos/customizeimage.mp4',
    poster: '/assets/demos/customizeimage.jpg',
  },
  {
    id: 'mcp',
    title: 'Hand it to an agent',
    command: 'claude mcp add nihil -- nihil-mcp',
    description: 'nihil-mcp lets Claude Code or any MCP client manage Nihil containers and run tooling from plain-language requests.',
    src: '/assets/demos/mcp.mp4',
    poster: '/assets/demos/mcp.jpg',
  },
];

const tickerTools = [
  'BloodHound CE', 'NetExec', 'Impacket', 'Certipy', 'bloodyAD', 'Responder', 'mitm6', 'Coercer',
  'evil-winrm', 'lsassy', 'DonPAPI', 'RustHound', 'Metasploit', 'ffuf', 'Nuclei', 'SQLMap',
  'Chainsaw', 'Hayabusa', 'YARA', 'capa', 'Sleuth Kit', 'nihil-history', 'yazi', 'tmux',
];

const images = [
  { name: 'full', alias: ':flock', tagline: 'The whole flock, every tool, every module.', tone: 'bg-amber-500' },
  { name: 'ad', alias: ':nest', tagline: 'Nest in their Active Directory.', tone: 'bg-cyan-500' },
  { name: 'web', alias: ':beak', tagline: 'Beak through their web apps.', tone: 'bg-paper' },
  { name: 'blueteam', alias: ':coo', tagline: 'Listen before you hunt. DFIR & threat hunting.', tone: 'bg-slate-400' },
];

const fleet = [
  { name: 'nihil', role: 'The CLI', desc: 'Pull images, start containers, manage workspaces, VPN and services from one command.', to: '/docs/usage' },
  { name: 'nihil-images', role: 'Arch-based images', desc: 'Four variants, every Dockerfile public. Fork them, trim them, rebuild them.', to: '/docs/images' },
  { name: 'nihil-history', role: 'Engagement memory', desc: 'Track credentials, hosts and access links across containers and engagements.', to: '/docs/nihil-history' },
  { name: 'nihil-resources', role: 'Shared arsenal', desc: 'Webshells, Windows binaries, AD scripts and wordlists mounted in every container.', to: '/docs/resources' },
  { name: 'nihil-mcp', role: 'Agent bridge', desc: 'An MCP server so your AI assistant can drive Nihil containers for you.', to: '/docs/mcp' },
  { name: 'nihil-ntp', role: 'Clock sync', desc: 'Align the container clock with the DC so Kerberos stops complaining.', to: '/docs/nihil-ntp' },
];

const principles = [
  {
    title: 'Transparent by design',
    body: 'Every image and script lives on GitHub. No hidden install scripts, no mystery layers. Just Bash, Python, and a lot of caffeine.',
  },
  {
    title: 'Built for offensive work',
    body: 'AD enumeration, network recon, web testing. BloodHound, NetExec, Metasploit and more, picked for real engagements, not to pad a readme.',
  },
  {
    title: 'By practitioners',
    body: 'Maintained by two people who actually break things for a living, and who got tired of rebuilding the same box every engagement.',
  },
];

const faqs = [
  {
    q: 'What is Nihil?',
    a: 'Nihil is an offensive security environment built by TheNullPigeons. It ships as Arch-based Docker images paired with a Python CLI that handles everything: pulling images, creating containers, managing workspaces and VPN sessions. No hidden config, no telemetry, no black box.',
  },
  {
    q: 'Which platforms does it run on?',
    a: 'Anywhere Docker runs Linux containers. Linux and macOS are both supported, including Apple Silicon, where the amd64 images run under emulation. Windows is supported through WSL2. We still recommend Linux when you need host network mode everywhere or USB and wireless device access.',
  },
  {
    q: 'Why Arch as the base?',
    a: "Rolling updates, minimal footprint, and full control over what goes in. We're both long-time Arch users, and it keeps the base lean and up to date without waiting for distro packaging cycles.",
  },
  {
    q: 'Where are the images hosted?',
    a: 'On GitHub Container Registry (ghcr.io). You can also build them yourself from the repo: no account required, no pull limit for public images.',
  },
  {
    q: 'Any telemetry or licence key?',
    a: 'No. No phone home, no dashboard, no subscription. Use it, break it, open a PR.',
  },
  {
    q: 'How does it compare to other pentest environments?',
    a: 'Nihil is our own take on a ready-to-use offensive environment: Arch-based, fully open, no SaaS, no paywall. Just images and a CLI wrapper you control entirely.',
  },
];

const CopyCommand: React.FC<{ command: string }> = ({ command }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard unavailable: the command stays selectable */
    }
  };
  return (
    <div className="flex items-stretch border border-slate-700 bg-ink/80 backdrop-blur-sm max-w-full">
      <span className="flex items-center px-3 font-mono text-sm text-amber-500 border-r border-slate-800 select-none">$</span>
      <code className="flex-1 min-w-0 px-3 py-3 font-mono text-[12.5px] text-slate-200 overflow-x-auto whitespace-nowrap">
        {command}
      </code>
      <button
        type="button"
        onClick={copy}
        className="shrink-0 px-4 font-mono text-[11px] uppercase tracking-[0.14em] border-l border-slate-800 text-slate-300 hover:bg-paper hover:text-ink transition-colors"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
};

export const HomePage: React.FC = () => {
  return (
    <div>
      {/* ───────────── Hero ───────────── */}
      <section className="relative overflow-hidden border-b border-slate-800 min-h-[calc(100svh-4.25rem)] flex flex-col">
        <Flock />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.35]"
          style={{
            backgroundImage:
              'linear-gradient(to right, var(--color-slate-900) 1px, transparent 1px), linear-gradient(to bottom, var(--color-slate-900) 1px, transparent 1px)',
            backgroundSize: '88px 88px',
            maskImage: 'radial-gradient(ellipse at 70% 40%, black 10%, transparent 70%)',
          }}
          aria-hidden
        />

        <div className="relative flex-1 max-w-[88rem] w-full mx-auto px-5 md:px-8 pt-14 md:pt-20 pb-12 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto] gap-12 items-center">
          <div className="space-y-8 max-w-5xl min-w-0">
            <p className="animate-rise inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">
              <span className="h-2 w-2 bg-amber-500" />
              Nihil 1.0 · now in flight
            </p>

            <h1
              className="animate-rise text-paper leading-[0.86] display text-[clamp(3.4rem,7.6vw,7.5rem)]"
              style={{ animationDelay: '80ms' }}
            >
              Offensive tooling,
              <br />
              delivered by
              <br />
              <span className="stencil text-amber-500">pigeons.</span>
            </h1>

            <p
              className="animate-rise max-w-xl text-lg md:text-xl text-slate-300 leading-relaxed"
              style={{ animationDelay: '160ms' }}
            >
              <span className="text-paper font-semibold">Nihil</span> is a hand-crafted offensive environment:
              Arch-based Docker images and a CLI for real-world work, from Active Directory to the web.
              For people who don&apos;t like black boxes.
            </p>

            <div className="animate-rise space-y-5 max-w-2xl" style={{ animationDelay: '240ms' }}>
              <CopyCommand command={INSTALL_CMD} />
              <div className="flex flex-wrap gap-4">
                <Link to="/docs" className="btn-primary">
                  Read the docs
                  <ArrowRight />
                </Link>
                <a href="#transmissions" className="btn-ghost">
                  Watch it work
                </a>
              </div>
            </div>
          </div>

          <div className="hidden lg:block relative w-[19rem] h-[24rem] mr-6">
            <div className="absolute inset-0 rotate-[5deg] shadow-[18px_22px_0_rgba(0,0,0,0.55)]">
              <Stamp denomination="0.00" caption="Nihil" className="w-full h-full">
                <div className="relative w-full h-full bg-[radial-gradient(circle_at_50%_40%,#dfe6ff_0%,#efe8d8_65%)] flex items-center justify-center">
                  <img src="/assets/thenullpigeonslogo.png" alt="" className="w-[85%] object-contain" />
                </div>
              </Stamp>
            </div>
            <Postmark className="animate-stamp absolute -left-44 top-[56%] w-[23rem] text-amber-500/90" />
          </div>
        </div>

        <div className="relative border-t border-slate-800 bg-ink/70 backdrop-blur-sm">
          <dl className="max-w-[88rem] mx-auto px-5 md:px-8 grid grid-cols-2 md:grid-cols-4">
            {[
              ['Base', 'Arch Linux, rolling'],
              ['Images', 'full · ad · web · blueteam'],
              ['Registry', 'ghcr.io, no pull limit'],
              ['Telemetry', 'None. Ever.'],
            ].map(([k, v], i) => (
              <div
                key={k}
                className={
                  'py-4 md:py-5 pr-4 ' +
                  (i % 2 === 1 ? 'pl-4 border-l border-slate-800 ' : '') +
                  (i === 2 ? 'md:pl-4 md:border-l md:border-slate-800 border-t md:border-t-0 border-slate-800 ' : '') +
                  (i === 3 ? 'border-t md:border-t-0 border-slate-800 ' : '')
                }
              >
                <dt className="eyebrow text-[10px]">{k}</dt>
                <dd className="mt-1 text-sm md:text-[15px] text-paper font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <p className="hidden md:block absolute right-8 top-6 font-mono text-[10.5px] uppercase tracking-[0.16em] text-slate-600 pointer-events-none">
          Move your cursor, you&apos;re the hawk.
        </p>
      </section>

      {/* ───────────── Tool ticker ───────────── */}
      <section className="border-b border-slate-800 bg-amber-500 text-ink overflow-hidden" aria-label="Some of the bundled tools">
        <div className="flex w-max animate-[marquee_60s_linear_infinite] py-3">
          {[0, 1].map((dup) => (
            <ul key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
              {tickerTools.map((t) => (
                <li key={t} className="flex items-center display text-2xl whitespace-nowrap">
                  <span className="px-6">{t}</span>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 10 10" aria-hidden>
                    <path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4Z" fill="currentColor" />
                  </svg>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      <div className="max-w-[88rem] mx-auto px-5 md:px-8">
        {/* ───────────── Demos ───────────── */}
        <section id="transmissions" className="scroll-mt-24 py-20 md:py-28 space-y-12">
          <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6 items-end">
            <div className="space-y-5">
              <SectionLabel index="01">Transmissions</SectionLabel>
              <h2 className="text-4xl md:text-6xl font-bold display text-paper leading-[0.95]">
                See it <span className="stencil text-amber-500">fly.</span>
              </h2>
            </div>
            <p className="text-slate-400 md:text-lg leading-relaxed max-w-md md:justify-self-end">
              Three unedited terminal recordings. Pick one, or let the reel run.
              Want to type the commands yourself?{' '}
              <Link to="/try" className="text-paper underline decoration-amber-500 decoration-2 underline-offset-4 hover:text-amber-500">
                Open the online demo
              </Link>
              .
            </p>
          </div>
          <DemoReel demos={demos} />
        </section>

        {/* ───────────── Images as a stamp sheet ───────────── */}
        <section className="py-20 md:py-28 border-t border-slate-800 space-y-14">
          <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6 items-end">
            <div className="space-y-5">
              <SectionLabel index="02">The stamp sheet</SectionLabel>
              <h2 className="text-4xl md:text-6xl font-bold display text-paper leading-[0.95]">
                Four images. <br />
                <span className="stencil text-amber-500">One flock.</span>
              </h2>
            </div>
            <p className="text-slate-400 md:text-lg leading-relaxed max-w-md md:justify-self-end">
              Pick the variant that fits the engagement, or take the whole flock.
              Every one of them is a public Dockerfile on GitHub.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
            {images.map((img, i) => (
              <Link
                key={img.name}
                to="/docs/images"
                className="group block transition-transform duration-300 hover:-translate-y-2 hover:rotate-0"
                style={{ transform: `rotate(${[-2, 1.5, -1, 2][i]}deg)` }}
              >
                <Stamp
                  caption={img.alias}
                  denomination={String(i + 1).padStart(2, '0')}
                  className="aspect-[4/5] shadow-[10px_12px_0_rgba(0,0,0,0.5)]"
                >
                  <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
                    <div className={`h-2 w-10 ${img.tone}`} />
                    <svg
                      viewBox="0 0 200 90"
                      className="absolute -right-6 top-6 w-[115%] text-ink/[0.13] transition-transform duration-500 group-hover:translate-x-3"
                      aria-hidden
                    >
                      {[0, 1, 2, 3, 4, 5].map((k) => (
                        <path key={k} d={`M0 ${8 + k * 14} q 12.5 -7 25 0 t 25 0 t 25 0 t 25 0 t 25 0 t 25 0 t 25 0 t 25 0`} fill="none" stroke="currentColor" strokeWidth="3" />
                      ))}
                    </svg>
                    <p className="absolute top-[38%] left-0 right-0 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-ink/40">
                      ghcr.io/thenullpigeons
                    </p>
                    <div>
                      <p className="text-[clamp(1.8rem,4vw,3.2rem)] font-bold display leading-none text-ink">
                        {img.name}
                      </p>
                      <p className="mt-2 text-sm leading-snug text-ink/70">{img.tagline}</p>
                    </div>
                  </div>
                </Stamp>
              </Link>
            ))}
          </div>

          <p className="font-mono text-xs text-slate-500">
            <span className="text-amber-500">$</span> nihil install{' '}
            <span className="text-slate-300">full</span> | <span className="text-slate-300">ad</span> |{' '}
            <span className="text-slate-300">web</span> | <span className="text-slate-300">blueteam</span>
          </p>
        </section>

        {/* ───────────── Principles ───────────── */}
        <section className="py-20 md:py-28 border-t border-slate-800 space-y-14">
          <SectionLabel index="03">Why Nihil</SectionLabel>
          <ol className="border-t border-slate-800">
            {principles.map((p, i) => (
              <li
                key={p.title}
                className="group grid md:grid-cols-[8rem_minmax(0,1fr)_minmax(0,1.1fr)] gap-x-10 gap-y-3 py-10 border-b border-slate-800"
              >
                <span className="font-mono text-sm text-slate-500 group-hover:text-amber-500 transition-colors">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-3xl md:text-5xl font-semibold display text-paper leading-none">
                  {p.title}
                </h3>
                <p className="text-slate-400 leading-relaxed md:text-lg md:pt-1">{p.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ───────────── Ecosystem ───────────── */}
        <section className="py-20 md:py-28 border-t border-slate-800 space-y-14">
          <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6 items-end">
            <div className="space-y-5">
              <SectionLabel index="04">The loft</SectionLabel>
              <h2 className="text-4xl md:text-6xl font-bold display text-paper leading-[0.95]">
                Everything in <span className="stencil text-amber-500">the loft.</span>
              </h2>
            </div>
            <p className="text-slate-400 md:text-lg leading-relaxed max-w-md md:justify-self-end">
              Small tools that do one job each, wired together by the CLI.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 border-l border-t border-slate-800">
            {fleet.map((f, i) => (
              <Link
                key={f.name}
                to={f.to}
                className="group relative p-7 md:p-8 border-r border-b border-slate-800 hover:bg-slate-900/60 transition-colors min-h-[15rem] flex flex-col"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[11px] text-slate-500">{String(i + 1).padStart(2, '0')}</span>
                  <ArrowUpRight className="w-5 h-5 text-slate-600 group-hover:text-amber-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <div className="mt-auto pt-10 space-y-2">
                  <p className="eyebrow text-[10px] text-cyan-300">{f.role}</p>
                  <h3 className="font-mono text-2xl font-semibold tracking-tight text-paper">{f.name}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ───────────── FAQ ───────────── */}
        <section className="py-20 md:py-28 border-t border-slate-800 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] gap-12">
          <div className="space-y-5 lg:sticky lg:top-28 self-start">
            <SectionLabel index="05">Questions</SectionLabel>
            <h2 className="text-4xl md:text-6xl font-bold display text-paper leading-[0.95]">
              Quick answers. <br />
              <span className="stencil text-amber-500">No sales pitch.</span>
            </h2>
            <Link to="/docs/faq" className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-amber-500 transition-colors">
              Full FAQ in the docs <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="border-t border-slate-800">
            {faqs.map((f, i) => (
              <details key={f.q} className="group border-b border-slate-800">
                <summary className="faq-summary flex items-center gap-5 cursor-pointer py-6 select-none">
                  <span className="font-mono text-[11px] text-slate-500 w-6">{String(i + 1).padStart(2, '0')}</span>
                  <span className="flex-1 text-lg md:text-xl font-medium text-paper group-hover:text-amber-500 transition-colors">
                    {f.q}
                  </span>
                  <span className="relative w-4 h-4 shrink-0" aria-hidden>
                    <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-amber-500" />
                    <span className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-amber-500 transition-transform duration-200 group-open:scale-y-0" />
                  </span>
                </summary>
                <p className="pl-11 pr-8 pb-7 text-slate-400 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ───────────── Final call ───────────── */}
        <section className="pb-20 md:pb-28">
          <div className="airmail-frame">
            <div className="relative bg-paper text-ink px-6 py-12 md:px-14 md:py-16 overflow-hidden">
              <Postmark
                top="READY FOR TAKEOFF"
                bottom="NO TELEMETRY"
                center="NIHIL"
                className="absolute -right-10 -top-6 w-[26rem] text-ink/10 rotate-[-8deg] hidden md:block"
              />
              <div className="relative max-w-3xl space-y-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/60">First class</p>
                <h2 className="text-4xl md:text-7xl font-bold display leading-[0.92]">
                  Your next box is <span className="stencil text-amber-600">one command</span> away.
                </h2>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link
                    to="/docs"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-ink text-paper font-semibold text-sm shadow-[4px_4px_0_var(--color-airmail-red)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--color-airmail-red)] transition-all"
                  >
                    Install Nihil <ArrowRight />
                  </Link>
                  <Link
                    to="/community"
                    className="inline-flex items-center gap-2 px-5 py-3 border border-ink/40 font-medium text-sm hover:border-ink hover:bg-ink/5 transition-colors"
                  >
                    Join the flock
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
