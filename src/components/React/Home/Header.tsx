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
        className="text-[#484848] flex w-[96.2vw] h-16 justify-between"
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
            <li className="relative group">
              <a
                href="#inicio"
                className="after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#484848] group-hover:after:w-full after:transition-all after:duration-500"
              >
                INICIO
              </a>
            </li>
            <li className="relative group">
              <a
                href="#sobre-mi"
                className="after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#484848] group-hover:after:w-full after:transition-all after:duration-500"
              >
                SOBRE MI
              </a>
            </li>
            <li className="relative group">
              <a
                href="#estudios"
                className="after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#484848] group-hover:after:w-full after:transition-all after:duration-500"
              >
                ESTUDIOS
              </a>
            </li>
            <li className="relative group">
              <a
                href="#experiencia"
                className="after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#484848] group-hover:after:w-full after:transition-all after:duration-500"
              >
                MI EXPERIENCIA
              </a>
            </li>
            <li className="relative group">
              <a
                href="#skills"
                className="after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#484848] group-hover:after:w-full after:transition-all after:duration-500"
              >
                SKILLS
              </a>
            </li>
            <li className="relative group">
              <a
                href="#contactame"
                className="after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#484848] group-hover:after:w-full after:transition-all after:duration-500"
              >
                CONTACTAME
              </a>
            </li>

            <li className="relative group">
              <a
                href="/cv.pdf"
                download
                className="border border-gray-400 rounded-md px-3 py-2 bg-white bg-opacity-20 text-gray-800 hover:bg-opacity-60 transition duration-500 ease-in-out"
              >
                DESCARGAR CV
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
