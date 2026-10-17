import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GITHUB_USERNAMES } from '../config/teamAvatars';
import { ArrowUpRight, DiscordIcon, GithubIcon, LinkedinIcon, Postmark, SectionLabel, Stamp } from '../components/Mail';

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

const audiences = [
  {
    title: 'Pentesters & Red Teamers',
    desc: 'A ready-to-deploy offensive environment for real engagements: AD attacks, network recon, web testing. Reproducible, auditable, and yours to customize.',
  },
  {
    title: 'CTF Players',
    desc: "Spin up a fully loaded container in seconds and get straight to the challenge. No setup overhead, no missing tools, just nihil start ctf and you're in.",
  },
  {
    title: 'Investigators',
    desc: 'Hunt threats, triage malware, and investigate incidents with a purpose-built image. Chainsaw, hayabusa, capa, sleuthkit: just nihil start blueteam.',
  },
  {
    title: 'Security Students',
    desc: 'Learn offensive techniques in a clean, transparent environment. Every tool, every script is visible on GitHub. No black box to get lost in.',
  },
  {
    title: 'Security Researchers',
    desc: 'Isolate your work in dedicated containers per project. Arch-based images with full control over what goes in. Fork, tweak, and rebuild as you need.',
  },
];

const philosophy = [
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
];

// What the MIT licence allows, shown as a customs declaration.
const declaration = [
  { label: 'Personal use, labs and CTFs', allowed: true },
  { label: 'Professional engagements', allowed: true },
  { label: 'Commercial use, inside your company or for clients', allowed: true },
  { label: 'Modify, fork and redistribute', allowed: true },
  { label: 'Licence fee, seat count or key', allowed: false },
  { label: 'Telemetry or account', allowed: false },
];

// Keep in sync with the licence file of each repository.
const parcels = [
  { name: 'nihil', licence: 'MIT' },
  { name: 'nihil-images', licence: 'MIT' },
  { name: 'nihil-history', licence: null },
  { name: 'nihil-resources', licence: null },
  { name: 'nihil-mcp', licence: null },
  { name: 'nihil-ntp', licence: null },
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
    <div className="space-y-24 md:space-y-32">
      <header className="space-y-10">
        <div className="space-y-5 max-w-4xl">
          <SectionLabel index="00">Community</SectionLabel>
          <h1 className="text-5xl md:text-8xl font-bold display text-paper leading-[0.9]">
            A small flock. <br />
            <span className="stencil text-amber-500">Open loft.</span>
          </h1>
          <p className="text-slate-400 md:text-lg leading-relaxed max-w-xl">
            A small team of practitioners. No SaaS, no paywall, just open code and feedback from the field.
          </p>
        </div>

        <div className="grid md:grid-cols-2 border-t border-l border-slate-800">
          {[
            { href: '/source-code', internal: true, Icon: GithubIcon, title: 'GitHub', sub: 'Repos, issues & pull requests' },
            { href: 'https://discord.gg/YzjaNpRRPX', internal: false, Icon: DiscordIcon, title: 'Discord', sub: 'Chat, support & war stories' },
          ].map(({ href, internal, Icon, title, sub }) => {
            const inner = (
              <>
                <div className="flex items-start justify-between">
                  <Icon className="w-7 h-7" />
                  <ArrowUpRight className="w-6 h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
                <div className="mt-16">
                  <p className="text-4xl md:text-6xl font-bold display">{title}</p>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] opacity-60">{sub}</p>
                </div>
              </>
            );
            const cls =
              'group block p-7 md:p-10 border-r border-b border-slate-800 text-paper hover:bg-paper hover:text-ink transition-colors duration-300';
            return internal ? (
              <Link key={title} to={href} className={cls}>{inner}</Link>
            ) : (
              <a key={title} href={href} target="_blank" rel="noreferrer" className={cls}>{inner}</a>
            );
          })}
        </div>
      </header>

      <section className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] gap-12">
        <div className="space-y-5 lg:sticky lg:top-28 self-start">
          <SectionLabel index="01">Recipients</SectionLabel>
          <h2 className="text-4xl md:text-6xl font-bold display text-paper leading-[0.95]">
            Who is <span className="stencil text-amber-500">Nihil</span> for?
          </h2>
          <p className="text-slate-400 leading-relaxed max-w-sm">
            Built for people who work in security, at any level.
          </p>
        </div>
        <ol className="border-t border-slate-800">
          {audiences.map((a, i) => (
            <li key={a.title} className="group grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 py-7 border-b border-slate-800">
              <span className="font-mono text-xs text-slate-500 pt-2 group-hover:text-amber-500 transition-colors">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="space-y-2">
                <h3 className="text-2xl md:text-3xl font-semibold display text-paper">{a.title}</h3>
                <p className="text-slate-400 leading-relaxed max-w-2xl">{a.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="space-y-12">
        <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6 items-end">
          <div className="space-y-5">
            <SectionLabel index="02">The Null Hackers</SectionLabel>
            <h2 className="text-4xl md:text-6xl font-bold display text-paper leading-[0.95]">
              Two hackers, <br />
              <span className="stencil text-amber-500">one loft.</span>
            </h2>
          </div>
          <p className="text-slate-400 md:text-lg leading-relaxed max-w-md md:justify-self-end">
            We built the tools we actually needed on engagements, then kept going.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {team.map((member, i) => {
            const avatarUrl = avatarUrls[member.id];
            return (
              <article key={member.github} className="airmail-frame">
                <div className="relative bg-paper text-ink p-6 md:p-8 overflow-hidden">
                  <Postmark
                    top="THENULLPIGEONS"
                    bottom={`AGENT ${String(i + 1).padStart(3, '0')}`}
                    center={member.initial}
                    className="absolute -right-16 -bottom-6 w-80 text-ink/[0.08] -rotate-12"
                  />
                  <div className="relative flex flex-col sm:flex-row gap-6 items-start">
                    <Stamp tone="ink" className="w-28 h-32 md:w-32 md:h-36 shrink-0 -rotate-3">
                      {avatarUrl ? (
                        <img src={avatarUrl} alt={member.name} className="w-full h-full object-cover grayscale contrast-125" />
                      ) : (
                        <span className="text-4xl font-bold text-amber-500">{member.initial}</span>
                      )}
                    </Stamp>
                    <div className="min-w-0 space-y-3 pt-1">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/50">
                        Agent {String(i + 1).padStart(3, '0')} · {member.role}
                      </p>
                      <h3 className="text-2xl md:text-3xl font-bold display leading-tight">{member.name}</h3>
                      <p className="font-mono text-sm text-amber-600">@{member.handle}</p>
                      <div className="flex gap-2 pt-2">
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 h-9 px-3 border border-ink/30 font-mono text-[11px] uppercase tracking-[0.12em] hover:bg-ink hover:text-paper transition-colors"
                          aria-label={`${member.name} on GitHub`}
                        >
                          <GithubIcon className="w-3.5 h-3.5" /> GitHub
                        </a>
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 h-9 px-3 border border-ink/30 font-mono text-[11px] uppercase tracking-[0.12em] hover:bg-ink hover:text-paper transition-colors"
                          aria-label={`${member.name} on LinkedIn`}
                        >
                          <LinkedinIcon className="w-3.5 h-3.5" /> LinkedIn
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="space-y-12">
        <SectionLabel index="03">Our philosophy</SectionLabel>
        <div className="grid md:grid-cols-3 border-t border-slate-800">
          {philosophy.map(({ title, desc }, i) => (
            <div
              key={title}
              className={'py-8 md:py-10 space-y-4 ' + (i > 0 ? 'md:pl-8 md:border-l border-slate-800 border-t md:border-t-0' : '') + (i < 2 ? ' md:pr-8' : '')}
            >
              <h3 className="stencil text-4xl text-amber-500">{title}</h3>
              <p className="text-slate-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] gap-12 items-start">
        <div className="space-y-6">
          <SectionLabel index="04">Customs declaration</SectionLabel>
          <h2 className="display text-4xl md:text-6xl text-paper leading-[0.95]">
            Open source. <br />
            <span className="stencil text-amber-500">Nothing hidden.</span>
          </h2>
          <p className="text-slate-400 leading-relaxed max-w-md">
            The Nihil CLI and the images are released under the MIT licence. Use them for your own lab, on paid
            engagements or inside your company. The only condition is to keep the copyright notice.
          </p>
          <p className="text-slate-400 leading-relaxed max-w-md">
            Everything is built in public on GitHub: issues, pull requests and the image build pipeline.
            Contributions are welcome, never required.
          </p>
          <Link to="/docs/contributing" className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-amber-500 transition-colors">
            How to contribute <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="airmail-frame">
          <div className="bg-paper text-ink">
            <div className="flex items-baseline justify-between gap-4 px-5 md:px-7 pt-5 pb-4 border-b-2 border-ink">
              <p className="display text-2xl md:text-3xl leading-none">Customs declaration</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/55 whitespace-nowrap">Form TNP-01</p>
            </div>

            <div className="px-5 md:px-7 py-4 border-b border-ink/25">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/55 mb-3">Permitted uses</p>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                {declaration.map((d) => (
                  <li key={d.label} className="flex items-start gap-3 text-[14px] leading-snug">
                    <span
                      className={
                        'mt-[1px] w-4 h-4 shrink-0 border-[1.5px] border-ink flex items-center justify-center font-mono text-[11px] leading-none font-bold ' +
                        (d.allowed ? 'text-amber-600' : 'text-ink/30')
                      }
                      aria-hidden
                    >
                      {d.allowed ? '✓' : ''}
                    </span>
                    <span className={d.allowed ? '' : 'text-ink/50 line-through decoration-ink/40'}>
                      {d.label}
                      <span className="sr-only">{d.allowed ? ' (allowed)' : ' (none)'}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <table className="w-full text-left">
              <thead>
                <tr className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/55">
                  <th className="font-normal px-5 md:px-7 pt-4 pb-2">Contents</th>
                  <th className="font-normal px-5 md:px-7 pt-4 pb-2 text-right">Licence</th>
                </tr>
              </thead>
              <tbody>
                {parcels.map((r) => (
                  <tr key={r.name} className="border-t border-ink/15">
                    <td className="px-5 md:px-7 py-2.5">
                      <a
                        href={`https://github.com/TheNullPigeons/${r.name}`}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono text-[13.5px] hover:text-amber-600 transition-colors"
                      >
                        {r.name}
                      </a>
                    </td>
                    <td className="px-5 md:px-7 py-2.5 text-right">
                      {r.licence ? (
                        <span className="font-mono text-[11px] font-semibold px-1.5 py-0.5 border border-ink">{r.licence}</span>
                      ) : (
                        <span className="font-mono text-[11px] text-ink/50">licence pending</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex items-center justify-between gap-4 px-5 md:px-7 py-4 mt-1 border-t-2 border-ink">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/55">Value declared</p>
              <p className="display text-3xl leading-none">0.00</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border border-dashed border-slate-700 p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber-500 shrink-0">P.S.</p>
        <p className="text-slate-300 leading-relaxed">
          Found a bug or have an idea? Open an issue or a PR. If TheNullPigeons helped on an engagement,
          we&apos;d love to hear it, especially if something broke in a fun way.
        </p>
      </section>
    </div>
  );
};
