import type { TesteTecido } from "../types/teste";

type Props = {
  teste: TesteTecido;
  numero: number;
  cancelar: () => void;
  confirmar: () => void;
};

export function ModalExcluir({ teste, numero, cancelar, confirmar }: Props) {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-slate-800">Excluir lançamento?</h2>

        <p className="mt-2 text-slate-600">
          Tem certeza que deseja excluir o <strong>teste Nº {numero}</strong>?
        </p>

        <p className="mt-1 text-sm text-slate-500">
          Lote: <strong>{teste.lote}</strong>
        </p>

        <p className="mt-4 text-sm text-red-600">
          Essa ação não pode ser desfeita.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={cancelar}
            className="rounded-lg bg-slate-200 px-4 py-2 text-slate-700 hover:bg-slate-300">
            Cancelar
          </button>

          <button
            type="button"
            onClick={confirmar}
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700">
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}