import { createContext, useContext } from "react";

/** Destaque temporário aplicado ao mapa da tela inicial. */
export interface DestaqueMapa {
  id: string;
  titulo: string;
  municipios: string[];
  cor: string;
  emoji?: string;
  logoUrl?: string;
}

interface DestaqueMapaCtx {
  destaque: DestaqueMapa | null;
  /** Ativa o destaque; se o mesmo id já estiver ativo, desliga. */
  toggleDestaque: (d: DestaqueMapa) => void;
  limparDestaque: () => void;
}

export const DestaqueMapaContext = createContext<DestaqueMapaCtx>({
  destaque: null,
  toggleDestaque: () => {},
  limparDestaque: () => {},
});

export function useDestaqueMapa() {
  return useContext(DestaqueMapaContext);
}

export const COR_COMPETITIVIDADE = "#F5A623";
export const COR_AMBIENTE_NEGOCIOS = "#E85D1F";
