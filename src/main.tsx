import "@fontsource/inter/400.css"; import "@fontsource/inter/500.css"; import "@fontsource/inter/600.css"; import "@fontsource/inter/700.css";
import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { supabase } from "./lib/supabase.ts";
import { Toaster } from "react-hot-toast";
import { SpeedInsights } from "@vercel/speed-insights/react"
import { TestesFio } from "./pages/TestesFio";
import { Layout } from "./components/Layout.tsx"
import Login from "./pages/Login";
import { LayoutDashboard } from "./components/LayoutDashboard";
import Testes from "./pages/Testes.tsx";
import LancamentoFio from "./pages/LancamentoFio.tsx"
import LancamentoTecido from "./pages/LancamentoTecido.tsx"
import Dashboard from "./pages/Dashboard.tsx"
import './index.css'

export default function RotaProtegida() {
  const [carregando, setCarregando] = useState(true);
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    async function verificarSessao() {
      const { data } = await supabase.auth.getSession();

      const sessaoAtiva =
        data.session &&
        sessionStorage.getItem("sessaoAtiva") === "true";

      setAutenticado(!!sessaoAtiva);
      setCarregando(false);
    }

    verificarSessao();
  }, []);

  if (carregando) {
    return null;
  }

  return autenticado ? <Outlet /> : <Navigate to="/login" replace />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<RotaProtegida />}>

          {/* Dashboard */}
          <Route element={<LayoutDashboard />}>
            <Route
              path="/"
              element={<Dashboard />}
            />
          </Route>

          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/lancamento-tecido" element={<LancamentoTecido />} />
            <Route path="/testes" element={<Testes />} />
            <Route path="/lancamento-fio" element={<LancamentoFio />} />
            <Route path="/testes-fio" element={<TestesFio />} />
          </Route>
        </Route>
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