import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(true);

  const handleMouseEnter = () => {
    videoRef.current?.play();
    setPaused(false);
  };

  const handleMouseLeave = () => {
    videoRef.current?.pause();
    setPaused(true);
  };

  const handleClick = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPaused(false); }
    else { v.pause(); setPaused(true); }
  };

  return (
    <div className="space-y-24">
      {/* Hero - centré, sans faux terminal */}
      <section className="relative text-center max-w-3xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent pointer-events-none rounded-full blur-3xl" aria-hidden />
        <div className="flex justify-center mb-6">
          <img
            src="/assets/thenullpigeonslogo.png"
            alt="TheNullPigeons"
            className="h-20 w-20 md:h-24 md:w-24 object-contain drop-shadow-[0_0_20px_rgba(251,191,36,0.15)]"
          />
        </div>
        <p className="inline-flex items-center rounded-full border border-slate-600 bg-slate-900/80 px-3 py-1.5 text-xs text-slate-400 mb-6">
          <span className="mr-2 h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Transparent by design. Offensive by nature.
        </p>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          <span className="text-amber-400">TheNullPigeons</span>
          <span className="block text-white text-xl md:text-2xl mt-3 font-normal text-slate-200 tracking-normal">
            A custom offensive environment for people who don&apos;t like black boxes.
          </span>
        </h1>
        <p className="text-slate-400 mt-6 max-w-xl mx-auto leading-relaxed">
          Our tool <span className="text-amber-400/90 font-medium">Nihil</span>: hand-crafted Docker images and a CLI for real-world offensive work, from Windows and
          network infra to web. No magic, just good pigeons with better opsec.
        </p>
        <div className="flex flex-wrap gap-3 justify-center mt-8">
          <Link
            to="/docs"
            className="rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition-all duration-200"
          >
            Discover our tool
          </Link>
          <Link
            to="/community"
            className="rounded-lg border border-slate-600 px-5 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-800 hover:border-slate-500 transition-all duration-200"
          >
            Join the flock
          </Link>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-1 justify-center text-xs text-slate-500 mt-6">
          <span>Arch-based images</span>
          <span>Offensive tooling & automation</span>
          <span>Opinionated but hackable</span>
        </div>
      </section>

      {/* Vidéo - See it in action */}
      <section className="space-y-5">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-xl md:text-2xl font-semibold text-white">
            See it in action
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Create a new container with our tool in a few seconds.
          </p>
        </div>
        <div
          className="relative rounded-2xl border border-slate-700/80 bg-slate-900/50 overflow-hidden max-w-4xl mx-auto shadow-xl cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        >
          <video
            ref={videoRef}
            src="/assets/createcontainer.mp4"
            className="w-full aspect-video"
            preload="metadata"
            playsInline
            muted
            loop
          >
            Your browser does not support the video tag.
          </video>
          {paused && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-black/60 border border-slate-600/60">
                <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}
        </div>
        <p className="text-center text-xs text-slate-500">
          Want to play with the CLI?{' '}
          <Link to="/try" className="text-amber-400 hover:underline">
            Open the online demo
          </Link>
          .
        </p>
      </section>

      {/* Why Nihil - 3 piliers */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-xl md:text-2xl font-semibold text-white">
            Why Nihil
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Transparent, focused, and maintained by practitioners.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          <div className="rounded-2xl border border-slate-700/80 bg-slate-900/50 p-6 space-y-3 hover:border-amber-500/30 hover:bg-slate-900/70 transition-all duration-200">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400 text-sm font-bold">1</span>
              <h3 className="font-semibold text-white">Transparent by design</h3>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              All images and scripts live on GitHub. No hidden install scripts, no mystery layers. Just Bash, Python, and a lot of caffeine.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-700/80 bg-slate-900/50 p-6 space-y-3 hover:border-amber-500/30 hover:bg-slate-900/70 transition-all duration-200">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400 text-sm font-bold">2</span>
              <h3 className="font-semibold text-white">Built for offensive work</h3>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              AD enumeration, network recon, web testing: BloodHound, NetExec, Metasploit, and
              more. Tools picked for real engagements, not to pad a readme.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-700/80 bg-slate-900/50 p-6 space-y-3 hover:border-amber-500/30 hover:bg-slate-900/70 transition-all duration-200">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400 text-sm font-bold">3</span>
              <h3 className="font-semibold text-white">By practitioners</h3>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Maintained by{' '}
              <a
                href="https://github.com/0xbbuddha"
                target="_blank"
                rel="noreferrer"
                className="text-amber-400 hover:text-amber-300 underline-offset-2 hover:underline"
              >
                Killian Prin-Abeil
              </a>{' '}
              &amp;{' '}
              <a
                href="https://github.com/Goultarde"
                target="_blank"
                rel="noreferrer"
                className="text-amber-400 hover:text-amber-300 underline-offset-2 hover:underline"
              >
                Harouna Coulibaly
              </a>
              , who actually break stuff for a living.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-xl md:text-2xl font-semibold text-white">
            FAQ
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Quick answers. No sales pitch.
          </p>
        </div>
        <div className="max-w-3xl mx-auto space-y-2">
          <details className="group rounded-xl border border-slate-700/80 bg-slate-900/50 overflow-hidden hover:border-amber-500/20 transition-colors">
            <summary className="faq-summary flex items-center justify-between gap-3 cursor-pointer p-5 font-medium text-white select-none">
              What is Nihil?
              <span className="flex-shrink-0 w-5 h-5 text-amber-400 transition-transform duration-200 group-open:rotate-180" aria-hidden>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </span>
            </summary>
            <p className="text-sm text-slate-400 leading-relaxed px-5 pb-5 pt-0">
              Nihil is an offensive security environment built by TheNullPigeons. It ships as Arch-based Docker images paired with a Python CLI that handles everything: pulling images, creating containers, managing workspaces and VPN sessions. No hidden config, no telemetry, no black box.
            </p>
          </details>
          <details className="group rounded-xl border border-slate-700/80 bg-slate-900/50 overflow-hidden hover:border-amber-500/20 transition-colors">
            <summary className="faq-summary flex items-center justify-between gap-3 cursor-pointer p-5 font-medium text-white select-none">
              Is it Docker only?
              <span className="flex-shrink-0 w-5 h-5 text-amber-400 transition-transform duration-200 group-open:rotate-180" aria-hidden>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </span>
            </summary>
            <p className="text-sm text-slate-400 leading-relaxed px-5 pb-5 pt-0">
              Yes. Nihil ships as Docker images and a CLI that manages them. We recommend Linux for host network mode and fewer surprises; macOS and Windows (e.g. WSL2) are on the roadmap.
            </p>
          </details>
          <details className="group rounded-xl border border-slate-700/80 bg-slate-900/50 overflow-hidden hover:border-amber-500/20 transition-colors">
            <summary className="faq-summary flex items-center justify-between gap-3 cursor-pointer p-5 font-medium text-white select-none">
              Why Arch as the base?
              <span className="flex-shrink-0 w-5 h-5 text-amber-400 transition-transform duration-200 group-open:rotate-180" aria-hidden>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </span>
            </summary>
            <p className="text-sm text-slate-400 leading-relaxed px-5 pb-5 pt-0">
              Rolling updates, minimal footprint, and we like having full control over what goes in. We're both long-time Arch users, and it keeps the base lean and up-to-date without waiting for distro packaging cycles. Everything is in the Dockerfiles, fork and tweak as you like.
            </p>
          </details>
          <details className="group rounded-xl border border-slate-700/80 bg-slate-900/50 overflow-hidden hover:border-amber-500/20 transition-colors">
            <summary className="faq-summary flex items-center justify-between gap-3 cursor-pointer p-5 font-medium text-white select-none">
              Where are the images hosted?
              <span className="flex-shrink-0 w-5 h-5 text-amber-400 transition-transform duration-200 group-open:rotate-180" aria-hidden>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </span>
            </summary>
            <p className="text-sm text-slate-400 leading-relaxed px-5 pb-5 pt-0">
              On GitHub Container Registry (ghcr.io). You can also build them yourself from the repo, no account required, no pull limit for public images.
            </p>
          </details>
          <details className="group rounded-xl border border-slate-700/80 bg-slate-900/50 overflow-hidden hover:border-amber-500/20 transition-colors">
            <summary className="faq-summary flex items-center justify-between gap-3 cursor-pointer p-5 font-medium text-white select-none">
              Any telemetry or license key?
              <span className="flex-shrink-0 w-5 h-5 text-amber-400 transition-transform duration-200 group-open:rotate-180" aria-hidden>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </span>
            </summary>
            <p className="text-sm text-slate-400 leading-relaxed px-5 pb-5 pt-0">
              No. No phone home, no dashboard, no subscription. Use it, break it, open a PR.
            </p>
          </details>
          <details className="group rounded-xl border border-slate-700/80 bg-slate-900/50 overflow-hidden hover:border-amber-500/20 transition-colors">
            <summary className="faq-summary flex items-center justify-between gap-3 cursor-pointer p-5 font-medium text-white select-none">
              How does it compare to other pentest environments?
              <span className="flex-shrink-0 w-5 h-5 text-amber-400 transition-transform duration-200 group-open:rotate-180" aria-hidden>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </span>
            </summary>
            <p className="text-sm text-slate-400 leading-relaxed px-5 pb-5 pt-0">
              Nihil is our own take on a ready-to-use offensive environment: Arch-based, fully open, no SaaS, no paywall. Just images and a CLI wrapper you control entirely.
            </p>
          </details>
        </div>
      </section>
    </div>
  );
};
