"use client";

import React from "react";
import styles from "./empresa.module.css";
import backofficeStyles from "../backoffice/backoffice.module.css";
import TopHeaderBar from "./components/TopHeaderBar";
import { 
  Bell, 
  Building2, 
  ChevronDown, 
  PenTool, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  MinusCircle, 
  Info,
  XCircle,
  Users as UsersIcon,
  FileText as FileIcon,
  ClipboardList as NotasIcon,
  Truck as RemessasIcon
} from "lucide-react";


function StatCard({
  bg,
  icon: IconComp,
  circleColor,
  value,
  title,
  footer,
  info = false,
}: {
  bg: string;
  icon: any;
  circleColor: string;
  value: string;
  title: string;
  footer: React.ReactNode;
  info?: boolean;
}) {
  return (
    <div className={backofficeStyles.statCard} style={{ background: bg, width: 180, position: 'relative' }}>
      {info && (
        <div style={{ position: 'absolute', right: 16, top: 16 }}>
          <Info size={16} color="#737791" />
        </div>
      )}
      <div className={backofficeStyles.statIconWrap}>
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
      <div className={backofficeStyles.statValue}>{value}</div>
      <div className={backofficeStyles.statTitle}>{title}</div>
      <div className={backofficeStyles.statFooter}>{footer}</div>
    </div>
  );
}

export default function EmpresaPage() {
  return (
    <>
      {/* Header Adaptado para Empresa */}
      <TopHeaderBar title="Dashboard" hasNotifications={false} />

      <div className={backofficeStyles.contentBg}>
        <div className={backofficeStyles.contentCard}>
          <div className={backofficeStyles.contentHeader}>
            <div className={backofficeStyles.contentHeaderTitle}>Contratos</div>
          </div>

          <div className={backofficeStyles.statsRow}>
            <StatCard
              bg="#dcfce7"
              icon={UsersIcon}
              circleColor="#3cd856"
              value="32"
              title="Parceiros PJ"
              footer={<span><strong style={{ fontWeight: 700 }}>32</strong> de 40 acessos</span>}
              info
            />
            <StatCard
              bg="#fff4de"
              icon={FileIcon}
              circleColor="#ff9433"
              value="28"
              title="Contratos"
              footer="Ativos"
              info
            />
            <StatCard
              bg="#eadaff"
              icon={NotasIcon}
              circleColor="#bf5af2"
              value="5"
              title="Notas fiscais"
              footer="Recebidas (a pagar)"
              info
            />
            <StatCard
              bg="#f9eeb6"
              icon={RemessasIcon}
              circleColor="#dcb017"
              value="8"
              title="Remessas"
              footer="A pagar"
              info
            />
          </div>
        </div>

        <div className={styles.subStatsGrid} style={{ marginTop: 24 }}>
            <div className={styles.statusListCard}>
                <div className={styles.statusListHeader}>
                    <span className={styles.statusListTitle}>Contratos</span>
                    <span className={styles.statusListDescription}>Aqui você acompanha todos os contratos firmados com seus parceiros PJ.</span>
                </div>
                <div className={styles.statusItems}>
                    <div className={styles.statusItem}>
                        <PenTool className={styles.statusItemIcon} />
                        <div className={styles.statusItemContent}>
                            <span className={styles.statusItemValue}>30</span>
                            <span className={styles.statusItemLabel}>Aguardando assinatura</span>
                        </div>
                    </div>
                    <div className={styles.statusItem}>
                        <CheckCircle2 className={styles.statusItemIcon} />
                        <div className={styles.statusItemContent}>
                            <span className={styles.statusItemValue}>362</span>
                            <span className={styles.statusItemLabel}>Ativos</span>
                        </div>
                    </div>
                    <div className={styles.statusItem}>
                        <Clock className={styles.statusItemIcon} />
                        <div className={styles.statusItemContent}>
                            <span className={styles.statusItemValue}>10</span>
                            <span className={styles.statusItemLabel}>A vencer em 30 dias</span>
                        </div>
                    </div>
                    <div className={styles.statusItem}>
                        <AlertTriangle className={styles.statusItemIcon} />
                        <div className={styles.statusItemContent}>
                            <span className={styles.statusItemValue}>53</span>
                            <span className={styles.statusItemLabel}>Vencido</span>
                        </div>
                    </div>
                    <div className={styles.statusItem}>
                        <MinusCircle className={styles.statusItemIcon} />
                        <div className={styles.statusItemContent}>
                            <span className={styles.statusItemValue}>78</span>
                            <span className={styles.statusItemLabel}>Inativo</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.statusListCard}>
                <div className={styles.statusListHeader}>
                    <span className={styles.statusListTitle}>Parceiros PJ</span>
                    <span className={styles.statusListDescription}>Lista completa dos seus parceiros PJ, organizada por status de monitoramento.</span>
                </div>
                <div className={styles.statusItems}>
                    <div className={styles.statusItem}>
                        <CheckCircle2 className={styles.statusItemIcon} />
                        <div className={styles.statusItemContent}>
                            <span className={styles.statusItemValue}>352</span>
                            <span className={styles.statusItemLabel}>Regular</span>
                        </div>
                    </div>
                    <div className={styles.statusItem}>
                        <MinusCircle className={styles.statusItemIcon} />
                        <div className={styles.statusItemContent}>
                            <span className={styles.statusItemValue}>16</span>
                            <span className={styles.statusItemLabel}>Em risco</span>
                        </div>
                    </div>
                    <div className={styles.statusItem}>
                        <XCircle className={styles.statusItemIcon} />
                        <div className={styles.statusItemContent}>
                            <span className={styles.statusItemValue}>10</span>
                            <span className={styles.statusItemLabel}>Irregular</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
}
