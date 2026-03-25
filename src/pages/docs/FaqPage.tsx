import React from 'react';
import { SectionToc } from '../../components/SectionToc';
import { Callout, TldrBlock } from '../../components/DocsBlocks';

const Q: React.FC<{ q: string; children: React.ReactNode }> = ({ q, children }) => (
  <div className="space-y-2">
    <p className="text-white text-sm font-medium">{q}</p>
    <div className="text-slate-400 text-sm space-y-2 pl-3 border-l border-slate-800">{children}</div>
  </div>
);

export const FaqPage: React.FC = () => {
  return (
    <div className="space-y-8 w-full">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          Docs / <span className="text-amber-400">FAQ</span>
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          FAQ
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl">
          Answers to frequently asked questions about Nihil.
        </p>
      </header>

      <div className="grid sm:grid-cols-[minmax(0,_1fr)_180px] gap-8 items-start">
        <div className="space-y-10 min-w-0">
          <section id="tldr">
            <TldrBlock
              items={[
                'Linux is the reference platform; Windows should use WSL2.',
                'Most runtime issues are resolved by nihil doctor + Docker checks.',
                'Use --workspace for persistent project files.',
                'Use --privileged only when required by tooling.',
              ]}
            />
          </section>

          <section id="install" className="space-y-5">
            <h2 className="text-xl font-semibold text-white">Installation</h2>

            <Q q="Does Nihil work on Windows?">
              <p>Nihil runs best on Linux. On Windows, use WSL2 with Docker Desktop.</p>
            </Q>

            <Q q="pipx is not available, what do I do?">
              <p>Use <code className="text-xs bg-slate-900 px-1 py-0.5 rounded border border-slate-700">pip install -e .</code> as a fallback.</p>
            </Q>

            <Q q="The Docker image fails to pull, why?">
              <ol className="list-decimal list-inside space-y-1">
                <li>Make sure Docker is running</li>
                <li>Check your internet connection</li>
                <li>Run <code className="text-xs bg-slate-900 px-1 py-0.5 rounded border border-slate-700">nihil doctor</code> for diagnostics</li>
              </ol>
            </Q>
          </section>

          <section id="usage" className="space-y-5">
            <h2 className="text-xl font-semibold text-white">Usage</h2>

            <Q q="How do I share files between my host and the container?">
              <p>
                Use <code className="text-xs bg-slate-900 px-1 py-0.5 rounded border border-slate-700">--workspace ~/my-files</code>. Your files are mounted in <code className="text-xs bg-slate-900 px-1 py-0.5 rounded border border-slate-700">/workspace</code>.
              </p>
            </Q>

            <Q q="The container closes immediately, why?">
              <p>
                Only use <code className="text-xs bg-slate-900 px-1 py-0.5 rounded border border-slate-700">--no-shell</code> when running non-interactive commands. Without it, Nihil opens a zsh shell automatically.
              </p>
            </Q>

            <Q q="How do I access the host network?">
              <p>Run with <code className="text-xs bg-slate-900 px-1 py-0.5 rounded border border-slate-700">--network host</code>.</p>
            </Q>

            <Q q="How do I run tools that require elevated privileges?">
              <p>
                Start with <code className="text-xs bg-slate-900 px-1 py-0.5 rounded border border-slate-700">--privileged</code> (and optionally <code className="text-xs bg-slate-900 px-1 py-0.5 rounded border border-slate-700">--network host</code> if required).
              </p>
            </Q>
          </section>

          <section id="permissions" className="space-y-5">
            <h2 className="text-xl font-semibold text-white">Permissions & Docker</h2>

            <Q q='"Permission denied" with Docker'>
              <p>Add your user to the docker group: <code className="text-xs bg-slate-900 px-1 py-0.5 rounded border border-slate-700">sudo usermod -aG docker $USER</code>, then reopen your shell.</p>
            </Q>

            <Q q="Container won't start">
              <p>Check container logs, then run <code className="text-xs bg-slate-900 px-1 py-0.5 rounded border border-slate-700">nihil doctor</code> for environment diagnostics.</p>
            </Q>

            <Q q='Error "Image not found"'>
              <p>The image is pulled automatically. If it fails, retry with <code className="text-xs bg-slate-900 px-1 py-0.5 rounded border border-slate-700">nihil install</code>.</p>
            </Q>
          </section>

          <section id="security" className="space-y-5">
            <h2 className="text-xl font-semibold text-white">Security</h2>

            <Q q="Is --privileged safe to use?">
              <p>
                <code className="text-xs bg-slate-900 px-1 py-0.5 rounded border border-slate-700">--privileged</code> gives broad access to the host. Use it only when needed and in isolated test environments.
              </p>
            </Q>

            <Q q="Are my data and files secure?">
              <p>
                Containers are isolated, but mounted volumes are accessible from the host. Only mount directories you trust.
              </p>
            </Q>
          </section>

          <section id="troubleshooting" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Troubleshooting quick wins</h2>
            <Callout variant="note" title="First command to run">
              Always begin with <code>nihil doctor</code>. It catches the most common environment issues.
            </Callout>
            <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
              <li>If Docker access fails, verify daemon status and group membership.</li>
              <li>If image pull fails, test connectivity and retry <code>nihil install</code>.</li>
              <li>If command is missing after install, open a new shell session.</li>
            </ul>
          </section>

          <section id="contribute" className="space-y-5">
            <h2 className="text-xl font-semibold text-white">Contributing</h2>

            <Q q="How do I report a bug?">
              <p>
                Open an issue on{' '}
                <a
                  href="https://github.com/TheNullPigeons/nihil/issues"
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-400 hover:underline"
                >
                  GitHub
                </a>{' '}
                with: description, steps to reproduce, error logs, and your Nihil version.
              </p>
            </Q>

            <Q q="How do I contribute a feature?">
              <p>Open an issue to discuss the feature first, then submit a pull request.</p>
            </Q>
          </section>
        </div>

        <SectionToc
          items={[
            { id: 'tldr', label: 'TL;DR' },
            { id: 'install', label: 'Installation' },
            { id: 'usage', label: 'Usage' },
            { id: 'permissions', label: 'Permissions & Docker' },
            { id: 'security', label: 'Security' },
            { id: 'troubleshooting', label: 'Troubleshooting' },
            { id: 'contribute', label: 'Contributing' },
          ]}
        />
      </div>
    </div>
  );
};
