import { useNavigate, Link, useLocation } from "react-router-dom";
import { House, ClipboardList, FileText, Cable, Database, LogOut } from "lucide-react";
import { supabase } from "../lib/supabase";
import { CHAVE_FORMULARIO } from "../config/auth";
import { formatarData, obterDataAtual } from "../utils/formatarData";
import { gerarLotePorData } from "../utils/gerarLote";

type Props = {
    fechar?: () => void;
};

export function Sidebar({ fechar }: Props) {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    async function sair() {
        fechar?.();

        sessionStorage.removeItem("sessaoAtiva");
        sessionStorage.removeItem(CHAVE_FORMULARIO);

        await supabase.auth.signOut();

        navigate("/login", { replace: true });
    }

    const hoje = obterDataAtual();

    return (
        <aside className="flex h-screen w-70 flex-col bg-white">

            <div className="flex flex-col gap-4 p-4">
                <h1 className="text-xl font-bold">Sistema Qualidade</h1>

                <div className="my-2 text-base md:block hidden">
                    <p><strong>Data:</strong> {formatarData(hoje)}</p>

                    <p><strong>Lote:</strong> {gerarLotePorData(hoje)}</p>
                </div>
            </div>

            <nav className="flex-1 space-y-6 p-4">

                <Link
                    to="/"
                    onClick={() => fechar?.()}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 ${pathname === "/"
                        ? "bg-blue-300"
                        : "hover:bg-gray-100"
                        }`}
                >
                    <House size={18} />
                    Início
                </Link>

                <div>

                    <p className="mb-2 text-xs uppercase text-gray-400">
                        Tecidos
                    </p>

                    <Link
                        to="/"
                        onClick={() => fechar?.()}
                        className="flex gap-3 rounded-lg px-3 py-2 hover:bg-gray-100"
                    >
                        <ClipboardList size={18} />
                        Lançamento
                    </Link>

                    <Link
                        to="/testes"
                        onClick={() => fechar?.()}
                        className="mt-2 flex gap-3 rounded-lg px-3 py-2 hover:bg-gray-100"
                    >
                        <FileText size={18} />
                        Testes
                    </Link>

                </div>

                <div>

                    <p className="mb-2 text-xs uppercase text-gray-400">
                        Fios
                    </p>

                    <Link
                        to="/lancamento-fio"
                        onClick={() => fechar?.()}
                        className="flex gap-3 rounded-lg px-3 py-2 hover:bg-gray-100"
                    >
                        <Cable size={18} />
                        Lançamento
                    </Link>

                    <Link
                        to="/testes-fio"
                        onClick={() => fechar?.()}
                        className="mt-2 flex gap-3 rounded-lg px-3 py-2 hover:bg-gray-100"
                    >
                        <Database size={18} />
                        Testes
                    </Link>

                </div>

            </nav>

            <div className="p-4">

                <button
                    onClick={sair}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-red-600 hover:bg-red-50"
                >
                    <LogOut size={18} />
                    Sair
                </button>

            </div>

        </aside>
    );
}