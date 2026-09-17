import type { FormTesteCadarcos, TesteCadarcos } from "../types/cadarcos";
import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";

type TesteBanco = { // informações enviadas para o banco de dados 
    uuid: string;
    id: number;
    data: string;
    lote: string;
    tear: string[];
    artigo: string;
    batidaTrama: string;
    gramatura: number | null;
    responsavelAnalise: string;
    responsavelTeste: string;
    observacoes: string | null;
};

function numeroOuNull(valor: string | number | null | undefined) { // verifica se valor é válido
    if (valor === "" || valor === null || valor === undefined) {
        return null;
    }

    const numero = Number(valor); // transforma valor em número

    return Number.isNaN(numero) ? null : numero; // se numero for NaN retorna null senao retorna valor
}

function converterTesteDoBanco(teste: TesteBanco): TesteCadarcos { // converte infos para banco de dados
    return {
        uuid: teste.uuid,
        id: teste.id,
        data: teste.data,
        lote: teste.lote,
        tear: teste.tear,
        artigo: teste.artigo,
        batidaTrama: teste.batidaTrama,
        gramatura: String(teste.gramatura ?? ""),
        responsavel_analise: teste.responsavelAnalise,
        responsavel_teste: teste.responsavelTeste,
        sincronizado: true,
    };
}

export async function criarTeste(teste: TesteCadarcos): Promise<TesteCadarcos> { // cadastra novo teste no banco de dados

    const { data: usuarioData, error: usuarioError } = await supabase.auth.getUser();

    if (usuarioError || !usuarioData.user) {
        throw new Error("Falha na operação ou usuário não autenticado."); // houve algum erro OU usuario nao autenticado...
    }

    const { data, error } = await supabase
        .from("testes") // indica a tabela de testes no supabase onde teste será inserido
        .insert({ // monta e manda os dados para o supabase
            uuid: teste.uuid,
            data: teste.data,
            lote: teste.lote,
            tear: teste.tear,
            artigo: teste.artigo,
            gramatura: numeroOuNull(teste.gramatura),
            responsavel_analise: teste.responsavel_analise,
            responsavel_teste: teste.responsavel_teste,
        })
        .select() // retorna registro que acabou de ser inserido
        .single(); // espero receber apenas um registro...

    if (error) { // se der algum erro durante o processo...
        throw new Error(error.message);
    }

    return converterTesteDoBanco(data as TesteBanco); // converte infos para tabela do supabase
}

export async function sincronizarTestes(testes: TesteCadarcos[]): Promise<number[]> {
    // sincroniza com o banco de dados e retorna um array com numeros (id dos tetes)

    const enviados: number[] = []; // cria lista dos testes enviados com seus id específicos (começa com array vazio)

    const { data: usuarioData, error: usuarioError } = await supabase.auth.getUser();

    if (usuarioError || !usuarioData.user) { // erro ou no auth...
        throw new Error("Falha na operação ou usuário não autenticado.");
    }

    for (const teste of testes) { // para cada teste existente dentro do array testes, faça o seguinte...

        if (teste.sincronizado) continue; // pare a execução desta iteração e vá imediatamente para a próxima...

        const { error } = await supabase // insere os testes na tabela do supabase
            .from("testes")
            .insert({
                uuid: teste.uuid,
                data: teste.data,
                lote: teste.lote,
                tear: teste.tear,
                artigo: teste.artigo,
                gramatura: numeroOuNull(teste.gramatura),
                responsavel_analise: teste.responsavel_analise,
                responsavel_teste: teste.responsavel_teste,
                criado_por: usuarioData.user.id, // id do usuario que fez o envio
            });

        if (error) { // se der algum erro...
            console.error("Erro ao inserir teste", error);
        } else { // se não, envia teste
            enviados.push(teste.id);
        }
    }

    return enviados; // retorna os id dos testes enviados com sucesso para o banco
}

export async function buscarTestes(): Promise<TesteCadarcos[]> {

    const { data, error } = await supabase
        .from("testes") // indica a tabela no supabase
        .select("*") // seleciona todas as colunas
        .order("created_at", { ascending: false }); // ordena os resultados a partir do created_at com resultados recentes primeiro

    if (error) { // verifica se houve algum erro
        throw new Error(error.message);
    }

    return (data as TesteBanco[]).map(converterTesteDoBanco);
}  

export function salvarTesteLocal(form: FormTesteCadarcos): TesteCadarcos {

    const novoTeste: TesteCadarcos = {  // cria novo objeto que representa novo teste completo
        id: Date.now(),                 // id local do teste
        uuid: crypto.randomUUID(),      // gera um id único para cada teste criado
        ...form,                        // pega todas as propriedades do form e coloca dentro do novo objeto
        sincronizado: false,            // registro foi criado mas ainda nao esta sincronizado com o banco
    };

    const testesSalvos: TesteCadarcos[] = 
        JSON.parse(localStorage.getItem("testes-cadarcos") || "[]"
        // JSON.parse transforma string em arrays/objetos
    );
       
    testesSalvos.unshift(novoTeste); // adiciona elemento ao inicio do array

    localStorage.setItem("testes-cadarcos",
        JSON.stringify(testesSalvos) // transforma em string JSON e salva no localStorage
    );

    return novoTeste; // retorna novo teste
}

export function excluirTesteLocal(uuid: string) { // recebe o UUID do teste para exclusão do localStorage

    const testes: TesteCadarcos[] = JSON.parse(
        localStorage.getItem("testes-cadarcos") || "[]"
        // recupera teste salvo no localStorage
    );

    const novosTestes = testes.filter( (teste) => teste.uuid !== uuid );
        // filter percorre o array e cria um novo array contendo apenas os items de interesse...
        // para cada teste, mantenha-o somente se o UUID dele for diferente do UUID que quero excluir..."

    localStorage.setItem(
        "testes-cadarcos",
        JSON.stringify(novosTestes) // salva o novo teste
    );
}

export async function excluirTesteBanco(uuid: string) {

    const { error } = await supabase
        .from("testes")      // seleciona a tabela do supabase
        .delete()            // deleta teste na tabela
        .eq("uuid", uuid);   // exclua onde a coluna `uuid` seja igual ao UUID que recebi na função

    if (error) {
        throw new Error(error.message); // lança um erro caso exista um
    }
}

export async function excluirTeste(uuid: string, sincronizado: boolean) {

    if (sincronizado) { // se teste estiver sincronizado, exclua do localStorage e do supabase...
        try {
            await excluirTesteBanco(uuid); // tente executar esse código...

        } catch {
            toast.error("Erro ao excluir teste."); // se houver algum erro durante processo...
        }
    }

    excluirTesteLocal(uuid); // exclui teste APENAS do localStorage
}