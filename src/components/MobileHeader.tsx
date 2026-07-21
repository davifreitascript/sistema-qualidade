import { Menu, X } from "lucide-react";
import { formatarData } from "../utils/formatarData"
import { gerarLotePorData } from "../utils/gerarLote"
import { obterDataAtual } from "../utils/formatarData"

type Props = {
    menuAberto: boolean;
    setMenuAberto: (valor: boolean) => void;
};

const hoje = obterDataAtual();

export function MobileHeader({ menuAberto, setMenuAberto }: Props) {

    return (
        <header className="flex h-16 items-center justify-between bg-white px-4 lg:hidden">

            <div className="flex flex-col gap-4">
                <div className="text-base">
                    <p><strong>Data:</strong> {formatarData(hoje)}</p>

                    <p><strong>Lote:</strong> {gerarLotePorData(hoje)}</p>
                </div>
            </div>

            <button
                onClick={() => setMenuAberto(!menuAberto)}> {menuAberto ? <X /> : <Menu />}
            </button>

        </header>
    );
}