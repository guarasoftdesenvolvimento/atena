import React from "react";
import { ArrowLeft, CalendarDays, ChevronDown, ExternalLink, FileText, Plus, ReceiptText } from "lucide-react";
import { invoiceItems, uiText } from "../../data";
import styles from "../../parceiro-pj.module.css";
import type { InvoiceFlowMode, InvoiceItem } from "../../types";
import EmitInvoiceModal from "../modals/EmitInvoiceModal";
import InvoiceDetailsModal from "../modals/InvoiceDetailsModal";

interface InvoicesStepProps {
  openInvoiceIndexes: number[];
  invoiceModal: InvoiceItem | null;
  isEmitInvoiceModalOpen: boolean;
  invoiceFlowMode: InvoiceFlowMode;
  uploadedInvoiceFileName: string;
  emitInvoiceAmount: string;
  emitInvoiceContractCode: string;
  canSubmitEmitInvoice: boolean;
  emitInvoicePrimaryActionLabel: string;
  uploadInvoiceInputRef: React.RefObject<HTMLInputElement | null>;
  onBack: () => void;
  onOpenEmitInvoiceModal: () => void;
  onToggleInvoice: (index: number) => void;
  onOpenInvoiceModal: (invoice: InvoiceItem) => void;
  onCloseInvoiceModal: () => void;
  onCloseEmitInvoiceModal: () => void;
  onInvoiceFlowModeChange: (mode: InvoiceFlowMode) => void;
  onInvoiceUploadChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEmitInvoiceAmountChange: (value: string) => void;
  onEmitInvoiceContractCodeChange: (value: string) => void;
  onSubmitEmitInvoice: () => void;
}

export default function InvoicesStep({
  openInvoiceIndexes,
  invoiceModal,
  isEmitInvoiceModalOpen,
  invoiceFlowMode,
  uploadedInvoiceFileName,
  emitInvoiceAmount,
  emitInvoiceContractCode,
  canSubmitEmitInvoice,
  emitInvoicePrimaryActionLabel,
  uploadInvoiceInputRef,
  onBack,
  onOpenEmitInvoiceModal,
  onToggleInvoice,
  onOpenInvoiceModal,
  onCloseInvoiceModal,
  onCloseEmitInvoiceModal,
  onInvoiceFlowModeChange,
  onInvoiceUploadChange,
  onEmitInvoiceAmountChange,
  onEmitInvoiceContractCodeChange,
  onSubmitEmitInvoice,
}: InvoicesStepProps) {
  return (
    <div className={`${styles.content} ${styles.homeContent} ${styles.contractsContent}`}>
      <header className={styles.contractsTopBar}>
        <button
          type="button"
          className={styles.contractsBackButton}
          aria-label="Voltar para Home"
          onClick={onBack}
        >
          <ArrowLeft size={24} strokeWidth={2.2} />
        </button>
        <h1 className={styles.contractsHeading}>{uiText.invoices}</h1>
      </header>

      <div className={styles.invoiceActionRow}>
        <button type="button" className={styles.invoiceEmitButton} onClick={onOpenEmitInvoiceModal}>
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
              <article key={invoice.id} className={styles.invoiceCard}>
                <header
                  className={`${styles.invoiceCardHeader} ${
                    isOpen ? styles.invoiceCardHeaderOpen : styles.invoiceCardHeaderClosed
                  }`}
                >
                  <button
                    type="button"
                    className={styles.invoiceCardMainAction}
                    onClick={() => onOpenInvoiceModal(invoice)}
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
                    onClick={() => onToggleInvoice(index)}
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
                    onClick={() => onOpenInvoiceModal(invoice)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        onOpenInvoiceModal(invoice);
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

      <EmitInvoiceModal
        isOpen={isEmitInvoiceModalOpen}
        invoiceFlowMode={invoiceFlowMode}
        uploadedInvoiceFileName={uploadedInvoiceFileName}
        emitInvoiceAmount={emitInvoiceAmount}
        emitInvoiceContractCode={emitInvoiceContractCode}
        canSubmitEmitInvoice={canSubmitEmitInvoice}
        emitInvoicePrimaryActionLabel={emitInvoicePrimaryActionLabel}
        uploadInvoiceInputRef={uploadInvoiceInputRef}
        onClose={onCloseEmitInvoiceModal}
        onInvoiceFlowModeChange={onInvoiceFlowModeChange}
        onInvoiceUploadChange={onInvoiceUploadChange}
        onEmitInvoiceAmountChange={onEmitInvoiceAmountChange}
        onEmitInvoiceContractCodeChange={onEmitInvoiceContractCodeChange}
        onSubmit={onSubmitEmitInvoice}
      />

      <InvoiceDetailsModal invoice={invoiceModal} onClose={onCloseInvoiceModal} />
    </div>
  );
}
