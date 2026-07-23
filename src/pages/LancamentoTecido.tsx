import type { FormTesteTecido } from "../types/teste";
import { useState, useEffect } from "react";
import { formInicial } from "../types/teste";
import { FormularioTeste } from "../components/FormularioTeste";
import { obterDataAtual} from "../utils/formatarData";
import { gerarLotePorData } from "../utils/gerarLote";
import { salvarTesteLocal } from "../services/testes";
import { CHAVE_FORMULARIO } from "../config/auth";
import toast from "react-hot-toast";

export default function Home() {

  const [form, setForm] = useState<FormTesteTecido>(() => {
    const hoje = obterDataAtual();

    const salvo = sessionStorage.getItem(CHAVE_FORMULARIO);

    if (salvo) {
      const formulario: FormTesteTecido = JSON.parse(salvo);

      if (formulario.data !== hoje) {
        return {
          ...formulario,
          data: hoje,
          lote: gerarLotePorData(hoje),
        };
      }

      return formulario;
    }

    return {
      ...formInicial,
      data: hoje,
      lote: gerarLotePorData(hoje),
    };
  });

  useEffect(() => {
    sessionStorage.setItem(CHAVE_FORMULARIO, JSON.stringify(form));
  }, [form]);

  const [salvando, setSalvando] = useState(false);


  async function salvarTeste(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const obrigatorios = [
      "turma",
      "tear",
      "tipoTecido",
      "artigo",
      "gramatura",
      "batidaTrama",
      "batidaUrdume",
      "responsavel_analise",
      "responsavel_teste"
    ];

    const invalidos = obrigatorios.filter(
      (campo) => !form[campo as keyof FormTesteTecido]
    );

    if (invalidos.length > 0) {
      toast.error("Preencha os campos obrigatórios.");
      return;
    }

    setSalvando(true);

    try {
      salvarTesteLocal(form);

      toast.success("Teste salvo localmente.");

      setForm((prev) => ({
        ...formInicial,
        turma: prev.turma,
        data: prev.data,
        lote: prev.lote,
      }));

    } catch {
      toast.error("Não foi possível salvar o teste.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center pt-6 bg-slate-100">

      <div className="mx-auto w-full max-w-5xl">
        <h1 className="my-8 text-center font-bold text-slate-800 md:text-5xl text-3xl select-none">Lançamento de tecido</h1>

        <FormularioTeste
          form={form}
          setForm={setForm}
          salvarTeste={salvarTeste}
          testeEditandoId={null}
          salvando={salvando}
        />
      </div>
    </div>
  );
}