import logoSebrae from "@/assets/logo-sebrae-rgb-white.svg";
import logoAtlasTerritorial from "@/assets/atlas-territorial-negativo-limao.svg";

export function LogosInstitucionais({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 sm:gap-4 md:gap-6 ${className}`}>
      <img
        src={logoSebrae}
        alt="Sebrae"
        className="h-[2.86rem] w-auto sm:h-[3.64rem] md:h-[4.68rem]"
      />
      <div className="h-[2.34rem] w-px bg-[#DAD5CF]/25 sm:h-[2.86rem] md:h-[3.9rem]" aria-hidden />
      <img
        src={logoAtlasTerritorial}
        alt="Atlas Territorial"
        className="h-[2.34rem] w-auto sm:h-[2.86rem] md:h-[3.9rem]"
      />
    </div>
  );
}
