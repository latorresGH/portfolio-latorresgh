"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

interface UpTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const UpText: React.FC<UpTextProps> = ({ children, className, delay = 0 }) => {
  const elRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (typeof window === "undefined") return;

  const el = elRef.current;
  if (!el) return;

  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(
    el,
    { y: "40%", opacity: 0 },
    {
      y: "0%",
      opacity: 1,
      ease: "power3.out",
      duration: 1,
      delay: 0.1,
      scrollTrigger: {
        trigger: el,
        start: "top 10%",
        toggleActions: "play none none none",
      },
    }
  );
}, [children, delay]);

  return <div ref={elRef} className={className}>{children}</div>;
};
