import { Outlet } from "react-router-dom";

export function LayoutDashboard() {
  return (
    <main className="-screen bg-slate-100">
      <Outlet />
    </main>
  );
}