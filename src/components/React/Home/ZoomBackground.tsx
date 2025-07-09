"use client";
import { useEffect, useRef } from "react";
import { applyZoomEffect } from "../../../utils/animations/zoomEffect.ts";
import CenterTittle from "./Tittle.tsx";
import Header from "./Header.tsx";
import Secciones from "./SectionsList.tsx";
const ZoomBackground = () => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bgRef.current) {
      applyZoomEffect(bgRef.current);
    }
  }, []);

  return (
    <div
      ref={bgRef}
      className="relative justify-between bg-[url('/Imagenes/Background/Background-white.jpg')] bg-center bg-cover m-9 h-[93vh] rounded-lg will-change-transform"
    >
    <Header />
    <CenterTittle />
    <Secciones />
    </div>
  );
};

export default ZoomBackground;
