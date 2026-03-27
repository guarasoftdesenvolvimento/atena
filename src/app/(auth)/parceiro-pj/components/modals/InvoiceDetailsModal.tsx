import { CloudDownload, ExternalLink, ReceiptText, X } from "lucide-react";
import { uiText } from "../../data";
import styles from "../../parceiro-pj.module.css";
import type { InvoiceItem } from "../../types";

interface InvoiceDetailsModalProps {
  invoice: InvoiceItem | null;
  onClose: () => void;
}

export default function InvoiceDetailsModal({ invoice, onClose }: InvoiceDetailsModalProps) {
  if (!invoice) {
    return null;
  }

  return (
    <div
      className={styles.invoiceModalOverlay}
      role="button"
      tabIndex={0}
      onClick={onClose}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          onClose();
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
            onClick={onClose}
          >
            <X size={16} strokeWidth={2.2} />
          </button>
        </header>

        <div className={styles.invoiceModalBody}>
          <div className={styles.invoiceModalInfo}>
            <div className={styles.invoiceModalInfoBlock}>
              <span>{uiText.contract}</span>
              <strong>#{invoice.contractCode}</strong>
            </div>
            <div className={styles.invoiceModalInfoBlock}>
              <span>{uiText.invoiceNumber}</span>
              <strong className={styles.invoiceModalPrimaryValue}>#{invoice.code}</strong>
            </div>
            <div className={styles.invoiceModalInfoBlock}>
              <span>{uiText.invoiceIssueDate}</span>
              <strong>{invoice.issuedAt}</strong>
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
              <span>{invoice.paymentProof ?? "comprovante_nf-1234"}</span>
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
  );
}
