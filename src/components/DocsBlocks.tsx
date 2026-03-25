import React from 'react';

type CalloutVariant = 'note' | 'tip' | 'warning';

const calloutStyles: Record<CalloutVariant, string> = {
  note: 'border-sky-500/30 bg-sky-500/10 text-sky-100',
  tip: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-100',
  warning: 'border-amber-500/30 bg-amber-500/10 text-amber-100',
};

const labelStyles: Record<CalloutVariant, string> = {
  note: 'text-sky-300',
  tip: 'text-emerald-300',
  warning: 'text-amber-300',
};

export const TldrBlock: React.FC<{ items: string[] }> = ({ items }) => (
  <section className="rounded-xl border border-cyan-500/25 bg-cyan-500/10 p-4">
    <p className="text-xs font-semibold uppercase tracking-wider text-cyan-300">TL;DR</p>
    <ul className="mt-2 space-y-1 text-sm text-cyan-100">
      {items.map((item) => (
        <li key={item}>- {item}</li>
      ))}
    </ul>
  </section>
);

export const Callout: React.FC<{
  variant: CalloutVariant;
  title: string;
  children: React.ReactNode;
}> = ({ variant, title, children }) => (
  <section className={`rounded-xl border p-4 ${calloutStyles[variant]}`}>
    <p className={`text-xs font-semibold uppercase tracking-wider ${labelStyles[variant]}`}>{title}</p>
    <div className="mt-2 text-sm leading-relaxed">{children}</div>
  </section>
);

export const StepList: React.FC<{ steps: Array<{ title: string; detail: string }> }> = ({ steps }) => (
  <ol className="space-y-3">
    {steps.map((step, index) => (
      <li key={step.title} className="flex gap-3 rounded-lg border border-slate-800/80 bg-slate-900/40 p-3">
        <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10 text-xs font-semibold text-cyan-300">
          {index + 1}
        </span>
        <div>
          <p className="text-sm font-medium text-white">{step.title}</p>
          <p className="mt-0.5 text-sm text-slate-400">{step.detail}</p>
        </div>
      </li>
    ))}
  </ol>
);
