import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { SectionToc } from '../../components/SectionToc';
import { Callout, TldrBlock } from '../../components/DocsBlocks';

/* ── Postal-style diagram primitives ── */
const AX = { red: 'var(--color-airmail-red)', blue: 'var(--color-airmail-blue)', paper: 'var(--color-paper)' };
const INK = '#0e0d0b';
const PANEL = '#17150f';
const LINE = '#3e3b33';
const SLATE = '#a09884';
const DISP = "'Big Shoulders', 'Arial Narrow', sans-serif";
const MONO = "'IBM Plex Mono', ui-monospace, monospace";

const Stop: React.FC<{
  x: number; y: number; w: number; h: number;
  title: string; sub?: string; accent: string; index?: string;
  dashed?: boolean; titleSize?: number;
}> = ({ x, y, w, h, title, sub, accent, index, dashed, titleSize = 15 }) => (
  <g>
    {!dashed && <rect x={x + 5} y={y + 5} width={w} height={h} fill="#000" opacity="0.55" />}
    <rect x={x} y={y} width={w} height={h} fill={PANEL} stroke={accent} strokeWidth="1.6" strokeDasharray={dashed ? '5 4' : undefined} />
    {!dashed && <rect x={x} y={y} width="4" height={h} fill={accent} />}
    {index && (
      <>
        <rect x={x + w - 26} y={y + 6} width="20" height="13" fill={accent} />
        <text x={x + w - 16} y={y + 16} textAnchor="middle" fill={INK} fontSize="9" fontWeight="700" fontFamily={MONO}>{index}</text>
      </>
    )}
    <text x={x + (dashed ? w / 2 : 16)} y={y + (sub ? h / 2 - 1 : h / 2 + 5)} textAnchor={dashed ? 'middle' : 'start'} fill={AX.paper} fontSize={titleSize} fontWeight="800" fontFamily={DISP} letterSpacing="0.4" style={{ textTransform: 'uppercase' }}>{title}</text>
    {sub && <text x={x + (dashed ? w / 2 : 16)} y={y + h / 2 + 14} textAnchor={dashed ? 'middle' : 'start'} fill={SLATE} fontSize="8.5" fontFamily={MONO}>{sub}</text>}
  </g>
);

// Dashed "stitch" connector with a square arrowhead.
const Stitch: React.FC<{ d: string; color?: string; arrow?: boolean; soft?: boolean }> = ({ d, color = SLATE, arrow = true, soft }) => (
  <path d={d} fill="none" stroke={color} strokeWidth={soft ? 1 : 1.5} strokeDasharray="5 4" strokeLinecap="square" opacity={soft ? 0.5 : 1} markerEnd={arrow ? 'url(#tnpArrow)' : undefined} />
);

const EnvelopeFrame: React.FC<{ w: number; h: number; label: string }> = ({ w, h, label }) => (
  <g>
    <rect x="8" y="8" width={w - 16} height={h - 16} fill="none" stroke={LINE} strokeWidth="1" strokeDasharray="2 4" />
    <rect x="22" y="2" width={label.length * 7.2 + 20} height="16" fill={AX.red} />
    <text x="32" y="14" fill={INK} fontSize="9.5" fontWeight="700" fontFamily={MONO} letterSpacing="1">{label}</text>
  </g>
);

const arrowDefs = (
  <marker id="tnpArrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
    <path d="M0.5,0.5 L6.5,3.5 L0.5,6.5 Z" fill={AX.paper} />
  </marker>
);

/* ── Isometric command-flow scene (GitLab-style, cubic pigeons) ── */
const PIGEON = {
  blue: { top: '#aebeff', left: '#5a7dff', right: '#3a58e6', rightB: '#273f9e', acc: '#4c74ff', dark: '#0d1230', feather: '#2a3f8f' },
  paper: { top: '#fbf6ec', left: '#ddd3bd', right: '#c0b495', rightB: '#9f9375', acc: '#efe8d8', dark: '#2a2823', feather: '#8a7f64' },
  red: { top: '#ff9e86', left: '#ff5231', right: '#d2340f', rightB: '#a2270a', acc: '#ff4a2a', dark: '#320b03', feather: '#a02a0c' },
};
type PigeonKey = keyof typeof PIGEON;
const FOOT = '#e4902f';
const BEAK = '#f2a63c';
const BEAK_D = '#d4871f';
const BASE_A = 36; // base cube half-width (scaled per node)

// A cubic pigeon: one voxel body, side-set bird eyes, a chunky beak with cere,
// little feet, a fan tail out the back and folded wings. `s` scales it down for helpers.
const Pigeon: React.FC<{ cx: number; cy: number; pal: typeof PIGEON[PigeonKey]; gid: string; delay: number; s?: number }> = ({ cx, cy, pal, gid, delay, s = 1 }) => {
  const A = BASE_A * s, B = A / 2, HH = 42 * s;
  const Tt = [cx, cy], Tr = [cx + A, cy + B], Tb = [cx, cy + 2 * B], Tl = [cx - A, cy + B];
  const Bb = [cx, cy + 2 * B + HH];
  const lpt = (fu: number, fv: number) => [cx - fu * A, cy + 2 * B - fu * B + fv * HH];
  const rpt = (fu: number, fv: number) => [cx + fu * A, cy + 2 * B - fu * B + fv * HH];
  const eyes = [lpt(0.24, 0.2), rpt(0.24, 0.2)];
  const by = Tb[1] + HH * 0.2;
  return (
    <g className="iso-float" style={{ animationDelay: `${delay}s` }}>
      <defs>
        <linearGradient id={`${gid}t`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={pal.top} /><stop offset="1" stopColor={pal.left} /></linearGradient>
        <linearGradient id={`${gid}r`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={pal.right} /><stop offset="1" stopColor={pal.rightB} /></linearGradient>
      </defs>
      {[-6 * s, 5 * s].map((dx, i) => (
        <g key={i}>
          <rect x={Bb[0] + dx} y={Bb[1] - 3 * s} width={2.8 * s} height={7 * s} fill={FOOT} />
          <rect x={Bb[0] + dx - 2 * s} y={Bb[1] + 3.5 * s} width={6 * s} height={2.4 * s} fill={FOOT} />
        </g>
      ))}
      <polygon points={`${Tt[0] + 3 * s},${Tt[1] + 2 * s} ${Tt[0] + 34 * s},${Tt[1] - 10 * s} ${Tt[0] + 45 * s},${Tt[1] + 2 * s} ${Tr[0] + 5 * s},${Tr[1] - 3 * s}`} fill={pal.rightB} />
      <polygon points={`${Tt[0] + 3 * s},${Tt[1] + 2 * s} ${Tt[0] + 34 * s},${Tt[1] - 10 * s} ${Tt[0] + 34 * s},${Tt[1] - 7 * s} ${Tt[0] + 5 * s},${Tt[1] + 4 * s}`} fill={pal.right} />
      <polygon points={`${Tl[0]},${Tl[1]} ${Tb[0]},${Tb[1]} ${Tb[0]},${Tb[1] + HH} ${Tl[0]},${Tl[1] + HH}`} fill={pal.left} />
      <polygon points={`${Tr[0]},${Tr[1]} ${Tb[0]},${Tb[1]} ${Tb[0]},${Tb[1] + HH} ${Tr[0]},${Tr[1] + HH}`} fill={`url(#${gid}r)`} />
      <polygon points={`${Tt[0]},${Tt[1]} ${Tr[0]},${Tr[1]} ${Tb[0]},${Tb[1]} ${Tl[0]},${Tl[1]}`} fill={`url(#${gid}t)`} />
      {[0, 1, 2].map((k) => {
        const y1 = Tl[1] + 12 * s + k * 7 * s;
        return <line key={k} x1={Tl[0] + 8 * s} y1={y1} x2={Tb[0] - 8 * s} y2={y1 + B * 0.48} stroke={pal.feather} strokeOpacity="0.55" strokeWidth={1.3 * s} />;
      })}
      {eyes.map(([ex, ey], i) => (
        <g key={i}>
          <circle cx={ex} cy={ey} r={3 * s} fill={pal.dark} />
          <circle cx={ex - 0.7 * s} cy={ey - s} r={0.9 * s} fill="#fff" fillOpacity="0.8" />
        </g>
      ))}
      <polygon points={`${Tb[0] - 4.5 * s},${by - 3.5 * s} ${Tb[0] + 4.5 * s},${by - 3.5 * s} ${Tb[0] + 3 * s},${by} ${Tb[0] - 3 * s},${by}`} fill={BEAK_D} />
      <polygon points={`${Tb[0] - 6 * s},${by} ${Tb[0] + 6 * s},${by} ${Tb[0]},${by + 13 * s}`} fill={BEAK} />
      <polygon points={`${Tb[0]},${by} ${Tb[0] + 6 * s},${by} ${Tb[0]},${by + 13 * s}`} fill={BEAK_D} />
    </g>
  );
};

const Tile: React.FC<{ cx: number; cy: number; acc: string; s?: number }> = ({ cx, cy, acc, s = 1 }) => {
  const A = BASE_A * s, B = A / 2;
  const pts = `${cx},${cy - B} ${cx + A + 9 * s},${cy} ${cx},${cy + B + 5 * s} ${cx - A - 9 * s},${cy}`;
  return (
    <g>
      <ellipse cx={cx} cy={cy + B + 10 * s} rx={A + 16 * s} ry={B * 0.8} fill={acc} fillOpacity="0.22" filter="url(#isoGlow)" />
      <polygon points={pts} fill={acc} fillOpacity="0.08" />
      <polygon points={pts} fill="none" stroke={acc} strokeWidth={1.8 * s} strokeDasharray="4 4" />
    </g>
  );
};

const NodeLabel: React.FC<{ cx: number; y: number; text: string; acc: string; idx?: string }> = ({ cx, y, text, acc, idx }) => {
  const w = text.length * 6.6 + (idx ? 30 : 16);
  return (
    <g transform={`translate(${cx - w / 2},${y})`}>
      <rect width={w} height="20" fill={PANEL} stroke={acc} strokeWidth="1.2" />
      {idx && <><rect width="18" height="20" fill={acc} /><text x="9" y="14" textAnchor="middle" fontFamily={MONO} fontSize="9.5" fontWeight="700" fill="#0e0d0b">{idx}</text></>}
      <text x={idx ? 18 + (w - 18) / 2 : w / 2} y="14" textAnchor="middle" fontFamily={MONO} fontSize="9.5" fill="#efe8d8">{text}</text>
    </g>
  );
};

const TagChip: React.FC<{ x: number; y: number; text: string; acc: string }> = ({ x, y, text, acc }) => {
  const w = text.length * 6 + 12;
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x={-w / 2} y="-8" width={w} height="16" rx="8" fill={PANEL} stroke={acc} strokeWidth="1.1" />
      <text x="0" y="3.5" textAnchor="middle" fontFamily={MONO} fontSize="8" fill={acc}>{text}</text>
    </g>
  );
};

const HS = 0.56; // helper pigeon scale

const FlowDiagram: React.FC = () => {
  // Flow actors placed on a slope-0.5 isometric diagonal, so each connector is
  // a single straight segment running along the grid. tc = platform centre.
  const flow = ([
    ['red', 'parser.py', '01'],
    ['red', 'controller.py', '02'],
    ['blue', 'manager.py', '03'],
    ['blue', 'Docker Engine', '04'],
    ['paper', 'zsh session', '05'],
  ] as Array<[PigeonKey, string, string]>).map(([col, txt, idx], i) => {
    const cx = 180 + i * 160, cy = 95 + i * 80;
    return { cx, cy, col, txt, idx, tc: [cx, cy + 73] as [number, number] };
  });
  // Helpers sit on ±0.5 diagonals from their actor's platform (single-segment links).
  const helpers: Array<{ tc: [number, number]; col: PigeonKey; txt: string; actor: number }> = [
    { tc: [262, 209], col: 'paper', txt: 'images.py', actor: 1 },
    { tc: [190, 323], col: 'red', txt: 'console/', actor: 1 },
    { tc: [330, 413], col: 'red', txt: 'utils/', actor: 2 },
    { tc: [690, 233], col: 'paper', txt: 'ghcr.io', actor: 2 },
    { tc: [520, 478], col: 'blue', txt: 'volumes', actor: 3 },
  ].map((h) => ({ ...h, hx: h.tc[0], hy: h.tc[1] - 73 * HS })) as never;

  const trim = (p: [number, number], q: [number, number], t0: number, t1: number) => {
    const dx = q[0] - p[0], dy = q[1] - p[1], d = Math.hypot(dx, dy) || 1;
    const ux = dx / d, uy = dy / d;
    return [p[0] + ux * t0, p[1] + uy * t0, q[0] - ux * t1, q[1] - uy * t1];
  };
  const Arrow = ({ p, q, t0 = 46, t1 = 46 }: { p: [number, number]; q: [number, number]; t0?: number; t1?: number }) => {
    const [x1, y1, x2, y2] = trim(p, q, t0, t1);
    return <path d={`M${x1.toFixed(1)},${y1.toFixed(1)} L${x2.toFixed(1)},${y2.toFixed(1)}`} fill="none" stroke="#b7ab92" strokeWidth="1.9" strokeDasharray="6 4" strokeLinecap="square" markerEnd="url(#isoArrow)" opacity="0.92" />;
  };
  const Link = ({ p, q, acc }: { p: [number, number]; q: [number, number]; acc: string }) => {
    const [x1, y1, x2, y2] = trim(p, q, 24, 42);
    return <path d={`M${x1.toFixed(1)},${y1.toFixed(1)} L${x2.toFixed(1)},${y2.toFixed(1)}`} fill="none" stroke={acc} strokeWidth="1.3" strokeDasharray="4 3" opacity="0.6" />;
  };

  const flowItems = flow.map((f, i) => ({ y: f.cy, kind: 'flow' as const, i }));
  const helpItems = (helpers as unknown as Array<{ hy: number }>).map((h, i) => ({ y: h.hy, kind: 'help' as const, i }));
  const items = [...flowItems, ...helpItems].sort((a, b) => a.y - b.y);
  const H = helpers as unknown as Array<{ tc: [number, number]; col: PigeonKey; txt: string; actor: number; hx: number; hy: number }>;

  return (
    <div className="relative overflow-x-auto py-2">
      <svg viewBox="0 0 1000 600" className="w-full min-w-[760px]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="isoGlow" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="9" /></filter>
          <radialGradient id="isoBgBlue" cx="52%" cy="46%" r="42%"><stop offset="0" stopColor="#4c74ff" stopOpacity="0.16" /><stop offset="1" stopColor="#4c74ff" stopOpacity="0" /></radialGradient>
          <radialGradient id="isoBgRed" cx="18%" cy="28%" r="34%"><stop offset="0" stopColor="#ff4a2a" stopOpacity="0.12" /><stop offset="1" stopColor="#ff4a2a" stopOpacity="0" /></radialGradient>
          <radialGradient id="isoFade" cx="50%" cy="48%" r="75%"><stop offset="0" stopColor="#fff" stopOpacity="1" /><stop offset="0.7" stopColor="#fff" stopOpacity="0.9" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
          <mask id="isoMask"><rect width="1000" height="600" fill="url(#isoFade)" /></mask>
          <radialGradient id="isoVig" cx="50%" cy="48%" r="72%"><stop offset="60%" stopColor="#000" stopOpacity="0" /><stop offset="100%" stopColor="#000" stopOpacity="0.5" /></radialGradient>
          <marker id="isoArrow" markerWidth="7" markerHeight="7" refX="5.5" refY="3.5" orient="auto"><path d="M0.5,0.5 L6,3.5 L0.5,6.5 Z" fill="#cdbfa0" /></marker>
        </defs>
        <rect width="1000" height="600" fill="#0e0d0b" />
        <rect width="1000" height="600" fill="url(#isoBgBlue)" />
        <rect width="1000" height="600" fill="url(#isoBgRed)" />
        <g mask="url(#isoMask)">
          <g stroke="#5a5347" strokeWidth="1" opacity="0.5">
            {Array.from({ length: 40 }, (_, k) => -520 + k * 30).map((c) => (
              <line key={`a${c}`} x1={-60} y1={0.5 * -60 + c} x2={1060} y2={0.5 * 1060 + c} />
            ))}
            {Array.from({ length: 41 }, (_, k) => -60 + k * 30).map((c) => (
              <line key={`b${c}`} x1={-60} y1={-0.5 * -60 + c} x2={1060} y2={-0.5 * 1060 + c} />
            ))}
          </g>
        </g>

        <g transform="translate(40,38)">
          <rect width="16" height="16" fill="#ff4a2a" />
          <text x="26" y="13" fontFamily={DISP} fontSize="17" fontWeight="800" fill="#efe8d8" letterSpacing="0.4" style={{ textTransform: 'uppercase' }}>Command route</text>
          <text x="0" y="34" fontFamily={MONO} fontSize="10.5" fill={SLATE}>nihil start  →  zsh session</text>
        </g>

        {/* flow connectors + entry (single grid-aligned segments, behind nodes) */}
        {flow.slice(0, -1).map((f, i) => <Arrow key={i} p={f.tc} q={flow[i + 1].tc} />)}
        <NodeLabel cx={80} y={118} text="$ nihil start" acc="#ff4a2a" />
        <Arrow p={[80, 128]} q={flow[0].tc} t0={6} t1={48} />

        {/* helper links */}
        {H.map((h, i) => <Link key={i} p={h.tc} q={flow[h.actor].tc} acc={PIGEON[h.col].acc} />)}

        {/* nodes, back to front */}
        {items.map(({ kind, i }) => kind === 'flow' ? (
          <g key={`f${i}`}>
            <Tile cx={flow[i].tc[0]} cy={flow[i].tc[1]} acc={PIGEON[flow[i].col].acc} />
            <Pigeon cx={flow[i].cx} cy={flow[i].cy} pal={PIGEON[flow[i].col]} gid={`fl${i}`} delay={i * 0.5} />
          </g>
        ) : (
          <g key={`h${i}`}>
            <Tile cx={H[i].tc[0]} cy={H[i].tc[1]} acc={PIGEON[H[i].col].acc} s={HS} />
            <Pigeon cx={H[i].hx} cy={H[i].hy} pal={PIGEON[H[i].col]} gid={`hl${i}`} delay={0.3 + i * 0.4} s={HS} />
          </g>
        ))}

        {/* labels */}
        {flow.map((f, i) => <NodeLabel key={i} cx={f.cx} y={f.tc[1] + 14} text={f.txt} acc={PIGEON[f.col].acc} idx={f.idx} />)}
        {H.map((h, i) => <NodeLabel key={i} cx={h.hx} y={h.tc[1] + 36 * HS / 2 + 13} text={h.txt} acc={PIGEON[h.col].acc} />)}

        {/* detail chips */}
        {[':flock', ':nest', ':beak', ':coo'].map((t, k) => <TagChip key={t} x={782} y={205 + k * 19} text={t} acc={PIGEON.paper.acc} />)}
        {['/workspace', '/opt/my-resources', '/opt/resources', '/opt/nihil/vpn'].map((v, k) => <TagChip key={v} x={640} y={470 + k * 19} text={v} acc={PIGEON.blue.acc} />)}

        <rect width="1000" height="600" fill="url(#isoVig)" />
        <rect x="1" y="1" width="998" height="598" fill="none" stroke="#2a2823" strokeWidth="2" />
      </svg>
    </div>
  );
};

/* ── SVG diagram: image build pipeline ── */
const BuildDiagram: React.FC = () => {
  const modules = [
    'base.sh', 'core_tools.sh', 'mod_ad.sh', 'mod_c2.sh', 'mod_credential.sh', 'mod_crypto.sh',
    'mod_dfir.sh', 'mod_forensics.sh', 'mod_hunt.sh', 'mod_misc.sh', 'mod_network.sh',
    'mod_osint.sh', 'mod_pwn.sh', 'mod_reverse.sh', 'mod_web.sh', 'mod_wordlists.sh',
  ];
  const registries = ['pacman', 'AUR', 'pipx', 'pipx-git', 'go', 'cargo', 'gem', 'git / curl'];
  const variants = [
    { y: 50, file: 'Dockerfile', out: 'full:latest', tag: ':flock', accent: AX.red },
    { y: 112, file: 'Dockerfile.ad', out: 'ad:latest', tag: ':nest', accent: AX.blue },
    { y: 174, file: 'Dockerfile.web', out: 'web:latest', tag: ':beak', accent: AX.paper },
    { y: 236, file: 'Dockerfile.blueteam', out: 'blueteam:latest', tag: ':coo', accent: AX.paper },
  ];
  const head = (x: number, label: string) => (
    <text x={x} y="34" textAnchor="middle" fill={AX.red} fontSize="10" fontWeight="700" fontFamily={MONO} letterSpacing="2">{label}</text>
  );
  return (
    <div className="relative overflow-x-auto py-2">
      <svg viewBox="0 0 820 390" className="w-full min-w-[620px]" xmlns="http://www.w3.org/2000/svg">
        <defs>{arrowDefs}</defs>
        <rect x="0" y="0" width="820" height="390" fill={INK} />
        <EnvelopeFrame w={820} h={390} label="N° IMG · BUILD PIPELINE" />

        {head(100, 'DOCKERFILE')}
        {variants.map((v) => (
          <g key={v.file}>
            <rect x={30 + 5} y={v.y + 5} width="150" height="46" fill="#000" opacity="0.5" />
            <rect x="30" y={v.y} width="150" height="46" fill={PANEL} stroke={v.accent} strokeWidth="1.6" />
            <rect x="30" y={v.y} width="4" height="46" fill={v.accent} />
            <text x="44" y={v.y + 22} fill={AX.paper} fontSize="11" fontWeight="800" fontFamily={MONO}>{v.file}</text>
            <text x="44" y={v.y + 37} fill={SLATE} fontSize="8.5" fontFamily={MONO}>variant</text>
          </g>
        ))}
        {variants.map((v) => (
          <Stitch key={v.file} d={`M180,${v.y + 23} L222,${v.y + 23}`} color={LINE} soft />
        ))}

        {head(320, 'MODULES')}
        <rect x={232 + 5} y={43 + 5} width="176" height="258" fill="#000" opacity="0.5" />
        <rect x="232" y="43" width="176" height="258" fill={PANEL} stroke={AX.blue} strokeWidth="1.6" />
        <rect x="232" y="43" width="4" height="258" fill={AX.blue} />
        {modules.map((m, i) => (
          <text key={m} x="248" y={60 + i * 15.3} fill={SLATE} fontSize="8.5" fontFamily={MONO}>{m}</text>
        ))}
        <Stitch d="M408,160 L452,160" color={LINE} soft />

        {head(548, 'REGISTRIES')}
        <rect x={462 + 5} y={43 + 5} width="172" height="230" fill="#000" opacity="0.5" />
        <rect x="462" y="43" width="172" height="230" fill={PANEL} stroke={AX.paper} strokeWidth="1.6" />
        <rect x="462" y="43" width="4" height="230" fill={AX.paper} />
        {registries.map((r, i) => (
          <g key={r}>
            <rect x="478" y={58 + i * 26} width="8" height="8" fill={i % 3 === 0 ? AX.red : i % 3 === 1 ? AX.blue : AX.paper} />
            <text x="494" y={66 + i * 26} fill={AX.paper} fontSize="9" fontFamily={MONO}>{r}</text>
          </g>
        ))}
        <Stitch d="M634,160 L664,160" color={LINE} soft />

        {head(730, 'OUTPUT')}
        {variants.map((v) => (
          <g key={v.out}>
            <rect x={672 + 5} y={v.y + 5} width="120" height="46" fill="#000" opacity="0.5" />
            <rect x="672" y={v.y} width="120" height="46" fill={PANEL} stroke={v.accent} strokeWidth="1.6" />
            <rect x="672" y={v.y} width="4" height="46" fill={v.accent} />
            <text x="686" y={v.y + 21} fill={AX.paper} fontSize="10" fontWeight="800" fontFamily={MONO}>{v.out}</text>
            <text x="686" y={v.y + 37} fill={AX.red} fontSize="8.5" fontFamily={MONO}>{v.tag}</text>
          </g>
        ))}

        {/* healthcheck bottom bar */}
        <rect x="232" y="318" width="402" height="36" fill={PANEL} stroke={AX.paper} strokeWidth="1.6" strokeDasharray="5 4" />
        <text x="433" y="341" textAnchor="middle" fill={AX.paper} fontSize="12" fontWeight="800" fontFamily={DISP} letterSpacing="0.5" style={{ textTransform: 'uppercase' }}>healthcheck.sh validates tools.json</text>
        <Stitch d="M433,301 L433,316" color={LINE} soft />
      </svg>
    </div>
  );
};

/* Click a diagram to open it full-screen. */
const ZoomableDiagram: React.FC<{ children: React.ReactNode; label: string }> = ({ children, label }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Expand the ${label} diagram`}
        className="group relative block w-full cursor-zoom-in text-left"
      >
        {children}
        <span className="pointer-events-none absolute right-3 top-3 flex items-center gap-1.5 bg-ink/80 border border-slate-700 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-400 group-hover:border-amber-500 group-hover:text-amber-500 transition-colors">
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path strokeLinecap="square" d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
          Expand
        </span>
      </button>

      {open && createPortal(
        <div
          className="fixed inset-0 z-[120] flex flex-col bg-ink/92 backdrop-blur-sm p-4 md:p-8 animate-in-docs"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`${label} diagram`}
        >
          <div className="flex items-center justify-between gap-4 mb-3 shrink-0">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate-400">
              <span className="text-amber-500">N°</span> {label}
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 h-8 px-3 border border-slate-700 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-300 hover:bg-paper hover:text-ink transition-colors"
            >
              Esc · Close
            </button>
          </div>
          <div
            className="airmail-frame flex-1 min-h-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-full w-full overflow-auto bg-ink flex items-start md:items-center justify-center p-2 md:p-4">
              <div className="w-full min-w-[620px] max-w-[1400px]">{children}</div>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
};

export const ArchitecturePage: React.FC = () => {
  return (
    <div className="space-y-8 w-full">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          Docs / <span className="text-amber-400">Architecture</span>
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          Architecture
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl">
          How nihil is structured: the CLI, Docker manager, image build system, and installation registries.
        </p>
      </header>

      <div className="grid sm:grid-cols-[minmax(0,_1fr)_180px] gap-8 items-start">
        <div className="space-y-10 min-w-0">
          <section id="tldr">
            <TldrBlock
              items={[
                'CLI parses args and dispatches command handlers.',
                'Manager orchestrates Docker lifecycle and mounts.',
                'Images are built from modular install scripts.',
                'CI publishes full/ad/web/blueteam variants to GHCR.',
              ]}
            />
          </section>

          {/* Flow diagram */}
          <section id="flow" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Command flow</h2>
            <p className="text-slate-400 text-sm">
              What happens when you run <code className="text-xs bg-slate-900 px-1.5 py-0.5 rounded border border-slate-700 font-mono text-amber-300">nihil start pentest --image ad</code>
            </p>
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80">
              <ZoomableDiagram label="Command route"><FlowDiagram /></ZoomableDiagram>
            </div>
          </section>

          {/* Step by step */}
          <section id="steps" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Step by step</h2>
            <div className="space-y-2">
              {[
                { step: '1', color: 'amber', title: 'CLI parses arguments', desc: 'parser.py handles argparse, controller.py dispatches to the right handler.' },
                { step: '2', color: 'cyan', title: 'Manager talks to Docker', desc: 'manager.py uses the Docker SDK to create, start, stop, and remove containers.' },
                { step: '3', color: 'purple', title: 'Image pulled if needed', desc: 'If the image isn\'t local, nihil pulls it from ghcr.io/thenullpigeons/ automatically.' },
                { step: '4', color: 'emerald', title: 'Container created', desc: 'Volumes mounted (workspace, my-resources, VPN), capabilities set, network configured.' },
                { step: '5', color: 'emerald', title: 'Shell attached', desc: 'A zsh session inside the container is attached to your terminal.' },
              ].map((s) => {
                const colors: Record<string, string> = {
                  amber: 'border-amber-500/30 bg-amber-500/5',
                  cyan: 'border-cyan-500/30 bg-cyan-500/5',
                  purple: 'border-slate-600/40 bg-slate-500/[0.07]',
                  emerald: 'border-slate-600/40 bg-slate-500/[0.07]',
                };
                const textColors: Record<string, string> = {
                  amber: 'text-amber-400',
                  cyan: 'text-cyan-400',
                  purple: 'text-slate-300',
                  emerald: 'text-slate-300',
                };
                return (
                  <div key={s.step} className={`flex gap-3 p-3 rounded-xl border ${colors[s.color]} transition-all hover:scale-[1.01]`}>
                    <span className={`${textColors[s.color]} font-mono font-bold text-lg shrink-0 w-7 text-center`}>{s.step}</span>
                    <div>
                      <p className="text-sm font-medium text-white">{s.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{s.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Project structure */}
          <section id="structure" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Project structure</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { dir: 'cli/', files: 'controller.py, parser.py', desc: 'Command dispatch & argument parsing', color: 'amber' },
                { dir: 'manager/', files: 'manager.py', desc: 'Docker SDK interactions', color: 'cyan' },
                { dir: 'features/', files: 'images.py, browser_ui.py', desc: 'Image registry, noVNC UI', color: 'purple' },
                { dir: 'config/', files: 'defaults.py', desc: 'Paths & filesystem setup', color: 'slate' },
                { dir: 'console/', files: 'formatter.py, banner.py', desc: 'Output formatting & ASCII art', color: 'amber' },
                { dir: 'utils/', files: 'doctor.py, history.py', desc: 'Diagnostics & command logging', color: 'slate' },
              ].map((m) => {
                const borderColor: Record<string, string> = {
                  amber: 'border-amber-500/20 hover:border-amber-500/40',
                  cyan: 'border-cyan-500/20 hover:border-cyan-500/40',
                  purple: 'border-slate-700/50 hover:border-slate-500/70',
                  slate: 'border-slate-700/50 hover:border-slate-600/50',
                };
                const titleColor: Record<string, string> = {
                  amber: 'text-amber-300',
                  cyan: 'text-cyan-300',
                  purple: 'text-slate-200',
                  slate: 'text-slate-300',
                };
                return (
                  <div key={m.dir} className={`p-3 rounded-xl bg-slate-900/40 border ${borderColor[m.color]} transition-colors`}>
                    <p className={`text-sm font-bold font-mono ${titleColor[m.color]}`}>{m.dir}</p>
                    <p className="text-[11px] text-slate-500 font-mono mt-0.5">{m.files}</p>
                    <p className="text-xs text-slate-400 mt-1">{m.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Build pipeline diagram */}
          <section id="build-pipeline" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Build pipeline</h2>
            <p className="text-slate-400 text-sm">
              How images are built from Dockerfiles through modules and registries to published images.
            </p>
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80">
              <ZoomableDiagram label="Build pipeline"><BuildDiagram /></ZoomableDiagram>
            </div>
          </section>

          {/* Installation registries */}
          <section id="registries" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Installation registries</h2>
            <p className="text-slate-400 text-sm">
              9 installation methods are used in the build system. Post-install behavior differs by method, and tools metadata comes from <code>tools.json</code>.
            </p>
            <p className="text-slate-500 text-xs">
              Note: some tooling previously built from source (for example <code>pwndbg</code>) is now aligned on package-manager flow when available.
            </p>
            <div className="grid sm:grid-cols-2 gap-2">
              {[
                { name: 'pacman', fn: 'install_pacman_tool', desc: 'Arch official + Chaotic-AUR', color: '#ff917a' },
                { name: 'AUR', fn: 'install_aur_tool', desc: 'AUR community packages', color: '#ff917a' },
                { name: 'pipx', fn: 'install_pipx_tool', desc: 'Python from PyPI', color: '#7893ff' },
                { name: 'pipx-git', fn: 'install_pipx_tool_git', desc: 'Python from Git repos', color: '#7893ff' },
                { name: 'go', fn: 'install_go_tool', desc: 'Go packages', color: '#ddd5c3' },
                { name: 'cargo', fn: 'install_cargo_tool', desc: 'Rust packages', color: '#ff6446' },
                { name: 'gem', fn: 'install_gem_tool', desc: 'Ruby gems', color: 'var(--color-airmail-red)' },
                { name: 'git', fn: 'install_git_tool', desc: 'Clone + venv/symlink', color: '#c3baa6' },
                { name: 'curl', fn: 'install_tar_tool', desc: 'Direct binary downloads', color: '#c3baa6' },
              ].map((r) => (
                <div key={r.name} className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-900/40 border border-slate-800/60">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: r.color, opacity: 0.8 }} />
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-bold text-white">{r.name}</span>
                      <code className="text-[10px] text-slate-500 font-mono truncate">{r.fn}</code>
                    </div>
                    <p className="text-[11px] text-slate-500">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CI/CD */}
          <section id="ci" className="space-y-4">
            <h2 className="text-xl font-semibold text-white">CI/CD</h2>
            <p className="text-slate-400 text-sm">
              GitHub Actions builds and publishes all four images in parallel.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { img: 'full', tag: ':flock', color: 'border-amber-500/30 bg-amber-500/5', text: 'text-amber-300' },
                { img: 'ad', tag: ':nest', color: 'border-cyan-500/30 bg-cyan-500/5', text: 'text-cyan-300' },
                { img: 'web', tag: ':beak', color: 'border-slate-600/40 bg-slate-500/[0.07]', text: 'text-slate-200' },
                { img: 'blueteam', tag: ':coo', color: 'border-slate-600/40 bg-slate-500/[0.07]', text: 'text-slate-200' },
              ].map((b) => (
                <div key={b.img} className={`flex-1 min-w-[140px] p-3 rounded-xl border ${b.color} text-center`}>
                  <p className={`text-sm font-bold font-mono ${b.text}`}>{b.img}</p>
                  <p className="text-[10px] text-slate-500 font-mono mt-1">:latest &middot; {b.tag}</p>
                </div>
              ))}
            </div>
            <div className="p-3 rounded-lg bg-cyan-500/5 border border-cyan-500/20">
              <p className="text-xs text-cyan-300">
                <code className="font-mono text-cyan-200">healthcheck.sh</code> validates every tool in <code className="font-mono text-cyan-200">tools.json</code> after
                installation. Failed checks are reported and fail the build.
              </p>
            </div>
            <Callout variant="note" title="Why this matters">
              This architecture keeps runtime usage simple while preserving build-time transparency and reproducibility.
            </Callout>
          </section>

        </div>

        <SectionToc
          items={[
            { id: 'tldr', label: 'TL;DR' },
            { id: 'flow', label: 'Command flow' },
            { id: 'steps', label: 'Step by step' },
            { id: 'structure', label: 'Project structure' },
            { id: 'build-pipeline', label: 'Build pipeline' },
            { id: 'registries', label: 'Registries' },
            { id: 'ci', label: 'CI/CD' },
          ]}
        />
      </div>
    </div>
  );
};
