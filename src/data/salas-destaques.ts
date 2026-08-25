// Iniciativas de impacto das Salas do Empreendedor do Cariri.
export interface DestaqueSala {
  titulo: string;
  municipioOrigem: string;
  descricao: string;
}

export const destaquesSalaDoEmpreendedor: DestaqueSala[] = [
  {
    titulo: "Moeda Carrapato",
    municipioOrigem: "Crato",
    descricao:
      "No Sítio Carrapato, óleo de cozinha usado vira moeda. O Banco Carrapatense de Sustentabilidade transforma reciclagem em economia circular real, com uma cédula própria que circula entre os moradores da comunidade.",
  },
  {
    titulo: "Parcerias com Universidades",
    municipioOrigem: "Juazeiro do Norte",
    descricao:
      "A Sala do Empreendedor conecta empreendedores direto às universidades da cidade, abrindo caminho para extensão, pesquisa aplicada e capacitação de ponta.",
  },
  {
    titulo: "Parceria com a Agência LIDER",
    municipioOrigem: "Todas as salas",
    descricao:
      "Uma rede que une todas as Salas do Empreendedor do Cariri à Agência LIDER, ampliando o alcance e a força institucional do atendimento em toda a região.",
  },
  {
    titulo: "Gestão de Inadimplência de MEIs",
    municipioOrigem: "Assaré",
    descricao:
      "Em vez de esperar o problema chegar, a Sala age antes: acompanha de perto os MEIs em risco de inadimplência, evitando que pequenos negócios fechem as portas por falta de orientação.",
  },
  {
    titulo: "Parceria com o Núcleo NARF",
    municipioOrigem: "Juazeiro do Norte",
    descricao:
      "Aplicação da Rede Estendida em parceria com o Núcleo NARF amplia o raio de atendimento da Sala do Empreendedor, levando suporte a quem está fora do centro urbano.",
  },
  {
    titulo: "Marias de Juá",
    municipioOrigem: "Juazeiro do Norte",
    descricao:
      "Capacitação e acesso a mercado feitos sob medida para mulheres empreendedoras — um programa que transforma potencial em renda real.",
  },
  {
    titulo: "Jornada de acesso a mercado para egressos do Senar",
    municipioOrigem: "Sala rural de Barbalha",
    descricao:
      "Quem se forma no Senar não fica parado: a Sala rural de Barbalha cria uma jornada guiada para transformar aprendizado técnico em negócio de verdade no campo.",
  },
  {
    titulo: "MARIÁ — atendimento digital com IA",
    municipioOrigem: "Juazeiro do Norte",
    descricao:
      "Inteligência artificial a serviço do empreendedor: o MARIÁ leva atendimento digital inteligente para quem precisa de suporte rápido, mesmo fora do horário da Sala física.",
  },
];

/** ODS prioritários das Salas do Empreendedor do Cariri. */
export const ODS_PRIORITARIOS = [
  { numero: 7, nome: "Energia Limpa e Acessível", cor: "#FCC30B" },
  { numero: 8, nome: "Trabalho Decente e Crescimento Econômico", cor: "#A21942" },
  { numero: 9, nome: "Indústria, Inovação e Infraestrutura", cor: "#FD6925" },
  { numero: 11, nome: "Cidades e Comunidades Sustentáveis", cor: "#FD9D24" },
  { numero: 12, nome: "Consumo e Produção Responsáveis", cor: "#BF8B2E" },
  { numero: 17, nome: "Parcerias e Meios de Implementação", cor: "#19486A" },
];
