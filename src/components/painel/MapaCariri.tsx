import {
  MUNICIPIOS,
  pctOf,
  type MunicipioData,
  type IndicadorMunicipioKey,
} from "@/data/municipios";
import { PROJETOS_COMPETITIVIDADE } from "@/data/indicadores";
import { useIsMobile } from "@/hooks/use-mobile";
import geo from "@/data/cariri-geo.json";
import { X } from "lucide-react";
import { useDestaqueMapa } from "./destaque-mapa";

// Azul institucional Sebrae — cor padrão do mapa
const SEBRAE_AZUL = "#1800AD";

interface Props {
  onSelect: (m: MunicipioData) => void;
  selectedMunicipioId?: string | null;
  indicadorAtivo?: IndicadorMunicipioKey | null;
  projetoAtivo?: string | null;
  highlightId?: string | null;
  /** Nomes dos municípios com atuação no eixo selecionado. */
  eixoMunicipios?: string[] | null;
  eixoCor?: string | null;
}


function scoreColor(pct: number): string {
  if (pct >= 80) return "#00B36B";
  if (pct >= 60) return "#7ABF3F";
  if (pct >= 40) return "#FBA71A";
  if (pct >= 20) return "#F37022";
  return "#D64545";
}

interface GeoMunicipio {
  id: string;
  nome: string;
  d: string;
  cx: number;
  cy: number;
}
const GEO = geo as { width: number; height: number; municipios: GeoMunicipio[] };
const GEO_BY_NOME = new Map(GEO.municipios.map((g) => [g.nome, g]));

/** Quebra o nome do município em linhas curtas para caber dentro da área. */
function quebrarNome(nome: string, max = 11): string[] {
  const palavras = nome.split(" ");
  const linhas: string[] = [];
  let atual = "";
  for (const p of palavras) {
    const tentativa = atual ? `${atual} ${p}` : p;
    if (tentativa.length > max && atual) {
      linhas.push(atual);
      atual = p;
    } else {
      atual = tentativa;
    }
  }
  if (atual) linhas.push(atual);
  return linhas;
}

export function MapaCariri({
  onSelect,
  selectedMunicipioId,
  indicadorAtivo,
  projetoAtivo,
  highlightId,
  eixoMunicipios,
  eixoCor,
}: Props) {
  const isMobile = useIsMobile();
  const { destaque, limparDestaque } = useDestaqueMapa();
  const destaqueSet = destaque ? new Set(destaque.municipios) : null;
  const projeto = projetoAtivo
    ? PROJETOS_COMPETITIVIDADE.find((p) => p.id === projetoAtivo)
    : null;

  // Posiciona a logo do destaque sempre no lado direito do mapa,
  // escolhendo entre canto superior-direito e inferior-direito para
  // não sobrepor os municípios em destaque.
  const posicaoLogo = (() => {
    if (!destaque) return "right-3 top-3";
    const alvos = destaque.municipios
      .map((n) => GEO_BY_NOME.get(n))
      .filter(Boolean) as GeoMunicipio[];
    if (!alvos.length) return "right-3 top-3";
    const cantosDireita = [
      { cls: "right-2 top-2 sm:right-4 sm:top-4", x: GEO.width, y: 0 },
      { cls: "right-2 bottom-2 sm:right-4 sm:bottom-4", x: GEO.width, y: GEO.height },
    ];
    let melhor = cantosDireita[0];
    let melhorDist = -1;
    for (const c of cantosDireita) {
      const dist = Math.min(
        ...alvos.map((a) => Math.hypot(a.cx - c.x, a.cy - c.y)),
      );
      if (dist > melhorDist) {
        melhorDist = dist;
        melhor = c;
      }
    }
    return melhor.cls;
  })();

  return (
    <div className="relative flex w-full flex-col rounded-2xl bg-white p-3 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)] sm:rounded-3xl sm:p-5">
      <div className="mb-3 flex items-baseline justify-between">
        <div className="min-w-0">
          <div className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[#1800AD]/60 sm:text-[0.65rem] sm:tracking-[0.24em]">
            Cariri Cearense · 26 municípios
          </div>
          <h2 className="font-display text-base font-black text-[#12007D] sm:text-xl">
            Toque no seu município
          </h2>
        </div>
      </div>

      {/* MAPA INTERATIVO — divisão municipal real (malha IBGE) */}
      <div className="relative w-full overflow-hidden rounded-2xl bg-white">
        <svg
          viewBox={`0 0 ${GEO.width} ${GEO.height}`}
          className="h-auto w-full"
          role="img"
          aria-label="Mapa do Cariri cearense com os 26 municípios"
        >
          {MUNICIPIOS.map((m) => {
            const g = GEO_BY_NOME.get(m.nome);
            if (!g) return null;
            const pct = indicadorAtivo ? pctOf(m, indicadorAtivo) : null;
            const hasIndicador = indicadorAtivo ? (m[indicadorAtivo] ?? 0) > 0 : true;
            const inProj = projeto ? projeto.municipiosAtuacao.includes(m.nome) : true;
            const inEixo = eixoMunicipios ? eixoMunicipios.includes(m.nome) : true;
            const inDestaque = destaqueSet ? destaqueSet.has(m.nome) : true;
            const fill = destaque
              ? inDestaque
                ? destaque.cor
                : "#FFFFFF"
              : eixoCor
                ? inEixo
                  ? eixoCor
                  : "#FFFFFF"
                : pct !== null
                  ? hasIndicador
                    ? scoreColor(pct)
                    : "#FFFFFF"
                  : SEBRAE_AZUL;
            const dimmed =
              (projeto && !inProj) || (indicadorAtivo && !hasIndicador) || !inEixo;
            const isSelected = selectedMunicipioId === m.id;
            const isHighlight = highlightId === m.id;
            // Durante destaque de projeto/vocação, o mapa todo fica branco e
            // as divisões municipais precisam ser visíveis para manter o contorno do Cariri.
            const contornoDestaque = destaque && !inDestaque;
            const stroke = isSelected
              ? "#12007D"
              : contornoDestaque
                ? "#1800AD"
                : "#FFFFFF";
            const strokeOpacity = isSelected ? 1 : contornoDestaque ? 0.22 : 0.55;
            const strokeWidth = isSelected ? 4 : contornoDestaque ? 1.6 : 1.4;

            return (
              <g
                key={m.id}
                onClick={() => onSelect(m)}
                className={`cursor-pointer transition-opacity duration-300 ${
                  dimmed && !destaque ? "opacity-60" : "opacity-100"
                } ${isHighlight && !isSelected ? "animate-pulse" : ""}`}
                role="button"
                tabIndex={0}
                aria-label={`${m.nome}${pct !== null ? ` – ${pct}%` : ""}`}
              >
                <path
                  d={g.d}
                  fill={fill}
                  stroke={stroke}
                  strokeOpacity={strokeOpacity}
                  strokeWidth={strokeWidth}
                  strokeLinejoin="round"
                  className="transition-[fill,stroke] duration-500 hover:brightness-110"
                />
              </g>
            );
          })}

          {/* Rótulos por cima de todas as áreas */}
          {MUNICIPIOS.map((m) => {
            const g = GEO_BY_NOME.get(m.nome);
            if (!g) return null;
            const isSelected = selectedMunicipioId === m.id;
            const inDestaque = destaqueSet ? destaqueSet.has(m.nome) : true;
            const inEixo = eixoMunicipios ? eixoMunicipios.includes(m.nome) : true;
            const hasIndicador = indicadorAtivo ? (m[indicadorAtivo] ?? 0) > 0 : true;
            // Em destaque/filtro ativo, some com os nomes dos municípios sem a ação
            if (destaqueSet ? !inDestaque : !inEixo || !hasIndicador) return null;
            const escuro = destaqueSet || eixoCor || indicadorAtivo;
            const linhas = quebrarNome(m.nome);
            const maiorLinha = Math.max(...linhas.map((l) => l.length));
            const base = isMobile ? 13 : 11.5;
            const fontSize = Math.max(7.5, Math.min(base, (base * 11) / maiorLinha));
            const lineH = fontSize * 1.05;
            const yStart = g.cy - ((linhas.length - 1) * lineH) / 2;
            return (
              <text
                key={`t-${m.id}`}
                x={g.cx}
                y={yStart}
                textAnchor="middle"
                dominantBaseline="middle"
                className="pointer-events-none select-none"
                style={{
                  fontSize,
                  fill: escuro ? "#12007D" : "#FFFFFF",
                  fillOpacity: 0.95,
                  letterSpacing: "0.01em",
                  fontWeight: isSelected ? 800 : 500,
                }}
              >
                {linhas.map((linha, i) => (
                  <tspan key={linha + i} x={g.cx} dy={i === 0 ? 0 : lineH}>
                    {linha}
                  </tspan>
                ))}
              </text>
            );
          })}
        </svg>

        {destaque && (
          <div
            className={`pointer-events-none absolute z-50 flex flex-col items-center gap-2 animate-rise ${posicaoLogo}`}
          >
            {destaque.logoUrl ? (
              <img
                src={destaque.logoUrl}
                alt={destaque.titulo}
                className="h-32 w-32 object-contain drop-shadow-[0_18px_40px_rgba(0,0,0,0.35)] sm:h-52 sm:w-52"
              />
            ) : (
              <span className="text-[5rem] leading-none drop-shadow-[0_18px_40px_rgba(0,0,0,0.35)] sm:text-[7rem]">
                {destaque.emoji}
              </span>
            )}
            <button
              onClick={limparDestaque}
              className="pointer-events-auto mt-1 inline-flex items-center gap-1 rounded-full bg-[#12007D] px-3 py-1 text-[0.65rem] font-semibold text-white transition hover:bg-black"
            >
              <X className="h-3 w-3" />
              Voltar ao mapa
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
