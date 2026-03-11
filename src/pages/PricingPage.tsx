import React from 'react';

const tiers = [
  {
    name: 'Free',
    subtitle: 'As in beer',
    price: '0',
    period: '/ month',
    description: 'The only tier we offer. No credit card, no sales call.',
    features: [
      'All Docker images',
      'All install scripts',
      'All bugs (we fix them)',
      'No telemetry, no license key',
    ],
    accent: 'from-amber-500/30 to-amber-600/10',
    borderAccent: 'border-amber-500/40',
  },
  {
    name: 'Enterprise Pigeon',
    subtitle: 'Contact sales*',
    price: 'N/A',
    period: '',
    description: "*We don’t have sales. This is a joke. Everything is free, always.",
    features: [
      'Same as Free',
      'You maintain it yourself',
      'We still drink coffee',
      'Zero fancy dashboard',
    ],
    accent: 'from-amber-500/20 to-slate-900',
    borderAccent: 'border-amber-500/30',
  },
];

export const PricingPage: React.FC = () => {
  return (
    <div className="space-y-12">
      <header className="text-center space-y-3">
        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
          <span className="text-amber-400">Pricing</span>
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto text-sm">
          TheNullPigeons is open-source. This page is a gentle nod to pricing tables everywhere.
        </p>
      </header>

      <section className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`relative rounded-2xl border ${tier.borderAccent} bg-slate-900/80 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/5`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${tier.accent} opacity-50 pointer-events-none`} />
            <div className="relative p-6 space-y-5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="font-display text-xl font-semibold text-white">
                    {tier.name}
                  </h2>
                  <p className="text-slate-400 text-xs">{tier.subtitle}</p>
                </div>
                <div className="text-right">
                  <span className="font-display text-2xl font-bold text-white">{tier.price}</span>
                  <span className="text-slate-500 text-sm">{tier.period}</span>
                </div>
              </div>
              <p className="text-slate-400 text-sm">{tier.description}</p>
              <ul className="space-y-2">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                    <span className="text-amber-400">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="pt-2">
                <span className="inline-flex items-center rounded-lg border border-slate-600 bg-slate-800/50 px-3 py-2 text-xs text-slate-400 cursor-default">
                  No checkout. Just <code className="ml-1 text-amber-400">git clone</code>.
                </span>
              </div>
            </div>
          </div>
        ))}
      </section>

      <p className="text-center text-slate-500 text-xs max-w-md mx-auto">
        Want to support the project? Use it, break it, open a PR. That beats a monthly invoice.
      </p>
    </div>
  );
};
