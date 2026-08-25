import {
  INDICADORES_META,
  INDICADOR_KEYS_MUNICIPIO,
  type IndicadorMunicipioKey,
  MUNICIPIOS,
  pctOf,
} from "./municipios";

export type IndicadorKey = IndicadorMunicipioKey | "rede_atendimento" | "competitividade";

export interface IndicadorMeta {
  key: IndicadorKey;
  nome: string;
  emoji: string;
  descricao: string;
  tipo: "municipio" | "regional" | "projetos";
  observacao?: string;
}

const rawInd = INDICADORES_META.indicadores;
const indMap = new Map(rawInd.map((i) => [i.id, i]));

function metaFor(id: IndicadorKey, tipo: IndicadorMeta["tipo"]): IndicadorMeta {
  const r = indMap.get(id);
  if (!r) throw new Error(`Indicador ausente no JSON: ${id}`);
  return {
    key: id,
    nome: r.nome,
    emoji: r.emoji,
    descricao: r.descricaoCurta,
    tipo,
    observacao: r.observacao,
  };
}

// Ordem oficial dos 11 indicadores + Competitividade
export const INDICADORES: IndicadorMeta[] = [
  metaFor("salas_empreendedor", "municipio"),
  metaFor("cultura_empreendedora", "municipio"),
  metaFor("compras_publicas_acesso_credito", "municipio"),
  metaFor("inclusao_socioprodutiva", "municipio"),
  metaFor("identidade_vocacoes_mercado", "municipio"),
  metaFor("gestao_politicas_publicas", "municipio"),
  metaFor("liderancas_governanca", "municipio"),
  metaFor("inovacao", "municipio"),
  metaFor("resiliencia_climatica_sustentabilidade", "municipio"),
  metaFor("simplificacao", "municipio"),
  metaFor("rede_atendimento", "regional"),
  metaFor("competitividade", "projetos"),
];

export const INDICADORES_MUNICIPIO = INDICADORES.filter((i) => i.tipo === "municipio");

export function isIndicadorMunicipio(k: IndicadorKey): k is IndicadorMunicipioKey {
  return (INDICADOR_KEYS_MUNICIPIO as readonly string[]).includes(k);
}

export function mediaRegional(k: IndicadorMunicipioKey): number {
  return Math.round(
    MUNICIPIOS.reduce((acc, m) => acc + pctOf(m, k), 0) / MUNICIPIOS.length,
  );
}

// Projetos de Competitividade — Relatório de Gestão Anual 2025.
export interface ProjetoCompetitividade {
  id: string;
  nome: string;
  emoji: string;
  logo?: string;
  /** Cor usada no destaque do mapa (tonalidade do eixo Competitividade). */
  cor: string;
  clientesAtendidos: number;
  clientesLabel: string;
  investimento: number;
  investimentoNota?: string;
  /** Foco resumido do projeto. */
  foco?: string;
  municipiosAtuacao: string[];
  destaques: string[];
}

export interface SebraetecMunicipio {
  municipio: string;
  contratacoes: number;
  empresasBeneficiadas: number;
}

export const SEBRAETEC_MUNICIPIOS: SebraetecMunicipio[] = [
  { municipio: "Juazeiro do Norte", contratacoes: 129, empresasBeneficiadas: 129 },
  { municipio: "Crato", contratacoes: 27, empresasBeneficiadas: 43 },
  { municipio: "Brejo Santo", contratacoes: 11, empresasBeneficiadas: 11 },
  { municipio: "Barbalha", contratacoes: 7, empresasBeneficiadas: 7 },
  { municipio: "Várzea Alegre", contratacoes: 6, empresasBeneficiadas: 48 },
  { municipio: "Missão Velha", contratacoes: 5, empresasBeneficiadas: 5 },
  { municipio: "Assaré", contratacoes: 4, empresasBeneficiadas: 13 },
  { municipio: "Nova Olinda", contratacoes: 3, empresasBeneficiadas: 3 },
  { municipio: "Mauriti", contratacoes: 2, empresasBeneficiadas: 5 },
  { municipio: "Milagres", contratacoes: 2, empresasBeneficiadas: 3 },
  { municipio: "Farias Brito", contratacoes: 2, empresasBeneficiadas: 5 },
  { municipio: "Jardim", contratacoes: 2, empresasBeneficiadas: 2 },
  { municipio: "Porteiras", contratacoes: 1, empresasBeneficiadas: 1 },
  { municipio: "Aurora", contratacoes: 1, empresasBeneficiadas: 1 },
  { municipio: "Penaforte", contratacoes: 1, empresasBeneficiadas: 1 },
];

export const SEBRAETEC_TOTAL = {
  contratacoes: 203,
  empresasBeneficiadas: 277,
};

import logoPoloCalcadista from "@/assets/logo-polo-calcadista.png.asset.json";
import logoRotaCariri from "@/assets/logo-rota-cariri.png.asset.json";
import logoBovino from "@/assets/logo-bovino.png.asset.json";
import logoPeiex from "@/assets/logo-peiex.png.asset.json";


export const PROJETOS_COMPETITIVIDADE: ProjetoCompetitividade[] = [
  {
    id: "polo-calcadista",
    nome: "Polo Calçadista do Cariri",
    emoji: "👞",
    logo: logoPoloCalcadista.url,
    cor: "#F5A623",
    clientesAtendidos: 40,
    clientesLabel: "empresas atendidas",
    foco: "Acesso a mercado e regulamentações",
    investimento: 783295.42,
    municipiosAtuacao: ["Barbalha", "Juazeiro do Norte", "Crato"],
    destaques: [],
  },
  {
    id: "rota-turistica",
    nome: "Rota Turística do Cariri",
    emoji: "🧳",
    logo: logoRotaCariri.url,
    cor: "#FFC400",
    clientesAtendidos: 67,
    clientesLabel: "empresas atendidas",
    foco: "Selo de Qualidade Empresarial",
    investimento: 530000,
    municipiosAtuacao: [
      "Barbalha",
      "Juazeiro do Norte",
      "Crato",
      "Santana do Cariri",
      "Nova Olinda",
      "Assaré",
    ],
    destaques: [],
  },
  {
    id: "bovinocultura",
    nome: "Bovinocultura de Leite e Derivados do Cariri",
    emoji: "🐄",
    logo: logoBovino.url,
    cor: "#E6B800",
    clientesAtendidos: 64,
    clientesLabel: "propriedades atendidas",
    foco: "Melhoramento genético",
    investimento: 300000,
    investimentoNota: "superior a",
    municipiosAtuacao: ["Crato", "Assaré", "Farias Brito", "Milagres"],
    destaques: [],
  },
  {
    id: "economia-criativa",
    nome: "Economia Criativa do Cariri",
    emoji: "🎭",
    // logo removida — usar emoji 🎭
    cor: "#FFB347",
    clientesAtendidos: 335,
    clientesLabel: "pessoas impactadas",
    foco: "Estruturação do ecossistema",
    investimento: 650720,
    municipiosAtuacao: [
      "Juazeiro do Norte",
      "Crato",
      "Nova Olinda",
      "Mauriti",
      "Brejo Santo",
      "Barro",
      "Várzea Alegre",
      "Campos Sales",
      "Salitre",
      "Potengi",
      "Assaré",
    ],
    destaques: [],
  },
  {
    id: "peiex",
    nome: "PEIEX — Programa de Qualificação para Exportação",
    emoji: "🌐",
    logo: logoPeiex.url,
    cor: "#D4A017",
    clientesAtendidos: 5,
    clientesLabel: "municípios participantes",
    foco: "Qualificação para exportação",
    investimento: 0,
    municipiosAtuacao: ["Juazeiro do Norte", "Crato", "Barbalha", "Salitre", "Santana do Cariri"],
    destaques: [],
  },
];
