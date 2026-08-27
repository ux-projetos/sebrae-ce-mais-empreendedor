import logoSebrae from "@/assets/logo-sebrae-rgb-white.svg";
import logoAtlasTerritorial from "@/assets/atlas-territorial-negativo-limao.svg";

export function LogosInstitucionais({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 sm:gap-5 md:gap-7 ${className}`}>
      <img
        src={logoSebrae}
        alt="Sebrae"
        className="h-[2.86rem] w-auto shrink-0 self-center sm:h-[3.64rem] md:h-[4.68rem]"
      />
      <div className="h-[2.86rem] w-px shrink-0 self-center bg-[#DAD5CF]/30 sm:h-[3.64rem] md:h-[4.68rem]" aria-hidden />
      <img
        src={logoAtlasTerritorial}
        alt="Atlas Territorial"
        className="h-[2.34rem] w-auto shrink-0 self-center sm:h-[2.86rem] md:h-[3.9rem]"
      />
    </div>
  );
}
