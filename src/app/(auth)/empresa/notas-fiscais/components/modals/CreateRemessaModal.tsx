import React from "react";
import { CheckCircle2, GitBranch, X } from "lucide-react";
import styles from "../../notas-fiscais.module.css";
import type { CreatedRemessa, Invoice } from "../../types";
import { formatBRL } from "../../utils/formatters";
import FilterDatePicker from "../filters/FilterDatePicker";

export default function CreateRemessaModal({
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
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

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
      <div
        className={styles.createRemessaModal}
        role="dialog"
        aria-modal="true"
        aria-label="Criar remessa de pagamento"
        onClick={(event) => event.stopPropagation()}
      >
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
