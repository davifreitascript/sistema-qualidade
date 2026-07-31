export const teares = Array.from({ length: 58 }, (_, index) => {
  const numero = index + 1;
  return `Tear ${String(numero).padStart(2, "0")}`;
});