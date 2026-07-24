import type { FormTesteCadarcos } from "../types/cadarcos";
import { useEffect } from "react";
// import { artigosPorTipo } from "../data/artigos";
import { teares } from "../data/teares";
import { gerarLotePorData } from "../utils/gerarLote";
import Select from "react-select";
import { obterDataAtual } from "../utils/formatarData"

type Props = {
  form: FormTesteCadarcos;
  setForm: React.Dispatch<React.SetStateAction<FormTesteCadarcos>>;
  salvarTeste: (event: React.SyntheticEvent<HTMLFormElement>) => void | Promise<void>;
  testeEditandoId: number | null;
  salvando: boolean;
};

export function FormularioCadarcos({
  form,
  setForm,
  salvarTeste,
  testeEditandoId,
  salvando,
}: Props) {

  useEffect(() => {
    if (!form.data) {
      const data = obterDataAtual();

      setForm((prev) => ({
        ...prev,
        data,
        lote: gerarLotePorData(data),
      }));
    }
  }, [form.data, setForm]);

  function atualizarCampo(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const opcoesTear = teares.map((tear) => ({
    value: tear,
    label: tear,
  }));

  const selectStyles = {
    control: (base: any) => ({
      ...base,
      minHeight: "52px",
      borderRadius: "0.5rem",
      borderColor: "#cbd5e1",
      boxShadow: "none",
    }),
    menu: (base: any) => ({
      ...base,
      borderRadius: "0.75rem",
      overflow: "hidden",
    }),
  };

  return (
    <form
      onSubmit={salvarTeste}
      className="md:mt-15 rounded-xl bg-white p-6 shadow">

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">

        <div>
          <Select
            options={opcoesTear}
            styles={selectStyles}
            isSearchable={false}
            placeholder="Tear"
            value={opcoesTear.find((opcao) => opcao.value === form.tear) || null}
            onChange={(opcao) =>
              setForm((prev) => ({
                ...prev,
                tear: opcao?.value || "",
              }))
            }
          />
        </div>

        <div>
          <input
            className="input"
            type="number"
            min="0"
            step="0.01"
            name="gramatura"
            placeholder="Gramatura"
            value={form.gramatura}
            onChange={atualizarCampo}
          />
        </div>

        <div>
          <input
            className="input"
            name="responsavel_analise"
            placeholder="Resp. análise"
            value={form.responsavel_analise}
            onChange={atualizarCampo}
          />
        </div>

        <div>
          <input
            className="input"
            name="responsavel_teste"
            placeholder="Resp. teste"
            value={form.responsavel_teste}
            onChange={atualizarCampo}
          />
        </div>

        <div className="flex justify-center items-center rounded-lg md:col-start-4">
          <button
            type="submit"
            disabled={salvando}
            className="btn-blue w-full h-full py-2 rounded-md font-semibold text-white cursor-pointer">
            {salvando ? "Salvando..." : testeEditandoId ? "Salvar alterações" : "Salvar teste"}
          </button>
        </div>
      </div>
    </form>
  );
}