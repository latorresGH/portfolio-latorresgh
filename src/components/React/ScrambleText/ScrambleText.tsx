// ScrambleText.tsx
import { useEffect, useRef } from "react";

type Props = {
  text: string;
  className?: string;
  chars?: string;           // pool de símbolos
  stepTime?: number;        // ms por paso (más alto = más lento)
  iterations?: number;      // pasadas por letra (más alto = más largo)
  trigger?: "hover" | "auto";
  scrambleFraction?: number;// 0..1: % de letras que se glitchean en cada corrida
  idleJitter?: boolean;     // “glitch” ambiental sin hover
  idleEveryMs?: number;     // cada cuánto se dispara el jitter
  idleBatch?: number;       // cuántas letras toca el jitter
};

export default function ScrambleText({
  text,
  className,
  chars = "#$%{}[]()/\\|<>_-=+*?@~^&0123456789",
  stepTime = 28,
  iterations = 16,
  trigger = "hover",
  scrambleFraction = 0.45,
  idleJitter = true,
  idleEveryMs = 2600,
  idleBatch = 6,
}: Props) {
  const elRef = useRef<HTMLDivElement | null>(null);
  const original = text.replace(/\r/g, "");
  const rafRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const runningRef = useRef(false);

  const rand = (pool: string) => pool[Math.floor(Math.random() * pool.length)];

  // elige posiciones únicas para glitchear
  const pickIndices = (len: number, fraction: number) => {
    const n = Math.max(1, Math.floor(len * fraction));
    const set = new Set<number>();
    while (set.size < n) {
      const i = Math.floor(Math.random() * len);
      if (original[i] !== "\n") set.add(i);
    }
    return [...set].sort((a, b) => a - b);
  };

  const scramble = () => {
    if (!elRef.current || runningRef.current) return;
    runningRef.current = true;

    const length = original.length;
    const indices = pickIndices(length, scrambleFraction);

    // mapa para saber qué posiciones se animan y cuándo terminan
    const steps: Record<number, number> = {};
    indices.forEach((i, k) => {
      const base = Math.floor(iterations * 0.6);
      const jitter = Math.floor(Math.random() * Math.ceil(iterations * 0.8));
      // pequeña cascada
      steps[i] = base + jitter + Math.floor(k * 0.6);
    });

    let frame = 0;
    const tick = () => {
      let out = "";
      let done = 0;

      for (let i = 0; i < length; i++) {
        const finalChar = original[i];
        if (finalChar === "\n") {
          out += "\n";
          done++;
          continue;
        }
        const s = steps[i];
        if (s === undefined) {
          // no se anima esta letra
          out += finalChar;
          done++;
        } else if (frame < s) {
          out += rand(chars);
        } else {
          out += finalChar;
          done++;
        }
      }

      if (elRef.current) elRef.current.textContent = out;
      frame++;
      if (done < length) {
        rafRef.current = window.setTimeout(tick, stepTime) as unknown as number;
      } else {
        runningRef.current = false;
      }
    };

    tick();
  };

  // Jitter ambiental: cambia pocas letras por ~200ms sin hover
  const startIdle = () => {
    if (!idleJitter || !elRef.current) return;
    stopIdle();
    timerRef.current = window.setInterval(() => {
      if (!elRef.current || runningRef.current) return;
      const len = original.length;
      const positions = pickIndices(len, Math.min(1, idleBatch / Math.max(1, len)));
      const snapshot = elRef.current.textContent ?? original;
      let out = snapshot.split("");
      positions.forEach((i) => {
        if (original[i] !== "\n") out[i] = rand(chars);
      });
      elRef.current.textContent = out.join("");
      // restaurar luego
      setTimeout(() => {
        if (!elRef.current || runningRef.current) return;
        elRef.current.textContent = snapshot;
      }, 200);
    }, idleEveryMs) as unknown as number;
  };
  const stopIdle = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    el.textContent = original;

    // activar idle cuando es visible
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? startIdle() : stopIdle()));
      },
      { threshold: 0.2 }
    );
    io.observe(el);

    if (trigger === "auto") setTimeout(scramble, 300);

    const onEnter = () => trigger === "hover" && scramble();
    el.addEventListener("mouseenter", onEnter);

    return () => {
      el.removeEventListener("mouseenter", onEnter);
      io.disconnect();
      stopIdle();
      if (rafRef.current) window.clearTimeout(rafRef.current);
    };
  }, [text, trigger, stepTime, iterations, chars, scrambleFraction, idleJitter, idleEveryMs, idleBatch]);

  return (
    <div
      ref={elRef}
      className={`${className ?? ""} whitespace-pre-line select-none`}
      aria-label={original}
      role="heading"
      aria-level={1}
    />
  );
}
