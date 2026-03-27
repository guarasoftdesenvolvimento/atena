import type { ReactNode } from "react";
import {
  Cloud,
  CloudDownload,
  FileText,
  Folder,
  History,
  Paperclip,
  type LucideIcon,
} from "lucide-react";
import styles from "../../../detalhes.module.css";

interface ExportCardItem {
  id: string;
  title: string;
  description: ReactNode;
  icon: LucideIcon;
}

const exportCards: ExportCardItem[] = [
  {
    id: "historico",
    title: "Histórico de movimentação",
    description: (
      <>
        Faça download do histórico com todas as movimentações do{" "}
        <strong>Parceiro PJ.</strong>
      </>
    ),
    icon: History,
  },
  {
    id: "contratos",
    title: "Contratos",
    description: (
      <>
        Baixe todos os contratos emitidos por este <strong>Parceiro PJ.</strong>
      </>
    ),
    icon: Folder,
  },
  {
    id: "notas",
    title: "Notas fiscais",
    description: (
      <>
        Faça download de todas as notas fiscais emitidas pelo <strong>Parceiro PJ.</strong>
      </>
    ),
    icon: FileText,
  },
  {
    id: "comprovantes",
    title: "Comprovantes de pagamento",
    description: (
      <>
        Faça download de todos os comprovantes emitidos pelo <strong>Parceiro PJ.</strong>
      </>
    ),
    icon: Paperclip,
  },
];

export default function ExportarRegistrosSection() {
  return (
    <div className={styles.card}>
      <div className={styles.activityHeader}>
        <CloudDownload size={24} className="text-[#345070]" />
        <div className={styles.activityTitleGroup}>
          <h3 className={styles.activityTitle}>Exportar registros</h3>
          <p className={styles.activityDesc}>
            Faça download de toda a documentação e tenha lastro jurídico a qualquer momento
          </p>
        </div>
      </div>

      <div className={styles.exportGrid}>
        {exportCards.map((card) => {
          const CardIcon = card.icon;

          return (
            <div key={card.id} className={styles.exportCard}>
              <div className={styles.exportCardHeader}>
                <CardIcon size={24} className="text-[#345070]" />
                <h4 className={styles.exportCardTitle}>{card.title}</h4>
                <p className={styles.exportCardDesc}>{card.description}</p>
              </div>
              <div className={styles.exportCardFooter}>
                <button className={styles.downloadButton}>
                  <Cloud size={14} /> Baixar documentos
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
