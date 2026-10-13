import React, { useState } from 'react';
import { SectionToc } from '../../components/SectionToc';
import { Callout, StepList, TldrBlock } from '../../components/DocsBlocks';
import toolsData from '../../data/tools.json';

const tabs = ['overview', 'full', 'ad', 'web', 'blueteam'] as const;
type Tab = typeof tabs[number];

const tabConfig: Record<Tab, { label: string; color: string; border: string; bg: string; glow: string }> = {
  overview: { label: 'Overview', color: 'text-amber-300', border: 'border-amber-500/40', bg: 'bg-amber-400/15', glow: '' },
  full: { label: 'Full', color: 'text-amber-300', border: 'border-amber-500/40', bg: 'bg-amber-400/15', glow: 'shadow-amber-500/10' },
  ad: { label: 'AD', color: 'text-cyan-300', border: 'border-cyan-500/40', bg: 'bg-cyan-400/15', glow: 'shadow-cyan-500/10' },
  web: { label: 'Web', color: 'text-purple-300', border: 'border-purple-500/40', bg: 'bg-purple-400/15', glow: 'shadow-purple-500/10' },
  blueteam: { label: 'Blue Team', color: 'text-emerald-300', border: 'border-emerald-500/40', bg: 'bg-emerald-400/15', glow: 'shadow-emerald-500/10' },
};

export const ImagesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  return (
    <div className="space-y-8 w-full">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          Docs / <span className="text-amber-400">Images</span>
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          Nihil Images
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl">
          Pick the right image quickly, then drill into tools only when you need details.
        </p>
      </header>

      <div className="grid sm:grid-cols-[minmax(0,_1fr)_180px] gap-8 items-start">
        <div className="space-y-10 min-w-0">

          {/* Tab navigation */}
          <div className="flex gap-1 p-1 rounded-xl bg-slate-900/60 border border-slate-800/60 backdrop-blur-sm w-fit">
            {tabs.map((tab) => {
              const cfg = tabConfig[tab];
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={
                    'px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ' +
                    (activeTab === tab
                      ? `${cfg.bg} ${cfg.color} border ${cfg.border} shadow-lg ${cfg.glow}`
                      : 'text-slate-500 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent')
                  }
                >
                  {cfg.label}
                </button>
              );
            })}
          </div>

          {/* Overview tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <section id="tldr">
                <TldrBlock
                  items={[
                    'Use ad for internal AD assessments.',
                    'Use web for web/API engagements.',
                    'Use blueteam for DFIR, threat hunting, and forensics.',
                    'Use full when you need everything in one image.',
                    'Use nihil image list to see remote availability and update status before pulling.',
                    'Run nihil tools <image> to inspect available tools.',
                  ]}
                />
              </section>

              <section id="pull" className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Pull an image</h2>
                <StepList
                  steps={[
                    { title: 'Start with interactive mode', detail: 'Run nihil install and pick the image you want.' },
                    { title: 'Pin explicit image in scripts', detail: 'Use nihil install ad/web/blueteam/full for reproducible setup.' },
                  ]}
                />
                <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`# Interactive selection
nihil install

# Specific image
nihil install full
nihil install ad
nihil install web
nihil install blueteam

# Check local and remote status
nihil image list`}
                </pre>
              </section>

              <section id="comparison" className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Image comparison</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-slate-700/80">
                        <th className="text-left py-2 pr-4 text-slate-400 font-medium">Feature</th>
                        <th className="text-center py-2 px-4 text-amber-300 font-medium">Full</th>
                        <th className="text-center py-2 px-4 text-amber-300 font-medium">AD</th>
                        <th className="text-center py-2 px-4 text-amber-300 font-medium">Web</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-300">
                      {[
                        ['Core tools (vim, tmux, fzf...)', true, true, true],
                        ['nihil-history', true, true, true],
                        ['AD tools (netexec, impacket...)', true, true, false],
                        ['Web tools (sqlmap, nuclei...)', true, false, true],
                        ['OSINT tools (amass, theHarvester...)', true, false, true],
                        ['Pwn tools (radare2, pwntools...)', true, false, false],
                        ['Reverse tools (ghidra, ida, binaryninja...)', true, false, false],
                        ['Crypto tools (RsaCtfTool, hashid...)', true, false, false],
                        ['Forensics tools (volatility3, stegseek...)', true, false, false],
                        ['Blue team tools (chainsaw, yara, capa...)', true, false, false],
                        ['C2 frameworks (metasploit, sliver)', true, true, false],
                        ['Network tools (nmap, socat, tshark...)', true, true, true],
                        ['Credential tools (hashcat, john)', true, true, true],
                        ['Misc tools (searchsploit, CyberChef)', true, true, true],
                        ['Wordlists (SecLists, rockyou)', true, true, true],
                      ].map(([feature, full, ad, web], i) => (
                        <tr key={i} className="border-b border-slate-800/60">
                          <td className="py-2 pr-4 text-slate-300 text-xs">{feature as string}</td>
                          <td className="text-center py-2 px-4">
                            {full ? <span className="text-emerald-400">&#10003;</span> : <span className="text-slate-600">-</span>}
                          </td>
                          <td className="text-center py-2 px-4">
                            {ad ? <span className="text-emerald-400">&#10003;</span> : <span className="text-slate-600">-</span>}
                          </td>
                          <td className="text-center py-2 px-4">
                            {web ? <span className="text-emerald-400">&#10003;</span> : <span className="text-slate-600">-</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <Callout variant="note" title="Blue Team is specialized (not a simple intersection)">
                  Use the dedicated <code>blueteam</code> image when you want a defensive DFIR and threat-hunting toolkit.
                  The comparison above stays focused on Full/AD/Web; Blue Team gets its own tab with the practical toolset.
                </Callout>
              </section>

              <section id="registries" className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Image registry</h2>
                <p className="text-slate-400 text-sm">
                  All images are hosted on the GitHub Container Registry. The CLI checks the registry to show <code>Available</code>, <code>Update available</code>, or <code>Updated</code> in <code>nihil image list</code>.
                </p>
                <p className="text-slate-400 text-sm">
                  Stable images use <code>:latest</code> (also tagged <code>:main</code>). Run <code>nihil image channel dev</code> to use <code>:dev</code> for all upstream variants. A merge to main promotes the already built dev image without rebuilding it.
                </p>
                <div className="space-y-3">
                  {[
                    { name: 'Full', tag: 'ghcr.io/thenullpigeons/full:latest', alt: ':flock', desc: 'The whole flock', border: 'border-amber-500/20 hover:border-amber-500/40', bg: 'bg-gradient-to-r from-amber-500/5 to-transparent', accent: 'text-amber-300', dot: 'bg-amber-400' },
                    { name: 'AD', tag: 'ghcr.io/thenullpigeons/ad:latest', alt: ':nest', desc: 'Nest in their Active Directory', border: 'border-cyan-500/20 hover:border-cyan-500/40', bg: 'bg-gradient-to-r from-cyan-500/5 to-transparent', accent: 'text-cyan-300', dot: 'bg-cyan-400' },
                    { name: 'Web', tag: 'ghcr.io/thenullpigeons/web:latest', alt: ':beak', desc: 'Beak through their web apps', border: 'border-purple-500/20 hover:border-purple-500/40', bg: 'bg-gradient-to-r from-purple-500/5 to-transparent', accent: 'text-purple-300', dot: 'bg-purple-400' },
                    { name: 'Blue Team', tag: 'ghcr.io/thenullpigeons/blueteam:latest', alt: ':coo', desc: 'Listen before you hunt', border: 'border-emerald-500/20 hover:border-emerald-500/40', bg: 'bg-gradient-to-r from-emerald-500/5 to-transparent', accent: 'text-emerald-300', dot: 'bg-emerald-400' },
                  ].map((img) => (
                    <div key={img.name} className={`flex items-start gap-3 p-4 rounded-xl border ${img.border} ${img.bg} transition-colors`}>
                      <div className={`w-2.5 h-2.5 rounded-full ${img.dot} mt-1 shrink-0 opacity-80`} />
                      <div className="min-w-0">
                        <p className={`text-sm font-bold ${img.accent}`}>{img.name} <span className="text-slate-500 font-normal italic text-xs">- {img.desc}</span></p>
                        <code className="text-xs text-slate-300 font-mono">{img.tag}</code>
                        <span className="text-slate-600 text-xs ml-2">or <code className="text-xs text-slate-500 font-mono">{img.alt}</code></span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section id="choose" className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Which image should I use?</h2>
                <div className="space-y-3">
                  {[
                    { q: 'Internal pentest / AD audit', a: 'ad', reason: 'Impacket, BloodHound, NetExec, Responder, ADCheck, Tombstone, CoercedPotato, and the full AD kill chain.', color: 'cyan', border: 'border-cyan-500/20 hover:border-cyan-500/40', bg: 'from-cyan-500/5' },
                    { q: 'Web application pentest', a: 'web', reason: 'SQLMap, Nuclei, Burp helpers, ffuf, webfuzz, MailScout, and web/API tooling.', color: 'purple', border: 'border-purple-500/20 hover:border-purple-500/40', bg: 'from-purple-500/5' },
                    { q: 'DFIR / blue team / threat hunting', a: 'blueteam', reason: 'Chainsaw, hayabusa, yara, capa, loki, sleuthkit, and forensics essentials.', color: 'emerald', border: 'border-emerald-500/20 hover:border-emerald-500/40', bg: 'from-emerald-500/5' },
                    { q: 'Not sure / want everything', a: 'full', reason: 'All modules combined, offensive and defensive. Larger download, but nothing missing.', color: 'amber', border: 'border-amber-500/20 hover:border-amber-500/40', bg: 'from-amber-500/5' },
                  ].map((item) => {
                    const accent: Record<string, string> = { cyan: 'text-cyan-300', purple: 'text-purple-300', blue: 'text-emerald-300', amber: 'text-amber-300' };
                    return (
                      <div key={item.a} className={`p-4 rounded-xl border ${item.border} bg-gradient-to-r ${item.bg} to-transparent transition-colors space-y-1`}>
                        <p className="text-sm font-medium text-white">{item.q}</p>
                        <p className="text-xs text-slate-400">
                          Use <code className={`${accent[item.color]} font-mono font-bold`}>{item.a}</code> - {item.reason}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <Callout variant="tip" title="Simple decision rule">
                  If you spend most time on Windows internals choose <code>ad</code>, on HTTP/API choose <code>web</code>, on defensive DFIR work choose <code>blueteam</code>, and for mixed offensive engagements choose <code>full</code>.
                </Callout>
              </section>

              <section id="tools-cmd" className="space-y-4">
                <h2 className="text-xl font-semibold text-white">List installed tools</h2>
                <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`# All tools in an image
nihil tools full

# Filter by category
nihil tools ad --category redteam_ad

# Web tools only
nihil tools web --category redteam_web

# Blue team focused categories
nihil tools blueteam --category blueteam`}
                </pre>
              </section>
            </div>
          )}

          {/* Full image tab */}
          {activeTab === 'full' && (
            <div className="space-y-8">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 rounded-full bg-amber-400 shadow-lg shadow-amber-400/30" />
                  <h2 className="text-xl font-bold text-amber-300">Full image</h2>
                  <span className="text-xs text-amber-600 italic">The whole flock</span>
                </div>
                <code className="text-xs text-slate-300 font-mono block mb-2">ghcr.io/thenullpigeons/full:latest</code>
                <p className="text-slate-400 text-sm">
                  The complete arsenal. Every module, every tool. Largest image, but you'll never be missing anything.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {(toolsData.modules.full as string[]).map((m) => (
                    <span key={m} className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400/70 border border-amber-500/15 font-mono">{m}</span>
                  ))}
                </div>
              </div>
              <ToolTable title="Core tools" tools={coreTools} />
              <ToolTable title="AD tools" tools={adTools} />
              <ToolTable title="Web tools" tools={webTools} />
              <ToolTable title="OSINT tools" tools={osintTools} />
              <ToolTable title="Pwn tools" tools={pwnTools} />
              <ToolTable title="Reverse tools" tools={reverseTools} />
              <ToolTable title="Crypto tools" tools={cryptoTools} />
              <ToolTable title="Forensics tools" tools={forensicsTools} />
              <ToolTable title="Blue team tools" tools={blueteamTools} />
              <ToolTable title="Network tools" tools={networkTools} />
              <ToolTable title="Credential tools" tools={credentialTools} />
              <ToolTable title="C2 frameworks" tools={c2Tools} />
              <ToolTable title="Misc tools" tools={miscTools} />
              <ToolTable title="Wordlists" tools={wordlistsTools} />
            </div>
          )}

          {/* AD image tab */}
          {activeTab === 'ad' && (
            <div className="space-y-8">
              <section className="space-y-3">
                <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-cyan-500/5 to-transparent border border-cyan-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/30" />
                    <h2 className="text-xl font-bold text-cyan-300">AD image</h2>
                    <span className="text-xs text-cyan-700 italic">Nest in their Active Directory</span>
                  </div>
                  <code className="text-xs text-slate-300 font-mono block mb-2">ghcr.io/thenullpigeons/ad:latest</code>
                  <p className="text-slate-400 text-sm">
                    Built for internal engagements. Covers the full AD kill chain: enumeration, exploitation, lateral movement, persistence.
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {(toolsData.modules.ad as string[]).map((m) => (
                      <span key={m} className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-400/10 text-cyan-300/80 border border-cyan-500/15 font-mono">{m}</span>
                    ))}
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <h3 className="text-lg font-medium text-white">Key tools by category</h3>
                <div className="space-y-4">
                  {[
                    { cat: 'Enum/Recon', tools: 'bloodhound, bloodhound-ce, bloodhound-import, netexec, ldapdomaindump, enum4linux-ng, windapsearch, ADcheck' },
                    { cat: 'Exploitation', tools: 'impacket, certipy, bloodyAD, coercer, pywhisker, PetitPotam, CoercedPotato, noPac, tombstone' },
                    { cat: 'Credential', tools: 'lsassy, donpapi, pypykatz, hashcat, john, masky' },
                    { cat: 'Relay/Coercion', tools: 'responder, mitm6, krbrelayx, ShadowCoerce, DFSCoerce' },
                    { cat: 'C2', tools: 'metasploit, sliver' },
                    { cat: 'Other', tools: 'PowerShell, kerbrute, rusthound-ce, smbmap, manspider' },
                  ].map((row) => (
                    <div key={row.cat} className="p-3 rounded-xl bg-gradient-to-r from-cyan-500/5 to-transparent border border-cyan-500/20">
                      <p className="text-sm font-medium text-cyan-300">{row.cat}</p>
                      <p className="text-xs text-slate-400 mt-1 font-mono">{row.tools}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-3">
                <h3 className="text-lg font-medium text-white">BloodHound CE</h3>
                <p className="text-slate-400 text-sm">
                  The AD image ships BloodHound CE with PostgreSQL and Neo4j. Just run{' '}
                  <code>bloodhound-ce</code> -dependencies start automatically.
                </p>
                <Callout variant="note" title="Default credentials">
                  BloodHound CE: <code>admin</code> / shown in the terminal on first run.
                  Neo4j: <code>neo4j</code> / <code>fly2own1</code>.
                </Callout>
              </section>

              <ToolTable title="All AD tools" tools={adTools} />
              <ToolTable title="Core tools" tools={coreTools} />
              <ToolTable title="Network tools" tools={networkTools} />
              <ToolTable title="Credential tools" tools={credentialTools} />
              <ToolTable title="C2 frameworks" tools={c2Tools} />
              <ToolTable title="Misc tools" tools={miscTools} />
              <ToolTable title="Wordlists" tools={wordlistsTools} />
            </div>
          )}

          {/* Web image tab */}
          {activeTab === 'web' && (
            <div className="space-y-8">
              <section className="space-y-3">
                <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-transparent border border-purple-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 rounded-full bg-purple-400 shadow-lg shadow-purple-400/30" />
                    <h2 className="text-xl font-bold text-purple-300">Web image</h2>
                    <span className="text-xs text-purple-700 italic">Beak through their web apps</span>
                  </div>
                  <code className="text-xs text-slate-300 font-mono block mb-2">ghcr.io/thenullpigeons/web:latest</code>
                  <p className="text-slate-400 text-sm">
                    Everything for web application testing, from recon to exploitation.
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {(toolsData.modules.web as string[]).map((m) => (
                      <span key={m} className="text-[10px] px-2 py-0.5 rounded-full bg-purple-400/10 text-purple-300/80 border border-purple-500/15 font-mono">{m}</span>
                    ))}
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <h3 className="text-lg font-medium text-white">Key tools by category</h3>
                <div className="space-y-4">
                  {[
                    { cat: 'Discovery', tools: 'nuclei, httpx, dnsx, alterx, subfinder, katana, gobuster, ffuf, dirsearch, hakrawler, gau, waybackurls' },
                    { cat: 'Scanning', tools: 'nikto, whatweb, wafw00f, testssl.sh' },
                    { cat: 'Fuzzing', tools: 'wfuzz, webfuzz, feroxbuster, arjun, kiterunner' },
                    { cat: 'Exploitation', tools: 'sqlmap, commix, xsstrike, tplmap, nosqlmap, graphqlmap, jwt-tool, gopherus' },
                    { cat: 'Proxy', tools: 'mitmproxy, httpie' },
                    { cat: 'SSRF/CORS', tools: 'ssrfmap, corsy, crlfuzz' },
                    { cat: 'Resources', tools: 'PayloadsAllTheThings, SecLists, Caido' },
                  ].map((row) => (
                    <div key={row.cat} className="p-3 rounded-xl bg-gradient-to-r from-purple-500/5 to-transparent border border-purple-500/20">
                      <p className="text-sm font-medium text-purple-300">{row.cat}</p>
                      <p className="text-xs text-slate-400 mt-1 font-mono">{row.tools}</p>
                    </div>
                  ))}
                </div>
              </section>

              <ToolTable title="All Web tools" tools={webTools} />
              <ToolTable title="OSINT tools" tools={osintTools} />
              <ToolTable title="Core tools" tools={coreTools} />
              <ToolTable title="Network tools" tools={networkTools} />
              <ToolTable title="Credential tools" tools={credentialTools} />
              <ToolTable title="Misc tools" tools={miscTools} />
              <ToolTable title="Wordlists" tools={wordlistsTools} />
            </div>
          )}

          {/* Blue Team image tab */}
          {activeTab === 'blueteam' && (
            <div className="space-y-8">
              <section className="space-y-3">
                <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/30" />
                    <h2 className="text-xl font-bold text-emerald-300">Blue Team image</h2>
                    <span className="text-xs text-emerald-700 italic">Listen before you hunt</span>
                  </div>
                  <code className="text-xs text-slate-300 font-mono block mb-2">ghcr.io/thenullpigeons/blueteam:latest</code>
                  <p className="text-slate-400 text-sm">
                    Purpose-built for defensive work: DFIR, log and event-log threat hunting, malware triage, and disk/memory forensics.
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {(toolsData.modules.blueteam as string[]).map((m) => (
                      <span key={m} className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-400/10 text-emerald-300/80 border border-emerald-500/15 font-mono">{m}</span>
                    ))}
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <h3 className="text-lg font-medium text-white">Key tools by category</h3>
                <div className="space-y-4">
                  {[
                    { cat: 'Threat hunting', tools: 'chainsaw, hayabusa, sigma-cli, loki' },
                    { cat: 'Malware analysis', tools: 'yara, capa, jadx' },
                    { cat: 'Forensics', tools: 'sleuthkit, volatility3, foremost, exiftool, steghide, zsteg, stegseek' },
                    { cat: 'Network', tools: 'nmap, tcpdump, wireshark, tshark, seth, wifit3, snmpwalk, onesixtyone, netdiscover' },
                  ].map((row) => (
                    <div key={row.cat} className="p-3 rounded-xl bg-gradient-to-r from-emerald-500/5 to-transparent border border-emerald-500/20">
                      <p className="text-sm font-medium text-emerald-300">{row.cat}</p>
                      <p className="text-xs text-slate-400 mt-1 font-mono">{row.tools}</p>
                    </div>
                  ))}
                </div>
              </section>

              <ToolTable title="Blue team tools" tools={blueteamTools} />
              <ToolTable title="Core tools" tools={coreTools} />
              <ToolTable title="Forensics tools" tools={forensicsTools} />
              <ToolTable title="Network tools" tools={networkTools} />
              <ToolTable title="Wordlists" tools={wordlistsTools} />
            </div>
          )}

        </div>

        {activeTab === 'overview' ? (
          <SectionToc
            items={[
              { id: 'tldr', label: 'TL;DR' },
              { id: 'pull', label: 'Pull an image' },
              { id: 'comparison', label: 'Comparison' },
              { id: 'registries', label: 'Image registry' },
              { id: 'choose', label: 'Which image?' },
              { id: 'tools-cmd', label: 'List tools' },
            ]}
          />
        ) : (
          <aside className="sticky top-24 hidden sm:block">
            <div className="rounded-xl border border-slate-800/70 bg-slate-900/40 p-3 backdrop-blur-sm">
              <p className="text-[11px] uppercase tracking-widest text-slate-500 font-semibold">On this page</p>
              <p className="mt-3 text-xs text-slate-500">Scroll to browse all tools in this image.</p>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

/* ── Tool table component ── */

interface Tool {
  name: string;
  cmd: string;
  desc: string;
}

const ToolTable: React.FC<{ title: string; tools: Tool[] }> = ({ title, tools }) => (
  <section className="space-y-3">
    <h3 className="text-lg font-medium text-white">{title}</h3>
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="border-b border-slate-700/80">
            <th className="text-left py-1.5 pr-3 text-slate-500 font-medium">Tool</th>
            <th className="text-left py-1.5 pr-3 text-slate-500 font-medium">Command</th>
            <th className="text-left py-1.5 text-slate-500 font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {tools.map((t) => (
            <tr key={t.name} className="border-b border-slate-800/40">
              <td className="py-1.5 pr-3 text-slate-200 font-medium">{t.name}</td>
              <td className="py-1.5 pr-3 text-amber-300 font-mono">{t.cmd}</td>
              <td className="py-1.5 text-slate-400">{t.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

/* -- Tool data: generated from nihil-images tools.json by scripts/sync-data.mjs -- */

const byCategory = (category: string): Tool[] =>
  (toolsData.tools as Array<{ name: string; cmd: string; desc: string; category: string }>)
    .filter((t) => t.category === category)
    .map((t) => ({ name: t.name, cmd: t.cmd, desc: t.desc }));

const coreTools = byCategory('Core');
const adTools = byCategory('Active Directory');
const webTools = byCategory('Web');
const osintTools = byCategory('OSINT');
const networkTools = byCategory('Network');
const credentialTools = byCategory('Credential');
const pwnTools = byCategory('Pwn');
const reverseTools = byCategory('Reverse Engineering');
const cryptoTools = byCategory('Crypto');
const forensicsTools = byCategory('Forensics');
const c2Tools = byCategory('C2');
const miscTools = byCategory('Misc');
const wordlistsTools = byCategory('Wordlists');
const blueteamTools = byCategory('Blue Team');
