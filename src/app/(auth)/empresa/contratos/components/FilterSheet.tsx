import React from "react";
import { ListFilter } from "lucide-react";
import styles from "../contratos.module.css";

interface FilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FilterSheet({ isOpen, onClose }: FilterSheetProps) {
  const [statusFilter, setStatusFilter] = React.useState("todos");
  const [categoryFilter, setCategoryFilter] = React.useState("todos");
  const [startDate, setStartDate] = React.useState("2025-01-01");
  const [endDate, setEndDate] = React.useState("2025-02-02");

  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleClear = () => {
    setStatusFilter("todos");
    setCategoryFilter("todos");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`} onClick={onClose}>
      <div
        className={`${styles.sheet} ${isOpen ? styles.sheetVisible : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Filtros de contratos"
        onClick={e => e.stopPropagation()}
      >
        <div className={styles.sheetHeader}>
          <h2 className={styles.sheetTitle}>Filtros:</h2>
        </div>

        <div className={styles.sheetBody}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Filtrar por status</label>
            <select
              className={`${styles.inputField} ${styles.selectControl}`}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="todos">Todos</option>
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Filtrar por categoria</label>
            <select
              className={`${styles.inputField} ${styles.selectControl}`}
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="todos">Todos</option>
              <option value="categoria-1">Categoria 1</option>
              <option value="categoria-2">Categoria 2</option>
              <option value="categoria-3">Categoria 3</option>
              <option value="categoria-4">Categoria 4</option>
              <option value="categoria-5">Categoria 5</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Filtrar por data</label>
            <div className={styles.dateRangeRow}>
              <div style={{ flex: 1 }}>
                <span className={styles.filterLabel} style={{ marginBottom: 4, display: 'block', color: '#8f9092' }}>De</span>
                <input
                  type="date"
                  className={styles.dateInput}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div style={{ flex: 1 }}>
                <span className={styles.filterLabel} style={{ marginBottom: 4, display: 'block', color: '#8f9092' }}>Até</span>
                <input
                  type="date"
                  className={styles.dateInput}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.sheetFooter}>
          <button
            className={styles.clearButton}
            onClick={() => {
              handleClear();
              onClose();
            }}
          >
            LIMPAR
          </button>
          <button className={styles.applyButton} onClick={onClose}>
            <ListFilter size={20} />
            APLICAR FILTRO
          </button>
        </div>
      </div>
    </div>
  );
}
