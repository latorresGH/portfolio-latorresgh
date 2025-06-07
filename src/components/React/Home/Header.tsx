import { useEffect, useRef } from "react";
import { spawnText, initLenis, loopMarquee } from "../../../utils/animaciones";

export default function LeftLinks() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initLenis();
    spawnText(".spawn-text-animation");

    if (marqueeRef.current) {
      loopMarquee(marqueeRef.current);
    }
  }, []);

  return (
    <>
      <section
        className="text-[#484848] flex w-[96.2vw] h-16 justify-between spawn-text-animation"
        style={{ fontFamily: "SuisseIntl" }}
      >
        {/* Marquee */}
        <div className="relative overflow-hidden w-36 h-[2.5rem] mt-4 ml-4">
          <div
            ref={marqueeRef}
            className="flex w-max whitespace-nowrap marquee-track"
          >
            <div className="marquee-content px-4 flex items-center">
              <p className="text-[1rem] flex items-center">
                <span className="text-[1.5rem] mr-1">©</span>Por LatorresGH
              </p>
            </div>
          </div>
        </div>

        <div>
          <ul className="flex gap-6 mt-4 mr-6 h-[2.5rem] items-center justify-center text-[1.10rem]">
            <li>
              <a href="">INICIO</a>
            </li>
            <li>
              <a href="">SOBRE MI</a>
            </li>
            <li>
              <a href="">MI EXPERIENCIA</a>
            </li>
            <li>
              <a href="">PROYECTOS</a>
            </li>
            <li>
              <a href="">CONTACTAME</a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
