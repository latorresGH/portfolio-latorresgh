'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Card = {
  id: string;
  title: string;
  desc: string;
  image: string;
  color?: string; // <- nuevo}
  text?: string;  // <- nuevo
};

const CARDS: Card[] = [
  {
    id: '01',
    title: 'Diseño',
    desc: 'Te entrego un diseño atractivo y profesional, y juntos vemos si es lo que buscás para tu proyecto.',
    image: '/Imagenes/Experience/StickeandoLayout.webp',
    color: 'bg-[#181919]',  
    text: 'text-white/90' 
  },
  {
    id: '02',
    title: 'Desarrollo',
    desc: 'Transformo tu idea en una web funcional y moderna, cuidando cada detalle técnico y visual.',
    image: '/Imagenes/Experience/PP2Layout.webp',

        color: 'bg-[#f7fafd]',   // azul tailwind slate-800
    text: 'text-black/90' 
  },
  {
    id: '03',
    title: 'Tu website',
    desc: 'Realizo la web que desees adaptándome a tus gustos y necesidades, lista para crecer con vos.',
    image: '/Imagenes/Experience/asasd.webp',
    color: 'bg-[#f97316]',  // naranja cálido
    text: 'text-white/90'
  },
];


export default function ExperienceHorizontal() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null); // viewport visible
  const trackRef = useRef<HTMLDivElement | null>(null);     // fila scrolleable

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const track = trackRef.current;
    if (!section || !container || !track) return;

    // Para que el scroll no “salte” al body mientras está pinneado
    section.style.overscrollBehavior = 'contain';

    const ctx = gsap.context(() => {
      const items = Array.from(track.children) as HTMLElement[];

      /** Distancia horizontal necesaria para que el ÚLTIMO ítem quede
       *  EXACTAMENTE centrado en el contenedor. Nada de auto-snap. */
      const measureTotal = () => {
        const containerW = container.clientWidth;
        const last = items[items.length - 1];
        const trackW = track.scrollWidth;

        if (!last) return 0;

        const lastWidth = last.offsetWidth;
        const lastLeft = last.offsetLeft; // incluye gap de flex

        // desplazamiento para centrar el último: su borde izq - offsetCentro
        const offsetToCenterLast = lastLeft - (containerW - lastWidth) / 2;

        // límite superior: no podemos desplazar más que el scroll máximo del track
        const maxScroll = Math.max(0, trackW - containerW);

        // total final con un pequeño epsilon para garantizar que ScrollTrigger “llegue”
        const total = Math.min(offsetToCenterLast, maxScroll) + 500;
        return Math.max(0, total);
      };

      let tween: gsap.core.Tween | null = null;

      const build = () => {
        const total = measureTotal();

        if (tween) {
          tween.scrollTrigger?.kill();
          tween.kill();
        }

        tween = gsap.to(track, {
          x: -total,           // nos movemos hacia la izquierda hasta centrar la última
          ease: 'none',        // nada de easing (el usuario controla con su scroll)
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: `+=${total}`, // se libera justo cuando la última está centrada
            scrub: true,       // sigue la rueda del usuario (sin animación autónoma)
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            // 👇 SIN SNAP — el usuario decide dónde frenar
          },
        });
      };

      build();

      // Recalcular al redimensionar (para mantener centrado)
      const onResize = () => ScrollTrigger.refresh();
      window.addEventListener('resize', onResize);

      return () => {
        window.removeEventListener('resize', onResize);
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full  text-white">
      {/* Viewport alto-pantalla para CENTRAR verticalmente el track */}
      
      <div
        ref={containerRef}
        className="h-screen mx-auto px-6 md:px-16 grid place-items-center overflow-hidden"
      >
        {/* TRACK: primer ítem es el texto que pediste, luego las tarjetas */}
        <div ref={trackRef} className="flex gap-10 items-stretch will-change-transform">
          {/* Panel de texto (scrolea junto a las tarjetas) */}
<div className="shrink-0 h-[460px] w-[750px] rounded-[28px] bg-transparent flex flex-col justify-between items-start p-10">
  {/* Texto arriba izquierda */}
  <p className="text-left font-[500] leading-tight text-[clamp(1.2rem,2vw,1.8rem)] text-white/90">
    TE INTERESAN MIS <br /> SERVICIOS?
  </p>

  {/* Flecha abajo izquierda */}
  <svg
    className="w-24 h-24 text-white pointer-events-none select-none"
    viewBox="0 0 48 48"
    aria-hidden="true"
  >
    {/* línea vertical + horizontal (esquina en L) */}
<path
  d="M8 8 V30 H43"
  fill="none"
  stroke="currentColor"
  strokeWidth="2.5"

/>

{/* punta de flecha hacia la derecha */}
<path
  d="M43 30 L35 22 M43 29 L35 38"
  fill="none"
  stroke="currentColor"
  strokeWidth="2.5"
/>

  </svg>
</div>


          {CARDS.map((c) => (
            <CardLike key={c.id} {...c} />
          ))}
        </div>
      </div>
    </section>
  );
}

/** Tarjeta estilo referencia */
function CardLike({ id, title, desc, image, color, text }: Card) {
  return (
       <article
      className={`shrink-0 h-[480px] w-[1050px] rounded-[28px] p-4 ${text}
                  transition-[transform,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                  hover:-translate-y-[2px] hover:border-white/15 ${color}`}
    >
      <div className="relative h-full w-full p-6">
        {/* fila superior: imagen circular + texto en caps */}
        <div className="grid grid-cols-[220px_1fr] gap-16">
          <div className="h-[220px] w-[220px] rounded-full overflow-hidden ring-1 ring-white/10">
            <img src={image} alt={title} className="h-full w-full object-cover" />
          </div>

          <p className={`text-[2rem] leading-[1] ${text} uppercase font-[450] pr-4`}>
            {desc}
          </p>
        </div>

        {/* banda inferior: título y número */}
        <div className="absolute left-10 right-6 bottom-8 flex items-end justify-between">
          <h3 className="text-[4rem] leading-none font-[450] tracking-tight ">{title}</h3>
          <span className={`text-[4rem] leading-none ${text} font-[500]`}>{id}</span>
        </div>
      </div>
    </article>
  );
}
