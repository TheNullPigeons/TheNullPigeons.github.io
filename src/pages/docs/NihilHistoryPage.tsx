import React from 'react';
import { SectionToc } from '../../components/SectionToc';
import { Callout, StepList, TldrBlock } from '../../components/DocsBlocks';

export const NihilHistoryPage: React.FC = () => {
  return (
    <div className="space-y-8 w-full">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          Docs / <span className="text-amber-400">nihil-history</span>
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          nihil-history
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl">
          Keep engagement knowledge in one place: credentials, hosts, and validated access paths.
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {['Engagements', 'Creds x Hosts', 'TUI', 'Sync NXC', 'Export'].map((badge) => (
            <span key={badge} className="text-[10px] px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300/90 font-semibold tracking-wide">
              {badge}
            </span>
          ))}
        </div>
      </header>

      <div className="grid sm:grid-cols-[minmax(0,_1fr)_180px] gap-8 items-start">
        <div className="space-y-10 min-w-0">
          <section id="tldr">
            <TldrBlock
              items={[
                'Create one engagement per mission/client.',
                'Store creds and hosts early, not at report time.',
                'Link creds to hosts with protocol + status.',
                'Use env print and export for operational speed.',
              ]}
            />
          </section>

          {/* Why */}
          <section id="why" className="space-y-3">
            <h2 className="text-xl font-semibold text-white">Why</h2>
            <p className="text-slate-400 text-sm">Without structure, creds/hosts/access notes get fragmented across shells and notes. nihil-history keeps them queryable and exportable.</p>
          </section>

          {/* Features */}
          <section id="features" className="space-y-3">
            <h2 className="text-xl font-semibold text-white">Features</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { title: 'Engagements', desc: 'Create, switch, list separate engagement scopes' },
                { title: 'Credentials', desc: 'Track usernames, passwords, hashes (NTLM, RC4), tokens' },
                { title: 'Hosts', desc: 'IPs, hostnames, domains, OS info' },
                { title: 'Access matrix', desc: 'Which cred works on which host, via which protocol' },
                { title: 'Nmap import', desc: 'Import hosts from Nmap XML scans' },
                { title: 'NetExec sync', desc: 'Import creds and access from NXC output' },
                { title: 'TUI', desc: 'Interactive terminal UI for browsing and editing' },
                { title: 'Export', desc: 'JSON and Markdown reports' },
              ].map((f) => (
                <div key={f.title} className="p-3 rounded-xl bg-gradient-to-r from-amber-500/5 to-transparent border border-amber-500/20 hover:border-amber-500/35 transition-colors">
                  <p className="text-sm font-medium text-amber-300">{f.title}</p>
                  <p className="text-xs text-slate-400 mt-1">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Quick start */}
          <section id="quickstart" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Quick start</h2>
            <StepList
              steps={[
                { title: 'Create engagement', detail: 'Initialize a dedicated scope for this mission.' },
                { title: 'Add credential + host', detail: 'Store identity and target before running spray/lateral actions.' },
                { title: 'Create access link', detail: 'Mark what worked on which protocol.' },
                { title: 'Use TUI / export', detail: 'Browse quickly in terminal and export in JSON/Markdown.' },
              ]}
            />
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`# Create an engagement
nhi engagement init "client-2026"

# Add a credential
nhi creds add -u admin -p 'P@ssw0rd' -d corp.local

# Add a host
nhi hosts add --ip 10.10.10.1 --hostname DC01 --domain corp.local --os "Windows Server 2022"

# Link them
nhi access link --cred-id 1 --host-id 1 --protocol smb --status valid

# View the access matrix
nhi access matrix

# Open the TUI
nhi tui`}
            </pre>
            <Callout variant="tip" title="Operational habit">
              Update nihil-history as soon as a credential or access attempt is validated, not at the end of the day.
            </Callout>
          </section>

          {/* Engagements */}
          <section id="engagements" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Engagements</h2>
            <p className="text-slate-400 text-sm">
              Each engagement has its own isolated scope of credentials, hosts, and access links.
            </p>
            <p className="text-slate-400 text-sm">
              Core flow: <code>nhi engagement init</code>, <code>nhi engagement list</code>, <code>nhi engagement use</code>.
            </p>
            <div className="p-3 rounded-lg bg-sky-500/5 border border-sky-500/20">
              <p className="text-xs text-sky-300">
                Most commands require an active engagement. Use <code className="font-mono text-sky-200">nhi engagement use</code> to select one.
              </p>
            </div>
          </section>

          {/* Credentials */}
          <section id="credentials" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Credentials</h2>
            <p className="text-slate-400 text-sm">
              Add credentials with <code>nhi creds add</code>, then manage with <code>list</code>, <code>set</code>, and <code>rm</code>.
            </p>
            <div className="space-y-1 text-xs text-slate-400">
              <p><span className="text-slate-300 font-medium">Types:</span> password, hash, token</p>
              <p><span className="text-slate-300 font-medium">Hash formats:</span> ntlm, rc4</p>
            </div>
            <Callout variant="note" title="Why type + format">
              Separate <code>type</code> and <code>format</code> prevents ambiguity and helps tooling integrations.
            </Callout>
          </section>

          {/* Hosts */}
          <section id="hosts" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Hosts</h2>
            <p className="text-slate-400 text-sm">
              Add manually with <code>nhi hosts add</code> or bulk import with <code>nhi hosts import-nmap -f scan.xml</code>.
            </p>
          </section>

          {/* Access */}
          <section id="access" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Access links</h2>
            <p className="text-slate-400 text-sm">Track which credentials work on which hosts.</p>
            <p className="text-slate-400 text-sm">
              Core commands: <code>nhi access link</code>, <code>nhi access matrix</code>, <code>nhi access list</code>, <code>nhi access rm</code>.
            </p>
            <div className="space-y-1 text-xs text-slate-400">
              <p><span className="text-slate-300 font-medium">Protocols:</span> smb, ldap, winrm, ssh, rdp, mssql, http, https, ftp, wmi</p>
              <p><span className="text-slate-300 font-medium">Statuses:</span> valid, invalid, unknown</p>
            </div>
          </section>

          {/* Sync */}
          <section id="sync" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Sync from tools</h2>
            <p className="text-slate-400 text-sm">Import NetExec output with <code>nhi sync nxc -f nxc_output.txt</code>.</p>
          </section>

          {/* Env */}
          <section id="env" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Environment variables</h2>
            <p className="text-slate-400 text-sm">
              Export the selected credential and host as shell variables for use in commands.
            </p>
            <p className="text-slate-400 text-sm">
              Typical flow: <code>eval $(nhi env print --shell bash)</code> then consume <code>NIHIL_TARGET</code>, <code>NIHIL_USER</code>, <code>NIHIL_PASS</code>.
            </p>
          </section>

          {/* Export */}
          <section id="export" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Export reports</h2>
            <p className="text-slate-400 text-sm">
              Export with <code>nhi export json -o report.json</code> or <code>nhi export markdown -o report.md</code>.
            </p>
            <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
              <p className="text-xs text-amber-300">
                <code className="font-mono">--include-secrets</code> includes plaintext passwords and hashes in the export. Handle with care.
              </p>
            </div>
          </section>

          {/* TUI */}
          <section id="tui" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">TUI (Terminal UI)</h2>
            <p className="text-slate-400 text-sm">
              Interactive interface built with Textual for browsing and editing engagement data.
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`nhi tui`}
            </pre>

            <h3 className="text-base font-medium text-white mt-6">Tabs</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-700/80">
                    <th className="text-left py-1.5 pr-3 text-slate-500 font-medium">Tab</th>
                    <th className="text-left py-1.5 pr-3 text-slate-500 font-medium">Shortcut</th>
                    <th className="text-left py-1.5 text-slate-500 font-medium">Content</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr className="border-b border-slate-800/40"><td className="py-1.5 pr-3 font-medium">Credentials</td><td className="py-1.5 pr-3 text-amber-300 font-mono">1</td><td className="py-1.5 text-slate-400">All credentials for the active engagement</td></tr>
                  <tr className="border-b border-slate-800/40"><td className="py-1.5 pr-3 font-medium">Hosts</td><td className="py-1.5 pr-3 text-amber-300 font-mono">2</td><td className="py-1.5 text-slate-400">All hosts for the active engagement</td></tr>
                  <tr className="border-b border-slate-800/40"><td className="py-1.5 pr-3 font-medium">Access Matrix</td><td className="py-1.5 pr-3 text-amber-300 font-mono">3</td><td className="py-1.5 text-slate-400">Credential/host/protocol access grid</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-base font-medium text-white mt-6">Keybindings</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-700/80">
                    <th className="text-left py-1.5 pr-3 text-slate-500 font-medium">Key</th>
                    <th className="text-left py-1.5 text-slate-500 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  {[
                    ['q', 'Quit'],
                    ['r', 'Refresh all data'],
                    ['1 / 2 / 3', 'Switch tabs'],
                    ['a', 'Add item (credential, host, or access link)'],
                    ['e', 'Edit selected item'],
                    ['d', 'Delete selected item'],
                    ['s', 'Set selected item as active'],
                    ['l', 'Link credential to host (access)'],
                    ['h', 'Show allowed values (types, protocols, statuses)'],
                    ['Enter', 'Show details of selected item'],
                  ].map(([key, action]) => (
                    <tr key={key} className="border-b border-slate-800/40">
                      <td className="py-1.5 pr-3 text-amber-300 font-mono">{key}</td>
                      <td className="py-1.5 text-slate-400">{action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3 rounded-lg bg-sky-500/5 border border-sky-500/20 mt-4">
              <p className="text-xs text-sky-300">
                The TUI requires truecolor support for correct colors. Inside nihil containers, this is configured
                automatically (<code className="font-mono text-sky-200">COLORTERM=truecolor</code>). On your host, most modern terminals
                (kitty, alacritty, wezterm, iTerm2) support it natively.
              </p>
            </div>
          </section>

          {/* Data storage */}
          <section id="storage" className="space-y-3">
            <h2 className="text-xl font-semibold text-white">Data storage</h2>
            <p className="text-slate-400 text-sm">
              nihil-history uses a local SQLite database. Each engagement has its own data.
              Stored by default at <code className="text-xs bg-slate-900 px-1 py-0.5 rounded border border-slate-700 font-mono">~/.nihil-history/history.db</code>.
            </p>
            <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
              <p className="text-xs text-emerald-300">
                Set <code className="font-mono text-emerald-200">NIHIL_HISTORY_HOME</code> to move storage to a custom directory (shared project disk, encrypted mount, etc.).
              </p>
            </div>
            <section id="troubleshooting" className="space-y-2">
              <h3 className="text-base font-semibold text-white">Troubleshooting quick wins</h3>
              <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
                <li>If a command says no engagement selected, run <code>nhi engagement use &lt;name&gt;</code>.</li>
                <li>If import fails, validate input format (<code>nmap xml</code> / <code>nxc output</code>).</li>
                <li>Use <code>nhi env print</code> to confirm active selected cred/host context.</li>
              </ul>
            </section>
          </section>

        </div>

        <SectionToc
          items={[
            { id: 'tldr', label: 'TL;DR' },
            { id: 'why', label: 'Why' },
            { id: 'features', label: 'Features' },
            { id: 'quickstart', label: 'Quick start' },
            { id: 'engagements', label: 'Engagements' },
            { id: 'credentials', label: 'Credentials' },
            { id: 'hosts', label: 'Hosts' },
            { id: 'access', label: 'Access links' },
            { id: 'sync', label: 'Sync from tools' },
            { id: 'env', label: 'Environment variables' },
            { id: 'export', label: 'Export reports' },
            { id: 'tui', label: 'TUI' },
            { id: 'storage', label: 'Data storage' },
            { id: 'troubleshooting', label: 'Troubleshooting' },
          ]}
        />
      </div>
    </div>
  );
};
