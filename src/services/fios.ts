import type { FormTesteFio, TesteFio } from "../types/fio";

export function salvarTesteFioLocal(form: FormTesteFio): TesteFio {
  const novoTeste: TesteFio = {
    id: Date.now(),
    uuid: crypto.randomUUID(),
    ...form,
    sincronizado: false,
  };

  const testesSalvos: TesteFio[] = JSON.parse(
    localStorage.getItem("testes-fio") || "[]"
  );

  testesSalvos.unshift(novoTeste);

  localStorage.setItem(
    "testes-fio",
    JSON.stringify(testesSalvos)
  );

  return novoTeste;
}

export function buscarTestesFioLocal(): TesteFio[] {
  return JSON.parse(
    localStorage.getItem("testes-fio") || "[]"
  );
}

export function excluirTesteFioLocal(uuid: string) {
  const testes = buscarTestesFioLocal();

  localStorage.setItem(
    "testes-fio",
    JSON.stringify(
      testes.filter((teste) => teste.uuid !== uuid)
    )
  );
}

export function sincronizarTestesFio() {
  //
}

export function excluirTesteFio() {
  //
}