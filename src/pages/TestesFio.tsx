import { useEffect, useState } from "react";
import type { TesteFio } from "../types/fio";
import { TabelaFios } from "../components/TabelaFios";

export function TestesFio() {
  const [testes, setTestes] = useState<TesteFio[]>([]);

  useEffect(() => {
    const dados = localStorage.getItem("testes-fio");

    if (dados) {
      setTestes(JSON.parse(dados));
    }
  }, []);

  return (
    <main className="min-h-screen flex flex-col justify-center items-center p-4 md:p-10 relative bg-slate-100">
      <TabelaFios testes={testes} />
    </main>
  );
}