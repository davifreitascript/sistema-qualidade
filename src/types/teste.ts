export type TipoTecido = "leve" | "pesado";

export type FormTesteTecido = {
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
};

export type TesteTecido = FormTesteTecido & {
  id: number;
  uuid: string;
  sincronizado: boolean;
  excluido?: boolean;
};

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
};