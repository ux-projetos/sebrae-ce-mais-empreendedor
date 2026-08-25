// Presença dos programas e projetos macro do Sebrae Cariri em cada município.
// Usado no rodapé de logos da ficha do município (check verde / ausência em vermelho).
import { MUNICIPIOS, SELOS_SALAS_EMPREENDEDOR } from "./municipios";
import { PROJETOS_COMPETITIVIDADE } from "./indicadores";
import { PROJETOS_POR_MUNICIPIO } from "./projetos-municipio";
import { premiosDoMunicipio } from "./premios";

const TODOS = MUNICIPIOS.map((m) => m.nome);

const comp = (id: string) =>
  PROJETOS_COMPETITIVIDADE.find((p) => p.id === id)?.municipiosAtuacao ?? [];

const proj = (id: string) =>
  PROJETOS_POR_MUNICIPIO.find((p) => p.id === id)?.municipios ?? [];

const SALAS = SELOS_SALAS_EMPREENDEDOR.map((s) => s.municipio.nome);

/** Municípios atendidos por cada programa macro, indexado pelo nome (alt) da logo. */
export const PROGRAMAS_MUNICIPIOS: Record<string, string[]> = {
  "Territórios Empreendedores": TODOS,
  "Território da Esperança": proj("circuitos-criativos"),
  "Cidade Empreendedora": SALAS,
  "ELI · Ecossistema Local de Inovação": TODOS,
  "Ceará Habitats Digitais": TODOS,
  "Ceará sem Fome": TODOS,
  "ALI Produtividade": TODOS,
  "ALI Rural": TODOS,
  "Sebrae Origens": TODOS,
  JEPP: TODOS,
  Sebraetec: TODOS,
  "Sebrae Delas": proj("sebrae-delas"),
  "Sebrae Startups": proj("startups"),
  SEBRAELAB: proj("sebraelab"),
  "Sebrae Developers": TODOS,
  FAMPE: TODOS,
  "Selo de Qualidade": comp("rota-turistica"),
  "Polo de Calçados": comp("polo-calcadista"),
  "Bovinocultura de Leite": comp("bovinocultura"),
  "Rota Turística do Cariri": comp("rota-turistica"),
  "Sala do Empreendedor": SALAS,
  "Prêmio Sebrae Prefeitura Empreendedora": TODOS.filter((n) =>
    premiosDoMunicipio(n).has("pspe"),
  ),
};

/** O município participa do programa? */
export function municipioTemPrograma(programa: string, municipio: string): boolean {
  return (PROGRAMAS_MUNICIPIOS[programa] ?? []).includes(municipio);
}
