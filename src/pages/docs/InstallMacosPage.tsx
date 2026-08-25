import React from 'react';
import { SectionToc } from '../../components/SectionToc';
import { Callout, StepList, TldrBlock } from '../../components/DocsBlocks';

export const InstallMacosPage: React.FC = () => {
  return (
    <div className="space-y-8 w-full">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          Docs / Getting Started / <span className="text-amber-400">macOS</span>
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          Install Nihil on macOS
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl">
          Nihil runs on macOS, on Apple Silicon and Intel alike. Our images are published for <code>linux/amd64</code>, so Apple Silicon runs them through your Docker engine's emulation layer. The CLI selects the right platform for you.
        </p>
      </header>

      <div className="grid sm:grid-cols-[minmax(0,_1fr)_180px] gap-8 items-start">
        <div className="space-y-10 min-w-0">
          <section id="tldr">
            <TldrBlock
              items={[
                'Apple Silicon works: nihil pulls the amd64 images and runs them under emulation.',
                'Use OrbStack, or Docker Desktop with Rosetta enabled.',
                'Host network mode is unavailable, nihil falls back to bridge automatically.',
                'Expect slower tool execution than on a native Linux host.',
              ]}
            />
          </section>

          <section id="support" className="space-y-3">
            <h2 className="text-xl font-semibold text-white">What is supported</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border border-slate-800 rounded-lg overflow-hidden">
                <thead className="bg-slate-900/80 text-slate-300">
                  <tr>
                    <th className="px-4 py-2 font-medium">Host</th>
                    <th className="px-4 py-2 font-medium">How images run</th>
                    <th className="px-4 py-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="text-slate-400">
                  <tr className="border-t border-slate-800">
                    <td className="px-4 py-2">Apple Silicon (M1 and later)</td>
                    <td className="px-4 py-2"><code>linux/amd64</code> under Rosetta or QEMU</td>
                    <td className="px-4 py-2 text-emerald-300">Supported</td>
                  </tr>
                  <tr className="border-t border-slate-800">
                    <td className="px-4 py-2">Intel Mac</td>
                    <td className="px-4 py-2"><code>linux/amd64</code> natively</td>
                    <td className="px-4 py-2 text-emerald-300">Supported</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-slate-400 text-sm">
              We do not publish native <code>linux/arm64</code> images. On Apple Silicon every tool runs translated, which is correct but slower than the same tool on a Linux host.
            </p>
          </section>

          <section id="prereqs" className="space-y-3">
            <h2 className="text-xl font-semibold text-white">Prerequisites</h2>
            <ul className="list-disc list-inside text-slate-300 text-sm space-y-1">
              <li>A Docker engine with amd64 emulation: <strong>OrbStack</strong> (recommended) or <strong>Docker Desktop</strong></li>
              <li>Python 3.12 or newer</li>
              <li><code>pipx</code> available (recommended)</li>
            </ul>
            <Callout variant="note" title="Docker Desktop on Apple Silicon">
              Enable Rosetta for x86_64/amd64 emulation in Docker Desktop settings. Without it, amd64 containers fall back to QEMU, which is noticeably slower and less reliable for some tools. OrbStack handles this out of the box.
            </Callout>
            <Callout variant="note" title="Quick check">
              Run <code>docker --version</code> and <code>docker ps</code>. If Docker is not accessible, fix that before installing nihil.
            </Callout>
          </section>

          <section id="install" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Install the CLI</h2>
            <StepList
              steps={[
                { title: 'Install pipx', detail: 'Homebrew is the simplest route on macOS.' },
                { title: 'Install nihil with pipx', detail: 'Keeps your Python environment clean and easy to update.' },
                { title: 'Open a new shell', detail: 'So the nihil command lands on your PATH.' },
              ]}
            />
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto text-slate-200 font-mono">
{`brew install pipx
pipx ensurepath

pipx install "git+https://github.com/TheNullPigeons/nihil.git"

nihil doctor`}
            </pre>
            <p className="text-slate-400 text-sm">
              <code>nihil doctor</code> reports which Docker engine it detected, so you can confirm OrbStack or Docker Desktop is being picked up before going further.
            </p>
          </section>

          <section id="first-container" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">First container</h2>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto text-slate-200 font-mono">
{`# Pull an image (nihil selects linux/amd64 for you)
nihil install full

# Create and start a container
nihil start my-pentest --workspace ~/engagements/acme`}
            </pre>
            <p className="text-slate-400 text-sm">
              The first pull is a large download and the first start is slower than on Linux, since every layer runs translated. Subsequent starts are quick.
            </p>
          </section>

          <section id="limitations" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Known limitations</h2>
            <ul className="list-disc list-inside text-slate-300 text-sm space-y-2">
              <li>
                <strong>No host network mode.</strong> Docker on macOS runs inside a Linux VM, so <code>--network host</code> does not reach your Mac's interfaces. nihil detects this and prints <em>"Host networking is not supported on this platform. Switching to 'docker' network mode."</em>, then continues on the bridge network. Publish ports explicitly when you need inbound access.
              </li>
              <li>
                <strong>No host device passthrough.</strong> USB devices and wireless adapters are not visible to the container, which rules out Wi-Fi and RF work from a Mac host. Use a Linux host for those engagements.
              </li>
              <li>
                <strong>Performance.</strong> Emulated amd64 is slower than native, most visibly on CPU-heavy tools such as hashcat, or long brute-force and cracking runs.
              </li>
              <li>
                <strong>GUI tools need XQuartz.</strong> Install and start XQuartz, then run <code>xhost +localhost</code> on your Mac. nihil reminds you when it detects macOS with X11 enabled.
              </li>
              <li>
                <strong>Local builds are slow.</strong> <code>nihil build</code> works on Apple Silicon, nihil passes <code>--platform linux/amd64</code> so the amd64-only Arch base resolves correctly, but every build step then runs emulated. Building a full image takes considerably longer than on a Linux host. Prefer the published images with <code>nihil install</code> unless you are actually modifying a Dockerfile.
              </li>
            </ul>
          </section>

          <section id="troubleshooting" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Troubleshooting</h2>
            <div className="space-y-3">
              <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-4 space-y-2">
                <p className="text-sm font-medium text-white"><code>no matching manifest for linux/arm64/v8</code></p>
                <p className="text-sm text-slate-400">
                  Your nihil predates Apple Silicon support. Update with <code>pipx install "git+https://github.com/TheNullPigeons/nihil.git" --force</code>.
                </p>
              </div>
              <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-4 space-y-2">
                <p className="text-sm font-medium text-white"><code>exec format error</code> when the container starts</p>
                <p className="text-sm text-slate-400">
                  The image was pulled correctly but your engine has no amd64 emulation available. Enable Rosetta in Docker Desktop, or switch to OrbStack.
                </p>
              </div>
              <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-4 space-y-2">
                <p className="text-sm font-medium text-white">A tool that works on Linux misbehaves here</p>
                <p className="text-sm text-slate-400">
                  Emulation is faithful but not perfect, and some binaries are sensitive to it. Report it with the tool name and the exact error, it helps us build the compatibility list.
                </p>
              </div>
            </div>
          </section>

          <Callout variant="tip" title="When to prefer a Linux host">
            macOS is a good daily driver for web, AD and infra work. Reach for a Linux host or VM when you need host networking, USB or wireless device access, or full speed on cracking workloads.
          </Callout>

          <p className="text-slate-500 text-xs">
            Apple Silicon support was contributed by <a className="text-amber-400 hover:text-amber-300 hover:underline underline-offset-2" href="https://github.com/whiteov3rflow" target="_blank" rel="noopener noreferrer">@whiteov3rflow</a> in <a className="text-amber-400 hover:text-amber-300 hover:underline underline-offset-2" href="https://github.com/TheNullPigeons/nihil/pull/5" target="_blank" rel="noopener noreferrer">PR #5</a>.
          </p>
        </div>

        <SectionToc
          items={[
            { id: 'tldr', label: 'TL;DR' },
            { id: 'support', label: 'What is supported' },
            { id: 'prereqs', label: 'Prerequisites' },
            { id: 'install', label: 'Install the CLI' },
            { id: 'first-container', label: 'First container' },
            { id: 'limitations', label: 'Known limitations' },
            { id: 'troubleshooting', label: 'Troubleshooting' },
          ]}
        />
      </div>
    </div>
  );
};
