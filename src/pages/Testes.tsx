import type { TesteTecido } from "../types/teste";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TabelaTestes } from "../components/TabelaTestes";
import { sincronizarTestes } from "../services/testes";
import { excluirTeste } from "../services/testes";
import { supabase } from "../lib/supabase";
import { LogOut } from "lucide-react"
import toast from "react-hot-toast";

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

  async function solicitarExclusao(teste: TesteTecido) {
    const confirmar = confirm(`Deseja excluir o lote ${teste.lote}?`);

    if (!confirmar) return;

    try {
      await excluirTeste(teste.uuid);

      const novosTestes = testes.filter(
        (item) => item.uuid !== teste.uuid
      );

      setTestes(novosTestes);

      toast.success("Teste excluído com sucesso.");

    } catch (erro) {
      console.error("Erro ao excluir teste:", erro);
      toast.error("Não foi possível excluir o teste.");
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
    await supabase.auth.signOut();
    localStorage.removeItem("loginExpiraEm");
    navigate("/login", { replace: true });
  }

  return (
    <main className="min-h-screen flex flex-col justify-center bg-slate-100 p-10">

      <div className="flex justify-end items-center">
        <button
          onClick={sair}
          className="mb-4 btn btn-red">
          <LogOut size={18} />
          Sair
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

      <footer className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-sm text-slate-500 select-none">
        © {new Date().getFullYear()} Grupo Procópio
      </footer>
    </main>
  );
}