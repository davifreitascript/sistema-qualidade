export type FormTesteAlcas = {
  data: string;
  lote: string;
  artigo: string;
  tear: string[];
  batidaTrama: string;
  gramatura: string;
  mediaResistencia: string;
  mediaTenacidade: string;
  responsavelTeste: string;
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
  artigo: "",
  tear: [],
  batidaTrama: "",
  gramatura: "",
  mediaResistencia: "",
  mediaTenacidade: "",
  responsavelTeste: ""
};