// Ícones do Design System SEBRAE-CE (lucide-react) para eixos e indicadores —
// substituem os emojis originais dos dados por vetores consistentes com a
// biblioteca de ícones oficial do DS (sebrae-ce.dscreator.com.br/fundamentos).
import {
  Landmark,
  Lightbulb,
  Rocket,
  Globe,
  Trophy,
  Building2,
  House,
  Handshake,
  Compass,
  ClipboardList,
  Users,
  Recycle,
  Puzzle,
  Map,
  type LucideIcon,
} from "lucide-react";

import type { EixoKey } from "@/data/eixos";
import type { IndicadorKey } from "@/data/indicadores";

export const EIXO_ICONS: Record<EixoKey, LucideIcon> = {
  ambiente_negocios: Landmark,
  cultura_empreendedora: Lightbulb,
  ecossistema_inovacao: Rocket,
  rede_atendimento: Globe,
  competitividade: Trophy,
  cultura_organizacional: Building2,
};

export const INDICADOR_ICONS: Record<IndicadorKey, LucideIcon> = {
  salas_empreendedor: House,
  cultura_empreendedora: Lightbulb,
  compras_publicas_acesso_credito: Landmark,
  inclusao_socioprodutiva: Handshake,
  identidade_vocacoes_mercado: Compass,
  gestao_politicas_publicas: ClipboardList,
  liderancas_governanca: Users,
  inovacao: Rocket,
  resiliencia_climatica_sustentabilidade: Recycle,
  simplificacao: Puzzle,
  rede_atendimento: Map,
  competitividade: Trophy,
};
