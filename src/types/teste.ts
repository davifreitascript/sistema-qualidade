export type TipoTecido = "leve" | "pesado";

export type TesteTecido = {
  id: number;
  lote: string;
  data: string;
  tear: string;
  turma: string;
  tipoTecido: "" | TipoTecido;
  artigo: string;
  gramatura: string;
  batidaTrama: string;
  batidaUrdume: string;
  resistenciaTrama: string;
  resistenciaUrdume: string;
  resistenciaReforco: string;
  controlista: string;
  sincronizado: boolean;
};

export type FormTesteTecido = Omit<TesteTecido, "id">;

export const formInicial: FormTesteTecido = {
  lote: "",
  data: "",
  tear: "",
  turma: "",
  tipoTecido: "",
  artigo: "",
  gramatura: "",
  batidaTrama: "",
  batidaUrdume: "",
  resistenciaTrama: "",
  resistenciaUrdume: "",
  resistenciaReforco: "",
  controlista: "",
  sincronizado: false,
};