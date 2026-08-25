// Links do Observatório Setorial e Territorial do Sebrae por município do Cariri.
const BASE = "https://observatorio.sebrae.com.br/profile/geo/";

const SLUGS: Record<string, string> = {
  Crato: "crato",
  "Juazeiro do Norte": "juazeiro-do-norte",
  Barbalha: "barbalha",
  "Missão Velha": "missao-velha",
  "Nova Olinda": "nova-olinda-2309201",
  Caririaçu: "caririacu",
  Altaneira: "altaneira",
  Jardim: "jardim",
  "Farias Brito": "farias-brito",
  Abaiara: "abaiara",
  "Várzea Alegre": "varzea-alegre",
  Araripe: "araripe",
  Aurora: "aurora",
  Assaré: "assare",
  Barro: "barro",
  "Brejo Santo": "brejo-santo",
  "Campos Sales": "campos-sales",
  Granjeiro: "granjeiro",
  Jati: "jati",
  Mauriti: "mauriti",
  Milagres: "milagres",
  Salitre: "salitre",
  "Santana do Cariri": "santana-do-cariri",
  Penaforte: "penaforte",
  Porteiras: "porteiras",
  Potengi: "potengi",
};

export function observatorioUrl(municipio: string): string {
  const slug = SLUGS[municipio];
  return slug ? `${BASE}${slug}` : "https://observatorio.sebrae.com.br/";
}
