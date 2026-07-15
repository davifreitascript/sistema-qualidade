import type { TesteTecido } from "../types/teste";
import { useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { TabelaTestes } from "../components/TabelaTestes";
import { ModalExcluir } from "../components/ModalExcluir";
import { sincronizarTestes, excluirTeste } from "../services/testes";
import { LogOut, Home } from "lucide-react"
import toast from "react-hot-toast";

export default function Testes() {

  const [ordemAdicao, setOrdemAdicao] = useState<"recente" | "antigo">("recente");

  const [filtroLote, setFiltroLote] = useState("");

  const [testes, setTestes] = useState<TesteTecido[]>(() => {
    const dadosSalvos = localStorage.getItem("testes-tecido");
    return dadosSalvos ? JSON.parse(dadosSalvos) : [];
  });

  const [statusSync, setStatusSync] = useState<"idle" | "loading" | "success">("idle");
  const [testeSelecionado, setTesteSelecionado] = useState<TesteTecido | null>(null);
  const [numeroSelecionado, setNumeroSelecionado] = useState<number>(0);

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

  async function solicitarExclusao(teste: TesteTecido, numero: number) {
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

  const navigate = useNavigate();

  async function sair() {
    sessionStorage.removeItem("sessaoAtiva");
    sessionStorage.removeItem("formulario-tecido");

    await supabase.auth.signOut();

    navigate("/login", { replace: true });
  }

  return (
    <main className="min-h-screen flex flex-col justify-center p-10 relative bg-slate-100">

      <div className="flex justify-end items-center gap-2 absolute top-10 right-12">
        <button
          onClick={() => navigate("/")}
          className="btn btn-blue flex items-center gap-2">
          <Home size={18} />
        </button>

        <button
          onClick={sair}
          className="btn btn-red">
          <LogOut size={18} />
        </button>
      </div>

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

      {testeSelecionado && (
        <ModalExcluir
          teste={testeSelecionado}
          numero={numeroSelecionado}
          cancelar={() => setTesteSelecionado(null)}
          confirmar={confirmarExclusao}
        />
      )}

      <footer className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-sm text-slate-500 select-none">
        © {new Date().getFullYear()} Grupo Procópio
      </footer>
    </main>
  );
}