export const fiosPorTipo = {
  "FIO DOBRADO": [
    "2450 DEN BC"
  ],

  "FIO FIBRILADO": [
    "1800 DEN BC"
  ],

  "FIO MULTI": [
    "930 MT NATURAL"
  ],

  "FITA RÁFIA": [
    "540 DEN BC",
    "600 DEN BC",
    "630 DEN BC",
    "675 DEN BC",
    "875 DEN BC",
    "900 DEN BC",
    "1620 DEN BC",
    "1860 DEN BC",
    "2350 DEN BC",
  ],
} as const;

export type TipoFio = keyof typeof fiosPorTipo;