import {
  CLUSTERS,
  rankTop3,
  type MunicipioData,
  type IndicadorMunicipioKey,
} from "@/data/municipios";
import { X, ExternalLink } from "lucide-react";
import { Confete } from "./Confete";
import { InventarioTerritorio } from "./InventarioTerritorio";
import { LogosProgramas } from "./Rodape";
import { projetosDoMunicipio } from "@/data/projetos-municipio";
import { PREMIOS, premiosDoMunicipio } from "@/data/premios";
import { fontesReferencias, notaPesquisaCampo } from "./FontesReferencias";
import { observatorioUrl } from "@/data/observatorio";

interface Props {
  municipio: MunicipioData;
  indicadorFoco?: IndicadorMunicipioKey | null;
  onClose: () => void;
}

const MEDALHAS: Record<1 | 2 | 3, { emoji: string; titulo: string; frase: string }> = {
  1: { emoji: "🥇", titulo: "1º lugar do Cariri", frase: "Referência regional em ambiente de negócios!" },
  2: { emoji: "🥈", titulo: "2º lugar do Cariri", frase: "Um dos municípios mais empreendedores da região!" },
  3: { emoji: "🥉", titulo: "3º lugar do Cariri", frase: "No pódio dos que mais avançam no IAN!" },
};

export function FichaMunicipio({ municipio, onClose }: Props) {
  const cluster = CLUSTERS[municipio.cluster];
  const rank = rankTop3(municipio.id);
  const medalha = rank ? MEDALHAS[rank] : null;
  const eixos = projetosDoMunicipio(municipio.nome);
  const conquistados = premiosDoMunicipio(municipio.nome);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1800AD] animate-in fade-in">
      <Confete active={!!rank} />

      <button
        onClick={onClose}
        className="fixed right-4 top-4 z-[55] grid h-12 w-12 place-items-center rounded-full bg-[#F2F0EE] text-[#1800AD] shadow-xl ring-2 ring-[#F2F0EE]/40 transition hover:scale-105 sm:h-14 sm:w-14"
        aria-label="Fechar"
      >
        <X className="h-6 w-6" strokeWidth={2.75} />
      </button>

      <div
        className="relative overflow-hidden px-4 py-6 sm:px-8 sm:py-8"
        style={{ background: `linear-gradient(135deg, ${cluster.color}66 0%, #12007D 100%)` }}
      >
        {medalha && (
          <div
            className="pointer-events-none absolute -right-4 -top-8 text-[9rem] opacity-15 animate-float"
            aria-hidden
          >
            {medalha.emoji}
          </div>
        )}
        <div className="mx-auto max-w-[1500px] pr-16">
          <div className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-white/80">
            {municipio.nome} · Cariri
          </div>
          <div className="mt-1 flex flex-wrap items-baseline gap-3 sm:gap-4">
            <h2 className="font-display text-3xl font-black leading-tight text-white sm:text-5xl">
              {municipio.nome}
            </h2>
            {medalha && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#B8935A] px-3 py-1.5 shadow-lg animate-in zoom-in">
                <span className="text-lg leading-none">{medalha.emoji}</span>
                <span className="font-display text-[0.7rem] font-black uppercase tracking-wider text-[#1800AD]">
                  {medalha.titulo}
                </span>
              </span>
            )}
            <div className="flex items-baseline gap-2 font-impact italic text-white">
              <span className="text-xl font-black leading-none tabular-nums sm:text-2xl">
                {municipio.nota_total_geral.toFixed(1).replace(".", ",")}
              </span>
              <span className="text-[0.65rem] font-semibold uppercase leading-none tracking-[0.14em] text-white/70 sm:text-[0.75rem]">
                IAN
              </span>
              <span className="mx-1 text-[0.6rem] text-white/40" aria-hidden>
                |
              </span>
              <span className="text-[0.65rem] font-semibold uppercase leading-none tracking-[0.14em] text-white/70 sm:text-[0.75rem]">
                IAN UF 42,30
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1500px] space-y-8 px-4 py-6 sm:px-8 sm:py-10">
        <section>
          <div className="mb-5 flex items-center justify-between">
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-[#F2F0EE]/60">
              Eixos Integrados
            </h3>
            <span className="text-[0.6rem] font-semibold uppercase tracking-wider text-[#F2F0EE]/40 sm:text-[0.65rem] lg:hidden">
              Arraste para explorar
            </span>
          </div>

          <div className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-4 lg:overflow-visible lg:px-0">
            {eixos.map((eixo) => (
              <div
                key={eixo.key}
                className="flex w-[86vw] shrink-0 snap-center flex-col rounded-2xl bg-white p-4 shadow-lg shadow-black/10 sm:w-[52vw] md:w-[34vw] lg:h-[420px] lg:w-auto lg:overflow-hidden"

                style={{ borderTop: `4px solid ${eixo.cor}` }}
              >
                <div className="mb-3 flex items-center gap-2.5">
                  <span
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-base"
                    style={{ background: `${eixo.cor}22`, color: eixo.cor }}
                    aria-hidden
                  >
                    {eixo.emoji}
                  </span>
                  <span
                    className="min-w-0 font-display text-[0.72rem] font-black uppercase leading-tight tracking-[0.16em]"
                    style={{ color: eixo.cor }}
                  >
                    {eixo.nome}
                  </span>
                </div>

                <div className="flex-1 lg:scrollbar-hide lg:overflow-y-auto lg:pr-1">
                  {eixo.projetos.length === 0 ? (
                    <p className="rounded-xl bg-[#F2F0EE] p-3 text-[0.72rem] leading-snug text-[#131C23]/70">
                      Nenhum projeto deste eixo registrado no município até 2025.
                    </p>
                  ) : (
                    <ul className="space-y-2">
                      {eixo.projetos.map((p, i) => (
                        <li key={p.id}>
                          {p.grupo && p.grupo !== eixo.projetos[i - 1]?.grupo && (
                            <span
                              className="mb-1.5 mt-3 block font-display text-[0.6rem] font-black uppercase tracking-[0.16em]"
                              style={{ color: eixo.cor }}
                            >
                              {p.grupo}
                            </span>
                          )}
                          <span
                            className="flex items-start gap-2.5 rounded-xl bg-[#F2F0EE] p-2.5 transition hover:bg-[#E8E6E4]"
                          >
                            {p.logo ? (
                              <span className="grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-md bg-white p-1">
                                <img src={p.logo} alt="" className="h-full w-full object-contain" />
                              </span>
                            ) : (
                              <span
                                className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-base"
                                style={{ background: `${eixo.cor}22` }}
                              >
                                {p.emoji ?? "•"}
                              </span>
                            )}
                            <span className="min-w-0">
                              <span className="block text-[0.78rem] font-semibold leading-tight text-[#131C23]">
                                {p.nome}
                              </span>
                              {p.detalhe && (
                                <span className="mt-0.5 block text-[0.65rem] leading-snug text-[#131C23]/70">
                                  {p.detalhe}
                                </span>
                              )}
                            </span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {eixo.key === "ambiente_negocios" && (
                  <a
                    href="https://sebrae.com.br/subsites/cidade-empreendedora"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 self-start rounded-xl bg-[#1800AD] px-3 py-2 text-[0.7rem] font-semibold text-white shadow-md transition hover:bg-[#12007D] hover:shadow-lg"
                  >
                    Cidade empreendedora
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-5">
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-[#F2F0EE]/60">
              Programas e projetos
            </h3>
          </div>

          <LogosProgramas compact municipio={municipio.nome} />
        </section>

        <InventarioTerritorio municipioNome={municipio.nome} cor={cluster.color} />

        <section>
          <div className="mb-5">
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-[#F2F0EE]/60">
              Prêmios e reconhecimentos
            </h3>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5">
            {PREMIOS.filter((p) => p.logo).map((premio) => {
              const tem = conquistados.has(premio.id);
              return (
                <span
                  key={premio.id}
                  className={`relative grid h-20 w-48 place-items-center rounded-2xl bg-[#F2F0EE] px-4 ring-[3px] transition hover:scale-[1.03] ${
                    tem ? "ring-[#22C55E]" : "ring-[#EF4444]/70"
                  }`}

                  title={`${premio.nome} — ${tem ? "conquistado" : "ainda não conquistado"}`}
                >
                  <span
                    className={`absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full text-[0.7rem] font-black text-white shadow-md ${
                      tem ? "bg-[#22C55E]" : "bg-[#EF4444]"
                    }`}
                    aria-hidden
                  >
                    {tem ? "✓" : "✕"}
                  </span>
                  <img
                    src={premio.logo}
                    alt={premio.nome}
                    loading="lazy"
                    className={`max-h-12 w-auto max-w-full object-contain sm:max-h-14 ${tem ? "" : "opacity-45 grayscale"}`}
                  />
                </span>
              );
            })}
          </div>
        </section>

        <section>
          <h3 className="text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-white/70">
            Links Importantes
          </h3>

          <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {fontesReferencias
              .filter((f) => f.id !== "relatorio-gestao" && f.id !== "revista-comunica")
              .map((f) => (
              <a
                key={f.titulo}
                href={f.id === "observatorio" ? observatorioUrl(municipio.nome) : f.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 rounded-2xl bg-white/95 px-3 py-2.5 transition hover:bg-[#D6C8F5] hover:shadow-md"
              >
                <img
                  src={f.logo}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  className="h-6 w-auto max-w-[4.5rem] shrink-0 object-contain"
                />
                <span className="min-w-0 flex-1 text-[0.7rem] font-semibold leading-snug text-[#12007D]">
                  {f.titulo}
                </span>
                <ExternalLink className="h-3 w-3 shrink-0 text-[#1800AD]/40 transition group-hover:text-[#1800AD]" />
              </a>
            ))}
          </div>

          <p className="mt-3 max-w-3xl text-[0.65rem] leading-relaxed text-white/60">
            {notaPesquisaCampo}
          </p>
        </section>
      </div>
    </div>
  );
}
