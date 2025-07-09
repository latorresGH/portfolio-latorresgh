'use client';

import { useEffect, useState } from 'react';
import {
  animarPantallaDeCarga,
  initLenis,
} from '../../../utils/animations/loadingAnimations';

const mensajesConsola = [
  '➤ Starting dev server...',
  '✔ Compiling...',
  '✔ Modules loaded',
  '✔ Dependencies resolved',
  '✔ Build completed',
  '✔ Listening on http://localhost:3000',
];

export default function Loader() {
  const [lineas, setLineas] = useState<string[]>([]);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    initLenis();
    animarPantallaDeCarga();

    // Cargar mensajes cada cierto tiempo
    mensajesConsola.forEach((linea, index) => {
      setTimeout(() => {
        setLineas((prev) => [...prev, linea]);
      }, index * 800);
    });

    // Incrementar porcentaje constantemente
    const interval = setInterval(() => {
      setPorcentaje((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 40); // 40ms ≈ 4 segundos para llegar a 100%

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="loader"
      className="fixed top-0 left-0 w-full h-full bg-[#0d0e11] text-white z-[9999] font-mono text-lg px-6 py-10"
    >
      {/* Consola centrada */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-xl text-start leading-relaxed">
        {lineas.map((linea, idx) => {
          if (linea.includes('http://localhost:3000')) {
            const partes = linea.split('http://localhost:3000');
            return (
              <p key={idx}>
                {partes[0]}
                <span className="text-sky-400 underline">http://localhost:3000</span>
                {partes[1] || ''}
              </p>
            );
          }
          return <p key={idx}>{linea}</p>;
        })}
      </div>

      {/* Porcentaje abajo a la derecha */}
      <div className="absolute bottom-8 right-8 text-5xl font-thin text-white">
        {porcentaje}%
      </div>
    </div>
  );
}
