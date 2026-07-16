import type { TesteTecido } from "../types/teste";

export function exportarCSV(testes: TesteTecido[]) {
  if (testes.length === 0) {
    alert("Nenhum teste para exportar.");
    return;
  }

  const limpar = (valor: unknown) =>
    valor === undefined || valor === null ? "" : String(valor);

  const cabecalho = [
    "Data",
    "Lote",
    "Tear",
    "Turma",
    "Artigo",
    "Gramatura",
    "Batida Trama",
    "Batida Urdume",
    "Resistência Trama",
    "Resistência Urdume",
    "Resistência Reforco",
    "Responsável Análise",
    "Responsável Teste",
  ];

  const linhas = testes.map((teste) => [
    limpar(teste.lote),
    limpar(teste.tear),
    limpar(teste.turma),
    limpar(teste.artigo),
    limpar(teste.gramatura),
    limpar(teste.batidaTrama),
    limpar(teste.batidaUrdume),
    limpar(teste.resistenciaTrama),
    limpar(teste.resistenciaUrdume),
    limpar(teste.resistenciaReforco),
    limpar(teste.responsavel_analise),
    limpar(teste.responsavel_teste),
  ]);

  const conteudoCSV = [cabecalho, ...linhas]
    .map((linha) =>
      linha.map((campo) => `"${String(campo).replace(/"/g, '""')}"`).join(";")
    )
    .join("\r\n");

  const blob = new Blob(["\uFEFF" + conteudoCSV], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "testes-tecido.csv";
  link.click();

  URL.revokeObjectURL(url);
}