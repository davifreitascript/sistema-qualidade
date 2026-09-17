export type FormTesteCadarcos = {
  data: string;
  lote: string;
  tear: string[];
  batidaTrama: string;
  artigo: string;
  gramatura: string;
  responsavelAnalise: string;
  responsavelTeste: string;
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
  responsavelAnalise: "",
  responsavelTeste: ""
};