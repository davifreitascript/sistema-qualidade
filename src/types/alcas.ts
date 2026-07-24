export type FormTesteAlcas = {
  data: string;
  lote: string;
  tear: string;
  artigo: string;
  gramatura: string;
  batidaTrama: string;
  responsavel_analise: string;
  responsavel_teste: string;
};

export type TesteAlcas = FormTesteAlcas & {
  id: number;
  uuid: string;
  sincronizado: boolean;
  excluido?: boolean;
};

export const formInicial: FormTesteAlcas = {
  data: "",
  lote: "",
  tear: "",
  artigo: "",
  gramatura: "",
  batidaTrama: "",
  responsavel_analise: "",
  responsavel_teste: ""
};