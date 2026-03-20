import React from "react";
import styles from "./AuthPageShell.module.css";

type AuthPageShellProps = {
  brand: React.ReactNode;
  footer?: React.ReactNode;
  rightIllustrationSrc?: string;
  mobileStatusBar?: React.ReactNode;
  card: React.ReactNode;
};

export default function AuthPageShell({
  brand,
  footer,
  rightIllustrationSrc,
  mobileStatusBar,
  card,
}: AuthPageShellProps) {
  return (
    <div className={styles.outer}>
      <div className={styles.leftPane}>
        {mobileStatusBar ? (
          <div className={styles.mobileStatusBar}>{mobileStatusBar}</div>
        ) : null}
        <div className={styles.brandArea}>{brand}</div>
        <div className={styles.cardWrap}>{card}</div>
        {footer ? <div className={styles.footerArea}>{footer}</div> : null}
      </div>

      {rightIllustrationSrc ? (
        <aside className={styles.rightPane} aria-hidden="true">
          <img
            className={styles.rightImage}
            src={rightIllustrationSrc}
            alt=""
          />
          <div className={styles.rightOverlay} />
        </aside>
      ) : null}
    </div>
  );
}

