import { useEffect, useRef } from 'react';

interface Pigeon {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  baseOpacity: number;
  wingPhase: number;
  wingSpeed: number;
  life: number;      // 0 → 1 → 0 (fade in, cruise, fade out)
  lifeSpeed: number; // how fast life progresses
}

function spawnPigeon(w: number, h: number): Pigeon {
  // Spawn anywhere on screen
  const x = Math.random() * w;
  const y = Math.random() * h;

  // Any direction
  const angle = Math.random() * Math.PI * 2;
  const speed = 0.5 + Math.random() * 1.1;

  return {
    x,
    y,
    vx: speed * Math.cos(angle),
    vy: speed * Math.sin(angle),
    size: 7 + Math.random() * 11,
    opacity: 0,
    baseOpacity: 0.15 + Math.random() * 0.15,
    wingPhase: Math.random() * Math.PI * 2,
    wingSpeed: 0.08 + Math.random() * 0.12,
    life: 0,
    // lifeSpeed controls total lifespan: smaller = longer life
    lifeSpeed: 0.003 + Math.random() * 0.004,
  };
}

function drawPigeon(ctx: CanvasRenderingContext2D, p: Pigeon) {
  const { x, y, size, opacity, wingPhase, vx } = p;
  const dir = vx >= 0 ? 1 : -1;

  ctx.save();
  ctx.translate(x, y);
  ctx.scale(dir, 1);

  const flap = Math.sin(wingPhase) * size * 0.45;

  ctx.globalAlpha = opacity;
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = Math.max(0.8, size * 0.09);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(-size * 0.55, -flap, -size, 0);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(size * 0.55, -flap, size, 0);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, 0, size * 0.07, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(255,255,255,${opacity})`;
  ctx.fill();

  ctx.restore();
}

// Triangle wave: 0→1 on [0,0.5], 1→0 on [0.5,1]
function fadeEnvelope(life: number): number {
  return life < 0.5 ? life * 2 : (1 - life) * 2;
}

const MAX_PIGEONS = 6;
const SPAWN_INTERVAL = 1800;

export function FlyingPigeons() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const pigeons: Pigeon[] = [spawnPigeon(w, h)];
    let lastSpawn = performance.now();
    let rafId: number;

    const onResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    window.addEventListener('resize', onResize);

    function tick(now: number) {
      ctx!.clearRect(0, 0, w, h);

      if (now - lastSpawn > SPAWN_INTERVAL && pigeons.length < MAX_PIGEONS) {
        pigeons.push(spawnPigeon(w, h));
        lastSpawn = now;
      }

      for (let i = pigeons.length - 1; i >= 0; i--) {
        const p = pigeons[i];
        p.x += p.vx;
        p.y += p.vy;
        p.wingPhase += p.wingSpeed;
        p.life += p.lifeSpeed;

        if (p.life >= 1) {
          pigeons.splice(i, 1);
          continue;
        }

        p.opacity = p.baseOpacity * fadeEnvelope(p.life);
        drawPigeon(ctx!, p);
      }

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden
    />
  );
}
