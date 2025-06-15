// src/components/Hero.tsx
import { useEffect } from "react";
import {
  spawnText,
  initLenis,
  upText,
  spawnTextName,
  animarLineaVertical,
  animarImagenNombre,
  moverImagenConMouse,
} from "../../../utils/animaciones";

export default function CenterTittle() {
  useEffect(() => {
    console.log("useEffect ejecutado");
    initLenis();
    spawnText(".spawn-text-animation");
    upText(".up-text-animation");
    spawnTextName(".text-to-name-animation");
    animarLineaVertical(".linea-vertical");
    animarImagenNombre(".nombre-imagen");
    moverImagenConMouse(".imagen-nombre");
  }, []);

  return (
    <section className="flex justify-center items-center h-[80vh]">
      <div className="flex flex-col items-center font-aurora">
        <h1 className="text-[#FFCC00] text-[6rem] m-0 leading-none ">
          Portafolio
        </h1>
        <p className="text-[1.20rem] text-white -mt-6">
          desarrollador de software
        </p>
      </div>
    </section>
  );
}
