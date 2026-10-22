import { useEffect, useRef } from 'react';

/**
 * A boids flock of doves. The pointer acts as a hawk: birds scatter away
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
  accent: boolean;
}

const PAPER = '243, 238, 229';
const BLUE = '50, 180, 227';

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
      size: 5 + Math.random() * 5,
      accent: i % 17 === 0,
    };
  });
}

function drawBird(ctx: CanvasRenderingContext2D, b: Bird) {
  const heading = Math.atan2(b.vy, b.vx);
  const s = b.size;
  const alpha = 0.4 + (s - 5) / 12;

  ctx.save();
  ctx.translate(b.x, b.y);
  ctx.rotate(heading);
  ctx.scale(s, s);
  ctx.fillStyle = `rgba(${b.accent ? BLUE : PAPER}, ${b.accent ? 0.95 : alpha})`;

  const spread = 0.85 + (Math.sin(b.phase) + 1) * 0.32;
  ctx.beginPath();
  for (const side of [-1, 1]) {
    ctx.save();
    ctx.scale(1, side * spread);
    ctx.moveTo(0.28, 0.2);
    ctx.bezierCurveTo(0.72, 0.65, 0.62, 1.25, 0.3, 1.65);
    ctx.quadraticCurveTo(0.14, 1.89, 0.07, 1.65);
    ctx.lineTo(0.01, 1.4);
    ctx.quadraticCurveTo(-0.04, 1.88, -0.2, 1.68);
    ctx.lineTo(-0.22, 1.36);
    ctx.quadraticCurveTo(-0.33, 1.75, -0.45, 1.5);
    ctx.lineTo(-0.4, 1.2);
    ctx.quadraticCurveTo(-0.6, 1.48, -0.66, 1.2);
    ctx.lineTo(-0.55, 0.96);
    ctx.quadraticCurveTo(-0.83, 1.17, -0.83, 0.92);
    ctx.lineTo(-0.62, 0.66);
    ctx.quadraticCurveTo(-0.86, 0.83, -0.83, 0.62);
    ctx.quadraticCurveTo(-0.68, 0.34, -0.3, 0.18);
    ctx.closePath();
    ctx.restore();
  }
  ctx.moveTo(-0.35, -0.18);
  ctx.lineTo(-0.98, -0.4);
  ctx.quadraticCurveTo(-1.13, -0.32, -1.05, -0.2);
  ctx.quadraticCurveTo(-1.24, -0.15, -1.12, 0);
  ctx.quadraticCurveTo(-1.24, 0.15, -1.05, 0.2);
  ctx.quadraticCurveTo(-1.13, 0.32, -0.98, 0.4);
  ctx.lineTo(-0.35, 0.18);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = `rgba(20, 20, 22, ${alpha * 0.3})`;
  ctx.lineWidth = 0.035;
  ctx.beginPath();
  for (const side of [-1, 1]) {
    for (const offset of [0, 0.22, 0.44]) {
      ctx.moveTo(0.02, side * 0.34);
      ctx.quadraticCurveTo(0.1 - offset, side * spread * 0.8, 0.04 - offset, side * spread * (1.55 - offset));
    }
  }
  ctx.stroke();

  ctx.beginPath();
  ctx.ellipse(0, 0, 0.56, 0.35, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(0.4, 0, 0.23, 0.21, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(0.63, 0, 0.23, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = `rgba(20, 20, 22, ${b.accent ? 0.85 : alpha})`;
  ctx.beginPath();
  ctx.moveTo(0.8, -0.07);
  ctx.lineTo(1.02, 0);
  ctx.lineTo(0.8, 0.07);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.arc(0.7, -0.08, 0.045, 0, Math.PI * 2);
  ctx.fill();
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

    const step = (delta = 1) => {
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

        b.vx += ax * delta;
        b.vy += ay * delta;
        const speed = Math.hypot(b.vx, b.vy);
        const clamped = Math.min(Math.max(speed, MIN_SPEED), MAX_SPEED + (hawk.active ? 1.6 : 0));
        b.vx = (b.vx / speed) * clamped;
        b.vy = (b.vy / speed) * clamped;

        b.x += b.vx * delta;
        b.y += b.vy * delta;
        b.phase += (0.18 + speed * 0.05) * delta;

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
    let previousTime: number | null = null;
    const loop = (time: number) => {
      const delta = previousTime === null ? 0 : Math.min((time - previousTime) / (1000 / 45), 1);
      previousTime = time;
      step(delta);
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
      previousTime = null;
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
