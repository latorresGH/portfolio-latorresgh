import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function animarTextoMascara() {
  if (typeof window === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  const texto = document.querySelector(".text-animated");

  if (texto) {
    gsap.fromTo(
      texto,
      {
        clipPath: "inset(0% 0% 100% 0%)", // oculto desde abajo
      },
      {
        clipPath: "inset(0% 0% 0% 0%)",  // completamente visible
        ease: "none",
        scrollTrigger: {
          trigger: texto,
          start: "top 80%",  // entra en escena más rápido
          end: "top 0%",    // se completa cerca del centro
          scrub: 1,
          markers: true,
        },
      }
    );
  }
}
