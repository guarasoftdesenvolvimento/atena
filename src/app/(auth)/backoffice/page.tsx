import styles from "./backoffice.module.css";
import { 
  Users, 
  FileText, 
  ClipboardList, 
  BarChart2 
} from "lucide-react";


function StatCard({
  bg,
  icon: IconComp,
  circleColor,
  value,
  title,
  footer,
}: {
  bg: string;
  icon: any;
  circleColor: string;
  value: string;
  title: string;
  footer: string;
}) {
  return (
    <div className={styles.statCard} style={{ background: bg }}>
      <div className={styles.statIconWrap}>
        <div style={{ 
          position: "absolute", 
          left: -8, 
          top: -8, 
          width: 40, 
          height: 40, 
          backgroundColor: circleColor, 
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <IconComp size={24} color="#ffffff" />
        </div>
      </div>
      <div className={styles.statValue}>{value}</div>
      <div className={styles.statTitle}>{title}</div>
      <div className={styles.statFooter}>{footer}</div>
    </div>
  );
}

export default function BackofficePage() {
  return (
    <>
      <div className={styles.topHeader}>
        <div className={styles.topTitle}>Dashboard</div>
        <div className={styles.userBadge}>
          <div className={styles.userName}>Olá Daniel</div>
        </div>
      </div>

      <div className={styles.contentBg}>
        <div className={styles.contentCard}>
          <div className={styles.contentHeader}>
            <div className={styles.contentHeaderTitle}>Contratos</div>
          </div>

          <div className={styles.statsRow}>
            <StatCard
              bg="#dcfce7"
              icon={BarChart2}
              circleColor="#3cd856"
              value="124"
              title="Empresas"
              footer="Cadastradas"
            />
            <StatCard
              bg="#fff4de"
              icon={Users}
              circleColor="#ff9433"
              value="3.458"
              title="Parceiros PJ"
              footer="Ativos"
            />
            <StatCard
              bg="rgba(0,149,255,0.2)"
              icon={FileText}
              circleColor="#0095ff"
              value="1789"
              title="Contratos"
              footer="Total"
            />
            <StatCard
              bg="#ffe2e5"
              icon={ClipboardList}
              circleColor="#ff6b6b"
              value="32"
              title="Notas Fiscais"
              footer="Emitidas"
            />
          </div>
        </div>
      </div>
    </>
  );
}

