import type { FormTesteTecido, TipoTecido } from "../types/teste";
import { artigosPorTipo } from "../data/artigos";
import { teares } from "../data/teares";
import { gerarLotePorData } from "../utils/gerarLote";
import Select from "react-select";

type Props = {
  form: FormTesteTecido;
  setForm: React.Dispatch<React.SetStateAction<FormTesteTecido>>;
  salvarTeste: (event: React.FormEvent<HTMLFormElement>) => void;
  testeEditandoId: number | null;
};

export function FormularioTeste({
  form,
  setForm,
  salvarTeste,
  testeEditandoId,
}: Props) {

  function atualizarCampo(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
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

  const opcoesTurma = [
    { value: "A", label: "Turma A" },
    { value: "B", label: "Turma B" },
  ];

  const opcoesTipoTecido = [
    { value: "leve", label: "Tecido leve" },
    { value: "pesado", label: "Tecido pesado" },
  ];

  const opcoesArtigo = form.tipoTecido
    ? artigosPorTipo[form.tipoTecido as TipoTecido].map((artigo) => ({
      value: artigo.codigo,
      label: artigo.nome,
    }))
    : [];

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
      className="mb-8 rounded-xl bg-white p-6 shadow">

      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h2 className="mb-6 text-3xl font-semibold tracking-tight text-slate-900">Novo lançamento</h2>

        <div className="md:flex md:items-center gap-4 grid grid-cols-1">

          <Select
            options={opcoesTurma}
            styles={selectStyles}
            isSearchable={false}
            placeholder="Turma"
            value={opcoesTurma.find((opcao) => opcao.value === form.turma) || null}
            onChange={(opcao) =>
              setForm((prev) => ({
                ...prev,
                turma: opcao?.value || "",
              }))
            }
          />

          <input
            type="date"
            name="data"
            value={form.data}
            onChange={(event) => {
              const data = event.target.value;

              const ano = data.split("-")[0];

              if (ano.length > 4) return;

              setForm((prev) => ({
                ...prev,
                data,
                lote: gerarLotePorData(data),
              }));
            }}
            className="input"
            required
          />

          <div className="input rounded-lg border border-slate-300 bg-slate-50 min-w-44 px-4 py-2 text-left">
            <span className="block text-xs font-medium text-slate-500 select-none">Lote</span>

            <strong className="block text-lg text-slate-800">
              {form.lote || ""}
            </strong>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">

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

        <Select
          options={opcoesTipoTecido}
          styles={selectStyles}
          isSearchable={false}
          placeholder="Tipo de tecido"
          value={
            opcoesTipoTecido.find((opcao) => opcao.value === form.tipoTecido) || null
          }
          onChange={(opcao) =>
            setForm((prev) => ({
              ...prev,
              tipoTecido: (opcao?.value || "") as "" | TipoTecido,
              artigo: "",
            }))
          }
        />

        <Select
          options={opcoesArtigo}
          styles={selectStyles}
          isSearchable={false}
          placeholder="Artigo"
          isDisabled={!form.tipoTecido}
          value={opcoesArtigo.find((opcao) => opcao.value === form.artigo) || null}
          onChange={(opcao) =>
            setForm((prev) => ({
              ...prev,
              artigo: opcao?.value || "",
            }))
          }
        />

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

        <div>
          <input
            className="input w-full"
            type="number"
            min="0"
            step="0.01"
            name="batidaTrama"
            placeholder="Batida de Trama"
            value={form.batidaTrama}
            onChange={atualizarCampo}
          />
        </div>

        <div>
          <input
            className="input w-full"
            type="number"
            min="0"
            step="0.01"
            name="batidaUrdume"
            placeholder="Batida de Urdume"
            value={form.batidaUrdume}
            onChange={atualizarCampo}
          />
        </div>

        <input
          className="input"
          type="number"
          min="0"
          step="0.01"
          name="resistenciaTrama"
          placeholder="Resistência da trama"
          value={form.resistenciaTrama}
          onChange={atualizarCampo}
        />

        <input
          className="input"
          type="number"
          min="0"
          step="0.01"
          name="resistenciaUrdume"
          placeholder="Resistência do urdume"
          value={form.resistenciaUrdume}
          onChange={atualizarCampo}
        />

        <input
          className="input"
          type="number"
          min="0"
          step="0.01"
          name="resistenciaReforco"
          placeholder="Resistência do reforço"
          value={form.resistenciaReforco}
          onChange={atualizarCampo}
        />

        <input
          className="input"
          name="controlista"
          placeholder="Controlista"
          value={form.controlista}
          onChange={atualizarCampo}
        />

        <textarea
          className="input resize-none"
          name="observacoes"
          placeholder="Observações"
          value={form.observacoes}
          onChange={atualizarCampo} />

        <div className="flex w-full justify-center items-center rounded-lg overflow-x-hidden">
          <button className="bg-blue-700 min-h-16 min-w-60 font-medium text-white hover:bg-blue-800">
            {testeEditandoId ? "Salvar alterações" : "Salvar teste"}
          </button>
        </div>
      </div>
    </form>
  );
}