import type { Invoice, SummaryCard } from "./types";

export const invoices: Invoice[] = [
  {
    id: "1",
    numero: "#NF1258",
    nome: "Felipe Alves dos Santos",
    dataEmissao: "09/07/2025",
    categorias: [{ label: "Categoria 1", cor: "verde" }],
    status: "emitida",
  },
  {
    id: "2",
    numero: "#NF1258",
    nome: "Felipe Alves dos Santos",
    dataEmissao: "09/07/2025",
    categorias: [
      { label: "Categoria 1", cor: "roxo" },
      { label: "Cat 2", cor: "azul" },
      { label: "Cat 3", cor: "verde" },
      { label: "Cat 4", cor: "vermelho" },
      { label: "Cat 5", cor: "amarelo" },
    ],
    status: "agendada",
  },
  {
    id: "3",
    numero: "#NF1258",
    nome: "Felipe Alves dos Santos",
    dataEmissao: "09/07/2025",
    categorias: [
      { label: "Categoria 1", cor: "verde" },
      { label: "Cat 2", cor: "azul" },
    ],
    status: "analise",
  },
  {
    id: "4",
    numero: "#NF1258",
    nome: "Felipe Alves dos Santos",
    dataEmissao: "09/07/2025",
    categorias: [{ label: "Categoria 1", cor: "vermelho" }],
    status: "paga",
  },
  {
    id: "5",
    numero: "#NF1258",
    nome: "Felipe Alves dos Santos",
    dataEmissao: "09/07/2025",
    categorias: [
      { label: "Categoria 1", cor: "verde" },
      { label: "Cat 2", cor: "laranja" },
    ],
    status: "emitida",
  },
  {
    id: "6",
    numero: "#NF1258",
    nome: "Felipe Alves dos Santos",
    dataEmissao: "09/07/2025",
    categorias: [{ label: "Categoria 1", cor: "amarelo" }],
    status: "expirada",
  },
  {
    id: "7",
    numero: "#NF1258",
    nome: "Felipe Alves dos Santos",
    dataEmissao: "09/07/2025",
    categorias: [
      { label: "Categoria 1", cor: "verde" },
      { label: "Cat 2", cor: "roxo" },
    ],
    status: "emitida",
  },
  {
    id: "8",
    numero: "#NF1258",
    nome: "Felipe Alves dos Santos",
    dataEmissao: "09/07/2025",
    categorias: [
      { label: "Categoria 1", cor: "laranja" },
      { label: "Cat 2", cor: "azul" },
    ],
    status: "emitida",
  },
];

export const summaryCards: SummaryCard[] = [
  { label: "Emitida (a pagar)", value: "R$ 350.000,00" },
  { label: "Agendada para pagamento", value: "R$ 350.000,00" },
  { label: "Pagamento em análise", value: "R$ 350.000,00" },
  { label: "Total pago", value: "R$ 350.000,00" },
];
