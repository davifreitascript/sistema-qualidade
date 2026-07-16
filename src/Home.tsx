import type { FormTesteTecido } from "./types/teste";
import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import { Link, useNavigate } from "react-router-dom";
import { formInicial } from "./types/teste";
import { FormularioTeste } from "./components/FormularioTeste";
import { obterDataAtual, formatarData } from "./utils/formatarData";
import { gerarLotePorData } from "./utils/gerarLote";
import { salvarTesteLocal } from "./services/testes";
import { CHAVE_FORMULARIO } from "./config/auth";
import { Table2, LogOut } from "lucide-react";
import toast from "react-hot-toast";

export default function Home() {
  const navigate = useNavigate();

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

  async function sair() {
    sessionStorage.removeItem("sessaoAtiva");
    sessionStorage.removeItem(CHAVE_FORMULARIO);

    await supabase.auth.signOut();

    navigate("/login", { replace: true });
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-100 p-3 md:p-6">

      <div className="flex md:flex-row flex-col-reverse items-center justify-between gap-4 py-2">

        <div className="flex gap-2 w-full md:w-fit">
          <div className="dataLote">
            <span className="block text-xs font-medium text-slate-500 select-none">
              Data:
            </span>

            <strong className="block text-base text-slate-800">
              {formatarData(form.data)}
            </strong>
          </div>

          <div className="dataLote">
            <span className="block text-xs font-medium text-slate-500 select-none">Lote:</span>

            <strong className="block text-base text-slate-800">
              {form.lote || ""}
            </strong>
          </div>
        </div>

        <div className="flex gap-2 md:justify-center justify-between w-full md:w-fit">
          
          <Link
            to="/testes"
            className="btn btn-blue">
            <Table2 size={18} />
          </Link>

          <button
            type="button"
            onClick={sair}
            className="btn btn-red">
            <LogOut size={18} />
          </button>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl">
        <h1 className="my-8 text-center text-2xl font-bold text-slate-800 md:text-5xl select-none">
          Alçatec - Lançamento de tecido
        </h1>

        <FormularioTeste
          form={form}
          setForm={setForm}
          salvarTeste={salvarTeste}
          testeEditandoId={null}
          salvando={salvando}
        />
      </div>

      <footer className="m-6 text-center text-sm text-slate-500 select-none md:absolute md:bottom-4 md:left-1/2 md:m-0 md:-translate-x-1/2">
        © {new Date().getFullYear()} Grupo Procópio
      </footer>
    </div>
  );
}