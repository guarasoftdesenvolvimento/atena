import { Filter, Search } from "lucide-react";
import styles from "../../notas-fiscais.module.css";
import type { Invoice } from "../../types";
import InvoicesTable from "../table/InvoicesTable";

export default function InvoicesSection({
  invoices,
  onOpenFilter,
  onSelectInvoice,
}: {
  invoices: Invoice[];
  onOpenFilter: () => void;
  onSelectInvoice: (invoice: Invoice) => void;
}) {
  return (
    <div className={styles.mainCard}>
      <div className={styles.sectionHeader}>
        <span className={styles.registrosText}>{invoices.length} Notas fiscais</span>
        <div style={{ display: "flex", gap: 12 }}>
          <div className={styles.searchBox}>
            <Search size={16} color="#c1c1c1" />
            <input className={styles.searchInput} placeholder="Pesquise pelo parceiro ou número" />
          </div>
          <button className={styles.filterButton} onClick={onOpenFilter}>
            <Filter size={20} color="#5352ed" />
            <span>FILTROS</span>
          </button>
        </div>
      </div>

      <InvoicesTable invoices={invoices} onSelectInvoice={onSelectInvoice} />
    </div>
  );
}
