/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TesteTecido } from "../types/tecidos";
import { formatarData } from "../utils/formatarData";
import { exportarCSV } from "../utils/exportarCSV";
import { exportarPDF } from "../utils/exportarPDF";
import { Loader2, Check, Database, HardDrive, Trash2 } from "lucide-react";
import { FaFileCsv, FaFilePdf } from "react-icons/fa";
import Select from "react-select";
import toast from "react-hot-toast";

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
  // editarTeste,
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

  async function copiarLinha(teste: TesteTecido) {
    const texto = `
      Data: ${formatarData(teste.data)}
      Lote: ${teste.lote}
      Tear: ${teste.tear}
      Turma: ${teste.turma}
      Artigo: ${teste.artigo}
      Gramatura: ${teste.gramatura}
      BatidaTrama: ${teste.batidaTrama}
      BatidaUrdume: ${teste.batidaUrdume}
      ResistenciaTrama: ${teste.resistenciaTrama}
      ResistenciaUrdume: ${teste.resistenciaUrdume}
      ResistenciaUrdume: ${teste.resistenciaReforco}
      ResponsavelAnalise: ${teste.responsavel_analise}
      ResponsavelTeste: ${teste.responsavel_teste}
    `.trim();

    await navigator.clipboard.writeText(texto);

    toast.success("Dados copiados para a área de transferência.");
  }

  return (
    <div className="flex flex-col justify-center gap-6 p-4 min-h-90 max-h-full rounded-xl bg-white shadow">

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <h1 className="md:text-left text-center text-3xl md:text-4xl font-semibold">Tecidos lançados</h1>

        <div className="z-30 flex gap-4 justify-center items-center">
          <input
            type="text"
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

      <div className="relative z-10 max-h-100 overflow-auto rounded-lg border border-slate-300">
        <table className="min-w-375 w-full border-collapse text-center align-middle">
          <thead className="sticky top-0 z-10">
            <tr className="bg-slate-300">
              <th className="headTable">N°</th>
              <th className="headTable">DATA</th>
              <th className="headTable">LOTE</th>
              <th className="headTable">TEAR</th>
              <th className="headTable">TURMA</th>
              <th className="headTable">ARTIGO</th>
              <th className="headTable">GRAMATURA</th>
              <th className="headTable">BATIDA TRAMA</th>
              <th className="headTable">BATIDA URDUME</th>
              <th className="headTable">RESISTÊNCIA TRAMA</th>
              <th className="headTable">RESISTÊNCIA URDUME</th>
              <th className="headTable">RESISTÊNCIA REFORÇO</th>
              <th className="headTable">RESPONSÁVEL ANÁLISE</th>
              <th className="headTable">RESPONSÁVEL TESTE</th>
              <th className="headTable">STATUS</th>
              <th className="headTable" colSpan={2}>AÇÕES</th>
            </tr>
          </thead>

          <tbody>
            {testesFiltrados.map((teste, index) => (
              <tr key={teste.uuid}  onClick={() => copiarLinha(teste)} className="transition-colors duration-50 hover:bg-blue-50 cursor-default">
                <td className="bodyTable font-bold">{index + 1}</td>
                <td className="bodyTable">{formatarData(teste.data)}</td>
                <td className="bodyTable">{teste.lote}</td>
                <td className="bodyTable">{teste.tear}</td>
                <td className="bodyTable">{teste.turma}</td>
                <td className="bodyTable">{teste.artigo}</td>
                <td className="bodyTable">{teste.gramatura}</td>
                <td className="bodyTable">{teste.batidaTrama}</td>
                <td className="bodyTable">{teste.batidaUrdume}</td>
                <td className="bodyTable">{teste.resistenciaTrama}</td>
                <td className="bodyTable">{teste.resistenciaUrdume}</td>
                <td className="bodyTable">{teste.resistenciaReforco}</td>
                <td className="bodyTable">{teste.responsavel_analise}</td>
                <td className="bodyTable">{teste.responsavel_teste}</td>

                <td className="bodyTable">
                  {teste.sincronizado ? (
                    <span className="inline-flex items-center gap-2 font-medium text-green-700">
                      <Check size={25} />
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 font-medium text-blue-600">
                      <HardDrive size={25} />
                    </span>
                  )}
                </td>

                <td>
                  <div className="bodyTable flex gap-4">
                    {/* <button
                      className="rounded-md bg-orange-400 p-2 text-white hover:bg-orange-500"
                      title="Editar"
                      onClick={() => editarTeste(teste)}>

                      <Pencil size={16} />
                    </button> */}

                    <button
                      className="rounded-md bg-red-600 p-2 text-white hover:bg-red-700"
                      onClick={() => solicitarExclusao(teste, index + 1)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
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