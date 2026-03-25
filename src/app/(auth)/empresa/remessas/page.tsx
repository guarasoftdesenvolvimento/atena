"use client";

import React from "react";
import {
  Filter,
  Info,
  ChevronDown,
  ListFilter,
  MoreVertical,
  ExternalLink,
  Trash2,
  Link2,
  GitBranch,
  X,
  CloudDownload,
  Copy,
  Shield,
  Lock,
} from "lucide-react";
import TopHeaderBar from "../components/TopHeaderBar";
import styles from "./remessas.module.css";

type Remessa = {
  id: string;
  dataEmissao: string;
  dataVencimento: string;
  quantidadeNf: number;
  valor: string;
  status: "a_pagar" | "vencida" | "paga";
};

type FilterOption = {
  label: string;
  value: string;
};

type RemessaInvoice = {
  id: string;
  numero: string;
  nome: string;
  valor: string;
};

const remessas: Remessa[] = [
  { id: "#25854", dataEmissao: "10/12/2025", dataVencimento: "12/12/2025", quantidadeNf: 8, valor: "R$ 50.000,00", status: "a_pagar" },
  { id: "#25855", dataEmissao: "08/07/2025", dataVencimento: "08/07/2025", quantidadeNf: 16, valor: "R$ 50.000,00", status: "vencida" },
  { id: "#25856", dataEmissao: "08/07/2025", dataVencimento: "08/07/2025", quantidadeNf: 2, valor: "R$ 50.000,00", status: "paga" },
  { id: "#25857", dataEmissao: "08/07/2025", dataVencimento: "08/07/2025", quantidadeNf: 1, valor: "R$ 50.000,00", status: "paga" },
];

const REMESSA_QR_CODE_IMAGE_URL = "https://www.figma.com/api/mcp/asset/25095259-1a05-471f-9169-e74d1ba591f5";
const REMESSA_PIX_KEY = "656s5dsdsdwedeafdfd551fd";

function formatDateForDisplay(isoDate: string) {
  if (!isoDate) return "";
  const [year, month, day] = isoDate.split("-");
  if (!year || !month || !day) return isoDate;
  return `${day}/${month}/${year}`;
}

function parseBRL(value: string) {
  const normalized = value.replace(/[^\d,.-]/g, "").replace(/\./g, "").replace(",", ".");
  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatBRL(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value);
}

function getRemessaStatusMeta(status: Remessa["status"]) {
  const map: Record<Remessa["status"], { label: string; bg: string; color: string }> = {
    a_pagar: { label: "A pagar", bg: "#f9eeb6", color: "#826e0a" },
    vencida: { label: "Vencida (não paga)", bg: "#f8bbbb", color: "#d22020" },
    paga: { label: "Paga", bg: "#b9e9dd", color: "#1ba785" },
  };

  return map[status];
}

function getRemessaInvoices(remessa: Remessa, limit = 6): RemessaInvoice[] {
  const rowsToShow = Math.max(1, Math.min(remessa.quantidadeNf, limit));
  const total = parseBRL(remessa.valor);
  const unitValue = remessa.quantidadeNf > 0 ? total / remessa.quantidadeNf : total;

  return Array.from({ length: rowsToShow }, (_, idx) => ({
    id: `${remessa.id}-${idx}`,
    numero: "#NF1258",
    nome: "Felipe Alves dos Santos",
    valor: formatBRL(unitValue),
  }));
}

function RemessaStatusBadge({ status }: { status: Remessa["status"] }) {
  const entry = getRemessaStatusMeta(status);

  return (
    <span className={styles.statusBadge} style={{ backgroundColor: entry.bg, color: entry.color }}>
      {entry.label}
    </span>
  );
}

function RemessaViewModal({
  remessa,
  onClose,
}: {
  remessa: Remessa | null;
  onClose: () => void;
}) {
  const invoiceRows = React.useMemo(() => (remessa ? getRemessaInvoices(remessa, 6) : []), [remessa]);

  if (!remessa) return null;

  const statusMeta = getRemessaStatusMeta(remessa.status);

  return (
    <div className={styles.remessaViewOverlay} onClick={onClose}>
      <div className={styles.remessaViewModal} onClick={(event) => event.stopPropagation()}>
        <div className={styles.remessaViewHeader}>
          <div className={styles.remessaViewTitleWrap}>
            <div className={styles.remessaViewIconWrap}>
              <GitBranch size={16} color="#345070" />
            </div>
            <h3 className={styles.remessaViewTitle}>Remessa {remessa.id}</h3>
          </div>

          <div className={styles.remessaViewHeaderRight}>
            <span className={styles.remessaViewStatus} style={{ backgroundColor: statusMeta.bg, color: statusMeta.color }}>
              {statusMeta.label}
            </span>
            <button type="button" className={styles.remessaViewCloseButton} onClick={onClose}>
              <X size={16} color="#7c8efd" />
            </button>
          </div>
        </div>

        <div className={styles.remessaViewBody}>
          <div className={styles.remessaViewInfoRow}>
            <div className={styles.remessaViewInfoBlock}>
              <p className={styles.remessaViewInfoLabel}>Descrição</p>
              <p className={styles.remessaViewInfoValue}>Pagamento de Julho</p>
            </div>
            <div className={styles.remessaViewInfoBlock}>
              <p className={styles.remessaViewInfoLabel}>Vencimento</p>
              <p className={styles.remessaViewInfoValue}>{formatDateForDisplay(remessa.dataVencimento)}</p>
            </div>
          </div>

          <p className={styles.remessaViewTotal}>Valor total: {remessa.valor}</p>

          <div className={styles.remessaViewTable}>
            <div className={styles.remessaViewTableHeader}>
              <span>Nº da NF</span>
              <span>Nome</span>
              <span>Valor</span>
            </div>

            {invoiceRows.map((row) => (
              <div key={row.id} className={styles.remessaViewTableRow}>
                <span className={styles.remessaViewInvoiceNumber}>
                  <CloudDownload size={12} />
                  {row.numero}
                </span>
                <span className={styles.remessaViewName}>{row.nome}</span>
                <span className={styles.remessaViewValue}>{row.valor}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RemessaPaymentModal({
  remessa,
  onClose,
}: {
  remessa: Remessa | null;
  onClose: () => void;
}) {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!remessa) {
      setCopied(false);
    }
  }, [remessa]);

  const invoiceRows = React.useMemo(() => (remessa ? getRemessaInvoices(remessa, 6) : []), [remessa]);

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
              <p className={styles.remessaPaymentSummaryValue}>{remessa.valor}</p>
            </div>
            <div className={styles.remessaPaymentSummaryRight}>
              <p className={styles.remessaPaymentSummaryLabel}>Vencimento</p>
              <p className={styles.remessaPaymentSummaryValue}>{formatDateForDisplay(remessa.dataVencimento)}</p>
            </div>
          </div>
          <div className={styles.remessaPaymentDivider} />
          <div>
            <p className={styles.remessaPaymentSummaryLabel}>Descrição</p>
            <p className={styles.remessaPaymentSummaryValue}>Pagamento de Julho</p>
          </div>
        </div>

        <div className={styles.remessaPaymentTableCard}>
          <div className={styles.remessaPaymentTableHeader}>
            <span>Nome</span>
            <span>Nº da NF</span>
            <span>Valor</span>
          </div>
          {invoiceRows.map((invoice) => (
            <div key={invoice.id} className={styles.remessaPaymentTableRow}>
              <span className={styles.remessaPaymentTableName}>{invoice.nome}</span>
              <span>{invoice.numero}</span>
              <span>{invoice.valor}</span>
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
            Você paga com confiança e seu parceiro PJ recebe com agilidade.
          </p>
        </div>
      </div>
    </div>
  );
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
        <ChevronDown size={20} color="#c1c1c1" />
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
}: {
  value: string;
  onChange: (value: string) => void;
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
      className={`${styles.inputField} ${styles.datePickerField}`}
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
      <ChevronDown size={20} color="#c1c1c1" />
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
  const [status, setStatus] = React.useState("todos");
  const [dataDe, setDataDe] = React.useState("2025-01-01");
  const [dataAte, setDataAte] = React.useState("2025-02-02");

  const statusOptions = React.useMemo<FilterOption[]>(
    () => [
      { value: "todos", label: "Todos" },
      { value: "a_pagar", label: "A pagar" },
      { value: "vencida", label: "Vencida (não paga)" },
      { value: "paga", label: "Paga" },
    ],
    []
  );

  function handleClear() {
    setStatus("todos");
    setDataDe("2025-01-01");
    setDataAte("2025-02-02");
  }

  return (
    <div className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ""}`} onClick={onClose}>
      <div className={`${styles.sheet} ${isOpen ? styles.sheetVisible : ""}`} onClick={(event) => event.stopPropagation()}>
        <div className={styles.sheetHeader}>
          <h2 className={styles.sheetTitle}>Filtros:</h2>
        </div>

        <div className={styles.sheetBody}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Filtrar por status</label>
            <FilterSelect value={status} options={statusOptions} onChange={setStatus} />
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Filtrar por data</label>
            <div className={styles.dateRangeRow}>
              <div style={{ flex: 1 }}>
                <span className={styles.dateInputLabel}>De</span>
                <FilterDatePicker value={dataDe} onChange={setDataDe} />
              </div>
              <div style={{ flex: 1 }}>
                <span className={styles.dateInputLabel}>Até</span>
                <FilterDatePicker value={dataAte} onChange={setDataAte} />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.sheetFooter}>
          <button
            type="button"
            className={styles.clearButton}
            onClick={() => {
              handleClear();
              onClose();
            }}
          >
            LIMPAR
          </button>
          <button type="button" className={styles.applyButton} onClick={onClose}>
            <ListFilter size={20} />
            APLICAR FILTRO
          </button>
        </div>
      </div>
    </div>
  );
}

export default function RemessasPage() {
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [openPopoverId, setOpenPopoverId] = React.useState<string | null>(null);
  const [selectedRemessa, setSelectedRemessa] = React.useState<Remessa | null>(null);
  const [selectedPaymentRemessa, setSelectedPaymentRemessa] = React.useState<Remessa | null>(null);

  React.useEffect(() => {
    function onDocumentMouseDown(event: MouseEvent) {
      const target = event.target;

      if (!(target instanceof Element)) {
        setOpenPopoverId(null);
        return;
      }

      if (!target.closest("[data-remessa-action-menu]")) {
        setOpenPopoverId(null);
      }
    }

    function onDocumentKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenPopoverId(null);
        setSelectedRemessa(null);
        setSelectedPaymentRemessa(null);
      }
    }

    document.addEventListener("mousedown", onDocumentMouseDown);
    document.addEventListener("keydown", onDocumentKeyDown);

    return () => {
      document.removeEventListener("mousedown", onDocumentMouseDown);
      document.removeEventListener("keydown", onDocumentKeyDown);
    };
  }, []);

  return (
    <div className={styles.container}>
      <TopHeaderBar title="Remessas" hasNotifications={true} />

      <div className={styles.contentWrapper}>
        <div className={styles.mainCard}>
          <div className={styles.sectionHeader}>
            <span className={styles.registrosText}>{remessas.length} Remessas</span>
            <button className={styles.filterButton} type="button" onClick={() => setIsFilterOpen(true)}>
              <Filter size={20} color="#5352ed" />
              <span>FILTROS</span>
            </button>
          </div>

          <div className={styles.tableWrapper}>
            <div className={styles.tableHeader}>
              <div className={styles.headerCell}>ID da Remessa</div>
              <div className={styles.headerCell}>Data de emissão</div>
              <div className={styles.headerCell}>Data de vencimento</div>
              <div className={styles.headerCell}>Quantidade de NF</div>
              <div className={styles.headerCell}>Valor da remessa</div>
              <div className={`${styles.headerCell} ${styles.statusHeaderCell}`}>
                Status de pgto
                <Info size={14} color="#527ca5" />
              </div>
              <div className={`${styles.headerCell} ${styles.actionsHeaderCell}`}>Ações</div>
            </div>

            <div className={styles.tableBody}>
              {remessas.map((remessa, index) => {
                const rowId = `${remessa.id}-${index}`;

                return (
                  <div key={rowId} className={`${styles.tableRow} ${index === remessas.length - 1 ? styles.tableRowLast : ""}`}>
                    <div className={styles.idCell}>{remessa.id}</div>
                    <div className={styles.textCell}>{remessa.dataEmissao}</div>
                    <div className={styles.textCell}>{remessa.dataVencimento}</div>
                    <div className={styles.textCell}>{remessa.quantidadeNf}</div>
                    <div className={styles.textCell}>{remessa.valor}</div>
                    <div className={styles.statusCell}>
                      <RemessaStatusBadge status={remessa.status} />
                    </div>
                    <div className={styles.actionCell}>
                      <div className={styles.actionMenuWrapper} data-remessa-action-menu>
                        <button
                          type="button"
                          aria-label="Ações da remessa"
                          className={`${styles.moreButton} ${openPopoverId === rowId ? styles.moreButtonActive : ""}`}
                          onClick={() => setOpenPopoverId((current) => (current === rowId ? null : rowId))}
                        >
                          <MoreVertical size={16} />
                        </button>

                        {openPopoverId === rowId && (
                          <div className={styles.popover}>
                            <button
                              type="button"
                              className={styles.popoverItem}
                              onClick={() => {
                                setOpenPopoverId(null);
                                setSelectedPaymentRemessa(null);
                                setSelectedRemessa(remessa);
                              }}
                            >
                              <ExternalLink size={14} className={styles.popoverIcon} />
                              <span className={styles.popoverText}>Visualizar</span>
                            </button>
                            <button
                              type="button"
                              className={`${styles.popoverItem} ${styles.popoverItemDanger}`}
                              onClick={() => setOpenPopoverId(null)}
                            >
                              <Trash2 size={14} className={styles.popoverIcon} />
                              <span className={styles.popoverText}>Excluir</span>
                            </button>
                            <button
                              type="button"
                              className={styles.popoverItem}
                              onClick={() => {
                                setOpenPopoverId(null);
                                setSelectedRemessa(null);
                                setSelectedPaymentRemessa(remessa);
                              }}
                            >
                              <Link2 size={14} className={styles.popoverIcon} />
                              <span className={styles.popoverText}>Acessar link de pagamento</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <RemessaViewModal remessa={selectedRemessa} onClose={() => setSelectedRemessa(null)} />
      <RemessaPaymentModal remessa={selectedPaymentRemessa} onClose={() => setSelectedPaymentRemessa(null)} />

      <FilterSheet isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
    </div>
  );
}