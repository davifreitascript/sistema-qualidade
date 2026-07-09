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
    async function verificarSessao() {
      const { data } = await supabase.auth.getSession();

      const loginExpiraEm = Number(localStorage.getItem("loginExpiraEm"));
      const expirou = loginExpiraEm && Date.now() > loginExpiraEm;

      if (!data.session || expirou) {
        await supabase.auth.signOut();
        localStorage.removeItem("loginExpiraEm");
        setLogado(false);
        setCarregando(false);
        return;
      }

      setLogado(true);
      setCarregando(false);
    }

    verificarSessao();
  }, []);

  if (carregando) return <p>Carregando...</p>;

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
      </Routes>
    </BrowserRouter>
    <SpeedInsights />
  </StrictMode>
);