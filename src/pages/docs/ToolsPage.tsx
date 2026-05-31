import React, { useState, useMemo } from 'react';

type ImageTag = 'full' | 'ad' | 'web' | 'blueteam';
type Category =
  | 'Core'
  | 'Active Directory'
  | 'Web'
  | 'OSINT'
  | 'Network'
  | 'Credential'
  | 'Pwn'
  | 'Reverse Engineering'
  | 'Crypto'
  | 'Forensics'
  | 'C2'
  | 'Misc'
  | 'Wordlists'
  | 'Blue Team';

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
  { name: 'vim', cmd: 'vim', desc: 'Text editor', category: 'Core', images: ['full','ad','web','blueteam'] },
  { name: 'nano', cmd: 'nano', desc: 'Text editor', category: 'Core', images: ['full','ad','web','blueteam'] },
  { name: 'neovim', cmd: 'nvim', desc: 'Text editor', category: 'Core', images: ['full','ad','web','blueteam'], link: 'https://github.com/neovim/neovim' },
  { name: 'tmux', cmd: 'tmux', desc: 'Terminal multiplexer', category: 'Core', images: ['full','ad','web','blueteam'], link: 'https://github.com/tmux/tmux' },
  { name: 'fzf', cmd: 'fzf', desc: 'Fuzzy finder', category: 'Core', images: ['full','ad','web','blueteam'], link: 'https://github.com/junegunn/fzf' },
  { name: 'gdb', cmd: 'gdb', desc: 'GNU debugger', category: 'Core', images: ['full','ad','web','blueteam'] },
  { name: 'asciinema', cmd: 'asciinema', desc: 'Terminal recorder', category: 'Core', images: ['full','ad','web','blueteam'], link: 'https://github.com/asciinema/asciinema' },
  { name: 'whois', cmd: 'whois', desc: 'WHOIS lookup', category: 'Core', images: ['full','ad','web','blueteam'] },
  { name: 'nihil-history', cmd: 'nhi', desc: 'Pentest engagement knowledge manager', category: 'Core', images: ['full','ad','web','blueteam'], link: 'https://github.com/TheNullPigeons/nihil-history' },
  { name: 'zoxide', cmd: 'z', desc: 'Smart directory navigation (z)', category: 'Core', images: ['full','ad','web','blueteam'], link: 'https://github.com/ajeetdsouza/zoxide' },

  // Active Directory
  { name: 'bloodhound', cmd: 'bloodhound-python', desc: 'AD attack path visualization (ingestor)', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/dirkjanm/BloodHound.py' },
  { name: 'bloodhound-ce-python', cmd: 'bloodhound-ce-python', desc: 'BloodHound CE Python ingestor', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/dirkjanm/BloodHound.py' },
  { name: 'bloodhound-ce', cmd: 'bloodhound-ce', desc: 'BloodHound CE desktop client', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/SpecterOps/BloodHound' },
  { name: 'bloodhound-legacy', cmd: 'bloodhound-legacy', desc: 'BloodHound legacy (4.x) desktop client', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/SpecterOps/BloodHound-Legacy' },
  { name: 'ldapdomaindump', cmd: 'ldapdomaindump', desc: 'LDAP domain information dumper', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/dirkjanm/ldapdomaindump' },
  { name: 'adidnsdump', cmd: 'adidnsdump', desc: 'AD integrated DNS dumper', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/dirkjanm/adidnsdump' },
  { name: 'certipy', cmd: 'certipy', desc: 'ADCS enumeration and exploitation', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/ly4k/Certipy' },
  { name: 'bloodyad', cmd: 'bloodyAD', desc: 'AD privilege escalation framework', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/CravateRouge/bloodyAD' },
  { name: 'evil-winrm-py', cmd: 'evil-winrm-py', desc: 'WinRM shell (Python)', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/Hackplayers/evil-winrm' },
  { name: 'evil-winrm', cmd: 'evil-winrm', desc: 'WinRM shell (Ruby, original)', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/Hackplayers/evil-winrm' },
  { name: 'netexec', cmd: 'netexec', desc: 'SMB/LDAP/WinRM/SSH exploitation framework', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/Pennyw0rth/NetExec' },
  { name: 'impacket', cmd: 'secretsdump.py', desc: 'Windows protocol library (Fortra)', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/fortra/impacket' },
  { name: 'Get-GPPPassword', cmd: 'Get-GPPPassword.py', desc: 'Extract plaintext credentials from GPP (impacket)', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/fortra/impacket' },
  { name: 'mitm6', cmd: 'mitm6', desc: 'DHCPv6 spoofing for NTLM relay', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/dirkjanm/mitm6' },
  { name: 'aclpwn', cmd: 'aclpwn', desc: 'AD ACL exploitation', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/aas-n/aclpwn.py' },
  { name: 'abuseACL', cmd: 'abuseACL', desc: 'AD ACL abuse and privilege escalation', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/AetherBlack/abuseACL' },
  { name: 'lsassy', cmd: 'lsassy', desc: 'Remote LSASS credential dumper', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/Hackndo/lsassy' },
  { name: 'donpapi', cmd: 'DonPAPI', desc: 'DPAPI credential extraction', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/login-securite/DonPAPI' },
  { name: 'coercer', cmd: 'coercer', desc: 'NTLM authentication coercion', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/p0dalirius/Coercer' },
  { name: 'pywhisker', cmd: 'pywhisker', desc: 'Shadow credentials manipulation', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/ShutdownRepo/pywhisker' },
  { name: 'enum4linux-ng', cmd: 'enum4linux-ng', desc: 'SMB/RPC/LDAP enumeration', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/cddmp/enum4linux-ng' },
  { name: 'smbmap', cmd: 'smbmap', desc: 'SMB share enumeration', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/ShawnDEvans/smbmap' },
  { name: 'smbclientng', cmd: 'smbclientng', desc: 'Interactive SMB client with modern UX', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/p0dalirius/smbclient-ng' },
  { name: 'sprayhound', cmd: 'sprayhound', desc: 'Password spraying with BloodHound', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/Hackndo/sprayhound' },
  { name: 'ldapsearch-ad', cmd: 'ldapsearch-ad.py', desc: 'LDAP enumeration wrapper for AD', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/yaap7/ldapsearch-ad' },
  { name: 'pywerview', cmd: 'pywerview', desc: 'Python port of PowerView', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/the-useless-one/pywerview' },
  { name: 'masky', cmd: 'masky', desc: 'ADCS-based credential extraction', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/Z4kSec/Masky' },
  { name: 'manspider', cmd: 'manspider', desc: 'Search sensitive files across SMB shares', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/blacklanternsecurity/MANSPIDER' },
  { name: 'pre2k', cmd: 'pre2k', desc: 'Pre-Windows 2000 computer account exploitation', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/garrettfoster13/pre2k' },
  { name: 'responder', cmd: 'responder', desc: 'LLMNR/NBT-NS/mDNS poisoner', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/lgandx/Responder' },
  { name: 'rusthound-ce', cmd: 'rusthound-ce', desc: 'BloodHound CE collector (Rust)', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/NH-RED-TEAM/RustHound' },
  { name: 'rusthound', cmd: 'rusthound', desc: 'BloodHound legacy collector (Rust)', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/OPENCYBER-FR/RustHound' },
  { name: 'bloodbash', cmd: 'bloodbash', desc: 'BloodHound-based offensive automation', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/DotNetRussell/BloodBash' },
  { name: 'kerbrute', cmd: 'kerbrute', desc: 'Kerberos brute-force / user enumeration', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/ropnop/kerbrute' },
  { name: 'windapsearch', cmd: 'windapsearch', desc: 'LDAP enumeration (Go)', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/ropnop/windapsearch' },
  { name: 'krbrelayx', cmd: 'krbrelayx', desc: 'Kerberos relay attacks', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/dirkjanm/krbrelayx' },
  { name: 'gmsadumper', cmd: 'gmsadumper', desc: 'gMSA credential extraction', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/micahvandeusen/gMSADumper' },
  { name: 'FindUncommonShares', cmd: 'FindUncommonShares', desc: 'Discover non-standard SMB shares', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/p0dalirius/FindUncommonShares' },
  { name: 'targetedKerberoast', cmd: 'targetedKerberoast', desc: 'Kerberoast via ACL abuse', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/ShutdownRepo/targetedKerberoast' },
  { name: 'PKINITtools', cmd: 'gettgtpkinit', desc: 'PKINIT exploitation (shadow creds, UnPAC-the-hash)', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/dirkjanm/PKINITtools' },
  { name: 'noPac', cmd: 'noPac', desc: 'CVE-2021-42278/42287 Sam-Account-Name spoofing', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/Ridter/noPac' },
  { name: 'PetitPotam', cmd: 'PetitPotam', desc: 'NTLM relay via EFS (CVE-2021-36942)', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/topotam/PetitPotam' },
  { name: 'zerologon', cmd: 'cve-2020-1472-exploit', desc: 'CVE-2020-1472 Netlogon exploit', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/SecuraBV/CVE-2020-1472' },
  { name: 'ShadowCoerce', cmd: 'ShadowCoerce', desc: 'Coercion via MS-FSRVP', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/ShutdownRepo/ShadowCoerce' },
  { name: 'DFSCoerce', cmd: 'DFSCoerce', desc: 'Coercion via MS-DFSNM', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/Wh04m1001/DFSCoerce' },
  { name: 'openldap', cmd: 'ldapsearch', desc: 'LDAP command-line utilities', category: 'Active Directory', images: ['full','ad'] },
  { name: 'smbclient', cmd: 'smbclient', desc: 'SMB command-line client', category: 'Active Directory', images: ['full','ad'] },
  { name: 'powershell', cmd: 'pwsh', desc: 'PowerShell 7', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/PowerShell/PowerShell' },
  { name: 'ntlm_theft', cmd: 'ntlm_theft', desc: 'Generate files to steal NTLM hashes via UNC paths', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/Greenwolf/ntlm_theft' },
  { name: 'smtp-user-enum', cmd: 'smtp-user-enum', desc: 'SMTP user enumeration via VRFY, EXPN and RCPT', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/pentestmonkey/smtp-user-enum' },
  { name: 'neo4j', cmd: 'neo4j', desc: 'Neo4j graph database (BloodHound CE backend)', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/neo4j/neo4j' },
  { name: 'cypher-shell', cmd: 'cypher-shell', desc: 'Neo4j Cypher query shell', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/neo4j/cypher-shell' },
  { name: 'gofenrir', cmd: 'gf', desc: 'Fast AD user/group enumeration (Go)', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/blacklanternsecurity/gofenrir' },
  { name: 'asrepcatcher', cmd: 'ASRepCatcher', desc: 'AS-REP Roasting listener', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/Yaxxine7/ASRepCatcher' },
  { name: 'autobloody', cmd: 'autobloody', desc: 'BloodyAD automation wrapper', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/CravateRouge/autobloody' },
  { name: 'certsync', cmd: 'certsync', desc: 'Sync ADCS certs for PKINIT', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/zblurx/certsync' },
  { name: 'crackhound', cmd: 'crackhound', desc: 'BloodHound + hashcat path cracking', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/trustedsec/crackhound' },
  { name: 'godap', cmd: 'godap', desc: 'Interactive LDAP client (TUI)', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/Macmod/godap' },
  { name: 'goexec', cmd: 'goexec', desc: 'Remote code execution via SMB/WMI', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/FalconOpsLLC/goexec' },
  { name: 'goldencopy', cmd: 'goldencopy', desc: 'Copy/forge Kerberos tickets', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/Dramelac/GoldenCopy' },
  { name: 'gosecretsdump', cmd: 'gosecretsdump', desc: 'Pure Go secretsdump', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/c-sto/gosecretsdump' },
  { name: 'GPOddity', cmd: 'gpoddity', desc: 'GPO abuse automation', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/synacktiv/GPOddity' },
  { name: 'gpp-decrypt', cmd: 'gpp-decrypt', desc: 'Decrypt GPP passwords', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/t0thkr1s/gpp-decrypt' },
  { name: 'keepwn', cmd: 'KeePwn', desc: 'KeePass trigger attack', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/Orange-Cyberdefense/KeePwn' },
  { name: 'krbjack', cmd: 'krbjack', desc: 'Kerberos pre-auth hijack', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/almandin/krbjack' },
  { name: 'ldaprelayscan', cmd: 'ldaprelayscan', desc: 'LDAP relay attack scanner', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/zyn3rgy/LdapRelayScan' },
  { name: 'ldeep', cmd: 'ldeep', desc: 'Deep LDAP enumeration', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/franc-pentest/ldeep' },
  { name: 'LDAPWordlistHarvester', cmd: 'LDAPWordlistHarvester', desc: 'Build wordlists from LDAP', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/p0dalirius/pyLDAPWordlistHarvester' },
  { name: 'nbtscan', cmd: 'nbtscan', desc: 'NBT-NS scanner', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/resurrecting-open-source-projects/nbtscan' },
  { name: 'PassTheCert', cmd: 'passthecert', desc: 'Pass-the-cert LDAP/LDAPS auth', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/AlmondOffSec/PassTheCert' },
  { name: 'PCredz', cmd: 'Pcredz', desc: 'Network credential capture', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/lgandx/PCredz' },
  { name: 'pygpoabuse', cmd: 'pygpoabuse', desc: 'GPO immediate task abuse', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/Hackndo/pyGPOAbuse' },
  { name: 'sccmhunter', cmd: 'sccmhunter', desc: 'SCCM attack framework', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/garrettfoster13/sccmhunter' },
  { name: 'teamsphisher', cmd: 'teamsphisher', desc: 'Teams external phishing', category: 'Active Directory', images: ['full','ad'], link: 'https://github.com/Octoberfest7/TeamsPhisher' },

  // Web
  { name: 'sqlmap', cmd: 'sqlmap', desc: 'SQL injection testing', category: 'Web', images: ['full','web'], link: 'https://github.com/sqlmapproject/sqlmap' },
  { name: 'gobuster', cmd: 'gobuster', desc: 'Directory/subdomain brute-force', category: 'Web', images: ['full','web'], link: 'https://github.com/OJ/gobuster' },
  { name: 'nikto', cmd: 'nikto', desc: 'Web server vulnerability scanner', category: 'Web', images: ['full','web'], link: 'https://github.com/sullo/nikto' },
  { name: 'wfuzz', cmd: 'wfuzz', desc: 'Web fuzzer', category: 'Web', images: ['full','web'], link: 'https://github.com/xmendez/wfuzz' },
  { name: 'arjun', cmd: 'arjun', desc: 'HTTP parameter discovery', category: 'Web', images: ['full','web'], link: 'https://github.com/s0md3v/Arjun' },
  { name: 'wafw00f', cmd: 'wafw00f', desc: 'WAF detection', category: 'Web', images: ['full','web'], link: 'https://github.com/EnableSecurity/wafw00f' },
  { name: 'gopherus', cmd: 'gopherus3', desc: 'SSRF exploitation via Gopher', category: 'Web', images: ['full','web'], link: 'https://github.com/tarunkant/Gopherus' },
  { name: 'droopescan', cmd: 'droopescan', desc: 'Drupal/CMS scanner', category: 'Web', images: ['full','web'], link: 'https://github.com/SamJoan/droopescan' },
  { name: 'cmsmap', cmd: 'cmsmap', desc: 'CMS exploitation', category: 'Web', images: ['full','web'], link: 'https://github.com/Dionach/CMSmap' },
  { name: 'ssrfmap', cmd: 'ssrfmap', desc: 'SSRF exploitation framework', category: 'Web', images: ['full','web'], link: 'https://github.com/swisskyrepo/SSRFmap' },
  { name: 'jwt-tool', cmd: 'jwt-tool', desc: 'JWT manipulation and attacks', category: 'Web', images: ['full','web'], link: 'https://github.com/ticarpi/jwt_tool' },
  { name: 'xsstrike', cmd: 'xsstrike', desc: 'XSS detection and exploitation', category: 'Web', images: ['full','web'], link: 'https://github.com/s0md3v/XSStrike' },
  { name: 'feroxbuster', cmd: 'feroxbuster', desc: 'Fast content discovery (Rust)', category: 'Web', images: ['full','web'], link: 'https://github.com/epi052/feroxbuster' },
  { name: 'testssl.sh', cmd: 'testssl.sh', desc: 'TLS/SSL configuration testing', category: 'Web', images: ['full','web'], link: 'https://github.com/drwetter/testssl.sh' },
  { name: 'nuclei', cmd: 'nuclei', desc: 'Template-based vulnerability scanner', category: 'Web', images: ['full','web'], link: 'https://github.com/projectdiscovery/nuclei' },
  { name: 'httpx', cmd: 'httpx', desc: 'HTTP probe and technology fingerprinting', category: 'Web', images: ['full','web'], link: 'https://github.com/projectdiscovery/httpx' },
  { name: 'subfinder', cmd: 'subfinder', desc: 'Passive subdomain enumeration', category: 'Web', images: ['full','web'], link: 'https://github.com/projectdiscovery/subfinder' },
  { name: 'katana', cmd: 'katana', desc: 'Web crawler (ProjectDiscovery)', category: 'Web', images: ['full','web'], link: 'https://github.com/projectdiscovery/katana' },
  { name: 'ffuf', cmd: 'ffuf', desc: 'Fast web fuzzer', category: 'Web', images: ['full','web'], link: 'https://github.com/ffuf/ffuf' },
  { name: 'dirsearch', cmd: 'dirsearch', desc: 'Directory brute-force', category: 'Web', images: ['full','web'], link: 'https://github.com/maurosoria/dirsearch' },
  { name: 'whatweb', cmd: 'whatweb', desc: 'Web technology fingerprinting', category: 'Web', images: ['full','web'], link: 'https://github.com/urbanadventurer/WhatWeb' },
  { name: 'hakrawler', cmd: 'hakrawler', desc: 'Web crawler for endpoint discovery', category: 'Web', images: ['full','web'], link: 'https://github.com/hakluke/hakrawler' },
  { name: 'gau', cmd: 'gau', desc: 'Get All URLs (Wayback, Common Crawl)', category: 'Web', images: ['full','web'], link: 'https://github.com/lc/gau' },
  { name: 'waybackurls', cmd: 'waybackurls', desc: 'Fetch URLs from Wayback Machine', category: 'Web', images: ['full','web'], link: 'https://github.com/tomnomnom/waybackurls' },
  { name: 'commix', cmd: 'commix', desc: 'OS command injection exploitation', category: 'Web', images: ['full','web'], link: 'https://github.com/commixproject/commix' },
  { name: 'tplmap', cmd: 'tplmap', desc: 'Server-Side Template Injection', category: 'Web', images: ['full','web'], link: 'https://github.com/epinna/tplmap' },
  { name: 'nosqlmap', cmd: 'nosqlmap', desc: 'NoSQL injection exploitation', category: 'Web', images: ['full','web'], link: 'https://github.com/codingo/NoSQLMap' },
  { name: 'graphqlmap', cmd: 'graphqlmap', desc: 'GraphQL exploitation', category: 'Web', images: ['full','web'], link: 'https://github.com/swisskyrepo/GraphQLmap' },
  { name: 'corsy', cmd: 'corsy', desc: 'CORS misconfiguration scanner', category: 'Web', images: ['full','web'], link: 'https://github.com/s0md3v/Corsy' },
  { name: 'crlfuzz', cmd: 'crlfuzz', desc: 'CRLF injection testing', category: 'Web', images: ['full','web'], link: 'https://github.com/dwisiswant0/crlfuzz' },
  { name: 'mitmproxy', cmd: 'mitmproxy', desc: 'HTTP/HTTPS interception proxy', category: 'Web', images: ['full','web'], link: 'https://github.com/mitmproxy/mitmproxy' },
  { name: 'kiterunner', cmd: 'kr', desc: 'API endpoint discovery', category: 'Web', images: ['full','web'], link: 'https://github.com/assetnote/kiterunner' },
  { name: 'httpie', cmd: 'http', desc: 'User-friendly HTTP client', category: 'Web', images: ['full','web'], link: 'https://github.com/httpie/cli' },
  { name: 'caido', cmd: 'caido', desc: 'Web security desktop toolkit', category: 'Web', images: ['full','web'], link: 'https://github.com/caido/caido' },
  { name: 'caido-cli', cmd: 'caido-cli', desc: 'Caido command-line interface', category: 'Web', images: ['full','web'], link: 'https://github.com/caido/caido' },
  { name: 'updog', cmd: 'updog', desc: 'HTTP file server with upload (SimpleHTTPServer replacement)', category: 'Web', images: ['full','web'], link: 'https://github.com/sc0tfree/updog' },
  { name: 'swaks', cmd: 'swaks', desc: 'SMTP test tool (Swiss Army Knife for SMTP)', category: 'Web', images: ['full','web'], link: 'https://github.com/jetmore/swaks' },
  { name: 'mail', cmd: 'mail', desc: 'Command-line email client (mailutils + msmtp)', category: 'Web', images: ['full','web'], link: 'https://mailutils.org' },
  { name: 'burpsuite', cmd: 'burpsuite', desc: 'Web application security testing platform', category: 'Web', images: ['full','web'], link: 'https://portswigger.net/burp' },
  { name: 'EyeWitness', cmd: 'EyeWitness', desc: 'Web screenshot and service enumeration tool', category: 'Web', images: ['full','web'], link: 'https://github.com/RedSiege/EyeWitness' },
  { name: 'wpscan', cmd: 'wpscan', desc: 'WordPress vulnerability scanner', category: 'Web', images: ['full','web'], link: 'https://github.com/wpscanteam/wpscan' },
  { name: 'bbot', cmd: 'bbot', desc: 'Automated recon and subdomain OSINT', category: 'Web', images: ['full','web'], link: 'https://github.com/blacklanternsecurity/bbot' },
  { name: 'byp4xx', cmd: 'byp4xx', desc: 'HTTP 40x bypass', category: 'Web', images: ['full','web'], link: 'https://github.com/lobuhi/byp4xx' },
  { name: 'git-dumper', cmd: 'git-dumper', desc: 'Dump exposed .git directories', category: 'Web', images: ['full','web'], link: 'https://github.com/arthaud/git-dumper' },
  { name: 'gowitness', cmd: 'gowitness', desc: 'Web screenshot tool (Go)', category: 'Web', images: ['full','web'], link: 'https://github.com/sensepost/gowitness' },
  { name: 'httpmethods', cmd: 'httpmethods', desc: 'HTTP method enumeration', category: 'Web', images: ['full','web'], link: 'https://github.com/ShutdownRepo/httpmethods' },
  { name: 'joomscan', cmd: 'joomscan', desc: 'Joomla vulnerability scanner', category: 'Web', images: ['full','web'], link: 'https://github.com/OWASP/joomscan' },
  { name: 'linkfinder', cmd: 'linkfinder', desc: 'Endpoint discovery in JS files', category: 'Web', images: ['full','web'], link: 'https://github.com/GerbenJavado/LinkFinder' },
  { name: 'naabu', cmd: 'naabu', desc: 'Fast port scanner (ProjectDiscovery)', category: 'Web', images: ['full','web'], link: 'https://github.com/projectdiscovery/naabu' },
  { name: 'patator', cmd: 'patator', desc: 'Multi-purpose brute-forcer', category: 'Web', images: ['full','web'], link: 'https://github.com/lanjelot/patator' },
  { name: 'phpggc', cmd: 'phpggc', desc: 'PHP gadget chain generator', category: 'Web', images: ['full','web'], link: 'https://github.com/ambionics/phpggc' },
  { name: 'smuggler', cmd: 'smuggler', desc: 'HTTP request smuggling tester', category: 'Web', images: ['full','web'], link: 'https://github.com/defparam/smuggler' },
  { name: 'sslscan', cmd: 'sslscan', desc: 'SSL/TLS configuration scanner', category: 'Web', images: ['full','web'], link: 'https://github.com/rbsec/sslscan' },
  { name: 'xxeinjector', cmd: 'xxeinjector', desc: 'XXE injection automation', category: 'Web', images: ['full','web'], link: 'https://github.com/enjoiz/XXEinjector' },
  { name: 'ysoserial', cmd: 'ysoserial', desc: 'Java deserialization exploit payloads', category: 'Web', images: ['full','web'], link: 'https://github.com/frohoff/ysoserial' },

  // OSINT
  { name: 'amass', cmd: 'amass', desc: 'Subdomain enumeration (OWASP)', category: 'OSINT', images: ['full','web'], link: 'https://github.com/owasp-amass/amass' },
  { name: 'recon-ng', cmd: 'recon-ng', desc: 'Web recon framework', category: 'OSINT', images: ['full','web'], link: 'https://github.com/lanmaster53/recon-ng' },
  { name: 'sherlock', cmd: 'sherlock', desc: 'Username OSINT across platforms', category: 'OSINT', images: ['full','web'], link: 'https://github.com/sherlock-project/sherlock' },
  { name: 'spiderfoot', cmd: 'spiderfoot', desc: 'Automated OSINT framework', category: 'OSINT', images: ['full','web'], link: 'https://github.com/smicallef/spiderfoot' },
  { name: 'sublist3r', cmd: 'sublist3r', desc: 'Subdomain enumeration', category: 'OSINT', images: ['full','web'], link: 'https://github.com/aboul3la/Sublist3r' },
  { name: 'theHarvester', cmd: 'theHarvester', desc: 'Email and domain OSINT', category: 'OSINT', images: ['full','web'], link: 'https://github.com/laramies/theHarvester' },

  // Network
  { name: 'nmap', cmd: 'nmap', desc: 'Network scanner', category: 'Network', images: ['full','ad','web','blueteam'], link: 'https://github.com/nmap/nmap' },
  { name: 'netcat', cmd: 'nc', desc: 'Network utility (OpenBSD)', category: 'Network', images: ['full','ad','web','blueteam'] },
  { name: 'socat', cmd: 'socat', desc: 'Multipurpose network relay', category: 'Network', images: ['full','ad','web','blueteam'] },
  { name: 'wireshark-cli', cmd: 'tshark', desc: 'Network protocol analyzer (CLI)', category: 'Network', images: ['full','ad','web','blueteam'], link: 'https://github.com/wireshark/wireshark' },
  { name: 'fping', cmd: 'fping', desc: 'Fast ICMP host discovery', category: 'Network', images: ['full','ad','web','blueteam'] },
  { name: 'zone-dnsenum', cmd: 'zone-dnsenum', desc: 'DNS zone enumeration and transfer', category: 'Network', images: ['full','ad','web','blueteam'], link: 'https://github.com/Goultarde/Zone-DNSenum' },
  { name: 'ngrok', cmd: 'ngrok', desc: 'Reverse tunnel for exposing local ports', category: 'Network', images: ['full','ad','web','blueteam'], link: 'https://ngrok.com' },
  { name: 'udpx', cmd: 'udpx', desc: 'Fast UDP port scanner', category: 'Network', images: ['full','ad','web','blueteam'], link: 'https://github.com/nullt3r/udpx' },
  { name: 'bettercap', cmd: 'bettercap', desc: 'Network attack and monitoring framework', category: 'Network', images: ['full','ad','web','blueteam'], link: 'https://github.com/bettercap/bettercap' },
  { name: 'ligolo-ng', cmd: 'ligolo-ng', desc: 'Tunneling via TUN interface (proxy)', category: 'Network', images: ['full','ad','web','blueteam'], link: 'https://github.com/nicocha30/ligolo-ng' },
  { name: 'chisel', cmd: 'chisel', desc: 'TCP/UDP tunnel over HTTP', category: 'Network', images: ['full','ad','web','blueteam'], link: 'https://github.com/jpillora/chisel' },
  { name: 'masscan', cmd: 'masscan', desc: 'Fast port scanner', category: 'Network', images: ['full','ad','web','blueteam'], link: 'https://github.com/robertdavidgraham/masscan' },
  { name: 'netdiscover', cmd: 'netdiscover', desc: 'ARP recon tool', category: 'Network', images: ['full','ad','web','blueteam'], link: 'https://github.com/netdiscover-scanner/netdiscover' },
  { name: 'nmap-parse-output', cmd: 'nmap-parse-output', desc: 'Nmap XML output parser', category: 'Network', images: ['full','ad','web','blueteam'], link: 'https://github.com/ernw/nmap-parse-output' },
  { name: 'proxychains', cmd: 'proxychains', desc: 'SOCKS/HTTP proxy chain', category: 'Network', images: ['full','ad','web','blueteam'], link: 'https://github.com/rofl0r/proxychains-ng' },
  { name: 'rustscan', cmd: 'rustscan', desc: 'Fast port scanner (Rust)', category: 'Network', images: ['full','ad','web','blueteam'], link: 'https://github.com/RustScan/RustScan' },
  { name: 'ssh-audit', cmd: 'ssh-audit', desc: 'SSH server configuration audit', category: 'Network', images: ['full','ad','web','blueteam'], link: 'https://github.com/jtesta/ssh-audit' },
  { name: 'sshuttle', cmd: 'sshuttle', desc: 'VPN over SSH', category: 'Network', images: ['full','ad','web','blueteam'], link: 'https://github.com/sshuttle/sshuttle' },
  { name: 'tcpdump', cmd: 'tcpdump', desc: 'Packet capture', category: 'Network', images: ['full','ad','web','blueteam'], link: 'https://www.tcpdump.org' },
  { name: 'xfreerdp', cmd: 'xfreerdp3', desc: 'RDP client', category: 'Network', images: ['full','ad','web','blueteam'], link: 'https://github.com/FreeRDP/FreeRDP' },
  { name: 'nfs-utils', cmd: 'showmount', desc: 'NFS client utilities (showmount, nfsstat, rpcinfo)', category: 'Network', images: ['full','ad','web','blueteam'], link: 'https://linux-nfs.org' },

  // Credential
  { name: 'pypykatz', cmd: 'pypykatz', desc: 'LSASS minidump parser (Python)', category: 'Credential', images: ['full','ad','web'], link: 'https://github.com/skelsec/pypykatz' },
  { name: 'binwalk', cmd: 'binwalk', desc: 'Binary analysis / extraction', category: 'Credential', images: ['full','ad','web'], link: 'https://github.com/ReFirmLabs/binwalk' },
  { name: 'john', cmd: 'john', desc: 'Password cracker (John the Ripper)', category: 'Credential', images: ['full','ad','web'], link: 'https://github.com/openwall/john' },
  { name: 'hashcat', cmd: 'hashcat', desc: 'GPU password cracker', category: 'Credential', images: ['full','ad','web'], link: 'https://github.com/hashcat/hashcat' },
  { name: 'haiti', cmd: 'haiti', desc: 'Hash type identifier', category: 'Credential', images: ['full','ad','web'], link: 'https://github.com/noraj/haiti' },
  { name: 'fcrackzip', cmd: 'fcrackzip', desc: 'ZIP password cracker', category: 'Credential', images: ['full','ad','web'], link: 'https://github.com/hyc/fcrackzip' },
  { name: 'hydra', cmd: 'hydra', desc: 'Multi-protocol brute-forcer', category: 'Credential', images: ['full','ad','web'], link: 'https://github.com/vanhauser-thc/thc-hydra' },
  { name: 'name-that-hash', cmd: 'nth', desc: 'Hash identifier', category: 'Credential', images: ['full','ad','web'], link: 'https://github.com/HashPals/Name-That-Hash' },
  { name: 'pdfcrack', cmd: 'pdfcrack', desc: 'PDF password cracker', category: 'Credential', images: ['full','ad','web'], link: 'https://pdfcrack.sourceforge.net' },

  // Pwn
  { name: 'radare2', cmd: 'r2', desc: 'Reverse engineering framework', category: 'Pwn', images: ['full'], link: 'https://github.com/radareorg/radare2' },
  { name: 'strace', cmd: 'strace', desc: 'System call tracer', category: 'Pwn', images: ['full'] },
  { name: 'ltrace', cmd: 'ltrace', desc: 'Library call tracer', category: 'Pwn', images: ['full'] },
  { name: 'cmake', cmd: 'cmake', desc: 'Build system generator', category: 'Pwn', images: ['full'] },
  { name: 'pwntools', cmd: 'pwn', desc: 'CTF/exploit development library', category: 'Pwn', images: ['full'], link: 'https://github.com/Gallopsled/pwntools' },
  { name: 'ROPgadget', cmd: 'ROPgadget', desc: 'ROP gadget finder', category: 'Pwn', images: ['full'], link: 'https://github.com/JonathanSalwan/ROPgadget' },
  { name: 'pwndbg', cmd: 'gdb', desc: 'GDB plugin for exploit dev (default)', category: 'Pwn', images: ['full'], link: 'https://github.com/pwndbg/pwndbg' },
  { name: 'peda', cmd: 'gdb-peda', desc: 'Python Exploit Development Assistance for GDB', category: 'Pwn', images: ['full'], link: 'https://github.com/longld/peda' },
  { name: 'gef', cmd: 'gdb-gef', desc: 'GDB Enhanced Features for exploit devs and reverse engineers', category: 'Pwn', images: ['full'], link: 'https://github.com/hugsy/gef' },
  { name: 'one_gadget', cmd: 'one_gadget', desc: 'One-gadget RCE finder for libc', category: 'Pwn', images: ['full'], link: 'https://github.com/david942j/one_gadget' },
  { name: 'seccomp-tools', cmd: 'seccomp-tools', desc: 'Seccomp filter analyzer', category: 'Pwn', images: ['full'], link: 'https://github.com/david942j/seccomp-tools' },
  { name: 'checksec', cmd: 'checksec', desc: 'Binary security property checker', category: 'Pwn', images: ['full'], link: 'https://github.com/slimm609/checksec' },

  // Reverse Engineering
  { name: 'ghidra', cmd: 'ghidra', desc: 'NSA reverse engineering suite', category: 'Reverse Engineering', images: ['full'], link: 'https://github.com/NationalSecurityAgency/ghidra' },
  { name: 'angr', cmd: 'angr', desc: 'Symbolic execution and binary analysis', category: 'Reverse Engineering', images: ['full'], link: 'https://github.com/angr/angr' },
  { name: 'pycdc', cmd: 'pycdc', desc: 'Python bytecode decompiler', category: 'Reverse Engineering', images: ['full'], link: 'https://github.com/zrax/pycdc' },
  { name: 'uncompyle6', cmd: 'uncompyle6', desc: 'Python 2/3 bytecode decompiler', category: 'Reverse Engineering', images: ['full'], link: 'https://github.com/rocky/python-uncompyle6' },
  { name: 'pycdas', cmd: 'pycdas', desc: 'Python bytecode disassembler', category: 'Reverse Engineering', images: ['full'], link: 'https://github.com/zrax/pycdc' },
  { name: 'nasm', cmd: 'nasm', desc: 'x86/x64 assembler', category: 'Reverse Engineering', images: ['full'], link: 'https://github.com/netwide-assembler/nasm' },

  // Crypto
  { name: 'RsaCtfTool', cmd: 'RsaCtfTool', desc: 'RSA attack automation', category: 'Crypto', images: ['full'], link: 'https://github.com/RsaCtfTool/RsaCtfTool' },
  { name: 'xortool', cmd: 'xortool', desc: 'XOR cipher analysis', category: 'Crypto', images: ['full'], link: 'https://github.com/hellman/xortool' },
  { name: 'z3-solver', cmd: 'z3-solver', desc: 'SMT constraint solver', category: 'Crypto', images: ['full'], link: 'https://github.com/Z3Prover/z3' },
  { name: 'pycryptodome', cmd: 'pycryptodome', desc: 'Python crypto library', category: 'Crypto', images: ['full'], link: 'https://github.com/Legrandin/pycryptodome' },
  { name: 'hashid', cmd: 'hashid', desc: 'Hash type identifier', category: 'Crypto', images: ['full'], link: 'https://github.com/psypanda/hashID' },

  // Forensics
  { name: 'volatility3', cmd: 'vol', desc: 'Memory forensics framework', category: 'Forensics', images: ['full','blueteam'], link: 'https://github.com/volatilityfoundation/volatility3' },
  { name: 'foremost', cmd: 'foremost', desc: 'File carving tool', category: 'Forensics', images: ['full','blueteam'] },
  { name: 'exiftool', cmd: 'exiftool', desc: 'Metadata extraction', category: 'Forensics', images: ['full','blueteam'], link: 'https://github.com/exiftool/exiftool' },
  { name: 'steghide', cmd: 'steghide', desc: 'JPEG/BMP steganography', category: 'Forensics', images: ['full','blueteam'], link: 'https://github.com/StefanoDeVuono/steghide' },
  { name: 'zsteg', cmd: 'zsteg', desc: 'PNG/BMP steganography detector', category: 'Forensics', images: ['full','blueteam'], link: 'https://github.com/zed-0xff/zsteg' },
  { name: 'stegseek', cmd: 'stegseek', desc: 'Steghide brute-forcer', category: 'Forensics', images: ['full','blueteam'], link: 'https://github.com/RickdeJager/stegseek' },
  { name: 'openstego', cmd: 'openstego', desc: 'Steganography tool', category: 'Forensics', images: ['full','blueteam'], link: 'https://github.com/syvaidya/openstego' },
  { name: 'jadx', cmd: 'jadx', desc: 'Android/Java decompiler', category: 'Forensics', images: ['full','blueteam'], link: 'https://github.com/skylot/jadx' },

  // C2
  { name: 'metasploit', cmd: 'msfconsole', desc: 'Exploitation framework', category: 'C2', images: ['full','ad'], link: 'https://github.com/rapid7/metasploit-framework' },
  { name: 'sliver', cmd: 'sliver-server', desc: 'C2 framework', category: 'C2', images: ['full','ad'], link: 'https://github.com/BishopFox/sliver' },
  { name: 'penelope', cmd: 'penelope', desc: 'Advanced reverse shell handler', category: 'C2', images: ['full','ad'], link: 'https://github.com/brightio/penelope' },
  { name: 'pwncat-vl', cmd: 'pwncat-vl', desc: 'Maintained fork of pwncat-cs with reverse/bind shell automation', category: 'C2', images: ['full','ad'], link: 'https://github.com/calebstewart/pwncat' },

  // Misc
  { name: 'searchsploit', cmd: 'searchsploit', desc: 'Exploit database search', category: 'Misc', images: ['full','ad','web'], link: 'https://github.com/offensive-security/exploitdb' },
  { name: 'CyberChef', cmd: '/opt/tools/CyberChef', desc: 'Data transformation toolkit (offline)', category: 'Misc', images: ['full','ad','web'], link: 'https://github.com/gchq/CyberChef' },
  { name: 'firefox', cmd: 'firefox', desc: 'Web browser', category: 'Misc', images: ['full','ad','web'], link: 'https://www.mozilla.org/firefox' },
  { name: 'chromium', cmd: 'chromium', desc: 'Web browser (no-sandbox wrapper)', category: 'Misc', images: ['full','ad','web'], link: 'https://www.chromium.org/Home' },
  { name: 'grc', cmd: 'grc', desc: 'Generic log colorizer', category: 'Misc', images: ['full','ad','web'], link: 'https://github.com/garabik/grc' },
  { name: 'sqlitebrowser', cmd: 'sqlitebrowser', desc: 'GUI SQLite database browser', category: 'Misc', images: ['full','ad','web'], link: 'https://github.com/sqlitebrowser/sqlitebrowser' },
  { name: 'keepassxc', cmd: 'keepassxc', desc: 'KeePass password manager', category: 'Misc', images: ['full','ad','web'], link: 'https://github.com/keepassxreboot/keepassxc' },
  { name: 'rsync', cmd: 'rsync', desc: 'File sync utility', category: 'Misc', images: ['full','ad','web'], link: 'https://github.com/RsyncProject/rsync' },
  { name: 'wesng', cmd: 'wes', desc: 'Windows Exploit Suggester NG', category: 'Misc', images: ['full','ad','web'], link: 'https://github.com/bitsadmin/wesng' },
  { name: 'gitleaks', cmd: 'gitleaks', desc: 'Git secrets scanner', category: 'Misc', images: ['full','ad','web'], link: 'https://github.com/gitleaks/gitleaks' },

  // Wordlists
  { name: 'seclists', cmd: '/opt/lists/seclists', desc: 'Security wordlists collection', category: 'Wordlists', images: ['full','ad','web','blueteam'], link: 'https://github.com/danielmiessler/SecLists' },
  { name: 'rockyou', cmd: '/opt/lists/rockyou.txt', desc: 'Rockyou password list (extracted from seclists)', category: 'Wordlists', images: ['full','ad','web','blueteam'] },
  { name: 'cewl', cmd: 'cewl', desc: 'Wordlist generator from websites', category: 'Wordlists', images: ['full','ad','web','blueteam'], link: 'https://github.com/digininja/CeWL' },
  { name: 'crunch', cmd: 'crunch', desc: 'Wordlist generator', category: 'Wordlists', images: ['full','ad','web','blueteam'], link: 'https://github.com/crunchsec/crunch' },
  { name: 'cupp', cmd: 'cupp', desc: 'Custom user password profiler', category: 'Wordlists', images: ['full','ad','web','blueteam'], link: 'https://github.com/Mebus/cupp' },
  { name: 'username-anarchy', cmd: 'username-anarchy', desc: 'Username generation from names', category: 'Wordlists', images: ['full','ad','web','blueteam'], link: 'https://github.com/urbanadventurer/username-anarchy' },

  // Blue Team
  { name: 'chainsaw', cmd: 'chainsaw', desc: 'Windows event log threat hunting', category: 'Blue Team', images: ['full','blueteam'], link: 'https://github.com/WithSecureLabs/chainsaw' },
  { name: 'hayabusa', cmd: 'hayabusa', desc: 'Windows DFIR timeline generator', category: 'Blue Team', images: ['full','blueteam'], link: 'https://github.com/Yamato-Security/hayabusa' },
  { name: 'sigma-cli', cmd: 'sigma', desc: 'Sigma detection rule CLI', category: 'Blue Team', images: ['full','blueteam'], link: 'https://github.com/SigmaHQ/sigma-cli' },
  { name: 'yara', cmd: 'yara', desc: 'Malware pattern matching', category: 'Blue Team', images: ['full','blueteam'], link: 'https://github.com/VirusTotal/yara' },
  { name: 'capa', cmd: 'capa', desc: 'FLARE malware capability detection', category: 'Blue Team', images: ['full','blueteam'], link: 'https://github.com/mandiant/capa' },
  { name: 'loki', cmd: 'loki', desc: 'IOC scanner', category: 'Blue Team', images: ['full','blueteam'], link: 'https://github.com/Neo23x0/Loki' },
  { name: 'sleuthkit', cmd: 'fls', desc: 'Disk forensics toolkit (The Sleuth Kit)', category: 'Blue Team', images: ['full','blueteam'], link: 'https://github.com/sleuthkit/sleuthkit' },
];

const CATEGORIES: Category[] = [
  'Core', 'Active Directory', 'Web', 'OSINT', 'Network', 'Credential',
  'Pwn', 'Reverse Engineering', 'Crypto', 'Forensics', 'C2', 'Misc', 'Wordlists', 'Blue Team',
];

const IMAGE_COLORS: Record<ImageTag, string> = {
  full:     'bg-amber-500/15 text-amber-300 border-amber-500/30',
  ad:       'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
  web:      'bg-purple-500/15 text-purple-300 border-purple-500/30',
  blueteam: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
};

const CATEGORY_COLORS: Record<Category, string> = {
  'Core':               'bg-slate-500/20 text-slate-300',
  'Active Directory':   'bg-cyan-500/15 text-cyan-300',
  'Web':                'bg-purple-500/15 text-purple-300',
  'OSINT':              'bg-sky-500/15 text-sky-300',
  'Network':            'bg-emerald-500/15 text-emerald-300',
  'Credential':         'bg-orange-500/15 text-orange-300',
  'Pwn':                'bg-red-500/15 text-red-300',
  'Reverse Engineering':'bg-yellow-500/15 text-yellow-300',
  'Crypto':             'bg-teal-500/15 text-teal-300',
  'Forensics':          'bg-indigo-500/15 text-indigo-300',
  'C2':                 'bg-rose-500/15 text-rose-300',
  'Misc':               'bg-slate-500/15 text-slate-400',
  'Wordlists':          'bg-lime-500/15 text-lime-300',
  'Blue Team':          'bg-emerald-500/15 text-emerald-300',
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
