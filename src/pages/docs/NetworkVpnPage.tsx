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
          Two Docker options you&apos;ll meet early: <code>--network</code> (how the container talks to the world) and
          <code>--privileged</code> (how much of your machine the container may touch). This page explains both in plain
          terms, then shows the VPN workflow.
        </p>
      </header>

      <div className="grid sm:grid-cols-[minmax(0,_1fr)_180px] gap-8 items-start">
        <div className="space-y-10 min-w-0">
          <section id="tldr">
            <TldrBlock
              items={[
                'A Nihil container is like a small sandboxed machine on top of yours.',
                '--network decides whether it shares your network (host) or gets its own (docker).',
                'Default is host on Linux; it is what you want for most internal/LAN work.',
                '--privileged lifts the sandbox for low-level tasks (USB/Wi-Fi, kernel, clock). Off by default.',
                '--vpn routes the container through an OpenVPN profile (no --privileged needed).',
              ]}
            />
          </section>

          {/* Beginner primer */}
          <section id="basics" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">In plain words</h2>
            <p className="text-slate-400 text-sm">
              A container is a lightweight, isolated environment that runs on your computer, a bit like a very fast,
              disposable virtual machine. Two settings control how isolated it is:
            </p>
            <div className="space-y-3">
              <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-4">
                <p className="text-sm font-medium text-cyan-300">
                  <code>--network</code>: where the container lives on the network
                </p>
                <p className="text-slate-400 text-sm mt-1">
                  By default (<code>host</code>) the container uses <strong>your machine&apos;s own network</strong>: same
                  IP, same Wi-Fi / Ethernet / VPN you already have. Tools behave as if installed directly on your laptop.
                  The alternative (<code>docker</code>) gives the container <strong>its own private network</strong> behind
                  your machine, like a small VM: it can still reach the internet and remote targets, but it is not sitting
                  directly on your local network.
                </p>
              </div>
              <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-4">
                <p className="text-sm font-medium text-amber-300">
                  <code>--privileged</code>: how much power the container has over your machine
                </p>
                <p className="text-slate-400 text-sm mt-1">
                  By default Docker runs the container in a <strong>sandbox</strong>: it can do normal offensive work
                  (scan, connect, brute-force, exploit) but it <strong>cannot touch your real hardware or the host
                  kernel</strong>. <code>--privileged</code> removes most of that sandbox and gives the container
                  near-root power over your machine. You only need it for a few low-level tasks (see below), and it is
                  <strong> off by default</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Network modes */}
          <section id="modes" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Network modes</h2>
            <p className="text-slate-400 text-sm">
              Set it per container with <code>--network &lt;mode&gt;</code>, or set a default once with
              <code> network.default_network</code> in <code>~/.nihil/config.yml</code>. If you do nothing, you get
              <code> host</code> on Linux.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border border-slate-800 rounded-lg overflow-hidden">
                <thead className="bg-slate-900/80 text-slate-300">
                  <tr>
                    <th className="px-4 py-2 font-medium">Mode</th>
                    <th className="px-4 py-2 font-medium">What it means</th>
                    <th className="px-4 py-2 font-medium">Pick it when…</th>
                  </tr>
                </thead>
                <tbody className="text-slate-400">
                  <tr className="border-t border-slate-800">
                    <td className="px-4 py-2 font-mono text-amber-300 align-top">host</td>
                    <td className="px-4 py-2">Shares your machine&apos;s network (same IP &amp; interfaces). <span className="text-slate-500">Linux / WSL2 only.</span></td>
                    <td className="px-4 py-2">Internal / LAN pentest, AD, poisoning &amp; relaying (Responder, mitm6), or reaching a lab on your local network.</td>
                  </tr>
                  <tr className="border-t border-slate-800">
                    <td className="px-4 py-2 font-mono text-amber-300 align-top">docker</td>
                    <td className="px-4 py-2">Private network behind your machine (NAT bridge), like a VM.</td>
                    <td className="px-4 py-2">You want the container isolated from your LAN, or you&apos;re on macOS / Docker Desktop, or you use a VPN.</td>
                  </tr>
                  <tr className="border-t border-slate-800">
                    <td className="px-4 py-2 font-mono text-amber-300 align-top">nat</td>
                    <td className="px-4 py-2">Same as <code>docker</code> (an alias).</td>
                    <td className="px-4 py-2">You prefer the name &quot;nat&quot;. Behaves exactly like <code>docker</code>.</td>
                  </tr>
                  <tr className="border-t border-slate-800">
                    <td className="px-4 py-2 font-mono text-amber-300 align-top">disabled</td>
                    <td className="px-4 py-2">No network at all.</td>
                    <td className="px-4 py-2">Analysing a suspicious file / malware you don&apos;t want online.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`nihil start lab --network host        # default: on your network
nihil start iso --network docker      # isolated, like a VM
nihil start air --network disabled    # fully offline

# Change a container's mode later (recreates it, keeps your data)
nihil upgrade lab --network docker`}
            </pre>
            <Callout variant="note" title="If you're on macOS or Docker Desktop">
              Host mode only exists on Linux (and on WSL2 with Docker Engine inside the distribution). On macOS or Docker
              Desktop there is no host network, so nihil prints a warning and uses <code>docker</code> instead. Your
              tools still work; they just reach targets through the container&apos;s own network.
            </Callout>
          </section>

          {/* Privileged */}
          <section id="privileged" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Privileged mode</h2>
            <p className="text-slate-400 text-sm">
              Good news for beginners: <strong>you rarely need it</strong>. The default (unprivileged) container already
              lets you scan, connect, brute-force and exploit, because Docker grants a sensible set of permissions out of
              the box. You only reach for <code>--privileged</code> for low-level things that touch your real machine:
            </p>
            <ul className="list-disc list-inside text-slate-400 text-sm space-y-1">
              <li>Using a <strong>USB Wi-Fi adapter</strong> for wireless attacks (monitor mode, injection).</li>
              <li>Loading <strong>kernel modules</strong> or mounting filesystems.</li>
              <li>Stepping the <strong>real system clock</strong>, e.g. <code>nihil-ntp --clock</code> for Kerberos.</li>
            </ul>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`# Enable it only for the container that needs it
nihil start wifi --privileged

# Go back to the safe default on an existing container
nihil upgrade wifi --standard`}
            </pre>
            <Callout variant="warning" title="Think of it as near-root on your laptop">
              <code>--privileged</code> gives the container broad access to your host. Enable it only for the specific
              task that needs it, on a machine you trust, not as a default &quot;to be safe&quot;. For a VPN you do
              <strong> not</strong> need it (see below).
            </Callout>
          </section>

          {/* VPN */}
          <section id="vpn" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">VPN</h2>
            <p className="text-slate-400 text-sm">
              <code>--vpn</code> starts the container with OpenVPN so its traffic goes through your engagement profile:
              perfect for a Hack The Box / TryHackMe lab or a client VPN. Nihil wires up the tunnel for you (it adds the
              needed network capability and <code>/dev/net/tun</code>), so <strong>no <code>--privileged</code> is
              required</strong>.
            </p>
            <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-slate-200 font-mono">
{`# Point at an .ovpn file
nihil start vpn-lab --vpn ~/vpn/client.ovpn

# No path: uses ~/.nihil/vpn/client.ovpn, or the only .ovpn in ~/.nihil/vpn
nihil start vpn-lab --vpn

# Disable the VPN even if a profile would enable it
nihil start vpn-lab --no-vpn`}
            </pre>
            <Callout variant="warning" title="VPN can't run on host networking">
              OpenVPN needs to rewrite the container&apos;s routes, which is impossible on the shared host network. If you
              don&apos;t pass <code>--network</code>, nihil switches to <code>docker</code> for you. If you explicitly ask
              for <code>--network host</code> together with <code>--vpn</code>, nihil stops and asks you to use
              <code> --network docker</code> (or drop <code>--network</code>).
            </Callout>
            <Callout variant="note" title="Where to put your profile">
              Keep your <code>.ovpn</code> files in <code>~/.nihil/vpn/</code> so <code>--vpn</code> finds them without a
              path. Inside the container the profile is mounted read-only at <code>/opt/nihil/vpn/client.ovpn</code>.
            </Callout>
          </section>

          {/* Recipes */}
          <section id="recipes" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Which should I pick?</h2>
            <p className="text-slate-400 text-sm">A cheat sheet for common situations:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border border-slate-800 rounded-lg overflow-hidden">
                <thead className="bg-slate-900/80 text-slate-300">
                  <tr>
                    <th className="px-4 py-2 font-medium">You want to…</th>
                    <th className="px-4 py-2 font-medium">Start it with</th>
                  </tr>
                </thead>
                <tbody className="text-slate-400">
                  <tr className="border-t border-slate-800">
                    <td className="px-4 py-2">Internal AD / LAN pentest (poisoning, relaying)</td>
                    <td className="px-4 py-2 font-mono text-cyan-300">nihil start ad --image ad --network host</td>
                  </tr>
                  <tr className="border-t border-slate-800">
                    <td className="px-4 py-2">Connect to a HTB / THM lab over VPN</td>
                    <td className="px-4 py-2 font-mono text-cyan-300">nihil start htb --vpn</td>
                  </tr>
                  <tr className="border-t border-slate-800">
                    <td className="px-4 py-2">Web app / API testing</td>
                    <td className="px-4 py-2 font-mono text-cyan-300">nihil start web --image web</td>
                  </tr>
                  <tr className="border-t border-slate-800">
                    <td className="px-4 py-2">Wireless attacks with a USB adapter</td>
                    <td className="px-4 py-2 font-mono text-cyan-300">nihil start wifi --privileged</td>
                  </tr>
                  <tr className="border-t border-slate-800">
                    <td className="px-4 py-2">Analyse a suspicious file offline</td>
                    <td className="px-4 py-2 font-mono text-cyan-300">nihil start sample --network disabled</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-slate-500 text-xs">
              Not sure? Start with the defaults (<code>nihil start &lt;name&gt;</code>) and only add a flag when a tool
              tells you it can&apos;t do something.
            </p>
          </section>
        </div>

        <SectionToc
          items={[
            { id: 'tldr', label: 'TL;DR' },
            { id: 'basics', label: 'In plain words' },
            { id: 'modes', label: 'Network modes' },
            { id: 'privileged', label: 'Privileged mode' },
            { id: 'vpn', label: 'VPN' },
            { id: 'recipes', label: 'Which should I pick?' },
          ]}
        />
      </div>
    </div>
  );
};
