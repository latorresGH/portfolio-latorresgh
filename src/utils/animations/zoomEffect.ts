import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const applyZoomEffect = (element: HTMLElement) => {
  gsap.to(element, {
    scale: 1.10,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
};
