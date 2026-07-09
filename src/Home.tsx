import { useEffect, useState } from "react";
import type { FormTesteTecido, TesteTecido } from "./types/teste";
import { formInicial } from "./types/teste";
import { FormularioTeste } from "./components/FormularioTeste";
import { ModalExcluir } from "./components/ModalExcluir";
import { supabase } from "./lib/supabase.ts";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Home() {

  const [testes, setTestes] = useState<TesteTecido[]>(() => {
    const dadosSalvos = localStorage.getItem("testes-tecido");
    return dadosSalvos ? JSON.parse(dadosSalvos) : [];
  });

  const [form, setForm] = useState<FormTesteTecido>(formInicial);
  const [testeEditandoId, setTesteEditandoId] = useState<number | null>(null);
  const [testeParaExcluir, setTesteParaExcluir] =
    useState<TesteTecido | null>(null);

  useEffect(() => {
    localStorage.setItem("testes-tecido", JSON.stringify(testes));
  }, [testes]);

  function salvarTeste(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const turmaAtual = form.turma;
    const dataAtual = form.data;
    const loteAtual = form.lote;

    if (testeEditandoId) {
      setTestes(
        testes.map((teste) =>
          teste.id === testeEditandoId ? { ...teste, ...form } : teste
        )
      );

      setTesteEditandoId(null);
      setForm({
        ...formInicial,
        data: dataAtual,
        lote: loteAtual,
        turma: turmaAtual,
      });
      return;
    }

    const novoTeste: TesteTecido = {
      id: Date.now(),
      ...form,
    };

    setTestes([novoTeste, ...testes]);
    setForm({
      ...formInicial,
      data: dataAtual,
      lote: loteAtual,
      turma: turmaAtual,
    });
  }

  function confirmarExclusao() {
    if (!testeParaExcluir) return;

    setTestes(testes.filter((teste) => teste.id !== testeParaExcluir.id));
    setTesteParaExcluir(null);
  }

  const navigate = useNavigate();

  async function sair() {
    await supabase.auth.signOut();
    localStorage.removeItem("loginExpiraEm");
    navigate("/login", { replace: true });
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 p-3 md:p-6">
      <div className="flex justify-end items-center gap-4">
        <div className="flex justify-center items-center">
          <Link
            to="/testes"
            className="rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 cursor-default"
          >
            Ver testes lançados
          </Link>
        </div>

        <button
          onClick={sair}
          className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
        >
          Sair
        </button>
        <div></div>
      </div>

      <div className="mx-auto max-w-5xl">
        <h1 className="my-8 text-center text-2xl font-bold text-slate-800 md:text-5xl">Alçatec - Lançamento de tecido</h1>

        <FormularioTeste
          form={form}
          setForm={setForm}
          salvarTeste={salvarTeste}
          testeEditandoId={testeEditandoId} />
      </div>

      {testeParaExcluir && (
        <ModalExcluir
          teste={testeParaExcluir}
          cancelar={() => setTesteParaExcluir(null)}
          confirmar={confirmarExclusao} />
      )}

      <footer className="my-4 text-center text-sm text-slate-500 select-none">
        © {new Date().getFullYear()} Alçatec Produtos Sintéticos
      </footer>
    </div>
  );
}