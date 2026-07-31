import type { TesteFio } from "../types/fios";
import { useEffect, useState, useMemo } from "react";
import { TabelaFios } from "../components/TabelaFios";

export default function TestesFio() {
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

  return (
    <main className="flex flex-col md:max-h-160 md:min-h-100 pt-6 bg-slate-100">

      <TabelaFios
        testes={testes}
        testesFiltrados={testesFiltrados}
        filtroLote={filtroLote}
        setFiltroLote={setFiltroLote}
        ordemAdicao={ordemAdicao}
        setOrdemAdicao={setOrdemAdicao}
      />

    </main>
  );
}