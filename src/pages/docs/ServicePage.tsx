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
          Session services managed by the nihil wrapper, with a focus on Desktop Browser UI.
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
                'BloodHound CE starts PostgreSQL and Neo4j automatically -just run bloodhound-ce.',
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
              If no port is specified, nihil picks a random free port in <code>6901-6999</code> (falling back to
              <code>7000-7099</code> if that range is full). The selected URL is shown in container info output.
            </Callout>
            <Callout variant="warning" title="Bound to localhost only">
              The port is published on <code>127.0.0.1</code>, so Browser UI is reachable only from the host running
              Docker. To reach it from another machine, forward the port over SSH
              (<code>ssh -L 6901:127.0.0.1:6901 user@host</code>) rather than exposing it directly.
            </Callout>
          </section>

          <section id="credentials" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Session credentials</h2>
            <p className="text-slate-400 text-sm">
              Browser UI can use an auto-generated session password or a password provided with{' '}
              <code>--browser-ui-password</code>. Keep this value private during engagements.
            </p>
            <Callout variant="note" title="Where passwords are stored">
              Generated and provided Browser UI passwords are saved per container in
              <code>~/.nihil/browser_ui_passwords.json</code>, so the session keeps the same password across restarts.
            </Callout>
            <Callout variant="warning" title="Operational security">
              Prefer random passwords and isolated networks when exposing browser-based access during an
              assessment.
            </Callout>
          </section>

          <section id="bloodhound-ce" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">BloodHound CE</h2>
            <p className="text-slate-400 text-sm">
              The AD image ships BloodHound CE with PostgreSQL and Neo4j. Just run{' '}
              <code>bloodhound-ce</code> -dependencies start automatically.
            </p>
            <Callout variant="note" title="Default credentials">
              BloodHound CE: <code>admin</code> / shown in the terminal on first run.
              Neo4j: <code>neo4j</code> / <code>fly2own1</code>.
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
