import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./lib/supabase.ts";
import Login from "./pages/Login";
import Home from './Home.tsx'
import Testes from "./pages/Testes.tsx";
import './index.css'
import { SpeedInsights } from "@vercel/speed-insights/react"

function RotaProtegida({ children }: { children: React.ReactNode }) {
  const [carregando, setCarregando] = useState(true);
  const [logado, setLogado] = useState(false);

  useEffect(() => {

    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let componenteAtivo = true;

    async function encerrarSessao() {
      await supabase.auth.signOut();
      localStorage.removeItem("loginExpiraEm");

      if (componenteAtivo) {
        setLogado(false);
        setCarregando(false);
      }
    }

    async function verificarSessao() {
      const { data, error } = await supabase.auth.getSession();

      if (!componenteAtivo) return;

      const loginExpiraEm = Number(localStorage.getItem("loginExpiraEm"));

      if (error || !data.session || !loginExpiraEm) {
        await encerrarSessao();
        return;
      }
      const tempoRestante = loginExpiraEm - Date.now();

      if (tempoRestante <= 0) {
        await encerrarSessao();
        return;
      }

      setLogado(true);
      setCarregando(false);

      timeoutId = setTimeout(() => {
        void encerrarSessao();
      }, tempoRestante);
    }

    void verificarSessao();

    return () => {
      componenteAtivo = false;

      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    }

  }, []);

  if (carregando) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Carregando...
      </div>
    );
  }

  if (!logado) return <Navigate to="/login" replace />;

  return children;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

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

        <Route path="*" element={<Navigate to="/" replace />} />
        
      </Routes>
    </BrowserRouter>
    <SpeedInsights />
  </StrictMode>
);