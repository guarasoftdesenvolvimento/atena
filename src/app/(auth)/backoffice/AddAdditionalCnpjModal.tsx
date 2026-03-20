"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import styles from "./AddAdditionalCnpjModal.module.css";
import { useEscapeToClose, useLockBodyScroll } from "./useModalEffects";

export type AddAdditionalCnpjModalProps = {
  open: boolean;
  onClose: () => void;
  onAdd: (cnpj: string) => void;
};

export default function AddAdditionalCnpjModal({ open, onClose, onAdd }: AddAdditionalCnpjModalProps) {
  const [cnpj, setCnpj] = useState("");
  const titleId = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useLockBodyScroll(open);
  useEscapeToClose(open, onClose);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => window.clearTimeout(t);
  }, [open]);

  if (!open) return null;

  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  const onBackdropMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className={styles.overlay} onMouseDown={onBackdropMouseDown}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-label="CNPJ Adicional"
        aria-labelledby={titleId}
        onMouseDown={stopPropagation}
      >
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.cnpjLeftIcon} aria-hidden="true">
              <Search size={18} />
            </div>
            <div id={titleId} className={styles.headerTitle}>
              CNPJ Adicional
            </div>
          </div>

          <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Fechar">
            <X size={16} color="var(--atena-primary-400)" />
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.field}>
            <div className={styles.label}>CNPJ</div>
            <div className={styles.cnpjInputShell}>
              <div className={styles.cnpjIcon} aria-hidden="true">
                <Search size={16} />
              </div>
              <input
                ref={inputRef}
                className={styles.cnpjInput}
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
                placeholder="38.300.972/0001-11"
                aria-label="CNPJ adicional"
              />
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <button type="button" className={styles.cancelButton} onClick={onClose}>
            CANCELAR
          </button>

          <button
            type="button"
            className={styles.primaryButton}
            onClick={() => {
              const value = cnpj.trim();
              if (!value) return;
              onAdd(value);
              onClose();
            }}
            disabled={cnpj.trim().length === 0}
          >
            <span className={styles.primaryButtonText}>ADICIONAR</span>
          </button>
        </div>
      </div>
    </div>
  );
}

