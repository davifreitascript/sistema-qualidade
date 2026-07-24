import { useState, useEffect } from "react"
import { DashboardCard } from "../components/DashboardCard";
import { Spool, Calendar, Clock, Scissors } from "lucide-react";
import { GiRolledCloth } from "react-icons/gi";


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
                        <p className="text-slate-700 ">{dataAtual}</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <p className="text-sm tracking-wider tabular-nums text-slate-700">{horarioAtual}</p>
                    </div>
                </div>

            </div>

            <div className="absolute top-4 right-4 md:block hidden text-xs font-mono select-none text-slate-600">
                <span>beta 1.0.1</span>
            </div>

            <div className="md:my-10 mt-20 select-none">
                <h1 className="text-4xl font-bold text-slate-800">Alçatec</h1>
            </div>

            <div className="flex w-full overflow-x-auto scroll-smooth snap-x snap-mandatory gap-4 px-4 pb-2 select-none md:justify-center md:overflow-visible scrollbar-hide">

                <div className="snap-center shrink-0 w-[85vw] max-w-[320px] md:w-auto">
                    <DashboardCard
                        titulo="Tecidos"
                        descricao=""
                        Icone={GiRolledCloth}
                        lancamento="/lancamento-tecido"
                        testes="/testes"
                    />
                </div>

                <div className="snap-center shrink-0 w-[85vw] max-w-[320px] md:w-auto">
                    <DashboardCard
                        titulo="Fios"
                        descricao=""
                        Icone={Spool}
                        lancamento="/lancamento-fio"
                        testes="/testes-fio"
                    />
                </div>

                <div className="snap-center shrink-0 w-[85vw] max-w-[320px] md:w-auto">
                    <DashboardCard
                        titulo="Alças"
                        descricao=""
                        Icone={Scissors}
                        lancamento="/lancamento-alcas"
                        testes="/testes-alcas"
                    />
                </div>
            </div>

            <footer className="mt-6 text-center text-sm select-none md:absolute md:bottom-4 md:left-1/2 md:m-0 md:-translate-x-1/2 text-slate-500">
                © {new Date().getFullYear()} Grupo Procópio
            </footer>

        </div>
    )
}