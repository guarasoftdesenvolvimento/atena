import React from "react";
import { CheckCircle2, FolderSearch, X } from "lucide-react";
import styles from "../../../detalhes.module.css";

export default function EditContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
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
        aria-label="Editar dados de contato"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.editModalHeader}>
          <div className={styles.headerTitleGroup}>
            <FolderSearch size={24} className="text-[#345070]" />
            <h2 className={styles.modalSectionTitle}>Editar dados de contato</h2>
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
            <label className={styles.inputLabel}>Nome completo do responsável</label>
            <input 
              className={`${styles.modalInput} ${styles.modalInputActive}`} 
              type="text" 
              defaultValue="Felipe Alves dos Santos" 
            />
          </div>
          <div className={styles.inputFieldGroup}>
            <label className={styles.inputLabel}>WhatsApp</label>
            <input 
              className={styles.modalInput} 
              type="text" 
              defaultValue="47 99999-9999" 
            />
          </div>
          <div className={styles.inputFieldGroup}>
            <label className={styles.inputLabel}>E-mail</label>
            <input 
              className={styles.modalInput} 
              type="text" 
              defaultValue="contato@kalisoft.tech" 
            />
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
