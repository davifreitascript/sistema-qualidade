import type { SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../lib/supabase";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const [erroEmail, setErroEmail] = useState(false);
  const [erroSenha, setErroSenha] = useState(false);

  async function entrar(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    setErro("");
    setErroEmail(false);
    setErroSenha(false);

    const emailVazio = !email.trim();
    const senhaVazia = !senha.trim();

    if (emailVazio || senhaVazia) {
      setErroEmail(emailVazio);
      setErroSenha(senhaVazia);
      setErro("Preencha os campos obrigatórios.");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      setErro("E-mail ou senha inválidos.");
      setErroEmail(true);
      setErroSenha(true);
      return;
    }

    sessionStorage.setItem("sessaoAtiva", "true");

    navigate("/", { replace: true });
  }

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <section className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <h1 className="text-2xl font-bold text-center text-slate-900 select-none">
          Sistema de Qualidade
        </h1>

        <p className="mt-2 text-sm text-center text-slate-500 select-none">
          Acesse sua conta para continuar
        </p>

        <form onSubmit={entrar} autoComplete="off" className="mt-8 space-y-5">
          <div className="relative">
            <input
              type="email"
              id="email"
              value={email}
              autoComplete="off"
              onChange={(e) => {
                setEmail(e.target.value);
                setErroEmail(false);
                setErro("");
              }}
              placeholder=" "
              className={`peer w-full h-12 border-b px-4 text-sm outline-none transition ${erroEmail
                ? "border-b-red-500 focus:border-b-red-500"
                : "border-b-slate-300 focus:border-b focus:border-b-blue-600"
                }`}
            />

            <label
              htmlFor="email"
              className={`absolute left-2 top-1/2 -translate-y-1/2 bg-white px-1 text-sm pointer-events-none
      transition-transform duration-200 ease-out peer-focus:translate-y-[-1.8rem] peer-focus:scale-90
      ${email
                  ? "translate-y-[-1.8rem] scale-90"
                  : ""
                }
      ${erroEmail
                  ? "text-red-500"
                  : "text-slate-400 peer-focus:text-blue-600"
                }
    `}
            >
              E-mail corporativo
            </label>
          </div>

          <div className="relative">
            <input
              type={mostrarSenha ? "text" : "password"}
              id="senha"
              value={senha}
              autoComplete="off"
              onChange={(e) => {
                setSenha(e.target.value);
                setErroSenha(false);
                setErro("");
              }}
              placeholder=" "
              className={`peer w-full h-12 border-b px-4 pr-12 text-sm outline-none transition ${erroSenha
                ? "border-b-red-500 focus:border-b-red-500"
                : "border-b-slate-300 focus:border-b focus:border-b-blue-600"
                }`}
            />

            <label
              htmlFor="senha"
              className={`absolute left-2 top-1/2 -translate-y-1/2 bg-white px-1 text-sm pointer-events-none
      transition-transform duration-200 ease-out peer-focus:translate-y-[-1.8rem]
      peer-focus:scale-90
      ${senha
                  ? "translate-y-[-1.8rem] scale-90"
                  : ""
                }
      ${erroSenha
                  ? "text-red-500"
                  : "text-slate-400 peer-focus:text-blue-600"
                }
    `}
            >
              Senha
            </label>

            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setMostrarSenha(!mostrarSenha)}
              className="absolute z-10 right-3 top-1/2 -translate-y-1/2 flex items-center justify-center
    text-slate-500 hover:text-blue-600
    opacity-0 pointer-events-none
    peer-focus:opacity-100 peer-focus:pointer-events-auto
    transition-opacity duration-200"
            >
              {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {erro && (
            <p className="text-sm text-red-600">
              {erro}
            </p>
          )}

          <div className="flex justify-center items-center w-full">
            <button
              type="submit"
              className="w-30 btn btn-blue"
            >
              Entrar
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-xs text-slate-400 select-none">
          © Nexora Technologies
        </p>
      </section>
    </main>
  );
}