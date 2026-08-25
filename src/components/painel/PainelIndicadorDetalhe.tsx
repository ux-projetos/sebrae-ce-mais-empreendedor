import { INDICADORES, type IndicadorKey } from "@/data/indicadores";
import { X } from "lucide-react";
import logoSalaEmpreendedor from "@/assets/logo-sala-do-empreendedor.png.asset.json";
import { ConteudoIndicador } from "./ConteudoIndicador";

interface Props {
  indicadorKey: IndicadorKey;
  onClose: () => void;
  onSelectMunicipio: (id: string) => void;
  projetoAtivo: string | null;
  onSelectProjeto: (id: string | null) => void;
}

export function PainelIndicadorDetalhe({
  indicadorKey,
  onClose,
  onSelectMunicipio,
  projetoAtivo,
  onSelectProjeto,
}: Props) {
  const ind = INDICADORES.find((i) => i.key === indicadorKey)!;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 max-h-[80vh] overflow-hidden rounded-t-3xl bg-[#12007D] shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom md:inset-y-0 md:right-0 md:left-auto md:h-full md:max-h-none md:w-[520px] md:rounded-l-3xl md:rounded-t-none md:slide-in-from-right">
      <div className="flex items-start justify-between gap-3 border-b border-[#F2F0EE]/10 p-4 sm:p-6">
        <div className="flex min-w-0 items-start gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#2814C2] text-xl sm:h-14 sm:w-14 sm:rounded-2xl sm:text-2xl">
            {ind.emoji}
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">

              <h2 className="font-display text-lg font-black leading-tight text-[#F2F0EE] sm:text-2xl">
                {ind.nome}
              </h2>
              {ind.nome === "Salas do Empreendedor" && (
                <img
                  src={logoSalaEmpreendedor.url}
                  alt="Logo Sala do Empreendedor"
                  className="h-7 w-auto shrink-0 rounded-md bg-white/95 px-2 py-1 shadow-sm ring-1 ring-white/20 sm:h-9"
                />
              )}
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#F2F0EE] text-[#1800AD] hover:bg-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="max-h-[calc(80vh-88px)] overflow-y-auto p-4 sm:p-6 md:max-h-[calc(100vh-96px)]">
        <ConteudoIndicador
          indicadorKey={indicadorKey}
          onSelectMunicipio={onSelectMunicipio}
          projetoAtivo={projetoAtivo}
          onSelectProjeto={onSelectProjeto}
        />
      </div>
    </div>
  );
}
