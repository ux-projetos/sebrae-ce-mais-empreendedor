export function PropositoSebrae({ className = "" }: { className?: string }) {
  return (
    <p
      className={`font-impact text-lg font-medium italic leading-snug text-[#F2F0EE] sm:text-xl lg:text-2xl ${className}`}
    >
      Transformar a vida das pessoas por meio do{" "}
      <span className="not-italic font-bold text-white">empreendedorismo</span>.
    </p>
  );
}
