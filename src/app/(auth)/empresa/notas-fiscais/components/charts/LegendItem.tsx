import styles from "../../notas-fiscais.module.css";

export default function LegendItem({
  color,
  label,
  value,
}: {
  color: string;
  label: string;
  value?: string;
}) {
  return (
    <div className={styles.legendItem}>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <div className={styles.legendDot} style={{ backgroundColor: color }} />
        <span className={styles.legendLabel}>{label}</span>
      </div>
      {value ? <span className={styles.legendValue}>{value}</span> : null}
    </div>
  );
}
