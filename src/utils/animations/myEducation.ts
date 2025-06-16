import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export function animarLineaEducacion() {
  if (typeof window === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  const linea = document.querySelector(".timeline-line");
  const container = document.querySelector(".timeline-container");

  if (linea && container) {
    const containerHeight = container.scrollHeight;

gsap.fromTo(
  linea,
  { height: 0 },
  {
    height: container.scrollHeight,
    ease: "none",
    scrollTrigger: {
      trigger: container,
      start: "top center",
      end: () => `+=${container.scrollHeight}`,
      scrub: 0.5,
      markers: true,
      // pin: true, // opcional si querés que el container quede fijo mientras animás
    },
  }
);

  }

  gsap.utils.toArray<HTMLElement>(".timeline-item").forEach((item) => {
    gsap.fromTo(
      item,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  });
}
