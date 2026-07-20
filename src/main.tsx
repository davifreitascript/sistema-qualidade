import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./lib/supabase.ts";
import { Toaster } from "react-hot-toast";
import { SpeedInsights } from "@vercel/speed-insights/react"
import Login from "./pages/Login";
import Home from './Home.tsx'
import Testes from "./pages/Testes.tsx";
import LancamentoFio from "./pages/LancamentoFio.tsx"
import  { TestesFio } from "./pages/TestesFio";
import './index.css'

function RotaProtegida({ children }: { children: React.ReactNode }) {
  const [carregando, setCarregando] = useState(true);
  const [logado, setLogado] = useState(false);

  useEffect(() => {
    async function verificarSessao() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const sessaoAtiva = sessionStorage.getItem("sessaoAtiva");

      if (!session || !sessaoAtiva) {
        await supabase.auth.signOut();

        setLogado(false);
        setCarregando(false);
        return;
      }

      setLogado(true);
      setCarregando(false);
    }

    void verificarSessao();
  }, []);

  if (carregando) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Inicializando...
      </div>
    );
  }

  if (!logado) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <Login />
          }
        />

        <Route
          path="/"
          element={
            <RotaProtegida>
              <Home />
            </RotaProtegida>
          }
        />

        <Route
          path="/testes"
          element={
            <RotaProtegida>
              <Testes />
            </RotaProtegida>
          }
        />

        <Route
          path="*"
          element={
            <Navigate to="/" replace />
          }
        />

        <Route
          path="/lancamento-fio"
          element={
            <RotaProtegida>
              <LancamentoFio />
            </RotaProtegida>
          }
        />

        <Route
          path="/tabela-fio"
          element={
            <RotaProtegida>
              <TestesFio />
            </RotaProtegida>
          }
        />

      </Routes>

      <Toaster
        position="top-left"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "12px",
            background: "#fff",
            color: "#0f172a",
          },
          success: {
            iconTheme: { primary: "#2563eb", secondary: "#ffffff" }
          },
          error: {
            iconTheme: { primary: "#dc2626", secondary: "#ffffff" }
          },
        }}
      />
    </BrowserRouter>
    <SpeedInsights />
  </StrictMode>
);