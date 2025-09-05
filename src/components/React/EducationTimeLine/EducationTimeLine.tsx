'use client';

import { useEffect } from "react";
import { animarLineaEducacion } from "../../../utils/animations/myEducation";

const timelineItems = [
  { fecha: "2022 - 2025", titulo: "Desarrollo de Software", descripcion: "Instituto IES. Carrera con enfoque en lógica, bases de datos y desarrollo web y móvil.", side: "left" },
  { fecha: "2025", titulo: "Curso React Native", descripcion: "Curso en Folder. Desarrollo de e-commerce mobile con React Native.", side: "right" },
  { fecha: "2024", titulo: "Curso Visual Basic & Java", descripcion: "En I2T creamos una lotería usando VB y Spring Boot. Trabajo práctico intensivo.", side: "left" },
];

export default function EducationTimeline() {
  useEffect(() => {
    animarLineaEducacion();
  }, []);

  return (
    <div className="timeline-container relative max-w-5xl mx-auto py-16 motion-reduce:transition-none motion-reduce:animate-none">
      {/* Línea central con degradé */}
      <div className="timeline-line pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-px h-0 z-0 bg-gradient-to-b from-white/30 via-white/15 to-transparent" />

      <div className="flex flex-col gap-28 relative z-10">
        {timelineItems.map((item, i) => {
          const isRight = item.side === "right";
          return (
            <div
              key={i}
              className={`timeline-item relative w-full flex ${
                isRight ? "justify-end pr-10" : "justify-start pl-10"
              }`}
            >
              {/* Punto sobre la línea */}
              <span
                className="absolute left-1/2 -translate-x-1/2 top-3 block h-2.5 w-2.5 rounded-full bg-white/80 shadow-[0_0_20px_rgba(255,255,255,0.25)]"
                aria-hidden
              />

              {/* Conector desde la línea hacia la tarjeta (top:4 como pediste) */}
              <span
                className={`absolute top-4 h-px w-12 ${
                  isRight ? "right-1/2 bg-gradient-to-l" : "left-1/2 bg-gradient-to-r"
                } from-white/30 to-transparent`}
                aria-hidden
              />

              {/* Tarjeta glass minimal con transición realmente suave */}
              <div
                className={`
                  group relative max-w-md font-OpenSans
                  rounded-2xl px-6 py-5
                  border border-white/10 ring-1 ring-inset ring-white/5
                  bg-white/0 backdrop-blur-sm md:backdrop-blur
                  text-neutral-200
                  shadow-[0_10px_30px_rgba(0,0,0,0.35)]

                  /* 💡 transición suave y explícita de props animables */
                  translate-y-0 transform-gpu
                  transition-[transform,box-shadow,border-color,filter]
                  duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]

                  hover:-translate-y-[1px]
                  hover:shadow-[0_14px_40px_rgba(0,0,0,0.45)]
                  hover:border-white/15
                  hover:backdrop-blur  /* puede no animar suave; opcional */

                  will-change-[transform,box-shadow,filter,border-color]
                  motion-reduce:transition-none motion-reduce:transform-none
                `}
              >
                <span className="text-[10px] tracking-[0.28em] text-neutral-400/80 font-mono block mb-1 uppercase">
                  {item.fecha}
                </span>
                <h2 className="text-2xl font-normal mb-1 text-white font-caslon">
                  {item.titulo}
                </h2>
                <p className="text-[15px] leading-relaxed text-neutral-300/90">
                  {item.descripcion}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
