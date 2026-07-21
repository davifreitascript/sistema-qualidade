import { Link } from "react-router-dom";
import { PlusCircle, type LucideIcon } from "lucide-react";

type Props = {
  titulo: string;
  descricao: string;
  Icone: LucideIcon;
  cor: "blue" | "emerald";

  lancamento: string;
  testes: string;
};

const cores = {
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-700",
  },

  emerald: {
    bg: "bg-emerald-100",
    text: "text-emerald-700",
  },
};

export function DashboardCard({
  titulo,
  descricao,
  Icone,
  cor,
  lancamento,
  testes,
}: Props) {

  return (
    <div className="rounded-2xl  bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="flex items-center gap-4">

        <div className={`rounded-xl p-4 ${cores[cor].bg}`}>

          <Icone
            size={34}
            className={cores[cor].text}
          />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            {titulo}
          </h2>

          <p className="text-slate-500">
            {descricao}
          </p>

        </div>

      </div>

      <div className="mt-8 flex flex-col gap-3">

        <Link
          to={lancamento}
          className="flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50"
        >

          <span>Novo lançamento</span>

          <PlusCircle size={18} />

        </Link>

        <Link
          to={testes}
          className="flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50"
        >

          <span>Consultar testes</span>

          <PlusCircle size={18} />

        </Link>

      </div>

    </div>
  );
}