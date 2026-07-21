import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { MobileHeader } from "./MobileHeader";

export function Layout() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <MobileHeader
        menuAberto={menuAberto}
        setMenuAberto={setMenuAberto}
      />

      <div className="flex">
        {/* Sidebar Desktop */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Sidebar Mobile */}
        <div
          className={`fixed top-0 left-0 z-50 h-screen transform transition-transform duration-300 lg:hidden ${menuAberto ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <Sidebar fechar={() => setMenuAberto(false)} />
        </div>

        {/* Overlay */}
        {menuAberto && (
          <div
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={() => setMenuAberto(false)}
          />
        )}

        {/* Conteúdo */}
        <main className="flex-1 overflow-auto p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}