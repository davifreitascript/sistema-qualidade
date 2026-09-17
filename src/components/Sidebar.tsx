import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react"
import { supabase } from "../lib/supabase";
import { House, ClipboardList, Database, LogOut, ChevronDown } from "lucide-react";
import { CHAVE_FORMULARIO } from "../config/auth";
import { formatarData, obterDataAtual } from "../utils/formatarData";
import { gerarLotePorData } from "../utils/gerarLote";

type Props = {
    fechar?: () => void;
};

type Menu = "tecidos" | "fios" | "alcas" | "cadarcos";

export function Sidebar({ fechar }: Props) {

    const navigate = useNavigate();
    const CHAVE_MENUS = "sidebar-menus";

    function toggleMenu(menu: Menu) {
        setMenusAbertos((prev) => ({
            ...prev,
            [menu]: !prev[menu],
        }));
    }

    const itemMenu = (rota: string) =>
        `flex items-center gap-4 rounded-lg px-3 py-2 my-1 transition-all duration-200 ${pathname === rota
            ? "bg-blue-600 text-white shadow-md"
            : "text-slate-700 hover:bg-slate-200"
        }`;

    const tituloMenu = (id: Menu, titulo: string) => (
        <button
            type="button"
            onClick={() => toggleMenu(id)}
            className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-sm font-semibold uppercase tracking-wide text-gray-500 hover:bg-gray-100"
        >
            <span>{titulo}</span>

            <ChevronDown
                size={18}
                className={`transition-transform duration-300 ${menusAbertos[id] ? "rotate-0" : "-rotate-90"
                    }`}
            />
        </button>
    );

    const { pathname } = useLocation();

    const [menusAbertos, setMenusAbertos] = useState<Record<Menu, boolean>>(() => {
        const salvo = sessionStorage.getItem(CHAVE_MENUS);

        if (salvo) {
            return JSON.parse(salvo);
        }

        return {
            tecidos:
                pathname === "/lancamento-tecido" ||
                pathname === "/testes",

            fios:
                pathname === "/lancamento-fio" ||
                pathname === "/testes-fio",

            alcas:
                pathname === "/lancamento-alcas" ||
                pathname === "/testes-alcas",

            cadarcos:
                pathname === "/lancamento-cadarcos" ||
                pathname === "/testes-cadarcos",
        };
    });

    useEffect(() => {
        sessionStorage.setItem(CHAVE_MENUS, JSON.stringify(menusAbertos));
    }, [menusAbertos]);

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
                <h1 className="text-lg font-bold">Nexora Technologies</h1>

                <div className="my-2 text-sm md:block hidden">
                    <p><strong>Data:</strong> {formatarData(hoje)}</p>

                    <p><strong>Lote:</strong> {gerarLotePorData(hoje)}</p>
                </div>
            </div>

            <nav className="flex-1 space-y-2 p-4">

                <Link
                    to="/"
                    onClick={() => fechar?.()}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 cursor-default ${pathname === "/"
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
                            className={`overflow-hidden transition-all duration-300 cursor-default ${menusAbertos.tecidos
                                ? "max-h-40 mt-2 opacity-100"
                                : "max-h-0 opacity-0"
                                }`}
                        >
                            <Link
                                to="/lancamento-tecido"
                                onClick={() => fechar?.()}
                                className={itemMenu("/lancamento-tecido") + " cursor-default"}
                            >
                                <ClipboardList size={18} />
                                Lançamento
                            </Link>

                            <Link
                                to="/testes"
                                onClick={() => fechar?.()}
                                className={itemMenu("/testes") + " cursor-default"}
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
                            className={`overflow-hidden transition-all duration-300 ${menusAbertos.fios
                                ? "max-h-40 mt-2 opacity-100"
                                : "max-h-0 opacity-0"
                                }`}
                        >
                            <Link
                                to="/lancamento-fio"
                                onClick={() => fechar?.()}
                                className={itemMenu("/lancamento-fio") + " cursor-default"}
                            >
                                <ClipboardList size={18} />
                                Lançamento
                            </Link>

                            <Link
                                to="/testes-fio"
                                onClick={() => fechar?.()}
                                className={itemMenu("/testes-fio")  + " cursor-default"}
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
                            className={`overflow-hidden transition-all duration-300 ${menusAbertos.alcas
                                ? "max-h-40 mt-2 opacity-100"
                                : "max-h-0 opacity-0"
                                }`}
                        >
                            <Link
                                to="/lancamento-alcas"
                                onClick={() => fechar?.()}
                                className={itemMenu("/lancamento-alcas") + " cursor-default"}
                            >
                                <ClipboardList size={18} />
                                Lançamento
                            </Link>

                            <Link
                                to="/testes-alcas"
                                onClick={() => fechar?.()}
                                className={itemMenu("/testes-alcas") + " cursor-default"}
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
                            className={`overflow-hidden transition-all duration-300 cursor-default ${menusAbertos.cadarcos
                                ? "max-h-40 mt-2 opacity-100"
                                : "max-h-0 opacity-0"
                                }`}
                        >
                            <Link
                                to="/lancamento-cadarcos"
                                onClick={() => fechar?.()}
                                className={itemMenu("/lancamento-cadarcos") + " cursor-default"}
                            >
                                <ClipboardList size={18} />
                                Lançamento
                            </Link>

                            <Link
                                to="/testes-cadarcos"
                                onClick={() => fechar?.()}
                                className={itemMenu("/testes-cadarcos")  + " cursor-default"}
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
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-red-600 hover:bg-red-50 cursor-default">
                    <LogOut size={18} />
                    Sair
                </button>

            </div>

        </aside>
    );
}