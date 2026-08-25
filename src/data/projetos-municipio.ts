// Projetos e programas do Sebrae Cariri por município, agrupados por eixo estratégico.
// Usado na ficha do município: em vez de notas, mostramos o que acontece na cidade.
import { MUNICIPIOS, SELOS_SALAS_EMPREENDEDOR, SELO_META } from "./municipios";
import { PROJETOS_COMPETITIVIDADE, SEBRAETEC_MUNICIPIOS } from "./indicadores";
import { EIXOS, type EixoKey } from "./eixos";

import logoJepp from "@/assets/logo-jepp.png.asset.json";
import logoSebraeDelas from "@/assets/logo-sebrae-delas.png.asset.json";
import logoEcossistemaLocalInovacao from "@/assets/logo-ecossistema-local-inovacao.png.asset.json";
import logoSebraetec from "@/assets/logo-sebraetec.png.asset.json";
import logoSebraeStartups from "@/assets/logo-sebrae-startups.png.asset.json";
import logoSebraelab from "@/assets/logo-sebraelab.png.asset.json";
import logoSala from "@/assets/logo-sala-do-empreendedor.png.asset.json";
import logoTerritoriosEsperanca from "@/assets/logo-territorios-esperanca.png.asset.json";
import logoSabores from "@/assets/logo-sabores-do-cariri.png.asset.json";


const TODOS = MUNICIPIOS.map((m) => m.nome);

export interface ProjetoMunicipio {
  id: string;
  eixo: EixoKey;
  nome: string;
  emoji?: string;
  logo?: string;
  detalhe?: string;
  municipios: string[];
  grupo?: string;
}

const DESPERTAR = [
  "Várzea Alegre",
  "Crato",
  "Assaré",
  "Araripe",
  "Nova Olinda",
  "Altaneira",
  "Campos Sales",
  "Jardim",
  "Barbalha",
  "Caririaçu",
  "Juazeiro do Norte",
  "Brejo Santo",
  "Milagres",
  "Aurora",
  "Barro",
  "Mauriti",
];

const SEBRAE_DELAS = [
  "Juazeiro do Norte",
  "Várzea Alegre",
  "Barro",
  "Granjeiro",
  "Farias Brito",
  "Aurora",
  "Milagres",
  "Campos Sales",
  "Crato",
  "Barbalha",
];

const LEI_INOVACAO = ["Juazeiro do Norte", "Jati", "Barro", "Brejo Santo", "Várzea Alegre"];

const EMS_IMPLANTADO = ["Juazeiro do Norte", "Nova Olinda"];
const EMS_EM_IMPLANTACAO = ["Várzea Alegre", "Barbalha", "Milagres", "Brejo Santo"];
const DEC_IMPLANTADO = ["Várzea Alegre", "Barbalha", "Milagres", "Brejo Santo"];
const DEC_EM_IMPLANTACAO = [
  "Jati",
  "Crato",
  "Farias Brito",
  "Campos Sales",
  "Santana do Cariri",
  "Caririaçu",
];

const CONTRATA_IMPLANTADO = ["Jardim"];
const CONTRATA_EM_IMPLANTACAO = TODOS.filter((n) => !CONTRATA_IMPLANTADO.includes(n));

const MTUR_TURISMO = [
  "Altaneira",
  "Assaré",
  "Aurora",
  "Barbalha",
  "Brejo Santo",
  "Campos Sales",
  "Crato",
  "Farias Brito",
  "Jardim",
  "Juazeiro do Norte",
  "Nova Olinda",
  "Penaforte",
  "Potengi",
  "Salitre",
  "Santana do Cariri",
  "Várzea Alegre",
];

const CRIARCE = [
  "Juazeiro do Norte",
  "Crato",
  "Nova Olinda",
  "Mauriti",
  "Brejo Santo",
  "Barro",
  "Várzea Alegre",
  "Campos Sales",
  "Barbalha",
  "Missão Velha",
];

const SELO_DE: Record<string, string> = Object.fromEntries(
  SELOS_SALAS_EMPREENDEDOR.map(({ municipio, selo }) => [
    municipio.nome,
    `${SELO_META[selo].emoji} Selo ${SELO_META[selo].nome} de Referência em Atendimento`,
  ]),
);

const CULTURA_EMPREENDEDORA_PROJETOS: ProjetoMunicipio[] = [
  {
    id: "jepp",
    eixo: "cultura_empreendedora",
    nome: "JEPP — Jovens Empreendedores, Primeiros Passos",
    logo: logoJepp.url,
    detalhe: "Educação empreendedora nas escolas",
    municipios: TODOS,
  },
  {
    id: "escola-experience",
    eixo: "cultura_empreendedora",
    nome: "Escola Experience Sebrae",
    emoji: "🚀",
    detalhe: "Capacitações e orientações empresariais",
    municipios: TODOS,
  },
  {
    id: "sebrae-delas",
    eixo: "cultura_empreendedora",
    nome: "Sebrae Delas — Programa Plural",
    logo: logoSebraeDelas.url,
    detalhe: "Capacitação de mulheres empreendedoras",
    municipios: SEBRAE_DELAS,
  },
  {
    id: "despertar",
    eixo: "cultura_empreendedora",
    nome: "Despertar",
    emoji: "🌟",
    detalhe: "Despertar empreendedor nas escolas",
    municipios: DESPERTAR,
  },
  {
    id: "supernova",
    eixo: "cultura_empreendedora",
    nome: "Sebrae Supernova",
    emoji: "💫",
    detalhe: "Negócios inovadores para estudantes do ensino superior",
    municipios: TODOS,
  },
];

const CULTURA_ORGANIZACIONAL_PROJETOS: ProjetoMunicipio[] = [
  {
    id: "sebrae-mais",
    eixo: "cultura_organizacional",
    nome: "Programa Sebrae Mais",
    emoji: "🎯",
    detalhe: "Gestão e melhoria contínua nas organizações",
    municipios: TODOS,
  },
  {
    id: "lideranca-gestao",
    eixo: "cultura_organizacional",
    nome: "Liderança e Gestão de Pessoas",
    emoji: "🤝",
    detalhe: "Desenvolvimento de lideranças no território",
    municipios: TODOS,
  },
  {
    id: "transformacao-digital",
    eixo: "cultura_organizacional",
    nome: "Transformação Digital",
    emoji: "💻",
    detalhe: "Inovação e digitalização dos processos empresariais",
    municipios: TODOS,
  },
];

const ECOSSISTEMA_INOVACAO_PROJETOS: ProjetoMunicipio[] = [

  {
    id: "comunidades-inovacao",
    eixo: "ecossistema_inovacao",
    nome: "Comunidades de Inovação",
    emoji: "👾",
    detalhe: "Kariri Valley, Arkade Games, HACKINCARIRI e Expoanime",
    municipios: TODOS,
  },
  {
    id: "comite-inovacao",
    eixo: "ecossistema_inovacao",
    nome: "Comitê Regional de Inovação do Cariri",
    logo: logoEcossistemaLocalInovacao.url,
    detalhe: "54 instituições articuladas",
    municipios: TODOS,
  },
  {
    id: "lei-inovacao",
    eixo: "ecossistema_inovacao",
    nome: "Lei Municipal de Inovação aprovada",
    emoji: "⚖️",
    municipios: LEI_INOVACAO,
  },
  {
    id: "startups",
    eixo: "ecossistema_inovacao",
    nome: "Startups no Cariri",
    logo: logoSebraeStartups.url,
    detalhe: "25 startups no ecossistema regional",
    municipios: ["Crato", "Juazeiro do Norte", "Barbalha", "Missão Velha", "Barro"],
  },
  {
    id: "sebraelab",
    eixo: "ecossistema_inovacao",
    nome: "SEBRAELAB — Residência de Ideação e Validação de Startups",
    logo: logoSebraelab.url,
    detalhe: "Aceleração de ideias e validação de modelos de negócio",
    municipios: ["Juazeiro do Norte", "Crato", "Barbalha"],
  },
];

export const PROJETOS_POR_MUNICIPIO: ProjetoMunicipio[] = [
  // ---------- Rede de Atendimento ----------
  {
    id: "rede-sebrae",
    eixo: "rede_atendimento",
    nome: "Rede de Atendimento Sebrae",
    emoji: "🗺️",
    detalhe: "Agentes de desenvolvimento e atendimento presencial no território",
    municipios: TODOS,
  },

  // ---------- Cultura Empreendedora ----------
  ...CULTURA_EMPREENDEDORA_PROJETOS,

  // ---------- Ecossistema de Inovação ----------
  ...ECOSSISTEMA_INOVACAO_PROJETOS,

  // ---------- Cultura Organizacional ----------
  ...CULTURA_ORGANIZACIONAL_PROJETOS,

  // ---------- Ambiente de Negócios ----------
  ...SELOS_SALAS_EMPREENDEDOR.map(({ municipio }) => ({
    id: `sala-${municipio.id}`,
    eixo: "ambiente_negocios" as EixoKey,
    nome: "Sala do Empreendedor",
    logo: logoSala.url,
    detalhe: SELO_DE[municipio.nome],
    municipios: [municipio.nome],
  })),
  {
    id: "empresa-mais-simples",
    eixo: "ambiente_negocios",
    nome: "Empresa Mais Simples",
    emoji: "🧾",
    detalhe: "Implantado",
    municipios: EMS_IMPLANTADO,
  },
  {
    id: "empresa-mais-simples-implantacao",
    eixo: "ambiente_negocios",
    nome: "Empresa Mais Simples",
    emoji: "🧾",
    detalhe: "Em implantação",
    municipios: EMS_EM_IMPLANTACAO,
  },
  {
    id: "decreto-liberdade",
    eixo: "ambiente_negocios",
    nome: "Lei/ Decreto de Liberdade Econômica",
    emoji: "📜",
    detalhe: "Implantado",
    municipios: DEC_IMPLANTADO,
  },
  {
    id: "decreto-liberdade-implantacao",
    eixo: "ambiente_negocios",
    nome: "Lei/ Decreto de Liberdade Econômica",
    emoji: "📜",
    detalhe: "Em implantação",
    municipios: DEC_EM_IMPLANTACAO,
  },
  {
    id: "paa-pnae",
    eixo: "ambiente_negocios",
    nome: "PAA e PNAE",
    emoji: "🌾",
    detalhe: "Compras públicas da agricultura familiar",
    municipios: TODOS,
  },
  {
    id: "contrata-implantado",
    eixo: "ambiente_negocios",
    nome: "Contrata + Brasil",
    emoji: "🟢",
    detalhe: "Plataforma implantada",
    municipios: CONTRATA_IMPLANTADO,
  },
  {
    id: "contrata-implantacao",
    eixo: "ambiente_negocios",
    nome: "Contrata + Brasil",
    emoji: "🟡",
    detalhe: "Em implantação",
    municipios: CONTRATA_EM_IMPLANTACAO,
  },
  {
    id: "rota-mandiocultura",
    eixo: "ambiente_negocios",
    nome: "Rota da Mandiocultura",
    emoji: "🌱",
    detalhe: "Vocação produtiva do território",
    municipios: [
      "Salitre",
      "Campos Sales",
      "Araripe",
      "Assaré",
      "Potengi",
      "Santana do Cariri",
      "Nova Olinda",
      "Crato",
      "Farias Brito",
      "Mauriti",
    ],
  },
  {
    id: "mtur",
    eixo: "ambiente_negocios",
    nome: "Mapa do Turismo Brasileiro · MTur",
    emoji: "🧭",
    detalhe: "Município em região turística oficial",
    municipios: MTUR_TURISMO,
  },
  {
    id: "criarce",
    eixo: "ambiente_negocios",
    nome: "CRIARCE — Artesanato",
    emoji: "🧵",
    municipios: CRIARCE,
  },
  {
    id: "circuitos-criativos",
    eixo: "ambiente_negocios",
    nome: "Circuitos Criativos",
    logo: logoTerritoriosEsperanca.url,
    municipios: ["Assaré", "Potengi", "Salitre"],
  },
  {
    id: "polo-gastronomico",
    eixo: "ambiente_negocios",
    nome: "Polo Gastronômico",
    logo: logoSabores.url,
    municipios: ["Barbalha"],
  },

  {
    id: "mercados-publicos",
    eixo: "ambiente_negocios",
    nome: "Revitalização de Mercados Públicos",
    emoji: "🏪",
    municipios: ["Várzea Alegre", "Crato"],
  },
  {
    id: "comunidades-empreendedoras",
    eixo: "ambiente_negocios",
    nome: "Comunidades Empreendedoras",
    emoji: "🤝",
    municipios: ["Barro", "Salitre", "Potengi", "Assaré", "Várzea Alegre", "Crato", "Santana do Cariri"],
  },

  // ---------- Competitividade ----------
  ...PROJETOS_COMPETITIVIDADE.map((p) => ({
    id: p.id,
    eixo: "competitividade" as EixoKey,
    nome: p.nome,
    emoji: p.emoji,
    logo: p.logo,
    detalhe: p.id === "peiex" ? undefined : `${p.clientesAtendidos} ${p.clientesLabel}`,
    municipios: p.municipiosAtuacao,
    grupo: p.id === "peiex" ? "Programa de Internacionalização" : undefined,
  })),
  ...SEBRAETEC_MUNICIPIOS.map((s) => ({
    id: `sebraetec-${s.municipio}`,
    eixo: "competitividade" as EixoKey,
    nome: "Sebraetec",
    logo: logoSebraetec.url,
    detalhe: `${s.empresasBeneficiadas} empresas beneficiadas · ${s.contratacoes} contratações`,
    municipios: [s.municipio],
  })),
  {
    id: "sebraetec-geral",
    eixo: "competitividade" as EixoKey,
    nome: "Sebraetec",
    logo: logoSebraetec.url,
    detalhe: "Serviços de inovação e tecnologia para empresas",
    municipios: TODOS.filter((n) => !SEBRAETEC_MUNICIPIOS.some((s) => s.municipio === n)),
  },


  // ---------- Ambiente de Negócios (extensão) ----------
  // Replicamos Cultura Empreendedora e Inovação dentro do Ambiente de Negócios
  ...ECOSSISTEMA_INOVACAO_PROJETOS.map((p) => ({
    ...p,
    id: `${p.id}-an`,
    eixo: "ambiente_negocios" as EixoKey,
    grupo: "Ecossistema de Inovação",
  })),
  ...CULTURA_EMPREENDEDORA_PROJETOS.map((p) => ({
    ...p,
    id: `${p.id}-an`,
    eixo: "ambiente_negocios" as EixoKey,
    grupo: "Cultura Empreendedora",
  })),
];

export interface EixoComProjetos {
  key: EixoKey;
  nome: string;
  cor: string;
  emoji: string;
  projetos: ProjetoMunicipio[];
}

export function projetosDoMunicipio(nome: string): EixoComProjetos[] {
  // Cultura Organizacional existe apenas na tela inicial, não por município.
  return EIXOS.filter((e) => e.key !== "cultura_organizacional").map((e) => ({
    key: e.key,
    nome: e.nome,
    cor: e.cor,
    emoji: e.emoji,
    projetos: PROJETOS_POR_MUNICIPIO.filter(
      (p) => p.eixo === e.key && p.municipios.includes(nome),
    ),
  }));
}
