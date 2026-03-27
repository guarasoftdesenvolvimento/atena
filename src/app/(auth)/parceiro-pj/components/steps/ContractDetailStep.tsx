import {
  ArrowLeft,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  ClipboardList,
  CloudDownload,
  ExternalLink,
  NotebookText,
} from "lucide-react";
import {
  contractAddenda,
  contractStatusById,
  contractSigners,
  signatureStatusLabelById,
  uiText,
} from "../../data";
import styles from "../../parceiro-pj.module.css";
import type { ContractItem, ContractStatus, SignatureStatus } from "../../types";

const contractStatusClassById: Record<ContractStatus, string> = {
  active: styles.contractStatusActive,
  waiting_signature: styles.contractStatusWaitingSignature,
  expired: styles.contractStatusExpired,
};

const signatureStatusClassById: Record<SignatureStatus, string> = {
  signed: styles.signatureStatusSigned,
  pending: styles.signatureStatusPending,
};

interface ContractDetailStepProps {
  selectedContract: ContractItem;
  openAddendaIndexes: number[];
  onBack: () => void;
  onToggleAddendum: (index: number) => void;
}

export default function ContractDetailStep({
  selectedContract,
  openAddendaIndexes,
  onBack,
  onToggleAddendum,
}: ContractDetailStepProps) {
  const renderSignatureList = () => (
    <div className={styles.signatureList}>
      {contractSigners.map((signer) => (
        <article key={`${signer.name}-${signer.email}`} className={styles.signatureItem}>
          <div className={styles.signaturePerson}>
            <strong>{signer.name}</strong>
            <span>{signer.email}</span>
          </div>
          <span
            className={`${styles.signatureStatusChip} ${signatureStatusClassById[signer.status]}`}
          >
            {signatureStatusLabelById[signer.status]}
          </span>
        </article>
      ))}
    </div>
  );

  return (
    <div className={`${styles.content} ${styles.homeContent} ${styles.contractsContent}`}>
      <header className={styles.contractsTopBar}>
        <button
          type="button"
          className={styles.contractsBackButton}
          aria-label="Voltar para contratos"
          onClick={onBack}
        >
          <ArrowLeft size={24} strokeWidth={2.2} />
        </button>
        <div className={styles.contractDetailTitleWrap}>
          <h1 className={styles.contractsHeading}>{uiText.contract}</h1>
          <span className={styles.contractBreadcrumb}>
            <ChevronRight size={16} strokeWidth={2.1} />
            #{selectedContract.detailCode}
          </span>
        </div>
      </header>

      <section className={styles.contractDetailsStack}>
        <article className={styles.detailCard}>
          <header className={styles.detailSectionHeader}>
            <span className={styles.detailSectionIcon}>
              <NotebookText size={20} strokeWidth={2.1} />
            </span>
            <h2>{uiText.contractData}</h2>
          </header>

          <div className={styles.detailBody}>
            <div className={styles.detailMetaRow}>
              <div className={styles.detailMetaBlock}>
                <span>{uiText.contractId}</span>
                <strong>
                  Contrato <em>#{selectedContract.detailCode}</em>
                </strong>
              </div>
              <div className={`${styles.detailMetaBlock} ${styles.detailMetaBlockRight}`}>
                <span>{uiText.contractStatus}</span>
                <span
                  className={`${styles.contractStatusChip} ${
                    contractStatusClassById[selectedContract.status]
                  }`}
                >
                  {contractStatusById[selectedContract.status]}
                </span>
              </div>
            </div>

            <div className={styles.detailContractTitle}>
              <span>{uiText.contract}</span>
              <strong>{selectedContract.title}</strong>
            </div>

            <div className={styles.contractDatesRow}>
              <div className={styles.contractDateItem}>
                <span className={styles.contractDateLabel}>
                  <CalendarDays size={12} strokeWidth={2.2} />
                  {uiText.start}
                </span>
                <strong className={styles.contractDateValue}>{selectedContract.startDate}</strong>
              </div>

              <div className={styles.contractDateItem}>
                <span className={styles.contractDateLabel}>
                  <CalendarDays size={12} strokeWidth={2.2} />
                  {uiText.end}
                </span>
                <strong className={styles.contractDateValue}>{selectedContract.endDate}</strong>
              </div>
            </div>
          </div>

          <div className={`${styles.contractAmountRow} ${styles.contractAmountRowDetail}`}>
            <span className={styles.contractAmountLabel}>
              <CircleDollarSign size={12} strokeWidth={2.1} />
              {uiText.value}
            </span>
            <strong className={styles.contractAmountValue}>{selectedContract.amount}</strong>
          </div>
        </article>

        <article className={styles.detailCard}>
          <header className={styles.detailSectionHeader}>
            <span className={styles.detailSectionIcon}>
              <ClipboardList size={20} strokeWidth={2.1} />
            </span>
            <h2>{uiText.contractSignatures}</h2>
          </header>

          <div className={styles.detailSubCard}>
            <div className={styles.detailDocHeader}>
              <strong>
                Contrato <em>#{selectedContract.detailCode}</em>
              </strong>
              <span>
                {uiText.sentDate} {selectedContract.sentDate}
              </span>
            </div>

            <div className={styles.detailDocActions}>
              <button type="button">
                <ExternalLink size={12} strokeWidth={2.2} />
                {uiText.viewContract}
              </button>
              <button type="button">
                <CloudDownload size={12} strokeWidth={2.2} />
                {uiText.downloadContract}
              </button>
            </div>

            <div className={styles.detailSignatureBlock}>
              <h3>{uiText.signatureStatus}</h3>
              {renderSignatureList()}
            </div>
          </div>
        </article>

        <article className={styles.detailCard}>
          <header className={styles.detailSectionHeader}>
            <span className={styles.detailSectionIcon}>
              <ClipboardList size={20} strokeWidth={2.1} />
            </span>
            <h2>{uiText.contractAddenda}</h2>
          </header>

          <div className={styles.detailAddendaList}>
            {contractAddenda.map((addendum, index) => (
              <div key={addendum.id} className={styles.detailSubCard}>
                <div className={styles.detailDocHeaderRow}>
                  <div className={styles.detailDocHeader}>
                    <strong>
                      {uiText.addendum} <em>#{addendum.code}</em>
                    </strong>
                    <span>
                      {uiText.sentDate} {addendum.sentDate}
                    </span>
                  </div>
                  <button
                    type="button"
                    className={styles.addendumToggle}
                    aria-label="Alternar detalhes do aditivo"
                    onClick={() => onToggleAddendum(index)}
                  >
                    <ChevronDown
                      size={18}
                      strokeWidth={2.2}
                      className={`${styles.addendumToggleIcon} ${
                        openAddendaIndexes.includes(index) ? styles.addendumToggleExpanded : ""
                      }`}
                    />
                  </button>
                </div>

                {openAddendaIndexes.includes(index) ? (
                  <>
                    <div className={styles.detailDocActions}>
                      <button type="button">
                        <CloudDownload size={12} strokeWidth={2.2} />
                        {uiText.downloadContract}
                      </button>
                    </div>
                    <div className={styles.detailSignatureBlock}>
                      <h3>{uiText.signatureStatus}</h3>
                      {renderSignatureList()}
                    </div>
                  </>
                ) : null}
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
