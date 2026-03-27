import { ChevronRight, Info } from "lucide-react";
import { CAT_COLORS, STATUS_BADGE_MAP } from "../../constants";
import styles from "../../notas-fiscais.module.css";
import type { Invoice } from "../../types";

function CategoryBadge({ label, cor }: { label: string; cor: string }) {
  const bg = CAT_COLORS[cor] ?? "#8f9092";
  return (
    <span className={styles.catBadge} style={{ backgroundColor: bg }}>
      {label}
    </span>
  );
}

function StatusBadge({ status }: { status: Invoice["status"] }) {
  const statusMeta = STATUS_BADGE_MAP[status];
  return (
    <span className={styles.statusBadge} style={{ backgroundColor: statusMeta.bg, color: statusMeta.color }}>
      {statusMeta.label}
    </span>
  );
}

export default function InvoicesTable({
  invoices,
  onSelectInvoice,
}: {
  invoices: Invoice[];
  onSelectInvoice: (invoice: Invoice) => void;
}) {
  return (
    <div className={styles.tableWrapper}>
      <div className={styles.tableHeader}>
        <div className={styles.thCheck}>
          <input
            type="checkbox"
            className={styles.checkbox}
            onClick={(event) => event.stopPropagation()}
          />
        </div>
        <div className={styles.thText}>Nº da NF</div>
        <div className={styles.thText}>Nome</div>
        <div className={styles.thText}>Data da emissão</div>
        <div className={styles.thText}>Categoria</div>
        <div className={styles.thText} style={{ display: "flex", alignItems: "center", gap: 4 }}>
          Status da NF
          <Info size={14} color="#8f9092" />
        </div>
        <div className={styles.thText}>Ações</div>
      </div>

      <div className={styles.tableBody}>
        {invoices.map((invoice) => {
          const visibleCategories = invoice.categorias.slice(0, 1);
          const extraCount = invoice.categorias.length - 1;

          return (
            <div
              key={invoice.id}
              className={styles.tableRow}
              onClick={() => onSelectInvoice(invoice)}
            >
              <div className={styles.tdCheck}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  onClick={(event) => event.stopPropagation()}
                />
              </div>
              <div className={styles.tdTitle}>{invoice.numero}</div>
              <div className={styles.tdName}>{invoice.nome}</div>
              <div className={styles.tdDate}>{invoice.dataEmissao}</div>
              <div className={styles.tdCats}>
                {visibleCategories.map((category) => (
                  <CategoryBadge
                    key={`${invoice.id}-${category.label}-${category.cor}`}
                    label={category.label}
                    cor={category.cor}
                  />
                ))}
                {extraCount > 0 ? <span className={styles.catExtra}>+{extraCount}</span> : null}
              </div>
              <div className={styles.tdStatus}>
                <StatusBadge status={invoice.status} />
              </div>
              <div className={styles.tdActions}>
                <ChevronRight size={18} color="#5352ed" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
