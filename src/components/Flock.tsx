import { useEffect, useRef } from 'react';

/**
 * A boids flock of pigeons. The pointer acts as a hawk: birds scatter away
 * from it, then regroup. Pauses when off-screen and renders a single still
 * frame for users who prefer reduced motion.
 */

interface Bird {
  x: number;
  y: number;
  vx: number;
  vy: number;
  phase: number;
  size: number;
  red: boolean;
}

const PAPER = '239, 232, 216';
const RED = '255, 74, 42';

const VIEW_RADIUS = 60;
const SEPARATION_RADIUS = 22;
const HAWK_RADIUS = 160;
const MAX_SPEED = 2.6;
const MIN_SPEED = 1.1;

function makeBirds(count: number, w: number, h: number): Bird[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = Math.random() * Math.PI * 2;
    const speed = MIN_SPEED + Math.random();
    return {
      x: w * (0.45 + Math.random() * 0.5),
      y: h * (0.15 + Math.random() * 0.6),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      phase: Math.random() * Math.PI * 2,
      size: 4 + Math.random() * 5,
      red: i % 17 === 0,
    };
  });
}

function drawBird(ctx: CanvasRenderingContext2D, b: Bird) {
  const heading = Math.atan2(b.vy, b.vx);
  const flap = Math.sin(b.phase) * 0.55;
  const s = b.size;
  const alpha = 0.35 + (s - 4) / 12;

  ctx.save();
  ctx.translate(b.x, b.y);
  ctx.rotate(heading);
  ctx.strokeStyle = `rgba(${b.red ? RED : PAPER}, ${b.red ? 0.95 : alpha})`;
  ctx.lineWidth = Math.max(1, s * 0.22);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  // Seen from above: body along the heading, wings sweeping back.
  ctx.beginPath();
  ctx.moveTo(-s * 0.9, -s * (0.9 + flap));
  ctx.quadraticCurveTo(-s * 0.2, -s * 0.25, s * 0.5, 0);
  ctx.quadraticCurveTo(-s * 0.2, s * 0.25, -s * 0.9, s * (0.9 + flap));
  ctx.stroke();
  ctx.restore();
}

export function Flock({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !parent || !ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0;
    let h = 0;
    let birds: Bird[] = [];
    const hawk = { x: -9999, y: -9999, active: false };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = w < 640 ? 38 : w < 1100 ? 70 : 100;
      if (birds.length !== count) birds = makeBirds(count, w, h);
    };
    resize();

    const step = () => {
      for (const b of birds) {
        let ax = 0, ay = 0;
        let cx = 0, cy = 0, avx = 0, avy = 0, sx = 0, sy = 0, n = 0;
        for (const o of birds) {
          if (o === b) continue;
          const dx = o.x - b.x;
          const dy = o.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > VIEW_RADIUS * VIEW_RADIUS) continue;
          n++;
          cx += o.x; cy += o.y;
          avx += o.vx; avy += o.vy;
          if (d2 < SEPARATION_RADIUS * SEPARATION_RADIUS && d2 > 0) {
            sx -= dx / d2;
            sy -= dy / d2;
          }
        }
        if (n > 0) {
          ax += (cx / n - b.x) * 0.0016 + (avx / n - b.vx) * 0.045;
          ay += (cy / n - b.y) * 0.0016 + (avy / n - b.vy) * 0.045;
        }
        ax += sx * 1.4;
        ay += sy * 1.4;

        // The hawk.
        if (hawk.active) {
          const dx = b.x - hawk.x;
          const dy = b.y - hawk.y;
          const d = Math.hypot(dx, dy);
          if (d < HAWK_RADIUS && d > 0) {
            const force = (1 - d / HAWK_RADIUS) * 0.9;
            ax += (dx / d) * force;
            ay += (dy / d) * force;
          }
        }

        // Soft pull toward the right-hand side of the hero, where the sky is empty.
        const homeX = w > 900 ? w * 0.72 : w * 0.5;
        const homeY = h * 0.42;
        ax += (homeX - b.x) * 0.00004;
        ay += (homeY - b.y) * 0.00006;

        b.vx += ax;
        b.vy += ay;
        const speed = Math.hypot(b.vx, b.vy);
        const clamped = Math.min(Math.max(speed, MIN_SPEED), MAX_SPEED + (hawk.active ? 1.6 : 0));
        b.vx = (b.vx / speed) * clamped;
        b.vy = (b.vy / speed) * clamped;

        b.x += b.vx;
        b.y += b.vy;
        b.phase += 0.18 + speed * 0.05;

        const m = 30;
        if (b.x < -m) b.x = w + m;
        if (b.x > w + m) b.x = -m;
        if (b.y < -m) b.y = h + m;
        if (b.y > h + m) b.y = -m;
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      for (const b of birds) drawBird(ctx, b);
    };

    let raf = 0;
    let visible = true;
    const loop = () => {
      step();
      render();
      raf = requestAnimationFrame(loop);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      hawk.x = e.clientX - rect.left;
      hawk.y = e.clientY - rect.top;
      hawk.active = hawk.y > -40 && hawk.y < h + 40;
    };
    const onPointerLeave = () => {
      hawk.active = false;
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !reduceMotion) raf = requestAnimationFrame(loop);
    });

    if (reduceMotion) {
      for (let i = 0; i < 120; i++) step();
      render();
    } else {
      observer.observe(canvas);
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      document.addEventListener('pointerleave', onPointerLeave);
    }

    const onResize = () => {
      resize();
      if (reduceMotion) render();
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={`absolute inset-0 pointer-events-none ${className}`} aria-hidden />;
}
