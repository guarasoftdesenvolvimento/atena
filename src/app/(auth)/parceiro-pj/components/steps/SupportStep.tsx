import { ArrowLeft, CircleHelp, Phone } from "lucide-react";
import { supportIllustrationSrc, uiText } from "../../data";
import styles from "../../parceiro-pj.module.css";

interface SupportStepProps {
  onBack: () => void;
}

export default function SupportStep({ onBack }: SupportStepProps) {
  return (
    <div className={`${styles.content} ${styles.homeContent} ${styles.supportContent}`}>
      <header className={styles.contractsTopBar}>
        <button
          type="button"
          className={styles.contractsBackButton}
          aria-label="Voltar para Home"
          onClick={onBack}
        >
          <ArrowLeft size={24} strokeWidth={2.2} />
        </button>
        <h1 className={styles.contractsHeading}>{uiText.support}</h1>
      </header>

      <section className={styles.supportCard}>
        <header className={styles.supportHeader}>
          <span className={styles.supportHeaderIcon}>
            <CircleHelp size={24} strokeWidth={2.1} />
          </span>
          <h2>{uiText.needHelp}</h2>
        </header>

        <div className={styles.supportPanel}>
          <p className={styles.supportPanelHeading}>{uiText.contactChannels}</p>

          <div className={styles.supportInfoGroup}>
            <span>{uiText.phoneLabel}</span>
            <strong>{uiText.supportPhone}</strong>
          </div>

          <div className={styles.supportInfoGroup}>
            <span>{uiText.email}</span>
            <strong>{uiText.supportEmail}</strong>
          </div>

          <button type="button" className={styles.supportWhatsappButton}>
            <Phone size={18} strokeWidth={2.2} />
            {uiText.callWhatsapp}
          </button>
        </div>

        <div className={styles.supportIllustrationWrap}>
          <img src={supportIllustrationSrc} alt="" className={styles.supportIllustration} />
        </div>
      </section>
    </div>
  );
}
