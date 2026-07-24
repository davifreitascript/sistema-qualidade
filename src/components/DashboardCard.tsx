import { Link } from "react-router-dom";
import type { ElementType } from "react";
import { PlusCircle } from "lucide-react";

type Props = {
  titulo: string;
  descricao: string;
  Icone: ElementType;
  lancamento: string;
  testes: string;
};

export function DashboardCard({
  titulo,
  descricao,
  Icone,
  lancamento,
  testes,
}: Props) {

  return (
    <div className="rounded-lg p-4 md:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-white">

      <div className="flex items-center justify-center gap-2 p-4">

        <div>
          <Icone
            size={34}
            className="text-blue-600"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800">{titulo}</h2>

          <p className="text-slate-500">{descricao}</p>
        </div>

      </div>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 w-full">
        <div className="w-full">
        <Link
          to={lancamento}
          className="flex items-center justify-between md:w-50 rounded-lg border border-slate-200 p-4 transition hover:bg-blue-200">
            <span>Novo lançamento</span>
            <PlusCircle size={18} />
        </Link>
        </div>

        <div className="w-full">
        <Link
          to={testes}
          className="flex items-center justify-between md:w-50 rounded-xl border border-slate-200 p-4 transition-all hover:bg-blue-200">
            <span>Tabela de testes</span>
            <PlusCircle size={18} />
        </Link>
        </div>
      </div>
    </div>
  );
}