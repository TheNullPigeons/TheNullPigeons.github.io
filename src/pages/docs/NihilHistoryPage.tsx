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
          Open the terminal interface to manage engagements, credentials, hosts, AD targets, and validated access paths. Use the CLI for repeatable workflows, imports, and reports.
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {['TUI first', 'Engagements', 'Creds x Hosts', 'AD targets', 'Sync NXC', 'Export'].map((badge) => (
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
                'Open nhit for the inline interface, or nhitf for fullscreen.',
                'Press Ctrl+E to create or select an engagement for each mission.',
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
                { title: 'TUI', desc: 'Add, edit, search, select, and duplicate rows without leaving the interface' },
                { title: 'AD targets', desc: 'Keep users, groups, computers, domains, and principals ready as TARGET_* variables' },
                { title: 'Engagements', desc: 'Create, switch, list separate engagement scopes' },
                { title: 'Credentials', desc: 'Track usernames, passwords, hashes (NTLM, RC4), tokens' },
                { title: 'Hosts', desc: 'IPs, hostnames, domains, OS info' },
                { title: 'Access matrix', desc: 'Which cred works on which host, via which protocol' },
                { title: 'Nmap import', desc: 'Import hosts from Nmap XML scans' },
                { title: 'NetExec sync', desc: 'Import creds and hosts from NXC SQLite workspaces' },
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
            <p className="text-slate-400 text-sm">
              nihil-history is included in Nihil images. Run these commands inside your container;
              the interface and CLI share the same engagement database.
            </p>
            <StepList
              steps={[
                { title: 'Open the TUI', detail: 'Run nhit (or nhi tui) to browse and manage engagement data from the terminal interface.' },
                { title: 'Create engagement', detail: 'Press Ctrl+E, then a or n to create one. Select it with Enter.' },
                { title: 'Add credential + host', detail: 'Use tab 1 for credentials and tab 2 for hosts. Press a to add, e to edit, or s to select a row.' },
                { title: 'Create access link', detail: 'Press Shift+L, enter the credential and host IDs, then choose a protocol and status.' },
                { title: 'Export your data', detail: 'Export the engagement in JSON or Markdown when needed.' },
              ]}
            />
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`# Open the terminal interface
nhit
# Equivalent: nhi tui`}
            </pre>
            <details className="border border-slate-800 p-3 space-y-3">
              <summary className="cursor-pointer text-sm text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400">Prefer commands? Show the CLI equivalent</summary>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`# Create an engagement
nhi engagement init "client-2026"

# Add a credential (password)
nhi creds add -u admin -p 'P@ssw0rd' -d corp.local

# Add a credential (NTLM hash)
nhi creds add -u admin --hash 'aad3b435b51404eeaad3b435b51404ee:...' -d corp.local

# Add a host
nhi hosts add --ip 10.10.10.1 --hostname DC01 --domain corp.local --os "Windows Server 2022" --role DC

# Link them
nhi access link --cred-id 1 --host-id 1 --protocol smb --status valid

# View the access matrix
nhi access matrix`}
            </pre>
            </details>
            <Callout variant="tip" title="Operational habit">
              Update nihil-history as soon as a credential or access attempt is validated, not at the end of the day.
            </Callout>
          </section>

          {/* TUI */}
          <section id="tui" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">TUI (Terminal UI)</h2>
            <p className="text-slate-400 text-sm">
              Interactive interface built with Textual for browsing and editing engagement data.
              It opens below your command by default. Use <code>--full</code> for fullscreen mode.
              Switching tabs clears the current search filter. Press <code>?</code> for shortcuts grouped by context;
              the help window scrolls on short terminals. Press <code>Esc</code> to close help or cancel a form.
            </p>
            <figure className="space-y-2">
              <a href="/assets/docs/nihil-history-credentials.png" target="_blank" rel="noreferrer" className="block overflow-hidden border border-slate-700 hover:border-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400" aria-label="Open the Credentials screenshot at full size">
                <img
                  src="/assets/docs/nihil-history-credentials.png"
                  alt="nihil-history Credentials tab showing four example accounts, their domains, passwords, sources, and the selected row."
                  width={1257}
                  height={376}
                  loading="lazy"
                  className="block w-full h-auto"
                />
              </a>
              <figcaption className="text-xs text-slate-400">
                The Credentials tab, with an account selected and keyboard shortcuts along the bottom. Click to view at full size.
              </figcaption>
            </figure>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`nhi tui          # Inline (default)
nhit             # Shortcut for the interface
nhi tui --full   # Fullscreen
nhit --full
nhitf            # Fullscreen shortcut installed with nihil-history
nhi -h           # Help (-h / --help also work on subcommands)
nhit -h          # Interface launch options`}
            </pre>

            <h3 className="text-base font-medium text-white mt-6">Your first engagement in the TUI</h3>
            <StepList steps={[
              { title: 'Choose the mission', detail: 'Ctrl+E opens the engagement manager. Press a or n, enter a name, then select the engagement with Enter.' },
              { title: 'Build the inventory', detail: 'In Credentials (1), press a to add an identity and its secret. In Hosts (2), press a to add an IP or hostname.' },
              { title: 'Keep your working context ready', detail: 'Press s on a credential, host, or AD target. Enter selects the row and closes the interface; s keeps it open.' },
              { title: 'Record validated access', detail: 'Shift+L opens a form for credential ID, host ID, protocol, and status. Review the result in Access Matrix (4).' },
            ]} />

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
                  <tr className="border-b border-slate-800/40"><td className="py-1.5 pr-3 font-medium">Targets</td><td className="py-1.5 pr-3 text-amber-300 font-mono">3</td><td className="py-1.5 text-slate-400">Active Directory targets</td></tr>
                  <tr className="border-b border-slate-800/40"><td className="py-1.5 pr-3 font-medium">Access Matrix</td><td className="py-1.5 pr-3 text-amber-300 font-mono">4</td><td className="py-1.5 text-slate-400">Credential/host/protocol access grid</td></tr>
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
                    ['1 / 2 / 3 / 4 or F1 / F2 / F3 / F4', 'Switch tabs and focus the table'],
                    ['← / → or h / l', 'Previous / next tab from a table'],
                    ['Ctrl+E', 'Open engagement manager; a or n creates a new engagement'],
                    ['a', 'Add a credential, host, AD target, or access link in the active tab'],
                    ['e', 'Edit selected item'],
                    ['d', 'Delete selected item'],
                    ['s', 'Set selected item as active (exports to env)'],
                    ['L', 'Create access link (cred → host)'],
                    ['v', 'Select a range in Credentials or Hosts; move with j/k or arrows, then d to delete after confirmation'],
                    ['/', 'Filter the active table; Enter or Tab keeps the filter and returns to the results, Esc clears it'],
                    ['↑ / ↓ or j / k', 'Move between rows'],
                    ['g / G', 'Jump to top / bottom'],
                    ['?', 'Open keyboard shortcuts grouped by context; scroll with ↑ / ↓ or j / k, g / G jumps to the beginning / end, Esc closes it'],
                    ['Enter', 'Select a credential, host, or target and quit; in Access Matrix, show link details in the status line'],
                    ['Ctrl+D', 'Toggle the DC role on the selected host'],
                    ['y / p', 'Copy a row to the internal buffer / paste a copy into the current engagement'],
                    ['Esc', 'Cancel search or visual mode; dismiss forms and help'],
                  ].map(([key, action]) => (
                    <tr key={key} className="border-b border-slate-800/40">
                      <td className="py-1.5 pr-3 text-amber-300 font-mono">{key}</td>
                      <td className="py-1.5 text-slate-400">{action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-slate-400 text-sm">
              The <code>y</code>/<code>p</code> buffer belongs to the TUI, not the system clipboard. You can copy a row,
              switch engagements with <code>Ctrl+E</code>, and paste it into the destination. Access links retain their
              credential and host IDs, so recreate those links with the destination IDs when transferring an engagement.
              Editing is available with <code>e</code>; deletion with <code>d</code> requires confirmation.
            </p>
            <div className="p-3 rounded-lg bg-sky-500/5 border border-sky-500/20 mt-4">
              <p className="text-xs text-sky-300">
                The TUI requires truecolor support for correct colors. Inside nihil containers, this is configured
                automatically (<code className="font-mono text-sky-200">COLORTERM=truecolor</code>). On your host, most modern terminals
                (kitty, alacritty, wezterm, iTerm2) support it natively.
              </p>
            </div>
          </section>

          {/* Engagements */}
          <section id="engagements" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Engagements</h2>
            <p className="text-slate-400 text-sm">
              Each engagement has its own isolated scope of credentials, hosts, and access links.
            </p>
            <p className="text-slate-400 text-sm">
              Core commands: <code>nhi engagement init</code>, <code>nhi engagement list</code>, <code>nhi engagement use</code>, <code>nhi engagement set-workspace</code>.
            </p>
            <p className="text-slate-400 text-sm">
              A <code>default</code> engagement is created on first use when the database is empty. For real work,
              open <code>Ctrl+E</code> and create a named engagement with <code>a</code> or <code>n</code>.
              In that manager, <code>r</code> renames an engagement; entering an existing name offers to merge into it.
              <code>d</code> deletes the engagement and its data after confirmation.
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`# Create and switch to an engagement
nhi engagement init "client-2026"
nhi engagement use "client-2026"

# Link to a specific NXC workspace (if different from engagement name)
nhi engagement set-workspace corp_local`}
            </pre>
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
              <p><span className="text-slate-300 font-medium">--username / -u:</span> account name</p>
              <p><span className="text-slate-300 font-medium">--password / -p:</span> cleartext password</p>
              <p><span className="text-slate-300 font-medium">--hash:</span> NTLM or other hash</p>
              <p><span className="text-slate-300 font-medium">--secret / -s:</span> token, API key, or other secret</p>
              <p><span className="text-slate-300 font-medium">--domain / -d:</span> domain or realm</p>
            </div>
            <Callout variant="note" title="creds set">
              <code>nhi creds set --id 1</code> marks a credential as active. In the TUI, use <code>s</code> to select
              it and keep browsing, or <code>Enter</code> to select it and return to the shell. This updates the generated environment file.
            </Callout>
          </section>

          {/* Hosts */}
          <section id="hosts" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Hosts</h2>
            <p className="text-slate-400 text-sm">
              Add manually with <code>nhi hosts add</code> or press <code>a</code> in TUI tab 2.
              An IP or hostname is required. Set the role to <code>DC</code> for a domain controller;
              <code>Ctrl+D</code> toggles that role on the selected host in the TUI.
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`nhi hosts add --ip 10.10.10.1 --hostname DC01 --domain corp.local --role DC
nhi hosts list
nhi hosts set --id 1

# Import IPv4 hosts from an existing Nmap XML scan
nhi hosts import-nmap -f scan.xml`}
            </pre>
            <p className="text-slate-400 text-sm">
              Nmap import adds IPv4 addresses, the first hostname, and the first OS match when available.
              IPs already present in the active engagement are skipped. It does not import port or service inventories.
              Selecting a host with the DC role records its <code>DC_IP</code> and <code>DC_HOST</code> separately from the current target host.
            </p>
          </section>

          {/* Targets */}
          <section id="targets" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">AD targets</h2>
            <p className="text-slate-400 text-sm">
              Targets store the AD object you are currently working against (a user, group, computer, domain or
              principal), so you can feed it straight into tooling through the environment.
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`# Register a target object
nhi targets add -n dc-takeover --computer DC01 --domain corp.local

# List, select, remove
nhi targets list
nhi targets set --id 1
nhi targets rm --id 1`}
            </pre>
            <p className="text-slate-400 text-xs">
              Fields: <code>--user</code>, <code>--group</code>, <code>--object</code>, <code>--computer</code>,
              <code>--domain</code>, <code>--principal</code>. The selected target is exported as the
              <code>TARGET_*</code> variables.
            </p>
          </section>

          {/* Access */}
          <section id="access" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Access links</h2>
            <p className="text-slate-400 text-sm">
              Record which credentials work on which hosts; links do not test credentials or open connections.
              Use <code>Shift+L</code> from the TUI or <code>a</code> in Access Matrix to create a link.
              Find the numeric IDs in the Credentials and Hosts tables before filling the form.
            </p>
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
            <p className="text-slate-400 text-sm">
              nihil-history reads the NXC SQLite database directly from <code>~/.nxc/workspaces/</code>. No file export needed.
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`# Sync from the workspace linked to the active engagement
nhi sync nxc

# Sync from a specific workspace
nhi sync nxc --workspace corp_local

# Sync from all workspaces into the active engagement
nhi sync nxc --all

# Read workspaces from another directory
nhi sync nxc --workspace-path /path/to/workspaces --workspace corp_local`}
            </pre>
            <Callout variant="note" title="Auto-sync">
              NXC data is silently imported on every <code>nhi</code> command (from the engagement-linked workspace only). Use <code>nhi sync nxc</code> explicitly when you need verbose output, want to sync a different workspace, or use <code>--all</code> to pull from every NXC workspace at once.
            </Callout>
            <Callout variant="note" title="Deletion also affects NetExec">
              Deleting a credential or host in the TUI also attempts to remove the matching entry from the linked NXC workspace.
              This applies to single-row and visual-mode deletions. Back up both stores before bulk cleanup.
            </Callout>
          </section>

          {/* Env */}
          <section id="env" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Environment variables</h2>
            <p className="text-slate-400 text-sm">
              Select credentials, a host, and optionally an AD target with <code>s</code> in the TUI or the CLI
              <code>set</code> commands. Selections write <code>env.sh</code>; shell integration loads that file after
              <code>nhi</code>, <code>nhit</code>, or <code>nhitf</code> returns. A child process cannot directly change its parent shell.
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`# Inspect the variables for the selected context
nhi env print --shell zsh

# Write shell-quoted exports, then load them into this shell
nhi env export
source ~/.nihil-history/env.sh

# Install auto-source in ~/.zshrc or ~/.bashrc
nhi env install-shell

# Remove shell integration
nhi env uninstall-shell`}
            </pre>
            <p className="text-slate-400 text-sm">
              Without an explicit selection, exports fall back to the last entry in the credential, host, or target list.
              Use <code>nhi creds set --id 1</code>, <code>nhi hosts set --id 1</code>, and <code>nhi targets set --id 1</code>
              to make the context explicit. A hostname-only host has no <code>IP</code> or <code>TARGET</code> IP export.
              For fish, use <code>nhi env export --shell fish</code> and source the generated file; automatic shell integration supports bash and zsh.
            </p>
            <div className="space-y-1 text-xs text-slate-400 mt-2">
              <p><span className="text-slate-300 font-medium">From active credential:</span> <code>USER</code>, <code>PASSWORD</code>, <code>NT_HASH</code>, <code>DOMAIN</code>, <code>BASE_DN</code></p>
              <p><span className="text-slate-300 font-medium">From active host:</span> <code>TARGET</code>, <code>IP</code></p>
              <p><span className="text-slate-300 font-medium">From DC role host:</span> <code>DC_IP</code>, <code>DC_HOST</code></p>
              <p><span className="text-slate-300 font-medium">From active target:</span> <code>TARGET_USER</code>, <code>TARGET_GROUP</code>, <code>TARGET_OBJECT</code>, <code>TARGET_COMPUTER</code>, <code>TARGET_DOMAIN</code>, <code>TARGET_PRINCIPAL</code></p>
            </div>
            <p className="text-slate-500 text-xs"><code>BASE_DN</code> is derived from the credential&apos;s domain (e.g. <code>corp.local</code> becomes <code>DC=corp,DC=local</code>).</p>
          </section>

          {/* Export */}
          <section id="export" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Export reports</h2>
            <p className="text-slate-400 text-sm">
              Export the engagement as JSON or Markdown. With <code>-o</code> / <code>--output</code> it writes a file;
              without it the report is printed to stdout.
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`nhi export json -o report.json
nhi export markdown -o report.md
nhi export markdown              # print to stdout`}
            </pre>
            <p className="text-slate-400 text-sm">
              Reports contain the active engagement, credentials, hosts, and access links. Passwords, hashes, and secrets
              are omitted by default. AD targets are not currently included; use a full data-directory backup to retain them.
            </p>
            <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
              <p className="text-xs text-amber-300">
                <code className="font-mono">--include-secrets</code> includes plaintext passwords and hashes in the export. Handle with care.
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
            <div className="space-y-2">
              <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                <p className="text-xs text-emerald-300">
                  Set <code className="font-mono text-emerald-200">NIHIL_HISTORY_HOME</code> to move storage to a custom directory (shared project disk, encrypted mount, etc.).
                </p>
              </div>
              <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
                <p className="text-xs text-amber-300">
                  Set <code className="font-mono text-amber-200">NIHIL_HISTORY_ENCRYPTION=1</code> before the first run
                  to enable Fernet encryption for new secret writes. For an existing configuration, set
                  <code>encryption_enabled</code> to <code>true</code> in <code>config.json</code>.
                  Existing plaintext rows are not automatically rewritten. Keep <code>secret.key</code> with your backup;
                  encrypted secrets cannot be recovered without it. The generated <code>env.sh</code> contains readable secrets even when database encryption is enabled.
                </p>
              </div>
            </div>
            <h3 className="text-base font-semibold text-white">Back up and restore</h3>
            <p className="text-slate-400 text-sm">
              Close the TUI and stop other writers, then back up the complete data directory:
              <code>history.db</code>, <code>config.json</code>, <code>env.sh</code>, and <code>secret.key</code> if present.
              Copy that directory to the destination and set <code>NIHIL_HISTORY_HOME</code> before launching the tool.
              Check <code>db_path</code> in the copied <code>config.json</code> if the location changed.
              The archive and environment file contain engagement secrets; keep them with the engagement data.
            </p>
            <p className="text-slate-400 text-sm">
              If the configured home directory is not writable, storage falls back to <code>.nihil-history</code> in the current working directory.
              Check both locations before assuming that data is missing.
            </p>
            <section id="troubleshooting" className="space-y-2">
              <h3 className="text-base font-semibold text-white">Troubleshooting quick wins</h3>
              <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
                <li>If a command says no engagement selected, run <code>nhi engagement use &lt;name&gt;</code>.</li>
                <li>If NXC sync imports nothing, check the engagement-linked workspace with <code>nhi engagement list</code>, then use <code>nhi sync nxc --workspace &lt;name&gt;</code> for an explicit import.</li>
                <li>For Nmap import, use XML output from <code>nmap -oX scan.xml</code>; ordinary text output cannot be imported.</li>
                <li>If the shell variables do not change, source <code>~/.nihil-history/env.sh</code>, or install shell integration and open a new shell.</li>
                <li>Use <code>nhitf</code> in a short terminal, or <code>?</code> to review context-specific keys. Press Esc to leave search before using table shortcuts.</li>
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
            { id: 'tui', label: 'TUI workflow & keys' },
            { id: 'engagements', label: 'Engagements' },
            { id: 'credentials', label: 'Credentials' },
            { id: 'hosts', label: 'Hosts' },
            { id: 'targets', label: 'AD targets' },
            { id: 'access', label: 'Access links' },
            { id: 'sync', label: 'Sync from tools' },
            { id: 'env', label: 'Environment variables' },
            { id: 'export', label: 'Export reports' },
            { id: 'storage', label: 'Data storage' },
            { id: 'troubleshooting', label: 'Troubleshooting' },
          ]}
        />
      </div>
    </div>
  );
};
