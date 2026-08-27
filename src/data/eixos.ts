// Estrutura oficial "Ceará mais Empreendedor" v2.0 — os indicadores do painel
// estão agrupados em 6 eixos integrados. O eixo Ambiente de Negócios reúne
// 10 indicadores, incluindo Inovação e Cultura Empreendedora.
import { INDICADORES, type IndicadorKey, type IndicadorMeta } from "./indicadores";

export type EixoKey =
  | "ambiente_negocios"
  | "cultura_empreendedora"
  | "ecossistema_inovacao"
  | "rede_atendimento"
  | "competitividade"
  | "cultura_organizacional";

export interface Eixo {
  key: EixoKey;
  nome: string;
  emoji: string;
  cor: string;
  descricao: string;
  indicadores: IndicadorKey[];
}

export const EIXOS: Eixo[] = [
  {
    key: "ambiente_negocios",
    nome: "Ambiente de Negócios",
    emoji: "🏛️",
    cor: "#FF6B00",
    descricao:
      "Articular alianças com Municípios, Líderes e Setores Produtivos. O protagonismo local é quem determina a continuidade das ações de desenvolvimento.",

    indicadores: [
      "salas_empreendedor",
      "simplificacao",
      "compras_publicas_acesso_credito",
      "gestao_politicas_publicas",
      "identidade_vocacoes_mercado",
      "inclusao_socioprodutiva",
      "liderancas_governanca",
      "resiliencia_climatica_sustentabilidade",
      "inovacao",
      "cultura_empreendedora",
    ],
  },
  {
    key: "cultura_empreendedora",
    nome: "Cultura Empreendedora",
    emoji: "💡",
    cor: "#00F26D",
    descricao:
      "Fomentar a cultura empreendedora fortalecendo competências para transformar o ambiente de negócios.",
    indicadores: ["cultura_empreendedora"],
  },
  {
    key: "ecossistema_inovacao",
    nome: "Ambientes de Inovação",
    emoji: "🚀",
    cor: "#A020F0",
    descricao:
      "Fomentar o empreendedorismo inovador e fornecer inovação para empresas tradicionais.",
    indicadores: ["inovacao"],
  },
  {
    key: "rede_atendimento",
    nome: "Rede de Atendimento",
    emoji: "🌐",
    cor: "#00A3FF",
    descricao:
      "Atender a necessidade de presença do Sebrae em todos os ambientes com soluções que entregam valor ao cliente.",
    indicadores: ["rede_atendimento"],
  },
  {
    key: "competitividade",
    nome: "Competitividade",
    emoji: "🏆",
    cor: "#FFC400",
    descricao:
      "Impulsionar os Pequenos Negócios a inovar e competir, promovendo o desenvolvimento econômico e a transformação das realidades regionais com foco no mercado.",
    indicadores: ["competitividade"],
  },
  {
    key: "cultura_organizacional",
    nome: "Cultura Organizacional",
    emoji: "🏢",
    cor: "#607D8B",
    descricao:
      "Transformar e antecipar a cultura e a prática institucional para os desafios do futuro.",
    indicadores: [],
  },
];

const INDICADOR_MAP = new Map(INDICADORES.map((i) => [i.key, i]));

export function indicadoresDoEixo(eixo: Eixo): IndicadorMeta[] {
  return eixo.indicadores
    .map((k) => INDICADOR_MAP.get(k))
    .filter((i): i is IndicadorMeta => Boolean(i));
}

export const EIXO_DE_INDICADOR = new Map<IndicadorKey, Eixo>(
  EIXOS.flatMap((e) => e.indicadores.map((k) => [k, e] as [IndicadorKey, Eixo])),
);

export function eixoOf(key: IndicadorKey): Eixo | undefined {
  return EIXO_DE_INDICADOR.get(key);
}
