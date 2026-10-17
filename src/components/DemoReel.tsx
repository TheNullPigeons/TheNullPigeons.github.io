import React, { useEffect, useRef, useState } from 'react';

export interface Demo {
  id: string;
  title: string;
  command: string;
  description: string;
  src: string;
  poster: string;
}

/**
 * Chaptered player: the list on the left drives the video on the right,
 * each chapter shows its own progress, and the reel advances on its own.
 * Playback only starts once the reel scrolls into view.
 */
export const DemoReel: React.FC<{ demos: Demo[] }> = ({ demos }) => {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [inView, setInView] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView && !userPaused) {
      v.play().catch(() => setPlaying(false));
    } else {
      v.pause();
    }
  }, [inView, userPaused, active]);

  const select = (i: number) => {
    setProgress(0);
    setUserPaused(false);
    if (i === active) {
      const v = videoRef.current;
      if (v) v.currentTime = 0;
    } else {
      setActive(i);
    }
  };

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      setUserPaused(false);
      v.play().catch(() => undefined);
    } else {
      setUserPaused(true);
      v.pause();
    }
  };

  const demo = demos[active];

  return (
    <div ref={rootRef} className="grid lg:grid-cols-[minmax(0,25rem)_minmax(0,1fr)] gap-6 lg:gap-10 items-start">
      <ol className="border-t border-slate-800">
        {demos.map((d, i) => {
          const isActive = i === active;
          return (
            <li key={d.id} className="border-b border-slate-800">
              <button
                type="button"
                onClick={() => select(i)}
                className={
                  'group w-full text-left py-4 pr-2 grid grid-cols-[7.5rem_1fr] gap-x-4 transition-colors ' +
                  (isActive ? '' : 'opacity-70 hover:opacity-100')
                }
                aria-current={isActive}
              >
                <span
                  className={
                    'relative block aspect-video overflow-hidden border ' +
                    (isActive ? 'border-amber-500' : 'border-slate-700 group-hover:border-slate-500')
                  }
                >
                  <img src={d.poster} alt="" className="w-full h-full object-cover" loading="lazy" />
                  <span
                    className={
                      'absolute left-0 top-0 px-1.5 py-0.5 font-mono text-[10px] ' +
                      (isActive ? 'bg-amber-500 text-ink' : 'bg-ink/80 text-slate-300')
                    }
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </span>
                <span className="space-y-1.5 min-w-0">
                  <span className="block display text-2xl text-paper leading-none">{d.title}</span>
                  <code className="block font-mono text-[11.5px] text-cyan-300 truncate">{d.command}</code>
                  <span
                    className={
                      'block text-sm text-slate-400 leading-relaxed overflow-hidden transition-all duration-300 ' +
                      (isActive ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0')
                    }
                  >
                    {d.description}
                  </span>
                </span>
              </button>
              <div className="h-[2px] bg-slate-900">
                <div
                  className="h-full bg-amber-500 transition-[width] duration-200 ease-linear"
                  style={{ width: isActive ? `${progress * 100}%` : '0%' }}
                />
              </div>
            </li>
          );
        })}
      </ol>

      <div className="airmail-frame shadow-[12px_12px_0_rgba(0,0,0,0.5)]">
        <div className="relative bg-black group">
          <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800 bg-ink font-mono text-[10.5px] uppercase tracking-[0.16em] text-slate-500">
            <span className="flex items-center gap-2">
              <span className={'h-1.5 w-1.5 rounded-full ' + (playing ? 'bg-amber-500 animate-pulse' : 'bg-slate-600')} />
              {playing ? 'Transmitting' : 'Standby'}
            </span>
            <span className="truncate pl-4">
              {String(active + 1).padStart(2, '0')} / {String(demos.length).padStart(2, '0')} · {demo.id}.mp4
            </span>
          </div>
          <button type="button" onClick={toggle} className="block w-full" aria-label={playing ? 'Pause demo' : 'Play demo'}>
            <video
              key={demo.src}
              ref={videoRef}
              src={demo.src}
              poster={demo.poster}
              className="w-full aspect-video bg-black"
              preload="metadata"
              playsInline
              muted
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onTimeUpdate={(e) => {
                const v = e.currentTarget;
                if (v.duration) setProgress(v.currentTime / v.duration);
              }}
              onEnded={() => {
                setProgress(0);
                setActive((i) => (i + 1) % demos.length);
              }}
            />
            {!playing && (
              <span className="absolute inset-0 top-9 flex items-center justify-center bg-black/35">
                <span className="flex items-center gap-3 bg-paper text-ink pl-4 pr-5 py-3 font-mono text-xs uppercase tracking-[0.16em] font-semibold shadow-[4px_4px_0_var(--color-airmail-red)]">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M7 4v16l13-8z" />
                  </svg>
                  Play
                </span>
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
