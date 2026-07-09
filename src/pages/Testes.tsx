import { useMemo, useState } from "react";
import type { TesteTecido } from "../types/teste";
import { TabelaTestes } from "../components/TabelaTestes";

export default function Testes() {

  const [ordemAdicao, setOrdemAdicao] = useState<"recente" | "antigo">("recente");

  const [filtroLote, setFiltroLote] = useState("");

  const [testes, setTestes] = useState<TesteTecido[]>(() => {
    const dadosSalvos = localStorage.getItem("testes-tecido");
    return dadosSalvos ? JSON.parse(dadosSalvos) : [];
  });

  const testesFiltrados = useMemo(() => {
    return testes
      .filter((teste) => teste.lote.includes(filtroLote))
      .sort((a, b) =>
        ordemAdicao === "recente"
          ? b.id
          : a.id
      );
  }, [testes, filtroLote, ordemAdicao]);

  function editarTeste(teste: TesteTecido) {
    console.log("Editar teste:", teste);
  }

  function solicitarExclusao(teste: TesteTecido) {
    const confirmar = confirm(`Deseja excluir o lote ${teste.lote}?`);
    if (!confirmar) return;

    const novosTestes = testes.filter((item) => item.id !== teste.id);
    setTestes(novosTestes);
    localStorage.setItem("testes-tecido", JSON.stringify(novosTestes));
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <TabelaTestes
        testes={testes}
        testesFiltrados={testesFiltrados}
        filtroLote={filtroLote}
        setFiltroLote={setFiltroLote}
        ordemAdicao={ordemAdicao}
        setOrdemAdicao={setOrdemAdicao}
        editarTeste={editarTeste}
        solicitarExclusao={solicitarExclusao}
      />
    </main>
  );
}