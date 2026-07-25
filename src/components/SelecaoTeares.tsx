import { tearesAlcas } from "../data/tearesAlcas";

type Props = {
    value: string[];
    onChange: (teares: string[]) => void;
};

export function SelecaoTeares({ value, onChange }: Props) {

    function alternarTear(tear: string) {
        if (value.includes(tear)) {
            onChange(value.filter(t => t !== tear));
        } else {
            onChange([...value, tear].sort());
        }
    }

    function selecionarTodos() {
        onChange(tearesAlcas);
    }

    function limpar() {
        onChange([]);
    }

    return (
        <div className="space-y-4">

            <div className="flex items-center justify-between">

                <p className="text-sm text-gray-600">
                    {value.length} teares selecionados
                </p>

                <div className="flex gap-2">

                    <button
                        type="button"
                        onClick={selecionarTodos}
                        className="rounded-lg border px-3 py-1 text-sm hover:bg-gray-100"
                    >
                        Todos
                    </button>

                    <button
                        type="button"
                        onClick={limpar}
                        className="rounded-lg border px-3 py-1 text-sm hover:bg-gray-100"
                    >
                        Limpar
                    </button>

                </div>

            </div>

            <div className="grid grid-cols-5 gap-2">

                {tearesAlcas.map((tear) => {

                    const selecionado = value.includes(tear);

                    return (
                        <button
                            key={tear}
                            type="button"
                            onClick={() => alternarTear(tear)}
                            className={`
                                h-11 rounded-lg border font-semibold transition
                                ${selecionado
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "hover:bg-gray-100"
                                }
                            `}
                        >
                            {tear}
                        </button>
                    );
                })}

            </div>

        </div>
    );
}