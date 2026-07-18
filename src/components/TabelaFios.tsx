import type { TesteFio } from "../types/fio";
import { formatarData } from "../utils/formatarData"
import { Check, HardDrive, Pencil, Trash2 } from "lucide-react"

type Props = {
    testes: TesteFio[];
};

export function TabelaFios({ testes }: Props) {
    return (
    <div className="mx-auto w-full max-w-7xl rounded-xl bg-white p-1.5 md:p-6 shadow">

      <h1 className="m-8 text-center text-3xl md:text-4xl font-bold text-slate-800">
        Testes de Fios
      </h1>

      <div className="relative z-10 max-max-h-105 overflow-auto rounded-lg border border-slate-300 border-r-white">
        <table className="min-w-375 w-full border-collapse text-center align-middle">

          <thead className="bg-slate-300">
            <tr>
              <th className="text-lg border border-slate-300 px-8 py-8 whitespace-nowrap">N°</th>
              <th className="text-lg border border-slate-300 px-8 py-8 whitespace-nowrap">Data</th>
              <th className="text-lg border border-slate-300 px-8 py-8 whitespace-nowrap">Lote</th>
              <th className="text-lg border border-slate-300 px-8 py-8 whitespace-nowrap">Turma</th>
              <th className="text-lg border border-slate-300 px-8 py-8 whitespace-nowrap">Extrusora</th>
              <th className="text-lg border border-slate-300 px-8 py-8 whitespace-nowrap">Tipo</th>
              <th className="text-lg border border-slate-300 px-8 py-8 whitespace-nowrap">Gramatura</th>
              <th className="text-lg border border-slate-300 px-8 py-8 whitespace-nowrap">Resistência</th>
              <th className="text-lg border border-slate-300 px-8 py-8 whitespace-nowrap">Tenacidade</th>
              <th className="text-lg border border-slate-300 px-8 py-8 whitespace-nowrap">Alongamento</th>
              <th className="text-lg border border-slate-300 px-8 py-8 whitespace-nowrap">Responsável</th>
              <th className="text-lg border border-slate-300 px-8 py-8 whitespace-nowrap">Status</th>
              <th className="text-lg border border-slate-300 px-8 py-8 whitespace-nowrap">Ações</th>
            </tr>
          </thead>

          <tbody>

            {testes.length === 0 ? (
              <tr>
                <td
                  colSpan={13}
                  className="py-10 text-center text-slate-500"
                >
                  Nenhum teste cadastrado.
                </td>
              </tr>
            ) : (

              testes.map((teste, index) => (
                <tr
                  key={teste.uuid}
                  className="border-b hover:bg-slate-50"
                >
                  <td className="px-8 py-2 border border-l-blue-300 whitespace-nowrap bg-blue-300 font-bold">{index + 1}</td>

                  <td className="px-8 py-2 border whitespace-nowrap bg-blue-300 font-bold">
                    {formatarData(teste.data)}
                  </td>

                  <td className="px-8 py-2 border whitespace-nowrap bg-blue-300 font-bold">
                    {teste.lote}
                  </td>

                  <td className="px-8 py-2 border whitespace-nowrap bg-blue-300 font-bold">
                    {teste.turma}
                  </td>

                  <td className="px-8 py-2 border whitespace-nowrap bg-blue-300 font-bold">
                    {teste.extrusora}
                  </td>

                  <td className="px-8 py-2 border whitespace-nowrap bg-blue-300 font-bold">
                    {teste.tipoFio}
                  </td>

                  <td className="px-8 py-2 border  whitespace-nowrap bg-blue-300 font-bold">
                    {teste.gramatura}
                  </td>

                  <td className="px-8 py-2 border  whitespace-nowrap bg-blue-300 font-bold">
                    {teste.resistenciaFio}
                  </td>

                  <td className="px-8 py-2 border whitespace-nowrap bg-blue-300 font-bold">
                    {teste.tenacidadeFio}
                  </td>

                  <td className="px-8 py-2 border whitespace-nowrap bg-blue-300 font-bold">
                    {teste.alongamentoFio}
                  </td>

                  <td className="px-8 py-2 border whitespace-nowrap bg-blue-300 font-bold">
                    {teste.responsavel_teste}
                  </td>

                  <td className="border border-white">
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

                  <td className="border border-white p-2">
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

      {testes.length === 0 && (<p className="mt-4 text-slate-500">Nenhum teste lançado ainda.</p>)}

    </div>
  );
}