import { useState } from "react";
import { submitContactForm } from "../../../utils/submitContact/submitContactForm";
import type { ContactStatus } from "../../../utils/submitContact/submitContactForm";

export default function ContactFormReact() {
  const [status, setStatus] = useState<ContactStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const validateInputs = (form: HTMLFormElement) => {
    const nombre = form.nombre.value.trim();
    const apellido = form.apellido.value.trim();
    const correo = form.correo.value.trim();
    const mensaje = form.mensaje.value.trim();
    const honeypot = form.hpot.value; // Campo oculto para detectar bots

    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,30}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (honeypot) return "🤖 Detectado como bot.";
    if (!nameRegex.test(nombre)) return "Nombre inválido.";
    if (!nameRegex.test(apellido)) return "Apellido inválido.";
    if (!emailRegex.test(correo)) return "Correo inválido.";
    if (mensaje.length < 10 || mensaje.length > 1000) return "El mensaje debe tener entre 10 y 1000 caracteres.";

    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const validationError = validateInputs(form);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setStatus("sending");

    const result = await submitContactForm(form);

    if (result === "success") {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 text-5xl font-montserrat" noValidate>
      {/* Anti-spam honeypot */}
      <input type="text" name="hpot" className="hidden" autoComplete="off" />

      <input name="nombre" type="text" placeholder="PRIMER NOMBRE" className="border-0 border-b border-[#5a2b16] bg-transparent text-white placeholder-stone-800 focus:outline-none focus:ring-0 py-2" required />
      <input name="apellido" type="text" placeholder="APELLIDO" className="border-0 border-b border-[#5a2b16] bg-transparent text-white placeholder-stone-800 focus:outline-none focus:ring-0 py-2" required />
      <input name="correo" type="email" placeholder="CORREO" className="border-0 border-b border-[#5a2b16] bg-transparent text-white placeholder-stone-800 focus:outline-none focus:ring-0 py-2" required />
      <textarea name="mensaje" placeholder="MENSAJE QUE DESEAS ENVIAR" className="border-[0.5px] border-[#5a2b16] bg-transparent text-white placeholder-stone-800 focus:outline-none focus:ring-0 h-64 py-2 px-2 resize-none" required />

      <button type="submit" className="mt-4 w-fit self-end px-6 py-3 border border-[#5a2b16] text-white text-3xl hover:bg-[#5a2b16] transition-all duration-300">
        {status === "sending" ? "ENVIANDO..." : "ENVIAR"}
      </button>

      {error && <p className="text-red-400 text-xl mt-2">{error}</p>}
      {status === "success" && <p className="text-green-400 text-xl mt-2">Enviado correctamente</p>}
      {status === "error" && <p className="text-red-400 text-xl mt-2">Error al enviar. Probá de nuevo.</p>}
    </form>
  );
}
