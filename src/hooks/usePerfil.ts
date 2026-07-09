import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type Role = "admin" | "supervisor" | "operador";

type Perfil = {
  id: string;
  nome: string;
  role: Role;
};

export function usePerfil() {
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [carregandoPerfil, setCarregandoPerfil] = useState(true);

  useEffect(() => {
    async function buscarPerfil() {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        setPerfil(null);
        setCarregandoPerfil(false);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("id, nome, role")
        .eq("id", userData.user.id)
        .single();

      if (error) {
        console.error("Erro ao buscar perfil:", error);
        setPerfil(null);
      } else {
        setPerfil(data);
      }

      setCarregandoPerfil(false);
    }

    buscarPerfil();
  }, []);

  return { perfil, carregandoPerfil };
}