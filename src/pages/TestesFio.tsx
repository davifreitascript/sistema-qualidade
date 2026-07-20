import type { TesteFio } from "../types/fio";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase";
import { TabelaFios } from "../components/TabelaFios";
import { LogOut, Home } from "lucide-react"

export function TestesFio() {
  const [testes, setTestes] = useState<TesteFio[]>([]);
  const [filtroLote, setFiltroLote] = useState("");
  const [ordemAdicao, setOrdemAdicao] = useState<"recente" | "antigo">("recente");

  const testesFiltrados = useMemo(() => {
    const filtro = filtroLote.trim().toLowerCase();

    return testes
      .filter((teste) =>
        teste.lote.toLowerCase().includes(filtro)
      )
      .sort((a, b) =>
        ordemAdicao === "recente" ? b.id - a.id : a.id - b.id
      );
  }, [TestesFio, filtroLote, ordemAdicao]);

  useEffect(() => {
    const dados = localStorage.getItem("testes-fio");

    if (dados) {
      setTestes(JSON.parse(dados));
    }
  }, []);

  const navigate = useNavigate();

  async function sair() {
    sessionStorage.removeItem("sessaoAtiva");
    sessionStorage.removeItem("formulario-tecido");

    await supabase.auth.signOut();

    navigate("/login", { replace: true });
  }

  return (
    <main className="min-h-screen flex flex-col justify-center p-4 md:p-10 relative bg-slate-100">

      <div className="flex justify-end items-center gap-2 absolute top-10 right-6">
        <button
          onClick={() => navigate("/lancamento-fio")}
          className="btn btn-blue flex items-center gap-2">
          <Home size={18} />
        </button>

        <button
          onClick={sair}
          className="btn btn-red">
          <LogOut size={18} />
        </button>
      </div>

      <TabelaFios
        testes={testes}
        testesFiltrados={testesFiltrados}
        filtroLote={filtroLote}
        setFiltroLote={setFiltroLote}
        ordemAdicao={ordemAdicao}
        setOrdemAdicao={setOrdemAdicao}
      />

      <footer className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-sm text-slate-500 select-none">
        © {new Date().getFullYear()} Grupo Procópio
      </footer>
    </main>
  );
}