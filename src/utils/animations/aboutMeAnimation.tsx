// src/components/AnimSobreMi.tsx
"use client";
import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export const AnimSobreMi = () => {
  useEffect(() => {
    // Este bloque solo se ejecuta en cliente
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(
        "#scroll-text",
        { x: "20%" }, // estado inicial
        {
          x: "-30%",
          ease: "none",
          scrollTrigger: {
            trigger: "#about",
            start: "top 100%",
            end: "+=2500",
            scrub: true,
          },
        }
      );
    }      
  }, []);

  return null;
};

export const ZoomImage = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(
        "#zoom-img",
        { scale: 0,},
        {
          scale: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#zoom-section",
            start: "top top",
            end: "+=1500",
            scrub: true,
            pin: "#zoom-content", // este es el que fijamos
            anticipatePin: 1,
            // markers: true, 
          },
        }
      );
    }
  }, []);

  return null;
};

