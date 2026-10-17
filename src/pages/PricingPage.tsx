import React from 'react';
import { SectionLabel, Stamp } from '../components/Mail';

const tiers = [
  {
    name: 'Free',
    subtitle: 'As in beer',
    price: '0.00',
    description: 'The only tier we offer. No credit card, no sales call.',
    features: ['All Docker images', 'All install scripts', 'All bugs (we fix them)', 'No telemetry, no licence key'],
    rotate: '-rotate-2',
    void: false,
  },
  {
    name: 'Enterprise Pigeon',
    subtitle: 'Contact sales*',
    price: 'N/A',
    description: "*We don't have sales. This is a joke. Everything is free, always.",
    features: ['Same as Free', 'You maintain it yourself', 'We still drink coffee', 'Zero fancy dashboard'],
    rotate: 'rotate-2',
    void: true,
  },
];

const rates = [
  ['Docker images (full, ad, web, blueteam)', '0.00'],
  ['Nihil CLI', '0.00'],
  ['nihil-history, nihil-resources, nihil-mcp, nihil-ntp', '0.00'],
  ['Pull from ghcr.io', '0.00'],
  ['Telemetry', 'none'],
  ['Licence key', 'none'],
  ['Sales call', 'please no'],
];

export const PricingPage: React.FC = () => {
  return (
    <div className="space-y-20 md:space-y-28">
      <header className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6 items-end">
        <div className="space-y-5">
          <SectionLabel index="00">Postal rates</SectionLabel>
          <h1 className="text-5xl md:text-8xl font-bold display text-paper leading-[0.9]">
            Postage <br />
            <span className="stencil text-amber-500">paid.</span>
          </h1>
        </div>
        <p className="text-slate-400 md:text-lg leading-relaxed max-w-md md:justify-self-end">
          TheNullPigeons is open source. This page is a gentle nod to pricing tables everywhere.
        </p>
      </header>

      <section className="grid md:grid-cols-2 gap-10 md:gap-16 max-w-5xl mx-auto px-2">
        {tiers.map((tier) => (
          <div key={tier.name} className={`relative ${tier.rotate} transition-transform duration-300 hover:rotate-0`}>
            <Stamp className="shadow-[14px_16px_0_rgba(0,0,0,0.55)]">
              <div className="w-full p-3 md:p-5 space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/50">{tier.subtitle}</p>
                    <h2 className="text-3xl md:text-4xl font-bold display leading-tight">{tier.name}</h2>
                  </div>
                  <p className="text-5xl md:text-6xl font-bold display leading-none">{tier.price}</p>
                </div>
                <p className="text-[15px] leading-relaxed text-ink/75">{tier.description}</p>
                <ul className="border-t border-ink/20">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 py-2.5 border-b border-ink/20 text-[15px]">
                      <span className="font-mono text-amber-600">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/60">
                  No checkout. Just <span className="text-ink font-semibold normal-case tracking-normal">git clone</span>.
                </p>
              </div>
            </Stamp>
            {tier.void && (
              <span
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[18deg] border-4 border-amber-500 text-amber-500 px-4 py-2 font-mono font-bold text-xl md:text-2xl uppercase tracking-[0.2em] whitespace-nowrap opacity-90 pointer-events-none"
                aria-hidden
              >
                Return to sender
              </span>
            )}
          </div>
        ))}
      </section>

      <section className="max-w-3xl mx-auto space-y-6">
        <SectionLabel index="01">Rate card</SectionLabel>
        <table className="w-full text-left">
          <tbody>
            {rates.map(([item, price]) => (
              <tr key={item} className="border-b border-slate-800">
                <td className="py-4 pr-4 text-slate-300">{item}</td>
                <td className="py-4 font-mono text-right text-paper whitespace-nowrap">{price}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="pt-5 font-semibold text-paper">Total</td>
              <td className="pt-5 text-right text-4xl font-bold display text-amber-500">0.00</td>
            </tr>
          </tfoot>
        </table>
        <p className="text-slate-500 text-sm pt-6">
          Want to support the project? Use it, break it, open a PR. That beats a monthly invoice.
        </p>
      </section>
    </div>
  );
};
