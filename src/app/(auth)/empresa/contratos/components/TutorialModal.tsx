import React from "react";
import { CheckSquare, Info, PlayCircle, Square, X } from "lucide-react";
import styles from "../contratos.module.css";

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWatch: () => void;
}

export default function TutorialModal({ isOpen, onClose, onWatch }: TutorialModalProps) {
  const [dontShowAgain, setDontShowAgain] = React.useState(false);

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
        aria-label="Tutorial de criação de modelo"
        style={{ width: 440 }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ position: 'relative' }}>
          <button
            className={styles.closeButton}
            onClick={onClose}
            style={{ position: 'absolute', top: 16, right: 16, backgroundColor: '#dfe8ff', color: '#527ca5' }}
          >
            <X size={20} />
          </button>

          <div className={styles.tutorialContent}>
            <div className={styles.tutorialVideoBox}>
              <PlayCircle size={64} className={styles.tutorialVideoIcon} />
            </div>

            <div className={styles.tutorialTextGroup}>
              <div className={styles.tutorialBlock}>
                <h3 className={styles.tutorialMainTitle}>Antes de começar...</h3>
                <p className={styles.tutorialDesc}>
                  Para criar um modelo de contrato funcional, é importante entender como as variáveis funcionam.<br />
                  <span className={styles.tutorialDescBold}>Preparamos um vídeo rápido mostrando o passo a passo.</span>
                </p>
              </div>

              <div className={styles.tutorialBlock}>
                <h4 className={styles.tutorialSubtitle}>O que você vai aprender:</h4>
                <ul className={styles.tutorialList}>
                  <li>Como usar variáveis no texto do contrato</li>
                  <li>Como garantir que os dados sejam preenchidos automaticamente</li>
                  <li>Como estruturar seu modelo sem erros</li>
                </ul>
              </div>

              <div className={styles.tutorialInfoRow}>
                <Info size={16} color="#5c5e60" />
                <p className={styles.tutorialInfoText}>O editor será habilitado após assistir ao tutorial.</p>
              </div>
            </div>

            <div className={styles.tutorialActionGroup}>
              <button className={styles.tutorialWatchButton} onClick={onWatch}>
                <PlayCircle size={20} color="#ffffff" />
                <span className={styles.tutorialWatchText}>ASSISTIR TUTORIAL</span>
              </button>

              <div className={styles.dontShowRow} onClick={() => setDontShowAgain(!dontShowAgain)}>
                {dontShowAgain ? <CheckSquare size={16} color="#5352ed" /> : <Square size={16} color="#5352ed" />}
                <span className={styles.dontShowText}>Não mostrar isso novamente.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
