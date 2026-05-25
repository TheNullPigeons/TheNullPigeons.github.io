import React from 'react';
import { SectionToc } from '../../components/SectionToc';
import { Callout, TldrBlock } from '../../components/DocsBlocks';

export const ResourcesPage: React.FC = () => {
  return (
    <div className="space-y-8 w-full">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          Docs / <span className="text-amber-400">Resources</span>
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          nihil-resources
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl">
          A versioned, shared catalog of offensive resources mounted read-only
          into every nihil container. Scripts, payloads, agent binaries, and
          curated wordlists -- all reviewable and opt-in.
        </p>
      </header>

      <div className="grid sm:grid-cols-[minmax(0,_1fr)_180px] gap-8 items-start">
        <div className="space-y-10 min-w-0">

          <section id="tldr">
            <TldrBlock
              items={[
                'nihil resources install clones the catalog into ~/.nihil/nihil-resources.',
                'nihil resources sync fetches enabled resources from catalog/resources.toml.',
                'The catalog is mounted read-only at /opt/resources inside every container.',
                'Use --profile to limit sync to the resources relevant to your image.',
              ]}
            />
          </section>

          <section id="overview" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Overview</h2>
            <p className="text-slate-400 text-sm">
              nihil-resources is a git repository that acts as the shared resource layer for nihil.
              Unlike nihil-images, which bakes tools into the Docker image, nihil-resources ships
              operator material that belongs on disk and changes frequently: PowerShell scripts,
              webshells, privesc helpers, agent binaries, and small curated wordlists.
            </p>
            <p className="text-slate-400 text-sm">
              The wrapper clones it once and mounts it into every container at{' '}
              <code className="text-amber-300">/opt/resources</code> (read-only).
              Nothing inside the container can modify it.
            </p>
            <Callout variant="tip" title="Design philosophy">
              nihil-resources favors a small, explicit, reviewable set of resources over an opaque
              binary dump. Heavy or fast-moving payloads are declared in the catalog and fetched
              on demand rather than committed to the repository.
            </Callout>
          </section>

          <section id="quickstart" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Quick start</h2>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`# 1. Clone the catalog
nihil resources install

# 2. Fetch resources enabled in the catalog
nihil resources sync

# 3. Start a container -- /opt/resources is mounted automatically
nihil start my-lab`}
            </pre>
            <p className="text-slate-400 text-sm">
              By default the catalog is cloned to{' '}
              <code className="text-amber-300">~/.nihil/nihil-resources</code>.
              Pass <code className="text-amber-300">--path</code> to override.
            </p>
          </section>

          <section id="commands" className="space-y-6">
            <h2 className="text-xl font-semibold text-white">Commands</h2>

            <div className="space-y-3">
              <h3 className="text-base font-semibold text-slate-200">install</h3>
              <p className="text-slate-400 text-sm">
                Clones the nihil-resources repository with all submodules. Fails if the destination
                already exists unless <code className="text-amber-300">--force</code> is passed.
              </p>
              <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`nihil resources install
nihil resources install --path ~/dev/nihil-resources
nihil resources install --force   # re-clone after confirmation`}
              </pre>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-semibold text-slate-200">update</h3>
              <p className="text-slate-400 text-sm">
                Runs <code>git pull --ff-only</code> then{' '}
                <code>git submodule update --init --recursive --remote --merge</code> on the local clone.
              </p>
              <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`nihil resources update`}
              </pre>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-semibold text-slate-200">sync</h3>
              <p className="text-slate-400 text-sm">
                Runs <code>scripts/sync.py sync</code> inside the local clone. Downloads all
                resources marked <code>enabled = true</code> in{' '}
                <code className="text-amber-300">catalog/resources.toml</code>.
                Use <code className="text-amber-300">--profile</code> to limit to the resources
                relevant to a specific image variant.
              </p>
              <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`nihil resources sync                       # all enabled resources
nihil resources sync --profile ad          # AD/internal only
nihil resources sync --profile web         # web resources only
nihil resources sync --profile blueteam`}
              </pre>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-semibold text-slate-200">status</h3>
              <p className="text-slate-400 text-sm">
                Shows local clone state: path, remote URL, branch, last commit, and whether the
                working tree is clean.
              </p>
              <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`nihil resources status`}
              </pre>
            </div>
          </section>

          <section id="catalog" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Catalog</h2>
            <p className="text-slate-400 text-sm">
              <code className="text-amber-300">catalog/resources.toml</code> is the source of truth
              for what can be synced. Each entry declares an <code>id</code>, <code>name</code>,{' '}
              <code>category</code>, target path, fetch method, and whether it is enabled.
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`[[resource]]
id       = "powerview"
name     = "PowerView"
category = "active-directory"
profiles = ["full", "ad"]
target   = "active-directory/enum/PowerView.ps1"
kind     = "url"
url      = "https://raw.githubusercontent.com/..."
enabled  = true`}
            </pre>
            <p className="text-slate-400 text-sm">Three fetch methods are supported:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-700/80 text-slate-400">
                    <th className="text-left py-2 pr-4">kind</th>
                    <th className="text-left py-2">How it is fetched</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300 text-sm">
                  {[
                    ['url', 'Direct HTTP download (pinnable with sha256)'],
                    ['release_asset', 'Latest release asset fetched from GitHub API'],
                    ['submodule', 'Git submodule -- updated with git submodule update'],
                  ].map(([kind, desc]) => (
                    <tr key={kind} className="border-b border-slate-800/50">
                      <td className="py-2 pr-4 font-mono text-amber-300 text-xs">{kind}</td>
                      <td className="py-2 text-slate-400">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Callout variant="note" title="No resource is enabled by default">
              Every entry ships disabled. Enable only what your team has reviewed. Prefer pinning
              a <code>sha256</code> on <code>url</code> entries before enabling them in production.
            </Callout>
          </section>

          <section id="profiles" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Profiles</h2>
            <p className="text-slate-400 text-sm">
              Profiles are defined in{' '}
              <code className="text-amber-300">catalog/profiles.toml</code> and map to nihil image
              variants. Passing <code>--profile</code> to <code>nihil resources sync</code> restricts
              the sync to resources tagged with that profile.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-700/80 text-slate-400">
                    <th className="text-left py-2 pr-4">Profile</th>
                    <th className="text-left py-2">Categories included</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300 text-sm">
                  {([
                    ['full', 'setup, active-directory, linux, windows, web, wordlists, cheatsheets, bin'],
                    ['ad', 'setup, active-directory, linux, windows, wordlists, cheatsheets, bin'],
                    ['web', 'setup, web, linux, wordlists, cheatsheets, bin'],
                    ['blueteam', 'setup, linux, wordlists'],
                  ] as [string, string][]).map(([profile, cats]) => (
                    <tr key={profile} className="border-b border-slate-800/50">
                      <td className="py-2 pr-4 font-mono text-amber-300 text-xs">{profile}</td>
                      <td className="py-2 text-slate-400 text-xs">{cats}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="layout" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Repository layout</h2>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`nihil-resources/
├── setup/              # shell/editor defaults applied at container start
│   ├── zsh/
│   ├── nvim/
│   └── tmux/
├── active-directory/   # PowerShell scripts, relay, coerce, bloodhound helpers
├── linux/              # enum, privesc, pivot, transfer helpers
├── windows/            # portable Windows operator files and binaries
├── web/                # webshells, payloads, templates, GraphQL helpers
├── wordlists/          # small curated lists only -- not SecLists mirrors
├── cheatsheets/        # operator notes and quick references
├── bin/                # tiny wrappers added to PATH inside containers
├── catalog/
│   ├── resources.toml  # resource declarations (kind, url, enabled, sha256)
│   └── profiles.toml   # profile -> category mappings
└── scripts/
    ├── sync.py         # user-facing fetch script (nihil resources sync)
    └── update.py       # maintainer script for pinning new URLs and checksums`}
            </pre>
          </section>

          <section id="mount" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Mount point</h2>
            <p className="text-slate-400 text-sm">
              nihil mounts the local clone at{' '}
              <code className="text-amber-300">/opt/resources</code> inside every container,
              read-only. The mount is skipped silently if the clone does not exist yet.
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`# Inside a running container
ls /opt/resources/active-directory/
ls /opt/resources/windows/privesc/
ls /opt/resources/web/webshells/`}
            </pre>
          </section>

          <section id="configuration" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Configuration</h2>
            <p className="text-slate-400 text-sm">
              Three keys in <code className="text-amber-300">~/.nihil/config.yml</code> control
              nihil-resources behavior:
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`nihil_resources:
  enabled: true                        # mount /opt/resources in containers
  path: ~/.nihil/nihil-resources       # local clone path
  auto_update: false                   # git pull at every container start`}
            </pre>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-700/80 text-slate-400">
                    <th className="text-left py-2 pr-4">Key</th>
                    <th className="text-left py-2 pr-4">Default</th>
                    <th className="text-left py-2">Effect</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300 text-sm">
                  {[
                    ['enabled', 'true', 'Mount /opt/resources in every container'],
                    ['path', '~/.nihil/nihil-resources', 'Local path of the cloned repository'],
                    ['auto_update', 'false', 'Run git pull at every nihil start'],
                  ].map(([key, def, effect]) => (
                    <tr key={key} className="border-b border-slate-800/50">
                      <td className="py-2 pr-4 font-mono text-amber-300 text-xs">{key}</td>
                      <td className="py-2 pr-4 font-mono text-slate-400 text-xs">{def}</td>
                      <td className="py-2 text-slate-400">{effect}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Callout variant="tip" title="Custom clone path">
              If you clone to a non-default path, update <code>nihil_resources.path</code> in config
              or nihil will still look in <code>~/.nihil/nihil-resources</code> and skip the mount.
            </Callout>
          </section>

          <section id="what-not-to-add" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">What not to add</h2>
            <p className="text-slate-400 text-sm">nihil-resources is not a general-purpose dump. Keep out:</p>
            <ul className="list-disc list-inside text-slate-400 text-sm space-y-1 ml-1">
              <li>Engagement output, customer data, credentials, VPN files</li>
              <li>Large archives or SecLists mirrors (those live in the image)</li>
              <li>Unpinned latest binaries with no review</li>
              <li>Tools that already belong in nihil-images</li>
            </ul>
            <p className="text-slate-400 text-sm">
              If something must always be present in every container, it belongs in{' '}
              <strong className="text-slate-300">nihil-images</strong>.
              If it is engagement-specific, it belongs in the mounted workspace or nihil-history.
            </p>
          </section>

        </div>

        <SectionToc
          items={[
            { id: 'tldr', label: 'TL;DR' },
            { id: 'overview', label: 'Overview' },
            { id: 'quickstart', label: 'Quick start' },
            { id: 'commands', label: 'Commands' },
            { id: 'catalog', label: 'Catalog' },
            { id: 'profiles', label: 'Profiles' },
            { id: 'layout', label: 'Repository layout' },
            { id: 'mount', label: 'Mount point' },
            { id: 'configuration', label: 'Configuration' },
            { id: 'what-not-to-add', label: 'What not to add' },
          ]}
        />
      </div>
    </div>
  );
};
