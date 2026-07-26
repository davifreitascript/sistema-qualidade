import { supabase } from "../lib/supabase";
import type { FormTesteAlcas, TesteAlcas } from "../types/alcas";

type TesteBanco = {
    uuid: string;
    id: number;
    data: string;
    lote: string;
    artigo: string;
    tear: string[];
    batida_trama: number | null;
    gramatura: number | null;
    media_resistencia: number;
    media_tenacidade: number;
    responsavel_teste: string;
    observacoes: string | null;
};

function numeroOuNull(valor: string | number | null | undefined) {
    if (valor === "" || valor === null || valor === undefined) {
        return null;
    }

    const numero = Number(valor);

    return Number.isNaN(numero) ? null : numero;
}

function converterTesteDoBanco(teste: TesteBanco): TesteAlcas {
    return {
        uuid: teste.uuid,
        id: teste.id,
        data: teste.data,
        lote: teste.lote,
        tear: teste.tear,
        artigo: teste.artigo,
        gramatura: String(teste.gramatura ?? ""),
        batidaTrama: String(teste.batida_trama ?? ""),
        mediaResistencia: String(teste.media_resistencia ?? ""),
        mediaTenacidade: String(teste.media_tenacidade ?? ""),
        responsavelTeste: teste.responsavel_teste,
        sincronizado: true,
    };
}

export async function criarTeste(teste: TesteAlcas): Promise<TesteAlcas> {
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
            artigo: teste.artigo,
            tear: teste.tear,
            batida_trama: numeroOuNull(teste.batidaTrama),
            gramatura: numeroOuNull(teste.gramatura),
            resistencia: teste.mediaResistencia,
            tenacidade: teste.mediaTenacidade,
            responsavel_teste: teste.responsavelTeste,
        })
        .select()
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return converterTesteDoBanco(data as TesteBanco);
}

export async function sincronizarTestes(testes: TesteAlcas[]): Promise<number[]> {

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
                artigo: teste.artigo,
                gramatura: numeroOuNull(teste.gramatura),
                batida_trama: numeroOuNull(teste.batidaTrama),
                responsavel_teste: teste.responsavelTeste,
                criado_por: usuarioData.user.id,
            });

        if (error) {
            console.error("Erro ao inserir:", error);
        } else {
            enviados.push(teste.id);
        }
    }

    return enviados;
}

export async function buscarTestes(): Promise<TesteAlcas[]> {
    const { data, error } = await supabase
        .from("testes")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        throw new Error(error.message);
    }

    return (data as TesteBanco[]).map(converterTesteDoBanco);
}

export function salvarTesteLocal(form: FormTesteAlcas): TesteAlcas {

    const novoTeste: TesteAlcas = {
        id: Date.now(),
        uuid: crypto.randomUUID(),
        ...form,
        sincronizado: false,
    };

    const testesSalvos: TesteAlcas[] = JSON.parse(
        localStorage.getItem("testes-alca") || "[]"
    );

    testesSalvos.unshift(novoTeste);

    localStorage.setItem(
        "testes-alca",
        JSON.stringify(testesSalvos)
    );

    return novoTeste;
}

export function excluirTesteLocal(uuid: string) {
    const testes: TesteAlcas[] = JSON.parse(
        localStorage.getItem("testes-alcas") || "[]"
    );

    const novosTestes = testes.filter(
        (teste) => teste.uuid !== uuid
    );

    localStorage.setItem(
        "testes-alcas",
        JSON.stringify(novosTestes)
    );
}

export async function excluirTesteBanco(uuid: string) {
    const { error } = await supabase
        .from("testes")
        .delete()
        .eq("uuid", uuid);

    if (error) {
        throw new Error(error.message);
    }
}

export async function excluirTeste(
    uuid: string,
    sincronizado: boolean
) {
    if (sincronizado) {
        try {
            await excluirTesteBanco(uuid);
        } catch (error) {

        }
    }

    excluirTesteLocal(uuid);
}