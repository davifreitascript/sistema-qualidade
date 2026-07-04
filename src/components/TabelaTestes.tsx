import type { TesteTecido } from "../types/teste";
import { formatarData } from "../utils/formatarData";
import { exportarCSV } from "../utils/exportarCSV";
import { exportarPDF } from "../utils/exportarPDF";
import Select from "react-select";

type Props = {
  testes: TesteTecido[];
  testesFiltrados: TesteTecido[];
  filtroLote: string;
  setFiltroLote: React.Dispatch<React.SetStateAction<string>>;
  ordemAdicao: "recente" | "antigo";
  setOrdemAdicao: React.Dispatch<React.SetStateAction<"recente" | "antigo">>;
  editarTeste: (teste: TesteTecido) => void;
  solicitarExclusao: (teste: TesteTecido) => void;
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
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 text-2xl font-semibold">Testes lançados</h2>

      <div className="flex flex-col justify-between gap-3 md:flex-row">
        <div className="relative z-30 flex gap-4 mb-4 items-center">
          <input
            className="input w-30"
            placeholder="Buscar lote..."
            value={filtroLote}
            onChange={(event) => setFiltroLote(event.target.value)}
          />

          <Select
            className=""
            styles={selectStyles}
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

        <div className="flex gap-2">
          <button
            onClick={() => exportarCSV(testesFiltrados)}
            className="mb-4 rounded-lg bg-blue-700 px-4 py-2 text-white hover:bg-blue-800"
          >
            CSV
          </button>

          <button
            onClick={() => exportarPDF(testesFiltrados)}
            className="mb-4 rounded-lg bg-red-700 px-4 py-2 text-white hover:bg-red-800"
          >
            PDF
          </button>
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
              <th className="px-8 py-8 whitespace-nowrap">Batida de Trama</th>
              <th className="px-8 py-8 whitespace-nowrap">Batida de Urdume</th>
              <th className="px-8 py-8 whitespace-nowrap">Res. Trama</th>
              <th className="px-8 py-8 whitespace-nowrap">Res. Urdume</th>
              <th className="px-8 py-8 whitespace-nowrap">Res. Reforço</th>
              <th className="px-8 py-8 whitespace-nowrap">Controlista</th>
              <th className="px-8 py-8 whitespace-nowrap">Observações</th>
              <th className="px-8 py-8" colSpan={2}>Ações</th>
            </tr>
          </thead>

          <tbody>
            {testesFiltrados.map((teste, index) => (
              <tr key={teste.id}>
                <td className="border border-slate-300 p-2">{index + 1}</td>
                <td className="border border-slate-300 p-2">{teste.lote}</td>
                <td className="border border-slate-300 p-2">
                  {formatarData(teste.data)}
                </td>
                <td className="border border-slate-300 p-2">{teste.tear}</td>
                <td className="border border-slate-300 p-2">{teste.turma}</td>
                <td className="border border-slate-300 p-2">{teste.artigo}</td>
                <td className="border border-slate-300 p-2">{teste.gramatura}</td>
                <td className="border border-slate-300 p-2">{teste.batidaTrama}</td>
                <td className="border border-slate-300 p-2">{teste.batidaUrdume}</td>
                <td className="border border-slate-300 p-2">
                  {teste.resistenciaTrama}
                </td>
                <td className="border border-slate-300 p-2">
                  {teste.resistenciaUrdume}
                </td>
                <td className="border border-slate-300 p-2">
                  {teste.resistenciaReforco}
                </td>
                <td className="border border-slate-300 p-2">
                  {teste.controlista}
                </td>
                <td className="border border-slate-300 p-2">
                  {teste.observacoes || "-"}
                </td>

                <td className="p-2">
                  <button
                    onClick={() => editarTeste(teste)}
                    className="rounded bg-amber-500 px-3 py-1 text-sm text-white hover:bg-amber-600">
                    Editar
                  </button>
                </td>

                <td className="p-2">
                  <button
                    onClick={() => solicitarExclusao(teste)}
                    className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700">
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {testes.length === 0 && (
        <p className="mt-4 text-slate-500">Nenhum teste lançado ainda.</p>
      )}
    </div>
  );
}