import logoCidade from "@/assets/logo-cidade-empreendedora.png.asset.json";
import logoTerritorios from "@/assets/logo-territorios-empreendedores.png.asset.json";
import logoEsperanca from "@/assets/logo-territorios-esperanca.png.asset.json";
import logoPremio from "@/assets/logo-premio-prefeitura-empreendedora.png.asset.json";
import logoOrigens from "@/assets/logo-sebrae-origens.png.asset.json";
import logoSala from "@/assets/logo-sala-do-empreendedor.png.asset.json";
import logoEli from "@/assets/logo-ecossistema-local-inovacao.png.asset.json";
import logoHabitats from "@/assets/logo-ceara-habitats.png.asset.json";
import logoSemFome from "@/assets/logo-ceara-sem-fome.png.asset.json";
import logoAliProd from "@/assets/logo-ali-produtividade.png.asset.json";
import logoAliRural from "@/assets/logo-ali-rural.png.asset.json";
import logoDevelopers from "@/assets/logo-sebrae-developers.png.asset.json";
import logoFampe from "@/assets/logo-fampe.png.asset.json";
import logoJepp from "@/assets/logo-jepp.png.asset.json";
import logoSebraetec from "@/assets/logo-sebraetec.png.asset.json";
import logoDelas from "@/assets/logo-sebrae-delas.png.asset.json";
import logoStartups from "@/assets/logo-sebrae-startups.png.asset.json";
import logoSebraelab from "@/assets/logo-sebraelab.png.asset.json";
import logoSeloQualidade from "@/assets/selo-qualidade-empresarial.png.asset.json";
import logoPoloCalcadista from "@/assets/logo-polo-calcadista.png.asset.json";
import logoBovinocultura from "@/assets/logo-bovino.png.asset.json";
import logoRotaCariri from "@/assets/logo-rota-cariri.png.asset.json";
import { municipioTemPrograma } from "@/data/programas-municipio";


const LOGOS: { src: string; alt: string; ajustada?: boolean }[] = [
  { src: logoTerritorios.url, alt: "Territórios Empreendedores" },
  { src: logoEsperanca.url, alt: "Território da Esperança", ajustada: true },
  { src: logoCidade.url, alt: "Cidade Empreendedora" },
  { src: logoEli.url, alt: "ELI · Ecossistema Local de Inovação" },
  { src: logoHabitats.url, alt: "Ceará Habitats Digitais", ajustada: true },
  { src: logoSemFome.url, alt: "Ceará sem Fome" },
  { src: logoAliProd.url, alt: "ALI Produtividade" },
  { src: logoAliRural.url, alt: "ALI Rural" },
  { src: logoOrigens.url, alt: "Sebrae Origens" },
  { src: logoJepp.url, alt: "JEPP" },
  { src: logoSebraetec.url, alt: "Sebraetec" },
  { src: logoDelas.url, alt: "Sebrae Delas" },
  { src: logoStartups.url, alt: "Sebrae Startups", ajustada: true },
  { src: logoSebraelab.url, alt: "SEBRAELAB", ajustada: true },
  { src: logoDevelopers.url, alt: "Sebrae Developers" },
  { src: logoFampe.url, alt: "FAMPE", ajustada: true },
  { src: logoSeloQualidade.url, alt: "Selo de Qualidade", ajustada: true },
  { src: logoPoloCalcadista.url, alt: "Polo de Calçados" },
  { src: logoBovinocultura.url, alt: "Bovinocultura de Leite", ajustada: true },
  { src: logoRotaCariri.url, alt: "Rota Turística do Cariri", ajustada: true },
  { src: logoSala.url, alt: "Sala do Empreendedor" },
  { src: logoPremio.url, alt: "Prêmio Sebrae Prefeitura Empreendedora" },
];


export function LogosProgramas({
  compact = false,
  municipio,
}: {
  compact?: boolean;
  municipio?: string;
}) {
  return (
    <div
      className={`grid w-full ${
        compact
          ? "grid-cols-4 gap-2 sm:grid-cols-5"
          : "grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10"
      }`}
    >
      {LOGOS.map((l) => {
        const tem = municipio ? municipioTemPrograma(l.alt, municipio) : null;
        return (
          <span
            key={l.alt}
            className={`relative flex w-full items-center justify-center rounded-xl bg-[#F2F0EE] transition hover:scale-[1.03] ${
              compact ? "h-12" : "h-12 sm:h-14 lg:h-16"
            } ${tem === null ? "" : tem ? "ring-2 ring-[#22C55E]" : "ring-2 ring-[#EF4444]/70"}`}
            title={
              tem === null
                ? l.alt
                : `${l.alt} — ${tem ? "presente no município" : "sem atuação registrada"}`
            }
          >
            {tem !== null && (
              <span
                className={`absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full text-[0.6rem] font-black text-white shadow-md ${
                  tem ? "bg-[#22C55E]" : "bg-[#EF4444]"
                }`}
                aria-hidden
              >
                {tem ? "✓" : "✕"}
              </span>
            )}
            <img
              src={l.src}
              alt={l.alt}
              loading="lazy"
              className={`mx-auto object-contain ${
                l.ajustada
                  ? compact
                    ? "max-h-[44%] max-w-[56%]"
                    : "max-h-[40%] max-w-[52%]"
                  : compact
                    ? "max-h-[65%] max-w-[80%]"
                    : "max-h-[60%] max-w-[75%]"
              } ${tem === false ? "opacity-45 grayscale" : ""}`}
            />
          </span>
        );
      })}
    </div>
  );
}


export function Rodape() {
  return (
    <footer className="rounded-3xl bg-[#2814C2] p-5 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.9)] sm:p-6">
      <div className="text-[0.6rem] font-semibold uppercase tracking-[0.26em] text-[#B9C6FF]">
        Programas e projetos macro do Sebrae Cariri
      </div>

      <div className="mt-4">
        <LogosProgramas />
      </div>

      <p className="mt-5 text-[0.7rem] leading-relaxed text-[#F2F0EE]/55">
        Dados: Observatório Setorial e Territorial · Sebrae Ceará — Base 2025 · Relatório de Gestão
        Anual 2025 do Sebrae Regional Cariri.
      </p>
    </footer>
  );
}
