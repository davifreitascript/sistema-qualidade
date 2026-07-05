export function formatarLote(valor: string) {
  const apenasNumeros = valor.replace(/\D/g, "").slice(0, 5);

  if (apenasNumeros.length <= 4) {
    return apenasNumeros;
  }

  return `${apenasNumeros.slice(0, 4)}-${apenasNumeros.slice(4)}`;
}