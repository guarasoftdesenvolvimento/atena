"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { CheckCircle, Search, X } from "lucide-react";
import styles from "./ChangeAccessPlanModal.module.css";
import { useEscapeToClose, useLockBodyScroll } from "./useModalEffects";

type ChangeAccessPlanModalProps = {
  open: boolean;
  onClose: () => void;
  initialCnpj: string;
  initialAccesses: number;
  initialValuePerPerson: string;
  initialCompanyName: string;
  initialCompanyCnpj: string;
};

export default function ChangeAccessPlanModal({
  open,
  onClose,
  initialCnpj,
  initialAccesses,
  initialValuePerPerson,
  initialCompanyName,
  initialCompanyCnpj,
}: ChangeAccessPlanModalProps) {
  const [accesses, setAccesses] = useState<number>(initialAccesses);
  const [valuePerPerson, setValuePerPerson] = useState<string>(initialValuePerPerson);
  const titleId = useId();
  const accessesInputRef = useRef<HTMLInputElement | null>(null);

  useLockBodyScroll(open);
  useEscapeToClose(open, onClose);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => accessesInputRef.current?.focus(), 0);
    return () => window.clearTimeout(t);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className={styles.overlay}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
        <div
          className={styles.modal}
          role="dialog"
          aria-modal="true"
          aria-label="Alterar plano de acessos"
          aria-labelledby={titleId}
        >
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <Search size={18} color="#345070" />
              <div id={titleId} className={styles.headerTitle}>
                Alterar plano de acessos
              </div>
          </div>
          <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Fechar">
            <X size={16} color="#7c8efd" />
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.field}>
            <div className={styles.label}>CNPJ</div>
            <div className={styles.cnpjShell}>
              <Search size={16} color="#345070" />
              <input className={styles.cnpjInput} value={initialCnpj} readOnly />
            </div>
            <div className={styles.cnpjHelperSpacer} />
          </div>

          <div className={styles.twoColsRow}>
            <div className={`${styles.flex1} ${styles.nameBlock}`}>
              <div className={styles.nameTitle}>{initialCompanyName}</div>
              <div className={styles.nameSub}>{initialCompanyCnpj}</div>
            </div>

            <div className={`${styles.flex1} ${styles.field}`}>
              <div className={styles.label}>Número de acessos</div>
              <input
                ref={accessesInputRef}
                className={styles.input}
                inputMode="numeric"
                value={String(accesses)}
                onChange={(e) => {
                  const next = Number(e.target.value.replace(/[^\d]/g, ""));
                  setAccesses(Number.isFinite(next) ? next : 0);
                }}
              />
            </div>
          </div>

          <div className={styles.field}>
            <div className={styles.label}>Valor por pessoa</div>
            <input
              className={styles.input}
              value={valuePerPerson}
              onChange={(e) => setValuePerPerson(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.footer}>
          <button type="button" className={styles.cancelButton} onClick={onClose}>
            CANCELAR
          </button>

          <button
            type="button"
            className={styles.saveButton}
            onClick={() => {
              // Mock - plugar ação real depois
              onClose();
            }}
          >
            <span className={styles.saveText}>SALVAR ALTERAÇÕES</span>
            <CheckCircle size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

