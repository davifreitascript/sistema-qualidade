export function gerarLotePorData(data: string) {

  if (!data) return "";

  const [ano, mes, dia] = data.split("-").map(Number);

  const dataSelecionada = new Date(ano, mes - 1, dia);
  const inicioAno = new Date(ano, 0, 1);

  const diferencaDias = Math.floor(
    (dataSelecionada.getTime() - inicioAno.getTime()) / 86400000
  );

  const semana = String(Math.floor(diferencaDias / 7) + 1).padStart(2, "0");
  const anoFinal = String(ano).slice(-2);

  const diaSemanaJS = dataSelecionada.getDay();
  const diaSemana = diaSemanaJS === 0 ? 7 : diaSemanaJS;

  return `${semana}${anoFinal}-${diaSemana}`;
}