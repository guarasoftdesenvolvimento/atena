"use client";

import React from "react";
import TopHeaderBar from "../components/TopHeaderBar";
import {
  Filter,
  PieChart,
  FileText,
  StickyNote,
  Info,
  ChevronRight,
  Search,
  ListFilter,
  ChevronDown,
  CloudDownload,
  CloudUpload,
  CheckCircle2,
  Plus,
  Lock,
  GitBranch,
  X,
  Copy,
  Shield,
} from "lucide-react";
import styles from "./notas-fiscais.module.css";

// ─── Mock data ────────────────────────────────────────────────────────────────

const STATUS_COLORS: Record<string, string> = {
  emitida: "#af52de",
  agendada: "#f5a623",
  analise: "#f5a623",
  paga: "#1ba785",
  expirada: "#d22020",
  cancelada: "#d22020",
};

const STATUS_LABELS: Record<string, string> = {
  emitida: "Emitida (a pagar)",
  agendada: "Agendada para pagamento",
  analise: "Pagamento em análise",
  paga: "Paga",
  expirada: "Expirada (cancelada)",
  cancelada: "Cancelada",
};

const CAT_COLORS: Record<string, string> = {
  verde:    "#1ba785",
  roxo:     "#af52de",
  azul:     "#5352ed",
  vermelho: "#d22020",
  amarelo:  "#c9a800",
  laranja:  "#ff9500",
};

const DONUT_DATA = [
  { key: "emitida", pct: 50 },
  { key: "agendada", pct: 10 },
  { key: "analise", pct: 10 },
  { key: "paga", pct: 10 },
  { key: "expirada", pct: 10 },
  { key: "cancelada", pct: 10 },
];

const BAR_DATA = [
  { label: "1", emitida: 45000, agendada: 30000, analise: 8000, paga: 20000, expirada: 12000, cancelada: 10000 },
  { label: "2", emitida: 60000, agendada: 45000, analise: 15000, paga: 35000, expirada: 20000, cancelada: 18000 },
  { label: "3", emitida: 20000, agendada: 10000, analise: 5000, paga: 15000, expirada: 8000, cancelada: 6000 },
  { label: "4", emitida: 35000, agendada: 25000, analise: 12000, paga: 28000, expirada: 15000, cancelada: 12000 },
  { label: "5", emitida: 55000, agendada: 40000, analise: 18000, paga: 45000, expirada: 22000, cancelada: 19000 },
  { label: "6", emitida: 50000, agendada: 38000, analise: 16000, paga: 40000, expirada: 20000, cancelada: 17000 },
];

type Invoice = {
  id: string;
  numero: string;
  nome: string;
  dataEmissao: string;
  categorias: Array<{ label: string; cor: string }>;
  status: string;
};

const invoices: Invoice[] = [
  { id: "1", numero: "#NF1258", nome: "Felipe Alves dos Santos", dataEmissao: "09/07/2025", categorias: [{ label: "Categoria 1", cor: "verde" }], status: "emitida" },
  { id: "2", numero: "#NF1258", nome: "Felipe Alves dos Santos", dataEmissao: "09/07/2025", categorias: [{ label: "Categoria 1", cor: "roxo" }, { label: "Cat 2", cor: "azul" }, { label: "Cat 3", cor: "verde" }, { label: "Cat 4", cor: "vermelho" }, { label: "Cat 5", cor: "amarelo" }], status: "agendada" },
  { id: "3", numero: "#NF1258", nome: "Felipe Alves dos Santos", dataEmissao: "09/07/2025", categorias: [{ label: "Categoria 1", cor: "verde" }, { label: "Cat 2", cor: "azul" }], status: "analise" },
  { id: "4", numero: "#NF1258", nome: "Felipe Alves dos Santos", dataEmissao: "09/07/2025", categorias: [{ label: "Categoria 1", cor: "vermelho" }], status: "paga" },
  { id: "5", numero: "#NF1258", nome: "Felipe Alves dos Santos", dataEmissao: "09/07/2025", categorias: [{ label: "Categoria 1", cor: "verde" }, { label: "Cat 2", cor: "laranja" }], status: "emitida" },
  { id: "6", numero: "#NF1258", nome: "Felipe Alves dos Santos", dataEmissao: "09/07/2025", categorias: [{ label: "Categoria 1", cor: "amarelo" }], status: "expirada" },
  { id: "7", numero: "#NF1258", nome: "Felipe Alves dos Santos", dataEmissao: "09/07/2025", categorias: [{ label: "Categoria 1", cor: "verde" }, { label: "Cat 2", cor: "roxo" }], status: "emitida" },
  { id: "8", numero: "#NF1258", nome: "Felipe Alves dos Santos", dataEmissao: "09/07/2025", categorias: [{ label: "Categoria 1", cor: "laranja" }, { label: "Cat 2", cor: "azul" }], status: "emitida" },
];

const REMESSA_QR_CODE_IMAGE_URL = "https://www.figma.com/api/mcp/asset/25095259-1a05-471f-9169-e74d1ba591f5";
const REMESSA_PIX_KEY = "656s5dsdsdwedeafdfd551fd";

// ─── Donut chart ──────────────────────────────────────────────────────────────

function DonutChart({ data }: { data: typeof DONUT_DATA }) {
  const size = 180;
  const strokeWidth = 30;
  const radius = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * radius;
  const cx = size / 2;
  const cy = size / 2;
  let offset = 0;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        {data.map((seg) => {
          const dash = (seg.pct / 100) * circ;
          const gap = circ - dash;
          const el = (
            <circle
              key={seg.key}
              cx={cx} cy={cy} r={radius}
              fill="none"
              stroke={STATUS_COLORS[seg.key]}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={-offset}
            />
          );
          offset += dash;
          return el;
        })}
        <circle cx={cx} cy={cy} r={radius - strokeWidth / 2 + 2} fill="#ffffff" />
      </svg>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontFamily: '"Inter",sans-serif', fontWeight: 700, fontSize: 22, color: "#3d3e41" }}>
        125
      </div>
    </div>
  );
}

// ─── Bar chart ────────────────────────────────────────────────────────────────

function BarChart({ data }: { data: typeof BAR_DATA }) {
  const W = 420, H = 140, padL = 46, padB = 24, padT = 8;
  const chartW = W - padL - 4, chartH = H - padB - padT;
  const maxVal = 60000;
  const yTicks = [0, 15000, 30000, 45000, 60000];
  const barGroupW = chartW / data.length;
  const keys: Array<keyof typeof data[0]> = ["emitida", "agendada", "analise", "paga", "expirada", "cancelada"];
  const barW = Math.max(6, barGroupW / keys.length - 1);
  return (
    <svg width={W} height={H} style={{ overflow: "visible" }}>
      {yTicks.map((tick) => {
        const y = padT + chartH - (tick / maxVal) * chartH;
        return (
          <g key={tick}>
            <line x1={padL} x2={W - 4} y1={y} y2={y} stroke="#e9eef5" strokeWidth={1} />
            <text x={padL - 4} y={y + 3} textAnchor="end" fontSize={7.5} fill="#8f9092" fontFamily="Inter, sans-serif">
              {tick === 0 ? "0" : `${tick / 1000}k`}
            </text>
          </g>
        );
      })}
      {data.map((group, gi) => {
        const groupX = padL + gi * barGroupW;
        return (
          <g key={gi}>
            {keys.map((k, ki) => {
              const val = group[k] as number;
              const barH = (val / maxVal) * chartH;
              return (
                <rect key={k as string} x={groupX + ki * (barW + 1)} y={padT + chartH - barH} width={barW} height={barH} rx={2} fill={STATUS_COLORS[k as string]} />
              );
            })}
            <text x={groupX + barGroupW / 2} y={H - 4} textAnchor="middle" fontSize={7.5} fill="#8f9092" fontFamily="Inter, sans-serif">
              {group.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── Legend item ──────────────────────────────────────────────────────────────

function LegendItem({ color, label, value }: { color: string; label: string; value?: string }) {
  return (
    <div className={styles.legendItem}>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <div className={styles.legendDot} style={{ backgroundColor: color }} />
        <span className={styles.legendLabel}>{label}</span>
      </div>
      {value && <span className={styles.legendValue}>{value}</span>}
    </div>
  );
}

// ─── Category badge ───────────────────────────────────────────────────────────

function CategoryBadge({ label, cor }: { label: string; cor: string }) {
  const bg = CAT_COLORS[cor] ?? "#8f9092";
  return (
    <span className={styles.catBadge} style={{ backgroundColor: bg }}>
      {label}
    </span>
  );
}

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; bg: string; color: string }> = {
    emitida:   { label: "Recebida (a pagar)",       bg: "#f0dbff", color: "#7c3aed" },
    agendada:  { label: "Agendada para pagamento",  bg: "#fef9c3", color: "#92400e" },
    analise:   { label: "Pagamento em análise",     bg: "#fef3c7", color: "#b45309" },
    paga:      { label: "Paga",                     bg: "#d1fae5", color: "#065f46" },
    expirada:  { label: "Expirada (não paga)",      bg: "#fee2e2", color: "#991b1b" },
    cancelada: { label: "Cancelada",                bg: "#fee2e2", color: "#991b1b" },
  };
  const s = map[status] ?? { label: status, bg: "#e9eef5", color: "#345070" };
  return (
    <span className={styles.statusBadge} style={{ backgroundColor: s.bg, color: s.color }}>
      {s.label}
    </span>
  );
}

// ─── Filter Sheet ─────────────────────────────────────────────────────────────

type ActiveTab = "visao" | "notas";

type FilterOption = {
  label: string;
  value: string;
};

type CreatedRemessa = {
  id: string;
  descricao: string;
  dataVencimento: string;
  invoices: Invoice[];
  valorTotal: number;
};

function formatDateForDisplay(isoDate: string) {
  if (!isoDate) return "";
  const [year, month, day] = isoDate.split("-");
  if (!year || !month || !day) return isoDate;
  return `${day}/${month}/${year}`;
}

function formatBRL(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value);
}

function FilterSelect({
  value,
  options,
  onChange,
}: {
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function onDocumentMouseDown(event: MouseEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function onDocumentKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", onDocumentMouseDown);
    document.addEventListener("keydown", onDocumentKeyDown);
    return () => {
      document.removeEventListener("mousedown", onDocumentMouseDown);
      document.removeEventListener("keydown", onDocumentKeyDown);
    };
  }, []);

  const selectedLabel = options.find((option) => option.value === value)?.label ?? "Todos";

  return (
    <div className={styles.dropdownWrapper} ref={wrapperRef}>
      <button
        type="button"
        className={`${styles.inputField} ${styles.inputFieldButton} ${isOpen ? styles.inputFieldActive : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className={styles.fieldValue}>{selectedLabel}</span>
        <ChevronDown size={20} color="#737791" />
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`${styles.dropdownOption} ${option.value === value ? styles.dropdownOptionActive : ""}`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterDatePicker({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const openDatePicker = React.useCallback(() => {
    const input = inputRef.current;
    if (!input) return;

    const pickerInput = input as HTMLInputElement & { showPicker?: () => void };
    if (typeof pickerInput.showPicker === "function") {
      pickerInput.showPicker();
      return;
    }

    input.focus();
    input.click();
  }, []);

  return (
    <div
      className={`${styles.inputField} ${styles.datePickerField} ${className ?? ""}`}
      role="button"
      tabIndex={0}
      onClick={openDatePicker}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openDatePicker();
        }
      }}
    >
      <span className={styles.fieldValue}>{value ? formatDateForDisplay(value) : "Selecione"}</span>
      <ChevronDown size={20} color="#737791" />
      <input
        ref={inputRef}
        type="date"
        className={styles.dateNativeInput}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

function FilterSheet({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [visaoStatus, setVisaoStatus] = React.useState("todos");
  const [visaoCategoria, setVisaoCategoria] = React.useState("todos");
  const [visaoDataDe, setVisaoDataDe] = React.useState("2025-01-01");
  const [visaoDataAte, setVisaoDataAte] = React.useState("2025-02-02");

  const statusOptions = React.useMemo<FilterOption[]>(
    () => [
      { value: "todos", label: "Todos" },
      { value: "emitida", label: "Recebida (a pagar)" },
      { value: "agendada", label: "Agendada para pagamento" },
      { value: "analise", label: "Pagamento em análise" },
      { value: "paga", label: "Paga" },
      { value: "expirada", label: "Expirada (não paga)" },
      { value: "cancelada", label: "Cancelada" },
    ],
    []
  );

  const categoriaOptions = React.useMemo<FilterOption[]>(
    () => [
      { value: "todos", label: "Todos" },
      { value: "categoria-1", label: "Categoria 1" },
      { value: "categoria-2", label: "Categoria 2" },
      { value: "categoria-3", label: "Categoria 3" },
      { value: "categoria-4", label: "Categoria 4" },
      { value: "categoria-5", label: "Categoria 5" },
    ],
    []
  );

  function handleClear() {
    setVisaoStatus("todos");
    setVisaoCategoria("todos");
    setVisaoDataDe("2025-01-01");
    setVisaoDataAte("2025-02-02");
  }

  return (
    <div className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ""}`} onClick={onClose}>
      <div className={`${styles.sheet} ${isOpen ? styles.sheetVisible : ""}`} onClick={(e) => e.stopPropagation()}>
        <div className={styles.sheetHeader}>
          <h2 className={styles.sheetTitle}>Filtros:</h2>
        </div>

        <div className={styles.sheetBody}>
          <>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Filtrar por status</label>
              <FilterSelect value={visaoStatus} options={statusOptions} onChange={setVisaoStatus} />
            </div>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Filtrar por categoria</label>
              <FilterSelect value={visaoCategoria} options={categoriaOptions} onChange={setVisaoCategoria} />
            </div>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Filtrar por data</label>
              <div className={styles.dateRangeRow}>
                <div style={{ flex: 1 }}>
                  <span className={styles.dateInputLabel}>De</span>
                  <FilterDatePicker value={visaoDataDe} onChange={setVisaoDataDe} />
                </div>
                <div style={{ flex: 1 }}>
                  <span className={styles.dateInputLabel}>{"At\u00E9"}</span>
                  <FilterDatePicker value={visaoDataAte} onChange={setVisaoDataAte} />
                </div>
              </div>
            </div>
          </>
        </div>
        <div className={styles.sheetFooter}>
          <button
            className={styles.clearButton}
            onClick={() => {
              handleClear();
              onClose();
            }}
          >
            LIMPAR
          </button>
          <button className={styles.applyButton} onClick={onClose}>
            <ListFilter size={20} />
            APLICAR FILTRO
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────


function InvoiceDetailsModal({
  invoice,
  onClose,
}: {
  invoice: Invoice | null;
  onClose: () => void;
}) {
  const [status, setStatus] = React.useState("paga");
  const [paymentProofFileName, setPaymentProofFileName] = React.useState("");
  const paymentProofInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (invoice) {
      setStatus(invoice.status);
      setPaymentProofFileName("");
    }
  }, [invoice]);

  const statusOptions = React.useMemo<FilterOption[]>(
    () => [
      { value: "emitida", label: "Recebida (a pagar)" },
      { value: "agendada", label: "Agendada para pagamento" },
      { value: "analise", label: "Pagamento em analise" },
      { value: "paga", label: "Paga" },
      { value: "expirada", label: "Expirada (nao paga)" },
      { value: "cancelada", label: "Cancelada" },
    ],
    []
  );

  const openProofUploader = React.useCallback(() => {
    paymentProofInputRef.current?.click();
  }, []);

  if (!invoice) return null;

  return (
    <div className={styles.invoiceModalOverlay} onClick={onClose}>
      <div className={styles.invoiceModal} onClick={(event) => event.stopPropagation()}>
        <div className={styles.invoiceModalHeader}>
          <div className={styles.invoiceModalTitleGroup}>
            <StickyNote size={24} color="#345070" />
            <h2 className={styles.invoiceModalTitle}>Nota Fiscal</h2>
          </div>
          <button type="button" className={styles.invoiceModalCloseButton} onClick={onClose}>
            <X size={16} color="#7c8efd" />
          </button>
        </div>

        <div className={styles.invoiceModalBody}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Status da NF</label>
            <div className={styles.invoiceStatusSelect}>
              <FilterSelect value={status} options={statusOptions} onChange={setStatus} />
            </div>
          </div>

          <div className={styles.invoiceMetaGroup}>
            <div className={styles.invoiceMetaRow}>
              <div className={styles.invoiceMetaItem}>
                <span className={styles.invoiceMetaLabel}>{"N\u00BA da NF"}</span>
                <span className={styles.invoiceMetaValueStrong}>{invoice.numero}</span>
              </div>
              <div className={styles.invoiceMetaItem}>
                <span className={styles.invoiceMetaLabel}>{"Data de emiss\u00E3o da NF"}</span>
                <span className={styles.invoiceMetaValue}>{invoice.dataEmissao}</span>
              </div>
            </div>
            <div className={styles.invoiceMetaRow}>
              <div className={styles.invoiceMetaItem}>
                <span className={styles.invoiceMetaLabel}>Contrato</span>
                <span className={styles.invoiceMetaValue}>#14578-Felipe-Alves</span>
              </div>
              <div className={styles.invoiceMetaItem}>
                <span className={styles.invoiceMetaLabel}>Valor da NF</span>
                <span className={styles.invoiceMetaValue}>R$ 5.000,00</span>
              </div>
            </div>
          </div>

          <div className={styles.invoiceFileSection}>
            <span className={styles.invoiceMetaLabel}>Nota Fiscal</span>
            <div className={styles.invoiceFileCard}>
              <span className={styles.invoiceFileName}>NF-1234</span>
              <button type="button" className={styles.invoiceFileActionButton}>
                <CloudDownload size={12} />
                Baixar
              </button>
            </div>
          </div>

          <div className={styles.invoiceFileSection}>
            <span className={styles.invoiceMetaLabel}>Comprovante de pgto</span>
            <div
              className={styles.invoiceUploadCard}
              role="button"
              tabIndex={0}
              onClick={openProofUploader}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  openProofUploader();
                }
              }}
            >
              <input
                ref={paymentProofInputRef}
                type="file"
                className={styles.invoiceHiddenFileInput}
                accept=".pdf,.png,.jpg,.jpeg,.webp"
                onChange={(event) => {
                  const selectedFile = event.target.files?.[0];
                  setPaymentProofFileName(selectedFile?.name ?? "");
                }}
              />
              <div
                className={`${styles.invoiceFileActionButton} ${styles.invoiceUploadButton} ${paymentProofFileName ? styles.invoiceUploadButtonHasFile : ""}`}
              >
                <CloudUpload size={12} />
                {paymentProofFileName || "Clique para fazer o upload do comprovante de pagamento"}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.invoiceModalFooter}>
          <button type="button" className={styles.invoiceCancelButton} onClick={onClose}>
            CANCELAR
          </button>
          <button type="button" className={styles.invoiceSaveButton} onClick={onClose}>
            <CheckCircle2 size={20} />
            {"SALVAR ALTERA\u00C7\u00D5ES"}
          </button>
        </div>
      </div>
    </div>
  );
}

function RemessaInfoModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className={styles.remessaInfoOverlay} onClick={onClose}>
      <div className={styles.remessaInfoModal} onClick={(event) => event.stopPropagation()}>
        <h3 className={styles.remessaInfoTitle}>{"O que \u00E9 uma Remessa de pagamento?"}</h3>
        <p className={styles.remessaInfoText}>
          {"Use essa funcionalidade para pagar v\u00E1rios parceiros PJ de uma vez s\u00F3, com controle, automa\u00E7\u00E3o e sem erro manual."}
        </p>

        <p className={styles.remessaInfoSubtitle}>Como funciona:</p>
        <ol className={styles.remessaSteps}>
          <li className={styles.remessaStepItem}>
            <span className={styles.remessaStepBadge}>1</span>
            <span>{"Voc\u00EA seleciona todas as notas fiscais que deseja pagar."}</span>
          </li>
          <li className={styles.remessaStepItem}>
            <span className={styles.remessaStepBadge}>2</span>
            <span>{"Define um nome e data de vencimento para essa remessa."}</span>
          </li>
          <li className={styles.remessaStepItem}>
            <span className={styles.remessaStepBadge}>3</span>
            <span>{"O sistema gera um \u00FAnico boleto ou QR PIX com o valor total:"}</span>
          </li>
        </ol>

        <ul className={styles.remessaSubList}>
          <li>{"Envia o valor para cada parceiro conforme sua NF (split autom\u00E1tico)."}</li>
          <li>Anexa os comprovantes automaticamente.</li>
          <li>{"Atualiza o status de todas as NFs como 'Pagas'."}</li>
        </ul>

        <div className={styles.remessaLockLine}>
          <Lock size={14} color="#c9a800" />
          <span>{"Tudo isso com rastreabilidade e sem trabalho manual."}</span>
        </div>

        <button type="button" className={styles.remessaContinueButton} onClick={onClose}>
          Continuar
        </button>
      </div>
    </div>
  );
}

function CreateRemessaModal({
  isOpen,
  onClose,
  onSubmit,
  invoices,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (remessa: CreatedRemessa) => void;
  invoices: Invoice[];
}) {
  const [descricao, setDescricao] = React.useState("Pagamento de Julho");
  const [dataVencimento, setDataVencimento] = React.useState("2025-12-12");

  const remessaInvoices = React.useMemo(() => invoices.slice(0, 4), [invoices]);
  const valorUnitario = 5000;
  const valorTotal = remessaInvoices.length * valorUnitario;

  React.useEffect(() => {
    if (isOpen) {
      setDescricao("Pagamento de Julho");
      setDataVencimento("2025-12-12");
    }
  }, [isOpen]);

  function handleCreateRemessa() {
    onSubmit({
      id: "#6595",
      descricao,
      dataVencimento,
      invoices: remessaInvoices,
      valorTotal,
    });
  }

  if (!isOpen) return null;

  return (
    <div className={styles.createRemessaOverlay} onClick={onClose}>
      <div className={styles.createRemessaModal} onClick={(event) => event.stopPropagation()}>
        <div className={styles.createRemessaHeader}>
          <div className={styles.createRemessaTitleGroup}>
            <GitBranch size={24} color="#345070" />
            <div className={styles.createRemessaTitleText}>
              <h3 className={styles.createRemessaTitle}>Nova remessa de pagamento</h3>
              <p className={styles.createRemessaSubtitle}>Economize tempo e evite erros manuais.</p>
            </div>
          </div>
          <button type="button" className={styles.createRemessaCloseButton} onClick={onClose}>
            <X size={16} color="#7c8efd" />
          </button>
        </div>

        <div className={styles.createRemessaBody}>
          <div className={styles.createRemessaFieldsRow}>
            <div className={styles.createRemessaFieldGrow}>
              <label className={styles.createRemessaFieldLabel}>Descrição da remessa</label>
              <div className={styles.createRemessaTextField}>
                <input
                  type="text"
                  value={descricao}
                  onChange={(event) => setDescricao(event.target.value)}
                  className={styles.createRemessaTextInput}
                />
              </div>
            </div>

            <div className={styles.createRemessaFieldDate}>
              <label className={styles.createRemessaFieldLabel}>Data de vencimento</label>
              <FilterDatePicker
                value={dataVencimento}
                onChange={setDataVencimento}
                className={styles.createRemessaInputShell}
              />
            </div>
          </div>

          <p className={styles.createRemessaTotal}>Valor total: {formatBRL(valorTotal)}</p>

          <div className={styles.createRemessaTable}>
            <div className={styles.createRemessaTableHeader}>
              <span>Nº da NF</span>
              <span>Nome</span>
              <span>Valor</span>
            </div>

            {remessaInvoices.map((invoice) => (
              <div key={invoice.id} className={styles.createRemessaTableRow}>
                <span>{invoice.numero}</span>
                <span className={styles.createRemessaTableName}>{invoice.nome}</span>
                <span>{formatBRL(valorUnitario)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.createRemessaFooter}>
          <button type="button" className={styles.createRemessaCancelButton} onClick={onClose}>
            CANCELAR
          </button>
          <button type="button" className={styles.createRemessaSubmitButton} onClick={handleCreateRemessa}>
            <CheckCircle2 size={20} />
            CRIAR REMESSA
          </button>
        </div>
      </div>
    </div>
  );
}

function RemessaPaymentModal({
  remessa,
  onClose,
}: {
  remessa: CreatedRemessa | null;
  onClose: () => void;
}) {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!remessa) {
      setCopied(false);
    }
  }, [remessa]);

  if (!remessa) return null;

  async function handleCopyPixKey() {
    try {
      await navigator.clipboard.writeText(REMESSA_PIX_KEY);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={styles.remessaPaymentOverlay} onClick={onClose}>
      <div className={styles.remessaPaymentModal} onClick={(event) => event.stopPropagation()}>
        <button type="button" className={styles.remessaPaymentCloseButton} onClick={onClose}>
          <X size={16} color="#7c8efd" />
        </button>

        <div className={styles.remessaPaymentHeader}>
          <div className={styles.remessaPaymentBrand}>
            <div className={styles.remessaPaymentBrandIcon}>
              <Shield size={16} color="#ffffff" />
            </div>
            <span className={styles.remessaPaymentBrandText}>SeuPJ</span>
          </div>
          <div className={styles.remessaPaymentCompany}>
            <span className={styles.remessaPaymentCompanyName}>GuaraSoft</span>
            <span className={styles.remessaPaymentCompanyDoc}>40.222.222/0001-00</span>
          </div>
        </div>

        <div className={styles.remessaPaymentTitleRow}>
          <h3 className={styles.remessaPaymentTitle}>Remessa {remessa.id}</h3>
          <span className={styles.remessaPaymentStatus}>A pagar</span>
        </div>

        <div className={styles.remessaPaymentSummaryCard}>
          <div className={styles.remessaPaymentSummaryTopRow}>
            <div>
              <p className={styles.remessaPaymentSummaryLabel}>Valor total</p>
              <p className={styles.remessaPaymentSummaryValue}>{formatBRL(remessa.valorTotal)}</p>
            </div>
            <div className={styles.remessaPaymentSummaryRight}>
              <p className={styles.remessaPaymentSummaryLabel}>Vencimento</p>
              <p className={styles.remessaPaymentSummaryValue}>{formatDateForDisplay(remessa.dataVencimento)}</p>
            </div>
          </div>
          <div className={styles.remessaPaymentDivider} />
          <div>
            <p className={styles.remessaPaymentSummaryLabel}>Descricao</p>
            <p className={styles.remessaPaymentSummaryValue}>{remessa.descricao}</p>
          </div>
        </div>

        <div className={styles.remessaPaymentTableCard}>
          <div className={styles.remessaPaymentTableHeader}>
            <span>Nome</span>
            <span>Nº da NF</span>
            <span>Valor</span>
          </div>
          {remessa.invoices.map((invoice) => (
            <div key={invoice.id} className={styles.remessaPaymentTableRow}>
              <span className={styles.remessaPaymentTableName}>{invoice.nome}</span>
              <span>{invoice.numero}</span>
              <span>{formatBRL(5000)}</span>
            </div>
          ))}
          <button type="button" className={styles.remessaPaymentLoadMoreButton}>
            Carregar mais
          </button>
        </div>

        <div className={styles.remessaPaymentPixCard}>
          <p className={styles.remessaPaymentPixTitle}>Escaneie o QR code abaixo ou copie a chave abaixo</p>
          <div className={styles.remessaPaymentPixKeyRow}>
            <div className={styles.remessaPaymentPixKeyValue}>{REMESSA_PIX_KEY}</div>
            <button type="button" className={styles.remessaPaymentPixCopyButton} onClick={handleCopyPixKey}>
              <Copy size={16} />
              {copied ? "Copiado!" : "Copiar chave"}
            </button>
          </div>
          <div className={styles.remessaPaymentDivider} />
          <img
            src={REMESSA_QR_CODE_IMAGE_URL}
            alt="QR code da remessa"
            className={styles.remessaPaymentQrCode}
          />
        </div>

        <div className={styles.remessaPaymentSecurity}>
          <div className={styles.remessaPaymentSecurityTitle}>
            <Lock size={16} color="#5352ed" />
            <span>Plataforma segura.</span>
          </div>
          <p className={styles.remessaPaymentSecuritySubtitle}>
            Voce paga com confianca e seu parceiro PJ recebe com agilidade.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function NotasFiscaisPage() {
  const [activeTab, setActiveTab] = React.useState<ActiveTab>("visao");
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [selectedInvoice, setSelectedInvoice] = React.useState<Invoice | null>(null);
  const [isRemessaInfoOpen, setIsRemessaInfoOpen] = React.useState(false);
  const [isCreateRemessaOpen, setIsCreateRemessaOpen] = React.useState(false);
  const [createdRemessa, setCreatedRemessa] = React.useState<CreatedRemessa | null>(null);

  const summaryCards = [
    { label: "Emitida (a pagar)",       value: "R$ 350.000,00" },
    { label: "Agendada para pagamento", value: "R$ 350.000,00" },
    { label: "Pagamento em análise",    value: "R$ 350.000,00" },
    { label: "Total pago",              value: "R$ 350.000,00" },
  ];

  return (
    <div className={styles.container}>
      <TopHeaderBar title="Notas Fiscais" hasNotifications={true} />

      <div className={styles.contentWrapper}>
        {/* Tab bar */}
        <div className={styles.tabBar}>
          <div className={styles.tabBarTabs}>
            <button
              className={`${styles.tabBtn} ${activeTab === "visao" ? styles.tabBtnActive : ""}`}
              onClick={() => setActiveTab("visao")}
            >
              <PieChart size={20} />
              VISÃO GERAL
            </button>
            <button
              className={`${styles.tabBtn} ${activeTab === "notas" ? styles.tabBtnActive : ""}`}
              onClick={() => setActiveTab("notas")}
            >
              <FileText size={20} />
              NOTAS FISCAIS
            </button>
          </div>

          {activeTab === "notas" && (
            <div className={styles.tabBarActions}>
              <button
                type="button"
                className={styles.tooltipIconButton}
                onClick={() => setIsRemessaInfoOpen(true)}
                aria-label="Abrir informações sobre remessa de pagamento"
              >
                <Info size={28} color="#527ca5" />
              </button>
              <button
                type="button"
                className={styles.createRemessaButton}
                onClick={() => setIsCreateRemessaOpen(true)}
              >
                <Plus size={20} />
                CRIAR REMESSA DE PAGAMENTO
              </button>
            </div>
          )}
        </div>

        {activeTab === "visao" ? (
          /* ── VISÃO GERAL ──────────────────────────────────────────────── */
          <div className={styles.mainCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.registrosText}>57 REGISTROS</span>
              <button className={styles.filterButton} onClick={() => setIsFilterOpen(true)}>
                <Filter size={20} color="#5352ed" />
                <span>FILTROS</span>
              </button>
            </div>

            <div className={styles.summaryRow}>
              {summaryCards.map((card) => (
                <div key={card.label} className={styles.summaryCard}>
                  <p className={styles.summaryCardLabel}>{card.label}</p>
                  <p className={styles.summaryCardValue}>{card.value}</p>
                </div>
              ))}
            </div>

            <div className={styles.chartsRow}>
              <div className={styles.chartCard}>
                <div className={styles.chartCardHeader}>
                  <span className={styles.chartCardTitle}>Porcentagem por categoria</span>
                  <Info size={16} color="#8f9092" />
                </div>
                <div className={styles.donutRow}>
                  <DonutChart data={DONUT_DATA} />
                  <div className={styles.donutLegend}>
                    {DONUT_DATA.map((seg) => (
                      <LegendItem
                        key={seg.key}
                        color={STATUS_COLORS[seg.key]}
                        label={STATUS_LABELS[seg.key]}
                        value={`${seg.pct}%`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.chartCard}>
                <div className={styles.chartCardHeader}>
                  <span className={styles.chartCardTitle}>Total por categoria</span>
                </div>
                <div style={{ padding: "8px 12px 4px" }}>
                  <BarChart data={BAR_DATA} />
                </div>
                <div className={styles.barLegend}>
                  {Object.entries(STATUS_LABELS).map(([key, label], i) => (
                    <div key={key} className={styles.barLegendItem}>
                      <div className={styles.legendDot} style={{ backgroundColor: STATUS_COLORS[key] }} />
                      <span className={styles.legendLabel}>{`${i + 1} – ${label}`}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ── NOTAS FISCAIS TABLE ──────────────────────────────────────── */
          <div className={styles.mainCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.registrosText}>{invoices.length} Notas fiscais</span>
              <div style={{ display: "flex", gap: 12 }}>
                <div className={styles.searchBox}>
                  <Search size={16} color="#c1c1c1" />
                  <input className={styles.searchInput} placeholder="Pesquise pelo parceiro ou número" />
                </div>
                <button className={styles.filterButton} onClick={() => setIsFilterOpen(true)}>
                  <Filter size={20} color="#5352ed" />
                  <span>FILTROS</span>
                </button>
              </div>
            </div>

            <div className={styles.tableWrapper}>
              {/* Header */}
              <div className={styles.tableHeader}>
                <div className={styles.thCheck}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    onClick={(event) => event.stopPropagation()}
                  />
                </div>
                <div className={styles.thText}>Nº da NF</div>
                <div className={styles.thText}>Nome</div>
                <div className={styles.thText}>Data da emissão</div>
                <div className={styles.thText}>Categoria</div>
                <div className={styles.thText} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  Status da NF
                  <Info size={14} color="#8f9092" />
                </div>
                <div className={styles.thText}>Ações</div>
              </div>

              {/* Rows */}
              <div className={styles.tableBody}>
                {invoices.map((inv) => {
                  const visibleCats = inv.categorias.slice(0, 1);
                  const extraCount = inv.categorias.length - 1;
                  return (
                    <div
                      key={inv.id}
                      className={styles.tableRow}
                      onClick={() => setSelectedInvoice(inv)}
                    >
                      <div className={styles.tdCheck}>
                        <input
                          type="checkbox"
                          className={styles.checkbox}
                          onClick={(event) => event.stopPropagation()}
                        />
                      </div>
                      <div className={styles.tdTitle}>{inv.numero}</div>
                      <div className={styles.tdName}>{inv.nome}</div>
                      <div className={styles.tdDate}>{inv.dataEmissao}</div>
                      <div className={styles.tdCats}>
                        {visibleCats.map((c, i) => (
                          <CategoryBadge key={i} label={c.label} cor={c.cor} />
                        ))}
                        {extraCount > 0 && (
                          <span className={styles.catExtra}>+{extraCount}</span>
                        )}
                      </div>
                      <div className={styles.tdStatus}>
                        <StatusBadge status={inv.status} />
                      </div>
                      <div className={styles.tdActions}>
                        <ChevronRight size={18} color="#5352ed" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      <FilterSheet
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
      <InvoiceDetailsModal
        invoice={selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
      />
      <RemessaInfoModal
        isOpen={isRemessaInfoOpen}
        onClose={() => setIsRemessaInfoOpen(false)}
      />
      <CreateRemessaModal
        isOpen={isCreateRemessaOpen}
        onClose={() => setIsCreateRemessaOpen(false)}
        onSubmit={(remessa) => {
          setIsCreateRemessaOpen(false);
          setCreatedRemessa(remessa);
        }}
        invoices={invoices}
      />
      <RemessaPaymentModal
        remessa={createdRemessa}
        onClose={() => setCreatedRemessa(null)}
      />
    </div>
  );
}
