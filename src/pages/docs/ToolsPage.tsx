import React, { useState, useMemo } from 'react';

type ImageTag = 'full' | 'ad' | 'web' | 'blueteam';
type Category =
  | 'Core'
  | 'Active Directory'
  | 'Web'
  | 'Network'
  | 'Credential'
  | 'Pwn'
  | 'Reverse Engineering'
  | 'Crypto'
  | 'Forensics'
  | 'Blue Team'
  | 'C2'
  | 'Misc'
  | 'Wordlists';

interface Tool {
  name: string;
  cmd: string;
  desc: string;
  category: Category;
  images: ImageTag[];
  link?: string;
}

const ALL: Tool[] = [
  // Core
  { name: 'vim',          cmd: 'vim',          desc: 'Text editor',                              category: 'Core', images: ['full','ad','web','blueteam'] },
  { name: 'nano',         cmd: 'nano',         desc: 'Text editor',                              category: 'Core', images: ['full','ad','web','blueteam'] },
  { name: 'neovim',       cmd: 'nvim',         desc: 'Text editor',                              category: 'Core', images: ['full','ad','web','blueteam'], link: 'https://github.com/neovim/neovim' },
  { name: 'tmux',         cmd: 'tmux',         desc: 'Terminal multiplexer',                     category: 'Core', images: ['full','ad','web','blueteam'], link: 'https://github.com/tmux/tmux' },
  { name: 'fzf',          cmd: 'fzf',          desc: 'Fuzzy finder',                             category: 'Core', images: ['full','ad','web','blueteam'], link: 'https://github.com/junegunn/fzf' },
  { name: 'zoxide',       cmd: 'z',            desc: 'Smart directory navigation',               category: 'Core', images: ['full','ad','web','blueteam'], link: 'https://github.com/ajeetdsouza/zoxide' },
  { name: 'gdb',          cmd: 'gdb',          desc: 'GNU debugger',                             category: 'Core', images: ['full','ad','web','blueteam'] },
  { name: 'asciinema',    cmd: 'asciinema',    desc: 'Terminal session recorder',                category: 'Core', images: ['full','ad','web','blueteam'], link: 'https://github.com/asciinema/asciinema' },
  { name: 'whois',        cmd: 'whois',        desc: 'WHOIS lookup',                             category: 'Core', images: ['full','ad','web','blueteam'] },
  { name: 'nihil-history',cmd: 'nhi',          desc: 'Pentest engagement knowledge manager',     category: 'Core', images: ['full','ad','web','blueteam'], link: 'https://github.com/TheNullPigeons/nihil-history' },

  // Active Directory
  { name: 'bloodhound',          cmd: 'bloodhound-python',     desc: 'AD attack path visualization (ingestor)',  category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/dirkjanm/BloodHound.py' },
  { name: 'bloodhound-ce-python',cmd: 'bloodhound-ce-python',  desc: 'BloodHound CE Python ingestor',            category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/dirkjanm/BloodHound.py' },
  { name: 'bloodhound-ce',       cmd: 'bloodhound-ce',         desc: 'BloodHound CE desktop client',             category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/SpecterOps/BloodHound' },
  { name: 'netexec',             cmd: 'netexec',               desc: 'SMB/LDAP/WinRM/SSH exploitation framework',category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/Pennyw0rth/NetExec' },
  { name: 'impacket',            cmd: 'secretsdump.py',        desc: 'Windows protocol library (Fortra)',        category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/fortra/impacket' },
  { name: 'certipy',             cmd: 'certipy',               desc: 'ADCS enumeration and exploitation',        category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/ly4k/Certipy' },
  { name: 'bloodyAD',            cmd: 'bloodyAD',              desc: 'AD privilege escalation framework',        category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/CravateRouge/bloodyAD' },
  { name: 'ldapdomaindump',      cmd: 'ldapdomaindump',        desc: 'LDAP domain information dumper',           category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/dirkjanm/ldapdomaindump' },
  { name: 'adidnsdump',          cmd: 'adidnsdump',            desc: 'AD integrated DNS dumper',                 category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/dirkjanm/adidnsdump' },
  { name: 'responder',           cmd: 'responder',             desc: 'LLMNR/NBT-NS/mDNS poisoner',              category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/lgandx/Responder' },
  { name: 'mitm6',               cmd: 'mitm6',                 desc: 'DHCPv6 spoofing for NTLM relay',          category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/dirkjanm/mitm6' },
  { name: 'coercer',             cmd: 'coercer',               desc: 'NTLM authentication coercion',            category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/p0dalirius/Coercer' },
  { name: 'kerbrute',            cmd: 'kerbrute',              desc: 'Kerberos brute-force / user enumeration',  category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/ropnop/kerbrute' },
  { name: 'rusthound-ce',        cmd: 'rusthound-ce',          desc: 'BloodHound CE collector (Rust)',           category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/NH-RED-TEAM/RustHound' },
  { name: 'lsassy',              cmd: 'lsassy',                desc: 'Remote LSASS credential dumper',          category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/Hackndo/lsassy' },
  { name: 'donpapi',             cmd: 'DonPAPI',               desc: 'DPAPI credential extraction',             category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/login-securite/DonPAPI' },
  { name: 'enum4linux-ng',       cmd: 'enum4linux-ng',         desc: 'SMB/RPC/LDAP enumeration',               category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/cddmp/enum4linux-ng' },
  { name: 'smbmap',              cmd: 'smbmap',                desc: 'SMB share enumeration',                   category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/ShawnDEvans/smbmap' },
  { name: 'evil-winrm-py',       cmd: 'evil-winrm-py',         desc: 'WinRM shell (Python)',                    category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/Hackplayers/evil-winrm' },
  { name: 'pywhisker',           cmd: 'pywhisker',             desc: 'Shadow credentials manipulation',         category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/ShutdownRepo/pywhisker' },
  { name: 'krbrelayx',           cmd: 'krbrelayx',             desc: 'Kerberos relay attacks',                  category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/dirkjanm/krbrelayx' },
  { name: 'aclpwn',              cmd: 'aclpwn',                desc: 'AD ACL exploitation',                     category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/aas-n/aclpwn.py' },
  { name: 'sprayhound',          cmd: 'sprayhound',            desc: 'Password spraying with BloodHound',       category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/Hackndo/sprayhound' },
  { name: 'windapsearch',        cmd: 'windapsearch',          desc: 'LDAP enumeration (Go)',                   category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/ropnop/windapsearch' },
  { name: 'pywerview',           cmd: 'pywerview',             desc: 'Python port of PowerView',                category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/the-useless-one/pywerview' },
  { name: 'ldapsearch-ad',       cmd: 'ldapsearch-ad.py',      desc: 'LDAP enumeration wrapper for AD',         category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/yaap7/ldapsearch-ad' },
  { name: 'masky',               cmd: 'masky',                 desc: 'ADCS-based credential extraction',        category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/Z4kSec/Masky' },
  { name: 'manspider',           cmd: 'manspider',             desc: 'Search sensitive files across SMB shares', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/blacklanternsecurity/MANSPIDER' },
  { name: 'pre2k',               cmd: 'pre2k',                 desc: 'Pre-Windows 2000 computer account exploitation', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/garrettfoster13/pre2k' },
  { name: 'PKINITtools',         cmd: 'gettgtpkinit',          desc: 'PKINIT exploitation',                     category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/dirkjanm/PKINITtools' },
  { name: 'noPac',               cmd: 'noPac',                 desc: 'CVE-2021-42278/42287',                    category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/Ridter/noPac' },
  { name: 'PetitPotam',          cmd: 'PetitPotam',            desc: 'NTLM relay via EFS',                      category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/topotam/PetitPotam' },
  { name: 'zerologon',           cmd: 'cve-2020-1472-exploit', desc: 'CVE-2020-1472',                           category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/SecuraBV/CVE-2020-1472' },
  { name: 'ShadowCoerce',        cmd: 'ShadowCoerce',          desc: 'Coercion via MS-FSRVP',                   category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/ShutdownRepo/ShadowCoerce' },
  { name: 'DFSCoerce',           cmd: 'DFSCoerce',             desc: 'Coercion via MS-DFSNM',                   category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/Wh04m1001/DFSCoerce' },
  { name: 'FindUncommonShares',  cmd: 'FindUncommonShares',    desc: 'Discover non-standard SMB shares',        category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/p0dalirius/FindUncommonShares' },
  { name: 'targetedKerberoast',  cmd: 'targetedKerberoast',    desc: 'Kerberoast via ACL abuse',                category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/ShutdownRepo/targetedKerberoast' },
  { name: 'gmsadumper',          cmd: 'gmsadumper',            desc: 'gMSA credential extraction',              category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/micahvandeusen/gMSADumper' },
  { name: 'openldap',            cmd: 'ldapsearch',            desc: 'LDAP command-line utilities',             category: 'Active Directory', images: ['full','ad'] },
  { name: 'smbclient',           cmd: 'smbclient',             desc: 'SMB command-line client',                 category: 'Active Directory', images: ['full','ad'] },
  { name: 'PowerShell',          cmd: 'pwsh',                  desc: 'PowerShell 7',                            category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/PowerShell/PowerShell' },

  // Web
  { name: 'sqlmap',        cmd: 'sqlmap',       desc: 'SQL injection testing',                       category: 'Web', images: ['full','web'], link: 'https://github.com/sqlmapproject/sqlmap' },
  { name: 'nuclei',        cmd: 'nuclei',       desc: 'Template-based vulnerability scanner',        category: 'Web', images: ['full','web'], link: 'https://github.com/projectdiscovery/nuclei' },
  { name: 'httpx',         cmd: 'httpx',        desc: 'HTTP probe and technology fingerprinting',    category: 'Web', images: ['full','web'], link: 'https://github.com/projectdiscovery/httpx' },
  { name: 'subfinder',     cmd: 'subfinder',    desc: 'Passive subdomain enumeration',               category: 'Web', images: ['full','web'], link: 'https://github.com/projectdiscovery/subfinder' },
  { name: 'katana',        cmd: 'katana',       desc: 'Web crawler (ProjectDiscovery)',              category: 'Web', images: ['full','web'], link: 'https://github.com/projectdiscovery/katana' },
  { name: 'gobuster',      cmd: 'gobuster',     desc: 'Directory/subdomain brute-force',             category: 'Web', images: ['full','web'], link: 'https://github.com/OJ/gobuster' },
  { name: 'ffuf',          cmd: 'ffuf',         desc: 'Fast web fuzzer',                             category: 'Web', images: ['full','web'], link: 'https://github.com/ffuf/ffuf' },
  { name: 'dirsearch',     cmd: 'dirsearch',    desc: 'Directory brute-force',                       category: 'Web', images: ['full','web'], link: 'https://github.com/maurosoria/dirsearch' },
  { name: 'feroxbuster',   cmd: 'feroxbuster',  desc: 'Fast content discovery (Rust)',               category: 'Web', images: ['full','web'], link: 'https://github.com/epi052/feroxbuster' },
  { name: 'nikto',         cmd: 'nikto',        desc: 'Web server vulnerability scanner',            category: 'Web', images: ['full','web'], link: 'https://github.com/sullo/nikto' },
  { name: 'wfuzz',         cmd: 'wfuzz',        desc: 'Web fuzzer',                                  category: 'Web', images: ['full','web'], link: 'https://github.com/xmendez/wfuzz' },
  { name: 'arjun',         cmd: 'arjun',        desc: 'HTTP parameter discovery',                    category: 'Web', images: ['full','web'], link: 'https://github.com/s0md3v/Arjun' },
  { name: 'wafw00f',       cmd: 'wafw00f',      desc: 'WAF detection',                               category: 'Web', images: ['full','web'], link: 'https://github.com/EnableSecurity/wafw00f' },
  { name: 'whatweb',       cmd: 'whatweb',      desc: 'Web technology fingerprinting',               category: 'Web', images: ['full','web'], link: 'https://github.com/urbanadventurer/WhatWeb' },
  { name: 'testssl.sh',    cmd: 'testssl.sh',   desc: 'TLS/SSL configuration testing',              category: 'Web', images: ['full','web'], link: 'https://github.com/drwetter/testssl.sh' },
  { name: 'mitmproxy',     cmd: 'mitmproxy',    desc: 'HTTP/HTTPS interception proxy',              category: 'Web', images: ['full','web'], link: 'https://github.com/mitmproxy/mitmproxy' },
  { name: 'httpie',        cmd: 'http',         desc: 'User-friendly HTTP client',                   category: 'Web', images: ['full','web'], link: 'https://github.com/httpie/cli' },
  { name: 'commix',        cmd: 'commix',       desc: 'OS command injection exploitation',           category: 'Web', images: ['full','web'], link: 'https://github.com/commixproject/commix' },
  { name: 'xsstrike',      cmd: 'xsstrike',     desc: 'XSS detection and exploitation',             category: 'Web', images: ['full','web'], link: 'https://github.com/s0md3v/XSStrike' },
  { name: 'tplmap',        cmd: 'tplmap',       desc: 'Server-Side Template Injection',             category: 'Web', images: ['full','web'], link: 'https://github.com/epinna/tplmap' },
  { name: 'nosqlmap',      cmd: 'nosqlmap',     desc: 'NoSQL injection exploitation',               category: 'Web', images: ['full','web'], link: 'https://github.com/codingo/NoSQLMap' },
  { name: 'graphqlmap',    cmd: 'graphqlmap',   desc: 'GraphQL exploitation',                        category: 'Web', images: ['full','web'], link: 'https://github.com/swisskyrepo/GraphQLmap' },
  { name: 'jwt-tool',      cmd: 'jwt-tool',     desc: 'JWT manipulation and attacks',               category: 'Web', images: ['full','web'], link: 'https://github.com/ticarpi/jwt_tool' },
  { name: 'gopherus',      cmd: 'gopherus3',    desc: 'SSRF exploitation via Gopher',               category: 'Web', images: ['full','web'], link: 'https://github.com/tarunkant/Gopherus' },
  { name: 'ssrfmap',       cmd: 'ssrfmap',      desc: 'SSRF exploitation framework',                category: 'Web', images: ['full','web'], link: 'https://github.com/swisskyrepo/SSRFmap' },
  { name: 'corsy',         cmd: 'corsy',        desc: 'CORS misconfiguration scanner',              category: 'Web', images: ['full','web'], link: 'https://github.com/s0md3v/Corsy' },
  { name: 'crlfuzz',       cmd: 'crlfuzz',      desc: 'CRLF injection testing',                     category: 'Web', images: ['full','web'], link: 'https://github.com/dwisiswant0/crlfuzz' },
  { name: 'kiterunner',    cmd: 'kr',           desc: 'API endpoint discovery',                      category: 'Web', images: ['full','web'], link: 'https://github.com/assetnote/kiterunner' },
  { name: 'hakrawler',     cmd: 'hakrawler',    desc: 'Web crawler for endpoint discovery',         category: 'Web', images: ['full','web'], link: 'https://github.com/hakluke/hakrawler' },
  { name: 'gau',           cmd: 'gau',          desc: 'Get All URLs (Wayback, Common Crawl)',        category: 'Web', images: ['full','web'], link: 'https://github.com/lc/gau' },
  { name: 'waybackurls',   cmd: 'waybackurls',  desc: 'Fetch URLs from Wayback Machine',            category: 'Web', images: ['full','web'], link: 'https://github.com/tomnomnom/waybackurls' },
  { name: 'droopescan',    cmd: 'droopescan',   desc: 'Drupal/CMS scanner',                         category: 'Web', images: ['full','web'], link: 'https://github.com/SamJoan/droopescan' },
  { name: 'cmsmap',        cmd: 'cmsmap',       desc: 'CMS exploitation',                            category: 'Web', images: ['full','web'], link: 'https://github.com/Dionach/CMSmap' },
  { name: 'caido-desktop', cmd: 'caido',        desc: 'Caido desktop security auditing toolkit (UI)', category: 'Web', images: ['full','web'], link: 'https://github.com/caido/caido' },
  { name: 'caido-cli',     cmd: 'caido-cli',    desc: 'Caido command-line interface',               category: 'Web', images: ['full','web'], link: 'https://github.com/caido/caido' },

  // Network
  { name: 'nmap',          cmd: 'nmap',         desc: 'Network scanner',                             category: 'Network', images: ['full','ad','web','blueteam'], link: 'https://github.com/nmap/nmap' },
  { name: 'netcat',        cmd: 'nc',           desc: 'Network utility (OpenBSD)',                   category: 'Network', images: ['full','ad','web','blueteam'] },
  { name: 'socat',         cmd: 'socat',        desc: 'Multipurpose network relay',                  category: 'Network', images: ['full','ad','web','blueteam'] },
  { name: 'wireshark-cli', cmd: 'tshark',       desc: 'Network protocol analyzer (CLI)',             category: 'Network', images: ['full','ad','web','blueteam'], link: 'https://github.com/wireshark/wireshark' },
  { name: 'bettercap',     cmd: 'bettercap',    desc: 'Network attack and monitoring framework',     category: 'Network', images: ['full','ad','web','blueteam'], link: 'https://github.com/bettercap/bettercap' },
  { name: 'fping',         cmd: 'fping',        desc: 'Fast ICMP host discovery',                    category: 'Network', images: ['full','ad','web','blueteam'] },
  { name: 'udpx',          cmd: 'udpx',         desc: 'Fast UDP port scanner',                       category: 'Network', images: ['full','ad','web','blueteam'], link: 'https://github.com/nullt3r/udpx' },
  { name: 'zone-dnsenum',  cmd: 'zone-dnsenum', desc: 'DNS zone transfer / enumeration',            category: 'Network', images: ['full','ad','web','blueteam'], link: 'https://github.com/Goultarde/Zone-DNSenum' },
  { name: 'ligolo-ng',     cmd: 'ligolo-ng',    desc: 'Tunneling/pivoting proxy',                   category: 'Network', images: ['full','ad','web','blueteam'], link: 'https://github.com/nicocha30/ligolo-ng' },

  // Credential
  { name: 'hashcat',   cmd: 'hashcat',   desc: 'GPU password cracker',             category: 'Credential', images: ['full','ad','web'], link: 'https://github.com/hashcat/hashcat' },
  { name: 'john',      cmd: 'john',      desc: 'Password cracker (John the Ripper)', category: 'Credential', images: ['full','ad','web'], link: 'https://github.com/openwall/john' },
  { name: 'pypykatz',  cmd: 'pypykatz',  desc: 'LSASS minidump parser (Python)',    category: 'Credential', images: ['full','ad','web'], link: 'https://github.com/skelsec/pypykatz' },
  { name: 'binwalk',   cmd: 'binwalk',   desc: 'Binary analysis / extraction',      category: 'Credential', images: ['full','ad','web'], link: 'https://github.com/ReFirmLabs/binwalk' },

  // Pwn
  { name: 'radare2',       cmd: 'r2',          desc: 'Reverse engineering framework',             category: 'Pwn', images: ['full'], link: 'https://github.com/radareorg/radare2' },
  { name: 'pwndbg',        cmd: 'pwndbg',      desc: 'GDB helper plugin',                         category: 'Pwn', images: ['full'], link: 'https://github.com/pwndbg/pwndbg' },
  { name: 'pwntools',      cmd: 'pwn',         desc: 'Exploit development library',               category: 'Pwn', images: ['full'], link: 'https://github.com/Gallopsled/pwntools' },
  { name: 'ROPgadget',     cmd: 'ROPgadget',   desc: 'ROP gadget finder',                         category: 'Pwn', images: ['full'], link: 'https://github.com/JonathanSalwan/ROPgadget' },
  { name: 'one_gadget',    cmd: 'one_gadget',  desc: 'One-gadget RCE finder for libc',            category: 'Pwn', images: ['full'], link: 'https://github.com/david942j/one_gadget' },
  { name: 'seccomp-tools', cmd: 'seccomp-tools',desc: 'Seccomp filter analyzer',                  category: 'Pwn', images: ['full'], link: 'https://github.com/david942j/seccomp-tools' },
  { name: 'checksec',      cmd: 'checksec',    desc: 'Binary security property checker',          category: 'Pwn', images: ['full'], link: 'https://github.com/slimm609/checksec' },
  { name: 'strace',        cmd: 'strace',      desc: 'System call tracer',                        category: 'Pwn', images: ['full'] },
  { name: 'ltrace',        cmd: 'ltrace',      desc: 'Library call tracer',                       category: 'Pwn', images: ['full'] },
  { name: 'cmake',         cmd: 'cmake',       desc: 'Build system generator',                    category: 'Pwn', images: ['full'] },

  // C2
  { name: 'metasploit', cmd: 'msfconsole',   desc: 'Exploitation framework',  category: 'C2', images: ['full','ad'], link: 'https://github.com/rapid7/metasploit-framework' },
  { name: 'sliver',     cmd: 'sliver-server',desc: 'C2 framework',            category: 'C2', images: ['full','ad'], link: 'https://github.com/BishopFox/sliver' },

  // Reverse Engineering
  { name: 'ghidra',      cmd: 'ghidra',      desc: 'NSA reverse engineering suite',         category: 'Reverse Engineering', images: ['full'], link: 'https://github.com/NationalSecurityAgency/ghidra' },
  { name: 'angr',        cmd: 'angr',        desc: 'Symbolic execution and binary analysis', category: 'Reverse Engineering', images: ['full'], link: 'https://github.com/angr/angr' },
  { name: 'pycdc',       cmd: 'pycdc',       desc: 'Python bytecode decompiler',            category: 'Reverse Engineering', images: ['full'], link: 'https://github.com/zrax/pycdc' },
  { name: 'uncompyle6',  cmd: 'uncompyle6',  desc: 'Python 2/3 bytecode decompiler',        category: 'Reverse Engineering', images: ['full'], link: 'https://github.com/rocky/python-uncompyle6' },

  // Crypto
  { name: 'RsaCtfTool',    cmd: 'RsaCtfTool',  desc: 'RSA attack automation',         category: 'Crypto', images: ['full'], link: 'https://github.com/RsaCtfTool/RsaCtfTool' },
  { name: 'xortool',       cmd: 'xortool',     desc: 'XOR cipher analysis',            category: 'Crypto', images: ['full'], link: 'https://github.com/hellman/xortool' },
  { name: 'z3-solver',     cmd: 'z3-solver',   desc: 'SMT constraint solver',          category: 'Crypto', images: ['full'], link: 'https://github.com/Z3Prover/z3' },
  { name: 'pycryptodome',  cmd: 'pycryptodome',desc: 'Python crypto library',          category: 'Crypto', images: ['full'], link: 'https://github.com/Legrandin/pycryptodome' },
  { name: 'hashid',        cmd: 'hashid',      desc: 'Hash type identifier',           category: 'Crypto', images: ['full'], link: 'https://github.com/psypanda/hashID' },

  // Forensics
  { name: 'volatility3', cmd: 'vol',        desc: 'Memory forensics framework',      category: 'Forensics', images: ['full','blueteam'], link: 'https://github.com/volatilityfoundation/volatility3' },
  { name: 'foremost',    cmd: 'foremost',   desc: 'File carving tool',               category: 'Forensics', images: ['full','blueteam'] },
  { name: 'exiftool',    cmd: 'exiftool',   desc: 'Metadata extraction',             category: 'Forensics', images: ['full','blueteam'], link: 'https://github.com/exiftool/exiftool' },
  { name: 'steghide',    cmd: 'steghide',   desc: 'JPEG/BMP steganography',          category: 'Forensics', images: ['full','blueteam'], link: 'https://github.com/StefanoDeVuono/steghide' },
  { name: 'zsteg',       cmd: 'zsteg',      desc: 'PNG/BMP steganography detector',  category: 'Forensics', images: ['full','blueteam'], link: 'https://github.com/zed-0xff/zsteg' },
  { name: 'stegseek',    cmd: 'stegseek',   desc: 'Steghide brute-forcer',           category: 'Forensics', images: ['full','blueteam'], link: 'https://github.com/RickdeJager/stegseek' },
  { name: 'openstego',   cmd: 'openstego',  desc: 'Steganography tool',              category: 'Forensics', images: ['full','blueteam'], link: 'https://github.com/syvaidya/openstego' },

  // Blue Team
  { name: 'chainsaw',   cmd: 'chainsaw',   desc: 'Windows event log threat hunting',          category: 'Blue Team', images: ['full','blueteam'], link: 'https://github.com/WithSecureLabs/chainsaw' },
  { name: 'hayabusa',   cmd: 'hayabusa',   desc: 'Windows DFIR timeline generator',           category: 'Blue Team', images: ['full','blueteam'], link: 'https://github.com/Yamato-Security/hayabusa' },
  { name: 'sigma-cli',  cmd: 'sigma',      desc: 'Sigma detection rule CLI',                  category: 'Blue Team', images: ['full','blueteam'], link: 'https://github.com/SigmaHQ/sigma-cli' },
  { name: 'yara',       cmd: 'yara',       desc: 'Malware pattern matching',                  category: 'Blue Team', images: ['full','blueteam'], link: 'https://github.com/VirusTotal/yara' },
  { name: 'capa',       cmd: 'capa',       desc: 'FLARE malware capability detection',        category: 'Blue Team', images: ['full','blueteam'], link: 'https://github.com/mandiant/capa' },
  { name: 'loki',       cmd: 'loki',       desc: 'IOC scanner',                               category: 'Blue Team', images: ['full','blueteam'], link: 'https://github.com/Neo23x0/Loki' },
  { name: 'sleuthkit',  cmd: 'fls',        desc: 'Disk forensics toolkit (The Sleuth Kit)',   category: 'Blue Team', images: ['full','blueteam'], link: 'https://github.com/sleuthkit/sleuthkit' },

  // Misc
  { name: 'searchsploit', cmd: 'searchsploit',         desc: 'Exploit database search',             category: 'Misc', images: ['full','ad','web'], link: 'https://github.com/offensive-security/exploitdb' },
  { name: 'CyberChef',    cmd: '/opt/tools/CyberChef', desc: 'Data transformation toolkit (offline)', category: 'Misc', images: ['full','ad','web'], link: 'https://github.com/gchq/CyberChef' },

  // Wordlists
  { name: 'SecLists', cmd: '/opt/lists/seclists',  desc: 'Security wordlists collection', category: 'Wordlists', images: ['full','ad','web','blueteam'], link: 'https://github.com/danielmiessler/SecLists' },
  { name: 'rockyou',  cmd: '/opt/lists/rockyou.txt',desc: 'Rockyou password list',        category: 'Wordlists', images: ['full','ad','web','blueteam'] },
];

const CATEGORIES: Category[] = [
  'Core', 'Active Directory', 'Web', 'Network', 'Credential',
  'Pwn', 'Reverse Engineering', 'Crypto', 'Forensics', 'Blue Team', 'C2', 'Misc', 'Wordlists',
];

const IMAGE_COLORS: Record<ImageTag, string> = {
  full:      'bg-amber-500/15 text-amber-300 border-amber-500/30',
  ad:        'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
  web:       'bg-purple-500/15 text-purple-300 border-purple-500/30',
  blueteam:  'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
};

const CATEGORY_COLORS: Record<Category, string> = {
  'Core':               'bg-slate-500/20 text-slate-300',
  'Active Directory':   'bg-cyan-500/15 text-cyan-300',
  'Web':                'bg-purple-500/15 text-purple-300',
  'Network':            'bg-blue-500/15 text-blue-300',
  'Credential':         'bg-orange-500/15 text-orange-300',
  'Pwn':                'bg-red-500/15 text-red-300',
  'Reverse Engineering':'bg-yellow-500/15 text-yellow-300',
  'Crypto':             'bg-teal-500/15 text-teal-300',
  'Forensics':          'bg-indigo-500/15 text-indigo-300',
  'Blue Team':          'bg-emerald-500/15 text-emerald-300',
  'C2':                 'bg-rose-500/15 text-rose-300',
  'Misc':               'bg-slate-500/15 text-slate-400',
  'Wordlists':          'bg-lime-500/15 text-lime-300',
};

export const ToolsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [activeImage, setActiveImage] = useState<ImageTag | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return ALL.filter((t) => {
      if (activeCategory && t.category !== activeCategory) return false;
      if (activeImage && !t.images.includes(activeImage)) return false;
      if (q && !t.name.toLowerCase().includes(q) && !t.cmd.toLowerCase().includes(q) && !t.desc.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [search, activeCategory, activeImage]);

  return (
    <div className="space-y-6 w-full">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          Docs / <span className="text-amber-400">Tools</span>
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Tools</h1>
        <p className="text-slate-400 text-sm max-w-2xl">
          {ALL.length} tools pre-installed across all nihil images. Filter by image variant or category.
        </p>
      </header>

      {/* Filters */}
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Search by name, command or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-lg px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/60"
        />

        <div className="flex flex-wrap gap-2">
          {(['full','ad','web','blueteam'] as ImageTag[]).map((img) => (
            <button
              key={img}
              onClick={() => setActiveImage(activeImage === img ? null : img)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${
                activeImage === img
                  ? IMAGE_COLORS[img]
                  : 'bg-transparent border-slate-700 text-slate-500 hover:border-slate-500 hover:text-slate-300'
              }`}
            >
              {img}
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

        <p className="text-xs text-slate-500">
          {filtered.length === ALL.length ? `${ALL.length} tools` : `${filtered.length} / ${ALL.length} tools`}
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-slate-700/80 bg-slate-900/60">
              <th className="text-left py-2.5 px-4 text-slate-400 font-medium text-xs">Tool</th>
              <th className="text-left py-2.5 px-4 text-slate-400 font-medium text-xs">Command</th>
              <th className="text-left py-2.5 px-4 text-slate-400 font-medium text-xs">Description</th>
              <th className="text-left py-2.5 px-4 text-slate-400 font-medium text-xs">Category</th>
              <th className="text-left py-2.5 px-4 text-slate-400 font-medium text-xs">Images</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-500 text-sm">No tools match your filters.</td>
              </tr>
            ) : filtered.map((tool) => (
              <tr key={`${tool.name}-${tool.category}`} className="border-b border-slate-800/50 hover:bg-slate-900/40 transition-colors">
                <td className="py-2.5 px-4 font-medium text-slate-200 text-xs">
                  {tool.link ? (
                    <a href={tool.link} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
                      {tool.name}
                    </a>
                  ) : tool.name}
                </td>
                <td className="py-2.5 px-4 font-mono text-amber-300 text-xs">{tool.cmd}</td>
                <td className="py-2.5 px-4 text-slate-400 text-xs">{tool.desc}</td>
                <td className="py-2.5 px-4">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${CATEGORY_COLORS[tool.category]}`}>
                    {tool.category}
                  </span>
                </td>
                <td className="py-2.5 px-4">
                  <div className="flex flex-wrap gap-1">
                    {tool.images.map((img) => (
                      <span key={img} className={`text-[10px] px-1.5 py-0.5 rounded border font-mono ${IMAGE_COLORS[img]}`}>
                        {img}
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
