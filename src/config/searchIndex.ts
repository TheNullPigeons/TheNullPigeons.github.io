export interface SearchEntry {
  /** Page title, shown as the group header in search results. */
  page: string;
  /** Route to navigate to, optionally with a `#section-id` anchor. */
  path: string;
  /** Section label, or the page description when there is no sub-section. */
  label: string;
  /** Extra terms that should match this entry but aren't shown. */
  keywords?: string[];
}

export const searchIndex: SearchEntry[] = [
  // Installation
  { page: 'Installation - Linux', path: '/docs/installation/linux', label: 'Install nihil with pipx or pip, pull your first image.' },
  { page: 'Installation - Linux', path: '/docs/installation/linux#install-pipx', label: 'Install with pipx' },
  { page: 'Installation - Linux', path: '/docs/installation/linux#install-pip', label: 'Install with pip' },
  { page: 'Installation - Linux', path: '/docs/installation/linux#pull-image', label: 'Pull a Nihil image' },
  { page: 'Installation - Linux', path: '/docs/installation/linux#first-container', label: 'First container' },
  { page: 'Installation - Linux', path: '/docs/installation/linux#update-uninstall', label: 'Update / Uninstall' },
  { page: 'Installation - Linux', path: '/docs/installation/linux#troubleshooting', label: 'Troubleshooting' },
  { page: 'Installation - macOS', path: '/docs/installation/macos', label: 'What is supported, prerequisites, and known limitations.' },
  { page: 'Installation - macOS', path: '/docs/installation/macos#support', label: 'What is supported' },
  { page: 'Installation - macOS', path: '/docs/installation/macos#limitations', label: 'Known limitations' },
  { page: 'Installation - macOS', path: '/docs/installation/macos#troubleshooting', label: 'Troubleshooting' },
  { page: 'Installation - Windows', path: '/docs/installation/windows', label: 'Install nihil on Windows via WSL2.', keywords: ['wsl', 'wsl2'] },
  { page: 'Installation - Windows', path: '/docs/installation/windows#wsl2-workaround', label: 'WSL2 workaround', keywords: ['wsl', 'wsl2'] },

  // CLI
  { page: 'CLI Commands', path: '/docs/usage', label: 'Complete reference for nihil CLI commands and workflows.' },
  { page: 'CLI Commands', path: '/docs/usage#workflow', label: 'Daily workflow' },
  { page: 'CLI Commands', path: '/docs/usage#images', label: 'Image lifecycle' },
  { page: 'CLI Commands', path: '/docs/usage#custom-images', label: 'Custom image sources' },
  { page: 'CLI Commands', path: '/docs/usage#profiles', label: 'Container profiles' },
  { page: 'CLI Commands', path: '/docs/usage#commands', label: 'Command reference (short)' },
  { page: 'CLI Commands', path: '/docs/usage#recipes', label: 'Common recipes' },
  { page: 'CLI Commands', path: '/docs/usage#display', label: 'X11 / Wayland GUI support', keywords: ['x11', 'wayland', 'gui'] },
  { page: 'CLI Commands', path: '/docs/usage#troubleshooting', label: 'Troubleshooting' },
  { page: 'Configuration', path: '/docs/configuration', label: 'Configure nihil paths, resources, env variables, and command history.' },
  { page: 'Configuration', path: '/docs/configuration#config-file', label: 'Config file' },
  { page: 'Configuration', path: '/docs/configuration#image-sources', label: 'Image sources' },
  { page: 'Configuration', path: '/docs/configuration#display', label: 'Display' },
  { page: 'Configuration', path: '/docs/configuration#my-resources', label: 'My Resources' },
  { page: 'Configuration', path: '/docs/configuration#examples', label: 'Examples' },
  { page: 'Configuration', path: '/docs/configuration#env-vars', label: 'Environment variables' },
  { page: 'Configuration', path: '/docs/configuration#cmd-history', label: 'Command history' },
  { page: 'Shell Completion', path: '/docs/completion', label: 'Enable shell autocompletion for nihil commands.' },
  { page: 'Shell Completion', path: '/docs/completion#bash', label: 'Bash' },
  { page: 'Shell Completion', path: '/docs/completion#zsh', label: 'Zsh' },
  { page: 'Shell Completion', path: '/docs/completion#troubleshoot', label: 'Troubleshooting' },
  { page: 'Command History', path: '/docs/history', label: 'Understand and manage nihil command history files.' },
  { page: 'Command History', path: '/docs/history#location', label: 'Location' },
  { page: 'Command History', path: '/docs/history#format', label: 'Format' },
  { page: 'Command History', path: '/docs/history#cleanup', label: 'Cleanup' },

  // Images
  { page: 'Images', path: '/docs/images', label: 'Compare nihil images and pick the best stack for your engagement.' },
  { page: 'Images', path: '/docs/images#comparison', label: 'Comparison' },
  { page: 'Images', path: '/docs/images#registries', label: 'Image registry' },
  { page: 'Images', path: '/docs/images#choose', label: 'Which image?' },
  { page: 'Tools', path: '/docs/tools', label: 'Browse all offensive security tools included in nihil images by category and image variant.' },
  { page: 'Architecture', path: '/docs/architecture', label: 'Understand how nihil CLI, Docker manager, and image pipeline fit together.' },
  { page: 'Architecture', path: '/docs/architecture#flow', label: 'Command flow' },
  { page: 'Architecture', path: '/docs/architecture#structure', label: 'Project structure' },
  { page: 'Architecture', path: '/docs/architecture#build-pipeline', label: 'Build pipeline' },
  { page: 'Architecture', path: '/docs/architecture#registries', label: 'Registries' },
  { page: 'Architecture', path: '/docs/architecture#ci', label: 'CI/CD', keywords: ['github actions'] },
  { page: 'Services', path: '/docs/service', label: 'Understand session services in nihil, including Desktop Browser UI and port behavior.' },
  { page: 'Services', path: '/docs/service#desktop', label: 'Desktop Browser UI' },
  { page: 'Services', path: '/docs/service#bloodhound-ce', label: 'BloodHound CE', keywords: ['bloodhound'] },
  { page: 'Services', path: '/docs/service#scope', label: 'Scope & limits' },

  // Resources
  { page: 'Resources', path: '/docs/resources', label: 'Versioned shared resource catalog for nihil.' },
  { page: 'Resources', path: '/docs/resources#commands', label: 'Commands' },
  { page: 'Resources', path: '/docs/resources#profiles', label: 'Profiles' },
  { page: 'Resources', path: '/docs/resources#layout', label: 'Repository layout' },
  { page: 'Resources', path: '/docs/resources#mount', label: 'Mount point' },
  { page: 'Resources', path: '/docs/resources#what-not-to-add', label: 'What not to add' },
  { page: 'Resource Catalog', path: '/docs/resources/catalog', label: 'Browse all nihil-resources entries: webshells, Windows binaries, Linux helpers, AD scripts, and wordlists.', keywords: ['webshell', 'wordlist', 'active directory'] },

  // nihil-history
  { page: 'nihil-history', path: '/docs/nihil-history', label: 'Track credentials, hosts, and access links across engagements.' },
  { page: 'nihil-history', path: '/docs/nihil-history#quickstart', label: 'Quick start' },
  { page: 'nihil-history', path: '/docs/nihil-history#engagements', label: 'Engagements' },
  { page: 'nihil-history', path: '/docs/nihil-history#credentials', label: 'Credentials' },
  { page: 'nihil-history', path: '/docs/nihil-history#hosts', label: 'Hosts' },
  { page: 'nihil-history', path: '/docs/nihil-history#access', label: 'Access links' },
  { page: 'nihil-history', path: '/docs/nihil-history#sync', label: 'Sync from tools' },
  { page: 'nihil-history', path: '/docs/nihil-history#export', label: 'Export reports' },
  { page: 'nihil-history', path: '/docs/nihil-history#tui', label: 'TUI', keywords: ['terminal ui'] },
  { page: 'nihil-history', path: '/docs/nihil-history#storage', label: 'Data storage' },
  { page: 'nihil-history', path: '/docs/nihil-history#troubleshooting', label: 'Troubleshooting' },

  // MCP
  { page: 'nihil-mcp', path: '/docs/mcp', label: 'Model Context Protocol server for AI-assisted container management.', keywords: ['claude', 'model context protocol', 'ai assistant'] },
  { page: 'nihil-mcp', path: '/docs/mcp#install', label: 'Install' },
  { page: 'nihil-mcp', path: '/docs/mcp#usage', label: 'Usage' },
  { page: 'nihil-mcp', path: '/docs/mcp#tools', label: 'Tools' },
  { page: 'nihil-mcp', path: '/docs/mcp#sessions', label: 'Sessions' },
  { page: 'nihil-mcp', path: '/docs/mcp#security', label: 'Security' },

  // NTP
  { page: 'nihil-ntp', path: '/docs/nihil-ntp', label: 'Synchronize container time with a domain controller for reliable Kerberos authentication.', keywords: ['time sync', 'kerberos'] },
  { page: 'nihil-ntp', path: '/docs/nihil-ntp#setup', label: 'Configure' },
  { page: 'nihil-ntp', path: '/docs/nihil-ntp#commands', label: 'Commands' },
  { page: 'nihil-ntp', path: '/docs/nihil-ntp#kerberos', label: 'Kerberos workflow' },

  // About / FAQ / Contributing
  { page: 'About', path: '/docs/about', label: 'Why nihil was built and how the project is structured.' },
  { page: 'About', path: '/docs/about#why', label: 'Why we built this' },
  { page: 'About', path: '/docs/about#components', label: 'What Nihil is' },
  { page: 'About', path: '/docs/about#design', label: 'Design choices' },
  { page: 'About', path: '/docs/about#team', label: 'Who we are' },
  { page: 'FAQ', path: '/docs/faq', label: 'Answers to frequent questions about nihil setup and usage.' },
  { page: 'FAQ', path: '/docs/faq#install', label: 'Installation' },
  { page: 'FAQ', path: '/docs/faq#permissions', label: 'Permissions & Docker', keywords: ['sudo', 'rootless'] },
  { page: 'FAQ', path: '/docs/faq#security', label: 'Security' },
  { page: 'FAQ', path: '/docs/faq#troubleshooting', label: 'Troubleshooting' },
  { page: 'Contributing', path: '/docs/contributing', label: 'Report bugs, request tools, and contribute to the nihil ecosystem.' },
  { page: 'Contributing', path: '/docs/contributing#bugs', label: 'Report a bug' },
  { page: 'Contributing', path: '/docs/contributing#add-tool', label: 'Add a tool' },
  { page: 'Contributing', path: '/docs/contributing#dev-setup', label: 'Dev setup' },
  { page: 'Contributing', path: '/docs/contributing#custom-image', label: 'Custom image' },

  // Rest of the site
  { page: 'Overview', path: '/', label: 'Professional offensive lab environment for security professionals.' },
  { page: 'Blog', path: '/blog', label: 'News, release notes, and practical offensive workflow updates.' },
  { page: 'Community', path: '/community', label: 'Join discussions, share feedback, and follow project updates.' },
  { page: 'Pricing', path: '/pricing', label: 'Project support options for individuals and teams.' },
  { page: 'Source Code', path: '/source-code', label: 'Browse repositories behind nihil and nihil-images.' },
];
