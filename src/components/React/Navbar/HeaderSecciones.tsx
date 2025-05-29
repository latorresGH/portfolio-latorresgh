import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import {
  spawnNavbar
} from "../../../utils/animaciones";

const secciones = ["INICIO", "ABOUT", "PROYECTOS", "CONTACTO"];

export default function HeaderSecciones() {
  const [indice, setIndice] = useState(0);
  const textoRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
      console.log("useEffect ejecutado");
      spawnNavbar(".spawn-navbar-animation");
    }, []);

  useEffect(() => {
    const handleScroll = () => {
      let seccionActual = 0;
  
      secciones.forEach((seccion, i) => {
        const id = seccion.toLowerCase().replace(" ", "-");
        const elem = document.getElementById(id);
        if (elem) {
          const rect = elem.getBoundingClientRect();
          // Detectamos si está en el centro de la pantalla
          if (rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.25) {
            seccionActual = i;
          }
        }
      });
  
      if (seccionActual !== indice) {
        setIndice(seccionActual);
      }
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [indice]);
  

  const scrollASesion = (id: string) => {
    const target = document.getElementById(id.toLowerCase().replace(" ", "-"));
    if (target) {
      const topOffset = target.getBoundingClientRect().top + window.scrollY;
      const offset = topOffset - window.innerHeight / 2 + target.offsetHeight / 2;
  
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };
  

  const cambiarSeccion = (direccion: "izq" | "der") => {
    const nuevoIndice =
      direccion === "izq"
        ? (indice - 1 + secciones.length) % secciones.length
        : (indice + 1) % secciones.length;

    // animación salida
    gsap.to(textoRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        setIndice(nuevoIndice);
        // animación entrada
        gsap.fromTo(
          textoRef.current,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3 }
        );
      },
    });

    scrollASesion(secciones[nuevoIndice]);
  };

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full flex items-center gap-4 shadow-lg z-50 text-white backdrop-blur-sm bg-black/40 border border-white/10 spawn-navbar-animation">

      <button onClick={() => cambiarSeccion("izq")} className="text-2xl">
        <svg className="w-6 h-6 mr-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.1795 3.26875C15.7889 2.87823 15.1558 2.87823 14.7652 3.26875L8.12078 9.91322C6.94952 11.0845 6.94916 12.9833 8.11996 14.155L14.6903 20.7304C15.0808 21.121 15.714 21.121 16.1045 20.7304C16.495 20.3399 16.495 19.7067 16.1045 19.3162L9.53246 12.7442C9.14194 12.3536 9.14194 11.7205 9.53246 11.33L16.1795 4.68297C16.57 4.29244 16.57 3.65928 16.1795 3.26875Z" fill="#dedede"></path> </g></svg>
      </button>

      <span
        ref={textoRef}
        className="text-lg font-semibold transition-all duration-300"
      >
        {` ${secciones[indice].toLowerCase()} `}
      </span>

      <button onClick={() => cambiarSeccion("der")} className="text-2xl">
        <svg className="w-6 h-6 ml-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7.82054 20.7313C8.21107 21.1218 8.84423 21.1218 9.23476 20.7313L15.8792 14.0868C17.0505 12.9155 17.0508 11.0167 15.88 9.84497L9.3097 3.26958C8.91918 2.87905 8.28601 2.87905 7.89549 3.26958C7.50497 3.6601 7.50497 4.29327 7.89549 4.68379L14.4675 11.2558C14.8581 11.6464 14.8581 12.2795 14.4675 12.67L7.82054 19.317C7.43002 19.7076 7.43002 20.3407 7.82054 20.7313Z" fill="#dedede"></path> </g></svg>
      </button>
    </div>
  );
}
