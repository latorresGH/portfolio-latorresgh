// utils/animations/loadingAnimations.ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export const initLenis = () => {
  if (typeof window === 'undefined') return;

  const w = window as any;
  if (w.lenis) return; // evita instancias duplicadas

  const lenis = new Lenis({
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.1,
    duration: 1.0,
  });

  // expone global por si querés inspeccionar desde consola
  w.lenis = lenis;

  // Lenis notifica a ScrollTrigger cuando hay scroll
  lenis.on('scroll', () => ScrollTrigger.update());

  // loop de Lenis (uno solo en toda la app)
  const raf = (time: number) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);

  // ——— PUENTE Lenis ↔ ScrollTrigger ———
  const scroller = document.documentElement;

  ScrollTrigger.scrollerProxy(scroller, {
    scrollTop(value?: number) {
      if (arguments.length) {
        lenis.scrollTo(value!, { immediate: true });
      }
      return window.scrollY || window.pageYOffset || 0;
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    pinType: 'transform',
  });

  // que todos los triggers usen ese scroller por defecto
  ScrollTrigger.defaults({ scroller });

  // hacelo accesible para debug en consola si querés
  ;(window as any).ScrollTrigger = ScrollTrigger;

  // primer refresh
  ScrollTrigger.refresh();
};



export const animarPantallaDeCarga = () => {
  let porcentaje = { valor: 0 };
  const mensajes = ['Bienvenido...', 'Espero te agrade el contenido...', 'Cargando...'];

  // Cambiar mensajes secuencialmente
  mensajes.forEach((mensaje, i) => {
    gsap.to('#loader-message', {
      delay: i * 1.5,
      duration: 0.5,
      text: mensaje,
      ease: 'none',
    });
  });

  // Animar el porcentaje
  gsap.to(porcentaje, {
    valor: 100,
    duration: 7,
    ease: 'power1.out',
    onUpdate: () => {
      const el = document.getElementById('loader-percentage');
      if (el) el.textContent = `${Math.floor(porcentaje.valor)}%`;
    },
    onComplete: () => {
      // Zoom-out y fade
      gsap.to('#loader', {
        scale: 1.2,
        opacity: 0,
        duration: 1,
        ease: 'power3.inOut',
        onComplete: () => {
          const loader = document.getElementById('loader');
          if (loader) {
            loader.style.display = 'none';
            loader.style.pointerEvents = 'none';
          }
        }
      });
    }
  });
};

export const upText = (selector: string) => {
  const elementos = document.querySelectorAll<HTMLElement>(selector);

  elementos.forEach((el, index) => {
    const letras = el.textContent?.split('').map((letra) => {
      const span = document.createElement('span');
      span.textContent = letra === ' ' ? '\u00A0' : letra; // ← importante para el espacio
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
          duration: 1,
          stagger: 0.05,
          delay: 0.5 + index * 0.3, // delay progresivo
        }
      );
    }
  });
};

export const cambiarMensajeAnimado = (selector: string, nuevoTexto: string, delay: number = 3) => {
  const el = document.querySelector<HTMLElement>(selector);
  if (!el) return;

  gsap.to(el, {
    opacity: 0,
    duration: 1,
    delay: 2, // Espera antes de ocultar
    onComplete: () => {
      el.textContent = nuevoTexto;
      el.classList.add("upText"); // le volvemos a aplicar animación
      upText(selector); // animamos el nuevo texto
      gsap.to(el, {
        opacity: 1,
        duration: 1,
      });
    },
  });
};
