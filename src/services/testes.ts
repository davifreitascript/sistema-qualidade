import { supabase } from "../lib/supabase";
import type { FormTesteTecido, TesteTecido, TipoTecido } from "../types/teste";

type TesteBanco = {
    uuid: string;
    id: number;
    data: string;
    lote: string;
    tear: string;
    turma: string;
    artigo: string;
    tipo_tecido: TipoTecido | null;
    gramatura: number | null;
    batida_trama: number | null;
    batida_urdume: number | null;
    resistencia_trama: number | null;
    resistencia_urdume: number | null;
    resistencia_reforco: number | null;
    controlista: string;
    observacoes: string | null;
};

function numeroOuNull(valor: string | number | null | undefined) {
    if (valor === "" || valor === null || valor === undefined) {
        return null;
    }

    const numero = Number(valor);

    return Number.isNaN(numero) ? null : numero;
}

function converterTesteDoBanco(teste: TesteBanco): TesteTecido {
    return {
        uuid: teste.uuid,
        id: teste.id,
        data: teste.data,
        lote: teste.lote,
        tear: teste.tear,
        turma: teste.turma,
        artigo: teste.artigo,
        tipoTecido: teste.tipo_tecido ?? "",
        gramatura: String(teste.gramatura ?? ""),
        batidaTrama: String(teste.batida_trama ?? ""),
        batidaUrdume: String(teste.batida_urdume ?? ""),
        resistenciaTrama: String(teste.resistencia_trama ?? ""),
        resistenciaUrdume: String(teste.resistencia_urdume ?? ""),
        resistenciaReforco: String(teste.resistencia_reforco ?? ""),
        controlista: teste.controlista,
        sincronizado: true,
    };
}

export async function criarTeste(teste: TesteTecido): Promise<TesteTecido> {
    const { data: usuarioData, error: usuarioError } =
        await supabase.auth.getUser();

    if (usuarioError || !usuarioData.user) {
        throw new Error("Usuário não autenticado.");
    }

    const { data, error } = await supabase
        .from("testes")
        .insert({
            uuid: teste.uuid,
            data: teste.data,
            lote: teste.lote,
            tear: teste.tear,
            turma: teste.turma,
            artigo: teste.artigo,
            tipo_tecido: teste.tipoTecido,
            gramatura: numeroOuNull(teste.gramatura),
            batida_trama: numeroOuNull(teste.batidaTrama),
            batida_urdume: numeroOuNull(teste.batidaUrdume),
            resistencia_trama: numeroOuNull(teste.resistenciaTrama),
            resistencia_urdume: numeroOuNull(teste.resistenciaUrdume),
            resistencia_reforco: numeroOuNull(teste.resistenciaReforco),
            controlista: teste.controlista,
        })
        .select()
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return converterTesteDoBanco(data as TesteBanco);
}

export async function sincronizarTestes(testes: TesteTecido[]): Promise<number[]> {

    const enviados: number[] = [];

    const { data: usuarioData, error: usuarioError } =
        await supabase.auth.getUser();

    if (usuarioError || !usuarioData.user) {
        throw new Error("Usuário não autenticado.");
    }

    for (const teste of testes) {

        if (teste.sincronizado) continue;

        const { error } = await supabase
            .from("testes")
            .insert({
                uuid: teste.uuid,
                data: teste.data,
                lote: teste.lote,
                tear: teste.tear,
                turma: teste.turma,
                artigo: teste.artigo,
                tipo_tecido: teste.tipoTecido,
                gramatura: numeroOuNull(teste.gramatura),
                batida_trama: numeroOuNull(teste.batidaTrama),
                batida_urdume: numeroOuNull(teste.batidaUrdume),
                resistencia_trama: numeroOuNull(teste.resistenciaTrama),
                resistencia_urdume: numeroOuNull(teste.resistenciaUrdume),
                resistencia_reforco: numeroOuNull(teste.resistenciaReforco),
                controlista: teste.controlista,
                criado_por: usuarioData.user.id,
            });

        if (error) {
            console.error("Erro ao inserir:", error);
        } else {
            console.log("Inserido com sucesso:", teste.id);
            enviados.push(teste.id);
        }
    }

    return enviados;
}

export async function buscarTestes(): Promise<TesteTecido[]> {
    const { data, error } = await supabase
        .from("testes")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        throw new Error(error.message);
    }

    return (data as TesteBanco[]).map(converterTesteDoBanco);
}

export function salvarTesteLocal(
    form: FormTesteTecido
): TesteTecido {

    const novoTeste: TesteTecido = {
        id: Date.now(),
        uuid: crypto.randomUUID(),
        ...form,
        sincronizado: false,
    };

    const testesSalvos: TesteTecido[] = JSON.parse(
        localStorage.getItem("testes-tecido") || "[]"
    );

    testesSalvos.unshift(novoTeste);

    localStorage.setItem(
        "testes-tecido",
        JSON.stringify(testesSalvos)
    );

    return novoTeste;
}

export function excluirTesteLocal(uuid: string) {
    const testes: TesteTecido[] = JSON.parse(
        localStorage.getItem("testes-tecido") || "[]"
    );

    const novosTestes = testes.filter(
        (teste) => teste.uuid !== uuid
    );

    localStorage.setItem(
        "testes-tecido",
        JSON.stringify(novosTestes)
    );
}

export async function excluirTesteBanco(uuid: string) {

    const { data, error } = await supabase
        .from("testes")
        .delete()
        .eq("uuid", uuid)
        .select();

    if (error) {
        throw new Error(error.message);
    }

    if (!data || data.length === 0) {
        throw new Error("Teste não encontrado no banco.");
    }
}

export async function excluirTeste(uuid: string) {
    await excluirTesteBanco(uuid);
    excluirTesteLocal(uuid);
}