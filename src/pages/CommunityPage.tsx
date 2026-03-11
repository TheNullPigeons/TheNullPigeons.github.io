import React, { useEffect, useState } from 'react';
import { GITHUB_USERNAMES } from '../config/teamAvatars';

const team = [
  {
    id: '0xbbuddha',
    name: 'Killian Prin-Abeil',
    handle: '0xbbuddha',
    role: 'Developer',
    github: 'https://github.com/0xbbuddha',
    linkedin: 'https://www.linkedin.com/in/killianprinabeil/',
    initial: 'B',
  },
  {
    id: 'Goultarde',
    name: 'Harouna Coulibaly',
    handle: 'Goultarde',
    role: 'Developer',
    github: 'https://github.com/Goultarde',
    linkedin: 'https://www.linkedin.com/in/harouna-m-coulibaly-229a2722a/',
    initial: 'G',
  },
];

async function fetchGitHubAvatar(username: string): Promise<string | null> {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`, {
      headers: { Accept: 'application/vnd.github.v3+json' },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.avatar_url ?? null;
  } catch {
    return null;
  }
}

const communityLinks = [
  {
    title: 'GitHub',
    description: 'Repos, issues, PRs. Tout le code est ici.',
    href: 'https://github.com/TheNullPigeons',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    title: 'Nihil',
    description: "Docker images & install scripts for your offensive lab (infra, Windows, web).",
    href: 'https://github.com/TheNullPigeons/nihil',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    ),
  },
];

export const CommunityPage: React.FC = () => {
  const [avatarUrls, setAvatarUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    const load = async () => {
      const next: Record<string, string> = {};
      for (const member of team) {
        const username = GITHUB_USERNAMES[member.id];
        if (username) {
          const url = await fetchGitHubAvatar(username);
          if (url) next[member.id] = url;
        }
      }
      setAvatarUrls((prev) => ({ ...prev, ...next }));
    };
    load();
  }, []);

  return (
    <div className="space-y-20">
      <section className="text-center space-y-5 pt-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          <span className="text-amber-400">Community</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
          A small team of practitioners. No SaaS, no paywall, just open code and feedback from the field.
        </p>
      </section>

      {/* Who is Nihil for */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">Who is Nihil for?</h2>
          <p className="text-slate-400 text-sm mt-2">
            Built for people who work in offensive security, at any level.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 max-w-4xl mx-auto">
          {[
            {
              title: 'Pentesters & Red Teamers',
              desc: 'Use Nihil as a ready-to-deploy offensive environment for real engagements: AD attacks, network recon, web testing. Reproducible, auditable, and yours to customize.',
            },
            {
              title: 'CTF Players',
              desc: "Spin up a fully loaded container in seconds and get straight to the challenge. No setup overhead, no missing tools, just nihil start ctf and you're in.",
            },
            {
              title: 'Security Students',
              desc: 'Learn offensive techniques in a clean, transparent environment. Every tool, every script is visible on GitHub. No magic, no black box to get lost in.',
            },
            {
              title: 'Security Researchers',
              desc: 'Isolate your work in dedicated containers per project. Arch-based images with full control over what goes in. Fork, tweak, and rebuild as you need.',
            },
          ].map(({ title, desc }) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-700/80 bg-slate-900/50 p-6 space-y-2 hover:border-amber-500/30 hover:bg-slate-900/70 transition-all duration-200"
            >
              <h3 className="font-semibold text-white">{title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-white text-center">
          The Null Hackers
        </h2>
        <p className="text-slate-400 text-sm text-center max-w-xl mx-auto">
          Two hackers who built the tools they actually needed.
        </p>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {team.map((member) => {
            const avatarUrl = avatarUrls[member.id];
            return (
              <a
                key={member.github}
                href={member.github}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 rounded-2xl border border-slate-700/80 bg-slate-900/50 hover:bg-slate-800/60 hover:border-amber-500/30 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-24 h-24 rounded-full border-2 border-slate-700 group-hover:border-amber-500/50 overflow-hidden bg-slate-800 flex items-center justify-center transition-colors">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl font-bold text-amber-400/90">
                      {member.initial}
                    </span>
                  )}
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl font-semibold text-white group-hover:text-amber-300 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-amber-400/90 text-sm mt-0.5">
                    @{member.handle} · {member.role}
                  </p>
                  <div className="mt-3 flex justify-center sm:justify-start gap-3">
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-slate-700 bg-slate-900 text-slate-300 hover:border-amber-400 hover:text-amber-300 transition-colors"
                      aria-label={`${member.name} on GitHub`}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path d="M12 0C5.372 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.578 0-.285-.011-1.04-.016-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.93 0-1.31.468-2.382 1.236-3.22-.124-.303-.536-1.524.116-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.984-.399 3.004-.404 1.02.005 2.047.138 3.005.404 2.292-1.552 3.298-1.23 3.298-1.23.653 1.652.24 2.873.118 3.176.77.838 1.235 1.91 1.235 3.22 0 4.61-2.807 5.624-5.48 5.92.43.372.814 1.103.814 2.222 0 1.604-.015 2.896-.015 3.29 0 .319.192.694.8.576C20.565 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-slate-700 bg-slate-900 text-slate-300 hover:border-amber-400 hover:text-amber-300 transition-colors"
                      aria-label={`${member.name} on LinkedIn`}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M4.983 3.5C4.983 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.983 2.12 4.983 3.5zM.25 8.25h4.5v15.5H.25V8.25zM8.75 8.25h4.31v2.12h.06c.6-1.14 2.07-2.34 4.27-2.34 4.56 0 5.4 3 5.4 6.9v8.82h-4.5v-7.82c0-1.87-.03-4.27-2.6-4.27-2.6 0-3 2.03-3 4.13v7.96h-4.5V8.25z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* Philosophy */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">Our Philosophy</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3 max-w-4xl mx-auto">
          {[
            {
              title: 'Transparency first',
              desc: 'Everything lives on GitHub: Dockerfiles, scripts, CLI. No hidden layers, no mystery install. You can read, audit, and fork every line.',
            },
            {
              title: 'No bloat',
              desc: 'Lightweight Arch-based images. No tool gets in unless it earns its place. You know exactly what runs in your container.',
            },
            {
              title: 'No lock-in',
              desc: 'No telemetry, no account, no subscription, no dashboard. Pull the image, use it, break it, move on.',
            },
          ].map(({ title, desc }) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-700/80 bg-slate-900/50 p-6 space-y-2 hover:border-amber-500/30 hover:bg-slate-900/70 transition-all duration-200"
            >
              <h3 className="font-semibold text-amber-400">{title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-white text-center">
          Join & contribute
        </h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {communityLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-5 p-6 rounded-2xl border border-slate-700/80 bg-slate-900/50 hover:bg-slate-800/60 hover:border-amber-500/30 transition-all duration-200 group"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-amber-400 transition-colors">
                {link.icon}
              </div>
              <div>
                <h3 className="font-semibold text-white">{link.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/60 p-6 text-sm text-slate-400 space-y-2 max-w-3xl mx-auto">
        <p>
          Found a bug or have an idea? Open an issue or a PR. If TheNullPigeons helped on an engagement,
          we&apos;d love to hear it, especially if something broke in a fun way.
        </p>
      </section>
    </div>
  );
};
