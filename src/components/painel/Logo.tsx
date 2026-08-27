import logoSebrae from "@/assets/logo-sebrae-rgb-white.svg";
import logoAtlasTerritorial from "@/assets/atlas-territorial-negativo-limao.svg";

export function LogosInstitucionais({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 sm:gap-4 md:gap-6 ${className}`}>
      <img
        src={logoSebrae}
        alt="Sebrae"
        className="h-11 w-auto sm:h-14 md:h-18"
      />
      <div className="h-9 w-px bg-[#DAD5CF]/25 sm:h-11 md:h-15" aria-hidden />
      <img
        src={logoAtlasTerritorial}
        alt="Atlas Territorial"
        className="h-9 w-auto sm:h-11 md:h-15"
      />
    </div>
  );
}
