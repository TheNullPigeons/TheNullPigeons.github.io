import React from 'react';
import { SectionToc } from '../../components/SectionToc';
import { Callout, StepList, TldrBlock } from '../../components/DocsBlocks';

export const McpPage: React.FC = () => {
  return (
    <div className="space-y-8 w-full">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          Docs / <span className="text-amber-400">Nihil MCP</span>
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          nihil-mcp
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl">
          A Model Context Protocol server that lets an assistant such as Claude Code manage Nihil
          containers and run tooling inside them, directly from natural-language requests.
        </p>
      </header>

      <div className="grid sm:grid-cols-[minmax(0,_1fr)_180px] gap-8 items-start">
        <div className="space-y-10 min-w-0">
          <section id="tldr">
            <TldrBlock
              items={[
                'Exposes container, execution and image tools to an MCP client over stdio.',
                'Only acts on Nihil containers (images from the nihil registry).',
                'Persistent sessions keep working directory and exported variables across calls.',
                'It runs commands an assistant chooses — read the Security section before using it.',
              ]}
            />
          </section>

          <section id="install" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Install and register</h2>
            <p className="text-slate-400 text-sm">
              Requires Python 3.12+, a running Docker daemon, and at least one Nihil image
              installed (<code>nihil install</code> or the <code>pull_image</code> tool).
            </p>
            <StepList
              steps={[
                { title: 'Install the package', detail: 'From the nihil-mcp directory, install it into your environment.' },
                { title: 'Register the server', detail: 'Add it to your MCP client so the tools load automatically.' },
                { title: 'Verify', detail: 'Confirm the server is listed and reachable.' },
              ]}
            />
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`# 1. Install
cd nihil-mcp
pip install -e .

# 2. Register with Claude Code
claude mcp add nihil -- nihil-mcp

# 3. Verify
claude mcp list`}
            </pre>
            <Callout variant="note" title="Loaded per session">
              Start a new client session after registering — the tools are discovered automatically
              over the stdio transport.
            </Callout>
          </section>

          <section id="usage" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Usage</h2>
            <p className="text-slate-400 text-sm">
              Once registered, drive everything from natural language. The assistant selects the
              right tools to provision a container and run the requested commands inside it.
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`"Start a nihil web container, mount ~/htb as workspace,
 then scan 10.10.10.1 with nmap"`}
            </pre>
          </section>

          <section id="tools" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Available tools</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-700/80 text-slate-400">
                    <th className="text-left py-2 pr-3">Tool</th>
                    <th className="text-left py-2 pr-3">Group</th>
                    <th className="text-left py-2">Purpose</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  {[
                    ['list_containers', 'Containers', 'List all Nihil containers with their status'],
                    ['get_container_info', 'Containers', 'Detailed info on a specific container'],
                    ['start_container', 'Containers', 'Create and start a container (image, workspace, network, privileged)'],
                    ['stop_container', 'Containers', 'Stop a running container'],
                    ['remove_container', 'Containers', 'Remove a container (force to remove a running one)'],
                    ['exec_command', 'Execution', 'Run a one-off command in a container'],
                    ['create_session', 'Execution', 'Open a persistent shell session'],
                    ['exec_in_session', 'Execution', 'Run a command in a session, keeping cwd and env'],
                    ['list_sessions', 'Execution', 'List active sessions and their containers'],
                    ['close_session', 'Execution', 'Close a session and clean up its state'],
                    ['list_images', 'Images', 'List variants and whether they are installed'],
                    ['pull_image', 'Images', 'Pull an image from the nihil registry'],
                    ['list_tools', 'Images', 'List tools available in an image (optionally by category)'],
                  ].map(([tool, group, purpose]) => (
                    <tr key={tool} className="border-b border-slate-800/50">
                      <td className="py-2 pr-3 font-mono text-amber-300 text-xs">{tool}</td>
                      <td className="py-2 pr-3 text-slate-500 text-xs">{group}</td>
                      <td className="py-2 text-slate-400">{purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Callout variant="note" title="Execution timeout">
              <code>exec_command</code> and <code>exec_in_session</code> accept a <code>timeout</code>{' '}
              (default 60s, max 300s). A command that exceeds it is killed inside the container and
              reported with exit code 124, so a hung command never blocks the server.
            </Callout>
          </section>

          <section id="sessions" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">One-off commands vs sessions</h2>
            <p className="text-slate-400 text-sm">
              Use <code>exec_command</code> for independent commands that need no shared state. For
              multi-step work — set a target, then scan, then enumerate — open a session so the
              working directory and any variables you export carry across calls.
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`create_session("pentest-htb")        -> session_id
exec_in_session(id, "export TARGET=10.10.10.1")
exec_in_session(id, "nmap -sV $TARGET")   # same env + cwd
close_session(id)`}
            </pre>
            <Callout variant="note" title="What is preserved">
              A session restores the working directory and the variables you exported in previous
              calls. System and per-invocation variables are not carried over, so each session keeps
              only the state you created.
            </Callout>
          </section>

          <section id="security" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Security</h2>
            <p className="text-slate-400 text-sm">
              This server gives an assistant the ability to run arbitrary commands inside Nihil
              containers. Understand the trust boundaries before using it.
            </p>
            <Callout variant="warning" title="Not a host sandbox">
              The assistant is told to stay inside containers, but that is guidance, not isolation.
              <code>start_container</code> defaults to <code>network="host"</code>, so the container
              shares the host network stack and can reach loopback services and the LAN. Prefer{' '}
              <code>network="bridge"</code> (or <code>"none"</code>) and use <code>host</code> only
              when a task truly needs it.
            </Callout>
            <Callout variant="warning" title="Privileged mode breaks containment">
              <code>privileged=True</code> grants extra capabilities and device access — treat it as
              near-host access. Enable it only for the specific task that requires it (for example
              raw sockets for certain scans), never as a default.
            </Callout>
            <Callout variant="warning" title="Tool output is untrusted input">
              Scan results, HTTP responses and file contents returned to the assistant can carry
              prompt-injection payloads that try to steer it into running attacker-controlled
              commands. Review the actions it takes; do not run it fully unattended against
              untrusted targets.
            </Callout>
            <Callout variant="warning" title="No built-in scope enforcement">
              Nothing here restricts which targets can be attacked. Only point it at systems you are
              explicitly authorized to test — staying in scope and within the law is on the operator.
            </Callout>
          </section>
        </div>

        <SectionToc
          items={[
            { id: 'tldr', label: 'TL;DR' },
            { id: 'install', label: 'Install' },
            { id: 'usage', label: 'Usage' },
            { id: 'tools', label: 'Tools' },
            { id: 'sessions', label: 'Sessions' },
            { id: 'security', label: 'Security' },
          ]}
        />
      </div>
    </div>
  );
};
