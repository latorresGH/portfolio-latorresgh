import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initExperienciaScroll() {
  gsap.registerPlugin(ScrollTrigger);

  const section = document.querySelector('#experiencia') as HTMLElement;
  const rows = document.querySelector('.project-rows') as HTMLElement;

  if (section && rows) {
    const scrollLength = rows.scrollWidth - window.innerWidth;
    const scrollExtra = scrollLength * 3; // Scroll más largo

    // Posición inicial (desplazada hacia la derecha)
    gsap.set(rows, {
      x: window.innerWidth / 2,
    });

    // Scroll horizontal principal
    gsap.to(rows, {
      x: -scrollLength,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: `+=${scrollExtra}`,
        scrub: 1.5,
        pin: section,
        anticipatePin: 1,
        // markers: true,
      },
    });

    // Parallax en imágenes
    const images = gsap.utils.toArray<HTMLElement>('.parallax-img');

    images.forEach((img, index) => {
      gsap.to(img, {
        x: `${index % 2 === 0 ? '-' : ''}20%`,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${scrollExtra}`,
          scrub: true,
        },
      });
    });
  }
}
