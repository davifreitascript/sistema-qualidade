import type { TesteCadarcos } from "../types/cadarcos";
import { useMemo, useState } from "react";
import { TabelaCadarcos } from "../components/TabelaCadarcos";
import { ModalExcluirCadarcos } from "../components/ModalExcluirCadarcos";
import { sincronizarTestes, excluirTeste } from "../services/cadarcos";
import toast from "react-hot-toast";

export default function TestesAlcas() {

  const [ordemAdicao, setOrdemAdicao] = useState<"recente" | "antigo">("recente");

  const [filtroLote, setFiltroLote] = useState("");

  const [testes, setTestes] = useState<TesteCadarcos[]>(() => {
    const dadosSalvos = localStorage.getItem("testes-cadarcos");
    return dadosSalvos ? JSON.parse(dadosSalvos) : [];
  });

  const [statusSync, setStatusSync] = useState<"idle" | "loading" | "success">("idle");
  const [testeSelecionado, setTesteSelecionado] = useState<TesteCadarcos | null>(null);
  const [numeroSelecionado, setNumeroSelecionado] = useState<number>(0);

  const testesFiltrados = useMemo(() => {
    const filtro = filtroLote.trim().toLowerCase();

    return testes
      .filter((teste) =>
        teste.lote.toLowerCase().includes(filtro)
      )
      .sort((a, b) =>
        ordemAdicao === "recente" ? b.id - a.id : a.id - b.id
      );
  }, [testes, filtroLote, ordemAdicao]);

  function editarTeste(teste: TesteCadarcos) {
    console.log("Editar teste:", teste);
  }

  async function solicitarExclusao(teste: TesteCadarcos, numero: number) {
    setTesteSelecionado(teste);
    setNumeroSelecionado(numero)
  }

  async function confirmarExclusao() {
    if (!testeSelecionado) return;

    try {
      await excluirTeste(testeSelecionado.uuid, testeSelecionado.sincronizado);

      setTestes((prev) =>
        prev.filter((item) => item.uuid !== testeSelecionado.uuid)
      );

      toast.success("Teste excluído com sucesso.");
    } catch (erro) {
      console.error(erro);
      toast.error("Não foi possível excluir o teste.");
    } finally {
      setTesteSelecionado(null);
    }
  }

async function sincronizarBanco() {
    const pendentes = testes.filter((t) => !t.sincronizado);

    if (pendentes.length === 0) {
      toast("Não existem testes pendentes.");
      return;
    }

    setStatusSync("loading");

    try {
      const enviados = await sincronizarTestes(pendentes);

      const atualizados = testes.map((teste) => ({
        ...teste,
        sincronizado:
          teste.sincronizado || enviados.includes(teste.id),
      }));

      setTestes(atualizados);

      localStorage.setItem(
        "testes-tecido",
        JSON.stringify(atualizados)
      );

      setStatusSync("success");
      toast.success(`${enviados.length} teste(s) sincronizado(s).`);

      setTimeout(() => {
        setStatusSync("idle");
      }, 2000);

    } catch (err) {
      console.error(err);
      setStatusSync("idle");
      toast("Erro ao sincronizar.");
    }
  }

  return (
    <main className="flex flex-col md:h-160 h-screen pt-4 bg-slate-100">

      <TabelaCadarcos
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

      {testeSelecionado && (
        <ModalExcluirCadarcos
          teste={testeSelecionado}
          numero={numeroSelecionado}
          cancelar={() => setTesteSelecionado(null)}
          confirmar={confirmarExclusao}
        />
      )}
    </main>
  );
}