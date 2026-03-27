import {
  Download,
  FileText,
  History,
  LayoutDashboard,
  type LucideIcon,
} from "lucide-react";
import styles from "../../detalhes.module.css";
import type { PartnerDetailsTab } from "../types";

interface PartnerTabItem {
  id: PartnerDetailsTab;
  label: string;
  icon: LucideIcon;
}

const partnerTabs: PartnerTabItem[] = [
  { id: "Dados gerais", label: "Dados Gerais", icon: LayoutDashboard },
  { id: "Atividades", label: "Atividades", icon: History },
  { id: "Contratos", label: "Contratos", icon: FileText },
  { id: "Exportar registros", label: "Exportar registros", icon: Download },
];

interface PartnerTabsProps {
  activeTab: PartnerDetailsTab;
  onChangeTab: (tab: PartnerDetailsTab) => void;
}

export default function PartnerTabs({ activeTab, onChangeTab }: PartnerTabsProps) {
  return (
    <div className={styles.tabsRow}>
      {partnerTabs.map((tab) => {
        const TabIcon = tab.icon;

        return (
          <div
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ""}`}
            onClick={() => onChangeTab(tab.id)}
          >
            <TabIcon size={20} />
            {tab.label}
          </div>
        );
      })}
    </div>
  );
}
