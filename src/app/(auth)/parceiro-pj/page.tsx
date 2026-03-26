"use client";

import React from "react";
import {
  ArrowLeft,
  Bell,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  CircleHelp,
  ClipboardCheck,
  ClipboardList,
  CloudDownload,
  ExternalLink,
  FileText,
  House,
  NotebookText,
  Pencil,
  Plus,
  Phone,
  ReceiptText,
  ShieldCheck,
  Upload,
  X,
} from "lucide-react";
import { figmaAssets } from "@/lib/figmaAssets";
import styles from "./parceiro-pj.module.css";

type OnboardingStep =
  | "company_data"
  | "success"
  | "home"
  | "contracts"
  | "contract_detail"
  | "invoices"
  | "alerts"
  | "support"
  | "my_data";
type NavItemId = "home" | "contracts" | "nfs" | "alerts";
type ContractStatus = "active" | "waiting_signature" | "expired";
type SignatureStatus = "signed" | "pending";
type InvoiceFlowMode = "emit" | "upload";
type ProfileAccordionId = "company" | "contact" | "banking";

const companyIllustrationSrc =
  "https://www.figma.com/api/mcp/asset/01e73af6-942d-4e32-9b11-c6be651dc15c";
const successIllustrationSrc =
  "https://www.figma.com/api/mcp/asset/3397c1e6-5daf-4297-bb05-01dcffce9cf3";

const careCardImages = {
  telemedicina: "https://www.figma.com/api/mcp/asset/8edb0148-9410-49ee-84bb-2eab1c83cbca",
  club: "https://www.figma.com/api/mcp/asset/a6bbc4de-b535-40d1-9041-b3d397c2246a",
};
const supportIllustrationSrc =
  "https://www.figma.com/api/mcp/asset/f76c4197-b00d-4682-9d94-f58c4b75563d";

const uiText = {
  heading: "Dados da empresa",
  subtitle: "Verifique os dados do seu CNPJ, se estiver tudo correto clique em prosseguir",
  razaoSocial: "Raz\u00e3o social",
  email: "E-mail",
  endereco: "Endere\u00e7o",
  municipio: "Munic\u00edpio",
  cnaesSecundarios: "CNAEs Secund\u00e1rios",
  confirm:
    "Confirmo que todos os meus dados jur\u00eddicos informados e revisados acima est\u00e3o corretos",
  next: "PR\u00d3XIMO",
  successTitle: "Tudo certo!",
  successSubtitle:
    "Seu cadastro foi finalizado, a partir de agora voc\u00ea ter\u00e1 acesso aos seus contratos e ordens de servi\u00e7o emitidas para voc\u00ea.",
  accessApp: "ACESSAR APP",
  hello: "Ol\u00e1, Felipe Alves",
  quickAccessTitle: "Acesso r\u00e1pido",
  careTitle: "Cuidados para voc\u00ea",
  careClubText: "Ganhe descontos em farm\u00e1cias, cursos, cinemas e mais.",
  contracts: "Contratos",
  contractType: "CONTRATO PRESTA\u00c7\u00c3O GERAL",
  start: "In\u00edcio:",
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
  invoiceNumber: "N\u00ba da NF",
  invoiceIssueDate: "Data de emiss\u00e3o da NF",
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
};

const firstAccessCompanyData = {
  razaoSocial: "Kalisoft.tech",
  cnpj: "38.300.972/0001-19",
  email: "contato@kalisoft.tech",
  telefone: "47 99999-9999",
  endereco: "Rua XV de Novembro, n\u00ba 1457",
  municipio: "Blumenau",
  estado: "Santa Catarina",
  cnaePrincipal: "62.01-5/01",
  cnaesSecundarios: ["62.01-5/02", "62.02-3/00"],
};

const quickAccessItems = [
  { id: "contracts", label: "Contratos", icon: FileText },
  { id: "nfs", label: "Notas Fiscais", icon: ReceiptText },
  { id: "support", label: "Suporte", icon: CircleHelp },
  { id: "profile", label: "Meus dados", icon: ShieldCheck },
] as const;

const bottomNavItems = [
  { id: "home", label: "Home", icon: House },
  { id: "contracts", label: "Contratos", icon: FileText },
  { id: "nfs", label: "NFs", icon: ReceiptText },
  { id: "alerts", label: "Alertas", icon: Bell },
] as const;

const contractStatusById: Record<ContractStatus, string> = {
  active: "Ativo",
  waiting_signature: "Aguardando assinatura",
  expired: "Vencido",
};

const contractStatusClassById: Record<ContractStatus, string> = {
  active: styles.contractStatusActive,
  waiting_signature: styles.contractStatusWaitingSignature,
  expired: styles.contractStatusExpired,
};

const signatureStatusLabelById: Record<SignatureStatus, string> = {
  signed: "Assinado",
  pending: "Pendente",
};

const signatureStatusClassById: Record<SignatureStatus, string> = {
  signed: styles.signatureStatusSigned,
  pending: styles.signatureStatusPending,
};

type ContractItem = {
  code: string;
  detailCode: string;
  status: ContractStatus;
  title: string;
  startDate: string;
  endDate: string;
  amount: string;
  signedAt?: string;
  sentDate: string;
};

const contractItems: ContractItem[] = [
  {
    code: "001",
    detailCode: "14578",
    status: "active",
    title: "CONTRATO PRESTA\u00c7\u00c3O GERAL",
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
    title: "CONTRATO PRESTA\u00c7\u00c3O GERAL",
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
    title: "CONTRATO PRESTA\u00c7\u00c3O GERAL",
    startDate: "26/05/2025",
    endDate: "24/06/2025",
    amount: "R$ 4.500,00",
    sentDate: "24/05/2025",
  },
];

const contractSigners = [
  { name: "Guarasoft", email: "contato@guarasoft.com", status: "signed" as const },
  { name: "Felipe Alves", email: "felipe@alves.com", status: "pending" as const },
];

const contractAddenda = [
  { code: "14578", sentDate: "24/05/2025" },
  { code: "14599", sentDate: "24/05/2025" },
  { code: "14599", sentDate: "24/05/2025" },
] as const;

type InvoiceItem = {
  code: string;
  issuedAt: string;
  contractCode: string;
  paymentProof?: string;
};

const invoiceItems: InvoiceItem[] = [
  { code: "NF4321", issuedAt: "12/04/2025", contractCode: "14578", paymentProof: "comprovante4321.pdf" },
  { code: "NF4321", issuedAt: "12/04/2025", contractCode: "14578" },
  { code: "NF4321", issuedAt: "12/04/2025", contractCode: "14578" },
  { code: "NF4321", issuedAt: "12/04/2025", contractCode: "14578" },
  { code: "NF4321", issuedAt: "12/04/2025", contractCode: "14578" },
  { code: "NF4321", issuedAt: "12/04/2025", contractCode: "14578" },
  { code: "NF4321", issuedAt: "12/04/2025", contractCode: "14578" },
];

const notificationItems = [
  {
    title: "Aviso importante",
    message:
      "Mantenha seus dados de contato atualizado, você receberá notificações, contratos para assinatura e afins por esses contatos",
    timestamp: "24/05/2025 às 16:42",
  },
  {
    title: "Notificação 01",
    message: "Mantenha seus dados de contato atualizado",
    timestamp: "24/05/2025 às 16:42",
  },
  {
    title: "Contrato pendente",
    message: "Mantenha seus dados de contato atualizado, você receberá notificações, contratos.",
    timestamp: "24/05/2025 às 16:42",
  },
  {
    title: "Notificação 01",
    message: "Mantenha seus dados de contato atualizado",
    timestamp: "24/05/2025 às 16:42",
  },
  {
    title: "Notificação 01",
    message: "Mantenha seus dados de contato atualizado",
    timestamp: "24/05/2025 às 16:42",
  },
] as const;

const formatDateToBR = (date: Date) =>
  `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;

export default function ParceiroPJPage() {
  const assets = figmaAssets.login;
  const [step, setStep] = React.useState<OnboardingStep>("company_data");
  const [confirmed, setConfirmed] = React.useState(true);
  const [selectedContractCode, setSelectedContractCode] = React.useState<string>(
    contractItems[0].detailCode,
  );
  const [openAddendaIndexes, setOpenAddendaIndexes] = React.useState<number[]>([0]);
  const [openInvoiceIndexes, setOpenInvoiceIndexes] = React.useState<number[]>([0, 1]);
  const [openProfileSections, setOpenProfileSections] = React.useState<ProfileAccordionId[]>([
    "company",
  ]);
  const [invoiceModal, setInvoiceModal] = React.useState<InvoiceItem | null>(null);
  const [isEmitInvoiceModalOpen, setIsEmitInvoiceModalOpen] = React.useState(false);
  const [invoiceFlowMode, setInvoiceFlowMode] = React.useState<InvoiceFlowMode>("emit");
  const [uploadedInvoiceFileName, setUploadedInvoiceFileName] = React.useState("");
  const [emitInvoiceAmount, setEmitInvoiceAmount] = React.useState("");
  const [emitInvoiceContractCode, setEmitInvoiceContractCode] = React.useState(
    contractItems[0].detailCode,
  );
  const uploadInvoiceInputRef = React.useRef<HTMLInputElement>(null);
  const activeNavItemId: NavItemId | null = (() => {
    if (step === "contracts" || step === "contract_detail") {
      return "contracts";
    }

    if (step === "invoices") {
      return "nfs";
    }

    if (step === "alerts") {
      return "alerts";
    }

    if (step === "support") {
      return null;
    }

    return "home";
  })();
  const selectedContract =
    contractItems.find((contract) => contract.detailCode === selectedContractCode) ??
    contractItems[0];

  const handleQuickAccessClick = (itemId: (typeof quickAccessItems)[number]["id"]) => {
    if (itemId === "contracts") {
      setStep("contracts");
    }

    if (itemId === "nfs") {
      setStep("invoices");
    }

    if (itemId === "support") {
      setStep("support");
    }

    if (itemId === "profile") {
      setStep("my_data");
    }
  };

  const handleBottomNavClick = (itemId: NavItemId) => {
    if (itemId === "home") {
      setStep("home");
    }

    if (itemId === "contracts") {
      setStep("contracts");
    }

    if (itemId === "nfs") {
      setStep("invoices");
    }

    if (itemId === "alerts") {
      setStep("alerts");
    }
  };

  const handleContractCardClick = (contractCode: string) => {
    setSelectedContractCode(contractCode);
    setStep("contract_detail");
  };

  const toggleAddendum = (index: number) => {
    setOpenAddendaIndexes((current) =>
      current.includes(index) ? current.filter((item) => item !== index) : [...current, index],
    );
  };

  const handleOpenInvoiceModal = (invoice: InvoiceItem) => {
    setInvoiceModal(invoice);
  };

  const toggleInvoice = (index: number) => {
    setOpenInvoiceIndexes((current) =>
      current.includes(index) ? current.filter((item) => item !== index) : [...current, index],
    );
  };

  const toggleProfileSection = (sectionId: ProfileAccordionId) => {
    setOpenProfileSections((current) =>
      current.includes(sectionId)
        ? current.filter((item) => item !== sectionId)
        : [...current, sectionId],
    );
  };

  const handleOpenEmitInvoiceModal = () => {
    setInvoiceFlowMode("emit");
    setUploadedInvoiceFileName("");
    setEmitInvoiceAmount("");
    setEmitInvoiceContractCode(contractItems[0].detailCode);
    setIsEmitInvoiceModalOpen(true);
  };

  const handleCloseEmitInvoiceModal = () => {
    setIsEmitInvoiceModalOpen(false);
  };

  const handleInvoiceFlowModeChange = (mode: InvoiceFlowMode) => {
    setInvoiceFlowMode(mode);

    if (mode === "emit") {
      setUploadedInvoiceFileName("");
    }
  };

  const handleInvoiceUploadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setUploadedInvoiceFileName(file?.name ?? "");
  };

  const canSubmitEmitInvoice =
    emitInvoiceAmount.trim().length > 0 &&
    emitInvoiceContractCode.length > 0 &&
    (invoiceFlowMode === "emit" || uploadedInvoiceFileName.length > 0);
  const emitInvoicePrimaryActionLabel =
    invoiceFlowMode === "upload" ? uiText.sendInvoice : uiText.emitInvoice;

  const handleSubmitEmitInvoice = () => {
    if (!canSubmitEmitInvoice) {
      return;
    }

    if (invoiceFlowMode === "emit") {
      const createdInvoice: InvoiceItem = {
        code: `NF${String(invoiceItems.length + 1).padStart(4, "0")}`,
        issuedAt: formatDateToBR(new Date()),
        contractCode: emitInvoiceContractCode,
      };

      setIsEmitInvoiceModalOpen(false);
      setInvoiceModal(createdInvoice);
      return;
    }

    setIsEmitInvoiceModalOpen(false);
  };

  const renderFloatingNav = () => (
    <nav className={styles.floatingNav} aria-label="Menu principal">
      {bottomNavItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeNavItemId === item.id;

        return (
          <button
            key={item.id}
            type="button"
            className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
            onClick={() => handleBottomNavClick(item.id)}
          >
            <Icon size={18} strokeWidth={2.1} />
            <span className={styles.navLabel}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );

  const renderSignatureList = () => (
    <div className={styles.signatureList}>
      {contractSigners.map((signer) => (
        <article key={`${signer.name}-${signer.email}`} className={styles.signatureItem}>
          <div className={styles.signaturePerson}>
            <strong>{signer.name}</strong>
            <span>{signer.email}</span>
          </div>
          <span
            className={`${styles.signatureStatusChip} ${signatureStatusClassById[signer.status]}`}
          >
            {signatureStatusLabelById[signer.status]}
          </span>
        </article>
      ))}
    </div>
  );

  if (step === "invoices") {
    return (
      <main className={styles.page}>
        <div className={`${styles.content} ${styles.homeContent} ${styles.contractsContent}`}>
          <header className={styles.contractsTopBar}>
            <button
              type="button"
              className={styles.contractsBackButton}
              aria-label="Voltar para Home"
              onClick={() => setStep("home")}
            >
              <ArrowLeft size={24} strokeWidth={2.2} />
            </button>
            <h1 className={styles.contractsHeading}>{uiText.invoices}</h1>
          </header>

          <div className={styles.invoiceActionRow}>
            <button
              type="button"
              className={styles.invoiceEmitButton}
              onClick={handleOpenEmitInvoiceModal}
            >
              <Plus size={24} strokeWidth={2.2} />
              {uiText.emitInvoice}
            </button>
          </div>

          <section className={styles.invoicePanel}>
            <header className={styles.invoicePanelHeader}>
              <span className={styles.invoicePanelIcon}>
                <ReceiptText size={20} strokeWidth={2.1} />
              </span>
              <h2>{uiText.issuedInvoices}</h2>
            </header>

            <div className={styles.invoiceList}>
              {invoiceItems.map((invoice, index) => {
                const isOpen = openInvoiceIndexes.includes(index);
                const invoiceProof = invoice.paymentProof ?? uiText.noPaymentProof;

                return (
                  <article key={`${invoice.code}-${index}`} className={styles.invoiceCard}>
                    <header
                      className={`${styles.invoiceCardHeader} ${
                        isOpen ? styles.invoiceCardHeaderOpen : styles.invoiceCardHeaderClosed
                      }`}
                    >
                      <button
                        type="button"
                        className={styles.invoiceCardMainAction}
                        onClick={() => handleOpenInvoiceModal(invoice)}
                      >
                        <span className={styles.invoiceTag}>
                          <span className={styles.invoiceTagIcon}>
                            <ReceiptText size={12} strokeWidth={2.1} />
                          </span>
                          <strong>#{invoice.code}</strong>
                        </span>
                      </button>
                      <button
                        type="button"
                        className={styles.invoiceAccordionToggle}
                        aria-label="Alternar detalhes da nota fiscal"
                        onClick={() => toggleInvoice(index)}
                      >
                      <ChevronDown
                        size={20}
                        strokeWidth={2.2}
                        className={`${styles.invoiceChevron} ${
                          isOpen ? styles.invoiceChevronOpen : styles.invoiceChevronClosed
                        }`}
                      />
                      </button>
                    </header>

                    {isOpen ? (
                      <div
                        className={styles.invoiceCardBody}
                        role="button"
                        tabIndex={0}
                        onClick={() => handleOpenInvoiceModal(invoice)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            handleOpenInvoiceModal(invoice);
                          }
                        }}
                      >
                        <div className={styles.invoiceInfoRow}>
                          <div className={styles.invoiceInfoBlock}>
                            <span className={styles.invoiceInfoLabel}>
                              <CalendarDays size={12} strokeWidth={2.2} />
                              {uiText.issuedAt}
                            </span>
                            <strong className={styles.invoiceInfoValue}>{invoice.issuedAt}</strong>
                          </div>
                          <div className={`${styles.invoiceInfoBlock} ${styles.invoiceInfoBlockRight}`}>
                            <span className={styles.invoiceInfoLabel}>
                              <FileText size={12} strokeWidth={2.2} />
                              {uiText.contract}
                            </span>
                            <strong className={styles.invoiceInfoContract}>#{invoice.contractCode}</strong>
                          </div>
                        </div>

                        <div className={styles.contractDivider} />

                        <p className={styles.invoiceProofLabel}>{uiText.paymentProof}</p>

                        <div
                          className={`${styles.invoiceProofFile} ${
                            invoice.paymentProof ? "" : styles.invoiceProofFileDisabled
                          }`}
                        >
                          <span>{invoiceProof}</span>
                          <ExternalLink size={14} strokeWidth={2.2} />
                        </div>
                      </div>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </section>
        </div>

        {renderFloatingNav()}

        {isEmitInvoiceModalOpen ? (
          <div
            className={styles.emitInvoiceModalOverlay}
            role="button"
            tabIndex={0}
            onClick={handleCloseEmitInvoiceModal}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                handleCloseEmitInvoiceModal();
              }
            }}
          >
            <div
              className={styles.emitInvoiceModal}
              role="dialog"
              aria-modal="true"
              aria-label={uiText.emitInvoiceModalTitle}
              onClick={(event) => event.stopPropagation()}
            >
              <header className={styles.emitInvoiceModalHeader}>
                <div className={styles.emitInvoiceModalTitleGroup}>
                  <span className={styles.emitInvoiceModalTitleIcon}>
                    <ReceiptText size={20} strokeWidth={2.1} />
                  </span>
                  <h2>{uiText.emitInvoiceModalTitle}</h2>
                </div>
                <button
                  type="button"
                  className={styles.emitInvoiceModalClose}
                  aria-label="Fechar modal de emissão de nota fiscal"
                  onClick={handleCloseEmitInvoiceModal}
                >
                  <X size={16} strokeWidth={2.2} />
                </button>
              </header>

              <div className={styles.emitInvoiceModalBody}>
                <div className={styles.emitInvoiceFormFields}>
                  <label className={styles.emitInvoiceFieldGroup}>
                    <span>{uiText.invoiceAmountLabel}</span>
                    <input
                      type="text"
                      inputMode="decimal"
                      placeholder={uiText.invoiceAmountPlaceholder}
                      value={emitInvoiceAmount}
                      onChange={(event) => setEmitInvoiceAmount(event.target.value)}
                    />
                  </label>

                  <label className={styles.emitInvoiceFieldGroup}>
                    <span>{uiText.linkedContractLabel}</span>
                    <select
                      value={emitInvoiceContractCode}
                      onChange={(event) => setEmitInvoiceContractCode(event.target.value)}
                    >
                      {contractItems.map((contract) => (
                        <option key={contract.detailCode} value={contract.detailCode}>
                          Contrato #{contract.detailCode}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <p className={styles.emitInvoiceModalHint}>{uiText.chooseInvoiceAction}</p>

                <div className={styles.emitInvoiceModeList}>
                  <button
                    type="button"
                    className={`${styles.emitInvoiceModeButton} ${
                      invoiceFlowMode === "emit" ? styles.emitInvoiceModeButtonActive : ""
                    }`}
                    onClick={() => handleInvoiceFlowModeChange("emit")}
                  >
                    <span className={styles.emitInvoiceModeIndicator} aria-hidden="true">
                      {invoiceFlowMode === "emit" ? (
                        <span className={styles.emitInvoiceModeIndicatorInner} />
                      ) : null}
                    </span>
                    {uiText.emitInvoiceOption}
                  </button>

                  <button
                    type="button"
                    className={`${styles.emitInvoiceModeButton} ${
                      invoiceFlowMode === "upload" ? styles.emitInvoiceModeButtonActive : ""
                    }`}
                    onClick={() => handleInvoiceFlowModeChange("upload")}
                  >
                    <span className={styles.emitInvoiceModeIndicator} aria-hidden="true">
                      {invoiceFlowMode === "upload" ? (
                        <span className={styles.emitInvoiceModeIndicatorInner} />
                      ) : null}
                    </span>
                    {uiText.uploadInvoiceOption}
                  </button>
                </div>

                {invoiceFlowMode === "upload" ? (
                  <div className={styles.emitInvoiceUploadWrap}>
                    <input
                      ref={uploadInvoiceInputRef}
                      type="file"
                      accept=".pdf,.xml,.png,.jpg,.jpeg"
                      className={styles.emitInvoiceUploadInput}
                      onChange={handleInvoiceUploadChange}
                    />
                    <button
                      type="button"
                      className={styles.emitInvoiceUploadButton}
                      onClick={() => uploadInvoiceInputRef.current?.click()}
                    >
                      <Upload size={16} strokeWidth={2.2} />
                      {uiText.uploadInvoiceButton}
                    </button>

                    {uploadedInvoiceFileName ? (
                      <p className={styles.emitInvoiceUploadedFile}>
                        <span>{uiText.attachedFile}</span> {uploadedInvoiceFileName}
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </div>

              <footer className={styles.emitInvoiceModalFooter}>
                <button
                  type="button"
                  className={styles.emitInvoiceCancelButton}
                  onClick={handleCloseEmitInvoiceModal}
                >
                  {uiText.cancel}
                </button>
                <button
                  type="button"
                  className={styles.emitInvoiceConfirmButton}
                  disabled={!canSubmitEmitInvoice}
                  onClick={handleSubmitEmitInvoice}
                >
                  {emitInvoicePrimaryActionLabel}
                </button>
              </footer>
            </div>
          </div>
        ) : null}

        {invoiceModal ? (
          <div
            className={styles.invoiceModalOverlay}
            role="button"
            tabIndex={0}
            onClick={() => setInvoiceModal(null)}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setInvoiceModal(null);
              }
            }}
          >
            <div
              className={styles.invoiceModal}
              role="dialog"
              aria-modal="true"
              aria-label={uiText.invoiceModalTitle}
              onClick={(event) => event.stopPropagation()}
            >
              <header className={styles.invoiceModalHeader}>
                <div className={styles.invoiceModalTitleGroup}>
                  <span className={styles.invoiceModalTitleIcon}>
                    <ReceiptText size={20} strokeWidth={2.1} />
                  </span>
                  <h2>{uiText.invoiceModalTitle}</h2>
                </div>
                <button
                  type="button"
                  className={styles.invoiceModalClose}
                  aria-label="Fechar modal de nota fiscal"
                  onClick={() => setInvoiceModal(null)}
                >
                  <X size={16} strokeWidth={2.2} />
                </button>
              </header>

              <div className={styles.invoiceModalBody}>
                <div className={styles.invoiceModalInfo}>
                  <div className={styles.invoiceModalInfoBlock}>
                    <span>{uiText.contract}</span>
                    <strong>#{invoiceModal.contractCode}</strong>
                  </div>
                  <div className={styles.invoiceModalInfoBlock}>
                    <span>{uiText.invoiceNumber}</span>
                    <strong className={styles.invoiceModalPrimaryValue}>#{invoiceModal.code}</strong>
                  </div>
                  <div className={styles.invoiceModalInfoBlock}>
                    <span>{uiText.invoiceIssueDate}</span>
                    <strong>{invoiceModal.issuedAt}</strong>
                  </div>
                </div>

                <div className={styles.invoiceModalFileGroup}>
                  <p>{uiText.invoiceModalTitle}</p>
                  <div className={styles.invoiceModalFileRow}>
                    <span>NF-1234</span>
                    <div className={styles.invoiceModalActions}>
                      <button type="button">
                        <ExternalLink size={12} strokeWidth={2.2} />
                        {uiText.view}
                      </button>
                      <button type="button">
                        <CloudDownload size={12} strokeWidth={2.2} />
                        {uiText.download}
                      </button>
                    </div>
                  </div>
                </div>

                <div className={styles.invoiceModalFileGroup}>
                  <p>{uiText.paymentProofShort}</p>
                  <div className={styles.invoiceModalFileRow}>
                    <span>{invoiceModal.paymentProof ?? "comprovante_nf-1234"}</span>
                    <div className={styles.invoiceModalActions}>
                      <button type="button">
                        <ExternalLink size={12} strokeWidth={2.2} />
                        {uiText.view}
                      </button>
                      <button type="button">
                        <CloudDownload size={12} strokeWidth={2.2} />
                        {uiText.download}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </main>
    );
  }

  if (step === "alerts") {
    return (
      <main className={styles.page}>
        <div className={`${styles.content} ${styles.homeContent} ${styles.contractsContent}`}>
          <header className={styles.contractsTopBar}>
            <button
              type="button"
              className={styles.contractsBackButton}
              aria-label="Voltar para Home"
              onClick={() => setStep("home")}
            >
              <ArrowLeft size={24} strokeWidth={2.2} />
            </button>
            <h1 className={styles.contractsHeading}>{uiText.notifications}</h1>
          </header>

          <section className={styles.notificationsList}>
            {notificationItems.map((notification, index) => (
              <article key={`${notification.title}-${index}`} className={styles.notificationCard}>
                <h2>{notification.title}</h2>
                <p>{notification.message}</p>
                <span>
                  <CalendarDays size={12} strokeWidth={2.2} />
                  {notification.timestamp}
                </span>
              </article>
            ))}
          </section>
        </div>

        {renderFloatingNav()}
      </main>
    );
  }

  if (step === "contract_detail") {
    return (
      <main className={styles.page}>
        <div className={`${styles.content} ${styles.homeContent} ${styles.contractsContent}`}>
          <header className={styles.contractsTopBar}>
            <button
              type="button"
              className={styles.contractsBackButton}
              aria-label="Voltar para contratos"
              onClick={() => setStep("contracts")}
            >
              <ArrowLeft size={24} strokeWidth={2.2} />
            </button>
            <div className={styles.contractDetailTitleWrap}>
              <h1 className={styles.contractsHeading}>{uiText.contract}</h1>
              <span className={styles.contractBreadcrumb}>
                <ChevronRight size={16} strokeWidth={2.1} />
                #{selectedContract.detailCode}
              </span>
            </div>
          </header>

          <section className={styles.contractDetailsStack}>
            <article className={styles.detailCard}>
              <header className={styles.detailSectionHeader}>
                <span className={styles.detailSectionIcon}>
                  <NotebookText size={20} strokeWidth={2.1} />
                </span>
                <h2>{uiText.contractData}</h2>
              </header>

              <div className={styles.detailBody}>
                <div className={styles.detailMetaRow}>
                  <div className={styles.detailMetaBlock}>
                    <span>{uiText.contractId}</span>
                    <strong>
                      Contrato <em>#{selectedContract.detailCode}</em>
                    </strong>
                  </div>
                  <div className={`${styles.detailMetaBlock} ${styles.detailMetaBlockRight}`}>
                    <span>{uiText.contractStatus}</span>
                    <span
                      className={`${styles.contractStatusChip} ${
                        contractStatusClassById[selectedContract.status]
                      }`}
                    >
                      {contractStatusById[selectedContract.status]}
                    </span>
                  </div>
                </div>

                <div className={styles.detailContractTitle}>
                  <span>{uiText.contract}</span>
                  <strong>{selectedContract.title}</strong>
                </div>

                <div className={styles.contractDatesRow}>
                  <div className={styles.contractDateItem}>
                    <span className={styles.contractDateLabel}>
                      <CalendarDays size={12} strokeWidth={2.2} />
                      {uiText.start}
                    </span>
                    <strong className={styles.contractDateValue}>{selectedContract.startDate}</strong>
                  </div>

                  <div className={styles.contractDateItem}>
                    <span className={styles.contractDateLabel}>
                      <CalendarDays size={12} strokeWidth={2.2} />
                      {uiText.end}
                    </span>
                    <strong className={styles.contractDateValue}>{selectedContract.endDate}</strong>
                  </div>
                </div>
              </div>

              <div className={`${styles.contractAmountRow} ${styles.contractAmountRowDetail}`}>
                <span className={styles.contractAmountLabel}>
                  <CircleDollarSign size={12} strokeWidth={2.1} />
                  {uiText.value}
                </span>
                <strong className={styles.contractAmountValue}>{selectedContract.amount}</strong>
              </div>
            </article>

            <article className={styles.detailCard}>
              <header className={styles.detailSectionHeader}>
                <span className={styles.detailSectionIcon}>
                  <ClipboardList size={20} strokeWidth={2.1} />
                </span>
                <h2>{uiText.contractSignatures}</h2>
              </header>

              <div className={styles.detailSubCard}>
                <div className={styles.detailDocHeader}>
                  <strong>
                    Contrato <em>#{selectedContract.detailCode}</em>
                  </strong>
                  <span>
                    {uiText.sentDate} {selectedContract.sentDate}
                  </span>
                </div>

                <div className={styles.detailDocActions}>
                  <button type="button">
                    <ExternalLink size={12} strokeWidth={2.2} />
                    {uiText.viewContract}
                  </button>
                  <button type="button">
                    <CloudDownload size={12} strokeWidth={2.2} />
                    {uiText.downloadContract}
                  </button>
                </div>

                <div className={styles.detailSignatureBlock}>
                  <h3>{uiText.signatureStatus}</h3>
                  {renderSignatureList()}
                </div>
              </div>
            </article>

            <article className={styles.detailCard}>
              <header className={styles.detailSectionHeader}>
                <span className={styles.detailSectionIcon}>
                  <ClipboardList size={20} strokeWidth={2.1} />
                </span>
                <h2>{uiText.contractAddenda}</h2>
              </header>

              <div className={styles.detailAddendaList}>
                {contractAddenda.map((addendum, index) => (
                  <div key={`${addendum.code}-${index}`} className={styles.detailSubCard}>
                    <div className={styles.detailDocHeaderRow}>
                      <div className={styles.detailDocHeader}>
                        <strong>
                          {uiText.addendum} <em>#{addendum.code}</em>
                        </strong>
                        <span>
                          {uiText.sentDate} {addendum.sentDate}
                        </span>
                      </div>
                      <button
                        type="button"
                        className={styles.addendumToggle}
                        aria-label="Alternar detalhes do aditivo"
                        onClick={() => toggleAddendum(index)}
                      >
                        <ChevronDown
                          size={18}
                          strokeWidth={2.2}
                          className={`${styles.addendumToggleIcon} ${
                            openAddendaIndexes.includes(index) ? styles.addendumToggleExpanded : ""
                          }`}
                        />
                      </button>
                    </div>

                    {openAddendaIndexes.includes(index) ? (
                      <>
                        <div className={styles.detailDocActions}>
                          <button type="button">
                            <CloudDownload size={12} strokeWidth={2.2} />
                            {uiText.downloadContract}
                          </button>
                        </div>
                        <div className={styles.detailSignatureBlock}>
                          <h3>{uiText.signatureStatus}</h3>
                          {renderSignatureList()}
                        </div>
                      </>
                    ) : null}
                  </div>
                ))}
              </div>
            </article>
          </section>
        </div>

        {renderFloatingNav()}
      </main>
    );
  }

  if (step === "contracts") {
    return (
      <main className={styles.page}>
        <div className={`${styles.content} ${styles.homeContent} ${styles.contractsContent}`}>
          <header className={styles.contractsTopBar}>
            <button
              type="button"
              className={styles.contractsBackButton}
              aria-label="Voltar para Home"
              onClick={() => setStep("home")}
            >
              <ArrowLeft size={24} strokeWidth={2.2} />
            </button>
            <h1 className={styles.contractsHeading}>{uiText.contracts}</h1>
          </header>

          <section className={styles.contractsList}>
            {contractItems.map((contract) => (
              <article key={contract.code} className={styles.contractCard}>
                <button
                  type="button"
                  className={styles.contractCardAction}
                  onClick={() => handleContractCardClick(contract.detailCode)}
                >
                  <div className={styles.contractCardHeader}>
                    <h2 className={styles.contractCardTitle}>
                      Contrato <span>#{contract.code}</span>
                    </h2>
                  </div>

                  <div className={styles.contractCardBody}>
                    <p className={styles.contractType}>{contract.title}</p>

                    <span
                      className={`${styles.contractStatusChip} ${contractStatusClassById[contract.status]}`}
                    >
                      {contractStatusById[contract.status]}
                    </span>

                    <div className={styles.contractDivider} />

                    <div className={styles.contractDatesRow}>
                      <div className={styles.contractDateItem}>
                        <span className={styles.contractDateLabel}>
                          <CalendarDays size={12} strokeWidth={2.2} />
                          {uiText.start}
                        </span>
                        <strong className={styles.contractDateValue}>{contract.startDate}</strong>
                      </div>

                      <div className={styles.contractDateItem}>
                        <span className={styles.contractDateLabel}>
                          <CalendarDays size={12} strokeWidth={2.2} />
                          {uiText.end}
                        </span>
                        <strong className={styles.contractDateValue}>{contract.endDate}</strong>
                      </div>
                    </div>

                    <div className={styles.contractAmountRow}>
                      <span className={styles.contractAmountLabel}>
                        <CircleDollarSign size={12} strokeWidth={2.1} />
                        {uiText.value}
                      </span>
                      <strong className={styles.contractAmountValue}>{contract.amount}</strong>
                    </div>

                    <div className={styles.contractDivider} />

                    {contract.signedAt ? (
                      <p className={styles.contractSigned}>
                        <ClipboardCheck size={12} strokeWidth={2.2} />
                        <span>{uiText.signed}</span>
                        <strong>{contract.signedAt}</strong>
                      </p>
                    ) : (
                      <p className={styles.contractPending}>
                        <ClipboardCheck size={12} strokeWidth={2.2} />
                        {uiText.waiting}
                      </p>
                    )}
                  </div>
                </button>
              </article>
            ))}
          </section>
        </div>

        {renderFloatingNav()}
      </main>
    );
  }

  if (step === "my_data") {
    const companyIsOpen = openProfileSections.includes("company");
    const contactIsOpen = openProfileSections.includes("contact");
    const bankingIsOpen = openProfileSections.includes("banking");

    return (
      <main className={styles.page}>
        <div className={`${styles.content} ${styles.homeContent} ${styles.supportContent}`}>
          <header className={styles.contractsTopBar}>
            <button
              type="button"
              className={styles.contractsBackButton}
              aria-label="Voltar para Home"
              onClick={() => setStep("home")}
            >
              <ArrowLeft size={24} strokeWidth={2.2} />
            </button>
            <h1 className={styles.contractsHeading}>{uiText.myData}</h1>
          </header>

          <section className={styles.profileAccordionList}>
            <article className={styles.profileAccordionCard}>
              <button
                type="button"
                className={styles.profileAccordionHeader}
                onClick={() => toggleProfileSection("company")}
              >
                <span className={styles.profileAccordionTitleRow}>
                  <span className={styles.profileAccordionIcon}>
                    <NotebookText size={20} strokeWidth={2.1} />
                  </span>
                  <strong>{uiText.companyData}</strong>
                </span>
                <ChevronDown
                  size={20}
                  strokeWidth={2.2}
                  className={`${styles.profileAccordionChevron} ${
                    companyIsOpen ? styles.profileAccordionChevronOpen : ""
                  }`}
                />
              </button>

              {companyIsOpen ? (
                <div className={styles.profileAccordionBody}>
                  <div className={styles.profileFieldGroup}>
                    <span>{uiText.razaoSocial}</span>
                    <strong>{firstAccessCompanyData.razaoSocial}</strong>
                  </div>
                  <div className={styles.profileFieldGroup}>
                    <span>CNPJ</span>
                    <strong>{firstAccessCompanyData.cnpj}</strong>
                  </div>
                  <div className={styles.profileFieldGroup}>
                    <span>{uiText.email}</span>
                    <strong>{firstAccessCompanyData.email}</strong>
                  </div>
                  <div className={styles.profileFieldGroup}>
                    <span>Telefone</span>
                    <strong>{firstAccessCompanyData.telefone}</strong>
                  </div>
                  <div className={styles.profileFieldGroup}>
                    <span>{uiText.endereco}</span>
                    <strong>{firstAccessCompanyData.endereco}</strong>
                  </div>
                  <div className={styles.profileFieldGroup}>
                    <span>{uiText.municipio}</span>
                    <strong>{firstAccessCompanyData.municipio}</strong>
                  </div>
                  <div className={styles.profileFieldGroup}>
                    <span>Estado</span>
                    <strong>{firstAccessCompanyData.estado}</strong>
                  </div>
                  <div className={styles.profileFieldGroup}>
                    <span>CNAE Principal</span>
                    <div className={styles.profileChipRow}>
                      <span className={styles.profileChip}>{firstAccessCompanyData.cnaePrincipal}</span>
                    </div>
                  </div>
                  <div className={styles.profileFieldGroup}>
                    <span>{uiText.cnaesSecundarios}</span>
                    <div className={styles.profileChipRow}>
                      {firstAccessCompanyData.cnaesSecundarios.map((cnae, index) => (
                        <span key={`${cnae}-${index}`} className={styles.profileChip}>
                          {cnae}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}
            </article>

            <article className={styles.profileAccordionCard}>
              <button
                type="button"
                className={styles.profileAccordionHeader}
                onClick={() => toggleProfileSection("contact")}
              >
                <span className={styles.profileAccordionTitleRow}>
                  <span className={styles.profileAccordionIcon}>
                    <Phone size={20} strokeWidth={2.1} />
                  </span>
                  <strong>{uiText.contactData}</strong>
                </span>
                <ChevronDown
                  size={20}
                  strokeWidth={2.2}
                  className={`${styles.profileAccordionChevron} ${
                    contactIsOpen ? styles.profileAccordionChevronOpen : ""
                  }`}
                />
              </button>

              {contactIsOpen ? (
                <div className={styles.profileAccordionBody}>
                  <div className={styles.profileFieldGroup}>
                    <span>{uiText.responsible}</span>
                    <div className={styles.profileFieldValueRow}>
                      <strong>{uiText.responsibleName}</strong>
                      <button
                        type="button"
                        className={styles.profileEditButton}
                        aria-label="Editar responsável"
                      >
                        <Pencil size={14} strokeWidth={2.2} />
                      </button>
                    </div>
                  </div>
                  <div className={styles.profileFieldGroup}>
                    <span>{uiText.whatsapp}</span>
                    <strong>{firstAccessCompanyData.telefone}</strong>
                  </div>
                  <div className={styles.profileFieldGroup}>
                    <span>{uiText.email}</span>
                    <strong>{firstAccessCompanyData.email}</strong>
                  </div>
                </div>
              ) : null}
            </article>

            <article className={styles.profileAccordionCard}>
              <button
                type="button"
                className={styles.profileAccordionHeader}
                onClick={() => toggleProfileSection("banking")}
              >
                <span className={styles.profileAccordionTitleRow}>
                  <span className={styles.profileAccordionIcon}>
                    <CircleDollarSign size={20} strokeWidth={2.1} />
                  </span>
                  <strong>{uiText.bankingData}</strong>
                </span>
                <ChevronDown
                  size={20}
                  strokeWidth={2.2}
                  className={`${styles.profileAccordionChevron} ${
                    bankingIsOpen ? styles.profileAccordionChevronOpen : ""
                  }`}
                />
              </button>

              {bankingIsOpen ? (
                <div className={styles.profileAccordionBody}>
                  <div className={styles.profileFieldGroup}>
                    <span>{uiText.accountHolder}</span>
                    <strong>{uiText.responsibleName}</strong>
                  </div>
                  <div className={styles.profileFieldGroup}>
                    <span>{uiText.pixKeyType}</span>
                    <strong>{uiText.pixKeyValue}</strong>
                  </div>
                </div>
              ) : null}
            </article>
          </section>
        </div>

        {renderFloatingNav()}
      </main>
    );
  }

  if (step === "support") {
    return (
      <main className={styles.page}>
        <div className={`${styles.content} ${styles.homeContent} ${styles.supportContent}`}>
          <header className={styles.contractsTopBar}>
            <button
              type="button"
              className={styles.contractsBackButton}
              aria-label="Voltar para Home"
              onClick={() => setStep("home")}
            >
              <ArrowLeft size={24} strokeWidth={2.2} />
            </button>
            <h1 className={styles.contractsHeading}>{uiText.support}</h1>
          </header>

          <section className={styles.supportCard}>
            <header className={styles.supportHeader}>
              <span className={styles.supportHeaderIcon}>
                <CircleHelp size={24} strokeWidth={2.1} />
              </span>
              <h2>{uiText.needHelp}</h2>
            </header>

            <div className={styles.supportPanel}>
              <p className={styles.supportPanelHeading}>{uiText.contactChannels}</p>

              <div className={styles.supportInfoGroup}>
                <span>{uiText.phoneLabel}</span>
                <strong>{uiText.supportPhone}</strong>
              </div>

              <div className={styles.supportInfoGroup}>
                <span>{uiText.email}</span>
                <strong>{uiText.supportEmail}</strong>
              </div>

              <button type="button" className={styles.supportWhatsappButton}>
                <Phone size={18} strokeWidth={2.2} />
                {uiText.callWhatsapp}
              </button>
            </div>

            <div className={styles.supportIllustrationWrap}>
              <img src={supportIllustrationSrc} alt="" className={styles.supportIllustration} />
            </div>
          </section>
        </div>

        {renderFloatingNav()}
      </main>
    );
  }

  if (step === "home") {
    return (
      <main className={styles.page}>
        <div className={`${styles.content} ${styles.homeContent}`}>
          <header className={styles.homeTopBar}>
            <div className={styles.brandRow}>
              <div className={styles.brandIcon}>
                <img src={assets.logoIconSrc} alt="" />
              </div>
              <div className={styles.brandWordmark}>Atena</div>
            </div>
            <p className={styles.homeGreeting}>{uiText.hello}</p>
          </header>

          <section className={styles.quickAccessCard}>
            <h2 className={styles.quickAccessTitle}>{uiText.quickAccessTitle}</h2>
            <div className={styles.quickAccessGrid}>
              {quickAccessItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={styles.quickAccessItem}
                    onClick={() => handleQuickAccessClick(item.id)}
                  >
                    <span className={styles.quickAccessIconWrap}>
                      <span className={styles.quickAccessIconInner}>
                        <Icon size={16} strokeWidth={2.1} />
                      </span>
                    </span>
                    <span className={styles.quickAccessLabel}>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className={styles.nfCtaSection}>
            <h2 className={styles.nfCtaTitle}>Precisando emitir uma nota fiscal?</h2>
            <button type="button" className={styles.nfCtaButton}>
              Emitir NF agora
              <ChevronRight size={20} strokeWidth={2.2} />
            </button>
          </section>

          <section className={styles.careSection}>
            <h2 className={styles.careTitle}>{uiText.careTitle}</h2>

            <article className={styles.careItem}>
              <img className={styles.careImage} src={careCardImages.telemedicina} alt="" />
              <div className={styles.careCopy}>
                <div className={styles.careHeaderRow}>
                  <h3 className={styles.careItemTitle}>Telemedicina 24horas</h3>
                  <ChevronRight size={16} strokeWidth={2.4} className={styles.careArrow} />
                </div>
                <p className={styles.careItemText}>Tenha acesso a especialidades 24horas/ 7 dias por semana.</p>
              </div>
            </article>

            <article className={styles.careItem}>
              <img className={styles.careImage} src={careCardImages.club} alt="" />
              <div className={styles.careCopy}>
                <div className={styles.careHeaderRow}>
                  <h3 className={styles.careItemTitle}>Club de Vantagens</h3>
                  <ChevronRight size={16} strokeWidth={2.4} className={styles.careArrow} />
                </div>
                <p className={styles.careItemText}>{uiText.careClubText}</p>
              </div>
            </article>
          </section>
        </div>

        {renderFloatingNav()}
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <header className={styles.brand}>
          <div className={styles.brandRow}>
            <div className={styles.brandIcon}>
              <img src={assets.logoIconSrc} alt="" />
            </div>
            <div className={styles.brandWordmark}>Atena</div>
          </div>
        </header>

        <div className={styles.card}>
          {step === "company_data" ? (
            <>
              <div className={styles.cardBody}>
                <img src={companyIllustrationSrc} alt="" className={styles.hero} />

                <div className={styles.intro}>
                  <div className={styles.stepBar} />
                  <div className={styles.introTitle}>{uiText.heading}</div>
                  <p className={styles.introSubtitle}>{uiText.subtitle}</p>
                </div>

                <div className={styles.infoPanel}>
                  <div className={styles.fieldGroup}>
                    <span className={styles.fieldLabel}>{uiText.razaoSocial}</span>
                    <strong className={styles.fieldValue}>{firstAccessCompanyData.razaoSocial}</strong>
                  </div>

                  <div className={styles.fieldGroup}>
                    <span className={styles.fieldLabel}>CNPJ</span>
                    <strong className={styles.fieldValue}>{firstAccessCompanyData.cnpj}</strong>
                  </div>

                  <div className={styles.fieldGroup}>
                    <span className={styles.fieldLabel}>{uiText.email}</span>
                    <strong className={styles.fieldValue}>{firstAccessCompanyData.email}</strong>
                  </div>

                  <div className={styles.fieldGroup}>
                    <span className={styles.fieldLabel}>Telefone</span>
                    <strong className={styles.fieldValue}>{firstAccessCompanyData.telefone}</strong>
                  </div>

                  <div className={styles.fieldGroup}>
                    <span className={styles.fieldLabel}>{uiText.endereco}</span>
                    <strong className={styles.fieldValue}>{firstAccessCompanyData.endereco}</strong>
                  </div>

                  <div className={styles.fieldGroup}>
                    <span className={styles.fieldLabel}>{uiText.municipio}</span>
                    <strong className={styles.fieldValue}>{firstAccessCompanyData.municipio}</strong>
                  </div>

                  <div className={styles.fieldGroup}>
                    <span className={styles.fieldLabel}>Estado</span>
                    <strong className={styles.fieldValue}>{firstAccessCompanyData.estado}</strong>
                  </div>

                  <div className={styles.fieldGroup}>
                    <span className={styles.fieldLabel}>CNAE Principal</span>
                    <div className={styles.chipRow}>
                      <span className={styles.chip}>{firstAccessCompanyData.cnaePrincipal}</span>
                    </div>
                  </div>

                  <div className={styles.fieldGroup}>
                    <span className={styles.fieldLabel}>{uiText.cnaesSecundarios}</span>
                    <div className={styles.chipRow}>
                      {firstAccessCompanyData.cnaesSecundarios.map((cnae) => (
                        <span key={cnae} className={styles.chip}>
                          {cnae}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <label className={styles.confirmRow}>
                  <input
                    type="checkbox"
                    checked={confirmed}
                    onChange={(event) => setConfirmed(event.target.checked)}
                    className={styles.confirmInput}
                  />
                  <span
                    className={`${styles.confirmIndicator} ${confirmed ? styles.confirmIndicatorChecked : ""}`}
                    aria-hidden="true"
                  >
                    {confirmed ? <span className={styles.confirmDot} /> : null}
                  </span>
                  <span className={styles.confirmText}>{uiText.confirm}</span>
                </label>
              </div>

              <div className={styles.cardFooter}>
                <button
                  type="button"
                  className={styles.nextButton}
                  disabled={!confirmed}
                  onClick={() => setStep("success")}
                >
                  {uiText.next}
                  <ChevronRight size={20} strokeWidth={2.2} />
                </button>
              </div>
            </>
          ) : (
            <>
              <div className={`${styles.cardBody} ${styles.successBody}`}>
                <img src={successIllustrationSrc} alt="" className={styles.successHero} />

                <div className={styles.successCopy}>
                  <h2 className={styles.successTitle}>{uiText.successTitle}</h2>
                  <p className={styles.successSubtitle}>{uiText.successSubtitle}</p>
                </div>
              </div>

              <div className={styles.cardFooter}>
                <button
                  type="button"
                  className={`${styles.nextButton} ${styles.accessButton}`}
                  onClick={() => setStep("home")}
                >
                  {uiText.accessApp}
                  <ChevronRight size={20} strokeWidth={2.2} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
