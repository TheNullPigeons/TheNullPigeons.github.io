import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LinuxLogo, AppleLogo, WindowsLogo } from '../components/OsLogos';

const options = [
  {
    id: 'linux',
    label: 'Linux',
    to: '/docs/installation/linux',
    Logo: LinuxLogo,
    note: 'Fully supported. Recommended for best compatibility.',
    available: true,
  },
  {
    id: 'macos',
    label: 'macOS',
    to: '/docs/installation/macos',
    Logo: AppleLogo,
    note: 'Coming soon. Docker Desktop has limitations (host network, devices).',
    available: false,
  },
  {
    id: 'windows',
    label: 'Windows',
    to: '/docs/installation/windows',
    Logo: WindowsLogo,
    note: 'Coming soon. Use WSL2 and follow the Linux guide in the meantime.',
    available: false,
  },
];

export const OsSelectorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-10 py-16">
      <header className="text-center space-y-3 max-w-xl">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Documentation</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          <span className="text-amber-400">Choose your platform</span>
        </h1>
        <p className="text-slate-400 text-sm">
          Select your operating system to get started with Nihil.
        </p>
      </header>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl">
        {options.map(({ id, label, to, Logo, note, available }) => (
          <button
            key={id}
            type="button"
            disabled={!available}
            onClick={() => available && navigate(to)}
            className={
              'flex-1 flex flex-col items-center gap-4 rounded-2xl border p-8 transition-all duration-200 ' +
              (available
                ? 'border-slate-700 bg-slate-900/60 hover:border-amber-500/50 hover:bg-slate-800/80 cursor-pointer group'
                : 'border-slate-800 bg-slate-900/30 opacity-50 cursor-not-allowed')
            }
          >
            <Logo className={`w-12 h-12 ${available ? 'text-slate-300 group-hover:text-white' : 'text-slate-600'} transition-colors`} />
            <span className={`text-lg font-semibold ${available ? 'text-white' : 'text-slate-500'}`}>
              {label}
            </span>
            <span className="text-xs text-slate-500 text-center leading-relaxed">{note}</span>
            {!available && (
              <span className="text-[10px] uppercase tracking-widest text-slate-600 font-medium">
                Coming soon
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
