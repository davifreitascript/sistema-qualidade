import type { TesteFio } from "../types/fio";
import { formatarData } from "../utils/formatarData"
import { Check, HardDrive, Pencil, Trash2 } from "lucide-react"
import { exportarCSVFio } from "../utils/exportarCSVFio";
import { exportarPDFFio } from "../utils/exportarPDFFio";
import { FaFileCsv, FaFilePdf } from "react-icons/fa";
import Select from "react-select";

type Props = {
  testes: TesteFio[];
  testesFiltrados: TesteFio[];
  filtroLote: string;
  setFiltroLote: React.Dispatch<React.SetStateAction<string>>;
  ordemAdicao: "recente" | "antigo";
  setOrdemAdicao: React.Dispatch<React.SetStateAction<"recente" | "antigo">>;
};

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

export function TabelaFios({
  testes,
  testesFiltrados,
  filtroLote,
  ordemAdicao,
  setOrdemAdicao,
  setFiltroLote,
}: Props) {

  return (
    <div className="flex flex-col gap-6 p-6 md:min-h-90 md:max-h-130 min-h-90 max-h-screen rounded-xl bg-white shadow">

      <div className="flex flex-col justify-between gap-3 md:flex-row">
        <h1 className="mb-4 md:text-left text-center text-3xl md:text-4xl font-semibold">Fios lançados</h1>

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

      <div className="relative z-10 max-h-105 overflow-auto rounded-lg  border-slate-300">
        <table className="min-w-375 w-full border-separate border-spacing-0 text-center align-middle">

          <thead className="sticky top-0 z-50 shadow-sm bg-slate-300 border-slate-300">
            <tr>
              <th className="text-lg headTable px-8 py-8 whitespace-nowrap">N°</th>
              <th className="text-lg headTable px-8 py-8 whitespace-nowrap">Data</th>
              <th className="text-lg headTable px-8 py-8 whitespace-nowrap">Lote</th>
              <th className="text-lg headTable px-8 py-8 whitespace-nowrap">Turma</th>
              <th className="text-lg headTable px-8 py-8 whitespace-nowrap">Extrusora</th>
              <th className="text-lg headTable px-8 py-8 whitespace-nowrap">Tipo</th>
              <th className="text-lg headTable px-8 py-8 whitespace-nowrap">Gramatura</th>
              <th className="text-lg headTable px-8 py-8 whitespace-nowrap">Resistência</th>
              <th className="text-lg headTable px-8 py-8 whitespace-nowrap">Tenacidade</th>
              <th className="text-lg headTable px-8 py-8 whitespace-nowrap">Alongamento</th>
              <th className="text-lg headTable px-8 py-8 whitespace-nowrap">Responsável</th>
              <th className="text-lg headTable px-8 py-8 whitespace-nowrap">Status</th>
              <th className="text-lg headTable px-8 py-8 whitespace-nowrap">Ações</th>
            </tr>
          </thead>

          <tbody>

            {testes.length === 0 ? (
              <tr>
                <td
                  colSpan={13}
                  className="py-10 text-center text-slate-500">Nenhum teste cadastrado.</td>
              </tr>
            ) : (

              testes.map((teste, index) => (
                <tr
                  key={teste.uuid}>

                  <td className="bodyTable border-l-blue-300 font-bold">{index + 1}</td>
                  <td className="bodyTable">{formatarData(teste.data)}</td>
                  <td className="bodyTable">{teste.lote}</td>
                  <td className="bodyTable">{teste.turma}</td>
                  <td className="bodyTable">{teste.extrusora}</td>
                  <td className="bodyTable">{teste.tipoFio}</td>
                  <td className="bodyTable">{teste.gramatura}</td>
                  <td className="bodyTable">{teste.resistenciaFio}</td>
                  <td className="bodyTable">{teste.tenacidadeFio}</td>
                  <td className="bodyTable">{teste.alongamentoFio}</td>
                  <td className="bodyTable border-r-blue-300">{teste.responsavel_teste}</td>

                  <td>
                    <div className="flex justify-center">
                      {teste.sincronizado ? (
                        <Check
                          className="text-green-600"
                          size={25}
                        />
                      ) : (
                        <HardDrive
                          className="text-orange-500"
                          size={25}
                        />
                      )}
                    </div>
                  </td>

                  <td className="p-2">
                    <div className="flex justify-center gap-2">

                      <button
                        className="rounded-md bg-blue-600 p-2 text-white hover:bg-red-700"
                        title="Editar">
                        <Pencil size={16} />
                      </button>

                      <button
                        className="rounded-md bg-red-600 p-2 text-white hover:bg-red-700"
                        title="Excluir">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

      </div>

      <div className="flex justify-center md:justify-end items-center gap-4">

        <button
          onClick={() => exportarCSVFio(testesFiltrados)}
          className="btn btn-blue">
          <FaFileCsv size={18} />
        </button>

        <button
          onClick={() => exportarPDFFio(testesFiltrados)}
          className="btn btn-red">
          <FaFilePdf size={18} />
        </button>
      </div>

      {testes.length === 0 && (<p className="mt-4 text-slate-500">Nenhum teste lançado ainda.</p>)}

    </div>
  );
}