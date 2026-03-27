export type PartnerDetailsTab =
  | "Dados gerais"
  | "Atividades"
  | "Contratos"
  | "Exportar registros";

export type ContractModalType = "contrato" | "aditivo";

export type ContractStatus =
  | "Ativo"
  | "Aguardando assinatura"
  | "A vencer em 30 dias"
  | "Vencido";

export interface ContractCardItem {
  id: string;
  nomeModelo: string;
  status: ContractStatus;
  dataInicio: string;
  dataFim: string;
  valor: string;
  assinadoEm?: string;
}
