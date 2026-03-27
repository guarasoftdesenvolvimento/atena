export type ActiveTab = "visao" | "notas";

export type InvoiceStatus =
  | "emitida"
  | "agendada"
  | "analise"
  | "paga"
  | "expirada"
  | "cancelada";

export type InvoiceCategoryColor =
  | "verde"
  | "roxo"
  | "azul"
  | "vermelho"
  | "amarelo"
  | "laranja";

export type InvoiceCategory = {
  label: string;
  cor: InvoiceCategoryColor;
};

export type Invoice = {
  id: string;
  numero: string;
  nome: string;
  dataEmissao: string;
  categorias: InvoiceCategory[];
  status: InvoiceStatus;
};

export type DonutDatum = {
  key: InvoiceStatus;
  pct: number;
};

export type BarDatum = {
  label: string;
  emitida: number;
  agendada: number;
  analise: number;
  paga: number;
  expirada: number;
  cancelada: number;
};

export type FilterOption = {
  label: string;
  value: string;
};

export type CreatedRemessa = {
  id: string;
  descricao: string;
  dataVencimento: string;
  invoices: Invoice[];
  valorTotal: number;
};

export type SummaryCard = {
  label: string;
  value: string;
};
