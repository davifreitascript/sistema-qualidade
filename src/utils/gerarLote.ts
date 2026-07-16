export function gerarLotePorData(data: string) {
  if (!data) return "";

  const [ano, mes, dia] = data.split("-").map(Number);

  const dataSelecionada = new Date(ano, mes - 1, dia);
  dataSelecionada.setHours(0, 0, 0, 0);

  // Segunda = 1 ... Domingo = 7
  const diaSemana = dataSelecionada.getDay() === 0 ? 7 : dataSelecionada.getDay();

  // Primeira segunda-feira do ano
  const primeiraSegunda = new Date(ano, 0, 1);
  primeiraSegunda.setHours(0, 0, 0, 0);

  while (primeiraSegunda.getDay() !== 1) {
    primeiraSegunda.setDate(primeiraSegunda.getDate() + 1);
  }

  let semana: number;

  // Datas antes da primeira segunda pertencem à semana 1
  if (dataSelecionada < primeiraSegunda) {
    semana = 1;
  } else {
    const diferencaDias = Math.floor(
      (dataSelecionada.getTime() - primeiraSegunda.getTime()) / 86400000
    );

    semana = Math.floor(diferencaDias / 7) + 1;
  }

  const anoFinal = String(ano).slice(-2);

  return `${String(semana).padStart(2, "0")}${anoFinal}-${diaSemana}`;
}