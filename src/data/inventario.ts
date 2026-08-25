// Bússola do Território — inventário territorial (31 categorias por município).
// Piloto CRAJUBAR completo (Juazeiro do Norte, Crato, Barbalha); demais municípios
// em levantamento progressivo. O arquivo bruto é grande, por isso é carregado
// sob demanda (dynamic import) apenas quando a Bússola é aberta.

export interface ItemInventario {
  nome: string;
  fonteLink: string | null;
}

export type StatusInventario = "completo" | "parcial" | "nao_iniciado";

export interface InventarioFile {
  pilotoCrajubar: string[];
  statusPorMunicipio: Record<string, { statusInventario: StatusInventario; totalItens: number }>;
  inventario: Record<string, Record<string, ItemInventario[]>>;
}

export interface SetorTematico {
  id: string;
  nome: string;
  cor: string;
  emoji: string;
  /** Índices (1-based) das categorias originais que compõem o setor. */
  categorias: number[];
}

// 6 setores temáticos agrupando as 31 categorias originais.
// As categorias são dispostas de forma contígua ao redor da bússola,
// seguindo a ordem: Governança → Produtiva → Conhecimento → Infraestrutura → Cultura → Ambiente.
export const SETORES: SetorTematico[] = [
  { id: "governanca", nome: "Governança e Representação", cor: "#8FB6D9", emoji: "🏛️", categorias: [1, 2, 3, 4, 5] },
  { id: "produtiva", nome: "Organização produtiva e Financeira", cor: "#D9A441", emoji: "💼", categorias: [6, 7, 8, 9, 10, 11, 12] },
  { id: "conhecimento", nome: "Inovação", cor: "#9C6FB0", emoji: "🚀", categorias: [13, 14, 15] },
  { id: "infraestrutura", nome: "Infraestrutura e Produção", cor: "#C08457", emoji: "🏭", categorias: [16, 17, 18, 19, 20, 21, 22] },
  { id: "cultura", nome: "Cultura, Turismo e Identidade", cor: "#E0663C", emoji: "🎨", categorias: [23, 24, 25, 26, 27, 28] },
  { id: "ambiente", nome: "Meio Ambiente", cor: "#7FA86A", emoji: "🌱", categorias: [29, 30, 31] },
];

// Ordem canônica das 31 categorias ao redor da bússola. Cada nome deve
// corresponder exatamente (após normalização) à chave presente no JSON.
export const CATEGORIAS_ORDENADAS: string[] = [
  // Governança e Representação (1–5)
  "Poder Público e Gestão Pública (Secretaria de Desenvolvimento)",
  "Entidades de Representação Empresarial e de Classe",
  "Organizações da Sociedade Civil e Desenvolvimento Social",
  "Governanças Territoriais e Setoriais",
  "Comunicação e Formação de Opinião",
  // Organização Produtiva e Financeira (6–12)
  "Organizações Associativas e Cooperativas",
  "Instituições de Apoio e Desenvolvimento",
  "Sistema S e Serviços Sociais Autônomos",
  "Instituições Financeiras, Crédito e Fomento",
  "Empresas e Unidades Produtivas",
  "Empresas Âncoras e Indutoras",
  "Redes, Arranjos e Aglomerações Produtivas",
  // Educação, Ciência e Inovação (13–15)
  "Ensino Superior, Educação Profissional e Formação",
  "Pesquisa, Ciência, Tecnologia e Inovação",
  "Ecossistema Local de Inovação",
  // Infraestrutura e Produção (16–22)
  "Equipamentos e Infraestruturas Produtivas",
  "Infraestrutura de Armazenamento e Abastecimento",
  "Mercado, Comercialização e Canais de Venda",
  "Feiras, Mercados e Espaços de Comercialização",
  "Infraestrutura Econômica e Logística",
  "Infraestrutura Hídrica e de Suporte à Produção",
  "Ativos Territoriais Econômico-Produtivos",
  // Cultura, Turismo e Identidade (23–28)
  "Cultura, Patrimônio e Memória",
  "Economia Criativa e Produção Cultural",
  "Turismo e Economia da Visitação",
  "Religiosidade e Patrimônio Religioso",
  "Ativos Territoriais Culturais e Simbólicos",
  "Ativos de Propriedade Intelectual e Diferenciação Territorial",
  // Meio Ambiente (29–31)
  "Patrimônio Natural, Ambiental e Geológico",
  "Instituições de Gestão e Conservação Ambiental",
  "Ativos Territoriais Naturais e Ambientais",
];

export interface CategoriaBussola {
  indice: number;
  nome: string;
  setor: SetorTematico;
  itens: ItemInventario[];
}

export interface BussolaMunicipio {
  municipio: string;
  status: StatusInventario;
  totalItens: number;
  categorias: CategoriaBussola[];
  maxItens: number;
}

let cache: InventarioFile | null = null;

export async function loadInventario(): Promise<InventarioFile> {
  if (!cache) {
    const mod = await import("./inventario-territorial.json");
    cache = (mod.default ?? mod) as unknown as InventarioFile;
  }
  return cache;
}

const SETOR_DE_CATEGORIA = new Map<number, SetorTematico>(
  SETORES.flatMap((s) => s.categorias.map((c) => [c, s] as [number, SetorTematico])),
);

const MINUSCULAS = new Set([
  "de","da","do","das","dos","e","em","na","no","nas","nos","a","o","as","os","para","com","por","ao","à","às","aos","del","the",
]);

/** Padroniza a grafia dos ativos: primeira letra sempre maiúscula. */
export function normalizarNome(bruto: string): string {
  const texto = bruto.trim().replace(/\s+/g, " ");
  if (!texto) return texto;
  const semCaixaAlta = /[a-zà-ÿ]/.test(texto)
    ? texto
    : texto
        .toLocaleLowerCase("pt-BR")
        .split(" ")
        .map((p, i) =>
          i > 0 && MINUSCULAS.has(p) ? p : p.charAt(0).toLocaleUpperCase("pt-BR") + p.slice(1),
        )
        .join(" ");
  return semCaixaAlta.charAt(0).toLocaleUpperCase("pt-BR") + semCaixaAlta.slice(1);
}

const MAPA_CANONICO = new Map<string, { indice: number; setor: SetorTematico }>();
CATEGORIAS_ORDENADAS.forEach((nome, i) => {
  const indice = i + 1;
  MAPA_CANONICO.set(normalizarNome(nome), {
    indice,
    setor: SETOR_DE_CATEGORIA.get(indice) ?? SETORES[0],
  });
});

export function bussolaDe(file: InventarioFile, municipio: string): BussolaMunicipio {
  const bruto = file.inventario[municipio] ?? {};
  const status = file.statusPorMunicipio[municipio];

  const categorias: CategoriaBussola[] = Object.entries(bruto)
    .map(([nome, itens]) => {
      const normalizado = normalizarNome(nome);
      const canonico = MAPA_CANONICO.get(normalizado);
      return {
        indice: canonico?.indice ?? 0,
        nome: normalizado,
        setor: canonico?.setor ?? SETORES[0],
        itens: (itens ?? []).map((it) => ({ ...it, nome: normalizarNome(it.nome) })),
      };
    })
    .filter((c) => c.indice > 0)
    .sort((a, b) => a.indice - b.indice);

  return {
    municipio,
    status: status?.statusInventario ?? "nao_iniciado",
    totalItens: status?.totalItens ?? 0,
    categorias,
    maxItens: Math.max(1, ...categorias.map((c) => c.itens.length)),
  };
}

export const STATUS_META: Record<StatusInventario, { rotulo: string; frase: string }> = {
  completo: {
    rotulo: "Território mapeado",
    frase: "Inventário completo nas 31 categorias do ambiente de negócios.",
  },
  parcial: {
    rotulo: "Mapeamento em andamento",
    frase: "Os primeiros ativos já foram catalogados — a bússola segue crescendo.",
  },
  nao_iniciado: {
    rotulo: "Mapeamento em breve",
    frase: "Este território ainda está sendo mapeado — em breve, novas descobertas aqui.",
  },
};
