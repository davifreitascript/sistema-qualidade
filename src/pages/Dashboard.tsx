import { useState, useEffect } from "react"
import { DashboardCard } from "../components/DashboardCard";
import { Boxes, Cable, Calendar, Clock } from "lucide-react";

export default function Dashboard() {

    const [agora, setAgora] = useState(new Date());

    const horarioAtual = agora.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });

    useEffect(() => {
        const intervalo = setInterval(() => {
            setAgora(new Date());
        }, 1000);

        return () => clearInterval(intervalo);
    }, []);

    const dataAtual = (() => {
        const data = new Intl.DateTimeFormat("pt-BR", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        })
            .format(agora)
            .replace(",", "")
            .toLowerCase();

        return data.charAt(0).toUpperCase() + data.slice(1);
    })();

    return (

        <div className="flex flex-col justify-center items-center gap-4 min-h-screen min-w-full relative bg-slate-100">

            <div className="absolute top-4 left-4 font-bold text-sm select-none">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <p className="text-slate-700 font-mono">{dataAtual}</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <p className="font-mono text-sm tracking-wider tabular-nums text-slate-700">{horarioAtual}</p>
                    </div>
                </div>
            </div>

            <div className="md:my-10 mt-20 select-none">
                <h1 className="text-4xl font-bold text-slate-800">Sistema Qualidade</h1>
            </div>

            <div className="grid gap-8 lg:grid-cols-2 px-4 select-none">

                <DashboardCard
                    titulo="Tecidos"
                    descricao="Controle de qualidade dos tecidos."
                    Icone={Boxes}
                    cor="blue"
                    lancamento="/lancamento-tecido"
                    testes="/testes"
                />

                <DashboardCard
                    titulo="Fios"
                    descricao="Controle de qualidade dos fios."
                    Icone={Cable}
                    cor="emerald"
                    lancamento="/lancamento-fio"
                    testes="/testes-fio"
                />
            </div>
        </div>
    )
}