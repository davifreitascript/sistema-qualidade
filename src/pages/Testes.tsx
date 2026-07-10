import { useMemo, useState } from "react";
import type { TesteTecido } from "../types/teste";
import { TabelaTestes } from "../components/TabelaTestes";
import { sincronizarTestes } from "../services/testes";

export default function Testes() {

  const [ordemAdicao, setOrdemAdicao] = useState<"recente" | "antigo">("recente");

  const [filtroLote, setFiltroLote] = useState("");

  const [testes, setTestes] = useState<TesteTecido[]>(() => {
    const dadosSalvos = localStorage.getItem("testes-tecido");
    return dadosSalvos ? JSON.parse(dadosSalvos) : [];
  });

    const [statusSync, setStatusSync] = useState<
    "idle" | "loading" | "success"
  >("idle");

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

  async function sincronizarBanco() {
    const pendentes = testes.filter((t) => !t.sincronizado);

    if (pendentes.length === 0) {
      alert("Não existem testes pendentes.");
      return;
    }

    setStatusSync("loading");

    try {
      const enviados = await sincronizarTestes(pendentes);

      const atualizados = testes.map((teste) => ({
        ...teste,
        sincronizado: teste.sincronizado || pendentes.some(p => p.id === teste.id),
      }));

      setTestes(atualizados);

      localStorage.setItem(
        "testes-tecido",
        JSON.stringify(atualizados)
      );

      setStatusSync("success");

      setTimeout(() => {
        setStatusSync("idle");
      }, 2000);

    } catch (err) {
      setStatusSync("idle");
      alert("Erro ao sincronizar.");
    }
  }

  return (
    <main className="min-h-screen flex flex-col justify-center bg-slate-100 p-10">
      <TabelaTestes
        testes={testes}
        testesFiltrados={testesFiltrados}
        filtroLote={filtroLote}
        setFiltroLote={setFiltroLote}
        ordemAdicao={ordemAdicao}
        setOrdemAdicao={setOrdemAdicao}
        editarTeste={editarTeste}
        solicitarExclusao={solicitarExclusao}
        sincronizarBanco={sincronizarBanco}
        statusSync={statusSync}
      />
      <footer className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-sm text-slate-500 select-none">
        © {new Date().getFullYear()} Grupo Procópio
      </footer>
    </main>
  );
}