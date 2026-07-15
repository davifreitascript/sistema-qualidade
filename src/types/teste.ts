export type TipoTecido = "leve" | "pesado";

export type FormTesteTecido = {
  data: string;
  lote: string;
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
  data: "",
  lote: "",
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
  controlista: ""
};