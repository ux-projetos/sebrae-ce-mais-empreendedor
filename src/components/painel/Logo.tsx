import logoCearaEmpreendedorAsset from "@/assets/logo-sebrae-ceara-empreendedor-2026.png.asset.json";
import logoSebraeBrancoAsset from "@/assets/logo-sebrae-mono-branco.png.asset.json";

export function LogosInstitucionais({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 sm:gap-4 md:gap-6 ${className}`}>
      <img
        src={logoCearaEmpreendedorAsset.url}
        alt="Sebrae Ceará + Empreendedor"
        className="h-11 w-auto sm:h-14 md:h-24 lg:h-28"
      />
      <div className="h-8 w-px bg-[#DAD5CF]/25 sm:h-10 md:h-14" aria-hidden />
      <img
        src={logoSebraeBrancoAsset.url}
        alt="Sebrae"
        className="h-12 w-auto sm:h-16 md:h-24"
      />
    </div>
  );
}
