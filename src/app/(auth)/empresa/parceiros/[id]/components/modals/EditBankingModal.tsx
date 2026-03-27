import React from "react";
import { CheckCircle2, Wallet, X } from "lucide-react";
import styles from "../../../detalhes.module.css";

export default function EditBankingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
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

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContent}
        role="dialog"
        aria-modal="true"
        aria-label="Editar dados bancários"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.editModalHeader}>
          <div className={styles.headerTitleGroup}>
            <Wallet size={24} className="text-[#345070]" />
            <h2 className={styles.modalSectionTitle}>Editar dados bancÃ¡rios</h2>
          </div>
          <div
            className={styles.closeContainer}
            role="button"
            tabIndex={0}
            aria-label="Fechar modal"
            onClick={onClose}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onClose();
              }
            }}
          >
            <X size={16} />
          </div>
        </div>

        <div className={styles.editModalBody}>
          <div className={styles.inputFieldGroup}>
            <label className={styles.inputLabel}>Chave Pix tipo (CNPJ)</label>
            <input
              className={`${styles.modalInput} ${styles.modalInputActive}`}
              type="text"
              defaultValue="38.300.972/0001-11"
            />
            <p className={styles.infoLabel} style={{ marginTop: 4 }}>
              Chave do tipo <strong>CNPJ Ã© obrigatÃ³rio para seguranÃ§a jurÃ­dica.</strong>
            </p>
          </div>
        </div>

        <div className={styles.editModalFooter}>
          <button type="button" className={styles.btnCancel} onClick={onClose}>
            CANCELAR
          </button>
          <button type="button" className={styles.btnSave}>
            <CheckCircle2 size={20} />
            SALVAR
          </button>
        </div>
      </div>
    </div>
  );
}
