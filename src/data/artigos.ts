import type { TipoTecido } from "../types/teste";

export const artigosPorTipo: Record<TipoTecido,
  { codigo: string; nome: string }[]
> = {
  leve: [
    { codigo: "45x44", nome: "45x44" },
    { codigo: "55x44", nome: "55x44" },
    { codigo: "60x44", nome: "60x44" },
    { codigo: "60x80", nome: "60x80" },
    { codigo: "100x58", nome: "100x58" },
    { codigo: "100x100", nome: "100x100" },
  ],

  pesado: [
    { codigo: "360x160", nome: "360x160" },
    { codigo: "360x180", nome: "360x180" },
    { codigo: "360x190", nome: "360x190" },
    { codigo: "360x200", nome: "360x200" },
    { codigo: "360x220", nome: "360x220" },
    { codigo: "98x160", nome: "98x160" },
    { codigo: "115x185", nome: "115x185" },
    { codigo: "115x200", nome: "115x200" },
    { codigo: "120x137", nome: "120x137" },
  ],
};