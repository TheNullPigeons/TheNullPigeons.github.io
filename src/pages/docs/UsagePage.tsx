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
                'X11 and Wayland forwarding are enabled by default; disable either one per container if needed.',
                'Use nihil exec for one-off commands in running containers.',
                'Use nihil upgrade to recreate containers while keeping saved tool state.',
                'Use nihil info, nihil image list and nihil doctor when debugging state issues.',
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
nihil start vpn-lab --vpn ~/vpn/client.ovpn --network docker
nihil start re --image full --tmux
nihil start ad-lab --image ad --env TARGET=10.10.10.1 --env PROXY --log
nihil start lab --script
# Exec / inspect
nihil exec my-pentest
nihil exec my-pentest nmap -V
nihil info -c my-pentest
nihil info --containers
nihil info -c
nihil info --images
nihil info -i
# Stop
nihil stop my-pentest`}
            </pre>
            <p className="text-slate-400 text-sm">
              Use <code>nihil restart my-pentest</code> to stop and start a container, then open your configured shell.
              Use <code>nihil restart my-pentest --no-shell</code> to restart without opening a shell,
              or <code>nihil restart web-pentest vpn-lab</code> to restart several containers without opening a shell.
              Stopped containers are started directly and configured VPN connections are started as needed.
              If one container fails, the remaining containers are still processed; the command returns an error and opens no shell.
            </p>
            <p className="text-slate-400 text-sm">
              Use <code>nihil start my-pentest --preset NAME</code> to create a container with saved settings,
              or omit NAME to choose interactively. See <a href="/docs/configuration#presets" className="text-sky-400 hover:underline">configuration presets</a> to create and manage them.
            </p>
            <Callout variant="tip" title="Most useful flags">
              <code>--image</code>, <code>--workspace</code>, <code>--workspace-here</code>, <code>--network</code>, <code>--privileged</code>, <code>--vpn</code>, <code>--vpn-user</code>, <code>--env</code>, <code>--tmux</code>.
            </Callout>
            <Callout variant="note" title="Interactive and automated execution">
              <code>nihil exec</code> allocates a terminal for an interactive shell and automatically runs without one in scripts, CI, and headless agents. Quoted arguments and <code>bash -c</code> scripts are passed unchanged to the container.
            </Callout>
            <Callout variant="note" title="VPN startup">
              <code>nihil start vpn-lab --vpn ~/vpn/client.ovpn --no-shell</code> starts the VPN without opening a shell.
              On an existing container, this connection stays active until it is stopped or the container is stopped.
              With an interactive shell, the session VPN stops when you leave the shell.
              Older containers keep their entrypoint-managed VPN; Nihil waits for it before replacing it with a session VPN.
              If that startup times out, retry after it completes.
            </Callout>
            <Callout variant="note" title="Startup scripts">
              <code>nihil start lab --script</code> opens an inline selector using about 70% of the terminal height. Use Space to select one
              or more scripts, then Enter; the default <code> load_user_setup.sh</code> and shell scripts from
              <code> ~/.nihil/my-resources/setup/scripts/</code> are available. Nihil runs the selection after
              starting the container, including when it is already running. The description comes from the
              script's first non-empty comment line.
            </Callout>
          </section>

          <section id="env-logging" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Environment variables &amp; logging</h2>
            <p className="text-slate-400 text-sm">
              Pass variables into a container with <code>--env</code> / <code>-e</code> (repeatable). With a value it
              sets the variable; without a value it forwards the one from your host environment. It works on
              <code>start</code>, <code>exec</code> and <code>upgrade</code>.
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`# Set and forward variables at creation
nihil start lab -e TARGET=10.10.10.1 -e HTTPS_PROXY

# Only for a single command
nihil exec lab -e DEBUG=1 ./run.sh

# Add one when recreating a container
nihil upgrade lab -e TARGET=10.10.10.2

# Record the shell session with asciinema
nihil start lab --log`}
            </pre>
            <p className="text-slate-400 text-sm">
              While recording, the Zsh prompt starts with a red <code>⏺</code> recording symbol.
            </p>
            <Callout variant="note" title="Routing and VPN live on their own page">
              Network modes, the <code>--vpn</code> workflow and privileged mode are covered in
              <a href="/docs/network-vpn" className="text-amber-400 hover:underline"> Network &amp; VPN</a>.
            </Callout>
          </section>

          <section id="images" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Image lifecycle</h2>
            <p className="text-slate-400 text-sm">Pull, update, and remove images with explicit commands.</p>
            <p className="text-slate-400 text-sm">
              When installing upstream images from an interactive terminal on the <code>main</code> channel,
              <code> nihil install</code> offers to switch to <code>dev</code> before downloading:
              <code> y</code> saves the development channel for future image commands;
              <code> n</code> keeps stable images for this installation (the default);
              <code> never</code> keeps stable images and disables future channel prompts.
              Set <code>image_sources.prompt_for_dev: true</code> in your config to enable the prompt again.
              Non-interactive installs and personal image sources keep their configured channel without this prompt.
              Use <code>nihil image channel main</code> to return to stable images.
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`nihil install
nihil install ad
nihil install blueteam
nihil image list
nihil update
nihil update web
nihil upgrade --all --pull
nihil upgrade my-pentest --privileged --network host -W --start
nihil uninstall 2-10,12-14
nihil uninstall full:dev-a1b2c3d4e5f6
nihil uninstall --unused`}
            </pre>
            <p className="text-slate-300">
              <code>nihil upgrade --network NAME</code> accepts <code>host</code>, <code>docker</code>, <code>nat</code>, <code>disabled</code>, or the name of an existing Docker network.
            </p>
            <Callout variant="note" title="Container state after upgrade">
              <code>nihil upgrade</code>, including <code>--all</code>, preserves each container's running or stopped state. Stopped containers may start temporarily to restore saved files, then stop again. Use <code>--start</code> with one container to leave it running and open a shell.
            </Callout>
            <Callout variant="note" title="Image status">
              <code>nihil image list</code> shows registry availability before an image is installed. <code>Update available</code> means a newer remote image can be pulled; <code>Updated</code> means your local image matches the registry.
              Stable upstream images tagged <code>:latest</code> are displayed as <code>:main</code>.
              For branch builds, their displayed version uses <code>main</code> even when the image was promoted from <code>dev</code>.
            </Callout>
            <p className="text-slate-400 text-sm">
              Before replacing a moving image tag, Nihil keeps the previous upstream image locally under a unique name such as <code>full:dev-a1b2c3d4e5f6</code>; its source is shown as <code>old_upstream</code>. Locally built images use the <code>:local</code> tag and the <code>Local_build</code> source label. The <code>nihil uninstall</code> selection shows the source beside each image name. Select several rows with comma separated numbers and ranges, such as <code>2-10,12-14</code>, or uninstall an image directly by its displayed name, such as <code>full:dev-a1b2c3d4e5f6</code>.
            </p>
            <Callout variant="warning" title="Removing containers and their data">
              <code>nihil remove &lt;name&gt;</code> deletes the container but keeps its <code>/workspace</code> on the
              host. Add <code>--wipe</code> to also delete that workspace directory permanently (it asks for
              confirmation unless <code>--force</code> is set).
            </Callout>
          </section>

          <section id="custom-images" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Custom image sources</h2>
            <p className="text-slate-400 text-sm">
              Use <code>nihil image</code> to select tools for a personal <code>nihil-images</code> branch. Build an
              image locally with <code>nihil build</code>. It accepts a local clone path, a remote Git URL, or a GitHub
              <code> owner/repo</code>. Without <code>--source</code>, Nihil uses <code>build.images_path</code> or the
              current clone; outside those paths it clones the active remote source and branch. Remote sources are
              cloned temporarily. Use <code>--ref</code> to choose a remote branch or tag.
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`# Build full locally from the configured active remote source
nihil build full

# Clone a remote repository and build its dev branch locally
nihil build ad --source TheNullPigeons/nihil-images --ref dev

# Show full Docker output when needed
nihil build -v

# Save full output while keeping the terminal concise
nihil build --log build.log`}
            </pre>
            <p className="text-slate-400 text-sm">
              <code>nihil build</code> shows Docker setup, Dockerfile instructions, and counted build phases including
              each image module by default. Add
              <code> -v</code> or <code>--verbose</code> to show complete Docker output. The <code>--log</code> option
              saves the complete build output while keeping the terminal concise.
            </p>
            <p className="text-slate-400 text-sm">
              To build and publish through GitHub Actions, use <code>nihil image build</code>. It targets the active
              image source and its selected channel or personal branch. Add <code>--web</code> to open the workflow page
              in a local browser page with progress, logs, and a cancel button, or <code>--wait</code> to follow the
              run in the terminal. For a local Docker build, <code>nihil build --web</code> opens the same local page
              with live Docker output and a cancel button. These two <code>--web</code> options show different builds.
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`# Build and publish every variant with GitHub Actions
nihil image build

# Build one variant, open Actions in a browser, and/or wait for completion
nihil image build blueteam --web --wait

# Show the local build and live output in a browser
nihil build blueteam --source nihil-images --web`}
            </pre>
            <Callout variant="note" title="GitHub CLI for browser customization builds">
              The browser selector's <strong>Apply &amp; build</strong> action uses the GitHub CLI (<code>gh</code>) to
              push the personal branch and dispatch its GitHub Actions build. <code>nihil image build</code> also uses
              <code> gh</code>; install and authenticate it before using that command:
              <pre className="mt-2 text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">{`gh auth login
gh auth status`}</pre>
            </Callout>
            <p className="text-slate-400 text-sm">
              Saved selections use the tool names from the image catalogue. Shared tools are installed together:
              selecting <code>zip2john</code> also installs John, and selecting <code>rockyou</code> installs
              SecLists. Required dependencies and core tools remain installed. Invalid saved selections stop
              the build with an error before tool installation.
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`# Inspect and select a personal image source
nihil image status
nihil image customize full
nihil image customize full --web

# Delete local clone, remote branch/packages, or both before setup
nihil image customize full --git-del local
nihil image customize full --git-del distant
nihil image customize full --git-del all

# Switch between upstream and personal sources
nihil image switch upstream
nihil image switch personal

# Select development images for pull and local builds
nihil image channel dev
nihil update
nihil image channel main`}
            </pre>
            <p className="text-slate-400 text-sm">
              <code>nihil image switch upstream</code> selects the configured <code>main</code> or <code>dev</code>
              source without cloning or changing the upstream repository. Local builds clone the selected branch
              temporarily when needed; GitHub Actions builds use the remote directly.
            </p>
            <Callout variant="note" title="Build scope">
              <code>nihil build</code> uses Docker on this machine and creates a local image tag. <code>nihil image build</code>
              dispatches GitHub Actions to build and publish the selected variants from the active source. The upstream
              source follows the selected <code>main</code> or <code>dev</code> channel; a personal source follows its
              configured repository branch. Add <code>--web</code> to <code>nihil build</code> for a local browser page
              with live Docker output; it does not change the local build into a GitHub Actions run.
            </Callout>
            <Callout variant="tip" title="Browser selector">
              Add <code>--web</code> to complete the customization in a temporary local interface bound to <code>127.0.0.1</code>.
              Before either selector opens, Nihil merges the latest upstream default branch into the personal customization branch.
              Clicking <strong>Apply &amp; build</strong> saves the selection, commits and pushes the branch when the
              selection changed, then dispatches
              GitHub Actions, and follows the build to completion in the same page. A link to GitHub&apos;s live logs is
              displayed as soon as the workflow starts and opens the active GitHub Actions job, while <strong>Cancel build</strong> stops the active run. Once the
              run ends, the complete logs are displayed and can be downloaded from the WebUI. Use <code>--no-push</code>
              to save locally without starting a build.
            </Callout>
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
                    ['nihil exec', 'Open shell or run one command; -e to set env vars'],
                    ['nihil stop', 'Stop running container'],
                    ['nihil restart', 'Restart container(s); use --no-shell to skip shell access'],
                    ['nihil remove', 'Delete container(s); --wipe also erases /workspace'],
                    ['nihil install', 'Pull image variant'],
                    ['nihil image list', 'List remote/local image variants'],
                    ['nihil image build', 'Build and publish image variants with GitHub Actions'],
                    ['nihil image status', 'Show configured image sources'],
                    ['nihil image channel main|dev', 'Select stable or development upstream images'],
                    ['nihil image customize', 'Select tools for a personal image branch'],
                    ['nihil build', 'Build an image locally from the active local or remote source'],
                    ['nihil update', 'Pull newer images'],
                    ['nihil upgrade', 'Recreate containers from the selected image/config'],
                    ['nihil info', 'Show image and container status; -c/--containers or -i/--images filters the output'],
                    ['nihil doctor', 'Run environment diagnostics'],
                    ['nihil tools', 'List tools by image/category'],
                    ['nihil resources install', 'Clone the nihil-resources catalog'],
                    ['nihil resources update', 'Pull latest nihil-resources catalog'],
                    ['nihil resources sync', 'Fetch tools listed in the catalog'],
                    ['nihil resources status', 'Show local nihil-resources status'],
                    ['nihil config --edit', 'Open wrapper config in $EDITOR'],
                    ['nihil completion', 'Generate shell completion script'],
                    ['nihil version', 'Show wrapper version'],
                    ['nihil uninstall --unused', 'Remove local images unused by any container'],
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
              Recon: <code>nihil start net-lab --privileged --network host</code><br />
              Current directory: <code>nihil start quick --workspace-here --tmux</code>
            </p>
          </section>

          <section id="display" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">X11 / Wayland GUI support</h2>
            <p className="text-slate-400 text-sm">
              X11 and Wayland socket forwarding are <strong>enabled by default</strong>. GUI applications such as Burp Suite, Wireshark, Ghidra, IDA, browser tooling, and clipboard helpers can use the host display when the container is created with those mounts. Browser UI automatically resizes the remote desktop to match the browser viewport, keeping the desktop proportional without empty side margins. The selected resolution sets its initial size.
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`# Just start -- X11 and Wayland are on by default
nihil start gui-pentest

# Browser desktop at a higher resolution
nihil start web-lab --browser-ui --browser-ui-resolution 1920x1080

# Change the resolution of an existing Browser UI container
nihil restart web-lab --browser-ui-resolution 1920x1080

# Disable one display bridge for this container
nihil start gui-pentest --disable-x11
nihil start gui-pentest --disable-wayland

# Upgrade applies the current display defaults to existing containers
nihil upgrade gui-pentest --force`}
            </pre>
            <Callout variant="note" title="macOS">
              On macOS, XQuartz is still required for X11 GUI forwarding.
            </Callout>
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
            { id: 'env-logging', label: 'Env & logging' },
            { id: 'images', label: 'Image lifecycle' },
            { id: 'custom-images', label: 'Custom image sources' },
            { id: 'commands', label: 'Command reference' },
            { id: 'recipes', label: 'Common recipes' },
            { id: 'display', label: 'GUI support' },
            { id: 'troubleshooting', label: 'Troubleshooting' },
          ]}
        />
      </div>
    </div>
  );
};
