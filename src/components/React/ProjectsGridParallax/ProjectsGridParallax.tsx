'use client';

import React, { useEffect, useRef } from 'react';

export type Project = {
  title: string;
  year: string;
  image?: string;
  featured?: boolean;
  speed?: number;         // intensidad de movimiento (0.1–0.4)
  addPlaceholder?: boolean; // <- si true, muestra el cuadro con "+"
  href?: string;          // opcional: a dónde ir al click
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

    const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-card]'));

    const items = cards
      .map((card) => {
        const wrap = card.querySelector<HTMLElement>('[data-imgwrap]');
        if (!wrap) return null; // los placeholders no tienen wrap/imagen
        const speed = Number(wrap.dataset.speed ?? 0.25);
        return { card, wrap, speed };
      })
      .filter(Boolean) as { card: HTMLElement; wrap: HTMLElement; speed: number }[];

    const raf = () => {
      const vh = window.innerHeight;
      items.forEach(({ card, wrap, speed }) => {
        const rect = card.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const delta = (center - vh / 2) / vh; // -1 arriba, 0 centro, 1 abajo
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

    return () => {
      if (w.lenis?.off) w.lenis.off('scroll', update);
      else window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <section ref={rootRef} className={`w-full text-white ${className}`}>
      <div className="px-10 py-20">
        <div className="grid grid-cols-2 gap-9">
          {projects.map((p, i) => {
            const cardClasses = `relative overflow-hidden bg-[#141417] ${
              p.featured ? 'h-[90vh] rounded-[60px]' : 'h-[55vh] rounded-[40px]'
            }`;

            // ---- TILE ESPECIAL: "+" giratorio ----
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
                      {/* marco sutil */}
                      <div className="absolute inset-0 rounded-[inherit] ring-1 ring-white/10" />

                      {/* el “+” */}
                      <div className="relative h-28 w-28">
                        <span
                          className="
                            absolute left-1/2 top-1/2 h-1 w-full -translate-x-1/2 -translate-y-1/2
                            rounded-full bg-white transition-transform duration-500 ease-out
                            group-hover:rotate-180
                          "
                        />
                        <span
                          className="
                            absolute left-1/2 top-1/2 w-1 h-full -translate-x-1/2 -translate-y-1/2
                            rounded-full bg-white transition-transform duration-500 ease-out
                            group-hover:rotate-180
                          "
                        />
                      </div>

                      {/* texto */}
                      <div className="absolute bottom-6 left-0 right-0 text-center text-white/80">
                        Your project
                      </div>

                      {/* efectos hover */}
                      <div className="absolute inset-0 rounded-[inherit] transition
                                      group-hover:bg-white/5" />
                    </article>
                  </Wrapper>

                  <div className="mt-3 mb-4 flex items-center justify-between">
                    
                    <span className="text-sm md:text-base text-white/70">{p.year ?? ''}</span>
                  </div>
                </div>
              );
            }

            // ---- TILE NORMAL CON PARALLAX ----
            return (
              <div key={i} className={p.featured ? 'col-span-2' : ''}>
                <article data-card className={cardClasses}>
                  <div
                    data-imgwrap
                    data-speed={String(p.speed ?? 0.25)}
                    className="absolute inset-0 will-change-transform transform-gpu pointer-events-none"
                  >
                    {/* image es opcional para no romper si falta */}
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
