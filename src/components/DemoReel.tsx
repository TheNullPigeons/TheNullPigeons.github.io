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
  const [expanded, setExpanded] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const clickTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(clickTimer.current), [active]);

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
    if ((inView || expanded) && !userPaused) {
      v.play().catch((error) => {
        if (error.name === 'AbortError') return;
        setPlaying(false);
        setUserPaused(true);
      });
    } else {
      v.pause();
    }
  }, [inView, expanded, userPaused, active]);

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

  useEffect(() => {
    if (!expanded) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = overflow; };
  }, [expanded]);

  const toggleExpanded = () => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (dialog.open) {
      dialog.close();
    } else {
      dialog.showModal();
      setExpanded(true);
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
        {/* Keep the same video mounted inline and in the modal to preserve playback. */}
        <dialog
          ref={dialogRef}
          role={expanded ? 'dialog' : 'presentation'}
          aria-modal={expanded || undefined}
          aria-label={expanded ? `${demo.title} video` : undefined}
          onClose={() => setExpanded(false)}
          onClick={(e) => {
            if (e.target !== e.currentTarget || !e.currentTarget.open) return;
            const rect = e.currentTarget.getBoundingClientRect();
            if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
              e.currentTarget.close();
            }
          }}
          className="relative m-0 block w-full max-w-none border-0 bg-black p-0 text-inherit group open:fixed open:m-auto open:w-[min(92vw,1200px)] open:max-h-[88dvh] open:overflow-hidden open:shadow-2xl backdrop:bg-black/80"
        >
          <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800 bg-ink font-mono text-[10.5px] uppercase tracking-[0.16em] text-slate-500">
            <span className="flex items-center gap-2">
              <span className={'h-1.5 w-1.5 rounded-full ' + (playing ? 'bg-amber-500 animate-pulse' : 'bg-slate-600')} />
              {playing ? 'Transmitting' : 'Standby'}
            </span>
            <span className="truncate pl-4">
              {String(active + 1).padStart(2, '0')} / {String(demos.length).padStart(2, '0')} · {demo.id}.mp4
            </span>
          </div>
          <button
            type="button"
            onClick={(e) => {
              window.clearTimeout(clickTimer.current);
              if (e.detail === 0) toggle();
              else if (e.detail === 1) clickTimer.current = window.setTimeout(toggle, 300);
            }}
            onDoubleClick={() => {
              window.clearTimeout(clickTimer.current);
              toggleExpanded();
            }}
            className="relative block w-full min-h-0"
            aria-label={playing ? 'Pause demo' : 'Play demo'}
          >
            <video
              key={demo.src}
              ref={videoRef}
              src={demo.src}
              className="w-full aspect-video bg-black object-contain group-open:max-h-[calc(88dvh-3rem)]"
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
            {!playing && userPaused && (
              <span className="absolute inset-0 flex items-center justify-center bg-black/35">
                <span className="flex items-center gap-3 bg-paper text-ink pl-4 pr-5 py-3 font-mono text-xs uppercase tracking-[0.16em] font-semibold shadow-[4px_4px_0_var(--color-airmail-red)]">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M7 4v16l13-8z" />
                  </svg>
                  Play
                </span>
              </span>
            )}
          </button>
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-end gap-3 p-3 text-paper opacity-100 [@media(hover:hover)]:opacity-0 group-hover:opacity-100 has-[:focus-visible]:opacity-100 group-open:bg-linear-to-t group-open:from-black/80 group-open:to-transparent group-open:pt-10">
            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? 'Pause demo' : 'Play demo'}
              className="hidden h-11 w-11 shrink-0 items-center justify-center group-open:flex hover:text-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d={playing ? 'M6 4h4v16H6zm8 0h4v16h-4z' : 'M7 4v16l13-8z'} />
              </svg>
            </button>
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={progress * 100}
              aria-label="Video progress"
              onChange={(e) => {
                const video = videoRef.current;
                if (video && Number.isFinite(video.duration) && video.duration > 0) {
                  const fraction = e.currentTarget.valueAsNumber / 100;
                  video.currentTime = fraction * video.duration;
                  setProgress(fraction);
                }
              }}
              className="hidden h-1 min-w-0 flex-1 cursor-pointer accent-amber-400 group-open:block focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400"
            />
            <button
              type="button"
              onClick={toggleExpanded}
              aria-label={expanded ? 'Close enlarged video' : 'Enlarge video'}
              title={expanded ? 'Close · Esc' : 'Enlarge video'}
              className="flex h-11 w-11 shrink-0 items-center justify-center border border-paper/30 bg-ink/80 group-open:border-transparent group-open:bg-transparent hover:text-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d={expanded ? 'M6 6l12 12M6 18L18 6' : 'M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5'} />
              </svg>
            </button>
          </div>
        </dialog>
      </div>
    </div>
  );
};
