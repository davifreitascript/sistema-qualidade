import type { FormTesteTecido, TesteTecido } from "./types/teste";
import { useState } from "react";
import { formInicial } from "./types/teste";
import { FormularioTeste } from "./components/FormularioTeste";
import { supabase } from "./lib/supabase";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const [form, setForm] = useState<FormTesteTecido>(formInicial);
  const [salvando, setSalvando] = useState(false);
  const [erroSalvar, setErroSalvar] = useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState("");

  async function salvarTeste(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  setSalvando(true);
  setErroSalvar("");
  setMensagemSucesso("");

  const turmaAtual = form.turma;
  const dataAtual = form.data;
  const loteAtual = form.lote;

  try {
    const novoTeste: TesteTecido = {
      id: Date.now(),
      ...form,
      sincronizado: false,
    };

    const testesSalvos: TesteTecido[] = JSON.parse(
      localStorage.getItem("testes-tecido") || "[]"
    );

    testesSalvos.unshift(novoTeste);

    localStorage.setItem(
      "testes-tecido",
      JSON.stringify(testesSalvos)
    );

    setMensagemSucesso("Teste salvo localmente.");

    setForm({
      ...formInicial,
      data: dataAtual,
      lote: loteAtual,
      turma: turmaAtual,
    });
  } catch {
    setErroSalvar("Não foi possível salvar o teste.");
  } finally {
    setSalvando(false);
  }
}

async function sair() {
  await supabase.auth.signOut();
  localStorage.removeItem("loginExpiraEm");
  navigate("/login", { replace: true });
}

  return (
    <div className="flex min-h-screen flex-col bg-slate-100 p-3 md:p-6">
      <div className="flex items-center justify-end gap-4">
        <Link
          to="/testes"
          className="rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
        >
          Ver testes lançados
        </Link>

        <button
          type="button"
          onClick={sair}
          className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
        >
          Sair
        </button>
      </div>

      <div className="mx-auto w-full max-w-5xl">
        <h1 className="my-8 text-center text-2xl font-bold text-slate-800 md:text-5xl">
          Alçatec - Lançamento de tecido
        </h1>

        {mensagemSucesso && (
          <p className="mb-4 rounded-lg bg-green-100 px-4 py-3 text-sm text-green-800">
            {mensagemSucesso}
          </p>
        )}

        {erroSalvar && (
          <p className="mb-4 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-800">
            {erroSalvar}
          </p>
        )}

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