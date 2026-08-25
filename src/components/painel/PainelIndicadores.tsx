import {
  INDICADORES,
  isIndicadorMunicipio,
  PROJETOS_COMPETITIVIDADE,
  type IndicadorKey,
} from "@/data/indicadores";
import { MUNICIPIOS, type IndicadorMunicipioKey } from "@/data/municipios";

interface Props {
  indicadorAtivo: IndicadorKey | null;
  onSelect: (key: IndicadorKey | null) => void;
}

const TOTAL_MUNICIPIOS = MUNICIPIOS.length;


function countMunicipiosComIndicador(key: IndicadorMunicipioKey): number {
  return MUNICIPIOS.filter((m) => (m[key] ?? 0) > 0).length;
}

const MUNICIPIOS_COM_PROJETOS = new Set(
  PROJETOS_COMPETITIVIDADE.flatMap((p) => p.municipiosAtuacao),
).size;

function countFor(key: IndicadorKey): number {
  if (key === "rede_atendimento") return TOTAL_MUNICIPIOS;
  if (key === "competitividade") return MUNICIPIOS_COM_PROJETOS;
  return countMunicipiosComIndicador(key as IndicadorMunicipioKey);
}

export function PainelIndicadores({ indicadorAtivo, onSelect }: Props) {
  const sorted = [...INDICADORES]
    .map((ind) => ({ ind, qtd: countFor(ind.key) }))
    .sort((a, b) => b.qtd - a.qtd);

  return (
    <div className="flex h-full flex-col gap-3 rounded-3xl border border-[#1800AD]/10 bg-white p-5 shadow-[0_20px_60px_-20px_rgba(24,0,173,0.15)]">
      <div>
        <h2 className="font-display text-xl font-black text-[#1800AD]">Estratégia de Desenvolvimento Regional</h2>
        <p className="mt-1 text-[0.7rem] leading-snug text-[#1800AD]/60">
          Quantos dos {TOTAL_MUNICIPIOS} municípios possuem cada eixo. Toque para destacá-los no mapa.
        </p>
      </div>

      <div className="flex-1 space-y-1.5 overflow-y-auto pr-1">
        {sorted.map(({ ind, qtd }) => {
          const active = indicadorAtivo === ind.key;
          const isMunicipal = isIndicadorMunicipio(ind.key);
          const pct = Math.round((qtd / TOTAL_MUNICIPIOS) * 100);
          return (
            <button
              key={ind.key}
              onClick={() => onSelect(active ? null : ind.key)}
              className={`group flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-all
                ${active ? "bg-[#1800AD] text-white shadow-md" : "text-[#1800AD] hover:bg-[#1800AD]/5"}`}
            >
              <span
                className={`grid h-7 w-7 shrink-0 place-items-center rounded-md text-sm transition
                  ${active ? "bg-white/20" : "bg-[#1800AD]/5 group-hover:bg-[#1800AD]/10"}`}
              >
                {ind.emoji}
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[0.72rem] font-semibold leading-tight">
                  {ind.nome}
                </div>
                <div
                  className={`mt-1 h-1.5 w-full overflow-hidden rounded-full
                    ${active ? "bg-white/25" : "bg-[#1800AD]/10"}`}
                >
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${pct}%`,
                      background: active
                        ? "linear-gradient(90deg, #FBA71A, #ffffff)"
                        : isMunicipal
                          ? "linear-gradient(90deg, #1994D2, #1800AD)"
                          : "linear-gradient(90deg, #F37022, #FBA71A)",
                    }}
                  />
                </div>
              </div>
              <span
                className={`font-display text-sm font-black tabular-nums
                  ${active ? "text-white" : "text-[#1800AD]"}`}
              >
                {`${qtd}/${TOTAL_MUNICIPIOS}`}
              </span>
            </button>
          );
        })}
      </div>


      {indicadorAtivo && (
        <button
          onClick={() => onSelect(null)}
          className="rounded-full border border-[#1800AD]/20 bg-white px-3 py-1.5 text-[0.7rem] font-medium text-[#1800AD] hover:bg-[#1800AD]/5"
        >
          Limpar seleção
        </button>
      )}
    </div>
  );
}

