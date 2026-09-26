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
  { name: 'vim', cmd: 'vim', desc: 'Text editor', category: 'Core', images: ['full','ad','web','blueteam'] },
  { name: 'nano', cmd: 'nano', desc: 'Text editor', category: 'Core', images: ['full','ad','web','blueteam'] },
  { name: 'neovim', cmd: 'nvim', desc: 'Text editor', category: 'Core', images: ['full','ad','web','blueteam'] },
  { name: 'tmux', cmd: 'tmux', desc: 'Terminal multiplexer', category: 'Core', images: ['full','ad','web','blueteam'] },
  { name: 'fzf', cmd: 'fzf', desc: 'Fuzzy finder', category: 'Core', images: ['full','ad','web','blueteam'] },
  { name: 'gdb', cmd: 'gdb', desc: 'GNU debugger', category: 'Core', images: ['full','ad','web','blueteam'] },
  { name: 'asciinema', cmd: 'asciinema', desc: 'Terminal recorder', category: 'Core', images: ['full','ad','web','blueteam'] },
  { name: 'whois', cmd: 'whois', desc: 'WHOIS lookup', category: 'Core', images: ['full','ad','web','blueteam'] },
  { name: 'nihil-history', cmd: 'nhi', desc: 'Pentest engagement knowledge manager', category: 'Core', images: ['full','ad','web','blueteam'] },
  { name: 'zoxide', cmd: 'zoxide', desc: 'Smart directory navigation (z)', category: 'Core', images: ['full','ad','web','blueteam'] },
  { name: 'yazi', cmd: 'yazi', desc: 'TUI file manager (browse and open files, alias: y)', category: 'Core', images: ['full','ad','web','blueteam'] },
  { name: 'nihil-ntp', cmd: 'nihil-ntp', desc: 'Sync the container clock to a target NTP server (DC) for Kerberos', category: 'Core', images: ['full','ad','web','blueteam'] },
  { name: 'bloodhound', cmd: 'bloodhound-python', desc: 'AD attack path visualization (ingestor)', category: 'Active Directory', images: ['full','ad'] },
  { name: 'bloodhound-ce-python', cmd: 'bloodhound-ce-python', desc: 'BloodHound CE Python ingestor', category: 'Active Directory', images: ['full','ad'] },
  { name: 'bloodhound-ce', cmd: 'bloodhound-ce', desc: 'BloodHound CE desktop client', category: 'Active Directory', images: ['full','ad'] },
  { name: 'bloodhound-legacy', cmd: 'bloodhound-legacy', desc: 'BloodHound legacy (4.x) desktop client', category: 'Active Directory', images: ['full','ad'] },
  { name: 'bloodhound-import', cmd: 'bloodhound-import', desc: 'Import BloodHound JSON/ZIP data into Neo4j', category: 'Active Directory', images: ['full','ad'] },
  { name: 'ldapdomaindump', cmd: 'ldapdomaindump', desc: 'LDAP domain information dumper', category: 'Active Directory', images: ['full','ad'] },
  { name: 'adidnsdump', cmd: 'adidnsdump', desc: 'AD integrated DNS dumper', category: 'Active Directory', images: ['full','ad'] },
  { name: 'adcheck', cmd: 'adcheck', desc: 'Active Directory security posture checker', category: 'Active Directory', images: ['full','ad'] },
  { name: 'certipy', cmd: 'certipy', desc: 'ADCS enumeration and exploitation', category: 'Active Directory', images: ['full','ad'] },
  { name: 'certipy-ad', cmd: 'certipy', desc: 'Compatibility alias for Certipy ADCS enumeration and exploitation', category: 'Active Directory', images: ['full','ad'] },
  { name: 'bloodyad', cmd: 'bloodyAD', desc: 'AD privilege escalation framework', category: 'Active Directory', images: ['full','ad'] },
  { name: 'evil-winrm-py', cmd: 'evil-winrm-py', desc: 'WinRM shell (Python)', category: 'Active Directory', images: ['full','ad'] },
  { name: 'evil-winrm', cmd: 'evil-winrm', desc: 'WinRM shell (Ruby, original)', category: 'Active Directory', images: ['full','ad'] },
  { name: 'netexec', cmd: 'netexec', desc: 'SMB/LDAP/WinRM/SSH exploitation framework', category: 'Active Directory', images: ['full','ad'] },
  { name: 'impacket', cmd: 'secretsdump.py', desc: 'Windows protocol library (Fortra)', category: 'Active Directory', images: ['full','ad'] },
  { name: 'Get-GPPPassword', cmd: 'Get-GPPPassword.py', desc: 'Extract plaintext credentials from GPP (impacket)', category: 'Active Directory', images: ['full','ad'] },
  { name: 'mitm6', cmd: 'mitm6', desc: 'DHCPv6 spoofing for NTLM relay', category: 'Active Directory', images: ['full','ad'] },
  { name: 'aclpwn', cmd: 'aclpwn', desc: 'AD ACL exploitation', category: 'Active Directory', images: ['full','ad'] },
  { name: 'abuseACL', cmd: 'abuseACL', desc: 'AD ACL abuse and privilege escalation', category: 'Active Directory', images: ['full','ad'] },
  { name: 'lsassy', cmd: 'lsassy', desc: 'Remote LSASS credential dumper', category: 'Active Directory', images: ['full','ad'] },
  { name: 'donpapi', cmd: 'DonPAPI', desc: 'DPAPI credential extraction', category: 'Active Directory', images: ['full','ad'] },
  { name: 'coercer', cmd: 'coercer', desc: 'NTLM authentication coercion', category: 'Active Directory', images: ['full','ad'] },
  { name: 'pywhisker', cmd: 'pywhisker', desc: 'Shadow credentials manipulation', category: 'Active Directory', images: ['full','ad'] },
  { name: 'enum4linux-ng', cmd: 'enum4linux-ng', desc: 'SMB/RPC/LDAP enumeration', category: 'Active Directory', images: ['full','ad'] },
  { name: 'smbmap', cmd: 'smbmap', desc: 'SMB share enumeration', category: 'Active Directory', images: ['full','ad'] },
  { name: 'smbclientng', cmd: 'smbclientng', desc: 'Interactive SMB client with modern UX', category: 'Active Directory', images: ['full','ad'] },
  { name: 'sprayhound', cmd: 'sprayhound', desc: 'Password spraying with BloodHound', category: 'Active Directory', images: ['full','ad'] },
  { name: 'ldapsearch-ad', cmd: 'ldapsearch-ad.py', desc: 'LDAP enumeration wrapper for AD', category: 'Active Directory', images: ['full','ad'] },
  { name: 'pywerview', cmd: 'pywerview', desc: 'Python port of PowerView', category: 'Active Directory', images: ['full','ad'] },
  { name: 'powerview.py', cmd: 'powerview', desc: 'Interactive PowerView for Linux (LDAP enum/abuse)', category: 'Active Directory', images: ['full','ad'] },
  { name: 'tdo-dump', cmd: 'tdo-dump', desc: 'Dump trusted domain objects and secrets via DRS replication', category: 'Active Directory', images: ['full','ad'] },
  { name: 'masky', cmd: 'masky', desc: 'ADCS-based credential extraction', category: 'Active Directory', images: ['full','ad'] },
  { name: 'manspider', cmd: 'manspider', desc: 'Search sensitive files across SMB shares', category: 'Active Directory', images: ['full','ad'] },
  { name: 'pre2k', cmd: 'pre2k', desc: 'Pre-Windows 2000 computer account exploitation', category: 'Active Directory', images: ['full','ad'] },
  { name: 'responder', cmd: 'responder', desc: 'LLMNR/NBT-NS/mDNS poisoner', category: 'Active Directory', images: ['full','ad'] },
  { name: 'responder-smb-on', cmd: 'responder-smb-on', desc: 'Responder configuration helper', category: 'Active Directory', images: ['full','ad'] },
  { name: 'responder-smb-off', cmd: 'responder-smb-off', desc: 'Responder configuration helper', category: 'Active Directory', images: ['full','ad'] },
  { name: 'responder-http-on', cmd: 'responder-http-on', desc: 'Responder configuration helper', category: 'Active Directory', images: ['full','ad'] },
  { name: 'responder-http-off', cmd: 'responder-http-off', desc: 'Responder configuration helper', category: 'Active Directory', images: ['full','ad'] },
  { name: 'rusthound-ce', cmd: 'rusthound-ce', desc: 'BloodHound CE collector (Rust)', category: 'Active Directory', images: ['full','ad'] },
  { name: 'rusthound', cmd: 'rusthound', desc: 'BloodHound legacy collector (Rust)', category: 'Active Directory', images: ['full','ad'] },
  { name: 'bloodbash', cmd: 'bloodbash', desc: 'BloodHound-based offensive automation', category: 'Active Directory', images: ['full','ad'] },
  { name: 'kerbrute', cmd: 'kerbrute', desc: 'Kerberos brute-force / user enumeration', category: 'Active Directory', images: ['full','ad'] },
  { name: 'windapsearch', cmd: 'windapsearch', desc: 'LDAP enumeration (Go)', category: 'Active Directory', images: ['full','ad'] },
  { name: 'krbrelayx', cmd: 'krbrelayx', desc: 'Kerberos relay attacks', category: 'Active Directory', images: ['full','ad'] },
  { name: 'gmsadumper', cmd: 'gmsadumper', desc: 'gMSA credential extraction', category: 'Active Directory', images: ['full','ad'] },
  { name: 'FindUncommonShares', cmd: 'FindUncommonShares', desc: 'Discover non-standard SMB shares', category: 'Active Directory', images: ['full','ad'] },
  { name: 'targetedKerberoast', cmd: 'targetedKerberoast', desc: 'Kerberoast via ACL abuse', category: 'Active Directory', images: ['full','ad'] },
  { name: 'PKINITtools', cmd: 'gettgtpkinit', desc: 'PKINIT exploitation (shadow creds, UnPAC-the-hash)', category: 'Active Directory', images: ['full','ad'] },
  { name: 'noPac', cmd: 'noPac', desc: 'CVE-2021-42278/42287 Sam-Account-Name spoofing', category: 'Active Directory', images: ['full','ad'] },
  { name: 'PetitPotam', cmd: 'PetitPotam', desc: 'NTLM relay via EFS (CVE-2021-36942)', category: 'Active Directory', images: ['full','ad'] },
  { name: 'zerologon', cmd: 'cve-2020-1472-exploit', desc: 'CVE-2020-1472 Netlogon exploit', category: 'Active Directory', images: ['full','ad'] },
  { name: 'ShadowCoerce', cmd: 'ShadowCoerce', desc: 'Coercion via MS-FSRVP', category: 'Active Directory', images: ['full','ad'] },
  { name: 'DFSCoerce', cmd: 'DFSCoerce', desc: 'Coercion via MS-DFSNM', category: 'Active Directory', images: ['full','ad'] },
  { name: 'openldap', cmd: 'ldapsearch', desc: 'LDAP command-line utilities', category: 'Active Directory', images: ['full','ad'] },
  { name: 'smbclient', cmd: 'smbclient', desc: 'SMB command-line client', category: 'Active Directory', images: ['full','ad'] },
  { name: 'rpcclient', cmd: 'rpcclient', desc: 'Samba MS-RPC command-line client', category: 'Active Directory', images: ['full','ad'] },
  { name: 'powershell', cmd: 'pwsh', desc: 'PowerShell 7', category: 'Active Directory', images: ['full','ad'] },
  { name: 'ntlm_theft', cmd: 'ntlm_theft', desc: 'Generate files to steal NTLM hashes via UNC paths', category: 'Active Directory', images: ['full','ad'] },
  { name: 'smtp-user-enum', cmd: 'smtp-user-enum', desc: 'SMTP user enumeration via VRFY, EXPN and RCPT', category: 'Active Directory', images: ['full','ad'] },
  { name: 'neo4j', cmd: 'neo4j', desc: 'Neo4j graph database (BloodHound CE backend)', category: 'Active Directory', images: ['full','ad'] },
  { name: 'cypher-shell', cmd: 'cypher-shell', desc: 'Neo4j Cypher query shell', category: 'Active Directory', images: ['full','ad'] },
  { name: 'gofenrir', cmd: 'gf', desc: 'Fast AD user/group enumeration (Go)', category: 'Active Directory', images: ['full','ad'] },
  { name: 'asrepcatcher', cmd: 'ASRepCatcher', desc: 'AS-REP Roasting listener', category: 'Active Directory', images: ['full','ad'] },
  { name: 'autobloody', cmd: 'autobloody', desc: 'BloodyAD automation wrapper', category: 'Active Directory', images: ['full','ad'] },
  { name: 'certsync', cmd: 'certsync', desc: 'Sync ADCS certs for PKINIT', category: 'Active Directory', images: ['full','ad'] },
  { name: 'crackhound', cmd: 'crackhound', desc: 'BloodHound + hashcat path cracking', category: 'Active Directory', images: ['full','ad'] },
  { name: 'godap', cmd: 'godap', desc: 'Interactive LDAP client (TUI)', category: 'Active Directory', images: ['full','ad'] },
  { name: 'goexec', cmd: 'goexec', desc: 'Remote code execution via SMB/WMI', category: 'Active Directory', images: ['full','ad'] },
  { name: 'goldencopy', cmd: 'goldencopy', desc: 'Copy/forge Kerberos tickets', category: 'Active Directory', images: ['full','ad'] },
  { name: 'gosecretsdump', cmd: 'gosecretsdump', desc: 'Pure Go secretsdump', category: 'Active Directory', images: ['full','ad'] },
  { name: 'GPOddity', cmd: 'gpoddity', desc: 'GPO abuse automation', category: 'Active Directory', images: ['full','ad'] },
  { name: 'gpp-decrypt', cmd: 'gpp-decrypt', desc: 'Decrypt GPP passwords', category: 'Active Directory', images: ['full','ad'] },
  { name: 'keepwn', cmd: 'KeePwn', desc: 'KeePass trigger attack', category: 'Active Directory', images: ['full','ad'] },
  { name: 'krbjack', cmd: 'krbjack', desc: 'Kerberos pre-auth hijack', category: 'Active Directory', images: ['full','ad'] },
  { name: 'ldaprelayscan', cmd: 'ldaprelayscan', desc: 'LDAP relay attack scanner', category: 'Active Directory', images: ['full','ad'] },
  { name: 'ldeep', cmd: 'ldeep', desc: 'Deep LDAP enumeration', category: 'Active Directory', images: ['full','ad'] },
  { name: 'LDAPWordlistHarvester', cmd: 'LDAPWordlistHarvester', desc: 'Build wordlists from LDAP', category: 'Active Directory', images: ['full','ad'] },
  { name: 'nbtscan', cmd: 'nbtscan', desc: 'NBT-NS scanner', category: 'Active Directory', images: ['full','ad'] },
  { name: 'PassTheCert', cmd: 'passthecert', desc: 'Pass-the-cert LDAP/LDAPS auth', category: 'Active Directory', images: ['full','ad'] },
  { name: 'PCredz', cmd: 'Pcredz', desc: 'Network credential capture', category: 'Active Directory', images: ['full','ad'] },
  { name: 'pygpoabuse', cmd: 'pygpoabuse', desc: 'GPO immediate task abuse', category: 'Active Directory', images: ['full','ad'] },
  { name: 'sccmhunter', cmd: 'sccmhunter', desc: 'SCCM attack framework', category: 'Active Directory', images: ['full','ad'] },
  { name: 'teamsphisher', cmd: 'teamsphisher', desc: 'Teams external phishing', category: 'Active Directory', images: ['full','ad'] },
  { name: 'tombstone', cmd: 'tombstone', desc: 'Query and restore deleted Active Directory objects', category: 'Active Directory', images: ['full','ad'] },
  { name: 'sqlmap', cmd: 'sqlmap', desc: 'SQL injection testing', category: 'Web', images: ['full','web'] },
  { name: 'gobuster', cmd: 'gobuster', desc: 'Directory/subdomain brute-force', category: 'Web', images: ['full','web'] },
  { name: 'nikto', cmd: 'nikto', desc: 'Web server vulnerability scanner', category: 'Web', images: ['full','web'] },
  { name: 'wfuzz', cmd: 'wfuzz', desc: 'Web fuzzer', category: 'Web', images: ['full','web'] },
  { name: 'webfuzz', cmd: 'webfuzz', desc: 'HTTP web fuzzer', category: 'Web', images: ['full','web'] },
  { name: 'wenum', cmd: 'wenum', desc: 'Web enumeration and fuzzing tool', category: 'Web', images: ['full','web'] },
  { name: 'arjun', cmd: 'arjun', desc: 'HTTP parameter discovery', category: 'Web', images: ['full','web'] },
  { name: 'wafw00f', cmd: 'wafw00f', desc: 'WAF detection', category: 'Web', images: ['full','web'] },
  { name: 'gopherus', cmd: 'gopherus3', desc: 'SSRF exploitation via Gopher', category: 'Web', images: ['full','web'] },
  { name: 'droopescan', cmd: 'droopescan', desc: 'Drupal/CMS scanner', category: 'Web', images: ['full','web'] },
  { name: 'cmsmap', cmd: 'cmsmap', desc: 'CMS exploitation', category: 'Web', images: ['full','web'] },
  { name: 'ssrfmap', cmd: 'ssrfmap', desc: 'SSRF exploitation framework', category: 'Web', images: ['full','web'] },
  { name: 'jwt-tool', cmd: 'jwt-tool', desc: 'JWT manipulation and attacks', category: 'Web', images: ['full','web'] },
  { name: 'xsstrike', cmd: 'xsstrike', desc: 'XSS detection and exploitation', category: 'Web', images: ['full','web'] },
  { name: 'feroxbuster', cmd: 'feroxbuster', desc: 'Fast content discovery (Rust)', category: 'Web', images: ['full','web'] },
  { name: 'testssl.sh', cmd: 'testssl.sh', desc: 'TLS/SSL configuration testing', category: 'Web', images: ['full','web'] },
  { name: 'nuclei', cmd: 'nuclei', desc: 'Template-based vulnerability scanner', category: 'Web', images: ['full','web'] },
  { name: 'httpx', cmd: 'httpx', desc: 'HTTP probe and technology fingerprinting', category: 'Web', images: ['full','web'] },
  { name: 'subfinder', cmd: 'subfinder', desc: 'Passive subdomain enumeration', category: 'Web', images: ['full','web'] },
  { name: 'dnsx', cmd: 'dnsx', desc: 'Fast DNS resolver and toolkit', category: 'Web', images: ['full','web'] },
  { name: 'alterx', cmd: 'alterx', desc: 'Subdomain permutation generator', category: 'Web', images: ['full','web'] },
  { name: 'katana', cmd: 'katana', desc: 'Web crawler (ProjectDiscovery)', category: 'Web', images: ['full','web'] },
  { name: 'ffuf', cmd: 'ffuf', desc: 'Fast web fuzzer', category: 'Web', images: ['full','web'] },
  { name: 'dirsearch', cmd: 'dirsearch', desc: 'Directory brute-force', category: 'Web', images: ['full','web'] },
  { name: 'whatweb', cmd: 'whatweb', desc: 'Web technology fingerprinting', category: 'Web', images: ['full','web'] },
  { name: 'hakrawler', cmd: 'hakrawler', desc: 'Web crawler for endpoint discovery', category: 'Web', images: ['full','web'] },
  { name: 'gau', cmd: 'gau', desc: 'Get All URLs (Wayback, Common Crawl)', category: 'Web', images: ['full','web'] },
  { name: 'waybackurls', cmd: 'waybackurls', desc: 'Fetch URLs from Wayback Machine', category: 'Web', images: ['full','web'] },
  { name: 'commix', cmd: 'commix', desc: 'OS command injection exploitation', category: 'Web', images: ['full','web'] },
  { name: 'glpwnme', cmd: 'glpwnme', desc: 'GLPI exploitation helper', category: 'Web', images: ['full','web'] },
  { name: 'tplmap', cmd: 'tplmap', desc: 'Server-Side Template Injection', category: 'Web', images: ['full','web'] },
  { name: 'nosqlmap', cmd: 'nosqlmap', desc: 'NoSQL injection exploitation', category: 'Web', images: ['full','web'] },
  { name: 'graphqlmap', cmd: 'graphqlmap', desc: 'GraphQL exploitation', category: 'Web', images: ['full','web'] },
  { name: 'graphw00f', cmd: 'graphw00f', desc: 'GraphQL server fingerprinting', category: 'Web', images: ['full','web'] },
  { name: 'graphql-cop', cmd: 'graphql-cop', desc: 'GraphQL security auditing', category: 'Web', images: ['full','web'] },
  { name: 'corsy', cmd: 'corsy', desc: 'CORS misconfiguration scanner', category: 'Web', images: ['full','web'] },
  { name: 'crlfuzz', cmd: 'crlfuzz', desc: 'CRLF injection testing', category: 'Web', images: ['full','web'] },
  { name: 'mitmproxy', cmd: 'mitmproxy', desc: 'HTTP/HTTPS interception proxy', category: 'Web', images: ['full','web'] },
  { name: 'kiterunner', cmd: 'kr', desc: 'API endpoint discovery', category: 'Web', images: ['full','web'] },
  { name: 'httpie', cmd: 'http', desc: 'User-friendly HTTP client', category: 'Web', images: ['full','web'] },
  { name: 'caido', cmd: 'caido', desc: 'Web security desktop toolkit', category: 'Web', images: ['full','web'] },
  { name: 'caido-cli', cmd: 'caido-cli', desc: 'Caido command-line interface', category: 'Web', images: ['full','web'] },
  { name: 'swaks', cmd: 'swaks', desc: 'SMTP test tool (Swiss Army Knife for SMTP)', category: 'Web', images: ['full','web'] },
  { name: 'mail', cmd: 'mail', desc: 'Command-line email client (mailutils + msmtp)', category: 'Web', images: ['full','web'] },
  { name: 'burpsuite', cmd: 'burpsuite', desc: 'Web application security testing platform', category: 'Web', images: ['full','web'] },
  { name: 'EyeWitness', cmd: 'EyeWitness', desc: 'Web screenshot and service enumeration tool', category: 'Web', images: ['full','web'] },
  { name: 'wpscan', cmd: 'wpscan', desc: 'WordPress vulnerability scanner', category: 'Web', images: ['full','web'] },
  { name: 'wpprobe', cmd: 'wpprobe', desc: 'WordPress plugin and vulnerability scanner', category: 'Web', images: ['full','web'] },
  { name: 'bbot', cmd: 'bbot', desc: 'Automated recon and subdomain OSINT', category: 'Web', images: ['full','web'] },
  { name: 'byp4xx', cmd: 'byp4xx', desc: 'HTTP 40x bypass', category: 'Web', images: ['full','web'] },
  { name: 'git-dumper', cmd: 'git-dumper', desc: 'Dump exposed .git directories', category: 'Web', images: ['full','web'] },
  { name: 'gowitness', cmd: 'gowitness', desc: 'Web screenshot tool (Go)', category: 'Web', images: ['full','web'] },
  { name: 'httpmethods', cmd: 'httpmethods', desc: 'HTTP method enumeration', category: 'Web', images: ['full','web'] },
  { name: 'joomscan', cmd: 'joomscan', desc: 'Joomla vulnerability scanner', category: 'Web', images: ['full','web'] },
  { name: 'linkfinder', cmd: 'linkfinder', desc: 'Endpoint discovery in JS files', category: 'Web', images: ['full','web'] },
  { name: 'naabu', cmd: 'naabu', desc: 'Fast port scanner (ProjectDiscovery)', category: 'Web', images: ['full','web'] },
  { name: 'patator', cmd: 'patator', desc: 'Multi-purpose brute-forcer', category: 'Web', images: ['full','web'] },
  { name: 'updog', cmd: 'updog', desc: 'HTTP file server with upload (SimpleHTTPServer replacement)', category: 'Web', images: ['full','web'] },
  { name: 'wsgidav', cmd: 'wsgidav', desc: 'WebDAV server (serve files over WebDAV, e.g. for WebClient-based coercion/exfil)', category: 'Web', images: ['full','web'] },
  { name: 'phpggc', cmd: 'phpggc', desc: 'PHP gadget chain generator', category: 'Web', images: ['full','web'] },
  { name: 'smuggler', cmd: 'smuggler', desc: 'HTTP request smuggling tester', category: 'Web', images: ['full','web'] },
  { name: 'sslscan', cmd: 'sslscan', desc: 'SSL/TLS configuration scanner', category: 'Web', images: ['full','web'] },
  { name: 'xxeinjector', cmd: 'xxeinjector', desc: 'XXE injection automation', category: 'Web', images: ['full','web'] },
  { name: 'ysoserial', cmd: 'ysoserial', desc: 'Java deserialization exploit payloads', category: 'Web', images: ['full','web'] },
  { name: 'nmap', cmd: 'nmap', desc: 'Network scanner', category: 'Network', images: ['full','ad','web','blueteam'] },
  { name: 'netcat', cmd: 'nc', desc: 'Network utility (OpenBSD)', category: 'Network', images: ['full','ad','web','blueteam'] },
  { name: 'socat', cmd: 'socat', desc: 'Multipurpose network relay', category: 'Network', images: ['full','ad','web','blueteam'] },
  { name: 'wireshark-cli', cmd: 'tshark', desc: 'Network protocol analyzer (CLI)', category: 'Network', images: ['full','ad','web','blueteam'] },
  { name: 'wireshark', cmd: 'wireshark', desc: 'Network protocol analyzer (GUI)', category: 'Network', images: ['full','ad','web','blueteam'] },
  { name: 'fping', cmd: 'fping', desc: 'Fast ICMP host discovery', category: 'Network', images: ['full','ad','web','blueteam'] },
  { name: 'netdiscover', cmd: 'netdiscover', desc: 'Active/passive network address discovery', category: 'Network', images: ['full','ad','web','blueteam'] },
  { name: 'zone-dnsenum', cmd: 'zone-dnsenum', desc: 'DNS zone enumeration and transfer', category: 'Network', images: ['full','ad','web','blueteam'] },
  { name: 'dnsrecon', cmd: 'dnsrecon', desc: 'DNS enumeration and zone transfer testing', category: 'Network', images: ['full','ad','web','blueteam'] },
  { name: 'dnsenum', cmd: 'dnsenum', desc: 'DNS enumeration script', category: 'Network', images: ['full','ad','web','blueteam'] },
  { name: 'ngrok', cmd: 'ngrok', desc: 'Reverse tunnel for exposing local ports', category: 'Network', images: ['full','ad','web','blueteam'] },
  { name: 'udpx', cmd: 'udpx', desc: 'Fast UDP port scanner', category: 'Network', images: ['full','ad','web','blueteam'] },
  { name: 'bettercap', cmd: 'bettercap', desc: 'Network attack and monitoring framework', category: 'Network', images: ['full','ad','web','blueteam'] },
  { name: 'ligolo-ng', cmd: 'ligolo-ng', desc: 'Tunneling via TUN interface (proxy)', category: 'Network', images: ['full','ad','web','blueteam'] },
  { name: 'chisel', cmd: 'chisel', desc: 'TCP/UDP tunnel over HTTP', category: 'Network', images: ['full','ad','web','blueteam'] },
  { name: 'masscan', cmd: 'masscan', desc: 'Fast port scanner', category: 'Network', images: ['full','ad','web','blueteam'] },
  { name: 'nmap-parse-output', cmd: 'nmap-parse-output', desc: 'Nmap XML output parser', category: 'Network', images: ['full','ad','web','blueteam'] },
  { name: 'proxychains', cmd: 'proxychains', desc: 'SOCKS/HTTP proxy chain', category: 'Network', images: ['full','ad','web','blueteam'] },
  { name: 'rustscan', cmd: 'rustscan', desc: 'Fast port scanner (Rust)', category: 'Network', images: ['full','ad','web','blueteam'] },
  { name: 'ssh-audit', cmd: 'ssh-audit', desc: 'SSH server configuration audit', category: 'Network', images: ['full','ad','web','blueteam'] },
  { name: 'sshuttle', cmd: 'sshuttle', desc: 'VPN over SSH', category: 'Network', images: ['full','ad','web','blueteam'] },
  { name: 'tcpdump', cmd: 'tcpdump', desc: 'Packet capture', category: 'Network', images: ['full','ad','web','blueteam'] },
  { name: 'snmpwalk', cmd: 'snmpwalk', desc: 'SNMP tree walker', category: 'Network', images: ['full','ad','web','blueteam'] },
  { name: 'onesixtyone', cmd: 'onesixtyone', desc: 'SNMP community string scanner', category: 'Network', images: ['full','ad','web','blueteam'] },
  { name: 'xfreerdp', cmd: 'xfreerdp3', desc: 'RDP client', category: 'Network', images: ['full','ad','web','blueteam'] },
  { name: 'rdesktop', cmd: 'rdesktop', desc: 'Legacy RDP client', category: 'Network', images: ['full','ad','web','blueteam'] },
  { name: 'nfs-utils', cmd: 'showmount', desc: 'NFS client utilities (showmount, nfsstat, rpcinfo)', category: 'Network', images: ['full','ad','web','blueteam'] },
  { name: 'pypykatz', cmd: 'pypykatz', desc: 'LSASS minidump parser (Python)', category: 'Credential', images: ['full','ad','web'] },
  { name: 'defaultcreds-cheat-sheet', cmd: 'creds', desc: 'Search vendor default credentials', category: 'Credential', images: ['full','ad','web'] },
  { name: 'trufflehog', cmd: 'trufflehog', desc: 'Scan Git repositories and files for secrets', category: 'Credential', images: ['full','ad','web'] },
  { name: 'binwalk', cmd: 'binwalk', desc: 'Binary analysis / extraction', category: 'Credential', images: ['full','ad','web'] },
  { name: 'john', cmd: 'john', desc: 'Password cracker (John the Ripper)', category: 'Credential', images: ['full','ad','web'] },
  { name: 'zip2john', cmd: 'zip2john', desc: 'Convert ZIP archives to John hashes', category: 'Credential', images: ['full','ad','web'] },
  { name: 'rar2john', cmd: 'rar2john', desc: 'Convert RAR archives to John hashes', category: 'Credential', images: ['full','ad','web'] },
  { name: 'pdf2john', cmd: 'pdf2john', desc: 'Convert PDF files to John hashes', category: 'Credential', images: ['full','ad','web'] },
  { name: 'ssh2john', cmd: 'ssh2john', desc: 'Convert SSH keys to John hashes', category: 'Credential', images: ['full','ad','web'] },
  { name: 'keepass2john', cmd: 'keepass2john', desc: 'Convert KeePass databases to John hashes', category: 'Credential', images: ['full','ad','web'] },
  { name: 'keychain2john', cmd: 'keychain2john', desc: 'Convert keychains to John hashes', category: 'Credential', images: ['full','ad','web'] },
  { name: 'pfx2john', cmd: 'pfx2john', desc: 'Convert PFX files to John hashes', category: 'Credential', images: ['full','ad','web'] },
  { name: 'office2john', cmd: 'office2john', desc: 'Convert Office documents to John hashes', category: 'Credential', images: ['full','ad','web'] },
  { name: 'pwsafe2john', cmd: 'pwsafe2john', desc: 'Convert Password Safe files to John hashes', category: 'Credential', images: ['full','ad','web'] },
  { name: 'xortool', cmd: 'xortool', desc: 'Analyze repeating-key XOR ciphers', category: 'Credential', images: ['full','ad','web'] },
  { name: 'xortool-xor', cmd: 'xortool-xor', desc: 'Apply XOR with a supplied key', category: 'Credential', images: ['full','ad','web'] },
  { name: 'hashcat', cmd: 'hashcat', desc: 'GPU password cracker', category: 'Credential', images: ['full','ad','web'] },
  { name: 'haiti', cmd: 'haiti', desc: 'Hash type identifier', category: 'Credential', images: ['full','ad','web'] },
  { name: 'fcrackzip', cmd: 'fcrackzip', desc: 'ZIP password cracker', category: 'Credential', images: ['full','ad','web'] },
  { name: 'hydra', cmd: 'hydra', desc: 'Multi-protocol brute-forcer', category: 'Credential', images: ['full','ad','web'] },
  { name: 'name-that-hash', cmd: 'nth', desc: 'Hash identifier', category: 'Credential', images: ['full','ad','web'] },
  { name: 'pdfcrack', cmd: 'pdfcrack', desc: 'PDF password cracker', category: 'Credential', images: ['full','ad','web'] },
  { name: 'radare2', cmd: 'r2', desc: 'Reverse engineering framework', category: 'Pwn', images: ['full'] },
  { name: 'strace', cmd: 'strace', desc: 'System call tracer', category: 'Pwn', images: ['full'] },
  { name: 'ltrace', cmd: 'ltrace', desc: 'Library call tracer', category: 'Pwn', images: ['full'] },
  { name: 'cmake', cmd: 'cmake', desc: 'Build system generator', category: 'Pwn', images: ['full'] },
  { name: 'pwntools', cmd: 'pwn', desc: 'CTF/exploit development library', category: 'Pwn', images: ['full'] },
  { name: 'ROPgadget', cmd: 'ROPgadget', desc: 'ROP gadget finder', category: 'Pwn', images: ['full'] },
  { name: 'pwndbg', cmd: '/opt/tools/gdb/pwndbg/gdbinit.py', desc: 'GDB plugin for exploit dev', category: 'Pwn', images: ['full'] },
  { name: 'peda', cmd: '/opt/tools/gdb/peda/peda.py', desc: 'Python Exploit Development Assistance for GDB', category: 'Pwn', images: ['full'] },
  { name: 'gef', cmd: '/opt/tools/gdb/gef/gef.py', desc: 'GDB Enhanced Features for exploit devs and reverse engineers', category: 'Pwn', images: ['full'] },
  { name: 'one_gadget', cmd: 'one_gadget', desc: 'One-gadget RCE finder for libc', category: 'Pwn', images: ['full'] },
  { name: 'seccomp-tools', cmd: 'seccomp-tools', desc: 'Seccomp filter analyzer', category: 'Pwn', images: ['full'] },
  { name: 'checksec', cmd: 'checksec', desc: 'Binary security property checker', category: 'Pwn', images: ['full'] },
  { name: 'patchelf', cmd: 'patchelf', desc: 'Patch ELF interpreters, rpaths and dependencies', category: 'Pwn', images: ['full'] },
  { name: 'pwninit', cmd: 'pwninit', desc: 'Initialize pwn challenges with matching libc/ld', category: 'Pwn', images: ['full'] },
  { name: 'metasploit', cmd: 'msfconsole', desc: 'Exploitation framework', category: 'C2', images: ['full','ad'] },
  { name: 'sliver', cmd: 'sliver-server', desc: 'C2 framework', category: 'C2', images: ['full','ad'] },
  { name: 'penelope', cmd: 'penelope', desc: 'Advanced reverse shell handler', category: 'C2', images: ['full','ad'] },
  { name: 'pwncat-vl', cmd: 'pwncat-vl', desc: 'Maintained fork of pwncat-cs with reverse/bind shell automation', category: 'C2', images: ['full','ad'] },
  { name: 'mythic-cli', cmd: 'mythic-cli', desc: 'Mythic C2 framework management CLI', category: 'C2', images: ['full','ad'] },
  { name: 'searchsploit', cmd: 'searchsploit', desc: 'Exploit database search', category: 'Misc', images: ['full','ad','web'] },
  { name: 'ansible', cmd: 'ansible', desc: 'Infrastructure automation and remote execution', category: 'Misc', images: ['full','ad','web'] },
  { name: 'CyberChef', cmd: '/opt/tools/CyberChef', desc: 'Data transformation toolkit (offline)', category: 'Misc', images: ['full','ad','web'] },
  { name: 'firefox', cmd: 'firefox', desc: 'Web browser', category: 'Misc', images: ['full','ad','web'] },
  { name: 'chromium', cmd: 'chromium', desc: 'Web browser (no-sandbox wrapper)', category: 'Misc', images: ['full','ad','web'] },
  { name: 'grc', cmd: 'grc', desc: 'Generic log colorizer', category: 'Misc', images: ['full','ad','web'] },
  { name: 'sqlitebrowser', cmd: 'sqlitebrowser', desc: 'GUI SQLite database browser', category: 'Misc', images: ['full','ad','web'] },
  { name: 'sqlite3', cmd: 'sqlite3', desc: 'SQLite command-line client', category: 'Misc', images: ['full','ad','web'] },
  { name: 'keepassxc', cmd: 'keepassxc', desc: 'KeePass password manager', category: 'Misc', images: ['full','ad','web'] },
  { name: 'rsync', cmd: 'rsync', desc: 'File sync utility', category: 'Misc', images: ['full','ad','web'] },
  { name: 'wesng', cmd: 'wes', desc: 'Windows Exploit Suggester NG', category: 'Misc', images: ['full','ad','web'] },
  { name: 'gitleaks', cmd: 'gitleaks', desc: 'Git secrets scanner', category: 'Misc', images: ['full','ad','web'] },
  { name: 'ghidra', cmd: 'ghidra', desc: 'NSA reverse engineering suite', category: 'Reverse Engineering', images: ['full'] },
  { name: 'ida', cmd: 'ida64', desc: 'IDA Free interactive disassembler', category: 'Reverse Engineering', images: ['full'] },
  { name: 'binaryninja', cmd: 'binaryninja', desc: 'Binary Ninja Free reverse engineering platform', category: 'Reverse Engineering', images: ['full'] },
  { name: 'angr', cmd: 'angr', desc: 'Symbolic execution and binary analysis', category: 'Reverse Engineering', images: ['full'] },
  { name: 'pycdc', cmd: 'pycdc', desc: 'Python bytecode decompiler', category: 'Reverse Engineering', images: ['full'] },
  { name: 'uncompyle6', cmd: 'uncompyle6', desc: 'Python 2/3 bytecode decompiler', category: 'Reverse Engineering', images: ['full'] },
  { name: 'pycdas', cmd: 'pycdas', desc: 'Python bytecode disassembler', category: 'Reverse Engineering', images: ['full'] },
  { name: 'nasm', cmd: 'nasm', desc: 'x86/x64 assembler', category: 'Reverse Engineering', images: ['full'] },
  { name: 'RsaCtfTool', cmd: 'RsaCtfTool', desc: 'RSA attack automation', category: 'Crypto', images: ['full'] },
  { name: 'xortool', cmd: 'xortool', desc: 'XOR cipher analysis', category: 'Crypto', images: ['full'] },
  { name: 'z3-solver', cmd: 'z3-solver', desc: 'SMT constraint solver', category: 'Crypto', images: ['full'] },
  { name: 'pycryptodome', cmd: 'pycryptodome', desc: 'Python crypto library', category: 'Crypto', images: ['full'] },
  { name: 'hashid', cmd: 'hashid', desc: 'Hash type identifier', category: 'Crypto', images: ['full'] },
  { name: 'volatility3', cmd: 'vol', desc: 'Memory forensics framework', category: 'Forensics', images: ['full','blueteam'] },
  { name: 'foremost', cmd: 'foremost', desc: 'File carving tool', category: 'Forensics', images: ['full','blueteam'] },
  { name: 'exiftool', cmd: 'exiftool', desc: 'Metadata extraction', category: 'Forensics', images: ['full','blueteam'] },
  { name: 'steghide', cmd: 'steghide', desc: 'JPEG/BMP steganography', category: 'Forensics', images: ['full','blueteam'] },
  { name: 'zsteg', cmd: 'zsteg', desc: 'PNG/BMP steganography detector', category: 'Forensics', images: ['full','blueteam'] },
  { name: 'stegseek', cmd: 'stegseek', desc: 'Steghide brute-forcer', category: 'Forensics', images: ['full','blueteam'] },
  { name: 'openstego', cmd: 'openstego', desc: 'Steganography tool', category: 'Forensics', images: ['full','blueteam'] },
  { name: 'jadx', cmd: 'jadx', desc: 'Android/Java decompiler', category: 'Forensics', images: ['full','blueteam'] },
  { name: 'seclists', cmd: '/opt/lists/seclists', desc: 'Security wordlists collection', category: 'Wordlists', images: ['full','ad','web','blueteam'] },
  { name: 'rockyou', cmd: '/opt/lists/rockyou.txt', desc: 'Rockyou password list (extracted from seclists)', category: 'Wordlists', images: ['full','ad','web','blueteam'] },
  { name: 'cewl', cmd: 'cewl', desc: 'Wordlist generator from websites', category: 'Wordlists', images: ['full','ad','web','blueteam'] },
  { name: 'crunch', cmd: 'crunch', desc: 'Wordlist generator', category: 'Wordlists', images: ['full','ad','web','blueteam'] },
  { name: 'cupp', cmd: 'cupp', desc: 'Custom user password profiler', category: 'Wordlists', images: ['full','ad','web','blueteam'] },
  { name: 'username-anarchy', cmd: 'username-anarchy', desc: 'Username generation from names', category: 'Wordlists', images: ['full','ad','web','blueteam'] },
  { name: 'chainsaw', cmd: 'chainsaw', desc: 'Windows event log threat hunting', category: 'Blue Team', images: ['full','blueteam'] },
  { name: 'hayabusa', cmd: 'hayabusa', desc: 'Windows DFIR timeline generator', category: 'Blue Team', images: ['full','blueteam'] },
  { name: 'sigma-cli', cmd: 'sigma', desc: 'Sigma detection rule CLI', category: 'Blue Team', images: ['full','blueteam'] },
  { name: 'wazuh-cli', cmd: 'wazuh-cli', desc: 'Wazuh SIEM/XDR management CLI', category: 'Blue Team', images: ['full','blueteam'] },
  { name: 'yara', cmd: 'yara', desc: 'Malware pattern matching', category: 'Blue Team', images: ['full','blueteam'] },
  { name: 'capa', cmd: 'capa', desc: 'FLARE malware capability detection', category: 'Blue Team', images: ['full','blueteam'] },
  { name: 'loki', cmd: 'loki', desc: 'IOC scanner', category: 'Blue Team', images: ['full','blueteam'] },
  { name: 'sleuthkit', cmd: 'fls', desc: 'Disk forensics toolkit (The Sleuth Kit)', category: 'Blue Team', images: ['full','blueteam'] },
  { name: 'amass', cmd: 'amass', desc: 'Subdomain enumeration (OWASP)', category: 'OSINT', images: ['full','web'] },
  { name: 'recon-ng', cmd: 'recon-ng', desc: 'Web recon framework', category: 'OSINT', images: ['full','web'] },
  { name: 'sherlock', cmd: 'sherlock', desc: 'Username OSINT across platforms', category: 'OSINT', images: ['full','web'] },
  { name: 'spiderfoot', cmd: 'spiderfoot', desc: 'Automated OSINT framework', category: 'OSINT', images: ['full','web'] },
  { name: 'sublist3r', cmd: 'sublist3r', desc: 'Subdomain enumeration', category: 'OSINT', images: ['full','web'] },
  { name: 'theHarvester', cmd: 'theHarvester', desc: 'Email and domain OSINT', category: 'OSINT', images: ['full','web'] },
  { name: 'mailscout', cmd: 'mailscout', desc: 'IMAP and POP3 mailbox enumeration', category: 'OSINT', images: ['full','web'] },
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
