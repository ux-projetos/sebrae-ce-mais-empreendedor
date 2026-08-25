// Dados REAIS — municipios-dados.json (planilha "Dados_cidade_empreendedora" do Sebrae Cariri).
import raw from "./municipios-dados.json";
import indicadoresMeta from "./indicadores-metadata.json";

export type ClusterId =
  | "campos-sales"
  | "crato"
  | "juazeiro"
  | "missao-velha"
  | "aurora-barro"
  | "varzea-alegre";

export const CLUSTERS: Record<ClusterId, { nome: string; color: string }> = {
  "campos-sales": { nome: "Campos Sales", color: "#F37022" },
  crato: { nome: "Crato", color: "#FBA71A" },
  juazeiro: { nome: "Juazeiro do Norte", color: "#00B36B" },
  "missao-velha": { nome: "Missão Velha / Brejo Santo", color: "#1994D2" },
  "aurora-barro": { nome: "Aurora / Barro", color: "#006738" },
  "varzea-alegre": { nome: "Várzea Alegre / Farias Brito", color: "#2E3092" },
};

// Cluster mapping alinhado à arte de referência do Sebrae Cariri
const CLUSTER_OF: Record<string, ClusterId> = {
  "Campos Sales": "campos-sales",
  Araripe: "campos-sales",
  Salitre: "campos-sales",
  Potengi: "campos-sales",
  Assaré: "campos-sales",

  Crato: "crato",
  "Nova Olinda": "crato",
  "Santana do Cariri": "crato",
  Altaneira: "crato",
  Barbalha: "crato",

  "Juazeiro do Norte": "juazeiro",

  "Missão Velha": "missao-velha",
  Abaiara: "missao-velha",
  "Brejo Santo": "missao-velha",
  Mauriti: "missao-velha",
  Milagres: "missao-velha",
  Porteiras: "missao-velha",
  Jardim: "missao-velha",
  Jati: "missao-velha",
  Penaforte: "missao-velha",

  Aurora: "aurora-barro",
  Barro: "aurora-barro",

  "Várzea Alegre": "varzea-alegre",
  "Farias Brito": "varzea-alegre",
  Granjeiro: "varzea-alegre",
  Caririaçu: "varzea-alegre",
};

const NOME_CANONICO: Record<string, string> = {
  Jatí: "Jati",
  "Jatí ": "Jati",
};

export const INDICADOR_KEYS_MUNICIPIO = [
  "salas_empreendedor",
  "cultura_empreendedora",
  "compras_publicas_acesso_credito",
  "inclusao_socioprodutiva",
  "identidade_vocacoes_mercado",
  "gestao_politicas_publicas",
  "liderancas_governanca",
  "inovacao",
  "resiliencia_climatica_sustentabilidade",
  "simplificacao",
] as const;

export type IndicadorMunicipioKey = (typeof INDICADOR_KEYS_MUNICIPIO)[number];

export interface MunicipioData {
  id: string;
  nome: string;
  cluster: ClusterId;
  // Notas por indicador (pontos brutos, escala varia por indicador)
  salas_empreendedor: number;
  cultura_empreendedora: number;
  compras_publicas_acesso_credito: number;
  inclusao_socioprodutiva: number;
  identidade_vocacoes_mercado: number;
  gestao_politicas_publicas: number;
  liderancas_governanca: number;
  inovacao: number;
  resiliencia_climatica_sustentabilidade: number;
  simplificacao: number;
  // Totais IAN oficiais
  nota_total_validados: number;
  media_uf_validados: number;
  nota_total_geral: number;
  media_uf_geral: number;
  // Contexto socioeconômico (Observatório Setorial e Territorial, base 2025)
  populacao: number;
  empregados: number;
  empresas_ativas: number;
  empresas_atendidas: number;
  remuneracao_media: number;
  pib: number; // PIB 2021 em R$ mil (IBGE)
}

// PIB Municipal 2021 (IBGE) — em R$ mil
const PIB_2021: Record<string, number> = {
  "Juazeiro do Norte": 5114793,
  Crato: 1871587,
  Barbalha: 1345205,
  "Brejo Santo": 817034,
  Mauriti: 517496,
  "Missão Velha": 515937,
  "Várzea Alegre": 468101,
  Jardim: 294154,
  "Campos Sales": 292357,
  Milagres: 287223,
  Caririaçu: 253127,
  Barro: 242027,
  Assaré: 237259,
  Aurora: 216792,
  Araripe: 207982,
  "Farias Brito": 202248,
  Porteiras: 186375,
  "Nova Olinda": 163381,
  Salitre: 159284,
  "Santana do Cariri": 159277,
  Jati: 129729,
  Penaforte: 122162,
  Abaiara: 117971,
  Potengi: 110570,
  Altaneira: 74654,
  Granjeiro: 51337,
};

const slug = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");

interface RawMunicipio {
  municipio: string;
  salas_empreendedor: number;
  cultura_empreendedora: number;
  inclusao_socioprodutiva: number;
  identidade_vocacoes_mercado: number;
  gestao_politicas_publicas: number;
  liderancas_governanca: number;
  inovacao: number;
  resiliencia_climatica_sustentabilidade: number;
  simplificacao: number;
  compras_publicas_acesso_credito: number;
  nota_total_validados: number;
  media_uf_validados: number;
  nota_total_geral: number;
  media_uf_geral: number;
  numero_empresas_atendidas_sebrae: number;
  numero_empresas_ativas: number;
  populacao_ibge: number;
  numero_empregados: number;
  remuneracao_media_trabalhador: number;
}

interface RawFile {
  municipios: RawMunicipio[];
  redeAtendimento: {
    empresas_atendidas_ep_mei_me: number;
    agentes_de_campo: number;
    empresas_atendidas_ali_produtividade_rural: number;
    percentual_receita_gerada_empresas_beneficiadas: string;
    nps_recomendacao_sebrae: string;
    percentual_publico_feminino: string;
    tempo_medio_abertura_empresas_horas: number;
    fonte: string;
  };
}
const RAW = raw as RawFile;

export const MUNICIPIOS: MunicipioData[] = RAW.municipios.map((m) => {
  const nome = NOME_CANONICO[m.municipio] ?? m.municipio;
  const cluster = CLUSTER_OF[nome];
  if (!cluster) throw new Error(`Cluster não mapeado para município: ${nome}`);
  return {
    id: slug(nome),
    nome,
    cluster,
    salas_empreendedor: m.salas_empreendedor,
    cultura_empreendedora: m.cultura_empreendedora,
    compras_publicas_acesso_credito: m.compras_publicas_acesso_credito,
    inclusao_socioprodutiva: m.inclusao_socioprodutiva,
    identidade_vocacoes_mercado: m.identidade_vocacoes_mercado,
    gestao_politicas_publicas: m.gestao_politicas_publicas,
    liderancas_governanca: m.liderancas_governanca,
    inovacao: m.inovacao,
    resiliencia_climatica_sustentabilidade: m.resiliencia_climatica_sustentabilidade,
    simplificacao: m.simplificacao,
    nota_total_validados: m.nota_total_validados,
    media_uf_validados: m.media_uf_validados,
    nota_total_geral: m.nota_total_geral,
    media_uf_geral: m.media_uf_geral,
    populacao: m.populacao_ibge,
    empregados: m.numero_empregados,
    empresas_ativas: m.numero_empresas_ativas,
    empresas_atendidas: m.numero_empresas_atendidas_sebrae,
    remuneracao_media: m.remuneracao_media_trabalhador,
    pib: PIB_2021[nome] ?? 0,
  };
});

// Máximo observado por indicador — usado para normalizar em 0-100% na UI
export const MAX_POR_INDICADOR: Record<IndicadorMunicipioKey, number> =
  INDICADOR_KEYS_MUNICIPIO.reduce(
    (acc, k) => {
      acc[k] = Math.max(...MUNICIPIOS.map((m) => m[k]));
      return acc;
    },
    {} as Record<IndicadorMunicipioKey, number>,
  );

export function pctOf(m: MunicipioData, key: IndicadorMunicipioKey): number {
  const max = MAX_POR_INDICADOR[key] || 1;
  return Math.round((m[key] / max) * 100);
}

export const MEDIA_UF_VALIDADOS = MUNICIPIOS[0].media_uf_validados;
export const MEDIA_UF_GERAL = MUNICIPIOS[0].media_uf_geral;
export const NOTA_MAX_GERAL = 100; // escala percentual usada para a barra do total geral

// Top 3 municípios do Cariri no IAN — ordem oficial definida pelo Sebrae Cariri
const TOP3_ORDEM = ["juazeiro-do-norte", "crato", "varzea-alegre"] as const;
export const TOP3_IAN = TOP3_ORDEM
  .map((id) => MUNICIPIOS.find((m) => m.id === id))
  .filter((m): m is MunicipioData => Boolean(m));
export const TOP3_IAN_IDS = new Set(TOP3_IAN.map((m) => m.id));
export function rankTop3(id: string): 1 | 2 | 3 | null {
  const i = TOP3_IAN.findIndex((m) => m.id === id);
  return i === -1 ? null : ((i + 1) as 1 | 2 | 3);
}

// Rede de Atendimento — regional consolidado
export const REDE_ATENDIMENTO = {
  empresasAtendidas: 8155,
  agentesCampo: 40,
  consultoresAtuantes: 104,
  analistasNegocios: 4,
  empresasALIProdutividadeRural: RAW.redeAtendimento.empresas_atendidas_ali_produtividade_rural,
  crescimentoReceita: RAW.redeAtendimento.percentual_receita_gerada_empresas_beneficiadas,
  nps: "84,6%",
  publicoFeminino: RAW.redeAtendimento.percentual_publico_feminino,
  horasAberturaEmpresa: RAW.redeAtendimento.tempo_medio_abertura_empresas_horas,
  fonte: "Sebrae Regional Cariri 2026",
};


// Metadados dos indicadores (JSON oficial)
interface IndicadorMetaRaw {
  id: string;
  nome: string;
  emoji: string;
  descricaoCurta: string;
  escopo?: string;
  observacao?: string;
}
interface IndicadoresMetaFile {
  ianDefinicao: string;
  investimentoTotalIAN2026: { valor: number; moeda: string; escopo: string };
  investimentoRedeAtendimento: { valor: number; moeda: string };
  investimentoCompetitividade: { valor: number; moeda: string };
  indicadores: IndicadorMetaRaw[];
}
export const INDICADORES_META = indicadoresMeta as IndicadoresMetaFile;
export const IAN_DEFINICAO = INDICADORES_META.ianDefinicao;
export const INVESTIMENTO_IAN_2026 = INDICADORES_META.investimentoTotalIAN2026;
export const INVESTIMENTO_REDE_ATENDIMENTO = INDICADORES_META.investimentoRedeAtendimento;
export const INVESTIMENTO_COMPETITIVIDADE = INDICADORES_META.investimentoCompetitividade;
export const IAN_EXPLICACAO = "O Índice de Ambiente de Negócios (IAN) é a ferramenta do Sebrae para acompanhar, de forma objetiva, a evolução do ambiente de negócios. Calculado a partir de 10 indicadores, ele retrata o quanto cada território avança na construção de um ambiente favorável aos negócios. O IAN compara o desempenho de cada município com a média do Ceará, servindo de bússola para as ações do Sebrae no território.";

// Selo de Referência em Atendimento — Salas do Empreendedor
export type SeloTipo = "diamante" | "ouro" | "prata";
export const SELO_META: Record<SeloTipo, { nome: string; emoji: string; ordem: number }> = {
  diamante: { nome: "Diamante", emoji: "💎", ordem: 1 },
  ouro: { nome: "Ouro", emoji: "🥇", ordem: 2 },
  prata: { nome: "Prata", emoji: "🥈", ordem: 3 },
};
const SELO_BY_NOME: Record<string, SeloTipo> = {
  // Diamante
  Assaré: "diamante",
  Crato: "diamante",
  Jardim: "diamante",
  Jati: "diamante",
  "Juazeiro do Norte": "diamante",
  Penaforte: "diamante",
  "Santana do Cariri": "diamante",
  "Várzea Alegre": "diamante",
  // Ouro
  Altaneira: "ouro",
  Araripe: "ouro",
  "Brejo Santo": "ouro",
  "Campos Sales": "ouro",
  Caririaçu: "ouro",
  Granjeiro: "ouro",
  Mauriti: "ouro",
  "Missão Velha": "ouro",
  Porteiras: "ouro",
  Potengi: "ouro",
  Salitre: "ouro",
  // Prata
  Abaiara: "prata",
  Aurora: "prata",
  Barbalha: "prata",
  "Farias Brito": "prata",
};
export interface SeloMunicipio {
  municipio: MunicipioData;
  selo: SeloTipo;
}
export const SELOS_SALAS_EMPREENDEDOR: SeloMunicipio[] = MUNICIPIOS
  .map((m) => {
    const selo = SELO_BY_NOME[m.nome];
    return selo ? { municipio: m, selo } : null;
  })
  .filter((x): x is SeloMunicipio => x !== null)
  .sort((a, b) => {
    const oa = SELO_META[a.selo].ordem;
    const ob = SELO_META[b.selo].ordem;
    if (oa !== ob) return oa - ob;
    return a.municipio.nome.localeCompare(b.municipio.nome, "pt-BR");
  });

// Lista completa de Salas do Empreendedor — inclui salas adicionais (rural, câmaras
// municipais) e salas sem selo. Ordem: Diamante → Ouro → Prata → Sem selo.
export interface SalaEmpreendedor {
  id: string;
  nome: string;
  municipioId: string;
  selo: SeloTipo | null;
}
const SALAS_EXTRAS: SalaEmpreendedor[] = [
  { id: "barbalha-sala-rural", nome: "Barbalha (Sala Rural)", municipioId: "barbalha", selo: "prata" },
  { id: "barro-camara", nome: "Barro (Câmara Municipal)", municipioId: "barro", selo: null },
  { id: "milagres", nome: "Milagres", municipioId: "milagres", selo: null },
  { id: "salitre-camara", nome: "Salitre (Câmara Municipal)", municipioId: "salitre", selo: null },
];
export const SALAS_EMPREENDEDOR_LIST: SalaEmpreendedor[] = [
  ...SELOS_SALAS_EMPREENDEDOR.map(({ municipio, selo }) => ({
    id: municipio.id,
    nome: municipio.nome,
    municipioId: municipio.id,
    selo: selo as SeloTipo | null,
  })),
  ...SALAS_EXTRAS,
].sort((a, b) => {
  const oa = a.selo ? SELO_META[a.selo].ordem : 99;
  const ob = b.selo ? SELO_META[b.selo].ordem : 99;
  if (oa !== ob) return oa - ob;
  return a.nome.localeCompare(b.nome, "pt-BR");
});
