/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FormTesteAlcas } from "../types/alcas";
import { useEffect } from "react";
import { tiposAlcas } from "../data/tiposAlcas";
import { gerarLotePorData } from "../utils/gerarLote";
import { obterDataAtual } from "../utils/formatarData"
import { SelecaoTeares } from "./SelecaoTearesAlcas";
import { navegarComSetas } from "../utils/navegarComSetas";
import Select from "react-select";

type Props = {
  form: FormTesteAlcas;
  setForm: React.Dispatch<React.SetStateAction<FormTesteAlcas>>;
  salvarTeste: (event: React.SyntheticEvent<HTMLFormElement>) => void | Promise<void>;
  testeEditandoId: number | null;
  salvando: boolean;
};

export function FormularioAlcas({
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

  const opcoesArtigos = tiposAlcas.map((artigo) => ({
    value: artigo,
    label: artigo,
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
      onKeyDown={navegarComSetas}
      onSubmit={salvarTeste}
      className="md:mt-15 rounded-xl bg-white p-6 shadow">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="flex flex-col gap-4">

          <div>
            <Select
              options={opcoesArtigos}
              styles={selectStyles}
              isSearchable={false}
              placeholder="Artigo"
              value={opcoesArtigos.find(opcao => opcao.value === form.artigo) ?? null}
              onChange={(opcao) =>
                setForm((prev) => ({
                  ...prev,
                  artigo: opcao?.value ?? "",
                }))
              }
            />
          </div>

          <div>
            <input
              className="input"
              type="text"
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
              className="input"
              type="number"
              min="0"
              step="0.01"
              name="gramatura"
              placeholder="Média gramatura"
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
              name="mediaResistencia"
              placeholder="Média resistência"
              value={form.mediaResistencia}
              onChange={atualizarCampo}
            />
          </div>

          <div>
            <input
              className="input"
              name="responsavelTeste"
              placeholder="Controlista"
              value={form.responsavelTeste}
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

        <div className="md:col-span-1 space-y-4 rounded-lg">
          <SelecaoTeares
            value={form.tear}
            onChange={(tear) =>
              setForm({
                ...form,
                tear,
              })
            }
          />
        </div>

      </div>
    </form>
  );
}