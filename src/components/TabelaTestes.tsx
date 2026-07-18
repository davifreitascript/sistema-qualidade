import type { TesteTecido } from "../types/teste";
import { formatarData } from "../utils/formatarData";
import { exportarCSV } from "../utils/exportarCSV";
import { exportarPDF } from "../utils/exportarPDF";
import { Loader2, Check, Database, HardDrive, Pencil, Trash2 } from "lucide-react";
import { FaFileCsv, FaFilePdf } from "react-icons/fa";
import Select from "react-select";

type Props = {
  testes: TesteTecido[];
  testesFiltrados: TesteTecido[];
  filtroLote: string;
  setFiltroLote: React.Dispatch<React.SetStateAction<string>>;
  ordemAdicao: "recente" | "antigo";
  setOrdemAdicao: React.Dispatch<React.SetStateAction<"recente" | "antigo">>;
  editarTeste: (teste: TesteTecido) => void;
  solicitarExclusao: (teste: TesteTecido, numero: number) => void;
  sincronizarBanco: () => Promise<void>;
  statusSync: "idle" | "loading" | "success";
};

export function TabelaTestes({
  testes,
  testesFiltrados,
  filtroLote,
  ordemAdicao,
  setOrdemAdicao,
  setFiltroLote,
  editarTeste,
  solicitarExclusao,
  sincronizarBanco,
  statusSync,
}: Props) {

  const selectStyles = {
    container: (base: any) => ({
      ...base,
      position: "relative",
    }),

    control: (base: any) => ({
      ...base,
      minHeight: "52px",
      borderRadius: "0.5rem",
      borderColor: "#cbd5e1",
      boxShadow: "none",
    }),

    menu: (base: any) => ({
      ...base,
      position: "absolute",
      top: "100%",
      marginTop: "4px",
      borderRadius: "0.75rem",
      overflow: "hidden",
      zIndex: 9999,
    }),
  };

  return (
    <div className="flex flex-col gap-6 p-6 min-h-90 max-h-130 rounded-xl bg-white shadow">

      <div className="flex flex-col justify-between gap-3 md:flex-row">
        <h2 className="mb-4 md:text-left text-center text-3xl md:text-4xl font-semibold">Testes lançados</h2>

        <div className="z-30 flex gap-4 justify-center items-center">
          <input
            type="number"
            className="inputLote"
            placeholder="Buscar lote..."
            value={filtroLote}
            onChange={(event) => setFiltroLote(event.target.value)}
          />

          <Select
            styles={selectStyles}
            isSearchable={false}
            menuPlacement="bottom"
            options={[
              { value: "recente", label: "Mais recentes" },
              { value: "antigo", label: "Mais antigos" },
            ]}
            value={
              [
                { value: "recente", label: "Mais recentes" },
                { value: "antigo", label: "Mais antigos" },
              ].find((opcao) => opcao.value === ordemAdicao) || null
            }
            onChange={(opcao) =>
              setOrdemAdicao((opcao?.value || "recente") as "recente" | "antigo")
            }
          />
        </div>
      </div>

      <div className="relative z-10 max-h-105 overflow-auto rounded-lg border border-slate-300">
        <table className="min-w-375 w-full border-collapse text-center align-middle">
          <thead className="sticky top-0 z-10">
            <tr className="bg-slate-300">
              <th className="px-8 py-8 whitespace-nowrap">N°</th>
              <th className="px-8 py-8 whitespace-nowrap">Lote</th>
              <th className="px-8 py-8 whitespace-nowrap">Data</th>
              <th className="px-8 py-8 whitespace-nowrap">Tear</th>
              <th className="px-8 py-8 whitespace-nowrap">Turma</th>
              <th className="px-8 py-8 whitespace-nowrap">Artigo</th>
              <th className="px-8 py-8 whitespace-nowrap">Gramatura</th>
              <th className="px-8 py-8 whitespace-nowrap">Batida Trama</th>
              <th className="px-8 py-8 whitespace-nowrap">Batida Urdume</th>
              <th className="px-8 py-8 whitespace-nowrap">Resistência Trama</th>
              <th className="px-8 py-8 whitespace-nowrap">Resistência Urdume</th>
              <th className="px-8 py-8 whitespace-nowrap">Resistência Reforço</th>
              <th className="px-8 py-8 whitespace-nowrap">Responsável Análise</th>
              <th className="px-8 py-8 whitespace-nowrap">Responsável Teste</th>
              <th className="px-8 py-8 whitespace-nowrap">Status</th>
              <th className="px-8 py-8" colSpan={2}>Ações</th>
            </tr>
          </thead>

          <tbody>
            {testesFiltrados.map((teste, index) => (
              <tr key={teste.uuid}>
                <td className="border border-slate-300 p-2">{index + 1}</td>
                <td className="border border-slate-300 p-2">{teste.lote}</td>
                <td className="border border-slate-300 p-2">{formatarData(teste.data)}</td>
                <td className="border border-slate-300 p-2">{teste.tear}</td>
                <td className="border border-slate-300 p-2">{teste.turma}</td>
                <td className="border border-slate-300 p-2">{teste.artigo}</td>
                <td className="border border-slate-300 p-2">{teste.gramatura}</td>
                <td className="border border-slate-300 p-2">{teste.batidaTrama}</td>
                <td className="border border-slate-300 p-2">{teste.batidaUrdume}</td>
                <td className="border border-slate-300 p-2">{teste.resistenciaTrama}</td>
                <td className="border border-slate-300 p-2">{teste.resistenciaUrdume}</td>
                <td className="border border-slate-300 p-2">{teste.resistenciaReforco}</td>
                <td className="border border-slate-300 p-2">{teste.responsavel_analise}</td>
                <td className="border border-slate-300 p-2">{teste.responsavel_teste}</td>

                <td className="border border-slate-300 p-2">
                  {teste.sincronizado ? (
                    <span className="inline-flex items-center gap-2 font-medium text-green-600">
                      <Check size={25} />
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 font-medium text-amber-600">
                      <HardDrive size={25} />
                    </span>
                  )}
                </td>

                <div className="flex justify-center items-center gap-2 m-2">
                  <button
                    className="rounded-md bg-orange-400 p-2 text-white hover:bg-orange-500"
                    title="Editar"
                    onClick={() => editarTeste(teste)}>

                    <Pencil size={16} />
                  </button>

                  <button
                    className="rounded-md bg-red-600 p-2 text-white hover:bg-red-700"
                    title="Excluir"
                    onClick={() => solicitarExclusao(teste, index + 1)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {testes.length === 0 && (<p className="mt-4 text-slate-500">Nenhum teste lançado ainda.</p>)}

      <div className="flex justify-center md:justify-end items-center gap-4">

        <div className="flex">
          <button
            onClick={sincronizarBanco}
            disabled={statusSync === "loading"}
            className="w-12 h-8 btn btn-green">

            <div className="flex h-full items-center justify-center">
              <span
                className={`absolute flex items-center gap-2 transition-all duration-300 ${statusSync === "idle"
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95"}`}>
                <Database size={18} />
              </span>

              <span
                className={`absolute flex items-center gap-2 transition-all duration-300 ${statusSync === "loading"
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95"}`}>
                <Loader2 className="animate-spin" size={18} />
              </span>

              <span
                className={`absolute flex items-center gap-2 transition-all duration-300 ${statusSync === "success"
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95"}`}>
                <Check size={18} />
              </span>
            </div>

          </button>
        </div>

        <button
          onClick={() => exportarCSV(testesFiltrados)}
          className="btn btn-blue">
          <FaFileCsv size={18} />
        </button>

        <button
          onClick={() => exportarPDF(testesFiltrados)}
          className="btn btn-red">
          <FaFilePdf size={18} />
        </button>
      </div>
    </div>
  );
}