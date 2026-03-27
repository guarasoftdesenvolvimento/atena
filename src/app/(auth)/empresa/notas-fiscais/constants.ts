import type { BarDatum, DonutDatum, FilterOption, InvoiceStatus } from "./types";

export const STATUS_COLORS: Record<InvoiceStatus, string> = {
  emitida: "#af52de",
  agendada: "#f5a623",
  analise: "#f5a623",
  paga: "#1ba785",
  expirada: "#d22020",
  cancelada: "#d22020",
};

export const STATUS_LABELS: Record<InvoiceStatus, string> = {
  emitida: "Emitida (a pagar)",
  agendada: "Agendada para pagamento",
  analise: "Pagamento em análise",
  paga: "Paga",
  expirada: "Expirada (cancelada)",
  cancelada: "Cancelada",
};

export const STATUS_BADGE_MAP: Record<
  InvoiceStatus,
  { label: string; bg: string; color: string }
> = {
  emitida: { label: "Recebida (a pagar)", bg: "#f0dbff", color: "#7c3aed" },
  agendada: { label: "Agendada para pagamento", bg: "#fef9c3", color: "#92400e" },
  analise: { label: "Pagamento em análise", bg: "#fef3c7", color: "#b45309" },
  paga: { label: "Paga", bg: "#d1fae5", color: "#065f46" },
  expirada: { label: "Expirada (não paga)", bg: "#fee2e2", color: "#991b1b" },
  cancelada: { label: "Cancelada", bg: "#fee2e2", color: "#991b1b" },
};

export const CAT_COLORS: Record<string, string> = {
  verde: "#1ba785",
  roxo: "#af52de",
  azul: "#5352ed",
  vermelho: "#d22020",
  amarelo: "#c9a800",
  laranja: "#ff9500",
};

export const DONUT_DATA: readonly DonutDatum[] = [
  { key: "emitida", pct: 50 },
  { key: "agendada", pct: 10 },
  { key: "analise", pct: 10 },
  { key: "paga", pct: 10 },
  { key: "expirada", pct: 10 },
  { key: "cancelada", pct: 10 },
];

export const BAR_DATA: readonly BarDatum[] = [
  {
    label: "1",
    emitida: 45000,
    agendada: 30000,
    analise: 8000,
    paga: 20000,
    expirada: 12000,
    cancelada: 10000,
  },
  {
    label: "2",
    emitida: 60000,
    agendada: 45000,
    analise: 15000,
    paga: 35000,
    expirada: 20000,
    cancelada: 18000,
  },
  {
    label: "3",
    emitida: 20000,
    agendada: 10000,
    analise: 5000,
    paga: 15000,
    expirada: 8000,
    cancelada: 6000,
  },
  {
    label: "4",
    emitida: 35000,
    agendada: 25000,
    analise: 12000,
    paga: 28000,
    expirada: 15000,
    cancelada: 12000,
  },
  {
    label: "5",
    emitida: 55000,
    agendada: 40000,
    analise: 18000,
    paga: 45000,
    expirada: 22000,
    cancelada: 19000,
  },
  {
    label: "6",
    emitida: 50000,
    agendada: 38000,
    analise: 16000,
    paga: 40000,
    expirada: 20000,
    cancelada: 17000,
  },
];

export const FILTER_STATUS_OPTIONS: FilterOption[] = [
  { value: "todos", label: "Todos" },
  { value: "emitida", label: "Recebida (a pagar)" },
  { value: "agendada", label: "Agendada para pagamento" },
  { value: "analise", label: "Pagamento em análise" },
  { value: "paga", label: "Paga" },
  { value: "expirada", label: "Expirada (não paga)" },
  { value: "cancelada", label: "Cancelada" },
];

export const FILTER_CATEGORY_OPTIONS: FilterOption[] = [
  { value: "todos", label: "Todos" },
  { value: "categoria-1", label: "Categoria 1" },
  { value: "categoria-2", label: "Categoria 2" },
  { value: "categoria-3", label: "Categoria 3" },
  { value: "categoria-4", label: "Categoria 4" },
  { value: "categoria-5", label: "Categoria 5" },
];

export const INVOICE_MODAL_STATUS_OPTIONS: FilterOption[] = [
  { value: "emitida", label: "Recebida (a pagar)" },
  { value: "agendada", label: "Agendada para pagamento" },
  { value: "analise", label: "Pagamento em analise" },
  { value: "paga", label: "Paga" },
  { value: "expirada", label: "Expirada (nao paga)" },
  { value: "cancelada", label: "Cancelada" },
];

export const REMESSA_QR_CODE_IMAGE_URL =
  "https://www.figma.com/api/mcp/asset/25095259-1a05-471f-9169-e74d1ba591f5";
export const REMESSA_PIX_KEY = "656s5dsdsdwedeafdfd551fd";
