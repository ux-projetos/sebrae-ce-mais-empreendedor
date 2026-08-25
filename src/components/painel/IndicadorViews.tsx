// Views customizadas por indicador — cada eixo tem sua história e projetos.
import { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import { MUNICIPIOS, SELOS_SALAS_EMPREENDEDOR } from "@/data/municipios";
import { useDestaqueMapa, COR_AMBIENTE_NEGOCIOS } from "./destaque-mapa";

import logoJepp from "@/assets/logo-jepp.png.asset.json";
import logoSebraeDelas from "@/assets/logo-sebrae-delas.png.asset.json";
import logoEcossistemaLocalInovacao from "@/assets/logo-ecossistema-local-inovacao.png.asset.json";
import logoComiteSustentabilidade from "@/assets/logo-comite-sustentabilidade.png.asset.json";
import logoOds from "@/assets/logo-ods.png.asset.json";
import logoTerritoriosEsperanca from "@/assets/logo-territorios-esperanca.png.asset.json";
import logoRotaCariri from "@/assets/logo-rota-cariri.png.asset.json";
import logoPoloCalcadista from "@/assets/logo-polo-calcadista.png.asset.json";
import logoBovino from "@/assets/logo-bovino.png.asset.json";
import logoCaprinovinocultura from "@/assets/logo-caprinovinocultura.png.asset.json";
import logoSebraeStartups from "@/assets/logo-sebrae-startups.png.asset.json";
import logoSebraelab from "@/assets/logo-sebraelab.png.asset.json";
import logoSaboresCariri from "@/assets/logo-sabores-do-cariri.png.asset.json";
import logoSalaEmpreendedor from "@/assets/logo-sala-do-empreendedor.png.asset.json";
import logoLider from "@/assets/logo-lider-cariri.png.asset.json";
import logoIso from "@/assets/logo-iso.png.asset.json";
import ods7 from "@/assets/ods-7.png.asset.json";
import ods8 from "@/assets/ods-8.png.asset.json";
import ods9 from "@/assets/ods-9.png.asset.json";
import ods11 from "@/assets/ods-11.png.asset.json";
import ods12 from "@/assets/ods-12.png.asset.json";
import ods17 from "@/assets/ods-17.png.asset.json";

const ODS_LOGOS = [
  { n: 7, url: ods7.url },
  { n: 8, url: ods8.url },
  { n: 9, url: ods9.url },
  { n: 11, url: ods11.url },
  { n: 12, url: ods12.url },
  { n: 17, url: ods17.url },
];


const nfBR = new Intl.NumberFormat("pt-BR");

const cardBase =
  "rounded-2xl bg-white p-4 text-[#12007D] transition duration-300 hover:-translate-y-0.5 hover:shadow-lg";

function Section({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="mt-6">
      <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-widest text-white/70">
        {titulo}
      </h3>
      {children}
    </section>
  );
}

function Chips({ items, tone = "default" }: { items: string[]; tone?: "default" | "green" | "yellow" | "red" }) {
  const styles = {
    default: "bg-[#12007D]/8 text-[#12007D]",
    green: "bg-[#00B36B]/15 text-[#00764A] ring-1 ring-[#00B36B]/40",
    yellow: "bg-[#FBA71A]/15 text-[#8A5A00] ring-1 ring-[#FBA71A]/40",
    red: "bg-[#D64545]/15 text-[#A02121] ring-1 ring-[#D64545]/40",
  } as const;
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((n) => (
        <span key={n} className={`rounded-full px-2.5 py-0.5 text-[0.7rem] font-medium ${styles[tone]}`}>
          {n}
        </span>
      ))}
    </div>
  );
}

function Stat({ emoji, value, label }: { emoji: string; value: string; label: string }) {
  return (
    <div className={cardBase}>
      <div className="text-xl">{emoji}</div>
      <div className="mt-1 font-display text-xl font-black text-[#12007D]">{value}</div>
      <div className="text-[0.72rem] leading-tight text-[#12007D]/70">{label}</div>
    </div>
  );
}

function ProjetoBox({
  emoji,
  logoUrl,
  titulo,
  subtitulo,
  stats,
  municipios,
  children,
  destaqueId,
  destaqueCor,
}: {
  emoji?: string;
  logoUrl?: string;
  logoTransparent?: boolean;
  titulo: string;
  subtitulo?: string;
  stats?: { emoji: string; value: string; label: string }[];
  municipios?: string[];
  children?: React.ReactNode;
  /** Quando definido, o card aciona o destaque no mapa da tela inicial. */
  destaqueId?: string;
  destaqueCor?: string;
}) {
  const { destaque, toggleDestaque } = useDestaqueMapa();
  const ativo = Boolean(destaqueId) && destaque?.id === destaqueId;

  const conteudo = (
    <>
      <div className="flex items-start gap-3">
        {logoUrl ? (
          <img src={logoUrl} alt="" className="h-11 w-11 shrink-0 object-contain" />
        ) : (
          <span className="text-2xl leading-none">{emoji}</span>
        )}
        <div className="min-w-0 flex-1">
          <div className="font-display text-base font-bold text-[#12007D]">{titulo}</div>
          {subtitulo && <div className="text-xs text-[#12007D]/65">{subtitulo}</div>}
        </div>
      </div>
      {stats && (
        <div className="mt-3 grid grid-cols-2 gap-2">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl bg-[#12007D]/5 p-2.5">
              <div className="text-sm">{s.emoji}</div>
              <div className="font-display text-lg font-black text-[#12007D]">{s.value}</div>
              <div className="text-[0.65rem] leading-tight text-[#12007D]/70">{s.label}</div>
            </div>
          ))}
        </div>
      )}
      {municipios && municipios.length > 0 && (
        <div className="mt-3">
          <Chips items={municipios} />
        </div>
      )}
      {children}
    </>
  );

  if (destaqueId && municipios && municipios.length > 0) {
    return (
      <button
        type="button"
        onClick={() =>
          toggleDestaque({
            id: destaqueId,
            titulo,
            municipios,
            cor: destaqueCor ?? COR_AMBIENTE_NEGOCIOS,
            emoji,
            logoUrl,
          })
        }
        className={`${cardBase} block w-full text-left ${ativo ? "ring-2 ring-[#A85C32]" : ""}`}
      >
        {conteudo}
      </button>
    );
  }

  return <div className={cardBase}>{conteudo}</div>;
}


// ================= CULTURA EMPREENDEDORA =================
export function CulturaEmpreendedoraView() {
  return (
    <>
      <Section titulo="Empreendedorismo nas Escolas e Universidades">
        <div className="space-y-3">
          <ProjetoBox
            logoUrl={logoJepp.url}
            logoTransparent
            titulo="JEPP — Jovens Empreendedores, Primeiros Passos"
            subtitulo="Educação empreendedora nas escolas do Cariri"
            stats={[
              { emoji: "🏙️", value: "100%", label: "dos municípios atendidos" },
              { emoji: "🧒", value: nfBR.format(40890), label: "estudantes atendidos" },
              { emoji: "🏫", value: "210", label: "escolas atendidas" },
              { emoji: "👩‍🏫", value: nfBR.format(1532), label: "professores atendidos" },
            ]}
          />
          <ProjetoBox
            emoji="🌟"
            titulo="Despertar"
            subtitulo="Desenvolvimento de competências empreendedoras e projetos de vida por meio de capacitações e materiais pedagógicos para jovens do ensino médio"
            stats={[
              { emoji: "🏙️", value: "18", label: "municípios atendidos" },
              { emoji: "🏫", value: "18", label: "escolas atendidas" },
            ]}
            municipios={[
              "Várzea Alegre",
              "Crato",
              "Assaré",
              "Araripe",
              "Nova Olinda",
              "Altaneira",
              "Campos Sales",
              "Jardim",
              "Barbalha",
              "Caririaçu",
              "Juazeiro do Norte",
              "Brejo Santo",
              "Milagres",
              "Aurora",
              "Barro",
              "Mauriti",
            ]}
          />
          <ProjetoBox
            emoji="💫"
            titulo="Sebrae Supernova"
            subtitulo="Desenvolvimento de negócios inovadores para estudantes do ensino superior"
          />
        </div>
      </Section>

      <Section titulo="Programa de Empreendedorismo Feminino">
        <div className="space-y-3">
          <ProjetoBox
            logoUrl={logoSebraeDelas.url}
            titulo="Sebrae Delas — Programa Plural"
            subtitulo="Capacitação de mulheres empreendedoras"
            stats={[
              { emoji: "🏙️", value: "30,8%", label: "dos municípios impactados" },
              { emoji: "♀️", value: "279", label: "mulheres capacitadas" },
            ]}
            municipios={[
              "Juazeiro do Norte",
              "Várzea Alegre",
              "Barro",
              "Granjeiro",
              "Farias Brito",
              "Aurora",
              "Milagres",
              "Campos Sales",
              "Crato",
              "Barbalha",
            ]}
          />
        </div>
      </Section>

      <Section titulo="Escola de Negócios">
        <div className="space-y-3">
          <ProjetoBox
            emoji="🚀"
            titulo="Escola Experience Sebrae"
            subtitulo="Capacitações e orientações empresariais"
            stats={[
              { emoji: "🎯", value: "75", label: "capacitações" },
              { emoji: "🧭", value: nfBR.format(1197), label: "orientações empresariais" },
              { emoji: "👥", value: nfBR.format(2204), label: "pessoas capacitadas" },
            ]}
          />
        </div>
      </Section>

      <Section titulo="Grandes Eventos">
        <div className="space-y-3">
          <ProjetoBox
            emoji="🎪"
            titulo="Eventos que movimentam o ecossistema empreendedor do Cariri"
            municipios={["Expocrato", "Expocariri", "Sebrae Comunica", "Festival de Literatura de Cordel"]}
          />
        </div>
      </Section>
    </>
  );
}


// ================= INOVAÇÃO =================
const COMITE_INOVACAO_GRUPOS: { emoji: string; titulo: string; instituicoes: string[] }[] = [
  {
    emoji: "🎓",
    titulo: "Educação e Pesquisa",
    instituicoes: [
      "UNINASSAU",
      "UNILEÃO",
      "Centec",
      "Instituto Federal do Ceará (IFC)",
      "Instituto Dragão do Mar",
      "CRC-CE",
      "Prefeitura do Crato",
      "Prefeitura de Jati",
      "Prefeitura de Juazeiro do Norte",
      "UFCA (Universidade Federal do Cariri)",
      "URCA (Universidade Regional do Cariri)",
      "Fatec",
    ],
  },
  {
    emoji: "🏢",
    titulo: "Mercado",
    instituicoes: [
      "SIMEC",
      "SENAI",
      "AJE Cariri",
      "Akatsuki",
      "FAEC",
      "Sindindústria",
      "Ligeira Telecom",
      "CRA-CE",
      "Cadafalso",
      "INCI",
      "Espaço Cuida",
      "Sindicato Rural de Barbalha",
      "Gestão Inteligente de Resíduos",
      "CDL Juazeiro",
      "ABRASEL",
      "Banco do Nordeste",
      "Sindilojas",
      "Senac",
      "Juá",
      "Líder Cariri",
      "IKNET",
      "SEST SENAT",
    ],
  },
  {
    emoji: "🌱",
    titulo: "Comunidades",
    instituicoes: ["Kariri Valley", "HACKINCARIRI", "Arkad Games", "Expoanime"],
  },
];

const AMBIENTES_INOVACAO = [
  "FABLAB (Fatec)",
  "Sebraelab (Sebrae Cariri)",
  "Faísca Lab (URCA Juazeiro do Norte)",
  "Incubadora (UFCA Juazeiro do Norte)",
  "Centro de Inovação do Cariri (Juazeiro do Norte - em construção)",
  "INOVALEÃO (Unileão Juazeiro do Norte)",
  "Espaço Cuida Hub (Juazeiro do Norte)",
];

export function InovacaoView() {
  const [comiteAberto, setComiteAberto] = useState(true);
  const [ambientesAberto, setAmbientesAberto] = useState(false);
  return (
    <Section titulo="Ecossistema de Inovação do Cariri">
      <div className="space-y-3">
        <div className={cardBase}>
          <button
            onClick={() => setComiteAberto((v) => !v)}
            aria-expanded={comiteAberto}
            className="flex w-full items-start gap-3 text-left"
          >
            <img src={logoEcossistemaLocalInovacao.url} alt="" className="h-11 w-11 shrink-0 object-contain" />
            <div className="min-w-0 flex-1">
              <div className="font-display text-base font-bold text-[#12007D]">
                Comitê Regional de Inovação do Cariri
              </div>
              <div className="text-xs text-[#12007D]/65">
                Articulação institucional para inovação regional
              </div>
            </div>
            <ChevronDown
              className={`h-5 w-5 shrink-0 text-[#12007D]/50 transition-transform ${comiteAberto ? "rotate-180" : ""}`}
            />
          </button>
          {comiteAberto && (
            <div className="mt-3 space-y-3 border-t border-[#12007D]/10 pt-3">
              {COMITE_INOVACAO_GRUPOS.map((g) => (
                <div key={g.titulo}>
                  <div className="mb-1.5 flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-widest text-[#12007D]/70">
                    <span className="text-sm">{g.emoji}</span>
                    {g.titulo} ({g.instituicoes.length})
                  </div>
                  <Chips items={g.instituicoes} />
                </div>
              ))}
            </div>
          )}
        </div>
        <ProjetoBox
          emoji="👾"
          titulo="Comunidades de Inovação"
          subtitulo="Comunidades ativas de tecnologia e startups"
          municipios={["Kariri Valley", "Arkade Games", "HACKINCARIRI", "Expoanime"]}
        />
        <div className={cardBase}>
          <button
            onClick={() => setAmbientesAberto((v) => !v)}
            aria-expanded={ambientesAberto}
            className="flex w-full items-start gap-3 text-left"
          >
            <span className="text-2xl leading-none">🏢</span>
            <div className="min-w-0 flex-1">
              <div className="font-display text-base font-bold text-[#12007D]">
                Ambientes de Inovação
              </div>
              <div className="text-xs text-[#12007D]/65">
                Espaços físicos que aceleram ideias e conexões no Cariri
              </div>
            </div>
            <ChevronDown
              className={`h-5 w-5 shrink-0 text-[#12007D]/50 transition-transform ${ambientesAberto ? "rotate-180" : ""}`}
            />
          </button>
          {ambientesAberto && (
            <div className="mt-3 border-t border-[#12007D]/10 pt-3">
              <Chips items={AMBIENTES_INOVACAO} />
            </div>
          )}
        </div>
        <ProjetoBox
          emoji="⚖️"
          titulo="22% dos municípios com Lei de Inovação"
          municipios={["Juazeiro do Norte", "Jati", "Barro", "Brejo Santo", "Várzea Alegre"]}
        />
        <ProjetoBox
          logoUrl={logoSebraeStartups.url}
          titulo="25 Startups no Cariri"
          municipios={[
            "Crato",
            "Juazeiro do Norte",
            "Barbalha",
            "Missão Velha",
            "Barro",
          ]}
        >
          <a
            href="https://programas.sebraestartups.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[#1800AD] px-4 py-3 text-center font-display text-sm font-bold text-white transition hover:bg-[#12007D] active:scale-[0.98]"
          >
            Conheça nosso Observatório de Startups e Oportunidade
            <ExternalLink className="h-4 w-4 shrink-0" />
          </a>
        </ProjetoBox>
        <ProjetoBox
          logoUrl={logoSebraelab.url}
          titulo="SEBRAELAB"
          subtitulo="Residência de Ideação e Validação de Startups"
          municipios={["Juazeiro do Norte", "Crato", "Barbalha"]}
        />
      </div>
    </Section>
  );
}

// ================= IDENTIDADE, VOCAÇÕES E MERCADO =================
const MTUR_TURISMO = [
  "Altaneira",
  "Assaré",
  "Aurora",
  "Barbalha",
  "Brejo Santo",
  "Campos Sales",
  "Crato",
  "Farias Brito",
  "Jardim",
  "Juazeiro do Norte",
  "Nova Olinda",
  "Penaforte",
  "Potengi",
  "Salitre",
  "Santana do Cariri",
  "Várzea Alegre",
];

export function IdentidadeVocacoesView() {
  return (
    <>
      <Section titulo="Mapa do Turismo Brasileiro · MTur">
        <div className={cardBase}>
          <div className="mb-2 flex items-center gap-2">
            <span className="text-xl">🗺️</span>
            <div>
              <div className="font-display text-base font-bold text-[#12007D]">
                61,5% do Cariri no Mapa do Turismo
              </div>
            </div>
          </div>
          <Chips items={MTUR_TURISMO} />
        </div>
      </Section>

      <Section titulo="Vocações">
        <div className="space-y-3">
          <ProjetoBox
            destaqueId="voc-polo-calcadista"
            destaqueCor="#E85D1F"
            logoUrl={logoPoloCalcadista.url}
            titulo="Polo Calçadista"
            municipios={["Barbalha", "Juazeiro do Norte", "Crato"]}
          />
          <ProjetoBox
            destaqueId="voc-bovinocultura"
            destaqueCor="#FF6B35"
            logoUrl={logoBovino.url}
            titulo="Bovinocultura de Leite"
            municipios={["Crato", "Assaré", "Farias Brito", "Milagres", "Brejo Santo", "Mauriti"]}
          />
          <ProjetoBox
            destaqueId="voc-caprinovinocultura"
            destaqueCor="#F57C1E"
            logoUrl={logoCaprinovinocultura.url}
            titulo="Caprinovinocultura"
            municipios={[
              "Campos Sales",
              "Salitre",
              "Assaré",
              "Potengi",
              "Araripe",
              "Altaneira",
            ]}
          />
          <ProjetoBox
            destaqueId="voc-turismo"
            destaqueCor="#FF8C42"
            logoUrl={logoRotaCariri.url}
            titulo="Turismo"
            municipios={[
              "Barbalha",
              "Juazeiro do Norte",
              "Crato",
              "Santana do Cariri",
              "Nova Olinda",
              "Assaré",
              "Potengi",
              "Altaneira",
              "Farias Brito",
              "Abaiara",
              "Missão Velha",
              "Salitre",
            ]}
          />
          <ProjetoBox
            destaqueId="voc-mandiocultura"
            destaqueCor="#F56A1E"
            emoji="🌱"
            titulo="Rota da Mandiocultura"
            municipios={[
              "Salitre",
              "Campos Sales",
              "Araripe",
              "Assaré",
              "Potengi",
              "Santana do Cariri",
              "Nova Olinda",
              "Crato",
              "Farias Brito",
              "Mauriti",
            ]}
          />
          <ProjetoBox
            destaqueId="voc-fruticultura"
            destaqueCor="#FF9E5A"
            emoji="🥭"
            titulo="Fruticultura"
            municipios={["Brejo Santo", "Mauriti", "Porteiras", "Missão Velha"]}
          />
          <ProjetoBox
            destaqueId="voc-economia-criativa"
            destaqueCor="#FF7A2E"
            emoji="🎭"
            titulo="Economia Criativa"
            municipios={[
              "Juazeiro do Norte",
              "Crato",
              "Nova Olinda",
              "Mauriti",
              "Brejo Santo",
              "Barro",
              "Várzea Alegre",
              "Campos Sales",
              "Salitre",
              "Potengi",
              "Assaré",
            ]}
          />
          <ProjetoBox
            destaqueId="voc-apicultura"
            destaqueCor="#F06C22"
            emoji="🐝"
            titulo="Apicultura"
            municipios={[
              "Santana do Cariri",
              "Assaré",
              "Potengi",
              "Aurora",
              "Farias Brito",
              "Milagres",
              "Nova Olinda",
              "Altaneira",
              "Campos Sales",
            ]}
          />
        </div>
      </Section>

    </>
  );
}

// ================= GESTÃO E POLÍTICAS PÚBLICAS =================
const CONTRATA_IMPLANTADO = ["Jardim"];
const TODOS = MUNICIPIOS.map((m) => m.nome);
const CONTRATA_EM_IMPLANTACAO = TODOS.filter((n) => !CONTRATA_IMPLANTADO.includes(n));

export function ComprasPublicasView() {
  return (
    <>
      <Section titulo="Programas">
        <div className="space-y-3">
          <div className={cardBase}>
            <div className="flex items-start gap-3">
              <span className="text-2xl leading-none">🌾</span>
              <div className="min-w-0 flex-1">
                <div className="font-display text-base font-bold text-[#12007D]">
                  100% dos municípios
                </div>
                <div className="text-[0.72rem] leading-tight text-[#12007D]/70">
                  possuem PAA (Programa de Aquisição de Alimentos) e PNAE (Programa Nacional de Alimentação Escolar)
                </div>
              </div>
            </div>
          </div>

          <div className={cardBase}>
            <div className="mb-3 flex items-center gap-2">
              <span className="text-2xl">🖥️</span>
              <div className="font-display text-base font-bold text-[#12007D]">
                Plataforma Contrata + Brasil
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="mb-1.5 text-[0.65rem] font-bold uppercase tracking-widest text-[#00764A]">
                  ✅ Implantado ({CONTRATA_IMPLANTADO.length})
                </div>
                <Chips items={CONTRATA_IMPLANTADO} tone="green" />
              </div>
              <div>
                <div className="mb-1.5 text-[0.65rem] font-bold uppercase tracking-widest text-[#8A5A00]">
                  🟡 Em implantação ({CONTRATA_EM_IMPLANTACAO.length})
                </div>
                <Chips items={CONTRATA_EM_IMPLANTACAO} tone="yellow" />
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

// ================= GESTÃO E POLÍTICAS PÚBLICAS =================
const SECRETARIA_DESENVOLVIMENTO = [
  "Juazeiro do Norte",
  "Crato",
  "Várzea Alegre",
  "Jati",
  "Milagres",
  "Brejo Santo",
];

const PLANO_DESENVOLVIMENTO = ["Juazeiro do Norte", "Brejo Santo", "Várzea Alegre"];

export function GestaoPoliticasPublicasView() {
  return (
    <>
      <Section titulo="Secretaria de Desenvolvimento Socioeconômico e Governo">
        <ProjetoBox
          emoji="🏛️"
          titulo="23,1% dos Municípios possuem Secretaria de Desenvolvimento Socioeconômico e Governo"
          municipios={SECRETARIA_DESENVOLVIMENTO}
        />
      </Section>

      <Section titulo="Plano de Desenvolvimento Socioeconômico">
        <ProjetoBox
          emoji="📋"
          titulo="11,5% dos Municípios possuem Plano de Desenvolvimento Socioeconômico"
          municipios={PLANO_DESENVOLVIMENTO}
        />
      </Section>
    </>
  );
}

// ================= SIMPLIFICAÇÃO =================
const EMS_IMPLANTADO = ["Juazeiro do Norte", "Nova Olinda"];
const EMS_EM_IMPLANTACAO = ["Várzea Alegre", "Barbalha", "Milagres", "Brejo Santo"];
const DEC_IMPLANTADO = ["Várzea Alegre", "Barbalha", "Milagres", "Brejo Santo"];
const DEC_EM_IMPLANTACAO = [
  "Jati",
  "Crato",
  "Farias Brito",
  "Campos Sales",
  "Santana do Cariri",
  "Caririaçu",
];

const TEMPO_ABERTURA: { faixa: "verde" | "amarelo" | "vermelho"; municipios: string[] }[] = [
  { faixa: "verde", municipios: ["Abaiara", "Granjeiro"] },
  {
    faixa: "amarelo",
    municipios: [
      "Altaneira",
      "Assaré",
      "Aurora",
      "Barbalha",
      "Barro",
      "Brejo Santo",
      "Campos Sales",
      "Crato",
      "Farias Brito",
      "Jardim",
      "Juazeiro do Norte",
      "Mauriti",
      "Milagres",
      "Missão Velha",
      "Nova Olinda",
      "Penaforte",
      "Potengi",
      "Salitre",
      "Santana do Cariri",
      "Várzea Alegre",
    ],
  },
  { faixa: "vermelho", municipios: ["Araripe", "Caririaçu", "Jati", "Porteiras"] },
];

const FAIXA_META = {
  verde: { emoji: "🟢", label: "Menor que 8 horas", tone: "green" as const },
  amarelo: { emoji: "🟡", label: "Entre 24 e 8 horas", tone: "yellow" as const },
  vermelho: { emoji: "🔴", label: "Maior que 24 horas", tone: "red" as const },
};

const SIM_SELO_INSPECAO = [
  { municipio: "Juazeiro do Norte", status: "implantado" },
  { municipio: "Crato", status: "implantado" },
  { municipio: "Jati", status: "implantado" },
  { municipio: "Brejo Santo", status: "implantado" },
  { municipio: "Milagres", status: "em andamento" },
  { municipio: "Mauriti", status: "em andamento" },
];

function StatusMunicipios({
  emoji,
  titulo,
  implantado,
  emImplantacao,
}: {
  emoji: string;
  titulo: string;
  implantado: string[];
  emImplantacao: string[];
}) {
  const itens = [
    ...implantado.map((m) => ({ municipio: m, status: "implantado" as const })),
    ...emImplantacao.map((m) => ({ municipio: m, status: "em andamento" as const })),
  ];
  return (
    <div className={cardBase}>
      <div className="mb-3 flex items-center gap-2">
        <span className="text-2xl leading-none">{emoji}</span>
        <div className="font-display text-base font-bold text-[#12007D]">{titulo}</div>
      </div>
      <ol className="space-y-1">
        {itens.map((s, i) => (
          <li
            key={s.municipio}
            className="flex items-center justify-between rounded-lg bg-[#12007D]/5 px-3 py-2"
          >
            <div className="flex items-center gap-2">
              <span className="w-4 text-center text-xs font-bold tabular-nums text-[#12007D]/40">
                {i + 1}
              </span>
              <span className="text-sm font-medium text-[#12007D]">{s.municipio}</span>
            </div>
            {s.status === "em andamento" ? (
              <span className="rounded-full bg-[#FBA71A]/15 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-[#8A5A00]">
                Em implantação
              </span>
            ) : (
              <span className="rounded-full bg-[#00B36B]/15 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-[#00764A]">
                Implantado
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function SimplificacaoView() {
  return (
    <>
      <Section titulo="Programas de Simplificação">
        <div className="space-y-3">
          <StatusMunicipios
            emoji="🧾"
            titulo="Empresa Mais Simples"
            implantado={EMS_IMPLANTADO}
            emImplantacao={EMS_EM_IMPLANTACAO}
          />
          <StatusMunicipios
            emoji="📜"
            titulo="Lei/ Decreto de Liberdade Econômica"
            implantado={DEC_IMPLANTADO}
            emImplantacao={DEC_EM_IMPLANTACAO}
          />
        </div>
      </Section>

      <Section titulo="Tempo Médio de Abertura de Empresa">
        <div className="space-y-3">
          {TEMPO_ABERTURA.map(({ faixa, municipios }) => {
            const meta = FAIXA_META[faixa];
            return (
              <div key={faixa} className={cardBase}>
                <div className="flex items-center gap-2">
                  <span className="text-lg leading-none">{meta.emoji}</span>
                  <div className="font-display text-base font-bold text-[#12007D]">{meta.label}</div>
                </div>
                <div className="mt-3">
                  <Chips items={municipios} tone={meta.tone} />
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section titulo="Selo de Serviço de Inspeção Municipal">
        <div className={cardBase}>
          <ol className="space-y-1">
            {SIM_SELO_INSPECAO.map((s, i) => (
              <li
                key={s.municipio}
                className="flex items-center justify-between rounded-lg bg-[#12007D]/5 px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  <span className="w-4 text-center text-xs font-bold tabular-nums text-[#12007D]/40">
                    {i + 1}
                  </span>
                  <span className="text-sm font-medium text-[#12007D]">{s.municipio}</span>
                </div>
                {s.status === "em andamento" ? (
                  <span className="rounded-full bg-[#FBA71A]/15 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-[#8A5A00]">
                    Em implantação
                  </span>
                ) : (
                  <span className="rounded-full bg-[#00B36B]/15 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-[#00764A]">
                    Implantado
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </Section>
    </>
  );
}


// ================= INCLUSÃO SOCIOPRODUTIVA =================
export function InclusaoSocioprodutivaView() {
  return (
    <Section titulo="Projetos de Inclusão Socioprodutiva">
      <div className="space-y-3">
        <ProjetoBox
          emoji="🧵"
          titulo="Artesanato"
          municipios={[
            "Juazeiro do Norte",
            "Crato",
            "Nova Olinda",
            "Mauriti",
            "Brejo Santo",
            "Barro",
            "Várzea Alegre",
            "Campos Sales",
            "Barbalha",
            "Missão Velha",
          ]}
        />
        <ProjetoBox
          logoUrl={logoTerritoriosEsperanca.url}
          titulo="Circuitos Criativos"
          municipios={["Assaré", "Potengi", "Salitre"]}
        />
        <ProjetoBox
          logoUrl={logoSaboresCariri.url}
          titulo="Polo Gastronômico"
          municipios={["Barbalha"]}
        />

        <ProjetoBox
          emoji="🏪"
          titulo="Revitalização de Mercados Públicos"
          municipios={["Várzea Alegre", "Crato"]}
        />
        <ProjetoBox
          emoji="🤝"
          titulo="Comunidades Empreendedoras"
          municipios={["Barro", "Salitre", "Potengi", "Assaré", "Várzea Alegre", "Crato", "Santana do Cariri"]}
        />
      </div>
    </Section>
  );
}

// ================= LIDERANÇAS LOCAIS E GOVERNANÇA =================
const ROTA_TURISTICA_MUNICIPIOS = [
  "Barbalha",
  "Juazeiro do Norte",
  "Crato",
  "Santana do Cariri",
  "Nova Olinda",
  "Assaré",
];

const RMC_MUNICIPIOS = [
  "Juazeiro do Norte",
  "Crato",
  "Barbalha",
  "Missão Velha",
  "Caririaçu",
  "Farias Brito",
  "Nova Olinda",
  "Santana do Cariri",
  "Jardim",
];

const GOVERNANCAS: {
  emoji?: string;
  logoUrl?: string;
  logoTransparent?: boolean;
  nome: string;
  descricao: string;
  municipios?: string[];
  abrangencia?: string;
}[] = [
  { logoUrl: logoLider.url, nome: "Agência LIDER", descricao: "Lideranças impulsionando o desenvolvimento do Cariri", abrangencia: "100% do Cariri" },
  { logoUrl: logoRotaCariri.url, nome: "IGR — Instância de Governança Regional", descricao: "Governança do turismo do Cariri", abrangencia: "100% do Cariri" },
  { logoUrl: logoEcossistemaLocalInovacao.url, nome: "Comitê Regional de Inovação do Cariri", descricao: "Articulação de inovação", municipios: ["Juazeiro do Norte", "Missão Velha", "Crato", "Barbalha", "Jati"] },
  { logoUrl: logoRotaCariri.url, nome: "Consórcio do Turismo", descricao: "Cooperação intermunicipal do turismo", municipios: [...ROTA_TURISTICA_MUNICIPIOS, "Potengi", "Altaneira", "Missão Velha"] },
  { logoUrl: logoPoloCalcadista.url, nome: "Governança do Polo Calçadista", descricao: "Coordenação setorial calçadista", municipios: ["Barbalha", "Juazeiro do Norte", "Crato"] },
  { logoUrl: logoComiteSustentabilidade.url, logoTransparent: true, nome: "Comitê de Sustentabilidade da RMC", descricao: "Sustentabilidade da Região Metropolitana do Cariri", municipios: RMC_MUNICIPIOS },
];

export function LiderancasGovernancaView() {
  return (
    <Section titulo="Instâncias de Governança do Cariri">
      <div className="grid grid-cols-1 gap-2">
        {GOVERNANCAS.map((g) => (
          <div key={g.nome} className={cardBase}>
            <div className="flex items-start gap-3">
              {g.logoUrl ? (
                <img src={g.logoUrl} alt="" className="h-10 w-10 shrink-0 object-contain" />
              ) : (
                <span className="text-2xl">{g.emoji}</span>
              )}
              <div className="min-w-0 flex-1">
                <div className="font-display text-sm font-bold text-[#12007D]">{g.nome}</div>
                <div className="mt-0.5 text-[0.7rem] leading-tight text-[#12007D]/70">{g.descricao}</div>
                {g.abrangencia && (
                  <div className="mt-2 inline-block rounded-full bg-[#12007D]/8 px-2.5 py-0.5 text-[0.65rem] font-semibold text-[#12007D]">
                    {g.abrangencia}
                  </div>
                )}
                {g.municipios && (
                  <div className="mt-2">
                    <Chips items={g.municipios} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ================= RESILIÊNCIA CLIMÁTICA E SUSTENTABILIDADE =================
const ISO_37100_MUNICIPIOS = [
  "Juazeiro do Norte",
  "Crato",
  "Barbalha",
  "Nova Olinda",
  "Santana do Cariri",
  "Farias Brito",
  "Missão Velha",
  "Jardim",
];

export function ResilienciaClimaticaView() {
  const odsMunicipios = SELOS_SALAS_EMPREENDEDOR
    .filter((s) => s.selo === "diamante" || s.selo === "ouro")
    .map((s) => s.municipio.nome);
  return (
    <Section titulo="Ações de Sustentabilidade">
      <div className="space-y-3">
        <ProjetoBox
          logoUrl={logoOds.url}
          titulo="ODS nas Salas do Empreendedor"
          subtitulo="Desenvolvimento territorial para práticas sustentáveis"
          municipios={odsMunicipios}
        >
          <img
            src={logoSalaEmpreendedor.url}
            alt="Sala do Empreendedor"
            className="mt-3 h-8 w-auto object-contain"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {ODS_LOGOS.map((o) => (
              <img
                key={o.n}
                src={o.url}
                alt={`ODS ${o.n}`}
                title={`ODS ${o.n}`}
                className="h-12 w-12 rounded-md object-contain"
              />
            ))}
          </div>
        </ProjetoBox>
      </div>

      <h3 className="mb-3 mt-6 font-display text-sm font-bold uppercase tracking-widest text-white/70">
        Governanças
      </h3>
      <div className="space-y-3">
        <ProjetoBox
          logoUrl={logoComiteSustentabilidade.url}
          titulo="Comitê de Sustentabilidade da RMC"
          subtitulo="Sustentabilidade da Região Metropolitana do Cariri"
        >
          <div className="mt-3 rounded-xl bg-[#12007D]/5 p-3">
            <div className="flex items-start gap-3">
              <img src={logoIso.url} alt="ISO" className="h-8 w-auto shrink-0 object-contain" />
              <div className="min-w-0 flex-1">
                <div className="font-display text-sm font-bold text-[#12007D]">ISO 37100</div>
                <div className="text-[0.7rem] leading-tight text-[#12007D]/70">
                  Base metodológica para Cidades e comunidades sustentáveis
                </div>
                <div className="mt-2">
                  <Chips items={ISO_37100_MUNICIPIOS} />
                </div>
              </div>
            </div>
          </div>
        </ProjetoBox>
      </div>
    </Section>
  );
}
