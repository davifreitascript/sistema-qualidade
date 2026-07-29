import type { KeyboardEvent } from "react";

export function navegarComSetas(e: KeyboardEvent<HTMLElement>) {
  if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;

  const elemento = e.target as HTMLElement;

  // Ignora textarea
  if (elemento.tagName === "TEXTAREA") return;

  const formulario = elemento.closest("form");
  if (!formulario) return;

  const elementos = Array.from(
    formulario.querySelectorAll<HTMLElement>(
      "input, select, textarea, button"
    )
  ).filter(
    (el) =>
      !el.hasAttribute("disabled") &&
      el.tabIndex !== -1 &&
      el.offsetParent !== null
  );

  const indice = elementos.indexOf(elemento);

  if (indice === -1) return;

  if (e.key === "ArrowRight" && indice < elementos.length - 1) {
    e.preventDefault();
    elementos[indice + 1].focus();
  }

  if (e.key === "ArrowLeft" && indice > 0) {
    e.preventDefault();
    elementos[indice - 1].focus();
  }
}