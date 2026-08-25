import { SELOS_SALAS_EMPREENDEDOR, SELO_META } from "./municipios";
import logoPspe from "@/assets/premio-pspe.png.asset.json";
import logoPsmn from "@/assets/premio-psmn.png.asset.json";
import logoTop100 from "@/assets/premio-top100.png.asset.json";
import logoSeloReferencia from "@/assets/premio-selo-referencia.png.asset.json";
import logoSeloQualidade from "@/assets/premio-selo-qualidade.png.asset.json";
import logoHistorias from "@/assets/premio-historias.png.asset.json";
import logoJornalismo from "@/assets/premio-jornalismo.png.asset.json";
import logoLigaJovem from "@/assets/premio-liga-jovem.png.asset.json";
import logoStartups from "@/assets/premio-startups.png.asset.json";
import logoPni from "@/assets/premio-pni.png.asset.json";

export interface Premio {
  id: string;
  sigla?: string;
  nome: string;
  emoji: string;
  detalhe?: string;
  logo?: string;
}

export const PREMIOS: Premio[] = [
  {
    id: "pspe",
    logo: logoPspe.url,
    sigla: "PSPE",
    nome: "Prêmio Sebrae Prefeitura Empreendedora",
    emoji: "🏛️",
    detalhe: "Reconhece boas práticas das gestões municipais",
  },
  {
    id: "psmn",
    logo: logoPsmn.url,
    sigla: "PSMN",
    nome: "Prêmio Sebrae Mulher de Negócios",
    emoji: "👩‍💼",
    detalhe: "Valoriza a trajetória de mulheres empreendedoras",
  },
  {
    id: "top100",
    logo: logoTop100.url,
    nome: "TOP 100",
    emoji: "💯",
    detalhe: "Destaque entre as melhores práticas de atendimento",
  },
  {
    id: "selo-referencia",
    logo: logoSeloReferencia.url,
    nome: "Selo de Referência em Atendimento",
    emoji: "💎",
    detalhe: "Diamante, Ouro e Prata para as Salas do Empreendedor",
  },
  {
    id: "selo-qualidade",
    logo: logoSeloQualidade.url,
    nome: "Selo de Qualidade Empresarial",
    emoji: "✅",
    detalhe: "Reconhece a excelência na gestão dos pequenos negócios",
  },
  {
    id: "historias",
    logo: logoHistorias.url,
    nome: "Histórias de Quem Atende",
    emoji: "💬",
    detalhe: "Celebra quem faz o atendimento acontecer",
  },
  {
    id: "jornalismo",
    logo: logoJornalismo.url,
    nome: "Prêmio Sebrae de Jornalismo",
    emoji: "📰",
    detalhe: "Reportagens sobre empreendedorismo e pequenos negócios",
  },
  {
    id: "liga-jovem",
    logo: logoLigaJovem.url,
    nome: "Desafio Liga Jovem",
    emoji: "🎯",
    detalhe: "Maratona de inovação para jovens de todo o país",
  },
  {
    id: "startups",
    logo: logoStartups.url,
    nome: "Prêmio Sebrae Startups",
    emoji: "🚀",
    detalhe: "Reconhece as startups mais promissoras",
  },
  {
    id: "pni",
    logo: logoPni.url,
    nome: "Prêmio Nacional de Inovação",
    emoji: "🏆",
    detalhe: "Destaque nacional em práticas inovadoras",
  },
];

/** Selo de Referência em Atendimento conquistado pelo município, se houver. */
export function seloDoMunicipio(nome: string): { emoji: string; nome: string } | null {
  const item = SELOS_SALAS_EMPREENDEDOR.find((s) => s.municipio.nome === nome);
  if (!item) return null;
  const meta = SELO_META[item.selo];
  return { emoji: meta.emoji, nome: `Selo ${meta.nome}` };
}

/** Prêmios conquistados por município (além do Selo de Referência, que vem das Salas). */
const PREMIOS_CONQUISTADOS: Record<string, string[]> = {
  "Juazeiro do Norte": ["pspe", "selo-qualidade", "top100"],
};

/** Conjunto de ids de prêmios que o município possui. */
export function premiosDoMunicipio(nome: string): Set<string> {
  const ids = new Set(PREMIOS_CONQUISTADOS[nome] ?? []);
  if (seloDoMunicipio(nome)) ids.add("selo-referencia");
  return ids;
}
