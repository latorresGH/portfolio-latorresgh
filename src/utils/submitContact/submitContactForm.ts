export type ContactStatus = "idle" | "sending" | "success" | "error";

/**
 * Envía los datos del formulario de contacto a Formspree.
 * @param form Formulario HTML a enviar.
 * @returns Estado de envío: "success" o "error"
 */
export async function submitContactForm(form: HTMLFormElement): Promise<"success" | "error"> {
  const data = new FormData(form);

  try {
    const response = await fetch("https://formspree.io/f/xeokkawj", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      return "success";
    } else {
      return "error";
    }
  } catch (error) {
    console.error("Error al enviar el formulario:", error);
    return "error";
  }
}
