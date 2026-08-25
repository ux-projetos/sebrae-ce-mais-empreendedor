import { ExternalLink } from "lucide-react";
import { useDestaqueMapa } from "./destaque-mapa";

import {
  INDICADORES,
  PROJETOS_COMPETITIVIDADE,
  SEBRAETEC_MUNICIPIOS,
  SEBRAETEC_TOTAL,
  isIndicadorMunicipio,
  type IndicadorKey,
} from "@/data/indicadores";
import { MUNICIPIOS, REDE_ATENDIMENTO, pctOf, SALAS_EMPREENDEDOR_LIST, SELO_META } from "@/data/municipios";
import logoOds from "@/assets/logo-ods.png.asset.json";
import logoSebraetec from "@/assets/logo-sebraetec.png.asset.json";
import logoSeloQualidade from "@/assets/selo-qualidade-empresarial.png.asset.json";
import logoOrigens from "@/assets/logo-sebrae-origens.png.asset.json";
import { destaquesSalaDoEmpreendedor, ODS_PRIORITARIOS } from "@/data/salas-destaques";
import logoSalaEmpreendedor from "@/assets/logo-sala-do-empreendedor.png.asset.json";


import {
  CulturaEmpreendedoraView,
  InovacaoView,
  IdentidadeVocacoesView,
  ComprasPublicasView,
  SimplificacaoView,
  InclusaoSocioprodutivaView,
  LiderancasGovernancaView,
  ResilienciaClimaticaView,
  GestaoPoliticasPublicasView,
} from "./IndicadorViews";

const nfBR = new Intl.NumberFormat("pt-BR");

interface Props {
  indicadorKey: IndicadorKey;
  onSelectMunicipio: (id: string) => void;
  projetoAtivo: string | null;
  onSelectProjeto: (id: string | null) => void;
  /** Mostra a descrição do indicador antes do conteúdo. */
  showDescricao?: boolean;
}

export function ConteudoIndicador({
  indicadorKey,
  onSelectMunicipio,
  projetoAtivo,
  onSelectProjeto,
  showDescricao = true,
}: Props) {
  const ind = INDICADORES.find((i) => i.key === indicadorKey)!;

  return (
    <>
      {showDescricao && <p className="text-sm leading-relaxed text-[#F2F0EE]/75">{ind.descricao}</p>}

      {ind.key === "salas_empreendedor" ? (
        <SelosSalasEmpreendedor onSelect={onSelectMunicipio} />
      ) : ind.key === "cultura_empreendedora" ? (
        <CulturaEmpreendedoraView />
      ) : ind.key === "inovacao" ? (
        <InovacaoView />
      ) : ind.key === "identidade_vocacoes_mercado" ? (
        <IdentidadeVocacoesView />
      ) : ind.key === "compras_publicas_acesso_credito" ? (
        <ComprasPublicasView />
      ) : ind.key === "simplificacao" ? (
        <SimplificacaoView />
      ) : ind.key === "inclusao_socioprodutiva" ? (
        <InclusaoSocioprodutivaView />
      ) : ind.key === "liderancas_governanca" ? (
        <LiderancasGovernancaView />
      ) : ind.key === "resiliencia_climatica_sustentabilidade" ? (
        <ResilienciaClimaticaView />
      ) : ind.key === "gestao_politicas_publicas" ? (
        <GestaoPoliticasPublicasView />
      ) : isIndicadorMunicipio(ind.key) ? (
        <RankingMunicipios indicadorKey={ind.key} onSelect={onSelectMunicipio} />
      ) : null}

      {ind.tipo === "regional" && <RedeAtendimentoView />}

      {ind.tipo === "projetos" && (
        <ProjetosCompetitividade projetoAtivo={projetoAtivo} onSelect={onSelectProjeto} />
      )}
    </>
  );
}

function RankingMunicipios({
  indicadorKey,
  onSelect,
}: {
  indicadorKey: Parameters<typeof pctOf>[1];
  onSelect: (id: string) => void;
}) {
  const ranking = [...MUNICIPIOS]
    .map((m) => ({ m, v: pctOf(m, indicadorKey) }))
    .sort((a, b) => b.v - a.v);
  return (
    <section className="mt-6">
      <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-widest text-[#B9C6FF]">
        Ranking regional
      </h3>
      <ol className="space-y-1.5">
        {ranking.map(({ m, v }, i) => (
          <li key={m.id}>
            <button
              onClick={() => onSelect(m.id)}
              className="flex w-full items-center gap-3 rounded-xl bg-white px-3 py-2 text-left transition hover:bg-[#F2F0EE]"
            >
              <span className="w-6 text-center text-xs font-bold text-[#12007D]/45 tabular-nums">
                {i + 1}
              </span>
              <span className="flex-1 text-sm font-medium text-[#12007D]">{m.nome}</span>
              <div className="h-1.5 w-24 overflow-hidden rounded-full bg-[#12007D]/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#B8935A] to-[#8FA97E]"
                  style={{ width: `${v}%` }}
                />
              </div>
              <span className="w-9 text-right font-display text-sm font-bold tabular-nums text-[#12007D]">
                {v}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}

function SelosSalasEmpreendedor({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <>
    <section className="mt-6">
      <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-widest text-[#B9C6FF]">
        Selo de Referência em Atendimento
      </h3>

      <ol className="space-y-1.5">
        {SALAS_EMPREENDEDOR_LIST.map((sala) => {
          const meta = sala.selo ? SELO_META[sala.selo] : null;
          const trabalhaOds = sala.selo === "diamante" || sala.selo === "ouro";
          return (
            <li key={sala.id}>
              <button
                onClick={() => onSelect(sala.municipioId)}
                className="flex w-full items-center gap-3 rounded-xl bg-white px-3 py-2 text-left transition hover:bg-[#F2F0EE]"
              >
                <span className="shrink-0 text-lg leading-none">
                  {meta ? meta.emoji : "🏛️"}
                </span>
                <img
                  src={logoSalaEmpreendedor.url}
                  alt="Sala do Empreendedor"
                  className="h-6 w-auto shrink-0 object-contain"
                />
                <span className="flex-1 text-sm font-medium text-[#12007D]">{sala.nome}</span>

                {trabalhaOds && (
                  <img
                    src={logoOds.url}
                    alt="Trabalha ODS"
                    title="Trabalha os Objetivos de Desenvolvimento Sustentável"
                    className="h-6 w-6 shrink-0 object-contain"
                  />
                )}
                {meta ? (
                  <span className="rounded-full bg-[#12007D]/10 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-widest text-[#12007D]">
                    Selo {meta.nome}
                  </span>
                ) : (
                  <span className="rounded-full border border-[#12007D]/20 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-widest text-[#12007D]/60">
                    Sem selo
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ol>
    </section>

    <section className="mt-8">
      <h3 className="mb-3 flex items-center gap-2 font-display text-sm font-bold uppercase tracking-widest text-[#B9C6FF]">
        <img src={logoOds.url} alt="" className="h-6 w-6 object-contain" />
        Práticas de Sustentabilidade e ODS
      </h3>
      <div className="rounded-2xl bg-white p-4">
        <img
          src={logoSalaEmpreendedor.url}
          alt="Sala do Empreendedor"
          className="mb-2 h-8 w-auto object-contain"
        />

        <p className="text-[0.72rem] leading-relaxed text-[#12007D]/70">
          As Salas do Empreendedor Diamante e Ouro do Cariri conectam o atendimento municipal aos Objetivos de
          Desenvolvimento Sustentável prioritários:
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {ODS_PRIORITARIOS.map((o) => (
            <div
              key={o.numero}
              className="flex items-center gap-2 rounded-xl p-2.5 text-white"
              style={{ backgroundColor: o.cor }}
            >
              <span className="font-display text-xl font-black leading-none">{o.numero}</span>
              <span className="text-[0.6rem] font-semibold leading-tight">{o.nome}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="mt-8">
      <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-widest text-[#B9C6FF]">
        Destaques
      </h3>
      <div className="space-y-2.5">
        {destaquesSalaDoEmpreendedor.map((d) => (
          <div key={d.titulo} className="rounded-2xl bg-white p-4">
            <div className="font-display text-base font-bold leading-tight text-[#12007D]">
              {d.titulo}
            </div>
            <div className="mt-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#12007D]/50">
              {d.municipioOrigem}
            </div>
            <p className="mt-2 text-[0.72rem] leading-relaxed text-[#12007D]/70">{d.descricao}</p>
          </div>
        ))}
      </div>
    </section>
    </>
  );
}


function RedeAtendimentoView() {
  const s = REDE_ATENDIMENTO;
  const stats = [
    { emoji: "🏢", label: "Empresas atendidas (EP, MEI, ME)", value: nfBR.format(s.empresasAtendidas) },
    {
      emoji: "🧑‍💼",
      label:
        "Agentes de Atendimento do Sebrae Cariri (ALI Rural e Produtividade, AD, AOE, ATS, ART, ACF)",
      value: `${s.agentesCampo}`,
    },
    { emoji: "🤝", label: "Consultores atuantes", value: `${s.consultoresAtuantes}` },
    {
      emoji: "📋",
      label: "Realizado pelos Analistas do Sebrae Cariri",
      value: "Plantão de Atendimento",
    },
    { emoji: "🧠", label: "Analistas de Negócios atuando no Cariri", value: `${s.analistasNegocios}`, href: "https://heyzine.com/flip-book/242d32388a.html" },
    { emoji: "⭐", label: "Recomendação do Sebrae (NPS)", value: s.nps },
    { emoji: "♀️", label: "Público feminino atendido", value: s.publicoFeminino },
  ];
  return (
    <section className="mt-6">
      <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-widest text-white/70">
        Sebrae Cariri em 2026
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {stats.map((st) => {
          const body = (
            <>
              <div className="text-xl">{st.emoji}</div>
              <div className="mt-1 font-display text-xl font-black text-[#12007D]">{st.value}</div>
              <div className="text-[0.7rem] leading-tight text-[#12007D]/70">{st.label}</div>
            </>
          );
          return st.href ? (
            <a
              key={st.label}
              href={st.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl bg-white p-4 transition hover:bg-[#D6C8F5]"
            >
              {body}
              <div className="mt-1.5 flex items-center gap-1 text-[0.65rem] font-semibold text-[#1800AD]">
                Equipe Sebrae Cariri
                <ExternalLink className="h-3 w-3 transition group-hover:translate-x-0.5" />
              </div>
            </a>
          ) : (
            <div key={st.label} className="rounded-2xl bg-white p-4">
              {body}
            </div>
          );
        })}
      </div>
      <p className="mt-2 text-[0.65rem] text-[#F2F0EE]/45">{s.fonte}</p>
    </section>
  );
}


function SubSecao({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="mt-6">
      <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-widest text-white/70">
        {titulo}
      </h3>
      {children}
    </section>
  );
}

function ProjetosCompetitividade({
  projetoAtivo,
  onSelect,
}: {
  projetoAtivo: string | null;
  onSelect: (id: string | null) => void;
}) {
  const peiex = PROJETOS_COMPETITIVIDADE.find((p) => p.id === "peiex")!;
  const { destaque, toggleDestaque } = useDestaqueMapa();
  return (
    <>
      <SubSecao titulo="Projetos Setoriais">
        <div className="space-y-2">
          {PROJETOS_COMPETITIVIDADE.filter((p) => p.id !== "peiex").map((p) => {
            const active = projetoAtivo === p.id || destaque?.id === `proj-${p.id}`;
            return (
              <button
                key={p.id}
                onClick={() => {
              onSelect(active ? null : p.id);
                  toggleDestaque({
                    id: `proj-${p.id}`,
                    titulo: p.nome,
                    municipios: p.municipiosAtuacao,
                    cor: p.cor,
                    emoji: p.emoji,
                    logoUrl: p.logo,
                  });
                }}

                className={`w-full rounded-2xl border p-4 text-left transition
                  ${active
                    ? "border-[#1800AD] bg-white text-[#1800AD]"
                    : "border-transparent bg-white text-[#12007D] hover:shadow-lg"}`}
              >
                <div className="flex items-start gap-3">
                  {p.logo ? (
                    <img src={p.logo} alt="" className="h-11 w-11 shrink-0 object-contain" />
                  ) : (
                    <span className="shrink-0 text-2xl leading-none">{p.emoji}</span>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="font-display text-base font-bold">{p.nome}</div>
                    <div className={`text-xs ${active ? "text-[#1800AD]/70" : "text-[#12007D]/60"}`}>
                      {p.clientesAtendidos} {p.clientesLabel}
                    </div>
                    {p.foco && (
                      <div className="mt-1 text-[0.72rem] font-medium text-[#12007D]/75">
                        {p.foco}
                      </div>
                    )}

                    <div className="mt-2 flex flex-wrap gap-1">
                      {p.municipiosAtuacao.map((n) => (
                        <span
                          key={n}
                          className={`rounded-full px-2 py-0.5 text-[0.65rem] font-medium
                            ${active ? "bg-[#1800AD]/10 text-[#1800AD]" : "bg-[#12007D]/8 text-[#12007D]/80"}`}
                        >
                          {n}
                        </span>
                      ))}
                    </div>
                    {active && (
                      <ul className="mt-3 space-y-1 text-xs text-[#1800AD]/80">
                        {p.destaques.map((d, i) => (
                          <li key={i} className="flex gap-2">
                            <span>•</span>
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </SubSecao>

      <SubSecao titulo="Inovação Tecnológica">
        <div className="rounded-2xl bg-white p-4">
          <div className="flex items-start gap-3">
            <img src={logoSebraetec.url} alt="" className="h-11 w-11 shrink-0 object-contain" />
            <div className="min-w-0 flex-1">
              <div className="font-display text-base font-bold text-[#12007D]">Sebraetec</div>
              <div className="text-xs text-[#12007D]/65">
                Soluções tecnológicas para a competitividade dos pequenos negócios
              </div>
            </div>
          </div>

          <div className="mt-4 border-t border-[#12007D]/10 pt-4">
            <div className="rounded-xl bg-[#12007D]/5 p-3 text-center">
              <div className="font-display text-xl font-black text-[#12007D]">{nfBR.format(SEBRAETEC_TOTAL.empresasBeneficiadas)}</div>
              <div className="text-[0.65rem] font-semibold uppercase tracking-wider text-[#12007D]/60">Empresas beneficiadas</div>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="mb-2 font-display text-xs font-bold uppercase tracking-widest text-[#12007D]/50">
              Empresas por município
            </h4>
            <ol className="space-y-1">
              {SEBRAETEC_MUNICIPIOS.map((item, i) => (
                <li key={item.municipio} className="flex items-center justify-between rounded-lg bg-[#12007D]/5 px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className="w-4 text-center text-xs font-bold text-[#12007D]/40 tabular-nums">{i + 1}</span>
                    <span className="text-sm font-medium text-[#12007D]">{item.municipio}</span>
                  </div>
                  <span className="text-xs font-bold tabular-nums text-[#12007D]" title="Empresas beneficiadas">{nfBR.format(item.empresasBeneficiadas)}</span>
                </li>
              ))}
            </ol>
            <p className="mt-2 text-[0.6rem] text-[#12007D]/45">* Empresas beneficiadas pode incluir atendimentos de anos anteriores.</p>
          </div>
        </div>
      </SubSecao>

      <SubSecao titulo="Programa de Qualidade Empresarial">
        <div className="rounded-2xl bg-white p-4">
          <div className="flex items-start gap-3">
            <img src={logoSeloQualidade.url} alt="" className="h-11 w-11 shrink-0 object-contain" />
            <div className="min-w-0 flex-1">
              <div className="font-display text-base font-bold text-[#12007D]">
                Selo de Qualidade Empresarial
              </div>
              <div className="text-xs text-[#12007D]/65">
                Reconhecimento das empresas nos níveis Prata, Ouro e Diamante
              </div>
            </div>
          </div>
          <div className="mt-4 border-t border-[#12007D]/10 pt-4">
            <div className="rounded-xl bg-[#12007D]/5 p-3 text-center">
              <div className="font-display text-xl font-black text-[#12007D]">41</div>
              <div className="text-[0.65rem] font-semibold uppercase tracking-wider text-[#12007D]/60">Empresas</div>
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {["Juazeiro do Norte", "Crato", "Barbalha"].map((n) => (
                <span key={n} className="rounded-full bg-[#12007D]/8 px-2 py-0.5 text-[0.65rem] font-medium text-[#12007D]/80">
                  {n}
                </span>
              ))}
            </div>
          </div>

        </div>
      </SubSecao>

      <SubSecao titulo="PROGRAMA DE INTERNACIONALIZAÇÃO">
        <div className="rounded-2xl bg-white p-4">
          <div className="flex items-start gap-3">
            <img src={peiex.logo} alt="" className="h-11 w-11 shrink-0 object-contain" />
            <div className="min-w-0 flex-1">
              <div className="font-display text-base font-bold text-[#12007D]">{peiex.nome}</div>
              {peiex.foco && (
                <div className="mt-1 text-[0.72rem] font-medium text-[#12007D]/75">{peiex.foco}</div>
              )}
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-1">
            {peiex.municipiosAtuacao.map((n) => (
              <span
                key={n}
                className="rounded-full bg-[#12007D]/8 px-2 py-0.5 text-[0.65rem] font-medium text-[#12007D]/80"
              >
                {n}
              </span>
            ))}
          </div>
          <a
            href="https://apexbrasil.com.br/jornadaexportadora"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[#1800AD] px-4 py-3 text-center font-display text-sm font-bold text-white transition hover:bg-[#12007D] active:scale-[0.98]"
          >
            Jornada Exportadora — Apex Brasil
            <ExternalLink className="h-4 w-4 shrink-0" />
          </a>
        </div>
      </SubSecao>

      <SubSecao titulo="Sebrae Origens">
        <div className="rounded-2xl bg-white p-4">
          <div className="flex items-start gap-3">
            <img src={logoOrigens.url} alt="" className="h-11 w-11 shrink-0 object-contain" />
            <div className="min-w-0 flex-1">
              <div className="font-display text-base font-bold text-[#12007D]">Sebrae Origens</div>
              <div className="text-xs text-[#12007D]/65">
                Diagnóstico das potenciais Indicações Geográficas e Marcas Coletivas
              </div>
            </div>
          </div>
        </div>
      </SubSecao>
    </>
  );
}

