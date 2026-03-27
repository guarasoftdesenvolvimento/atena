import React from "react";
import { ListFilter } from "lucide-react";
import { FILTER_CATEGORY_OPTIONS, FILTER_STATUS_OPTIONS } from "../../constants";
import styles from "../../notas-fiscais.module.css";
import FilterDatePicker from "./FilterDatePicker";
import FilterSelect from "./FilterSelect";

export default function FilterSheet({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [visaoStatus, setVisaoStatus] = React.useState("todos");
  const [visaoCategoria, setVisaoCategoria] = React.useState("todos");
  const [visaoDataDe, setVisaoDataDe] = React.useState("2025-01-01");
  const [visaoDataAte, setVisaoDataAte] = React.useState("2025-02-02");

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

  function handleClear() {
    setVisaoStatus("todos");
    setVisaoCategoria("todos");
    setVisaoDataDe("2025-01-01");
    setVisaoDataAte("2025-02-02");
  }

  return (
    <div className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ""}`} onClick={onClose}>
      <div
        className={`${styles.sheet} ${isOpen ? styles.sheetVisible : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Filtros de notas fiscais"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.sheetHeader}>
          <h2 className={styles.sheetTitle}>Filtros:</h2>
        </div>

        <div className={styles.sheetBody}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Filtrar por status</label>
            <FilterSelect
              value={visaoStatus}
              options={FILTER_STATUS_OPTIONS}
              onChange={setVisaoStatus}
            />
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Filtrar por categoria</label>
            <FilterSelect
              value={visaoCategoria}
              options={FILTER_CATEGORY_OPTIONS}
              onChange={setVisaoCategoria}
            />
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Filtrar por data</label>
            <div className={styles.dateRangeRow}>
              <div style={{ flex: 1 }}>
                <span className={styles.dateInputLabel}>De</span>
                <FilterDatePicker value={visaoDataDe} onChange={setVisaoDataDe} />
              </div>
              <div style={{ flex: 1 }}>
                <span className={styles.dateInputLabel}>{"Até"}</span>
                <FilterDatePicker value={visaoDataAte} onChange={setVisaoDataAte} />
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
