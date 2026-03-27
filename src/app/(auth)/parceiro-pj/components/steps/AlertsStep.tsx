import { ArrowLeft, CalendarDays } from "lucide-react";
import { notificationItems, uiText } from "../../data";
import styles from "../../parceiro-pj.module.css";

interface AlertsStepProps {
  onBack: () => void;
}

export default function AlertsStep({ onBack }: AlertsStepProps) {
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
        <h1 className={styles.contractsHeading}>{uiText.notifications}</h1>
      </header>

      <section className={styles.notificationsList}>
        {notificationItems.map((notification) => (
          <article key={notification.id} className={styles.notificationCard}>
            <h2>{notification.title}</h2>
            <p>{notification.message}</p>
            <span>
              <CalendarDays size={12} strokeWidth={2.2} />
              {notification.timestamp}
            </span>
          </article>
        ))}
      </section>
    </div>
  );
}
