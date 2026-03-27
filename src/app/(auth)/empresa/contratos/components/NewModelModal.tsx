import React from "react";
import { ChevronRight, FilePlus, Folder, X } from "lucide-react";
import styles from "../contratos.module.css";

interface NewModelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: (type: "CONTRATO" | "ADITIVO") => void;
}

export default function NewModelModal({ isOpen, onClose, onNext }: NewModelModalProps) {
  const [selectedModel, setSelectedModel] = React.useState<"CONTRATO" | "ADITIVO">("CONTRATO");

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
    <div className={`${styles.modalOverlay} ${isOpen ? styles.modalOverlayVisible : ''}`} onClick={onClose}>
      <div
        className={styles.modalContainer}
        role="dialog"
        aria-modal="true"
        aria-label="Novo modelo de contrato"
        onClick={e => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <div className={styles.modalTitleGroup}>
            <Folder size={24} color="#345070" />
            <h2 className={styles.modalTitle}>Novo modelo de contrato</h2>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.modalBody}>
          <p className={styles.modalSubtitle}>Qual modelo você quer criar?</p>
          <div className={styles.selectionBoxes}>
            <div
              className={`${styles.selectionBox} ${selectedModel === "CONTRATO" ? styles.selectionBoxActive : ''}`}
              onClick={() => setSelectedModel("CONTRATO")}
            >
              <div className={styles.boxIcon}>
                <Folder size={20} />
              </div>
              <span className={styles.boxLabel}>Modelo de contrato</span>
            </div>
            <div
              className={`${styles.selectionBox} ${selectedModel === "ADITIVO" ? styles.selectionBoxActive : ''}`}
              onClick={() => setSelectedModel("ADITIVO")}
            >
              <div className={styles.boxIcon}>
                <FilePlus size={20} />
              </div>
              <span className={styles.boxLabel}>Modelo de termo aditivo</span>
            </div>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.cancelButton} onClick={onClose}>
            CANCELAR
          </button>
          <button className={styles.nextButton} onClick={() => onNext(selectedModel)}>
            PRÓXIMO <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
