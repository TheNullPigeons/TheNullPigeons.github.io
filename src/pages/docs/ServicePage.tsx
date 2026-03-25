import React from 'react';
import { SectionToc } from '../../components/SectionToc';
import { Callout, TldrBlock } from '../../components/DocsBlocks';

export const ServicePage: React.FC = () => {
  return (
    <div className="space-y-8 w-full">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          Docs / <span className="text-amber-400">Services</span>
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          Services
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl">
          What can run as a session service in nihil, with a focus on Desktop Browser UI.
        </p>
      </header>

      <div className="grid sm:grid-cols-[minmax(0,_1fr)_180px] gap-8 items-start">
        <div className="space-y-10 min-w-0">
          <section id="tldr">
            <TldrBlock
              items={[
                'Nihil does not run a permanent global service stack.',
                'Browser UI is an optional per-container session service.',
                'Default Browser UI port is random in 6901-6999.',
                'You can force a fixed port with --browser-ui-port.',
                'BloodHound CE UI convention is port 1030 when service profile is enabled.',
              ]}
            />
          </section>

          <section id="desktop" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Desktop (Browser UI)</h2>
            <p className="text-slate-400 text-sm">
              Browser UI starts a noVNC desktop session for the current container. It is enabled only
              when you request it.
            </p>
            <p className="text-slate-400 text-sm">
              Typical usage: <code>nihil start &lt;name&gt; --browser-ui</code>. Use{' '}
              <code>--browser-ui-port</code> if you want a stable port.
            </p>
            <Callout variant="note" title="Port behavior">
              If no port is specified, nihil picks a random port between <code>6901</code> and{' '}
              <code>6999</code>. The selected URL is shown in container info output.
            </Callout>
          </section>

          <section id="credentials" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Session credentials</h2>
            <p className="text-slate-400 text-sm">
              Browser UI can use an auto-generated session password or a password provided with{' '}
              <code>--browser-ui-password</code>. Keep this value private during engagements.
            </p>
            <Callout variant="warning" title="Operational security">
              Prefer random passwords and isolated networks when exposing browser-based access during an
              assessment.
            </Callout>
          </section>

          <section id="bloodhound-ce" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">BloodHound CE (AD service profile)</h2>
            <p className="text-slate-400 text-sm">
              BloodHound CE usually exposes its web UI on <code>localhost:1030</code>, with backend
              dependencies on PostgreSQL and Neo4j.
            </p>
            <p className="text-slate-400 text-sm">
              Common defaults in CE-style setups: web login <code>admin</code>, first password shown on
              first run, then changed in the UI; Neo4j on <code>7687</code>.
            </p>
            <Callout variant="note" title="Current nihil status">
              The AD image currently ships the <code>bloodhound-ce</code> binary workflow. Full
              start/stop/reset service orchestration (with managed DB lifecycle and credentials) is not
              yet standardized like Browser UI.
            </Callout>
          </section>

          <section id="scope" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Scope and limits</h2>
            <p className="text-slate-400 text-sm">
              Services in nihil are session-scoped helpers (for example Browser UI or VPN workflow in a
              container). They are not a persistent platform-wide orchestration layer.
            </p>
          </section>
        </div>

        <SectionToc
          items={[
            { id: 'tldr', label: 'TL;DR' },
            { id: 'desktop', label: 'Desktop Browser UI' },
            { id: 'credentials', label: 'Credentials' },
            { id: 'bloodhound-ce', label: 'BloodHound CE' },
            { id: 'scope', label: 'Scope & limits' },
          ]}
        />
      </div>
    </div>
  );
};
