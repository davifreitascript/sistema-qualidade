import type { FormTesteTecido, TipoTecido } from "../types/teste";
import { useEffect } from "react";
import { artigosPorTipo } from "../data/artigos";
import { teares } from "../data/teares";
import { gerarLotePorData } from "../utils/gerarLote";
import Select from "react-select";
import { obterDataAtual } from "../utils/formatarData"


type Props = {
  form: FormTesteTecido;
  setForm: React.Dispatch<React.SetStateAction<FormTesteTecido>>;
  salvarTeste: (event: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
  testeEditandoId: number | null;
  salvando: boolean;
};

export function FormularioTeste({
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
            options={opcoesTear}
            styles={selectStyles}
            isSearchable={false}
            placeholder="Tear"
            required
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
          <Select
            options={opcoesTipoTecido}
            styles={selectStyles}
            isSearchable={false}
            placeholder="Tipo de tecido"
            required
            value={opcoesTipoTecido.find((opcao) => opcao.value === form.tipoTecido) || null}
            onChange={(opcao) =>
              setForm((prev) => ({
                ...prev,
                tipoTecido: (opcao?.value || "") as "" | TipoTecido,
                artigo: "",
              }))
            }
          />
        </div>

        <div>
          <Select
            options={opcoesArtigo}
            styles={selectStyles}
            isSearchable={false}
            placeholder="Artigo"
            required
            isDisabled={!form.tipoTecido}
            value={opcoesArtigo.find((opcao) => opcao.value === form.artigo) || null}
            onChange={(opcao) =>
              setForm((prev) => ({
                ...prev,
                artigo: opcao?.value || "",
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
            required
            onChange={atualizarCampo}
          />
        </div>

        <div>
          <input
            className="input"
            type="number"
            min="0"
            step="0.01"
            name="batidaTrama"
            placeholder="Batida de Trama"
            value={form.batidaTrama}
            onChange={atualizarCampo}
            required
          />
        </div>

        <div>
          <input
            className="input"
            type="number"
            min="0"
            step="0.01"
            name="batidaUrdume"
            placeholder="Batida de Urdume"
            value={form.batidaUrdume}
            onChange={atualizarCampo}
            required
          />
        </div>

        <div>
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
        </div>

        <div>
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
        </div>

        <div>
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
        </div>

        <div className="md:col-span-2">
          <input
            className="input col-span-2"
            name="controlista"
            placeholder="Controlista"
            value={form.controlista}
            onChange={atualizarCampo}
          />
        </div>

        <div className="flex justify-center items-center rounded-lg md:col-start-4">
          <button
            type="submit"
            disabled={salvando}
            className="w-full h-full rounded-lg text-white font-semibold cursor-pointer btn-blue">
            {salvando ? "Salvando..." : testeEditandoId ? "Salvar alterações" : "Salvar teste"}
          </button>
        </div>
      </div>
    </form>
  );
}