import { useEffect } from "react";
import {
  animarPantallaDeCarga,
  initLenis,
  upText,
  cambiarMensajeAnimado,
} from "../../../utils/animations/loadingAnimations";

export default function Loader() {
  useEffect(() => {
    console.log("useEffect ejecutado");
    initLenis();
    animarPantallaDeCarga();
    upText(".upText");

    // Cambiar mensaje después de 4 segundos
    cambiarMensajeAnimado("#loader-message", "Espero lo disfrutes", 1.2);
  }, []);

  return (
    <div
      id="loader"
      className="fixed top-0 left-0 w-full h-full bg-[#0d0e11] text-white z-[9999] font-montserrat"
    >
      {/* Texto centrado a la izquierda */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1
          id="loader-message"
          className="text-8xl upText leading-none font-thin"
        >
          Bienvenido...
        </h1>
      </div>

      {/* Porcentaje abajo a la derecha */}
      <div className="absolute bottom-8 right-8">
        <p id="loader-percentage" className="text-9xl font-thin">
          0%
        </p>
      </div>
    </div>
  );
}
