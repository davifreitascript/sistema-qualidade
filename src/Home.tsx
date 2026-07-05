import { useEffect, useState } from "react";

import type { FormTesteTecido, TesteTecido } from "./types/teste";
import { formInicial } from "./types/teste";

import { FormularioTeste } from "./components/FormularioTeste";
import { TabelaTestes } from "./components/TabelaTestes";
import { ModalExcluir } from "./components/ModalExcluir";

export default function Home() {

  const [ordemAdicao, setOrdemAdicao] = useState<"recente" | "antigo">("recente");

  const [testes, setTestes] = useState<TesteTecido[]>(() => {
    const dadosSalvos = localStorage.getItem("testes-tecido");
    return dadosSalvos ? JSON.parse(dadosSalvos) : [];
  });

  const [form, setForm] = useState<FormTesteTecido>(formInicial);
  const [filtroLote, setFiltroLote] = useState("");
  const [testeEditandoId, setTesteEditandoId] = useState<number | null>(null);
  const [testeParaExcluir, setTesteParaExcluir] =
    useState<TesteTecido | null>(null);

  useEffect(() => {
    localStorage.setItem("testes-tecido", JSON.stringify(testes));
  }, [testes]);

  const testesFiltrados = testes
    .filter((teste) =>
      teste.lote.toLowerCase().includes(filtroLote.toLowerCase())
    )
    .sort((a, b) =>
      ordemAdicao === "recente"
        ? new Date(b.data).getTime() - new Date(a.data).getTime()
        : new Date(a.data).getTime() - new Date(b.data).getTime()
    );

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

  function editarTeste(teste: TesteTecido) {
    setTesteEditandoId(teste.id);

    const { id, ...dadosFormulario } = teste;
    setForm(dadosFormulario);
  }

  function confirmarExclusao() {
    if (!testeParaExcluir) return;

    setTestes(testes.filter((teste) => teste.id !== testeParaExcluir.id));
    setTesteParaExcluir(null);
  }

  return (
    <div className="min-h-screen bg-slate-100 p-3 md:p-6">
      <div className="mx-auto my-10 md:my-15 max-w-5xl">
        <h1 className="my-8 text-center text-2xl font-bold text-slate-800 md:text-4xl">Alçatec - Lançamento de tecido</h1>

        <FormularioTeste
          form={form}
          setForm={setForm}
          salvarTeste={salvarTeste}
          testeEditandoId={testeEditandoId} />

        <TabelaTestes
          testes={testes}
          testesFiltrados={testesFiltrados}
          filtroLote={filtroLote}
          setFiltroLote={setFiltroLote}
          ordemAdicao={ordemAdicao}
          setOrdemAdicao={setOrdemAdicao}
          editarTeste={editarTeste}
          solicitarExclusao={setTesteParaExcluir}
        />
      </div>

      {testeParaExcluir && (
        <ModalExcluir
          teste={testeParaExcluir}
          cancelar={() => setTesteParaExcluir(null)}
          confirmar={confirmarExclusao} />
      )}

      <footer className="mt-8 text-center text-sm text-slate-500 select-none">
        © {new Date().getFullYear()} Alçatec Produtos Sintéticos
      </footer>
    </div>
  );
}