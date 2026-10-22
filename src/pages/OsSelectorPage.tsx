import React from 'react';
import { Link } from 'react-router-dom';
import { LinuxLogo, AppleLogo, WindowsLogo } from '../components/OsLogos';
import { ArrowRight, SectionLabel, Stamp } from '../components/Mail';

const options = [
  {
    id: 'linux',
    label: 'Linux',
    to: '/docs/installation/linux',
    Logo: LinuxLogo,
    note: 'Fully supported. Recommended for host networking and USB / wireless device access.',
    status: 'Priority mail',
    available: true,
  },
  {
    id: 'macos',
    label: 'macOS',
    to: '/docs/installation/macos',
    Logo: AppleLogo,
    note: 'Supported. Apple Silicon runs the amd64 images under emulation.',
    status: 'Standard mail',
    available: true,
  },
  {
    id: 'windows',
    label: 'Windows',
    to: '/docs/installation/windows',
    Logo: WindowsLogo,
    note: 'Supported through WSL2, with Docker Engine in the distribution or Docker Desktop.',
    status: 'Via WSL2',
    available: true,
  },
];

export const OsSelectorPage: React.FC = () => {
  return (
    <div className="space-y-14 py-6">
      <header className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6 items-end">
        <div className="space-y-5">
          <SectionLabel index="00">Documentation</SectionLabel>
          <h1 className="text-5xl md:text-7xl font-bold display text-paper leading-[0.92]">
            Where should we <span className="stencil logo-blue-text">deliver?</span>
          </h1>
        </div>
        <p className="text-slate-400 md:text-lg leading-relaxed max-w-md md:justify-self-end">
          Pick your operating system. Each guide gets you from zero to a running Nihil container.
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        {options.map(({ id, label, to, Logo, note, status, available }) => {
          const body = (
            <>
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/50">Deliver to</p>
                  <p className="text-4xl font-bold display">{label}</p>
                </div>
                <Stamp tone="ink" className="w-20 h-24 shrink-0 rotate-[4deg]">
                  <Logo className="w-9 h-9" />
                </Stamp>
              </div>
              <div className="mt-8 space-y-2.5">
                <div className="h-px bg-ink/20" />
                <p className="text-sm leading-relaxed text-ink/75 min-h-[3rem]">{note}</p>
                <div className="h-px bg-ink/20" />
              </div>
              <div className="mt-6 flex items-center justify-between">
                <span
                  className={
                    'font-mono text-[10.5px] uppercase tracking-[0.16em] px-2 py-1 border ' +
                    (available ? 'border-amber-600 text-amber-600' : 'border-ink/40 text-ink/50 -rotate-2')
                  }
                >
                  {status}
                </span>
                {available && <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />}
              </div>
            </>
          );

          return available ? (
            <Link
              key={id}
              to={to}
              className="group airmail-frame block transition-transform duration-200 hover:-translate-y-1.5"
            >
              <div className="bg-paper text-ink p-6 md:p-7 h-full">{body}</div>
            </Link>
          ) : (
            <div key={id} className="airmail-frame opacity-50 grayscale" aria-disabled>
              <div className="bg-paper text-ink p-6 md:p-7 h-full">{body}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
