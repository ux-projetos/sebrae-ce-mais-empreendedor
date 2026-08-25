// Brasões oficiais dos municípios do Cariri.
//
// Os arquivos abaixo foram obtidos das versões públicas/oficiais (Wikimedia
// Commons / Wikipédia, sem marca d'água) e ficam servidos localmente em
// /public/brasoes, garantindo carregamento rápido no totem mesmo offline.
//
// Municípios ainda sem arquivo oficial disponível usam o brasão-placeholder
// padronizado (escudo com as iniciais, na cor do cluster). Basta acrescentar a
// URL aqui quando o arquivo chegar — o componente troca automaticamente.

export const BRASOES: Record<string, string> = {
  Abaiara: "/brasoes/abaiara.png",
  Barbalha: "/brasoes/barbalha.png",
  "Brejo Santo": "/brasoes/brejo-santo.png",
  "Campos Sales": "/brasoes/campos-sales.png",
  Caririaçu: "/brasoes/caririacu.jpg",
  Crato: "/brasoes/crato.png",
  "Farias Brito": "/brasoes/farias-brito.png",
  Granjeiro: "/brasoes/granjeiro.png",
  Jardim: "/brasoes/jardim.jpg",
  "Juazeiro do Norte": "/brasoes/juazeiro-do-norte.png",
  Mauriti: "/brasoes/mauriti.jpg",
  Milagres: "/brasoes/milagres.png",
  "Missão Velha": "/brasoes/missao-velha.png",
  Penaforte: "/brasoes/penaforte.png",
  Porteiras: "/brasoes/porteiras.jpg",
  "Várzea Alegre": "/brasoes/varzea-alegre.png",

  // Pendentes de arquivo oficial (mantêm o escudo padronizado):
  // Altaneira, Araripe, Assaré, Aurora, Barro, Jati, Nova Olinda,
  // Potengi, Salitre, Santana do Cariri
};

export function brasaoDe(nome: string): string | null {
  return BRASOES[nome] ?? null;
}

export function iniciaisMunicipio(nome: string): string {
  const palavras = nome
    .split(/\s+/)
    .filter((w) => w.length > 2 && !["dos", "das", "del"].includes(w.toLowerCase()));
  const letras = palavras.slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "");
  return letras.join("") || nome.slice(0, 2).toUpperCase();
}
