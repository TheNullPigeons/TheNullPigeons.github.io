import React, { useState } from 'react';
import { SectionToc } from '../../components/SectionToc';
import { Callout, StepList, TldrBlock } from '../../components/DocsBlocks';

const tabs = ['overview', 'full', 'ad', 'web'] as const;
type Tab = typeof tabs[number];

const tabConfig: Record<Tab, { label: string; color: string; border: string; bg: string; glow: string }> = {
  overview: { label: 'Overview', color: 'text-amber-300', border: 'border-amber-500/40', bg: 'bg-amber-400/15', glow: '' },
  full: { label: 'Full', color: 'text-amber-300', border: 'border-amber-500/40', bg: 'bg-amber-400/15', glow: 'shadow-amber-500/10' },
  ad: { label: 'AD', color: 'text-cyan-300', border: 'border-cyan-500/40', bg: 'bg-cyan-400/15', glow: 'shadow-cyan-500/10' },
  web: { label: 'Web', color: 'text-purple-300', border: 'border-purple-500/40', bg: 'bg-purple-400/15', glow: 'shadow-purple-500/10' },
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
                    'Use full when you need everything in one image.',
                    'Run nihil tools <image> to inspect available tools.',
                  ]}
                />
              </section>

              <section id="pull" className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Pull an image</h2>
                <StepList
                  steps={[
                    { title: 'Start with interactive mode', detail: 'Run nihil install and pick the image you want.' },
                    { title: 'Pin explicit image in scripts', detail: 'Use nihil install ad/web/full for reproducible setup.' },
                  ]}
                />
                <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`# Interactive selection
nihil install

# Specific image
nihil install full
nihil install ad
nihil install web`}
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
                        ['Pwn tools (radare2, pwntools...)', true, false, false],
                        ['C2 frameworks (metasploit, sliver)', true, true, false],
                        ['Network tools (nmap, netcat)', true, true, true],
                        ['Credential tools (hashcat, john)', true, true, true],
                      ].map(([feature, full, ad, web], i) => (
                        <tr key={i} className="border-b border-slate-800/60">
                          <td className="py-2 pr-4 text-slate-300 text-xs">{feature as string}</td>
                          <td className="text-center py-2 px-4">
                            {full ? <span className="text-emerald-400">&#10003;</span> : <span className="text-slate-600">&mdash;</span>}
                          </td>
                          <td className="text-center py-2 px-4">
                            {ad ? <span className="text-emerald-400">&#10003;</span> : <span className="text-slate-600">&mdash;</span>}
                          </td>
                          <td className="text-center py-2 px-4">
                            {web ? <span className="text-emerald-400">&#10003;</span> : <span className="text-slate-600">&mdash;</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="registries" className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Registry</h2>
                <p className="text-slate-400 text-sm">
                  All images are hosted on the GitHub Container Registry.
                </p>
                <div className="space-y-3">
                  {[
                    { name: 'Full', tag: 'ghcr.io/thenullpigeons/full:latest', alt: ':flock', desc: 'The whole flock', border: 'border-amber-500/20 hover:border-amber-500/40', bg: 'bg-gradient-to-r from-amber-500/5 to-transparent', accent: 'text-amber-300', dot: 'bg-amber-400' },
                    { name: 'AD', tag: 'ghcr.io/thenullpigeons/ad:latest', alt: ':nest', desc: 'Nest in their Active Directory', border: 'border-cyan-500/20 hover:border-cyan-500/40', bg: 'bg-gradient-to-r from-cyan-500/5 to-transparent', accent: 'text-cyan-300', dot: 'bg-cyan-400' },
                    { name: 'Web', tag: 'ghcr.io/thenullpigeons/web:latest', alt: ':beak', desc: 'Beak through their web apps', border: 'border-purple-500/20 hover:border-purple-500/40', bg: 'bg-gradient-to-r from-purple-500/5 to-transparent', accent: 'text-purple-300', dot: 'bg-purple-400' },
                  ].map((img) => (
                    <div key={img.name} className={`flex items-start gap-3 p-4 rounded-xl border ${img.border} ${img.bg} transition-colors`}>
                      <div className={`w-2.5 h-2.5 rounded-full ${img.dot} mt-1 shrink-0 opacity-80`} />
                      <div className="min-w-0">
                        <p className={`text-sm font-bold ${img.accent}`}>{img.name} <span className="text-slate-500 font-normal italic text-xs">&mdash; {img.desc}</span></p>
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
                    { q: 'Internal pentest / AD audit', a: 'ad', reason: 'Impacket, BloodHound, NetExec, Responder, and the full AD kill chain.', color: 'cyan', border: 'border-cyan-500/20 hover:border-cyan-500/40', bg: 'from-cyan-500/5' },
                    { q: 'Web application pentest', a: 'web', reason: 'SQLMap, Nuclei, Burp helpers, ffuf, and all the web arsenal.', color: 'purple', border: 'border-purple-500/20 hover:border-purple-500/40', bg: 'from-purple-500/5' },
                    { q: 'Not sure / want everything', a: 'full', reason: 'All modules combined. Larger download, but nothing missing.', color: 'amber', border: 'border-amber-500/20 hover:border-amber-500/40', bg: 'from-amber-500/5' },
                  ].map((item) => {
                    const accent: Record<string, string> = { cyan: 'text-cyan-300', purple: 'text-purple-300', amber: 'text-amber-300' };
                    return (
                      <div key={item.a} className={`p-4 rounded-xl border ${item.border} bg-gradient-to-r ${item.bg} to-transparent transition-colors space-y-1`}>
                        <p className="text-sm font-medium text-white">{item.q}</p>
                        <p className="text-xs text-slate-400">
                          Use <code className={`${accent[item.color]} font-mono font-bold`}>{item.a}</code> &mdash; {item.reason}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <Callout variant="tip" title="Simple decision rule">
                  If you spend most time on Windows internals choose <code>ad</code>, on HTTP/API choose <code>web</code>, and for mixed engagements choose <code>full</code>.
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
nihil tools web --category redteam_web`}
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
                  {['core_tools', 'redteam_ad', 'redteam_web', 'redteam_pwn', 'redteam_network', 'redteam_credential', 'redteam_c2', 'redteam_misc'].map((m) => (
                    <span key={m} className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400/70 border border-amber-500/15 font-mono">{m}</span>
                  ))}
                </div>
              </div>
              <ToolTable title="Core tools" tools={coreTools} />
              <ToolTable title="AD tools" tools={adTools} />
              <ToolTable title="Web tools" tools={webTools} />
              <ToolTable title="Pwn tools" tools={pwnTools} />
              <ToolTable title="Network tools" tools={networkTools} />
              <ToolTable title="Credential tools" tools={credentialTools} />
              <ToolTable title="C2 frameworks" tools={c2Tools} />
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
                    {['ad_enum', 'ad_exploit', 'relay', 'credentials', 'c2'].map((m) => (
                      <span key={m} className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-400/10 text-cyan-300/80 border border-cyan-500/15 font-mono">{m}</span>
                    ))}
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <h3 className="text-lg font-medium text-white">Key tools by category</h3>
                <div className="space-y-4">
                  {[
                    { cat: 'Enum/Recon', tools: 'bloodhound, netexec, ldapdomaindump, enum4linux-ng, windapsearch, pywerview, ldapsearch-ad' },
                    { cat: 'Exploitation', tools: 'impacket, certipy, bloodyAD, coercer, pywhisker, PetitPotam, noPac, zerologon' },
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

              <ToolTable title="All AD tools" tools={adTools} />
              <ToolTable title="Core tools" tools={coreTools} />
              <ToolTable title="Network tools" tools={networkTools} />
              <ToolTable title="Credential tools" tools={credentialTools} />
              <ToolTable title="C2 frameworks" tools={c2Tools} />
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
                    {['discovery', 'fuzzing', 'scanning', 'exploit', 'api'].map((m) => (
                      <span key={m} className="text-[10px] px-2 py-0.5 rounded-full bg-purple-400/10 text-purple-300/80 border border-purple-500/15 font-mono">{m}</span>
                    ))}
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <h3 className="text-lg font-medium text-white">Key tools by category</h3>
                <div className="space-y-4">
                  {[
                    { cat: 'Discovery', tools: 'nuclei, httpx, subfinder, katana, gobuster, ffuf, dirsearch, hakrawler, gau, waybackurls' },
                    { cat: 'Scanning', tools: 'nikto, whatweb, wafw00f, testssl.sh' },
                    { cat: 'Fuzzing', tools: 'wfuzz, feroxbuster, arjun, kiterunner' },
                    { cat: 'Exploitation', tools: 'sqlmap, commix, xsstrike, tplmap, nosqlmap, graphqlmap, jwt-tool, gopherus' },
                    { cat: 'Proxy', tools: 'mitmproxy, httpie' },
                    { cat: 'SSRF/CORS', tools: 'ssrfmap, corsy, crlfuzz' },
                    { cat: 'Resources', tools: 'PayloadsAllTheThings, SecLists' },
                  ].map((row) => (
                    <div key={row.cat} className="p-3 rounded-xl bg-gradient-to-r from-purple-500/5 to-transparent border border-purple-500/20">
                      <p className="text-sm font-medium text-purple-300">{row.cat}</p>
                      <p className="text-xs text-slate-400 mt-1 font-mono">{row.tools}</p>
                    </div>
                  ))}
                </div>
              </section>

              <ToolTable title="All Web tools" tools={webTools} />
              <ToolTable title="Core tools" tools={coreTools} />
              <ToolTable title="Network tools" tools={networkTools} />
              <ToolTable title="Credential tools" tools={credentialTools} />
            </div>
          )}

        </div>

        {activeTab === 'overview' ? (
          <SectionToc
            items={[
              { id: 'tldr', label: 'TL;DR' },
              { id: 'pull', label: 'Pull an image' },
              { id: 'comparison', label: 'Comparison' },
              { id: 'registries', label: 'Registry' },
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

/* ── Tool data ── */

const coreTools: Tool[] = [
  { name: 'vim', cmd: 'vim', desc: 'Text editor' },
  { name: 'nano', cmd: 'nano', desc: 'Text editor' },
  { name: 'neovim', cmd: 'nvim', desc: 'Text editor' },
  { name: 'tmux', cmd: 'tmux', desc: 'Terminal multiplexer' },
  { name: 'fzf', cmd: 'fzf', desc: 'Fuzzy finder' },
  { name: 'gdb', cmd: 'gdb', desc: 'GNU debugger' },
  { name: 'asciinema', cmd: 'asciinema', desc: 'Terminal recorder' },
  { name: 'whois', cmd: 'whois', desc: 'WHOIS lookup' },
  { name: 'nihil-history', cmd: 'nhi', desc: 'Pentest engagement knowledge manager' },
];

const adTools: Tool[] = [
  { name: 'bloodhound', cmd: 'bloodhound-python', desc: 'AD attack path visualization (ingestor)' },
  { name: 'bloodhound-ce-python', cmd: 'bloodhound-ce-python', desc: 'BloodHound CE Python ingestor' },
  { name: 'netexec', cmd: 'netexec', desc: 'SMB/LDAP/WinRM/SSH exploitation framework' },
  { name: 'impacket', cmd: 'secretsdump.py', desc: 'Windows protocol library (Fortra)' },
  { name: 'certipy', cmd: 'certipy', desc: 'ADCS enumeration and exploitation' },
  { name: 'bloodyAD', cmd: 'bloodyAD', desc: 'AD privilege escalation framework' },
  { name: 'ldapdomaindump', cmd: 'ldapdomaindump', desc: 'LDAP domain information dumper' },
  { name: 'adidnsdump', cmd: 'adidnsdump', desc: 'AD integrated DNS dumper' },
  { name: 'responder', cmd: 'responder', desc: 'LLMNR/NBT-NS/mDNS poisoner' },
  { name: 'mitm6', cmd: 'mitm6', desc: 'DHCPv6 spoofing for NTLM relay' },
  { name: 'coercer', cmd: 'coercer', desc: 'NTLM authentication coercion' },
  { name: 'kerbrute', cmd: 'kerbrute', desc: 'Kerberos brute-force / user enumeration' },
  { name: 'rusthound-ce', cmd: 'rusthound-ce', desc: 'BloodHound CE collector (Rust)' },
  { name: 'lsassy', cmd: 'lsassy', desc: 'Remote LSASS credential dumper' },
  { name: 'donpapi', cmd: 'DonPAPI', desc: 'DPAPI credential extraction' },
  { name: 'enum4linux-ng', cmd: 'enum4linux-ng', desc: 'SMB/RPC/LDAP enumeration' },
  { name: 'smbmap', cmd: 'smbmap', desc: 'SMB share enumeration' },
  { name: 'evil-winrm-py', cmd: 'evil-winrm-py', desc: 'WinRM shell (Python)' },
  { name: 'pywhisker', cmd: 'pywhisker', desc: 'Shadow credentials manipulation' },
  { name: 'krbrelayx', cmd: 'krbrelayx', desc: 'Kerberos relay attacks' },
  { name: 'aclpwn', cmd: 'aclpwn', desc: 'AD ACL exploitation' },
  { name: 'sprayhound', cmd: 'sprayhound', desc: 'Password spraying with BloodHound' },
  { name: 'windapsearch', cmd: 'windapsearch', desc: 'LDAP enumeration (Go)' },
  { name: 'pywerview', cmd: 'pywerview', desc: 'Python port of PowerView' },
  { name: 'ldapsearch-ad', cmd: 'ldapsearch-ad.py', desc: 'LDAP enumeration wrapper for AD' },
  { name: 'masky', cmd: 'masky', desc: 'ADCS-based credential extraction' },
  { name: 'manspider', cmd: 'manspider', desc: 'Search sensitive files across SMB shares' },
  { name: 'pre2k', cmd: 'pre2k', desc: 'Pre-Windows 2000 computer account exploitation' },
  { name: 'PKINITtools', cmd: 'gettgtpkinit', desc: 'PKINIT exploitation' },
  { name: 'noPac', cmd: 'noPac', desc: 'CVE-2021-42278/42287' },
  { name: 'PetitPotam', cmd: 'PetitPotam', desc: 'NTLM relay via EFS' },
  { name: 'zerologon', cmd: 'cve-2020-1472-exploit', desc: 'CVE-2020-1472' },
  { name: 'ShadowCoerce', cmd: 'ShadowCoerce', desc: 'Coercion via MS-FSRVP' },
  { name: 'DFSCoerce', cmd: 'DFSCoerce', desc: 'Coercion via MS-DFSNM' },
  { name: 'FindUncommonShares', cmd: 'FindUncommonShares', desc: 'Discover non-standard SMB shares' },
  { name: 'targetedKerberoast', cmd: 'targetedKerberoast', desc: 'Kerberoast via ACL abuse' },
  { name: 'gmsadumper', cmd: 'gmsadumper', desc: 'gMSA credential extraction' },
  { name: 'PowerShell', cmd: 'pwsh', desc: 'PowerShell 7' },
];

const webTools: Tool[] = [
  { name: 'sqlmap', cmd: 'sqlmap', desc: 'SQL injection testing' },
  { name: 'nuclei', cmd: 'nuclei', desc: 'Template-based vulnerability scanner' },
  { name: 'httpx', cmd: 'httpx', desc: 'HTTP probe and technology fingerprinting' },
  { name: 'subfinder', cmd: 'subfinder', desc: 'Passive subdomain enumeration' },
  { name: 'katana', cmd: 'katana', desc: 'Web crawler (ProjectDiscovery)' },
  { name: 'gobuster', cmd: 'gobuster', desc: 'Directory/subdomain brute-force' },
  { name: 'ffuf', cmd: 'ffuf', desc: 'Fast web fuzzer' },
  { name: 'dirsearch', cmd: 'dirsearch', desc: 'Directory brute-force' },
  { name: 'feroxbuster', cmd: 'feroxbuster', desc: 'Fast content discovery (Rust)' },
  { name: 'nikto', cmd: 'nikto', desc: 'Web server vulnerability scanner' },
  { name: 'wfuzz', cmd: 'wfuzz', desc: 'Web fuzzer' },
  { name: 'arjun', cmd: 'arjun', desc: 'HTTP parameter discovery' },
  { name: 'wafw00f', cmd: 'wafw00f', desc: 'WAF detection' },
  { name: 'whatweb', cmd: 'whatweb', desc: 'Web technology fingerprinting' },
  { name: 'testssl.sh', cmd: 'testssl.sh', desc: 'TLS/SSL configuration testing' },
  { name: 'mitmproxy', cmd: 'mitmproxy', desc: 'HTTP/HTTPS interception proxy' },
  { name: 'httpie', cmd: 'http', desc: 'User-friendly HTTP client' },
  { name: 'commix', cmd: 'commix', desc: 'OS command injection exploitation' },
  { name: 'xsstrike', cmd: 'xsstrike', desc: 'XSS detection and exploitation' },
  { name: 'tplmap', cmd: 'tplmap', desc: 'Server-Side Template Injection' },
  { name: 'nosqlmap', cmd: 'nosqlmap', desc: 'NoSQL injection exploitation' },
  { name: 'graphqlmap', cmd: 'graphqlmap', desc: 'GraphQL exploitation' },
  { name: 'jwt-tool', cmd: 'jwt-tool', desc: 'JWT manipulation and attacks' },
  { name: 'gopherus', cmd: 'gopherus3', desc: 'SSRF exploitation via Gopher' },
  { name: 'ssrfmap', cmd: 'ssrfmap', desc: 'SSRF exploitation framework' },
  { name: 'corsy', cmd: 'corsy', desc: 'CORS misconfiguration scanner' },
  { name: 'crlfuzz', cmd: 'crlfuzz', desc: 'CRLF injection testing' },
  { name: 'kiterunner', cmd: 'kr', desc: 'API endpoint discovery' },
  { name: 'hakrawler', cmd: 'hakrawler', desc: 'Web crawler for endpoint discovery' },
  { name: 'gau', cmd: 'gau', desc: 'Get All URLs (Wayback, Common Crawl)' },
  { name: 'waybackurls', cmd: 'waybackurls', desc: 'Fetch URLs from Wayback Machine' },
  { name: 'droopescan', cmd: 'droopescan', desc: 'Drupal/CMS scanner' },
  { name: 'cmsmap', cmd: 'cmsmap', desc: 'CMS exploitation' },
];

const networkTools: Tool[] = [
  { name: 'nmap', cmd: 'nmap', desc: 'Network scanner' },
  { name: 'netcat', cmd: 'nc', desc: 'Network utility (OpenBSD)' },
];

const credentialTools: Tool[] = [
  { name: 'hashcat', cmd: 'hashcat', desc: 'GPU password cracker' },
  { name: 'john', cmd: 'john', desc: 'Password cracker (John the Ripper)' },
  { name: 'pypykatz', cmd: 'pypykatz', desc: 'LSASS minidump parser (Python)' },
  { name: 'binwalk', cmd: 'binwalk', desc: 'Binary analysis / extraction' },
  { name: 'SecLists', cmd: '\u2014', desc: 'Security wordlists (/usr/share/seclists)' },
];

const pwnTools: Tool[] = [
  { name: 'radare2', cmd: 'r2', desc: 'Reverse engineering framework' },
  { name: 'pwntools', cmd: 'pwn', desc: 'CTF/exploit development library' },
  { name: 'ROPgadget', cmd: 'ROPgadget', desc: 'ROP gadget finder' },
  { name: 'strace', cmd: 'strace', desc: 'System call tracer' },
  { name: 'ltrace', cmd: 'ltrace', desc: 'Library call tracer' },
  { name: 'cmake', cmd: 'cmake', desc: 'Build system generator' },
];

const c2Tools: Tool[] = [
  { name: 'metasploit', cmd: 'msfconsole', desc: 'Exploitation framework' },
  { name: 'sliver', cmd: 'sliver-server', desc: 'C2 framework' },
];
