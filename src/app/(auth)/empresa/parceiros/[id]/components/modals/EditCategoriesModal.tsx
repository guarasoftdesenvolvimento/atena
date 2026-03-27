import React from "react";
import { Bookmark, CheckCircle2, ChevronDown, X } from "lucide-react";
import styles from "../../../detalhes.module.css";

export default function EditCategoriesModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
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
        aria-label="Editar categorias"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.editModalHeader}>
          <div className={styles.headerTitleGroup}>
            <Bookmark size={24} className="text-[#345070]" />
            <h2 className={styles.modalSectionTitle}>Mudar categoria</h2>
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
            <label className={styles.inputLabel}>Nome da categoria</label>
            <div className={styles.selectionInput}>
              <div className={styles.selectionPills}>
                <div className={`${styles.selectionPill} ${styles.pillOrange}`}>
                  Freelancer
                  <div className={styles.selectionPillX}><X size={10} /></div>
                </div>
                <div className={`${styles.selectionPill} ${styles.pillPurple}`}>
                  Front-end
                  <div className={styles.selectionPillX}><X size={10} /></div>
                </div>
                <div className={`${styles.selectionPill} ${styles.pillRed}`}>
                  Time de Design
                  <div className={styles.selectionPillX}><X size={10} /></div>
                </div>
              </div>
              <ChevronDown size={20} className="text-[#345070]" />
            </div>
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
