export type FormTesteCadarcos = {
  data: string;
  lote: string;
  tear: string[];
  batidaTrama: string;
  artigo: string;
  gramatura: string;
  responsavel_analise: string;
  responsavel_teste: string;
};

export type TesteCadarcos = FormTesteCadarcos & {
  id: number;
  uuid: string;
  sincronizado: boolean;
  excluido?: boolean;
};

export const formInicial: FormTesteCadarcos = {
  data: "",
  lote: "",
  tear: [],
  batidaTrama: "",
  artigo: "",
  gramatura: "",
  responsavel_analise: "",
  responsavel_teste: ""
};