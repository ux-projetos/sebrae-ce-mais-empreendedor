import { ExternalLink } from "lucide-react";

import logoSebrae from "@/assets/logo-sebrae.png.asset.json";
import logoComunica from "@/assets/logo-sebrae-comunica.png.asset.json";
import logoCidade from "@/assets/logo-cidade-empreendedora.png.asset.json";
import logoDataSebrae from "@/assets/logo-datasebrae.png.asset.json";
import logoObservatorio from "@/assets/logo-observatorio-setorial.png.asset.json";
import logoTerritorios from "@/assets/logo-territorios-empreendedores.png.asset.json";

export const fontesReferencias: { id: string; titulo: string; url: string; logo: string }[] = [
  {
    id: "relatorio-gestao",
    titulo: "Relatório Anual de Gestão Sebrae Cariri 2025",
    url: "https://heyzine.com/flip-book/825ad9f0a1.html",
    logo: logoSebrae.url,
  },
  {
    id: "revista-comunica",
    titulo: "Revista Sebrae Comunica",
    url: "https://heyzine.com/flip-book/f2c4cb98b4.html",
    logo: logoComunica.url,
  },
  {
    id: "cidade-empreendedora",
    titulo: "Cidade Empreendedora",
    url: "https://sebrae.com.br/subsites/cidade-empreendedora",
    logo: logoCidade.url,
  },
  {
    id: "datasebrae",
    titulo: "DataSebrae",
    url: "https://datasebrae.com.br/",
    logo: logoDataSebrae.url,
  },
  {
    id: "observatorio",
    titulo: "Observatório Setorial e Territorial",
    url: "https://observatorio.sebrae.com.br/",
    logo: logoObservatorio.url,
  },
  {
    id: "territorios",
    titulo: "Territórios Empreendedores",
    url: "https://sebrae.com.br/subsites/territorios-empreendedores",
    logo: logoTerritorios.url,
  },
];

export const notaPesquisaCampo =
  "Parte dos dados deste painel também vem de pesquisa de campo direta realizada pela ATS e equipe do Sebrae Cariri nos 26 municípios do território.";

export function FontesReferencias() {
  return (
    <>
      <section className="rounded-2xl bg-white px-3 py-3 shadow-[0_20px_60px_-45px_rgba(0,0,0,0.8)] sm:rounded-3xl sm:px-4 sm:py-4">
      <h2 className="text-[0.6rem] font-semibold uppercase tracking-[0.26em] text-[#1800AD]/60">
        Links Importantes
      </h2>

      <div className="mt-2.5 grid gap-1.5 sm:grid-cols-2 xl:grid-cols-3">
        {fontesReferencias.map((f) => (
          <a
            key={f.titulo}
            href={f.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 rounded-2xl bg-[#F2F0EE] px-2.5 py-2 transition hover:bg-[#D6C8F5] hover:shadow-md"
          >
            <img
              src={f.logo}
              alt=""
              aria-hidden
              loading="lazy"
              className="h-6 w-auto max-w-[4.5rem] shrink-0 object-contain"
            />
            <span className="min-w-0 flex-1 text-[0.68rem] font-semibold leading-snug text-[#12007D]">
              {f.titulo}
            </span>
            <ExternalLink className="h-3 w-3 shrink-0 text-[#1800AD]/40 transition group-hover:text-[#1800AD]" />
          </a>
        ))}
      </div>

      <p className="mt-2.5 text-[0.65rem] leading-relaxed text-[#1800AD]/60">{notaPesquisaCampo}</p>
    </section>

    <section className="rounded-2xl bg-white px-3 py-3 shadow-[0_20px_60px_-45px_rgba(0,0,0,0.8)] sm:rounded-3xl sm:px-4 sm:py-4">
      <h2 className="text-[0.6rem] font-semibold uppercase tracking-[0.26em] text-[#1800AD]/60">
        Equipe Sebrae Cariri
      </h2>

      <div className="mt-2.5">
        <a
          href="https://heyzine.com/flip-book/242d32388a.html"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-center gap-2.5 rounded-2xl bg-[#F2F0EE] px-4 py-4 transition hover:bg-[#D6C8F5] hover:shadow-md"
        >
          <img
            src={logoSebrae.url}
            alt=""
            aria-hidden
            loading="lazy"
            className="h-7 w-auto max-w-[5rem] shrink-0 object-contain"
          />
          <span className="text-center text-[0.72rem] font-semibold leading-snug text-[#12007D]">
            Conheça a Equipe Sebrae Cariri
          </span>
          <ExternalLink className="h-3.5 w-3.5 shrink-0 text-[#1800AD]/40 transition group-hover:text-[#1800AD]" />
        </a>
      </div>
    </section>
    </>
  );
}
