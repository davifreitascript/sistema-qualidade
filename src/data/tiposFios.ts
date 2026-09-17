export const fiosPorTipo = {
  "FIO DOBRADO": [
    "2450 DEN",
    "2700 DEN"
  ],

  "FIO FIBRILADO": [
    "1350 DEN",
    "1800 DEN"
  ],

  "FIO MULTI": [
    "930 MT"
  ],

  "FITA RÁFIA": [
    "540 DEN",
    "600 DEN",
    "630 DEN",
    "675 DEN",
    "780 DEN",
    "875 DEN",
    "900 DEN",
    "1620 DEN",
    "1860 DEN",
    "2350 DEN",
  ],
} as const;

export type TipoFio = keyof typeof fiosPorTipo;