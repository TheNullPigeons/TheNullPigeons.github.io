import React from 'react';
import { Link } from 'react-router-dom';
import { SectionToc } from '../../components/SectionToc';
import { Callout, StepList, TldrBlock } from '../../components/DocsBlocks';

export const InstallWindowsPage: React.FC = () => {
  return (
    <div className="space-y-8 w-full">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          Docs / Getting Started / <span className="text-amber-400">Windows</span>
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          Install Nihil on Windows
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl">
          Nihil runs on Windows through WSL2. The CLI lives inside a Linux distribution, and Docker either runs in
          that same distribution or comes from Docker Desktop. Once you are in the WSL shell, everything works like
          on Linux.
        </p>
      </header>

      <div className="grid sm:grid-cols-[minmax(0,_1fr)_180px] gap-8 items-start">
        <div className="space-y-10 min-w-0">
          <section id="tldr">
            <TldrBlock
              items={[
                'Install and run nihil inside a WSL2 distribution, not from PowerShell or cmd.',
                'Docker Engine inside WSL2 is recommended; Docker Desktop with the WSL2 backend also works.',
                'Host network mode needs Docker Engine inside WSL2. On Docker Desktop nihil falls back to the docker network automatically.',
                'Keep your workspaces in the Linux filesystem (~/), not under /mnt/c.',
              ]}
            />
          </section>

          <section id="support" className="space-y-3">
            <h2 className="text-xl font-semibold text-white">What is supported</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border border-slate-800 rounded-lg overflow-hidden">
                <thead className="bg-slate-900/80 text-slate-300">
                  <tr>
                    <th className="px-4 py-2 font-medium">Setup</th>
                    <th className="px-4 py-2 font-medium">Host network mode</th>
                    <th className="px-4 py-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="text-slate-400">
                  <tr className="border-t border-slate-800">
                    <td className="px-4 py-2">WSL2 + Docker Engine installed in the distribution</td>
                    <td className="px-4 py-2">Yes</td>
                    <td className="px-4 py-2 text-emerald-300">Supported (recommended)</td>
                  </tr>
                  <tr className="border-t border-slate-800">
                    <td className="px-4 py-2">WSL2 + Docker Desktop (WSL2 backend)</td>
                    <td className="px-4 py-2">No, falls back to <code>docker</code></td>
                    <td className="px-4 py-2 text-emerald-300">Supported</td>
                  </tr>
                  <tr className="border-t border-slate-800">
                    <td className="px-4 py-2">Native Windows (PowerShell / cmd)</td>
                    <td className="px-4 py-2">-</td>
                    <td className="px-4 py-2 text-amber-400">Not supported</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-slate-400 text-sm">
              Nihil detects WSL and the Docker engine it talks to. <code>nihil doctor</code> prints both, so you can
              check which setup you are on at any time.
            </p>
          </section>

          <section id="prereqs" className="space-y-3">
            <h2 className="text-xl font-semibold text-white">Prerequisites</h2>
            <ul className="list-disc list-inside text-slate-400 text-sm space-y-1">
              <li>Windows 11, or Windows 10 version 2004 (build 19041) or later</li>
              <li>Virtualization enabled in the BIOS / UEFI</li>
              <li>A WSL2 distribution with Python 3.12 or later (Ubuntu 24.04 ships it)</li>
              <li><code>git</code> and <code>pipx</code> inside the distribution</li>
            </ul>
          </section>

          <section id="wsl" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">1. Install WSL2</h2>
            <p className="text-slate-400 text-sm">
              From PowerShell run as administrator. This installs WSL2 and an Ubuntu distribution, then asks you to reboot.
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`wsl --install

# After the reboot, check that the distribution runs on WSL 2
wsl -l -v`}
            </pre>
            <p className="text-slate-400 text-sm">
              Open the <strong className="text-slate-200">Ubuntu</strong> app (or run <code>wsl</code>): every following
              command runs in that Linux shell.
            </p>
          </section>

          <section id="docker" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">2. Set up Docker</h2>
            <p className="text-slate-400 text-sm">Pick one of the two options.</p>

            <h3 className="text-base font-semibold text-slate-200">Option A: Docker Engine inside WSL2 (recommended)</h3>
            <p className="text-slate-400 text-sm">
              Install Docker Engine in the distribution by following the official{' '}
              <a href="https://docs.docker.com/engine/install/ubuntu/" target="_blank" rel="noreferrer" className="text-amber-400 hover:underline">
                Docker Engine guide for Ubuntu
              </a>
              , then let your user talk to the daemon. This is the only setup where host network mode works.
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`sudo usermod -aG docker $USER
# Close and reopen the WSL shell, then:
docker run --rm hello-world`}
            </pre>
            <Callout variant="tip" title="Docker does not start?">
              The Docker service needs systemd. If <code>systemctl</code> is unavailable in your distribution, add{' '}
              <code>[boot]</code> / <code>systemd=true</code> to <code>/etc/wsl.conf</code>, then run{' '}
              <code>wsl --shutdown</code> from PowerShell and reopen the shell.
            </Callout>

            <h3 className="text-base font-semibold text-slate-200 pt-2">Option B: Docker Desktop</h3>
            <StepList
              steps={[
                { title: 'Install Docker Desktop', detail: 'Keep the WSL 2 based engine enabled during setup.' },
                { title: 'Enable WSL integration', detail: 'Settings → Resources → WSL integration, then turn it on for your distribution.' },
                { title: 'Check from the WSL shell', detail: 'Run docker run --rm hello-world inside the distribution.' },
              ]}
            />
          </section>

          <section id="install" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">3. Install Nihil</h2>
            <p className="text-slate-400 text-sm">Inside the WSL shell, exactly as on Linux:</p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`sudo apt install -y git pipx
pipx ensurepath
pipx install "git+https://github.com/TheNullPigeons/nihil.git"

# Open a new shell, then pull an image
nihil install`}
            </pre>
            <p className="text-slate-400 text-sm">
              Image channels, image variants, updates and uninstalling are covered in the{' '}
              <Link to="/docs/installation/linux" className="text-amber-400 hover:underline">Linux guide</Link>; they
              behave the same under WSL2.
            </p>
          </section>

          <section id="first-container" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">4. First container</h2>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`# Check Python, the Docker engine and your images
nihil doctor

# Start a container with a workspace in the Linux filesystem
mkdir -p ~/engagements/acme
nihil start acme --workspace ~/engagements/acme`}
            </pre>
          </section>

          <section id="limitations" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Known limitations</h2>
            <ul className="list-disc list-inside text-slate-400 text-sm space-y-2">
              <li>
                <strong className="text-slate-200">Host network mode</strong> is only available with Docker Engine
                inside WSL2. With Docker Desktop nihil prints a warning and switches to the <code>docker</code> network.
              </li>
              <li>
                <strong className="text-slate-200">File performance:</strong> workspaces under <code>/mnt/c</code> go
                through the Windows filesystem bridge and are much slower. Keep them under <code>~/</code>.
              </li>
              <li>
                <strong className="text-slate-200">GUI tools</strong> use the <code>DISPLAY</code> and{' '}
                <code>WAYLAND_DISPLAY</code> of the distribution, which WSLg provides on Windows 11. If forwarding gets
                in the way, start the container with <code>--disable-x11</code> or <code>--disable-wayland</code>.
              </li>
              <li>
                <strong className="text-slate-200">USB and wireless adapters</strong> are not visible to WSL by default.
                For that kind of work, a Linux host is still the better choice.
              </li>
            </ul>
          </section>

          <section id="troubleshooting" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Troubleshooting</h2>
            <Callout variant="warning" title="Cannot connect to the Docker daemon">
              With Docker Engine, check that the service is running (<code>sudo service docker start</code>) and that you
              reopened the shell after joining the <code>docker</code> group. With Docker Desktop, check that WSL
              integration is enabled for this distribution.
            </Callout>
            <Callout variant="note" title="nihil: command not found">
              Run <code>pipx ensurepath</code>, then open a new WSL shell.
            </Callout>
          </section>
        </div>

        <SectionToc
          items={[
            { id: 'tldr', label: 'TL;DR' },
            { id: 'support', label: 'What is supported' },
            { id: 'prereqs', label: 'Prerequisites' },
            { id: 'wsl', label: 'Install WSL2' },
            { id: 'docker', label: 'Set up Docker' },
            { id: 'install', label: 'Install Nihil' },
            { id: 'first-container', label: 'First container' },
            { id: 'limitations', label: 'Known limitations' },
            { id: 'troubleshooting', label: 'Troubleshooting' },
          ]}
        />
      </div>
    </div>
  );
};
