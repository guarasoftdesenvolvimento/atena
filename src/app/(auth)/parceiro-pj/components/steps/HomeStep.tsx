import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { careCardImages, quickAccessItems, uiText } from "../../data";
import styles from "../../parceiro-pj.module.css";

interface HomeStepProps {
  logoIconSrc: string;
  onQuickAccessClick: (itemId: (typeof quickAccessItems)[number]["id"]) => void;
}

export default function HomeStep({ logoIconSrc, onQuickAccessClick }: HomeStepProps) {
  return (
    <div className={`${styles.content} ${styles.homeContent}`}>
      <header className={styles.homeTopBar}>
        <div className={styles.brandRow}>
          <div className={styles.brandIcon}>
            <Image src={logoIconSrc} alt="" width={26} height={26} style={{ width: "100%", height: "100%" }} />
          </div>
          <div className={styles.brandWordmark}>Atena</div>
        </div>
        <p className={styles.homeGreeting}>{uiText.hello}</p>
      </header>

      <section className={styles.quickAccessCard}>
        <h2 className={styles.quickAccessTitle}>{uiText.quickAccessTitle}</h2>
        <div className={styles.quickAccessGrid}>
          {quickAccessItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                className={styles.quickAccessItem}
                onClick={() => onQuickAccessClick(item.id)}
              >
                <span className={styles.quickAccessIconWrap}>
                  <span className={styles.quickAccessIconInner}>
                    <Icon size={16} strokeWidth={2.1} />
                  </span>
                </span>
                <span className={styles.quickAccessLabel}>{item.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className={styles.nfCtaSection}>
        <h2 className={styles.nfCtaTitle}>Precisando emitir uma nota fiscal?</h2>
        <button type="button" className={styles.nfCtaButton}>
          Emitir NF agora
          <ChevronRight size={20} strokeWidth={2.2} />
        </button>
      </section>

      <section className={styles.careSection}>
        <h2 className={styles.careTitle}>{uiText.careTitle}</h2>

        <article className={styles.careItem}>
          <img className={styles.careImage} src={careCardImages.telemedicina} alt="" />
          <div className={styles.careCopy}>
            <div className={styles.careHeaderRow}>
              <h3 className={styles.careItemTitle}>Telemedicina 24horas</h3>
              <ChevronRight size={16} strokeWidth={2.4} className={styles.careArrow} />
            </div>
            <p className={styles.careItemText}>Tenha acesso a especialidades 24horas/ 7 dias por semana.</p>
          </div>
        </article>

        <article className={styles.careItem}>
          <img className={styles.careImage} src={careCardImages.club} alt="" />
          <div className={styles.careCopy}>
            <div className={styles.careHeaderRow}>
              <h3 className={styles.careItemTitle}>Club de Vantagens</h3>
              <ChevronRight size={16} strokeWidth={2.4} className={styles.careArrow} />
            </div>
            <p className={styles.careItemText}>{uiText.careClubText}</p>
          </div>
        </article>
      </section>
    </div>
  );
}
