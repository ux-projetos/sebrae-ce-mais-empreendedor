import type { LucideIcon } from "lucide-react";

/**
 * Selo de ícone padrão do Design System SEBRAE-CE: fundo em gradiente azul
 * institucional (#0037B8 no topo → #0042DB na base) com o ícone em branco.
 */
export function IconBadge({
  icon: Icon,
  className = "h-11 w-11",
  iconClassName = "h-5 w-5",
  rounded = "rounded-xl",
}: {
  icon: LucideIcon;
  className?: string;
  iconClassName?: string;
  rounded?: string;
}) {
  return (
    <span
      className={`grid shrink-0 place-items-center ${rounded} ${className}`}
      style={{ background: "linear-gradient(180deg, #0037B8 0%, #0042DB 100%)" }}
      aria-hidden
    >
      <Icon className={`text-white ${iconClassName}`} strokeWidth={2} />
    </span>
  );
}
