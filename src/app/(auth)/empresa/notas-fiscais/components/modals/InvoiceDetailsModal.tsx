import React from "react";
import { CheckCircle2, CloudDownload, CloudUpload, StickyNote, X } from "lucide-react";
import { INVOICE_MODAL_STATUS_OPTIONS } from "../../constants";
import styles from "../../notas-fiscais.module.css";
import type { Invoice } from "../../types";
import FilterSelect from "../filters/FilterSelect";

export default function InvoiceDetailsModal({
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
    if (!invoice) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [invoice, onClose]);

  React.useEffect(() => {
    if (invoice) {
      setStatus(invoice.status);
      setPaymentProofFileName("");
    }
  }, [invoice]);

  const openProofUploader = React.useCallback(() => {
    paymentProofInputRef.current?.click();
  }, []);

  if (!invoice) return null;

  return (
    <div className={styles.invoiceModalOverlay} onClick={onClose}>
      <div
        className={styles.invoiceModal}
        role="dialog"
        aria-modal="true"
        aria-label="Detalhes da nota fiscal"
        onClick={(event) => event.stopPropagation()}
      >
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
              <FilterSelect value={status} options={INVOICE_MODAL_STATUS_OPTIONS} onChange={setStatus} />
            </div>
          </div>

          <div className={styles.invoiceMetaGroup}>
            <div className={styles.invoiceMetaRow}>
              <div className={styles.invoiceMetaItem}>
                <span className={styles.invoiceMetaLabel}>{"Nº da NF"}</span>
                <span className={styles.invoiceMetaValueStrong}>{invoice.numero}</span>
              </div>
              <div className={styles.invoiceMetaItem}>
                <span className={styles.invoiceMetaLabel}>{"Data de emissão da NF"}</span>
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
                className={`${styles.invoiceFileActionButton} ${styles.invoiceUploadButton} ${
                  paymentProofFileName ? styles.invoiceUploadButtonHasFile : ""
                }`}
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
            {"SALVAR ALTERAÇÕES"}
          </button>
        </div>
      </div>
    </div>
  );
}
