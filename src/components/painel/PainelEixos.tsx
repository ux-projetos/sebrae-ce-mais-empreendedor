import { EIXOS, type EixoKey } from "@/data/eixos";
import { EIXO_ICONS } from "@/lib/icons";
import { IconBadge } from "./IconBadge";

interface Props {
  eixoAtivo: EixoKey | null;
  onSelect: (key: EixoKey | null) => void;
}

/** Preto ou branco conforme a luminância da cor viva do eixo. */
function textoSobre(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.62 ? "#0B0B0B" : "#FFFFFF";
}

export function PainelEixos({ eixoAtivo, onSelect }: Props) {
  return (
    <div className="flex h-full flex-col gap-3 rounded-3xl bg-[#F2F0EE] p-4 shadow-[0_30px_80px_-45px_rgba(0,0,0,0.8)] sm:p-5">
      <div className="animate-rise">
        <div className="text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-[#0B0B0B]/45">
          Estratégia Ceará mais Empreendedor
        </div>
        <h2 className="mt-1 font-display text-xl font-black text-[#0B0B0B] sm:text-2xl">
          EIXOS ESTRATÉGICOS INTEGRADOS
        </h2>
        <p className="mt-1 text-[0.72rem] leading-snug text-[#0B0B0B]/55">
          Toque em um eixo para destacar no mapa os municípios com atuação.
        </p>
      </div>

      <div className="flex-1 space-y-2.5">
        {EIXOS.map((eixo, i) => {
          const ativo = eixoAtivo === eixo.key;
          const fg = ativo ? textoSobre(eixo.cor) : "#FFFFFF";
          return (
            <button
              key={eixo.key}
              onClick={() => onSelect(ativo ? null : eixo.key)}
              className={`group relative w-full overflow-hidden rounded-2xl p-4 text-left transition-all duration-200 animate-rise active:scale-[0.99] ${ativo ? "" : "bg-[#1ABC9C] hover:bg-[#1800AD]"}`}
              style={{
                animationDelay: `${120 + i * 70}ms`,
                backgroundColor: ativo ? eixo.cor : undefined,
                boxShadow: ativo ? `0 16px 34px -20px ${eixo.cor}` : "0 12px 28px -18px rgba(26,188,156,0.55)",
              }}
            >
              <span
                className="absolute inset-y-0 left-0 w-1.5"
                style={{ background: eixo.cor }}
                aria-hidden
              />
              <div className="relative flex items-center gap-3 pl-2">
                <IconBadge icon={EIXO_ICONS[eixo.key]} className="h-11 w-11" iconClassName="h-6 w-6" />
                <div className="min-w-0 flex-1">
                  <div
                    className="font-display text-base font-black leading-tight"
                    style={{ color: fg }}
                  >
                    {eixo.nome}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {eixoAtivo && (
        <button
          onClick={() => onSelect(null)}
          className="rounded-full bg-[#0B0B0B] px-3 py-2 text-[0.7rem] font-medium text-[#F2F0EE] transition hover:opacity-80"
        >
          Limpar seleção
        </button>
      )}
    </div>
  );
}
