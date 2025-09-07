// src/components/SobreMiFX.tsx
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SobreMiFX() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = document.getElementById("sobre-mi");
    if (!section) return;

    // 0) Asegura alturas correctas antes de calcular los triggers
    const imgs = Array.from(section.querySelectorAll("img"));
    let pending = imgs.length;
    const refresh = () => ScrollTrigger.refresh();
    if (pending === 0) refresh();
    imgs.forEach((img) => {
      const el = img as HTMLImageElement;
      if (el.complete) {
        if (--pending === 0) refresh();
      } else {
        el.addEventListener("load", () => { if (--pending === 0) refresh(); }, { once: true });
      }
    });

    // 1) Reveals laterales (slide + skew) con scrub
    const reveal = (sel: string, fromX: number, skewY: number) => {
      section.querySelectorAll(sel).forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: fromX, skewY },
          {
            opacity: 1,
            x: 0,
            skewY: 0,
            ease: "power3.out",
            overwrite: "auto",
            scrollTrigger: {
              trigger: el as Element,
              start: "top 85%",
              end: "top 60%",
              scrub: 0.5,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    };
    reveal('[data-reveal="left"]', -80, 6);
    reveal('[data-reveal="right"]', 80, -6);

    // 2) Pila de imágenes: un SOLO timeline con scrub (sin parallax aparte)
    const stack = document.getElementById("fotoStack");
    let stActive: ScrollTrigger | null = null;

    if (stack) {
      const [back, mid, front] = Array.from(stack.children) as HTMLElement[];

      // Transform origin y optimización
      gsap.set([back, mid, front], { transformOrigin: "50% 60%", force3D: true, willChange: "transform" });

      // Estado base (marcado para que se note)
      gsap.set(back,  { x: 24, y: 24, scale: 0.78, rotate: -6, opacity: 0.18, filter: "blur(4px) " });
      gsap.set(mid,   { x: 10, y: 12, scale: 0.92, rotate: -3, opacity: 0.68, filter: "brightness(0.75) contrast(1.35)" });
      gsap.set(front, { x:  0, y:  6, scale: 1.06, rotate:  1, opacity: 1 });

      const mm = gsap.matchMedia();
      mm.add(
        {
          isMobile: "(max-width: 768px)",
          isDesktop: "(min-width: 769px)",
        },
        (ctx) => {
          const amp = ctx.conditions?.isMobile ? 0.65 : 1; // amplitud por breakpoint

          // Mata timelines previos (si el breakpoint cambia)
          ScrollTrigger.getAll().forEach((t) => {
            if (t.vars?.id === "sobreMiStack") t.kill();
          });

          const tl = gsap.timeline({
            defaults: { ease: "none", overwrite: "auto" },
scrollTrigger: {
  id: "sobreMiStack",
  trigger: stack,
  start: "top 80%",   // << arranca cuando el top del stack llega al 80% del viewport
  end: "bottom 40%",
  scrub: 0.75,
  invalidateOnRefresh: true,
  onToggle: (self) => stack.classList.toggle("is-scrolling", self.isActive),
},
          });

          // Un SOLO driver: x/y/rotate/scale/opacity, sin otros tweens tocando y/x
          tl.to(front, { scale: 0.985, y: 0,   rotate: 0 }, 0)
            .to(mid,   { x: 30 * amp, y: -12 * amp, rotate: -8 * amp, opacity: 0.9,  filter: "brightness(0.72) contrast(1.4)" }, 0)
            .to(back,  { x: 80 * amp, y: -24 * amp, rotate: -14 * amp, opacity: 0.42, filter: "blur(3px) " }, 0);

          // cleanup para este breakpoint
          return () => tl.kill();
        }
      );

      // Señaliza cuando la sección está “scroll-active” (para CSS opcional)
      stActive = ScrollTrigger.create({
        trigger: stack,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => stack.classList.toggle("is-scrolling", self.isActive),
      });
    }

    // 3) Frase + botones
    const cta = document.getElementById("ctaFrase");
    if (cta) {
      gsap.to(cta, {
        opacity: 1,
        y: -8,
        duration: 0.9,
        ease: "power2.out",
        overwrite: "auto",
        scrollTrigger: { trigger: cta, start: "top 85%", invalidateOnRefresh: true },
      });
    }

    // Limpieza al desmontar
    return () => {
      stActive?.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.globalTimeline.clear();
    };
  }, []);

  return null;
}
