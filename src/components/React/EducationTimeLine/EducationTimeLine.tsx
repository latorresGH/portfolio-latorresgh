'use client';

import { useEffect } from "react";
import { animarLineaEducacion } from "../../../utils/animations/myEducation";

const timelineItems = [
  {
    fecha: "2022 - 2025",
    titulo: "Desarrollo de Software",
    descripcion:
      "Instituto IES. Carrera con enfoque en lógica, bases de datos y desarrollo web y móvil.",
    side: "right",
  },
  {
    fecha: "2025",
    titulo: "Curso React Native",
    descripcion:
      "Curso en Folder. Desarrollo de e-commerce mobile con React Native.",
    side: "left",
  },
  {
    fecha: "2024",
    titulo: "Curso Visual Basic & Java",
    descripcion:
      "En I2T creamos una lotería usando VB y Spring Boot. Trabajo práctico intensivo.",
    side: "right",
  },
];

export default function EducationTimeline() {
  useEffect(() => {
    animarLineaEducacion();
  }, []);

  return (
<div className="timeline-container relative max-w-5xl mx-auto py-12">
  {/* Línea central animada */}
  <div className="timeline-line absolute left-1/2 top-0 w-[4px] bg-white h-0 z-0"></div>

  <div className="flex flex-col gap-32 relative z-10">
    {timelineItems.map((item, i) => (
      <div
        key={i}
        className={`timeline-item w-full flex ${
          item.side === "right" ? "justify-start pl-10" : "justify-end pr-10"
        }`}
      >
        <div className="max-w-md font-OpenSans">
          <span className="text-sm text-gray-300 block mb-2">{item.fecha}</span>
          <h2 className="text-2xl font-normal mb-1 text-[#de9878] font-caslon">{item.titulo}</h2>
          <p className="text-base">{item.descripcion}</p>
        </div>
      </div>
    ))}
  </div>
</div>

  );
}
