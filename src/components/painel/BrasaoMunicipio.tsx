import { useState } from "react";
import { brasaoDe, iniciaisMunicipio } from "@/data/brasoes";

interface Props {
  nome: string;
  /** Cor do cluster territorial — usada no brasão-placeholder. */
  cor: string;
  className?: string;
}

/**
 * Brasão do município. Usa o arquivo oficial quando cadastrado em
 * src/data/brasoes.ts e, na ausência dele (ou se a imagem falhar), mostra o
 * escudo padronizado com as iniciais na cor do cluster.
 */
export function BrasaoMunicipio({ nome, cor, className = "" }: Props) {
  const url = brasaoDe(nome);
  const [falhou, setFalhou] = useState(false);

  if (url && !falhou) {
    return (
      <img
        src={url}
        alt={`Brasão de ${nome}`}
        loading="lazy"
        decoding="async"
        onError={() => setFalhou(true)}
        className={`object-contain drop-shadow ${className}`}
      />
    );
  }

  return (
    <svg
      viewBox="0 0 100 116"
      role="img"
      aria-label={`Brasão de ${nome}`}
      className={`drop-shadow ${className}`}
    >
      <path
        d="M50 2 96 16v46c0 27-19 43-46 52C23 105 4 89 4 62V16L50 2Z"
        fill={cor}
        stroke="#0B0B0B"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M50 12 87 23v38c0 21.5-15 34.5-37 42C28 95.5 13 82.5 13 61V23L50 12Z"
        fill="none"
        stroke="#0B0B0B"
        strokeOpacity="0.35"
        strokeWidth="2.5"
      />
      <text
        x="50"
        y="64"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#0B0B0B"
        fontSize="34"
        fontWeight="900"
        letterSpacing="1"
        fontFamily="var(--font-display, sans-serif)"
      >
        {iniciaisMunicipio(nome)}
      </text>
    </svg>
  );
}
