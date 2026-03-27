import { CheckCircle2, ChevronRight, Info, X } from "lucide-react";
import styles from "../contratos.module.css";
import type { ModeloRow } from "../types";

export default function ModelosTable({ rows }: { rows: ModeloRow[] }) {
  return (
    <>
      <div className={styles.tableHeaderModelos}>
        <div className={styles.thText}>Modelo</div>
        <div className={styles.thText} style={{ justifyContent: "center" }}>
          Verificado <Info size={14} />
        </div>
        <div className={styles.thText}>Criado em</div>
        <div className={styles.thText}>Atualizado em</div>
        <div className={styles.thText} style={{ justifyContent: "flex-end" }}>
          Ações
        </div>
      </div>

      <div className={styles.tableBody}>
        {rows.map((modelo) => (
          <div key={modelo.id} className={styles.rowModelos}>
            <div className={styles.tdText} style={{ fontWeight: 500 }}>
              {modelo.modelo}
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {modelo.verificado ? (
                <div className={`${styles.verifyBadge} ${styles.verifyValid}`}>
                  <CheckCircle2 size={12} strokeWidth={3} />
                </div>
              ) : (
                <div className={`${styles.verifyBadge} ${styles.verifyInvalid}`}>
                  <X size={12} strokeWidth={3} />
                </div>
              )}
            </div>
            <div className={styles.tdText}>{modelo.criadoEm}</div>
            <div className={styles.tdText}>{modelo.atualizadoEm}</div>
            <div className={styles.actions}>
              <ChevronRight size={16} color="#8f9092" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
