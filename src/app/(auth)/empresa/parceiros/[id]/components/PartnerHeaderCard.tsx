import Link from "next/link";
import { ChevronDown, ChevronLeft, FolderSearch } from "lucide-react";
import styles from "../../detalhes.module.css";
import type { PartnerDetailsTab } from "../types";
import PartnerTabs from "./PartnerTabs";

interface PartnerHeaderCardProps {
  activeTab: PartnerDetailsTab;
  onChangeTab: (tab: PartnerDetailsTab) => void;
}

export default function PartnerHeaderCard({
  activeTab,
  onChangeTab,
}: PartnerHeaderCardProps) {
  return (
    <>
      <div className={styles.breadcrumbRow}>
        <Link href="/empresa/parceiros" className={styles.backButton}>
          <ChevronLeft size={20} />
        </Link>
        <h2 className={styles.pageTitle} style={{ fontSize: "18px", margin: 0 }}>
          Voltar
        </h2>
      </div>

      <div className={styles.headerCard}>
        <div className={styles.headerTop}>
          <div className={styles.headerIcon}>
            <FolderSearch size={24} />
          </div>
          <div className={styles.headerInfo}>
            <h2 className={styles.partnerName}>Felipe Alves dos Santos</h2>
            <p className={styles.partnerCnpj}>CNPJ: 38.300.972/0001-19</p>
          </div>
          <div className={styles.statusContainer}>
            <span className={styles.statusLabel}>Status do Parceiro PJ:</span>
            <div className={styles.statusValue}>
              Ativo
              <ChevronDown size={20} />
            </div>
          </div>
        </div>

        <PartnerTabs activeTab={activeTab} onChangeTab={onChangeTab} />
      </div>
    </>
  );
}
