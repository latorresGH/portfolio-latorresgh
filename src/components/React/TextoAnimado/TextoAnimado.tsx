"use client";
import { useEffect } from "react";
import { animarTextoMascara } from "../../../utils/animations/animarTexto";

const TextoAnimado = () => {
  useEffect(() => {
    animarTextoMascara();
  }, []);

  return null;
};

export default TextoAnimado;
