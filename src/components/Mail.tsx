import React from 'react';

/** Small airmail building blocks shared by the marketing pages. */

export const AirmailBar: React.FC<{ className?: string }> = ({ className = 'h-1.5' }) => (
  <div className={`airmail w-full ${className}`} aria-hidden />
);

export const SectionLabel: React.FC<{ index: string; children: React.ReactNode; className?: string }> = ({
  index,
  children,
  className = '',
}) => (
  <div className={`flex items-baseline gap-2.5 eyebrow ${className}`}>
    <span className="text-amber-500">N°{index}</span>
    <span>{children}</span>
  </div>
);

/** A postage stamp with perforated edges. */
export const Stamp: React.FC<{
  children: React.ReactNode;
  denomination?: string;
  caption?: string;
  tone?: 'paper' | 'ink';
  className?: string;
}> = ({ children, denomination, caption, tone = 'paper', className = '' }) => (
  <div className={`stamp ${tone === 'paper' ? 'bg-paper text-ink' : 'bg-ink text-paper'} ${className}`}>
    <div className={`relative border h-full flex flex-col ${tone === 'paper' ? 'border-ink/80' : 'border-paper/50'}`}>
      <div className="flex-1 flex items-center justify-center p-3">{children}</div>
      {(denomination || caption) && (
        <div className="flex items-end justify-between px-2 pb-1.5 font-mono text-[9px] uppercase tracking-[0.18em]">
          <span>{caption}</span>
          <span className="display text-lg leading-none">{denomination}</span>
        </div>
      )}
    </div>
  </div>
);

/** Circular cancellation mark with wavy lines. */
export const Postmark: React.FC<{ top?: string; bottom?: string; center?: string; className?: string }> = ({
  top = 'THENULLPIGEONS',
  bottom = 'OFFENSIVE TOOLING',
  center = 'NIHIL',
  className = '',
}) => {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 260 120" className={className} aria-hidden>
      <defs>
        <path id={`pm-top-${id}`} d="M 18 60 A 42 42 0 0 1 102 60" />
        <path id={`pm-bot-${id}`} d="M 9 60 A 51 51 0 0 0 111 60" />
      </defs>
      <g fill="none" stroke="currentColor">
        <circle cx="60" cy="60" r="54" strokeWidth="2.5" />
        <circle cx="60" cy="60" r="34" strokeWidth="1.2" />
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            d={`M 122 ${28 + i * 16} q 17 -9 34 0 t 34 0 t 34 0 t 34 0`}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        ))}
      </g>
      <g fill="currentColor" fontFamily="Big Shoulders, Arial Narrow, sans-serif" fontWeight="800">
        <text fontSize="12.5" letterSpacing="2.2">
          <textPath href={`#pm-top-${id}`} startOffset="50%" textAnchor="middle">
            {top}
          </textPath>
        </text>
        <text fontSize="12.5" letterSpacing="3.5">
          <textPath href={`#pm-bot-${id}`} startOffset="50%" textAnchor="middle">
            {bottom}
          </textPath>
        </text>
        <text x="60" y="60" fontSize="19" textAnchor="middle" fontFamily="Big Shoulders Stencil, Big Shoulders, sans-serif" fontWeight="900">
          {center}
        </text>
        <text x="60" y="73" fontSize="8.5" textAnchor="middle" letterSpacing="1.8">
          OPSEC · OK
        </text>
      </g>
    </svg>
  );
};

export const ArrowUpRight: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path strokeLinecap="square" d="M7 17L17 7M9 7h8v8" />
  </svg>
);

export const ArrowRight: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path strokeLinecap="square" d="M4 12h15M13 6l6 6-6 6" />
  </svg>
);

export const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path d="M12 0C5.372 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.578 0-.285-.011-1.04-.016-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.93 0-1.31.468-2.382 1.236-3.22-.124-.303-.536-1.524.116-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.984-.399 3.004-.404 1.02.005 2.047.138 3.005.404 2.292-1.552 3.298-1.23 3.298-1.23.653 1.652.24 2.873.118 3.176.77.838 1.235 1.91 1.235 3.22 0 4.61-2.807 5.624-5.48 5.92.43.372.814 1.103.814 2.222 0 1.604-.015 2.896-.015 3.29 0 .319.192.694.8.576C20.565 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

export const DiscordIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path fillRule="evenodd" clipRule="evenodd" d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.331c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.419 0 1.333-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.419 0 1.333-.946 2.419-2.157 2.419z" />
  </svg>
);

export const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M4.983 3.5C4.983 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.983 2.12 4.983 3.5zM.25 8.25h4.5v15.5H.25V8.25zM8.75 8.25h4.31v2.12h.06c.6-1.14 2.07-2.34 4.27-2.34 4.56 0 5.4 3 5.4 6.9v8.82h-4.5v-7.82c0-1.87-.03-4.27-2.6-4.27-2.6 0-3 2.03-3 4.13v7.96h-4.5V8.25z" />
  </svg>
);
