import type { FormTesteFio } from "../types/fio";
import type { TipoFio } from "../data/fios"
import { useEffect } from "react";
import { extrusoras } from "../data/extrusoras";
import { gerarLotePorData } from "../utils/gerarLote";
import { obterDataAtual } from "../utils/formatarData"
import { fiosPorTipo } from "../data/fios";
import Select from "react-select";

type Props = {
  form: FormTesteFio;
  setForm: React.Dispatch<React.SetStateAction<FormTesteFio>>;
  salvarTeste: (event: React.SyntheticEvent<HTMLFormElement>) => void | Promise<void>;
  testeEditandoId: number | null;
  salvando: boolean;
};

export function FormularioTesteFio({
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

  const opcoesTurma = [
    { value: "A", label: "Turma A" },
    { value: "B", label: "Turma B" },
    { value: "C", label: "Turma C" },
    { value: "D", label: "Turma D" },
  ];

  const opcoesExtrusora = extrusoras.map((item) => ({
    value: item,
    label: item,
  }));

  const opcoesTipoFio = Object.keys(fiosPorTipo).map((item) => ({
    value: item as TipoFio,
    label: item,
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

  const opcoesFio =
    form.tipoFio && fiosPorTipo[form.tipoFio]
      ? fiosPorTipo[form.tipoFio].map((item) => ({
        value: item,
        label: item,
      }))
      : [];

  return (
    <form
      onSubmit={salvarTeste}
      className="md:mt-15 rounded-xl bg-white p-6 shadow">

      <div className="md:mb-20 mb-4 flex gap-4 md:flex-row justify-between flex-col-reverse w-full">

        <div className="md:flex gap-4 grid grid-cols-1">
          <Select
            className="min-w-35"
            options={opcoesTurma}
            styles={selectStyles}
            isSearchable={false}
            placeholder="Turma"
            required
            value={opcoesTurma.find((opcao) => opcao.value === form.turma) || null}
            onChange={(opcao) =>
              setForm((prev) => ({
                ...prev,
                turma: opcao?.value || "",
              }))
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">

        <div>
          <Select
            options={opcoesExtrusora}
            styles={selectStyles}
            isSearchable={false}
            placeholder="Extrusora"
            value={opcoesExtrusora.find((opcao) => opcao.value === form.extrusora) || null}
            onChange={(opcao) =>
              setForm((prev) => ({
                ...prev,
                extrusora: opcao?.value || "",
              }))
            }
          />
        </div>

        <div>
          <Select
            options={opcoesTipoFio}
            styles={selectStyles}
            isSearchable={false}
            placeholder="Tipo de fio"
            value={
              opcoesTipoFio.find(
                (opcao) => opcao.value === form.tipoFio
              ) || null
            }
            onChange={(opcao) =>
              setForm((prev) => ({
                ...prev,
                tipoFio: (opcao?.value as TipoFio) || "",
                fio: "",
              }))
            }
          />
        </div>

        <div>
          <Select
            options={opcoesFio}
            styles={selectStyles}
            isSearchable={false}
            placeholder="Título DNE"
            value={
              opcoesFio.find(
                (opcao) => opcao.value === form.fio
              ) || null
            }
            onChange={(opcao) =>
              setForm((prev) => ({
                ...prev,
                fio: opcao?.value || "",
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
            type="number"
            min="0"
            step="0.01"
            name="resistenciaFio"
            placeholder="Resistência do fio"
            value={form.resistenciaFio}
            onChange={atualizarCampo}
          />
        </div>

        <div>
          <input
            className="input"
            type="number"
            min="0"
            step="0.01"
            name="tenacidadeFio"
            placeholder="Tenacidade"
            value={form.tenacidadeFio}
            onChange={atualizarCampo}
          />
        </div>

        <div>
          <input
            className="input"
            type="number"
            min="0"
            step="0.01"
            name="alongamentoFio"
            placeholder="Alongamento"
            value={form.alongamentoFio}
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