import Link from "next/link";
import { CheckCircle2, ChevronRight, Info, X } from "lucide-react";
import styles from "../contratos.module.css";
import type { ContractCategory, ContractRow } from "../types";

function getCategoryClassName(color: ContractCategory["color"]) {
  if (color === "Green") return styles.catGreen;
  if (color === "Orange") return styles.catOrange;
  if (color === "Purple") return styles.catPurple;
  if (color === "Red") return styles.catRed;
  return styles.catYellow;
}

export default function ContractsTable({ rows }: { rows: ContractRow[] }) {
  return (
    <>
      <div className={styles.tableHeader}>
        <div className={styles.thText}>Parceiro PJ</div>
        <div className={styles.thText}>Modelo</div>
        <div className={styles.thText} style={{ display: "flex", gap: "4px", alignItems: "center" }}>
          Verificado <Info size={14} />
        </div>
        <div className={styles.thText}>Categoria</div>
        <div className={styles.thText}>Vigência</div>
        <div className={styles.thText}>Situação</div>
        <div className={styles.thText} style={{ justifyContent: "flex-end" }}>
          Ações
        </div>
      </div>

      <div className={styles.tableBody}>
        {rows.map((contract) => (
          <Link
            key={contract.id}
            href={`/empresa/parceiros/${contract.id}?tab=Contratos`}
            className={styles.row}
          >
            <div className={styles.tdTitle}>{contract.partnerName}</div>
            <div className={styles.tdText}>{contract.modelo}</div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {contract.verificado ? (
                <div className={`${styles.verifyBadge} ${styles.verifyValid}`}>
                  <CheckCircle2 size={12} strokeWidth={3} />
                </div>
              ) : (
                <div className={`${styles.verifyBadge} ${styles.verifyInvalid}`}>
                  <X size={12} strokeWidth={3} />
                </div>
              )}
            </div>
            <div className={styles.categoriesList}>
              {contract.categorias.map((cat) => (
                <span
                  key={`${contract.id}-${cat.name}-${cat.color}`}
                  className={
                    cat.color === "Plus"
                      ? styles.catPlus
                      : `${styles.categoryTag} ${getCategoryClassName(cat.color)}`
                  }
                >
                  {cat.name}
                </span>
              ))}
            </div>
            <div className={styles.tdText}>{contract.vigencia}</div>
            <div>
              <span className={`${styles.statusPill} ${contract.status === "ativo" ? styles.statusAtivo : ""}`}>
                {contract.status === "ativo" ? "Ativo" : contract.status}
              </span>
            </div>
            <div className={styles.actions}>
              <ChevronRight size={16} color="#8f9092" />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
