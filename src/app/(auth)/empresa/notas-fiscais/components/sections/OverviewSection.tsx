import { Filter, Info } from "lucide-react";
import { BAR_DATA, DONUT_DATA, STATUS_COLORS, STATUS_LABELS } from "../../constants";
import styles from "../../notas-fiscais.module.css";
import type { SummaryCard } from "../../types";
import BarChart from "../charts/BarChart";
import DonutChart from "../charts/DonutChart";
import LegendItem from "../charts/LegendItem";

export default function OverviewSection({
  summaryCards,
  onOpenFilter,
}: {
  summaryCards: SummaryCard[];
  onOpenFilter: () => void;
}) {
  return (
    <div className={styles.mainCard}>
      <div className={styles.sectionHeader}>
        <span className={styles.registrosText}>57 REGISTROS</span>
        <button className={styles.filterButton} onClick={onOpenFilter}>
          <Filter size={20} color="#5352ed" />
          <span>FILTROS</span>
        </button>
      </div>

      <div className={styles.summaryRow}>
        {summaryCards.map((card) => (
          <div key={card.label} className={styles.summaryCard}>
            <p className={styles.summaryCardLabel}>{card.label}</p>
            <p className={styles.summaryCardValue}>{card.value}</p>
          </div>
        ))}
      </div>

      <div className={styles.chartsRow}>
        <div className={styles.chartCard}>
          <div className={styles.chartCardHeader}>
            <span className={styles.chartCardTitle}>Porcentagem por categoria</span>
            <Info size={16} color="#8f9092" />
          </div>
          <div className={styles.donutRow}>
            <DonutChart data={DONUT_DATA} />
            <div className={styles.donutLegend}>
              {DONUT_DATA.map((seg) => (
                <LegendItem
                  key={seg.key}
                  color={STATUS_COLORS[seg.key]}
                  label={STATUS_LABELS[seg.key]}
                  value={`${seg.pct}%`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className={styles.chartCard}>
          <div className={styles.chartCardHeader}>
            <span className={styles.chartCardTitle}>Total por categoria</span>
          </div>
          <div style={{ padding: "8px 12px 4px" }}>
            <BarChart data={BAR_DATA} />
          </div>
          <div className={styles.barLegend}>
            {(Object.entries(STATUS_LABELS) as Array<[keyof typeof STATUS_LABELS, string]>).map(
              ([key, label], index) => (
                <div key={key} className={styles.barLegendItem}>
                  <div className={styles.legendDot} style={{ backgroundColor: STATUS_COLORS[key] }} />
                  <span className={styles.legendLabel}>{`${index + 1} – ${label}`}</span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
