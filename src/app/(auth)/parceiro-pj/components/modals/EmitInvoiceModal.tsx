import React from "react";
import { ReceiptText, Upload, X } from "lucide-react";
import { contractItems, uiText } from "../../data";
import styles from "../../parceiro-pj.module.css";
import type { InvoiceFlowMode } from "../../types";

interface EmitInvoiceModalProps {
  isOpen: boolean;
  invoiceFlowMode: InvoiceFlowMode;
  uploadedInvoiceFileName: string;
  emitInvoiceAmount: string;
  emitInvoiceContractCode: string;
  canSubmitEmitInvoice: boolean;
  emitInvoicePrimaryActionLabel: string;
  uploadInvoiceInputRef: React.RefObject<HTMLInputElement | null>;
  onClose: () => void;
  onInvoiceFlowModeChange: (mode: InvoiceFlowMode) => void;
  onInvoiceUploadChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEmitInvoiceAmountChange: (value: string) => void;
  onEmitInvoiceContractCodeChange: (value: string) => void;
  onSubmit: () => void;
}

export default function EmitInvoiceModal({
  isOpen,
  invoiceFlowMode,
  uploadedInvoiceFileName,
  emitInvoiceAmount,
  emitInvoiceContractCode,
  canSubmitEmitInvoice,
  emitInvoicePrimaryActionLabel,
  uploadInvoiceInputRef,
  onClose,
  onInvoiceFlowModeChange,
  onInvoiceUploadChange,
  onEmitInvoiceAmountChange,
  onEmitInvoiceContractCodeChange,
  onSubmit,
}: EmitInvoiceModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={styles.emitInvoiceModalOverlay}
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
            onClick={onClose}
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
                onChange={(event) => onEmitInvoiceAmountChange(event.target.value)}
              />
            </label>

            <label className={styles.emitInvoiceFieldGroup}>
              <span>{uiText.linkedContractLabel}</span>
              <select
                value={emitInvoiceContractCode}
                onChange={(event) => onEmitInvoiceContractCodeChange(event.target.value)}
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
              onClick={() => onInvoiceFlowModeChange("emit")}
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
              onClick={() => onInvoiceFlowModeChange("upload")}
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
                onChange={onInvoiceUploadChange}
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
          <button type="button" className={styles.emitInvoiceCancelButton} onClick={onClose}>
            {uiText.cancel}
          </button>
          <button
            type="button"
            className={styles.emitInvoiceConfirmButton}
            disabled={!canSubmitEmitInvoice}
            onClick={onSubmit}
          >
            {emitInvoicePrimaryActionLabel}
          </button>
        </footer>
      </div>
    </div>
  );
}
