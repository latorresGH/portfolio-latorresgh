import gsap from 'gsap';
import Lenis from 'lenis';

// Scroll suave con Lenis
export const initLenis = () => {
  const lenis = new Lenis();

  const raf = (time: number) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };

  requestAnimationFrame(raf);

  // Acá podés agregar lo del scroll suave en los links:
  const anchors = document.querySelectorAll('a[href^="#"]');

  anchors.forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const id = anchor.getAttribute('href')!.substring(1);
      const target = document.getElementById(id);
      if (target) {
        lenis.scrollTo(target, {
          offset: 0,
        });
      }
    });
  });
};

export const spawnNavbar = (selector: string) => {
  gsap.fromTo(
    selector,
    {
      opacity: 0,
      y: 40,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1.2,
      delay: 12, // ← Aca va el delay
      ease: 'power3.out',
      onStart: () => {
        console.log('Animación de título iniciada');
      }
    }
  );
};

// Animación de título al cargar
export const spawnText = (selector: string) => {
  gsap.fromTo(
    selector,
    {
      opacity: 0,
      y: 40,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1.2,
      delay: 8, // ← Aca va el delay
      ease: 'power3.out',
      onStart: () => {
        console.log('Animación de título iniciada');
      }
    }
  );
};

export const spawnTextName = (selector: string) => {
  const elementos = document.querySelectorAll<HTMLElement>(selector);

  elementos.forEach((el, index) => {
    gsap.fromTo(
      el,
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 9.7 + index * 0.3, // delay progresivo
        ease: 'power3.out',
      }
    );
  });
};

export const animarLineaVertical = (selector: string) => {
  gsap.fromTo(
    selector,
    {
      height: '0rem',
    },
    {
      height: '20rem', // h-80 en Tailwind
      duration: 1,
      ease: 'power3.out',
      delay: 8, // opcional
    }
  );
};

export const upText = (selector: string) => {
  const elementos = document.querySelectorAll<HTMLElement>(selector);

  elementos.forEach((el, index) => {
    const letras = el.textContent?.split('').map((letra) => {
      const span = document.createElement('span');
      span.textContent = letra;
      span.style.display = 'inline-block';
      return span;
    });

    if (letras) {
      el.textContent = ''; // Limpia el texto original
      letras.forEach((span) => el.appendChild(span));

      gsap.fromTo(
        el.querySelectorAll('span'),
        {
          y: '200%',
        },
        {
          y: '0%',
          ease: 'power3.out',
          duration: 2,
          stagger: 0.05,
          delay: 8.5 + index * 0.3, // delay progresivo
        }
      );
    }
  });
};


export const loopMarquee = (marqueeEl: HTMLDivElement) => {
  const content = marqueeEl.querySelector(".marquee-content");
  if (!content) return;

  const clone = content.cloneNode(true);
  marqueeEl.appendChild(clone);

  const totalWidth = content.scrollWidth;

  gsap.to(marqueeEl, {
    x: `-=${totalWidth}`,
    duration: 7,
    ease: "linear",
    repeat: -1,
    modifiers: {
      x: gsap.utils.unitize(x => parseFloat(x) % totalWidth), // esto hace el bucle perfecto
    },
  });
};

export const animarImagenNombre = (selector: string) => {
  gsap.fromTo(
    selector,
    {
      scale: 0,
      opacity: 0,
      transformOrigin: "center center", // ⬅️ ahora parte desde el centro del elemento
    },
    {
      scale: 1,
      opacity: 1,
      duration: 0.5, // ⬅️ más rápida
      delay: 9.3,
      ease: "power3.out",
    }
  );
};

export const moverImagenConMouse = (selector: string) => {
  const imagen = document.querySelector<HTMLElement>(selector);
  if (!imagen) return;

  const factorMovimiento = 7; // cuanto se mueve (en px máx)

  const onMouseMove = (e: MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    const offsetX = ((e.clientX / innerWidth) - 0.5) * 2;
    const offsetY = ((e.clientY / innerHeight) - 0.5) * 2;

    gsap.to(imagen, {
      x: offsetX * factorMovimiento,
      y: offsetY * factorMovimiento,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  window.addEventListener("mousemove", onMouseMove);
};







// export const textToLeft = (selector: string) => {
//   const elementos = document.querySelectorAll<HTMLElement>(selector);
  
//   elementos.forEach((el, index) => {
//     const letras = el.textContent?.split('').map((letra) => {
//       const span = document.createElement('span');
//       span.textContent = letra;
//       span.style.display = 'inline-block';
//       return span;
//     });
    
//     if (letras) {
//       el.textContent = '';
//       letras.forEach((span) => el.appendChild(span));
      
//       gsap.fromTo(
//         el.querySelectorAll('span'),
//         {
//           x: '1200%', // ← ahora entra desde la derecha
//         },
//         {
//           x: '0%',
//           ease: 'power3.out',
//           duration: 0.4,
//           delay: 2, // si querés que salgan en orden
//         }
//       );
//     }
//   });
// };
