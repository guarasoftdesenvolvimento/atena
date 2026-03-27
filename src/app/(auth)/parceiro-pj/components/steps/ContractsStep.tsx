import {
  ArrowLeft,
  CalendarDays,
  CircleDollarSign,
  ClipboardCheck,
} from "lucide-react";
import { contractItems, contractStatusById, uiText } from "../../data";
import styles from "../../parceiro-pj.module.css";
import type { ContractStatus } from "../../types";

const contractStatusClassById: Record<ContractStatus, string> = {
  active: styles.contractStatusActive,
  waiting_signature: styles.contractStatusWaitingSignature,
  expired: styles.contractStatusExpired,
};

interface ContractsStepProps {
  onBack: () => void;
  onContractCardClick: (contractCode: string) => void;
}

export default function ContractsStep({ onBack, onContractCardClick }: ContractsStepProps) {
  return (
    <div className={`${styles.content} ${styles.homeContent} ${styles.contractsContent}`}>
      <header className={styles.contractsTopBar}>
        <button
          type="button"
          className={styles.contractsBackButton}
          aria-label="Voltar para Home"
          onClick={onBack}
        >
          <ArrowLeft size={24} strokeWidth={2.2} />
        </button>
        <h1 className={styles.contractsHeading}>{uiText.contracts}</h1>
      </header>

      <section className={styles.contractsList}>
        {contractItems.map((contract) => (
          <article key={contract.code} className={styles.contractCard}>
            <button
              type="button"
              className={styles.contractCardAction}
              onClick={() => onContractCardClick(contract.detailCode)}
            >
              <div className={styles.contractCardHeader}>
                <h2 className={styles.contractCardTitle}>
                  Contrato <span>#{contract.code}</span>
                </h2>
              </div>

              <div className={styles.contractCardBody}>
                <p className={styles.contractType}>{contract.title}</p>

                <span
                  className={`${styles.contractStatusChip} ${contractStatusClassById[contract.status]}`}
                >
                  {contractStatusById[contract.status]}
                </span>

                <div className={styles.contractDivider} />

                <div className={styles.contractDatesRow}>
                  <div className={styles.contractDateItem}>
                    <span className={styles.contractDateLabel}>
                      <CalendarDays size={12} strokeWidth={2.2} />
                      {uiText.start}
                    </span>
                    <strong className={styles.contractDateValue}>{contract.startDate}</strong>
                  </div>

                  <div className={styles.contractDateItem}>
                    <span className={styles.contractDateLabel}>
                      <CalendarDays size={12} strokeWidth={2.2} />
                      {uiText.end}
                    </span>
                    <strong className={styles.contractDateValue}>{contract.endDate}</strong>
                  </div>
                </div>

                <div className={styles.contractAmountRow}>
                  <span className={styles.contractAmountLabel}>
                    <CircleDollarSign size={12} strokeWidth={2.1} />
                    {uiText.value}
                  </span>
                  <strong className={styles.contractAmountValue}>{contract.amount}</strong>
                </div>

                <div className={styles.contractDivider} />

                {contract.signedAt ? (
                  <p className={styles.contractSigned}>
                    <ClipboardCheck size={12} strokeWidth={2.2} />
                    <span>{uiText.signed}</span>
                    <strong>{contract.signedAt}</strong>
                  </p>
                ) : (
                  <p className={styles.contractPending}>
                    <ClipboardCheck size={12} strokeWidth={2.2} />
                    {uiText.waiting}
                  </p>
                )}
              </div>
            </button>
          </article>
        ))}
      </section>
    </div>
  );
}
