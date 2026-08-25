import React from 'react';
import { SectionToc } from '../../components/SectionToc';
import { Callout, TldrBlock } from '../../components/DocsBlocks';

export const NihilNtpPage: React.FC = () => {
  return (
    <div className="space-y-8 w-full">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          Docs / <span className="text-amber-400">Nihil NTP</span>
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          nihil-ntp
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl">
          Keep container sessions aligned with a domain controller so Kerberos authentication does not fail because of clock skew.
        </p>
      </header>

      <div className="grid sm:grid-cols-[minmax(0,_1fr)_180px] gap-8 items-start">
        <div className="space-y-10 min-w-0">
          <section id="tldr">
            <TldrBlock
              items={[
                'Use a domain controller or another reachable NTP server as the time source.',
                'The default faketime mode changes the time seen by the shell, not the host clock.',
                'Use status and sync to inspect or refresh the current offset.',
              ]}
            />
          </section>

          <section id="setup" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Configure a time source</h2>
            <p className="text-slate-400 text-sm">
              Pass the IP address or hostname of the NTP server. In an Active Directory engagement, this is commonly the domain controller.
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`# Configure and enable faketime mode
nihil-ntp 10.10.10.10

# Set the server and change the real container clock instead
nihil-ntp --clock 10.10.10.10`}
            </pre>
            <Callout variant="note" title="Faketime by default">
              Faketime is the safe default: the host clock is untouched, while commands launched from configured shells see the calculated offset.
            </Callout>
            <Callout variant="warning" title="Disable it for time-sensitive applications">
              If <code>nihil-ntp</code> remains enabled, applications that depend on the real wall clock can malfunction.
              GUI applications such as Firefox may fail to start or remain frozen after the command is launched. Run{' '}
              <code>nihil-ntp disable</code> before using them, then re-enable synchronization when you return to Kerberos work.
            </Callout>
          </section>

          <section id="commands" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Commands</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-700/80 text-slate-400">
                    <th className="text-left py-2 pr-3">Command</th>
                    <th className="text-left py-2">Purpose</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  {[
                    ['nihil-ntp <server>', 'Configure the server and synchronize now'],
                    ['nihil-ntp status', 'Show server, mode, enabled state, and live offset'],
                    ['nihil-ntp sync', 'Force an immediate synchronization'],
                    ['nihil-ntp enable', 'Re-enable the stored server'],
                    ['nihil-ntp disable', 'Stop applying the offset in new terminals'],
                    ['nihil-ntp --help', 'Show the command help'],
                  ].map(([command, purpose]) => (
                    <tr key={command} className="border-b border-slate-800/50">
                      <td className="py-2 pr-3 font-mono text-amber-300 text-xs">{command}</td>
                      <td className="py-2 text-slate-400">{purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="kerberos" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Kerberos workflow</h2>
            <p className="text-slate-400 text-sm">
              Configure <code>nihil-ntp</code> before requesting Kerberos tickets or using tools such as NetExec and Impacket.
              Run <code>status</code> when authentication errors suggest a time mismatch.
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`nihil-ntp 10.10.10.10
nihil-ntp status
# Run Kerberos-aware tooling after the offset is applied
klist`}
            </pre>
          </section>
        </div>

        <SectionToc
          items={[
            { id: 'tldr', label: 'TL;DR' },
            { id: 'setup', label: 'Configure' },
            { id: 'commands', label: 'Commands' },
            { id: 'kerberos', label: 'Kerberos workflow' },
          ]}
        />
      </div>
    </div>
  );
};
