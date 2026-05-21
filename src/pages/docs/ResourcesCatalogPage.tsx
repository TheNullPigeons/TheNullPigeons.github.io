import React, { useState, useMemo } from 'react';

type Profile = 'full' | 'ad' | 'web' | 'ctf';
type Category = 'active-directory' | 'linux' | 'windows' | 'web';
type Kind = 'url' | 'release_asset' | 'submodule';

interface Resource {
  id: string;
  name: string;
  category: Category;
  profiles: Profile[];
  target: string;
  kind: Kind;
  enabled: boolean;
  notes: string;
  link?: string;
}

const ALL: Resource[] = [
  // Active Directory
  { id: 'powerview',         name: 'PowerView',              category: 'active-directory', profiles: ['full','ad'],             target: 'active-directory/enum/PowerView.ps1',             kind: 'url',           enabled: true,  notes: 'Classic AD enumeration helper.',                              link: 'https://github.com/PowerShellMafia/PowerSploit' },
  { id: 'inveigh',           name: 'Inveigh',                category: 'active-directory', profiles: ['full','ad'],             target: 'active-directory/relay/Inveigh.ps1',              kind: 'url',           enabled: true,  notes: 'PowerShell LLMNR/NBNS/mDNS/HTTP spoofing toolkit.',           link: 'https://github.com/Kevin-Robertson/Inveigh' },
  { id: 'inveigh-relay',     name: 'Inveigh-Relay',          category: 'active-directory', profiles: ['full','ad'],             target: 'active-directory/relay/Inveigh-Relay.ps1',        kind: 'url',           enabled: true,  notes: 'Relay-focused companion script for Inveigh.',                 link: 'https://github.com/Kevin-Robertson/Inveigh' },
  { id: 'powermad',          name: 'Powermad',               category: 'active-directory', profiles: ['full','ad'],             target: 'active-directory/modify/Powermad.ps1',            kind: 'url',           enabled: true,  notes: 'Machine-account and LDAP abuse helper for AD operations.',    link: 'https://github.com/Kevin-Robertson/Powermad' },
  { id: 'invoke-dnsupdate',  name: 'Invoke-DNSUpdate',       category: 'active-directory', profiles: ['full','ad'],             target: 'active-directory/modify/Invoke-DNSUpdate.ps1',    kind: 'url',           enabled: true,  notes: 'PowerMad helper for AD-integrated DNS record updates.',       link: 'https://github.com/Kevin-Robertson/Powermad' },
  { id: 'nopac',             name: 'noPac',                  category: 'active-directory', profiles: ['full','ad'],             target: 'active-directory/exploit/noPac.py',               kind: 'url',           enabled: true,  notes: 'CVE-2021-42278/42287 helper script.',                         link: 'https://github.com/Ridter/noPac' },
  { id: 'petitpotam',        name: 'PetitPotam',             category: 'active-directory', profiles: ['full','ad'],             target: 'active-directory/coerce/PetitPotam.py',           kind: 'url',           enabled: true,  notes: 'MS-EFSRPC coercion PoC.',                                     link: 'https://github.com/topotam/PetitPotam' },
  { id: 'dfscoerce',         name: 'DFSCoerce',              category: 'active-directory', profiles: ['full','ad'],             target: 'active-directory/coerce/dfscoerce.py',            kind: 'url',           enabled: true,  notes: 'MS-DFSNM coercion helper.',                                   link: 'https://github.com/Wh04m1001/DFSCoerce' },
  { id: 'shadowcoerce',      name: 'ShadowCoerce',           category: 'active-directory', profiles: ['full','ad'],             target: 'active-directory/coerce/shadowcoerce.py',         kind: 'url',           enabled: true,  notes: 'MS-FSRVP coercion helper.',                                   link: 'https://github.com/ShutdownRepo/ShadowCoerce' },
  { id: 'powersploit',       name: 'PowerSploit',            category: 'active-directory', profiles: ['full','ad'],             target: 'active-directory/PowerSploit',                    kind: 'submodule',     enabled: true,  notes: 'Post-exploitation PowerShell framework (PowerView, PowerUp, etc.).', link: 'https://github.com/PowerShellMafia/PowerSploit' },

  // Linux
  { id: 'lse',               name: 'Linux Smart Enumeration', category: 'linux',           profiles: ['full','ctf'],            target: 'linux/enum/lse.sh',                               kind: 'url',           enabled: true,  notes: 'Lightweight Linux enumeration script.',                        link: 'https://github.com/diego-treitos/linux-smart-enumeration' },
  { id: 'linpeas',           name: 'linPEAS',                category: 'linux',            profiles: ['full','ctf'],            target: 'linux/privesc/linpeas.sh',                        kind: 'url',           enabled: true,  notes: 'Linux privesc script tracking master branch.',                 link: 'https://github.com/carlospolop/PEASS-ng' },
  { id: 'linpeas-release',   name: 'linPEAS (latest release)', category: 'linux',          profiles: ['full','ad','ctf'],       target: 'linux/privesc/linPEAS/linpeas.sh',                kind: 'release_asset', enabled: true,  notes: 'Pinned to latest GitHub release. Preferred over the url entry.', link: 'https://github.com/carlospolop/PEASS-ng' },
  { id: 'linenum',           name: 'LinEnum',                category: 'linux',            profiles: ['full','ad','web','ctf'], target: 'linux/enum/LinEnum.sh',                           kind: 'url',           enabled: true,  notes: 'Classic Linux enumeration script.',                            link: 'https://github.com/rebootuser/LinEnum' },
  { id: 'deepce',            name: 'deepce',                 category: 'linux',            profiles: ['full','ad','web','ctf'], target: 'linux/privesc/deepce.sh',                         kind: 'url',           enabled: true,  notes: 'Container escape and Docker enumeration helper.',              link: 'https://github.com/stealthcopter/deepce' },
  { id: 'linikatz',          name: 'linikatz',               category: 'linux',            profiles: ['full','ad','ctf'],       target: 'linux/privesc/linikatz.sh',                       kind: 'url',           enabled: true,  notes: 'Lightweight Linux credential extraction helper.',              link: 'https://github.com/CiscoCXSecurity/linikatz' },
  { id: 'mimipenguin',       name: 'mimipenguin',            category: 'linux',            profiles: ['full','ad','web','ctf'], target: 'linux/enum/mimipenguin.py',                       kind: 'url',           enabled: true,  notes: 'Linux credential scraping helper.',                            link: 'https://github.com/huntergregal/mimipenguin' },
  { id: 'http-put-server',   name: 'http-put-server',        category: 'linux',            profiles: ['full','ad','web','ctf'], target: 'linux/transfer/http-put-server.py',               kind: 'url',           enabled: true,  notes: 'Minimal Python HTTP PUT server for quick file drops.' },
  { id: 'pspy64',            name: 'pspy64',                 category: 'linux',            profiles: ['full','ad','web','ctf'], target: 'linux/enum/pspy64',                               kind: 'url',           enabled: true,  notes: 'Monitor Linux processes without root privileges (x86_64).',    link: 'https://github.com/DominicBreuker/pspy' },
  { id: 'pspy32',            name: 'pspy32',                 category: 'linux',            profiles: ['full','ad','web','ctf'], target: 'linux/enum/pspy32',                               kind: 'url',           enabled: true,  notes: '32-bit pspy build.',                                           link: 'https://github.com/DominicBreuker/pspy' },
  { id: 'rustscan-linux',    name: 'RustScan (Linux x86_64)', category: 'linux',           profiles: ['full','ctf'],            target: 'linux/network/rustscan_linux_amd64.tar.gz.zip',   kind: 'release_asset', enabled: true,  notes: 'Fast port scanner. Unzip then tar -xzf to extract.',           link: 'https://github.com/RustScan/RustScan' },
  { id: 'ligolo-ng-agent-linux',     name: 'ligolo-ng agent (Linux x86_64)', category: 'linux', profiles: ['full','ad','web'], target: 'linux/pivot/ligolo-ng',                           kind: 'release_asset', enabled: true,  notes: 'Pivoting agent, dropped on a Linux foothold.',                 link: 'https://github.com/nicocha30/ligolo-ng' },
  { id: 'ligolo-ng-agent-linux-arm64', name: 'ligolo-ng agent (Linux ARM64)', category: 'linux', profiles: ['full','ad','web'], target: 'linux/pivot/ligolo-ng/arm64',                   kind: 'release_asset', enabled: true,  notes: 'Pivoting agent, dropped on a Linux ARM64 foothold.',           link: 'https://github.com/nicocha30/ligolo-ng' },

  // Windows
  { id: 'chisel-windows',    name: 'chisel (Windows amd64)', category: 'windows',          profiles: ['full','ad'],             target: 'windows/pivot/chisel_amd64.gz',                   kind: 'url',           enabled: true,  notes: 'TCP tunnel / SOCKS5 proxy. Gunzip before dropping.',           link: 'https://github.com/jpillora/chisel' },
  { id: 'nc64',              name: 'nc64.exe',               category: 'windows',          profiles: ['full','ad'],             target: 'windows/transfer/nc64.exe',                       kind: 'url',           enabled: true,  notes: 'Netcat for Windows 64-bit. Reverse shells and file transfers.' },
  { id: 'sharphound',        name: 'SharpHound',             category: 'windows',          profiles: ['full','ad'],             target: 'windows/enum/SharpHound_windows_x86.zip',         kind: 'url',           enabled: true,  notes: 'BloodHound CE data collector for Windows (v2.12.0, x86).',    link: 'https://github.com/SpecterOps/SharpHound' },
  { id: 'certify',           name: 'Certify',                category: 'windows',          profiles: ['full','ad'],             target: 'windows/adcs/Certify.exe',                        kind: 'url',           enabled: false, notes: 'GhostPack ADCS enum. No official release, compile from source.', link: 'https://github.com/GhostPack/Certify' },
  { id: 'rubeus',            name: 'Rubeus',                 category: 'windows',          profiles: ['full','ad'],             target: 'windows/kerberos/Rubeus.exe',                     kind: 'url',           enabled: false, notes: 'GhostPack Kerberos toolkit. No official release, compile from source.', link: 'https://github.com/GhostPack/Rubeus' },
  { id: 'winpeasx64',        name: 'winPEASx64',             category: 'windows',          profiles: ['full','ad'],             target: 'windows/privesc/winPEASx64.exe',                  kind: 'url',           enabled: true,  notes: 'Windows privilege-escalation enumeration binary.',             link: 'https://github.com/peass-ng/PEASS-ng' },
  { id: 'winpeas-bat',       name: 'winPEAS.bat',            category: 'windows',          profiles: ['full','ad'],             target: 'windows/privesc/winPEAS.bat',                     kind: 'url',           enabled: true,  notes: 'Batch wrapper for quick Windows enumeration.',                 link: 'https://github.com/peass-ng/PEASS-ng' },
  { id: 'winpeas-ps1',       name: 'winPEAS.ps1',            category: 'windows',          profiles: ['full','ad'],             target: 'windows/privesc/winPEAS.ps1',                     kind: 'url',           enabled: true,  notes: 'PowerShell winPEAS variant.',                                  link: 'https://github.com/peass-ng/PEASS-ng' },
  { id: 'powerup',           name: 'PowerUp',                category: 'windows',          profiles: ['full','ad'],             target: 'windows/privesc/PowerUp.ps1',                     kind: 'url',           enabled: true,  notes: 'Windows privilege-escalation helper from PowerSploit.',        link: 'https://github.com/PowerShellMafia/PowerSploit' },
  { id: 'invoke-powershelltcp', name: 'Invoke-PowerShellTcp', category: 'windows',         profiles: ['full','ad'],             target: 'windows/shells/Invoke-PowerShellTcp.ps1',         kind: 'url',           enabled: true,  notes: 'Simple PowerShell reverse shell from Nishang.',                link: 'https://github.com/samratashok/nishang' },
  { id: 'winpeas-x64',       name: 'winPEAS x64 (release)',  category: 'windows',          profiles: ['full','ad'],             target: 'windows/privesc/winPEAS/winPEASx64.exe',          kind: 'release_asset', enabled: true,  notes: 'Windows privesc script, pinned to latest release.',            link: 'https://github.com/peass-ng/PEASS-ng' },
  { id: 'godpotato-net4',    name: 'GodPotato (.NET 4)',     category: 'windows',          profiles: ['full','ad'],             target: 'windows/privesc/GodPotato-NET4.exe',              kind: 'release_asset', enabled: true,  notes: 'Abuse SeImpersonatePrivilege on recent Windows.',              link: 'https://github.com/BeichenDream/GodPotato' },
  { id: 'printspoofer-x64',  name: 'PrintSpoofer (x64)',     category: 'windows',          profiles: ['full','ad'],             target: 'windows/privesc/PrintSpoofer64.exe',              kind: 'release_asset', enabled: true,  notes: 'SeImpersonatePrivilege escalation via print spooler.',         link: 'https://github.com/itm4n/PrintSpoofer' },
  { id: 'ligolo-ng-agent-windows', name: 'ligolo-ng agent (Windows)', category: 'windows', profiles: ['full','ad'],             target: 'windows/pivot/ligolo-ng',                         kind: 'release_asset', enabled: true,  notes: 'Pivoting agent, dropped on a Windows foothold.',               link: 'https://github.com/nicocha30/ligolo-ng' },
  { id: 'mimikatz-src',      name: 'mimikatz (source)',      category: 'windows',          profiles: ['full','ad'],             target: 'windows/credentials/mimikatz',                    kind: 'submodule',     enabled: true,  notes: 'Windows credential extraction toolkit source tree.',           link: 'https://github.com/gentilkiwi/mimikatz' },
  { id: 'mimikatz',          name: 'mimikatz (binaries)',    category: 'windows',          profiles: ['full','ad'],             target: 'windows/credentials/mimikatz-bin',                kind: 'release_asset', enabled: true,  notes: 'Precompiled mimikatz binaries (x64, Win32, mimidrv.sys).',     link: 'https://github.com/gentilkiwi/mimikatz' },
  { id: 'privesccheck',      name: 'PrivescCheck',           category: 'windows',          profiles: ['full','ad'],             target: 'windows/privesc/PrivescCheck',                    kind: 'submodule',     enabled: true,  notes: 'Privilege escalation enumeration script for Windows.',         link: 'https://github.com/itm4n/PrivescCheck' },
  { id: 'sharpcollection',   name: 'SharpCollection',        category: 'windows',          profiles: ['full','ad'],             target: 'windows/binaries/SharpCollection',                kind: 'submodule',     enabled: true,  notes: 'Nightly builds of common C# offensive tools.',                 link: 'https://github.com/Flangvik/SharpCollection' },

  // Web
  { id: 'p0wny-shell',       name: 'p0wny-shell',            category: 'web',              profiles: ['full','web','ctf'],      target: 'web/webshells/p0wny-shell.php',                   kind: 'url',           enabled: true,  notes: 'Single-file PHP shell.',                                       link: 'https://github.com/flozz/p0wny-shell' },
  { id: 'php-reverse-shell', name: 'php-reverse-shell',      category: 'web',              profiles: ['full','web','ctf'],      target: 'web/webshells/php-reverse-shell.php',             kind: 'url',           enabled: true,  notes: 'Classic PHP reverse shell.',                                   link: 'https://github.com/pentestmonkey/php-reverse-shell' },
  { id: 'aspx-shell',        name: 'ASPX Shell',             category: 'web',              profiles: ['full','web','ctf'],      target: 'web/webshells/ASPX-Shell.aspx',                   kind: 'url',           enabled: true,  notes: 'Simple ASPX shell.' },
  { id: 'cmdjsp',            name: 'cmdjsp',                 category: 'web',              profiles: ['full','web','ctf'],      target: 'web/webshells/cmdjsp.jsp',                        kind: 'url',           enabled: true,  notes: 'Minimal JSP command shell.' },
  { id: 'devilzshell-jsp',   name: 'devilzShell JSP',        category: 'web',              profiles: ['full','web','ctf'],      target: 'web/webshells/devilzShell.jsp',                   kind: 'url',           enabled: true,  notes: 'JSP shell variant.' },
  { id: 'write-aspx-file-ashx', name: 'write_aspx_file.ashx', category: 'web',            profiles: ['full','web','ctf'],      target: 'web/webshells/write_aspx_file.ashx',              kind: 'url',           enabled: true,  notes: 'ASHX handler that writes an ASPX shell.' },
  { id: 'p0wny-shell-repo',  name: 'p0wny-shell (repo)',     category: 'web',              profiles: ['full','web','ctf'],      target: 'web/webshells/p0wny-shell',                       kind: 'submodule',     enabled: true,  notes: 'Full p0wny-shell repo as submodule for reproducibility.',      link: 'https://github.com/flozz/p0wny-shell' },

];

const CATEGORIES: Category[] = ['active-directory', 'linux', 'windows', 'web'];

const PROFILE_COLORS: Record<Profile, string> = {
  full: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  ad:   'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
  web:  'bg-purple-500/15 text-purple-300 border-purple-500/30',
  ctf:  'bg-rose-500/15 text-rose-300 border-rose-500/30',
};

const CATEGORY_COLORS: Record<Category, string> = {
  'active-directory': 'bg-cyan-500/15 text-cyan-300',
  'linux':            'bg-emerald-500/15 text-emerald-300',
  'windows':          'bg-blue-500/15 text-blue-300',
  'web':              'bg-purple-500/15 text-purple-300',
};

const KIND_COLORS: Record<Kind, string> = {
  url:           'bg-slate-500/20 text-slate-400',
  release_asset: 'bg-green-500/15 text-green-300',
  submodule:     'bg-indigo-500/15 text-indigo-300',
};

const KIND_LABELS: Record<Kind, string> = {
  url:           'url',
  release_asset: 'release',
  submodule:     'submodule',
};

const ENABLED_COUNT = ALL.filter((r) => r.enabled).length;

export const ResourcesCatalogPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [activeProfile, setActiveProfile] = useState<Profile | null>(null);
  const [showDisabled, setShowDisabled] = useState(false);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return ALL.filter((r) => {
      if (!showDisabled && !r.enabled) return false;
      if (activeCategory && r.category !== activeCategory) return false;
      if (activeProfile && !r.profiles.includes(activeProfile)) return false;
      if (q && !r.name.toLowerCase().includes(q) && !r.target.toLowerCase().includes(q) && !r.notes.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [search, activeCategory, activeProfile, showDisabled]);

  return (
    <div className="space-y-6 w-full">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          Docs / <span className="text-amber-400">Resource Catalog</span>
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Resource Catalog</h1>
        <p className="text-slate-400 text-sm max-w-2xl">
          {ENABLED_COUNT} resources enabled in the nihil-resources catalog. Mounted read-only
          at <code className="text-amber-300">/opt/resources</code> inside every container.
        </p>
      </header>

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Search by name, path or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-lg px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/60"
        />

        <div className="flex flex-wrap gap-2">
          {(['full','ad','web','ctf'] as Profile[]).map((p) => (
            <button
              key={p}
              onClick={() => setActiveProfile(activeProfile === p ? null : p)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${
                activeProfile === p
                  ? PROFILE_COLORS[p]
                  : 'bg-transparent border-slate-700 text-slate-500 hover:border-slate-500 hover:text-slate-300'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                activeCategory === cat
                  ? `${CATEGORY_COLORS[cat]} border-current`
                  : 'bg-transparent border-slate-700 text-slate-500 hover:border-slate-500 hover:text-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-500">
            {filtered.length === ALL.length
              ? `${ALL.length} resources`
              : `${filtered.length} / ${ALL.length} resources`}
          </p>
          <label className="flex items-center gap-2 text-xs text-slate-500 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showDisabled}
              onChange={(e) => setShowDisabled(e.target.checked)}
              className="accent-amber-400"
            />
            Show disabled
          </label>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-slate-700/80 bg-slate-900/60">
              <th className="text-left py-2.5 px-4 text-slate-400 font-medium text-xs">Resource</th>
              <th className="text-left py-2.5 px-4 text-slate-400 font-medium text-xs">Target path</th>
              <th className="text-left py-2.5 px-4 text-slate-400 font-medium text-xs">Description</th>
              <th className="text-left py-2.5 px-4 text-slate-400 font-medium text-xs">Category</th>
              <th className="text-left py-2.5 px-4 text-slate-400 font-medium text-xs">Kind</th>
              <th className="text-left py-2.5 px-4 text-slate-400 font-medium text-xs">Profiles</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-500 text-sm">
                  No resources match your filters.
                </td>
              </tr>
            ) : filtered.map((r) => (
              <tr
                key={r.id}
                className={`border-b border-slate-800/50 transition-colors ${
                  r.enabled ? 'hover:bg-slate-900/40' : 'opacity-50 hover:opacity-70'
                }`}
              >
                <td className="py-2.5 px-4 font-medium text-slate-200 text-xs whitespace-nowrap">
                  {r.link ? (
                    <a href={r.link} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
                      {r.name}
                    </a>
                  ) : r.name}
                  {!r.enabled && (
                    <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-slate-700/60 text-slate-500 font-mono">
                      disabled
                    </span>
                  )}
                </td>
                <td className="py-2.5 px-4 font-mono text-amber-300 text-[11px] max-w-[240px]">
                  <span className="block truncate" title={r.target}>{r.target}</span>
                </td>
                <td className="py-2.5 px-4 text-slate-400 text-xs max-w-[260px]">{r.notes}</td>
                <td className="py-2.5 px-4 whitespace-nowrap">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${CATEGORY_COLORS[r.category]}`}>
                    {r.category}
                  </span>
                </td>
                <td className="py-2.5 px-4 whitespace-nowrap">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${KIND_COLORS[r.kind]}`}>
                    {KIND_LABELS[r.kind]}
                  </span>
                </td>
                <td className="py-2.5 px-4">
                  <div className="flex flex-wrap gap-1">
                    {r.profiles.map((p) => (
                      <span key={p} className={`text-[10px] px-1.5 py-0.5 rounded border font-mono ${PROFILE_COLORS[p]}`}>
                        {p}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
