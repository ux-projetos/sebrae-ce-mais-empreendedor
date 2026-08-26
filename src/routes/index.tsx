import { createFileRoute } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import fotoCarla from "@/assets/autora-carla.png.asset.json";
import fotoElizangela from "@/assets/autora-elizangela.png.asset.json";

const AUTORAS = [
  { nome: "Carla Araújo Santos", cargo: "Analista Técnica do Sebrae Cariri", papel: "Estruturação dos dados, Desenvolvimento e implementação da plataforma", foto: fotoCarla.url },
  { nome: "Elizangela Melo de Freitas Andrade", cargo: "Articuladora do Sebrae Cariri", papel: "Idealização e concepção estratégica", foto: fotoElizangela.url },
];


import { LogosInstitucionais } from "@/components/painel/Logo";
import { MapaCariri } from "@/components/painel/MapaCariri";
import { PainelEixos } from "@/components/painel/PainelEixos";
import { PainelEixoDetalhe } from "@/components/painel/PainelEixoDetalhe";
import { PainelIndicadorDetalhe } from "@/components/painel/PainelIndicadorDetalhe";
import { FichaMunicipio } from "@/components/painel/FichaMunicipio";
import { FontesReferencias } from "@/components/painel/FontesReferencias";
import { PropositoSebrae } from "@/components/painel/PropositoSebrae";


import { MUNICIPIOS, type MunicipioData, type IndicadorMunicipioKey } from "@/data/municipios";
import { isIndicadorMunicipio, PROJETOS_COMPETITIVIDADE, type IndicadorKey } from "@/data/indicadores";
import { EIXOS, type EixoKey } from "@/data/eixos";
import { DestaqueMapaContext, type DestaqueMapa } from "@/components/painel/destaque-mapa";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ceará mais Empreendedor 2.0 · Painel Sebrae Cariri" },
      {
        name: "description",
        content:
          "Painel interativo do Sebrae Ceará: 6 eixos integrados, o IAN dos 26 municípios do Cariri e a Bússola do Território com o inventário de ativos de cada cidade.",
      },
      { property: "og:title", content: "Ceará mais Empreendedor 2.0 · Painel Sebrae Cariri" },
      {
        property: "og:description",
        content:
          "6 eixos integrados, o IAN dos 26 municípios do Cariri e a Bússola do Território — a evolução dos pequenos negócios está diretamente relacionada ao desenvolvimento territorial.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Painel,
});

const MUNICIPIOS_DE_PROJETOS = new Set(
  PROJETOS_COMPETITIVIDADE.flatMap((p) => p.municipiosAtuacao),
);

function municipiosDoEixo(key: EixoKey): string[] {
  const eixo = EIXOS.find((e) => e.key === key)!;
  return MUNICIPIOS.filter((m) =>
    eixo.indicadores.some((ind) => {
      if (ind === "rede_atendimento") return true;
      if (ind === "competitividade") return MUNICIPIOS_DE_PROJETOS.has(m.nome);
      return (m[ind as IndicadorMunicipioKey] ?? 0) > 0;
    }),
  ).map((m) => m.nome);
}

const COBERTURA = Object.fromEntries(
  EIXOS.map((e) => [e.key, municipiosDoEixo(e.key).length]),
) as Record<EixoKey, number>;

function Painel() {
  const [eixoKey, setEixoKey] = useState<EixoKey | null>(null);
  const [indicadorKey, setIndicadorKey] = useState<IndicadorKey | null>(null);
  const [municipioId, setMunicipioId] = useState<string | null>(null);
  const [projetoAtivo, setProjetoAtivo] = useState<string | null>(null);
  const [vitrineIdx, setVitrineIdx] = useState(0);
  const [isIdle, setIsIdle] = useState(true);
  const [destaque, setDestaque] = useState<DestaqueMapa | null>(null);

  const destaqueCtx = useMemo(
    () => ({
      destaque,
      toggleDestaque: (d: DestaqueMapa) => {
        setDestaque((cur) => (cur?.id === d.id ? null : d));
      },
      limparDestaque: () => setDestaque(null),
    }),
    [destaque],
  );


  useEffect(() => {
    if (!isIdle) return;
    const t = setInterval(() => {
      setVitrineIdx((i) => (i + 1) % MUNICIPIOS.length);
    }, 2200);
    return () => clearInterval(t);
  }, [isIdle]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    const wake = () => {
      setIsIdle(false);
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => setIsIdle(true), 30_000);
    };
    const events: (keyof WindowEventMap)[] = ["pointerdown", "keydown", "touchstart"];
    events.forEach((e) => window.addEventListener(e, wake));
    return () => {
      events.forEach((e) => window.removeEventListener(e, wake));
      if (timer) clearTimeout(timer);
    };
  }, []);

  const municipio = useMemo(
    () => (municipioId ? (MUNICIPIOS.find((m) => m.id === municipioId) ?? null) : null),
    [municipioId],
  );

  const eixo = eixoKey ? EIXOS.find((e) => e.key === eixoKey)! : null;
  const eixoMunicipios = useMemo(
    () => (eixoKey ? municipiosDoEixo(eixoKey) : null),
    [eixoKey],
  );

  const handleSelectEixo = (k: EixoKey | null) => {
    setEixoKey(k);
    setIndicadorKey(null);
    setProjetoAtivo(null);
  };

  const handleSelectMunicipio = (m: MunicipioData) => setMunicipioId(m.id);

  return (
    <DestaqueMapaContext.Provider value={destaqueCtx}>
    <main className="min-h-[100dvh] px-3 py-3 sm:px-4 sm:py-4 md:px-8 md:py-6">

      <div className="mx-auto flex min-h-[calc(100dvh-1.5rem)] max-w-[1700px] flex-col gap-4 sm:gap-5">
        <header className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#080B26] to-[#2549E1] p-4 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.9)] sm:rounded-3xl sm:p-6">
          <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <LogosInstitucionais className="pl-1 sm:pl-2 lg:pl-4" />
            <div className="lg:max-w-[58%] lg:text-right">
              <div className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-[#F2F0EE]/50">
                Painel 2.0 · Sebrae Cariri
              </div>
              <PropositoSebrae className="mt-1" />
            </div>
          </div>
        </header>


        <section className="grid items-stretch gap-5 lg:grid-cols-[minmax(0,1fr)_400px]">
          <div className="flex h-full animate-rise items-center justify-center rounded-3xl bg-white p-3 shadow-[0_30px_80px_-45px_rgba(0,0,0,0.8)] sm:p-4">
            <MapaCariri
              onSelect={handleSelectMunicipio}
              selectedMunicipioId={municipioId}
              indicadorAtivo={
                indicadorKey && isIndicadorMunicipio(indicadorKey)
                  ? (indicadorKey as IndicadorMunicipioKey)
                  : null
              }
              projetoAtivo={indicadorKey === "competitividade" ? projetoAtivo : null}
              highlightId={isIdle ? MUNICIPIOS[vitrineIdx]?.id : null}
              eixoMunicipios={eixoMunicipios}
              eixoCor={eixo?.cor ?? null}
            />
          </div>

          <div>
            <PainelEixos eixoAtivo={eixoKey} onSelect={handleSelectEixo} />
          </div>
        </section>

        <FontesReferencias />



        <footer className="rounded-2xl bg-[#FFFFFF] px-4 py-4 text-center shadow-sm sm:rounded-3xl sm:px-6 sm:py-5">
          <div className="mx-auto max-w-3xl">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#1800AD]/70 sm:text-[0.7rem]">
              Desenvolvido em colaboração por
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
              {AUTORAS.map((a) => (
                <div key={a.nome} className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-full bg-white ring-2 ring-[#1800AD]/15 sm:h-14 sm:w-14">
                    <img
                      src={a.foto}
                      alt={a.nome}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </span>
                  <div className="text-left leading-none">
                    <span className="block text-[0.78rem] font-semibold leading-tight text-[#1800AD] sm:text-[0.9rem]">
                      {a.nome}
                    </span>
                    <span className="mt-0.5 block text-[0.65rem] font-normal leading-tight text-[#1800AD]/75 sm:text-[0.75rem]">
                      {a.cargo}
                    </span>
                    <span className="mt-1 block max-w-[15rem] text-[0.6rem] font-medium leading-snug text-[#1800AD]/60 sm:text-[0.68rem]">
                      {a.papel}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="https://www.google.com/maps?q=-7.2194934,-39.3247055"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-[#1800AD] px-4 py-2 text-[0.72rem] font-semibold text-white transition hover:bg-[#3520D9] sm:text-[0.8rem]"
            >
              <MapPin className="h-3.5 w-3.5" />
              Visite o Sebrae Cariri
            </a>

            <p className="mt-2 text-[0.6rem] leading-snug text-[#1800AD]/55">
              Av. Padre Cícero, 2241 — Lj 40 — Santa Tereza · Juazeiro do Norte — CE, 63050-423
            </p>
          </div>
        </footer>

      </div>



      {eixoKey && !indicadorKey && (
        <PainelEixoDetalhe
          eixoKey={eixoKey}
          onClose={() => setEixoKey(null)}
          onSelectMunicipio={(id) => setMunicipioId(id)}
          projetoAtivo={projetoAtivo}
          onSelectProjeto={setProjetoAtivo}
        />
      )}

      {indicadorKey && (
        <PainelIndicadorDetalhe
          indicadorKey={indicadorKey}
          onClose={() => setIndicadorKey(null)}
          onSelectMunicipio={(id) => setMunicipioId(id)}
          projetoAtivo={projetoAtivo}
          onSelectProjeto={setProjetoAtivo}
        />
      )}

      {municipio && (
        <FichaMunicipio
          municipio={municipio}
          indicadorFoco={
            indicadorKey && isIndicadorMunicipio(indicadorKey)
              ? (indicadorKey as IndicadorMunicipioKey)
              : null
          }
          onClose={() => setMunicipioId(null)}
        />
      )}
    </main>
    </DestaqueMapaContext.Provider>

  );
}
