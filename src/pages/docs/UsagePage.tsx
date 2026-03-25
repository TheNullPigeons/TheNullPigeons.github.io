import React from 'react';
import { SectionToc } from '../../components/SectionToc';
import { Callout, StepList, TldrBlock } from '../../components/DocsBlocks';

export const UsagePage: React.FC = () => {
  return (
    <div className="space-y-8 w-full">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          Docs / <span className="text-amber-400">CLI Commands</span>
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          CLI Commands
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl">
          Core workflows and practical command patterns for daily nihil usage.
        </p>
      </header>

      <div className="grid sm:grid-cols-[minmax(0,_1fr)_180px] gap-8 items-start">
        <div className="space-y-10 min-w-0">
          <section id="tldr">
            <TldrBlock
              items={[
                'Use nihil start with --workspace for persistent work.',
                'Use nihil exec for one-off commands in running containers.',
                'Use nihil info and nihil doctor when debugging state issues.',
                'Use nihil remove / uninstall to keep host clean.',
              ]}
            />
          </section>

          <section id="workflow" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Daily workflow</h2>
            <StepList
              steps={[
                { title: 'Start a container', detail: 'Use nihil start with explicit image/workspace options.' },
                { title: 'Run commands', detail: 'Use nihil exec for one-shot actions or shell access.' },
                { title: 'Inspect state', detail: 'Use nihil info to list container/image status.' },
                { title: 'Stop or remove', detail: 'Stop with nihil stop, cleanup with nihil remove.' },
              ]}
            />
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`# Start
nihil start my-pentest
nihil start web-pentest --workspace ~/projects/web
# Exec / inspect
nihil exec my-pentest
nihil info --container my-pentest
# Stop
nihil stop my-pentest`}
            </pre>
            <Callout variant="tip" title="Most useful flags">
              <code>--image</code>, <code>--workspace</code>, <code>--network host</code>, <code>--privileged</code>, <code>--vpn</code>.
            </Callout>
          </section>

          <section id="images" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Image lifecycle</h2>
            <p className="text-slate-400 text-sm">Pull, update, and remove images with explicit commands.</p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`nihil install
nihil install ad
nihil update
nihil update web
nihil upgrade
nihil uninstall`}
            </pre>
          </section>

          <section id="commands" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Command reference (short)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-700/80 text-slate-400">
                    <th className="text-left py-2 pr-3">Command</th>
                    <th className="text-left py-2">Use case</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300 text-sm">
                  {[
                    ['nihil start', 'Create/start a container'],
                    ['nihil exec', 'Open shell or run one command'],
                    ['nihil stop', 'Stop running container'],
                    ['nihil remove', 'Delete container(s)'],
                    ['nihil install', 'Pull image variant'],
                    ['nihil images', 'List remote/local image variants'],
                    ['nihil update', 'Refresh local images'],
                    ['nihil upgrade', 'Recreate container on latest image'],
                    ['nihil info', 'Show images/containers status'],
                    ['nihil doctor', 'Run environment diagnostics'],
                    ['nihil tools', 'List tools by image/category'],
                    ['nihil config --edit', 'Open wrapper config in $EDITOR'],
                    ['nihil completion', 'Generate shell completion script'],
                    ['nihil version', 'Show wrapper version'],
                    ['nihil uninstall', 'Remove local images'],
                  ].map(([cmd, desc]) => (
                    <tr key={cmd} className="border-b border-slate-800/50">
                      <td className="py-2 pr-3 font-mono text-amber-300 text-xs">{cmd}</td>
                      <td className="py-2 text-slate-400">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="recipes" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Common recipes</h2>
            <p className="text-slate-400 text-sm">
              AD: <code>nihil start ad-lab --image ad --privileged --network host --workspace ~/ad-lab</code><br />
              Web: <code>nihil start web-lab --image web --workspace ~/projects/web</code><br />
              Recon: <code>nihil start net-lab --privileged --network host</code>
            </p>
          </section>

          <section id="troubleshooting" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Troubleshooting</h2>
            <Callout variant="note" title="If commands fail">
              Start with <code>nihil doctor</code>, then verify Docker daemon and your user permissions.
            </Callout>
            <p className="text-slate-400 text-sm">Quick triage: <code>nihil doctor</code>, then <code>docker ps</code>, then <code>nihil info</code>.</p>
          </section>
        </div>

        <SectionToc
          items={[
            { id: 'tldr', label: 'TL;DR' },
            { id: 'workflow', label: 'Daily workflow' },
            { id: 'images', label: 'Image lifecycle' },
            { id: 'commands', label: 'Command reference' },
            { id: 'recipes', label: 'Common recipes' },
            { id: 'troubleshooting', label: 'Troubleshooting' },
          ]}
        />
      </div>
    </div>
  );
};
