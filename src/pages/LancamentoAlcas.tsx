import type { FormTesteAlcas } from "../types/alcas";
import { useState, useEffect } from "react";
import { formInicial } from "../types/alcas";
import { FormularioAlcas } from "../components/FormularioAlcas";
import { obterDataAtual} from "../utils/formatarData";
import { gerarLotePorData } from "../utils/gerarLote";
import { salvarTesteLocal } from "../services/alcas";
import { CHAVE_FORMULARIO } from "../config/auth";
import toast from "react-hot-toast";

export default function LancamentoAlcas() {

  const [form, setForm] = useState<FormTesteAlcas>(() => {
    const hoje = obterDataAtual();

    const salvo = sessionStorage.getItem(CHAVE_FORMULARIO);

    if (salvo) {
      const formulario: FormTesteAlcas = JSON.parse(salvo);

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
      "tear",

      "gramatura",
      "batidaTrama",
      "responsavel_analise",
      "responsavel_teste"
    ];

    const invalidos = obrigatorios.filter(
      (campo) => !form[campo as keyof FormTesteAlcas]
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
        <h1 className="my-8 text-center font-bold text-slate-800 md:text-5xl text-3xl select-none">Lançamento de Alças</h1>

        <FormularioAlcas
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