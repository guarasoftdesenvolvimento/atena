import React from "react";
import styles from "../backoffice.module.css";

export default function AfiliadosBackofficePage() {
  return (
    <>
      <div className={styles.topHeader}>
        <div className={styles.topTitle}>Afiliados</div>
        <div className={styles.userBadge}>
          <div className={styles.userName}>Olá Daniel</div>
        </div>
      </div>

      <div className={styles.contentBg}>
        <div className={styles.contentCard}>
          <div className={styles.contentHeader}>
            <div className={styles.contentHeaderTitle}>Afiliados</div>
          </div>
          <div style={{ fontSize: 14, color: "var(--atena-text-muted)" }}>
            Em breve.
          </div>
        </div>
      </div>
    </>
  );
}

