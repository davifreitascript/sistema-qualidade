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
    "600 DEN BC"
  ],
} as const;

export type TipoFio = keyof typeof fiosPorTipo;