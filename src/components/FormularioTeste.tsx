import type { FormTesteTecido, TipoTecido } from "../types/teste";
import { artigosPorTipo } from "../data/artigos";
import { teares } from "../data/teares";
/* import { avaliarBatida } from "../utils/avaliarBatida"; */
import { gerarLotePorData } from "../utils/gerarLote";

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

  return (
    <form
      onSubmit={salvarTeste}
      className="mb-8 rounded-xl bg-white p-6 shadow"
    >
      <h2 className="mb-4 text-xl font-semibold">Novo lançamento</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">

        <input
          type="date"
          name="data"
          value={form.data}
          onChange={(event) => {
            const data = event.target.value;

            setForm((prev) => ({
              ...prev,
              data,
              lote: gerarLotePorData(data),
            }));
          }}
          className="input"
          required
        />

        <input
          className="input"
          name="lote"
          placeholder="Lote"
          value={form.lote}
          onChange={atualizarCampo}
          readOnly
          required
        />

        <select
          className="input"
          name="tear"
          value={form.tear}
          onChange={atualizarCampo}
          required
        >
          <option value="" disabled hidden>
            Tear
          </option>

          {teares.map((tear) => (
            <option key={tear} value={tear}>
              {tear}
            </option>
          ))}
        </select>

        <select
          className="input"
          name="turma"
          value={form.turma}
          onChange={atualizarCampo}
          required
        >
          <option value="" disabled hidden>
            Turma
          </option>

          <option value="A">Turma A</option>
          <option value="B">Turma B</option>
        </select>

        <select
          className="input"
          name="tipoTecido"
          value={form.tipoTecido}
          onChange={(event) =>
            setForm((prev) => ({
              ...prev,
              tipoTecido: event.target.value as TipoTecido,
              artigo: "",
            }))
          }
          required
        >
          <option value="" disabled hidden>
            Tipo de tecido
          </option>

          <option value="leve">Tecido leve</option>
          <option value="pesado">Tecido pesado</option>
        </select>

        <select
          className="input"
          name="artigo"
          value={form.artigo}
          onChange={atualizarCampo}
          disabled={!form.tipoTecido}
          required
        >
          <option value="" disabled hidden>
            Artigo
          </option>

          {form.tipoTecido &&
            artigosPorTipo[form.tipoTecido as TipoTecido].map((artigo) => (
              <option key={artigo.codigo} value={artigo.codigo}>
                {artigo.nome}
              </option>
            ))}
        </select>

        <input
          className="input"
          name="gramatura"
          placeholder="Gramatura"
          value={form.gramatura}
          onChange={atualizarCampo}
        />

        <div>
          <input
            className="input w-full"
            name="batidaTrama"
            placeholder="BT Trama"
            value={form.batidaTrama}
            onChange={atualizarCampo}
          />
        </div>

        <div>
          <input
            className="input w-full"
            name="batidaUrdume"
            placeholder="BT Urdume"
            value={form.batidaUrdume}
            onChange={atualizarCampo}
          />
        </div>

        <input
          className="input"
          type="number"
          step="0.01"
          name="resistenciaTrama"
          placeholder="Resistência da trama"
          value={form.resistenciaTrama}
          onChange={atualizarCampo}
        />

        <input
          className="input"
          type="number"
          step="0.01"
          name="resistenciaUrdume"
          placeholder="Resistência do urdume"
          value={form.resistenciaUrdume}
          onChange={atualizarCampo}
        />

        <input
          className="input"
          type="number"
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

      </div>

      <div className="my-4 flex flex-col justify-between gap-4 md:flex-row">
        <textarea
          className="input  resize-none md:flex-1 col-span-3"
          name="observacoes"
          placeholder="Observações"
          value={form.observacoes}
          onChange={atualizarCampo} />

        <button className="rounded-lg bg-blue-700 px-5 py-2 font-medium text-white hover:bg-blue-800">
          {testeEditandoId ? "Salvar alterações" : "Salvar teste"}
        </button>
      </div>
    </form>
  );
}