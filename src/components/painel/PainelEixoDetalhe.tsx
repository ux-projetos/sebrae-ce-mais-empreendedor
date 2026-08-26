import { useState } from "react";
import { ChevronDown, ExternalLink, X } from "lucide-react";
import { EIXOS, indicadoresDoEixo, type EixoKey } from "@/data/eixos";
import logoCidade from "@/assets/logo-cidade-empreendedora.png.asset.json";
import { ConteudoIndicador } from "./ConteudoIndicador";
import { EIXO_ICONS, INDICADOR_ICONS } from "@/lib/icons";
import { IconBadge } from "./IconBadge";

interface Props {
  eixoKey: EixoKey;
  onClose: () => void;
  onSelectMunicipio: (id: string) => void;
  projetoAtivo: string | null;
  onSelectProjeto: (id: string | null) => void;
}

const ODS_INFO = [
  { numero: 1, nome: "Erradicação da Pobreza", cor: "#E5243B" },
  { numero: 4, nome: "Educação de Qualidade", cor: "#C5192D" },
  { numero: 5, nome: "Igualdade de Gênero", cor: "#FF3A21" },
  { numero: 8, nome: "Trabalho Decente e Crescimento Econômico", cor: "#A21942" },
  { numero: 17, nome: "Parcerias e Meios de Implementação", cor: "#19486A" },
];

interface CaixaCulturaOrganizacional {
  emoji?: string;
  titulo: string;
  texto?: string;
  ods?: number[];
  itens?: string[];
}

/** Conteúdo fixo do eixo Cultura Organizacional (não existe por município). */
const CULTURA_ORGANIZACIONAL_CAIXAS: CaixaCulturaOrganizacional[] = [
  {
    emoji: "🧭",
    titulo: "Desenvolvimento de Lideranças",
    texto: "Formação e fortalecimento das lideranças que conduzem as equipes e os projetos do território.",
  },
  {
    emoji: "🎓",
    titulo: "Qualificação do time Sebrae",
    texto: "Trilhas de aprendizagem contínua para qualificar tecnicamente todo o time.",
  },
  {
    emoji: "📊",
    titulo: "Otimização de Projetos e Processos",
    texto: "Métodos e ferramentas de gestão de projetos aplicados à rotina das entregas.",
  },
  {
    emoji: "🌱",
    titulo: "Sustentabilidade e ESG",
    texto: "Criação de Agenda ESG com ODS prioritários na Regional",
    ods: [1, 4, 5, 8, 17],
  },
  {
    emoji: "💡",
    titulo: "Iniciativas Inovadoras",
    itens: [
      "Sebrae Comunica",
      "Radar de indicadores do Cidade Empreendedora",
      "Conexão Sistema S",
      "Sala do Empreendedor Rural",
      "Plantão Empreendedor",
      "Mini Pool de Estagiários",
      "Revista Sebrae Comunica",
      "Painel Ceará Mais Empreendedor",
    ],
  },
];

export function PainelEixoDetalhe({
  eixoKey,
  onClose,
  onSelectMunicipio,
  projetoAtivo,
  onSelectProjeto,
}: Props) {
  const eixo = EIXOS.find((e) => e.key === eixoKey)!;
  const indicadores = indicadoresDoEixo(eixo);
  /** No eixo Ambiente de Negócios os indicadores ficam em caixas que abrem ao clique. */
  const colapsavel = eixoKey === "ambiente_negocios";
  /** Rede de Atendimento, Ecossistema de Inovação e Cultura Empreendedora não exibem o cabeçalho/descrição do indicador. */
  const semCabecalhoIndicador = eixoKey === "rede_atendimento" || eixoKey === "ecossistema_inovacao" || eixoKey === "cultura_empreendedora" || eixoKey === "competitividade";
  const [aberto, setAberto] = useState<string | null>(null);

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 max-h-[78vh] overflow-hidden rounded-t-3xl bg-[#1800AD] shadow-[0_-30px_80px_-20px_rgba(0,0,0,0.85)] animate-in slide-in-from-bottom md:inset-y-0 md:right-0 md:left-auto md:h-full md:max-h-none md:w-[520px] md:rounded-l-3xl md:rounded-t-none md:slide-in-from-right">
      <div
        className="flex items-start justify-between gap-3 p-5 sm:p-6"
        style={{ background: `linear-gradient(140deg, ${eixo.cor}, transparent 85%)` }}
      >
        <div className="min-w-0">
          <div className="text-[0.6rem] font-semibold uppercase tracking-[0.26em] text-white/70">
            Eixo estratégico
          </div>
          <h2 className="mt-1 flex items-center gap-2.5 font-display text-2xl font-black leading-tight text-white">
            <IconBadge icon={EIXO_ICONS[eixo.key]} className="h-9 w-9" iconClassName="h-5 w-5" rounded="rounded-lg" />
            {eixo.nome}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#1800AD] text-[#F2F0EE] transition hover:bg-black"
          aria-label="Fechar eixo"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="max-h-[calc(78vh-116px)] overflow-y-auto p-5 sm:p-6 md:max-h-[calc(100vh-116px)]">
        <p className="text-sm leading-relaxed text-[#F2F0EE]/75">{eixo.descricao}</p>

        {eixoKey === "cultura_organizacional" && (
          <div className="mt-6 space-y-3">
            {CULTURA_ORGANIZACIONAL_CAIXAS.map((c) => (
              <div key={c.titulo} className="rounded-2xl bg-white p-4">
                <div className="flex items-center gap-3">
                  <span className="shrink-0 text-2xl">{c.emoji}</span>
                  <h3 className="font-display text-sm font-black text-[#12007D]">{c.titulo}</h3>
                </div>
                {c.texto && (
                  <p className="mt-2 text-[0.72rem] leading-relaxed text-[#12007D]/70">{c.texto}</p>
                )}
                {c.ods && c.ods.length > 0 && (
                  <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {c.ods.map((n) => {
                      const o = ODS_INFO.find((x) => x.numero === n);
                      if (!o) return null;
                      return (
                        <div
                          key={o.numero}
                          className="flex items-center gap-2 rounded-xl p-2.5 text-white"
                          style={{ backgroundColor: o.cor }}
                        >
                          <span className="font-display text-xl font-black leading-none">{o.numero}</span>
                          <span className="text-[0.6rem] font-semibold leading-tight">{o.nome}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
                {c.itens && c.itens.length > 0 && (
                  <ul className="mt-3 space-y-1.5">
                    {c.itens.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-[0.72rem] leading-relaxed text-[#12007D]/80"
                      >
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1800AD]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {colapsavel ? (
          <div className="mt-6 space-y-2.5">
            {indicadores.map((ind) => {
              const open = aberto === ind.key;
              return (
                <div key={ind.key} className="overflow-hidden rounded-2xl bg-white">
                  <button
                    onClick={() => setAberto(open ? null : ind.key)}
                    aria-expanded={open}
                    className="flex w-full items-center gap-3 p-4 text-left transition hover:bg-[#F2F0EE]"
                  >
                    <IconBadge icon={INDICADOR_ICONS[ind.key]} className="h-9 w-9" iconClassName="h-5 w-5" rounded="rounded-lg" />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-base font-black leading-tight text-[#12007D]">
                        {ind.nome}
                      </h3>
                    </div>

                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-[#12007D]/50 transition-transform ${open ? "rotate-180" : ""}`}
                    />
                  </button>
                  {open && (
                    <div className="border-t border-[#12007D]/10 bg-[#1800AD] px-4 pb-4 pt-3">
                      <ConteudoIndicador
                        indicadorKey={ind.key}
                        onSelectMunicipio={onSelectMunicipio}
                        projetoAtivo={projetoAtivo}
                        onSelectProjeto={onSelectProjeto}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          indicadores.map((ind) => (
            <section key={ind.key} className="mt-8 border-t border-[#F2F0EE]/10 pt-6 first:border-0">
              {!semCabecalhoIndicador && (
                <div className="flex items-center gap-3">
                  <IconBadge icon={INDICADOR_ICONS[ind.key]} className="h-9 w-9" iconClassName="h-5 w-5" rounded="rounded-lg" />
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-black leading-tight text-[#F2F0EE]">
                      {ind.nome}
                    </h3>
                  </div>

                </div>
              )}
              <div className={semCabecalhoIndicador ? "" : "mt-3"}>
                <ConteudoIndicador
                  indicadorKey={ind.key}
                  onSelectMunicipio={onSelectMunicipio}
                  projetoAtivo={projetoAtivo}
                  onSelectProjeto={onSelectProjeto}
                  showDescricao={!semCabecalhoIndicador}
                />
              </div>
            </section>
          ))
        )}

        {eixoKey === "ambiente_negocios" && (
          <a
            href="https://sebrae.com.br/subsites/cidade-empreendedora"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-5 flex items-center gap-2.5 rounded-2xl bg-[#F2F0EE] px-3 py-2.5 transition hover:bg-[#D6C8F5] hover:shadow-md"
          >
            <img
              src={logoCidade.url}
              alt=""
              aria-hidden
              loading="lazy"
              className="h-6 w-auto max-w-[4.5rem] shrink-0 object-contain"
            />
            <span className="min-w-0 flex-1 text-[0.68rem] font-semibold leading-snug text-[#12007D]">
              Cidade Empreendedora
            </span>
            <ExternalLink className="h-3 w-3 shrink-0 text-[#1800AD]/40 transition group-hover:text-[#1800AD]" />
          </a>
        )}
      </div>
    </div>
  );
}
