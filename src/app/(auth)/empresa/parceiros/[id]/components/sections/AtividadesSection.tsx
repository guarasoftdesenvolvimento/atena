import { Calendar, Circle, ClipboardList, User } from "lucide-react";
import styles from "../../../detalhes.module.css";

const activityItems = [
  {
    id: "comprovante",
    summary: (
      <>
        <strong>Comprovante de pagamento #CP-0002</strong> anexado ao{" "}
        <strong>Contrato #12366</strong>
      </>
    ),
    date: "24/02/2025 às 16:42",
    author: "Guarásoft",
  },
  {
    id: "nf",
    summary: (
      <>
        <strong>Nota fiscal #12365</strong> emitida e enviada
      </>
    ),
    date: "24/02/2025 às 16:42",
    author: "Felipe Alves",
  },
  {
    id: "cadastro",
    summary: (
      <>
        Parceiro Felipe foi <strong>cadastrado</strong> com sucesso!
      </>
    ),
    date: "24/02/2025 às 16:42",
    author: "Guarásoft",
  },
];

export default function AtividadesSection() {
  return (
    <div className={styles.card}>
      <div className={styles.activityHeader}>
        <ClipboardList size={24} className="text-[#345070]" />
        <div className={styles.activityTitleGroup}>
          <h3 className={styles.activityTitle}>Histórico de atividades</h3>
          <p className={styles.activityDesc}>
            Veja aqui todas as movimentações referentes ao parceiro PJ selecionado.
          </p>
        </div>
      </div>

      <div className={styles.timelineContainer}>
        {activityItems.map((activity, index) => (
          <div key={activity.id} className={styles.timelineItem}>
            <div className={styles.timelineMarker}>
              <Circle size={14} className={styles.markerCircle} fill="currentColor" />
              {index < activityItems.length - 1 ? <div className={styles.markerLine}></div> : null}
            </div>
            <div className={styles.timelineCard}>
              <p className={styles.activitySummary}>{activity.summary}</p>
              <div className={styles.activityMetaRow}>
                <div className={styles.activityMetaItem}>
                  <Calendar size={14} /> {activity.date}
                </div>
                <div className={styles.activityMetaItem}>
                  <User size={14} /> Por <span className={styles.metaLink}>{activity.author}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
