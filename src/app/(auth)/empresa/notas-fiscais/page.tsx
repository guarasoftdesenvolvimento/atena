"use client";

import React from "react";
import { FileText, Info, PieChart, Plus } from "lucide-react";
import TopHeaderBar from "../components/TopHeaderBar";
import { invoices, summaryCards } from "./data";
import styles from "./notas-fiscais.module.css";
import FilterSheet from "./components/filters/FilterSheet";
import CreateRemessaModal from "./components/modals/CreateRemessaModal";
import InvoiceDetailsModal from "./components/modals/InvoiceDetailsModal";
import RemessaInfoModal from "./components/modals/RemessaInfoModal";
import RemessaPaymentModal from "./components/modals/RemessaPaymentModal";
import InvoicesSection from "./components/sections/InvoicesSection";
import OverviewSection from "./components/sections/OverviewSection";
import type { ActiveTab, CreatedRemessa, Invoice } from "./types";

export default function NotasFiscaisPage() {
  const [activeTab, setActiveTab] = React.useState<ActiveTab>("visao");
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [selectedInvoice, setSelectedInvoice] = React.useState<Invoice | null>(null);
  const [isRemessaInfoOpen, setIsRemessaInfoOpen] = React.useState(false);
  const [isCreateRemessaOpen, setIsCreateRemessaOpen] = React.useState(false);
  const [createdRemessa, setCreatedRemessa] = React.useState<CreatedRemessa | null>(null);

  return (
    <div className={styles.container}>
      <TopHeaderBar title="Notas Fiscais" hasNotifications={false} />

      <div className={styles.contentWrapper}>
        <div className={styles.tabBar}>
          <div className={styles.tabBarTabs}>
            <button
              className={`${styles.tabBtn} ${activeTab === "visao" ? styles.tabBtnActive : ""}`}
              onClick={() => setActiveTab("visao")}
            >
              <PieChart size={20} />
              VISÃO GERAL
            </button>
            <button
              className={`${styles.tabBtn} ${activeTab === "notas" ? styles.tabBtnActive : ""}`}
              onClick={() => setActiveTab("notas")}
            >
              <FileText size={20} />
              NOTAS FISCAIS
            </button>
          </div>

          {activeTab === "notas" ? (
            <div className={styles.tabBarActions}>
              <button
                type="button"
                className={styles.tooltipIconButton}
                onClick={() => setIsRemessaInfoOpen(true)}
                aria-label="Abrir informações sobre remessa de pagamento"
              >
                <Info size={28} color="#527ca5" />
              </button>
              <button
                type="button"
                className={styles.createRemessaButton}
                onClick={() => setIsCreateRemessaOpen(true)}
              >
                <Plus size={20} />
                CRIAR REMESSA DE PAGAMENTO
              </button>
            </div>
          ) : null}
        </div>

        {activeTab === "visao" ? (
          <OverviewSection summaryCards={summaryCards} onOpenFilter={() => setIsFilterOpen(true)} />
        ) : (
          <InvoicesSection
            invoices={invoices}
            onOpenFilter={() => setIsFilterOpen(true)}
            onSelectInvoice={setSelectedInvoice}
          />
        )}
      </div>

      <FilterSheet isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
      <InvoiceDetailsModal invoice={selectedInvoice} onClose={() => setSelectedInvoice(null)} />
      <RemessaInfoModal isOpen={isRemessaInfoOpen} onClose={() => setIsRemessaInfoOpen(false)} />
      <CreateRemessaModal
        isOpen={isCreateRemessaOpen}
        onClose={() => setIsCreateRemessaOpen(false)}
        onSubmit={(remessa) => {
          setIsCreateRemessaOpen(false);
          setCreatedRemessa(remessa);
        }}
        invoices={invoices}
      />
      <RemessaPaymentModal remessa={createdRemessa} onClose={() => setCreatedRemessa(null)} />
    </div>
  );
}
