import React from 'react';

type CalloutVariant = 'note' | 'tip' | 'warning';

const calloutStyles: Record<CalloutVariant, string> = {
  note: 'border-cyan-500 bg-cyan-500/[0.06] text-slate-200',
  tip: 'border-emerald-400 bg-emerald-400/[0.06] text-slate-200',
  warning: 'border-amber-500 bg-amber-500/[0.07] text-slate-200',
};

const labelStyles: Record<CalloutVariant, string> = {
  note: 'text-cyan-300',
  tip: 'text-emerald-300',
  warning: 'text-amber-400',
};

export const TldrBlock: React.FC<{ items: string[] }> = ({ items }) => (
  <section className="relative border border-slate-800 bg-slate-950 p-5 pl-6">
    <span className="airmail absolute left-0 top-0 bottom-0 w-1" aria-hidden />
    <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-paper">TL;DR</p>
    <ul className="mt-3 space-y-1.5 text-sm text-slate-300">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="text-amber-500 font-mono select-none">→</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </section>
);

export const Callout: React.FC<{
  variant: CalloutVariant;
  title: string;
  children: React.ReactNode;
}> = ({ variant, title, children }) => (
  <section className={`border-l-2 px-5 py-4 ${calloutStyles[variant]}`}>
    <p className={`font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] ${labelStyles[variant]}`}>{title}</p>
    <div className="mt-2 text-sm leading-relaxed">{children}</div>
  </section>
);

export const StepList: React.FC<{ steps: Array<{ title: string; detail: string }> }> = ({ steps }) => (
  <ol className="border-t border-slate-800">
    {steps.map((step, index) => (
      <li key={step.title} className="flex gap-4 border-b border-slate-800 py-3.5">
        <span className="font-mono text-xs text-amber-500 pt-0.5 w-6 shrink-0">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div>
          <p className="text-sm font-medium text-paper">{step.title}</p>
          <p className="mt-0.5 text-sm text-slate-400">{step.detail}</p>
        </div>
      </li>
    ))}
  </ol>
);
