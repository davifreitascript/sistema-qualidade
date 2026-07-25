import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react"
import { House, ClipboardList, Database, LogOut, ChevronDown, ChevronRight } from "lucide-react";
import { supabase } from "../lib/supabase";
import { CHAVE_FORMULARIO } from "../config/auth";
import { formatarData, obterDataAtual } from "../utils/formatarData";
import { gerarLotePorData } from "../utils/gerarLote";

type Props = {
    fechar?: () => void;
};

export function Sidebar({ fechar }: Props) {

    const navigate = useNavigate();

    function toggleMenu(menu: string) {
        setMenuAberto(menuAberto === menu ? null : menu);
    }

    const itemMenu = (rota: string) =>
        `flex items-center gap-4 rounded-lg px-3 py-2 my-1 transition-all duration-200 ${pathname === rota
            ? "bg-blue-600 text-white shadow-md"
            : "text-slate-700 hover:bg-slate-200"
        }`;

    const tituloMenu = (id: string, titulo: string) => (
        <button
            type="button"
            onClick={() => toggleMenu(id)}
            className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-sm font-semibold uppercase tracking-wide text-gray-500 hover:bg-gray-100"
        >
            <span>{titulo}</span>

            {menuAberto === id ? (
                <ChevronDown size={18} />
            ) : (
                <ChevronRight size={18} />
            )}
        </button>
    );

    function obterMenuInicial(pathname: string) {
        if (
            pathname === "/lancamento-tecido" ||
            pathname === "/testes"
        ) {
            return "tecidos";
        }

        if (
            pathname === "/lancamento-fio" ||
            pathname === "/testes-fio"
        ) {
            return "fios";
        }

        if (
            pathname === "/lancamento-alcas" ||
            pathname === "/testes-alcas"
        ) {
            return "alcas";
        }

        if (
            pathname === "/lancamento-cadarcos" ||
            pathname === "/testes-cadarcos"
        ) {
            return "cadarcos";
        }

        return null;
    }

    const { pathname } = useLocation();

    const [menuAberto, setMenuAberto] = useState<string | null>(() =>
        obterMenuInicial(pathname)
    );

    useEffect(() => {
        setMenuAberto(obterMenuInicial(pathname));
    }, [pathname]);

    async function sair() {
        fechar?.();

        sessionStorage.removeItem("sessaoAtiva");
        sessionStorage.removeItem(CHAVE_FORMULARIO);

        await supabase.auth.signOut();

        navigate("/login", { replace: true });
    }

    const hoje = obterDataAtual();

    return (
        <aside className="flex h-screen w-70 flex-col bg-white overflow-y-auto">

            <div className="flex flex-col gap-4 p-4 select-none">
                <h1 className="text-xl font-bold">Alçatec</h1>

                <div className="my-2 text-base md:block hidden">
                    <p><strong>Data:</strong> {formatarData(hoje)}</p>

                    <p><strong>Lote:</strong> {gerarLotePorData(hoje)}</p>
                </div>
            </div>

            <nav className="flex-1 space-y-2 p-4">

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

                    <div>
                        {tituloMenu("tecidos", "Tecidos")}

                        <div
                            className={`overflow-hidden transition-all duration-300 cursor-pointer ${menuAberto === "tecidos"
                                ? "max-h-40 mt-2 opacity-100"
                                : "max-h-0 opacity-0"
                                }`}
                        >
                            <Link
                                to="/lancamento-tecido"
                                onClick={() => fechar?.()}
                                className={itemMenu("/lancamento-tecido")}
                            >
                                <ClipboardList size={18} />
                                Lançamento
                            </Link>

                            <Link
                                to="/testes"
                                onClick={() => fechar?.()}
                                className={itemMenu("/testes")}
                            >
                                <Database size={18} />
                                Testes
                            </Link>
                        </div>
                    </div>

                </div>

                <div>

                    <div>
                        {tituloMenu("fios", "Fios")}

                        <div
                            className={`overflow-hidden transition-all duration-300 ${menuAberto === "fios"
                                ? "max-h-40 mt-2 opacity-100"
                                : "max-h-0 opacity-0"
                                }`}
                        >
                            <Link
                                to="/lancamento-fio"
                                onClick={() => fechar?.()}
                                className={itemMenu("/lancamento-fio")}
                            >
                                <ClipboardList size={18} />
                                Lançamento
                            </Link>

                            <Link
                                to="/testes-fio"
                                onClick={() => fechar?.()}
                                className={itemMenu("/testes-fio")}
                            >
                                <Database size={18} />
                                Testes
                            </Link>
                        </div>
                    </div>

                </div>

                <div>

                    <div>
                        {tituloMenu("alcas", "Alças")}

                        <div
                            className={`overflow-hidden transition-all duration-300 ${menuAberto === "alcas"
                                ? "max-h-40 mt-2 opacity-100"
                                : "max-h-0 opacity-0"
                                }`}
                        >
                            <Link
                                to="/lancamento-alcas"
                                onClick={() => fechar?.()}
                                className={itemMenu("/lancamento-alcas")}
                            >
                                <ClipboardList size={18} />
                                Lançamento
                            </Link>

                            <Link
                                to="/testes-alcas"
                                onClick={() => fechar?.()}
                                className={itemMenu("/testes-alcas")}
                            >
                                <Database size={18} />
                                Testes
                            </Link>
                        </div>
                    </div>

                </div>

                <div>
                    <div>
                        {tituloMenu("cadarcos", "Cadarços")}

                        <div
                            className={`overflow-hidden transition-all duration-300 ${menuAberto === "cadarcos"
                                ? "max-h-40 mt-2 opacity-100"
                                : "max-h-0 opacity-0"
                                }`}
                        >
                            <Link
                                to="/lancamento-cadarcos"
                                onClick={() => fechar?.()}
                                className={itemMenu("/lancamento-cadarcos")}
                            >
                                <ClipboardList size={18} />
                                Lançamento
                            </Link>

                            <Link
                                to="/testes-cadarcos"
                                onClick={() => fechar?.()}
                                className={itemMenu("/testes-cadarcos")}
                            >
                                <Database size={18} />
                                Testes
                            </Link>
                        </div>
                    </div>
                </div>

            </nav>

            <div className="p-4 w-fit">

                <button
                    onClick={sair}
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-red-600 hover:bg-red-50 cursor-pointer">
                    <LogOut size={18} />
                    Sair
                </button>

            </div>

        </aside>
    );
}