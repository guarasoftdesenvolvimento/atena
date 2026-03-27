import React from "react";
import { Lock } from "lucide-react";
import styles from "../../notas-fiscais.module.css";

export default function RemessaInfoModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
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
    <div className={styles.remessaInfoOverlay} onClick={onClose}>
      <div
        className={styles.remessaInfoModal}
        role="dialog"
        aria-modal="true"
        aria-label="Informações sobre remessa de pagamento"
        onClick={(event) => event.stopPropagation()}
      >
        <h3 className={styles.remessaInfoTitle}>{"O que é uma Remessa de pagamento?"}</h3>
        <p className={styles.remessaInfoText}>
          {"Use essa funcionalidade para pagar vários parceiros PJ de uma vez só, com controle, automação e sem erro manual."}
        </p>

        <p className={styles.remessaInfoSubtitle}>Como funciona:</p>
        <ol className={styles.remessaSteps}>
          <li className={styles.remessaStepItem}>
            <span className={styles.remessaStepBadge}>1</span>
            <span>{"Você seleciona todas as notas fiscais que deseja pagar."}</span>
          </li>
          <li className={styles.remessaStepItem}>
            <span className={styles.remessaStepBadge}>2</span>
            <span>{"Define um nome e data de vencimento para essa remessa."}</span>
          </li>
          <li className={styles.remessaStepItem}>
            <span className={styles.remessaStepBadge}>3</span>
            <span>{"O sistema gera um único boleto ou QR PIX com o valor total:"}</span>
          </li>
        </ol>

        <ul className={styles.remessaSubList}>
          <li>{"Envia o valor para cada parceiro conforme sua NF (split automático)."}</li>
          <li>Anexa os comprovantes automaticamente.</li>
          <li>{"Atualiza o status de todas as NFs como 'Pagas'."}</li>
        </ul>

        <div className={styles.remessaLockLine}>
          <Lock size={14} color="#c9a800" />
          <span>{"Tudo isso com rastreabilidade e sem trabalho manual."}</span>
        </div>

        <button type="button" className={styles.remessaContinueButton} onClick={onClose}>
          Continuar
        </button>
      </div>
    </div>
  );
}
