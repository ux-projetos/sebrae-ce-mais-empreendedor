import logoSebrae from "@/assets/logo-sebrae-rgb-white.svg";
import logoAtlasTerritorial from "@/assets/atlas-territorial-negativo-limao.svg";

export function LogosInstitucionais({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 sm:gap-4 md:gap-6 ${className}`}>
      <img
        src={logoSebrae}
        alt="Sebrae"
        className="h-10 w-auto sm:h-12 md:h-16"
      />
      <div className="h-8 w-px bg-[#DAD5CF]/25 sm:h-10 md:h-14" aria-hidden />
      <img
        src={logoAtlasTerritorial}
        alt="Atlas Territorial"
        className="h-8 w-auto sm:h-10 md:h-14"
      />
    </div>
  );
}
