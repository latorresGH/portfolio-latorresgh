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
    <div className="timeline-container relative max-w-5xl mx-auto py-10 sm:py-14 md:py-16 motion-reduce:transition-none motion-reduce:animate-none">
      {/* Línea central */}
      <div className="timeline-line pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-px h-0 z-0 bg-gradient-to-b from-white/30 via-white/15 to-transparent hidden md:block " />

      {/* 🔧 Menos espacio en mobile, más en desktop */}
      <div className="flex flex-col gap-10 sm:gap-16 md:gap-28 relative z-10 px-3 sm:px-4 md:px-0">
        {timelineItems.map((item, i) => {
          const isRight = item.side === "right";

          // 🔧 En mobile también alternamos lados con un leve offset lateral
          const mobileSide = isRight ? "justify-end pr-6" : "justify-start pl-6";
          const desktopSide = isRight ? "md:justify-end md:pr-10" : "md:justify-start md:pl-10";

          // Pequeñísimo stagger vertical en mobile para que no se vean “rectas”
          const mobileStagger = i % 2 === 0 ? "-translate-y-[2px]" : "translate-y-[2px]";

          return (
            <div
              key={i}
              className={`timeline-item relative w-full flex ${mobileSide} ${desktopSide}`}
            >
              {/* Punto (más chico en mobile) */}
              <span
                className="
                  absolute left-1/2 -translate-x-1/2
                  top-2.5 sm:top-3
                  block h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full
                  bg-white/80 shadow-[0_0_14px_rgba(255,255,255,0.22)]
                "
                aria-hidden
              />

              {/* Conector (más corto en mobile) */}
              <span
                className={`absolute top-3 sm:top-3.5 h-px w-8 sm:w-10 md:w-12 hidden md:block  ${
                  isRight ? "right-1/2 bg-gradient-to-l" : "left-1/2 bg-gradient-to-r"
                } from-white/30 to-transparent`}
                aria-hidden
              />

              {/* Tarjeta (más angosta y con menos padding en mobile) */}
              <div
                className={`
                  group relative font-OpenSans
                  w-full max-w-[74%] sm:max-w-[80%] md:max-w-md
                  rounded-2xl
                  px-3.5 py-3.5 sm:px-5 sm:py-5 md:px-6 md:py-5
                  border border-white/10 ring-1 ring-inset ring-white/5
                  bg-white/0 backdrop-blur-[2px] sm:backdrop-blur-sm md:backdrop-blur
                  text-neutral-200
                  shadow-[0_5px_16px_rgba(0,0,0,0.28)] md:shadow-[0_10px_30px_rgba(0,0,0,0.35)]

                  transform-gpu ${mobileStagger}
                  transition-[transform,box-shadow,border-color,filter]
                  duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                  hover:-translate-y-[1px]
                  hover:shadow-[0_10px_24px_rgba(0,0,0,0.38)]
                  hover:border-white/15

                  will-change-[transform,box-shadow,filter,border-color]
                  motion-reduce:transition-none motion-reduce:transform-none
                `}
              >
                <span className="text-[9px] sm:text-[10px] tracking-[0.24em] sm:tracking-[0.28em] text-neutral-400/80 font-mono block mb-1 uppercase">
                  {item.fecha}
                </span>
                <h2 className="text-[16px] sm:text-[19px] md:text-2xl font-normal mb-1 text-white font-caslon">
                  {item.titulo}
                </h2>
                <p className="text-[12.5px] sm:text-[14px] md:text-[15px] leading-relaxed text-neutral-300/90">
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
