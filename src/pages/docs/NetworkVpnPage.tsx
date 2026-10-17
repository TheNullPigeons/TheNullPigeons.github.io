import React from 'react';
import { SectionToc } from '../../components/SectionToc';
import { Callout, TldrBlock } from '../../components/DocsBlocks';

export const NetworkVpnPage: React.FC = () => {
  return (
    <div className="space-y-8 w-full">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          Docs / <span className="text-amber-400">Network &amp; VPN</span>
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Network &amp; VPN</h1>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl">
          Pick a network mode for a container, and route it through an OpenVPN profile when an engagement needs it.
        </p>
      </header>

      <div className="grid sm:grid-cols-[minmax(0,_1fr)_180px] gap-8 items-start">
        <div className="space-y-10 min-w-0">
          <section id="tldr">
            <TldrBlock
              items={[
                'Default network mode is host (configurable with network.default_network).',
                'Modes: host, docker, nat, disabled. nat behaves like docker.',
                '--vpn routes the container through an OpenVPN profile.',
                'VPN forces docker networking: it cannot run with --network host.',
              ]}
            />
          </section>

          <section id="modes" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Network modes</h2>
            <p className="text-slate-400 text-sm">
              Choose a mode per container with <code>--network</code>, or set a default with
              <code>network.default_network</code> in the config. Host is the default.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border border-slate-800 rounded-lg overflow-hidden">
                <thead className="bg-slate-900/80 text-slate-300">
                  <tr>
                    <th className="px-4 py-2 font-medium">Mode</th>
                    <th className="px-4 py-2 font-medium">Docker network</th>
                    <th className="px-4 py-2 font-medium">When to use</th>
                  </tr>
                </thead>
                <tbody className="text-slate-400">
                  <tr className="border-t border-slate-800">
                    <td className="px-4 py-2 font-mono text-amber-300">host</td>
                    <td className="px-4 py-2">host</td>
                    <td className="px-4 py-2">Default. Shares the host stack: needed for responder, mitm6, raw sockets, and reaching a local lab directly.</td>
                  </tr>
                  <tr className="border-t border-slate-800">
                    <td className="px-4 py-2 font-mono text-amber-300">docker</td>
                    <td className="px-4 py-2">bridge</td>
                    <td className="px-4 py-2">Isolated bridge network. Use it on macOS, or whenever you want the container off the host stack.</td>
                  </tr>
                  <tr className="border-t border-slate-800">
                    <td className="px-4 py-2 font-mono text-amber-300">nat</td>
                    <td className="px-4 py-2">bridge</td>
                    <td className="px-4 py-2">Alias of docker: a NAT&apos;d bridge network.</td>
                  </tr>
                  <tr className="border-t border-slate-800">
                    <td className="px-4 py-2 font-mono text-amber-300">disabled</td>
                    <td className="px-4 py-2">none</td>
                    <td className="px-4 py-2">No networking at all. Use it to triage untrusted samples offline.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`nihil start lab --network host        # default
nihil start iso --network docker
nihil start air --network disabled

# Change a running container's mode on upgrade
nihil upgrade lab --network docker`}
            </pre>
            <Callout variant="note" title="Host networking on macOS and Docker Desktop">
              Host mode is only available on Linux (and on WSL2 with Docker Engine in the distribution). On macOS, or
              on Docker Desktop, nihil prints a warning and falls back to the <code>docker</code> network automatically.
            </Callout>
          </section>

          <section id="vpn" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">VPN</h2>
            <p className="text-slate-400 text-sm">
              <code>--vpn</code> starts the container with OpenVPN so its traffic goes through your engagement profile.
              Pass an <code>.ovpn</code> file, or omit the path to use a default one.
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`# Explicit profile
nihil start vpn-lab --vpn ~/vpn/client.ovpn

# No path: uses ~/.nihil/vpn/client.ovpn, or the only .ovpn in ~/.nihil/vpn
nihil start vpn-lab --vpn

# Disable VPN even if a profile would enable it
nihil start vpn-lab --no-vpn`}
            </pre>
            <Callout variant="warning" title="VPN and host networking are mutually exclusive">
              OpenVPN rewrites routes inside the container, which it cannot do on the host network namespace. If you do
              not pass <code>--network</code>, nihil switches from host to <code>docker</code> for you. If you pass
              <code>--network host</code> explicitly together with <code>--vpn</code>, nihil refuses and asks you to use
              <code>--network docker</code> or drop <code>--network</code>.
            </Callout>
            <Callout variant="note" title="Where the profile is mounted">
              The <code>.ovpn</code> file is mounted read-only at <code>/opt/nihil/vpn/client.ovpn</code> inside the
              container. Keep your profiles in <code>~/.nihil/vpn/</code> so <code>--vpn</code> finds them without a path.
            </Callout>
          </section>

          <section id="privileged" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Privileged mode</h2>
            <p className="text-slate-400 text-sm">
              Containers start unprivileged by default. Some workflows (raw packet capture, certain VPN setups, USB or
              wireless device access) need extra capabilities: start with <code>--privileged</code>, and return to the
              default with <code>--standard</code>.
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`nihil start recon --privileged --network host
nihil upgrade recon --standard`}
            </pre>
            <Callout variant="warning" title="Use it deliberately">
              <code>--privileged</code> grants broad access to the host. Enable it only for the task that needs it, in an
              environment you trust.
            </Callout>
          </section>
        </div>

        <SectionToc
          items={[
            { id: 'tldr', label: 'TL;DR' },
            { id: 'modes', label: 'Network modes' },
            { id: 'vpn', label: 'VPN' },
            { id: 'privileged', label: 'Privileged mode' },
          ]}
        />
      </div>
    </div>
  );
};
