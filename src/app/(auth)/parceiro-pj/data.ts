import { Bell, CircleHelp, FileText, House, ReceiptText, ShieldCheck } from "lucide-react";
import type {
  BottomNavItem,
  ContractAddendum,
  ContractItem,
  ContractSigner,
  ContractStatus,
  InvoiceItem,
  NotificationItem,
  QuickAccessItem,
  SignatureStatus,
} from "./types";

export const companyIllustrationSrc =
  "https://www.figma.com/api/mcp/asset/01e73af6-942d-4e32-9b11-c6be651dc15c";
export const successIllustrationSrc =
  "https://www.figma.com/api/mcp/asset/3397c1e6-5daf-4297-bb05-01dcffce9cf3";

export const careCardImages = {
  telemedicina: "https://www.figma.com/api/mcp/asset/8edb0148-9410-49ee-84bb-2eab1c83cbca",
  club: "https://www.figma.com/api/mcp/asset/a6bbc4de-b535-40d1-9041-b3d397c2246a",
};

export const supportIllustrationSrc =
  "https://www.figma.com/api/mcp/asset/f76c4197-b00d-4682-9d94-f58c4b75563d";

export const uiText = {
  heading: "Dados da empresa",
  subtitle: "Verifique os dados do seu CNPJ, se estiver tudo correto clique em prosseguir",
  razaoSocial: "Razão social",
  email: "E-mail",
  endereco: "Endereço",
  municipio: "Município",
  cnaesSecundarios: "CNAEs Secundários",
  confirm:
    "Confirmo que todos os meus dados jurídicos informados e revisados acima estão corretos",
  next: "PRÓXIMO",
  successTitle: "Tudo certo!",
  successSubtitle:
    "Seu cadastro foi finalizado, a partir de agora você terá acesso aos seus contratos e ordens de serviço emitidas para você.",
  accessApp: "ACESSAR APP",
  hello: "Olá, Felipe Alves",
  quickAccessTitle: "Acesso rápido",
  careTitle: "Cuidados para você",
  careClubText: "Ganhe descontos em farmácias, cursos, cinemas e mais.",
  contracts: "Contratos",
  contractType: "CONTRATO PRESTAÇÃO GERAL",
  start: "Início:",
  end: "Fim:",
  value: "Valor:",
  signed: "Assinado:",
  waiting: "Aguardando",
  contract: "Contrato",
  contractData: "Dados do contrato",
  contractSignatures: "Assinaturas do contrato",
  contractAddenda: "Aditivos deste contrato",
  contractId: "ID do contrato",
  contractStatus: "Status do contrato",
  sentDate: "Data de envio:",
  viewContract: "Ver contrato",
  downloadContract: "Baixar contrato",
  signatureStatus: "Status das assinaturas",
  addendum: "Aditivo",
  invoices: "Notas fiscais",
  emitInvoice: "EMITIR NF",
  issuedInvoices: "Notas Fiscais emitidas",
  issuedAt: "Emitida em:",
  paymentProof: "Comprovante de pagamento",
  noPaymentProof: "Nenhum comprovante anexado",
  invoiceModalTitle: "Nota Fiscal",
  invoiceNumber: "Nº da NF",
  invoiceIssueDate: "Data de emissão da NF",
  paymentProofShort: "Comprovante de pgto",
  view: "Ver",
  download: "Baixar",
  emitInvoiceModalTitle: "Emitir nota fiscal",
  chooseInvoiceAction: "Escolha como deseja continuar:",
  emitInvoiceOption: "Emitir nota fiscal pelo sistema",
  uploadInvoiceOption: "Fazer upload da nota fiscal",
  uploadInvoiceButton: "Anexar nota fiscal",
  attachedFile: "Arquivo anexado:",
  sendInvoice: "ENVIAR NF",
  cancel: "CANCELAR",
  invoiceAmountLabel: "Valor da nota fiscal",
  invoiceAmountPlaceholder: "R$ 0,00",
  linkedContractLabel: "Contrato vinculado",
  support: "Suporte",
  needHelp: "Precisa de ajuda?",
  contactChannels: "Entre em contato pelos canais abaixo",
  phoneLabel: "Telefone",
  supportPhone: "41 99999-9999",
  supportEmail: "suporte@seupj.com",
  callWhatsapp: "Chamar no WhatsApp",
  myData: "Meus dados",
  companyData: "Dados da empresa",
  contactData: "Dados de contato",
  bankingData: "Dados bancários",
  responsible: "Responsável",
  responsibleName: "Felipe Alves dos Santos",
  whatsapp: "WhatsApp",
  accountHolder: "Titular da conta",
  pixKeyType: "Chave PIX tipo cnpj:",
  pixKeyValue: "38300973000119",
  notifications: "Notificações",
} as const;

export const firstAccessCompanyData = {
  razaoSocial: "Kalisoft.tech",
  cnpj: "38.300.972/0001-19",
  email: "contato@kalisoft.tech",
  telefone: "47 99999-9999",
  endereco: "Rua XV de Novembro, nº 1457",
  municipio: "Blumenau",
  estado: "Santa Catarina",
  cnaePrincipal: "62.01-5/01",
  cnaesSecundarios: ["62.01-5/02", "62.02-3/00"],
} as const;

export const quickAccessItems: QuickAccessItem[] = [
  { id: "contracts", label: "Contratos", icon: FileText },
  { id: "nfs", label: "Notas Fiscais", icon: ReceiptText },
  { id: "support", label: "Suporte", icon: CircleHelp },
  { id: "profile", label: "Meus dados", icon: ShieldCheck },
];

export const bottomNavItems: BottomNavItem[] = [
  { id: "home", label: "Home", icon: House },
  { id: "contracts", label: "Contratos", icon: FileText },
  { id: "nfs", label: "NFs", icon: ReceiptText },
  { id: "alerts", label: "Alertas", icon: Bell },
];

export const contractStatusById: Record<ContractStatus, string> = {
  active: "Ativo",
  waiting_signature: "Aguardando assinatura",
  expired: "Vencido",
};

export const signatureStatusLabelById: Record<SignatureStatus, string> = {
  signed: "Assinado",
  pending: "Pendente",
};

export const contractItems: ContractItem[] = [
  {
    code: "001",
    detailCode: "14578",
    status: "active",
    title: "CONTRATO PRESTAÇÃO GERAL",
    startDate: "26/05/2025",
    endDate: "24/06/2025",
    amount: "R$ 4.500,00",
    signedAt: "12/02/2025",
    sentDate: "24/05/2025",
  },
  {
    code: "002",
    detailCode: "14579",
    status: "waiting_signature",
    title: "CONTRATO PRESTAÇÃO GERAL",
    startDate: "26/05/2025",
    endDate: "24/06/2025",
    amount: "R$ 4.500,00",
    signedAt: "12/02/2025",
    sentDate: "24/05/2025",
  },
  {
    code: "003",
    detailCode: "14580",
    status: "expired",
    title: "CONTRATO PRESTAÇÃO GERAL",
    startDate: "26/05/2025",
    endDate: "24/06/2025",
    amount: "R$ 4.500,00",
    sentDate: "24/05/2025",
  },
];

export const fallbackContractItem: ContractItem = {
  code: "",
  detailCode: "",
  status: "active",
  title: "",
  startDate: "",
  endDate: "",
  amount: "",
  sentDate: "",
};

export const contractSigners: ContractSigner[] = [
  { name: "Guarasoft", email: "contato@guarasoft.com", status: "signed" },
  { name: "Felipe Alves", email: "felipe@alves.com", status: "pending" },
];

export const contractAddenda: ContractAddendum[] = [
  { id: "addendum-14578", code: "14578", sentDate: "24/05/2025" },
  { id: "addendum-14599-a", code: "14599", sentDate: "24/05/2025" },
  { id: "addendum-14599-b", code: "14599", sentDate: "24/05/2025" },
];

export const invoiceItems: InvoiceItem[] = [
  {
    id: "invoice-4321-a",
    code: "NF4321",
    issuedAt: "12/04/2025",
    contractCode: "14578",
    paymentProof: "comprovante4321.pdf",
  },
  { id: "invoice-4321-b", code: "NF4321", issuedAt: "12/04/2025", contractCode: "14578" },
  { id: "invoice-4321-c", code: "NF4321", issuedAt: "12/04/2025", contractCode: "14578" },
  { id: "invoice-4321-d", code: "NF4321", issuedAt: "12/04/2025", contractCode: "14578" },
  { id: "invoice-4321-e", code: "NF4321", issuedAt: "12/04/2025", contractCode: "14578" },
  { id: "invoice-4321-f", code: "NF4321", issuedAt: "12/04/2025", contractCode: "14578" },
  { id: "invoice-4321-g", code: "NF4321", issuedAt: "12/04/2025", contractCode: "14578" },
];

export const notificationItems: NotificationItem[] = [
  {
    id: "notification-important",
    title: "Aviso importante",
    message:
      "Mantenha seus dados de contato atualizado, você receberá notificações, contratos para assinatura e afins por esses contatos",
    timestamp: "24/05/2025 às 16:42",
  },
  {
    id: "notification-01-a",
    title: "Notificação 01",
    message: "Mantenha seus dados de contato atualizado",
    timestamp: "24/05/2025 às 16:42",
  },
  {
    id: "notification-pending-contract",
    title: "Contrato pendente",
    message: "Mantenha seus dados de contato atualizado, você receberá notificações, contratos.",
    timestamp: "24/05/2025 às 16:42",
  },
  {
    id: "notification-01-b",
    title: "Notificação 01",
    message: "Mantenha seus dados de contato atualizado",
    timestamp: "24/05/2025 às 16:42",
  },
  {
    id: "notification-01-c",
    title: "Notificação 01",
    message: "Mantenha seus dados de contato atualizado",
    timestamp: "24/05/2025 às 16:42",
  },
];
