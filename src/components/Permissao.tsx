import type { ReactNode } from "react";

type Role = "admin" | "supervisor" | "operador";

interface PermissaoProps {
  perfil?: {
    role: Role;
  } | null;
  permitir: Role[];
  children: ReactNode;
}

export default function Permissao({
  perfil,
  permitir,
  children,
}: PermissaoProps) {
  if (!perfil) return null;

  if (!permitir.includes(perfil.role)) {
    return null;
  }

  return <>{children}</>;
}