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

    {/* CHANGED: padding un poco más compacto en tel */}
    <div className="px-4 sm:px-6 md:px-10 py-12 sm:py-16 md:py-20">
      {/* CHANGED: 2 columnas SIEMPRE (también en móvil) y gaps más chicos en tel */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-9"> {/* CHANGED */}
        {projects.map((p, i) => {
          /* CHANGED: cards más bajas/compactas en tel */
          const cardClasses = `relative overflow-hidden bg-[#141417] ${
            p.featured
              ? 'h-[46vh] sm:h-[64vh] md:h-[90vh] rounded-[22px] sm:rounded-[36px] md:rounded-[60px]' /* CHANGED */
              : 'h-[12vh] sm:h-[42vh] md:h-[55vh] rounded-[18px] sm:rounded-[26px] md:rounded-[40px]' /* CHANGED */
          } min-h-[180px] sm:min-h-[260px]`; /* NEW: piso menor en tel */

          if (p.addPlaceholder) {
            const Wrapper: React.ElementType = p.href ? 'a' : 'div';
            return (
              <div key={i} className={p.featured ? 'col-span-2' : '' /* CHANGED: span en todas las vistas */}>
                <Wrapper
                  href={p.href}
                  className="group block focus:outline-none focus:ring-2 focus:ring-white/40 rounded-[22px] sm:rounded-[36px] md:rounded-[40px]" /* CHANGED */
                  aria-label="Agregar proyecto"
                  role="button"
                >
                  <article data-card className={`${cardClasses} grid place-items-center`}>
                    <div className="absolute inset-0 rounded-[inherit] ring-1 ring-white/10" />
                    {/* CHANGED: icono más chico en tel */}
                    <div className="relative h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28"> {/* CHANGED */}
                      <span className="absolute left-1/2 top-1/2 h-1 w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-white transition-transform duration-500 ease-out group-hover:rotate-180" />
                      <span className="absolute left-1/2 top-1/2 w-1 h-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-white transition-transform duration-500 ease-out group-hover:rotate-180" />
                    </div>
                    <div className="absolute bottom-4 sm:bottom-5 left-0 right-0 text-center text-white/80"> {/* CHANGED */}
                      Your project
                    </div>
                    <div className="absolute inset-0 rounded-[inherit] transition group-hover:bg-white/5" />
                  </article>
                </Wrapper>

                {/* CHANGED: tipografías más chicas en tel */}
                <div className="mt-2 mb-3 sm:mt-3 sm:mb-4 flex items-center justify-between"> {/* CHANGED */}
                  <span className="text-[11px] sm:text-sm md:text-base text-white/70">{p.year ?? ''}</span> {/* CHANGED */}
                </div>
              </div>
            );
          }

          return (
            <div key={i} className={p.featured ? 'col-span-2' : '' /* CHANGED: span en todas las vistas */}>
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
                      /* CHANGED: menos zoom en móvil para “respirar” en 2 columnas */
                      className="block h-full w-full object-cover scale-105 sm:scale-115 md:scale-125" /* CHANGED */
                      loading="lazy"
                    />
                  )}
                </div>
                <div className="absolute inset-0 bg-black/10" />
              </article>

              {/* CHANGED: título/año más compactos en tel */}
              <div className="mt-2 mb-3 sm:mt-3 sm:mb-4 flex items-center justify-between"> {/* CHANGED */}
                <h3 className="text-[0.98rem] sm:text-[1.15rem] md:text-[1.4rem] font-medium"> {/* CHANGED */}
                  {p.title}
                </h3>
                <span className="text-[11px] sm:text-sm md:text-base text-white/70"> {/* CHANGED */}
                  {p.year}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);
}