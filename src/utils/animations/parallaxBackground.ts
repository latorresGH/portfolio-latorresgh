// utils/animations/ParallaxBackground.tsx
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const ParallaxBackground = () => {
  useEffect(() => {
    const section = document.getElementById("zoom-section");

    if (section) {
      // Crear el efecto parallax en el background
      const animation = gsap.to(section, {
        backgroundPositionY: "-50%",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Cleanup function
      return () => {
        animation.kill();
        if (animation.scrollTrigger) {
          animation.scrollTrigger.kill();
        }
      };
    }
  }, []);

  // No renderiza nada visible
  return null;
};