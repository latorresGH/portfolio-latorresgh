'use client';

import React, { useEffect, useRef } from 'react';

export type Project = {
  title: string;
  year: string;
  image?: string;
  featured?: boolean;
  speed?: number;               // 0.1–0.4
  addPlaceholder?: boolean;     // si true, muestra el cuadro con "+"
  href?: string;                // opcional: a dónde ir al click
};

type Props = {
  projects: Project[];
  className?: string;
};

export default function ProjectsGridParallax({ projects, className = '' }: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // ----- PARALLAX -----
    const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-card]'));

    const items = cards
      .map((card) => {
        const wrap = card.querySelector<HTMLElement>('[data-imgwrap]');
        if (!wrap) return null;
        const speed = Number(wrap.dataset.speed ?? 0.25);
        return { card, wrap, speed };
      })
      .filter(Boolean) as { card: HTMLElement; wrap: HTMLElement; speed: number }[];

    const raf = () => {
      const vh = window.innerHeight;
      items.forEach(({ card, wrap, speed }) => {
        const rect = card.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const delta = (center - vh / 2) / vh;
        const move = delta * rect.height * speed * 0.5;
        wrap.style.transform = `translateY(${move}px)`;
      });
    };

    const update = () => requestAnimationFrame(raf);
    const w = window as any;

    if (w.lenis?.on) w.lenis.on('scroll', update);
    else window.addEventListener('scroll', update, { passive: true });

    window.addEventListener('resize', update);
    update();

    // ----- PIXEL TRAIL -----
    const PIXEL_SIZE = 90;        // tamaño del cuadrado
    const LIFETIME_MS = 1000;     // total: 3s (fade-in ~10% + sólido hasta 33% + fade-out hasta 100%)
    const MAX_PIXELS = 120;
    const THROTTLE_MS = 16;

    // delay aleatorio por pixel (para que no aparezcan "de una")
    const DELAY_MIN_MS = 60;
    const DELAY_MAX_MS = 220;

    type State = { lastAt: number; count: number };
    const stateByCard = new WeakMap<HTMLElement, State>();

    function randDelay() {
      return Math.floor(DELAY_MIN_MS + Math.random() * (DELAY_MAX_MS - DELAY_MIN_MS));
    }

    function makePixel(x: number, y: number) {
      const el = document.createElement('span');
      el.className = 'pixel-spark';
      el.style.width = `${PIXEL_SIZE}px`;
      el.style.height = `${PIXEL_SIZE}px`;
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      // ciclo completo con delay por cuadrado
      el.style.animation = `pixelLifecycle ${LIFETIME_MS}ms ease both`;
      el.style.animationDelay = `${randDelay()}ms`;
      return el;
    }

    const disposers: Array<() => void> = [];

    cards.forEach((card) => {
      const wrap = card.querySelector<HTMLElement>('[data-imgwrap]');
      if (!wrap) return;

      let overlay = card.querySelector<HTMLElement>('[data-pixels]');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.setAttribute('data-pixels', 'true');
        overlay.style.position = 'absolute';
        overlay.style.inset = '0';
        overlay.style.pointerEvents = 'none';
        overlay.style.overflow = 'hidden';
        overlay.style.borderRadius = 'inherit';
        card.appendChild(overlay);
      }

      const st: State = { lastAt: 0, count: 0 };
      stateByCard.set(card, st);

      const onMove = (ev: MouseEvent) => {
        const now = performance.now();
        if (now - st.lastAt < THROTTLE_MS) return;
        st.lastAt = now;

        const rect = card.getBoundingClientRect();
        const localX = ev.clientX - rect.left;
        const localY = ev.clientY - rect.top;

        // alinear a grilla para “pixelado”
        const gx = Math.floor(localX / PIXEL_SIZE) * PIXEL_SIZE;
        const gy = Math.floor(localY / PIXEL_SIZE) * PIXEL_SIZE;

        const px = makePixel(gx, gy);

        if (st.count >= MAX_PIXELS && overlay!.firstChild) {
          overlay!.removeChild(overlay!.firstChild);
          st.count--;
        }

        overlay!.appendChild(px);
        st.count++;

        const cleanup = () => {
          px.removeEventListener('animationend', cleanup);
          if (px.parentElement) {
            px.parentElement.removeChild(px);
            st.count--;
          }
        };
        px.addEventListener('animationend', cleanup);
      };

      const enter = () => card.addEventListener('mousemove', onMove);
      const leave = () => card.removeEventListener('mousemove', onMove);

      card.addEventListener('mouseenter', enter);
      card.addEventListener('mouseleave', leave);

      disposers.push(() => {
        card.removeEventListener('mouseenter', enter);
        card.removeEventListener('mouseleave', leave);
        card.removeEventListener('mousemove', onMove);
      });
    });

    return () => {
      if (w.lenis?.off) w.lenis.off('scroll', update);
      else window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      disposers.forEach((fn) => fn());
    };
  }, []);

  return (
    <section ref={rootRef} className={`w-full text-white ${className}`}>
      <style>{`
        /* 0-10%: fade-in suave; 10-33%: sólido; 33-100%: fade-out lento */
        @keyframes pixelLifecycle {
          0%   { opacity: 0; }
          10%  { opacity: 1; }
          33%  { opacity: 1; }
          100% { opacity: 0; }
        }
        .pixel-spark {
          position: absolute;
          background: #0c0c0d;      /* negro sólido */
          will-change: opacity;
        }
      `}</style>

      <div className="px-10 py-20">
        <div className="grid grid-cols-2 gap-9">
          {projects.map((p, i) => {
            const cardClasses = `relative overflow-hidden bg-[#141417] ${
              p.featured ? 'h-[90vh] rounded-[60px]' : 'h-[55vh] rounded-[40px]'
            }`;

            if (p.addPlaceholder) {
              const Wrapper: React.ElementType = p.href ? 'a' : 'div';
              return (
                <div key={i} className={p.featured ? 'col-span-2' : ''}>
                  <Wrapper
                    href={p.href}
                    className="group block focus:outline-none focus:ring-2 focus:ring-white/40 rounded-[40px]"
                    aria-label="Agregar proyecto"
                    role="button"
                  >
                    <article data-card className={`${cardClasses} grid place-items-center`}>
                      <div className="absolute inset-0 rounded-[inherit] ring-1 ring-white/10" />
                      <div className="relative h-28 w-28">
                        <span className="absolute left-1/2 top-1/2 h-1 w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-white transition-transform duration-500 ease-out group-hover:rotate-180" />
                        <span className="absolute left-1/2 top-1/2 w-1 h-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-white transition-transform duration-500 ease-out group-hover:rotate-180" />
                      </div>
                      <div className="absolute bottom-6 left-0 right-0 text-center text-white/80">
                        Your project
                      </div>
                      <div className="absolute inset-0 rounded-[inherit] transition group-hover:bg-white/5" />
                    </article>
                  </Wrapper>

                  <div className="mt-3 mb-4 flex items-center justify-between">
                    <span className="text-sm md:text-base text-white/70">{p.year ?? ''}</span>
                  </div>
                </div>
              );
            }

            return (
              <div key={i} className={p.featured ? 'col-span-2' : ''}>
                <article data-card className={cardClasses}>
                  <div
                    data-imgwrap
                    data-speed={String(p.speed ?? 0.25)}
                    className="absolute inset-0 will-change-transform transform-gpu pointer-events-none"
                  >
                    {p.image && (
                      <img
                        src={p.image}
                        alt={p.title}
                        className="block h-full w-full object-cover scale-125"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/10" />
                </article>

                <div className="mt-3 mb-4 flex items-center justify-between">
                  <h3 className="text-[1.2rem] md:text-[1.4rem] font-medium">{p.title}</h3>
                  <span className="text-sm md:text-base text-white/70">{p.year}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
