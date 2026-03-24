import React, { useEffect, useMemo, useState } from 'react';

type TocItem = {
  id: string;
  label: string;
};

export const SectionToc: React.FC<{ items: TocItem[] }> = ({ items }) => {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '');
  const [progress, setProgress] = useState(0);

  const ids = useMemo(() => items.map((item) => item.id), [items]);

  useEffect(() => {
    if (!ids.length) return;

    const markerOffset = Math.floor(window.innerHeight * 0.32);
    let ticking = false;

    const update = () => {
      ticking = false;
      const sections = ids
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => Boolean(el));

      if (!sections.length) return;

      const markerY = window.scrollY + markerOffset;
      let current = sections[0].id;

      for (const section of sections) {
        if (section.offsetTop <= markerY) {
          current = section.id;
        } else {
          break;
        }
      }
      setActiveId(current);

      const firstTop = sections[0].offsetTop;
      const last = sections[sections.length - 1];
      const lastBottom = last.offsetTop + last.offsetHeight;
      const total = Math.max(lastBottom - firstTop, 1);
      const pct = Math.min(Math.max((markerY - firstTop) / total, 0), 1);
      setProgress(pct);
    };

    const onScrollOrResize = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);

    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [ids]);

  return (
    <aside className="sticky top-24 hidden sm:block w-[220px] lg:w-[260px]">
      <div className="rounded-2xl border border-slate-800/70 bg-slate-900/45 p-4 backdrop-blur-sm">
        <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
          On this page
        </p>
        <nav className="relative mt-4 pl-5 space-y-2">
          <span className="absolute left-0 top-0 h-full w-[2px] bg-slate-800/80" />
          <span
            className="absolute left-0 top-0 w-[2px] bg-gradient-to-b from-amber-300 to-amber-500 transition-all duration-200"
            style={{ height: `${Math.max(progress * 100, 5)}%` }}
          />
          {items.map((item) => {
            const isActive = item.id === activeId;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={
                  'block text-sm leading-5 transition-colors ' +
                  (isActive ? 'text-amber-300 font-medium' : 'text-slate-400 hover:text-amber-300')
                }
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
