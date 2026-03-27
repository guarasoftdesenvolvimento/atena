import React from "react";
import { Copy, Lock, Shield, X } from "lucide-react";
import { REMESSA_PIX_KEY, REMESSA_QR_CODE_IMAGE_URL } from "../../constants";
import styles from "../../notas-fiscais.module.css";
import type { CreatedRemessa } from "../../types";
import { formatBRL, formatDateForDisplay } from "../../utils/formatters";

export default function RemessaPaymentModal({
  remessa,
  onClose,
}: {
  remessa: CreatedRemessa | null;
  onClose: () => void;
}) {
  const [copied, setCopied] = React.useState(false);
  const copiedTimeoutRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (!remessa) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [remessa, onClose]);

  React.useEffect(() => {
    return () => {
      if (copiedTimeoutRef.current) {
        window.clearTimeout(copiedTimeoutRef.current);
      }
    };
  }, []);

  React.useEffect(() => {
    if (!remessa) {
      setCopied(false);
      if (copiedTimeoutRef.current) {
        window.clearTimeout(copiedTimeoutRef.current);
        copiedTimeoutRef.current = null;
      }
    }
  }, [remessa]);

  if (!remessa) return null;

  async function handleCopyPixKey() {
    try {
      await navigator.clipboard.writeText(REMESSA_PIX_KEY);
      setCopied(true);
      if (copiedTimeoutRef.current) {
        window.clearTimeout(copiedTimeoutRef.current);
      }
      copiedTimeoutRef.current = window.setTimeout(() => {
        setCopied(false);
        copiedTimeoutRef.current = null;
      }, 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={styles.remessaPaymentOverlay} onClick={onClose}>
      <div
        className={styles.remessaPaymentModal}
        role="dialog"
        aria-modal="true"
        aria-label={`Pagamento da remessa ${remessa.id}`}
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className={styles.remessaPaymentCloseButton} onClick={onClose}>
          <X size={16} color="#7c8efd" />
        </button>

        <div className={styles.remessaPaymentHeader}>
          <div className={styles.remessaPaymentBrand}>
            <div className={styles.remessaPaymentBrandIcon}>
              <Shield size={16} color="#ffffff" />
            </div>
            <span className={styles.remessaPaymentBrandText}>SeuPJ</span>
          </div>
          <div className={styles.remessaPaymentCompany}>
            <span className={styles.remessaPaymentCompanyName}>GuaraSoft</span>
            <span className={styles.remessaPaymentCompanyDoc}>40.222.222/0001-00</span>
          </div>
        </div>

        <div className={styles.remessaPaymentTitleRow}>
          <h3 className={styles.remessaPaymentTitle}>Remessa {remessa.id}</h3>
          <span className={styles.remessaPaymentStatus}>A pagar</span>
        </div>

        <div className={styles.remessaPaymentSummaryCard}>
          <div className={styles.remessaPaymentSummaryTopRow}>
            <div>
              <p className={styles.remessaPaymentSummaryLabel}>Valor total</p>
              <p className={styles.remessaPaymentSummaryValue}>{formatBRL(remessa.valorTotal)}</p>
            </div>
            <div className={styles.remessaPaymentSummaryRight}>
              <p className={styles.remessaPaymentSummaryLabel}>Vencimento</p>
              <p className={styles.remessaPaymentSummaryValue}>
                {formatDateForDisplay(remessa.dataVencimento)}
              </p>
            </div>
          </div>
          <div className={styles.remessaPaymentDivider} />
          <div>
            <p className={styles.remessaPaymentSummaryLabel}>Descricao</p>
            <p className={styles.remessaPaymentSummaryValue}>{remessa.descricao}</p>
          </div>
        </div>

        <div className={styles.remessaPaymentTableCard}>
          <div className={styles.remessaPaymentTableHeader}>
            <span>Nome</span>
            <span>Nº da NF</span>
            <span>Valor</span>
          </div>
          {remessa.invoices.map((invoice) => (
            <div key={invoice.id} className={styles.remessaPaymentTableRow}>
              <span className={styles.remessaPaymentTableName}>{invoice.nome}</span>
              <span>{invoice.numero}</span>
              <span>{formatBRL(5000)}</span>
            </div>
          ))}
          <button type="button" className={styles.remessaPaymentLoadMoreButton}>
            Carregar mais
          </button>
        </div>

        <div className={styles.remessaPaymentPixCard}>
          <p className={styles.remessaPaymentPixTitle}>Escaneie o QR code abaixo ou copie a chave abaixo</p>
          <div className={styles.remessaPaymentPixKeyRow}>
            <div className={styles.remessaPaymentPixKeyValue}>{REMESSA_PIX_KEY}</div>
            <button type="button" className={styles.remessaPaymentPixCopyButton} onClick={handleCopyPixKey}>
              <Copy size={16} />
              {copied ? "Copiado!" : "Copiar chave"}
            </button>
          </div>
          <div className={styles.remessaPaymentDivider} />
          <img src={REMESSA_QR_CODE_IMAGE_URL} alt="QR code da remessa" className={styles.remessaPaymentQrCode} />
        </div>

        <div className={styles.remessaPaymentSecurity}>
          <div className={styles.remessaPaymentSecurityTitle}>
            <Lock size={16} color="#5352ed" />
            <span>Plataforma segura.</span>
          </div>
          <p className={styles.remessaPaymentSecuritySubtitle}>
            Voce paga com confianca e seu parceiro PJ recebe com agilidade.
          </p>
        </div>
      </div>
    </div>
  );
}
