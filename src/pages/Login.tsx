import { useNavigate } from "react-router-dom";
import type { FormEvent } from "react";
import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  async function entrar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      setErro("E-mail ou senha inválidos.");
      return;
    }

  localStorage.setItem("loginExpiraEm", String(Date.now() + 24 * 60 * 60 * 1000));

  navigate("/", { replace: true });
  }

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <section className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <h1 className="text-2xl font-bold text-center text-slate-900">
          Sistema de Qualidade
        </h1>

        <p className="mt-2 text-sm text-center text-slate-500">
          Acesse sua conta para continuar
        </p>

        <form onSubmit={entrar} className="mt-8 space-y-5">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 rounded-xl border border-slate-300 px-4 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full h-12 rounded-xl border border-slate-300 px-4 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />

          {erro && <p className="text-sm text-red-600">{erro}</p>}

          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Entrar
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-slate-400 select-none">
          © Grupo Procópio
        </p>
      </section>
    </main>
  );
}