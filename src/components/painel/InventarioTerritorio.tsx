import { useEffect, useMemo, useState } from "react";
import { BrasaoMunicipio } from "./BrasaoMunicipio";
import { X, ExternalLink } from "lucide-react";
import {
  bussolaDe,
  loadInventario,
  STATUS_META,
  SETORES,
  type BussolaMunicipio,
  type CategoriaBussola,
} from "@/data/inventario";

interface Props {
  municipioNome: string;
  /** Cor do cluster territorial do município (usada no brasão). */
  cor?: string;
}

/** Caminho de um setor anular (donut slice) em coordenadas 0–100. */
function arco(a0: number, a1: number, r0: number, r1: number) {
  const p = (ang: number, r: number) => {
    const rad = ((ang - 90) * Math.PI) / 180;
    return [50 + r * Math.cos(rad), 50 + r * Math.sin(rad)] as const;
  };
  const grande = a1 - a0 > 180 ? 1 : 0;
  const [x0, y0] = p(a0, r1);
  const [x1, y1] = p(a1, r1);
  const [x2, y2] = p(a1, r0);
  const [x3, y3] = p(a0, r0);
  return `M ${x0} ${y0} A ${r1} ${r1} 0 ${grande} 1 ${x1} ${y1} L ${x2} ${y2} A ${r0} ${r0} 0 ${grande} 0 ${x3} ${y3} Z`;
}

interface Segmento {
  cat: CategoriaBussola;
  d: string;
  vazia: boolean;
  /** posição (%) do tooltip */
  tx: number;
  ty: number;
  setor: CategoriaBussola["setor"];
}

export function InventarioTerritorio({ municipioNome, cor = "#7EC8F5" }: Props) {
  const [dados, setDados] = useState<BussolaMunicipio | null>(null);
  const [aberta, setAberta] = useState<CategoriaBussola | null>(null);
  const [hover, setHover] = useState<Segmento | null>(null);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    let vivo = true;
    setDados(null);
    setAberta(null);
    setHover(null);
    loadInventario()
      .then((file) => vivo && setDados(bussolaDe(file, municipioNome)))
      .catch(() => vivo && setErro(true));
    return () => {
      vivo = false;
    };
  }, [municipioNome]);

  const meta = dados ? STATUS_META[dados.status] : null;
  const categorias = useMemo(() => dados?.categorias ?? [], [dados]);

  const segmentos = useMemo<Segmento[]>(() => {
    const total = categorias.length || 1;
    const passo = 360 / total;
    const gap = Math.min(1.6, passo * 0.16);
    const max = Math.max(1, ...categorias.map((c) => c.itens.length));
    return categorias.map((cat, i) => {
      const a0 = i * passo + gap / 2;
      const a1 = (i + 1) * passo - gap / 2;
      const meio = (a0 + a1) / 2;
      // distância orgânica: leve variação determinística por índice
      const jitter = Math.sin(i * 2.399) * 1.8 + Math.cos(i * 1.117) * 1.1;
      const r0 = 24.5 + jitter;
      const vazia = cat.itens.length === 0;
      const esp = vazia ? 1.6 : 3 + 14 * (cat.itens.length / max);
      const r1 = r0 + esp;
      const rad = ((meio - 90) * Math.PI) / 180;
      const rt = Math.min(r1 + 12, 44);
      return {
        cat,
        setor: cat.setor,
        vazia,
        d: arco(a0, a1, r0, r1),
        tx: Math.max(24, Math.min(76, 50 + rt * Math.cos(rad))),
        ty: Math.max(14, Math.min(86, 50 + rt * Math.sin(rad))),
      };
    });
  }, [categorias]);

  const arcosSetor = useMemo(() => {
    const total = categorias.length || 1;
    const passo = 360 / total;
    const grupos = new Map<string, { cor: string; nome: string; emoji: string; is: number[] }>();
    categorias.forEach((c, i) => {
      const g = grupos.get(c.setor.id) ?? { cor: c.setor.cor, nome: c.setor.nome, emoji: c.setor.emoji, is: [] };
      g.is.push(i);
      grupos.set(c.setor.id, g);
    });
    return Array.from(grupos.entries()).map(([id, g]) => {
      const a0 = Math.min(...g.is) * passo + 0.6;
      const a1 = (Math.max(...g.is) + 1) * passo - 0.6;
      const meio = (a0 + a1) / 2;
      const rad = ((meio - 90) * Math.PI) / 180;
      const rEmoji = 17.2;
      return {
        id,
        cor: g.cor,
        emoji: g.emoji,
        d: arco(a0, a1, 20.4, 22.4),
        ex: 50 + rEmoji * Math.cos(rad),
        ey: 50 + rEmoji * Math.sin(rad),
      };
    });
  }, [categorias]);

  if (erro) return null;

  return (
    <section className="relative overflow-hidden rounded-3xl bg-[#1ABC9C] p-4 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)] sm:p-6">
      <div className="text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-[#F2F0EE]/45">
        Inventário territorial
      </div>
      <h3 className="mt-1 font-display text-xl font-black text-[#F2F0EE] sm:text-2xl">
        Ativos de {municipioNome}
      </h3>
      <p className="mt-1 text-[0.75rem] leading-relaxed text-[#F2F0EE]/55">
        Ativos que contribuem e impulsionam o Ambiente de Negócios do município.
      </p>

      {!dados ? (
        <div className="mt-6 grid h-32 place-items-center text-sm text-[#F2F0EE]/50">
          Carregando o inventário…
        </div>
      ) : (
        <>
          {/* Sunburst: brasão ao centro, 31 arcos proporcionais ao redor */}
          <div className="mx-auto mt-6 aspect-square w-full max-w-[1100px]">
            <div
              className="relative h-full w-full rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(242,240,238,0.10) 0%, rgba(242,240,238,0.04) 42%, rgba(0,0,0,0.35) 78%, rgba(0,0,0,0.5) 100%)",
              }}
              onMouseLeave={() => setHover(null)}
            >
              {/* anéis tracejados */}
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2 rounded-full animate-slow-spin"
                style={{
                  background: `repeating-conic-gradient(#F5B800 0deg 3deg, transparent 3deg 11.6deg)`,
                  WebkitMask: "radial-gradient(circle, transparent 90%, #000 90%)",
                  mask: "radial-gradient(circle, transparent 90%, #000 90%)",
                  opacity: 0.5,
                }}
                aria-hidden
              />

              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
                <defs>
                  <filter id="seg-shadow" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="0.5" stdDeviation="0.7" floodColor="#000" floodOpacity="0.55" />
                  </filter>
                </defs>

                {/* arco sutil por setor temático */}
                {arcosSetor.map((s) => (
                  <path
                    key={s.id}
                    d={s.d}
                    fill={s.cor}
                    fillOpacity={hover && hover.setor.id === s.id ? 0.4 : 0.22}
                    className="transition-[fill-opacity] duration-300"
                  />
                ))}

                {/* emoji representativo de cada setor, sempre visível */}
                {arcosSetor.map((s) => (
                  <text
                    key={`emoji-${s.id}`}
                    x={s.ex}
                    y={s.ey}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="4.2"
                    className="pointer-events-none select-none animate-seg-in"
                    style={{ textShadow: "0 1px 3px rgba(0,0,0,0.85)" }}
                    aria-hidden
                  >
                    {s.emoji}
                  </text>
                ))}

                {/* segmentos das categorias */}
                {segmentos.map((s, i) => {
                  const ativo = hover?.cat.indice === s.cat.indice;
                  const apagado = hover && !ativo;
                  return (
                    <path
                      key={s.cat.indice}
                      d={s.d}
                      fill={s.vazia ? "none" : s.cat.setor.cor}
                      stroke={s.cat.setor.cor}
                      strokeWidth={s.vazia ? 0.28 : 0}
                      strokeDasharray={s.vazia ? "0.9 0.9" : undefined}
                      strokeOpacity={s.vazia ? (ativo ? 0.8 : 0.4) : 0}
                      fillOpacity={s.vazia ? 0 : apagado ? 0.4 : 1}
                      filter={s.vazia ? undefined : "url(#seg-shadow)"}
                      className="animate-seg-in cursor-pointer transition-[fill-opacity,stroke-opacity] duration-200"
                      style={{ animationDelay: `${i * 26}ms` }}
                      tabIndex={0}
                      role="button"
                      aria-label={`${s.cat.indice}. ${s.cat.nome} — ${s.cat.itens.length} ativos`}
                      onMouseEnter={() => setHover(s)}
                      onTouchStart={() => setHover(s)}
                      onFocus={() => setHover(s)}
                      onClick={() => setAberta(s.cat)}
                      onKeyDown={(e) => e.key === "Enter" && setAberta(s.cat)}
                    />

                  );
                })}
              </svg>


              {/* disco central com o brasão */}
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 flex h-[28%] w-[28%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-[#7EC8F5] p-2 text-center ring-4 ring-[#7EC8F5]/15 sm:h-[26%] sm:w-[26%] sm:p-3"
                style={{ boxShadow: "0 24px 60px -24px rgba(126,200,245,0.8)" }}
              >
                <BrasaoMunicipio nome={municipioNome} cor={cor} className="h-[55%] w-auto animate-float sm:h-[58%]" />
                <div className="w-full max-w-full px-0.5">
                  <div className="font-display text-[0.38rem] font-black uppercase leading-none tracking-[0.02em] text-balance text-[#0B0B0B] sm:text-[0.55rem] sm:tracking-[0.04em]">
                    {municipioNome}
                  </div>
                  <div className="mt-0.5 text-[0.36rem] font-semibold leading-none text-[#0B0B0B]/60 sm:text-[0.48rem]">
                    {dados.totalItens.toLocaleString("pt-BR")} ativos
                  </div>
                </div>
              </div>

              {/* tooltip de interação */}
              {hover && (
                <div
                  className="pointer-events-none absolute z-20 w-[42%] max-w-[15rem] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-[#F2F0EE] px-3 py-2 text-left shadow-2xl animate-in fade-in zoom-in-95"
                  style={{ left: `${hover.tx}%`, top: `${hover.ty}%` }}
                >
                  <div
                    className="text-[0.5rem] font-semibold uppercase tracking-[0.2em]"
                    style={{ color: hover.cat.setor.cor }}
                  >
                    {hover.cat.setor.nome}
                  </div>
                  <div className="mt-0.5 font-display text-[0.78rem] font-black leading-tight text-[#0B0B0B]">
                    {hover.cat.indice}. {hover.cat.nome}
                  </div>
                  <div className="mt-1 inline-flex rounded-full bg-[#0B0B0B] px-2 py-0.5 text-[0.6rem] font-bold text-[#F2F0EE]">
                    {hover.cat.itens.length} {hover.cat.itens.length === 1 ? "ativo" : "ativos"}
                  </div>
                </div>
              )}
            </div>
          </div>


          {meta && (
            <p className="mt-4 text-[0.7rem] leading-relaxed text-[#F2F0EE]/45">
              <span className="font-bold text-[#7EC8F5]">{meta.rotulo}</span> — {meta.frase}
            </p>
          )}

          {/* Legenda sutil dos 6 setores temáticos */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-2xl border border-[#F2F0EE]/10 bg-[#F2F0EE]/5 px-4 py-3">
            {SETORES.map((s) => (
              <div
                key={s.id}
                className="flex items-center gap-1.5 text-[0.65rem] font-medium text-[#F2F0EE]/75"
              >
                <span
                  className="inline-flex h-5 w-5 items-center justify-center rounded-full text-[0.7rem]"
                  style={{ backgroundColor: `${s.cor}30` }}
                >
                  {s.emoji}
                </span>
                <span className="hidden sm:inline">{s.nome}</span>
                <span className="sm:hidden">{s.nome}</span>
              </div>
            ))}
          </div>

        </>
      )}

      {aberta && (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-black/70 p-4 backdrop-blur-sm animate-in fade-in"
          onClick={() => setAberta(null)}
        >
          <div
            className="max-h-[85vh] w-full max-w-2xl overflow-hidden rounded-3xl bg-[#F2F0EE] shadow-2xl animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-start justify-between gap-3 p-5"
              style={{ backgroundColor: aberta.setor.cor }}
            >
              <div>
                <div className="text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-[#0B0B0B]/70">
                  {aberta.setor.nome}
                </div>
                <h4 className="mt-1 font-display text-lg font-black leading-tight text-[#0B0B0B]">
                  {aberta.nome}
                </h4>
                <div className="mt-1 text-[0.7rem] font-semibold text-[#0B0B0B]/70">
                  {aberta.itens.length} {aberta.itens.length === 1 ? "ativo" : "ativos"} catalogados
                </div>
              </div>
              <button
                onClick={() => setAberta(null)}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B0B0B] text-[#F2F0EE]"
                aria-label="Fechar categoria"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-4">
              {aberta.itens.length === 0 ? (
                <p className="py-8 text-center text-sm text-[#0B0B0B]/60">
                  Nenhum ativo catalogado ainda nesta categoria — mapeamento em andamento.
                </p>
              ) : (
                <ul className="space-y-1.5">
                  {aberta.itens.map((it, i) => (
                    <li
                      key={`${it.nome}-${i}`}
                      className="flex items-center gap-2 rounded-xl bg-[#0B0B0B]/5 px-3 py-2 text-[0.8rem] text-[#0B0B0B]"
                    >
                      <span className="flex-1">{it.nome}</span>
                      {it.fonteLink && (
                        <a
                          href={it.fonteLink}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#1800AD] hover:opacity-70"
                          aria-label={`Saiba mais sobre ${it.nome}`}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
