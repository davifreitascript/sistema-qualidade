import type { TipoFio } from "../data/tiposFios";

export type FormTesteFio = {
  lote: string;
  data: string;
  turma: string;
  extrusora: string;
  tipoFio: TipoFio | "";
  fio: string;
  tituloDne: string;
  cor: string;
  gramatura: string;
  resistenciaFio: string;
  tenacidadeFio: string;
  alongamentoFio: string;
  responsavel_teste: string;
};

export type TesteFio = FormTesteFio & {
  id: number;
  uuid: string;
  sincronizado: boolean;
  excluido?: boolean;
};

export const formInicialFio: FormTesteFio = {
  lote: "",
  data: "",
  turma: "",
  extrusora: "",
  tipoFio: "",
  fio: "",
  tituloDne: "",
  cor: "",
  gramatura: "",
  resistenciaFio: "",
  tenacidadeFio: "",
  alongamentoFio: "",
  responsavel_teste: "",
};