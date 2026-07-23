import type { FormTesteFio } from "../types/fio";
import { useState, useEffect } from "react";
import { formInicialFio } from "../types/fio";
import { FormularioTesteFio } from "../components/FormularioFio";
import { salvarTesteFioLocal } from "../services/fios";
import { obterDataAtual } from "../utils/formatarData";
import { gerarLotePorData } from "../utils/gerarLote";
import { CHAVE_FORMULARIO_FIO } from "../config/auth";
import toast from "react-hot-toast";

export default function Home() {

    const [form, setForm] = useState<FormTesteFio>(() => {
        const hoje = obterDataAtual();

        const salvo = sessionStorage.getItem(CHAVE_FORMULARIO_FIO);

        if (salvo) {
            const formulario: FormTesteFio = JSON.parse(salvo);

            if (formulario.data !== hoje) {
                return {
                    ...formulario,
                    data: hoje,
                    lote: gerarLotePorData(hoje),
                };
            }

            return formulario;
        }

        return {
            ...formInicialFio,
            data: hoje,
            lote: gerarLotePorData(hoje),
        };
    });

    useEffect(() => {
        sessionStorage.setItem(CHAVE_FORMULARIO_FIO, JSON.stringify(form));
    }, [form]);

    const [salvando, setSalvando] = useState(false);


    async function salvarTeste(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();

        const obrigatorios = [
            "turma",
            "gramatura",
            "responsavel_teste"
        ];

        const invalidos = obrigatorios.filter(
            (campo) => !form[campo as keyof FormTesteFio]
        );

        if (invalidos.length > 0) {
            toast.error("Preencha os campos obrigatórios.");
            return;
        }

        setSalvando(true);

        try {
            salvarTesteFioLocal(form);

            toast.success("Teste salvo localmente.");

            setForm((prev) => ({
                ...formInicialFio,
                turma: prev.turma,
                data: prev.data,
                lote: prev.lote,
            }));

        } catch {
            toast.error("Não foi possível salvar o teste.");
        } finally {
            setSalvando(false);
        }
    }

    return (
        <div className="flex flex-col justify-center items-center pt-6 bg-slate-100">

            <div className="mx-auto w-full max-w-5xl">
                <h1 className="my-8 text-center text-3xl font-bold text-slate-800 md:text-5xl select-none">Lançamento de fios</h1>

                <FormularioTesteFio
                    form={form}
                    setForm={setForm}
                    salvarTeste={salvarTeste}
                    testeEditandoId={null}
                    salvando={salvando}
                />
            </div>
        </div>
    );
}