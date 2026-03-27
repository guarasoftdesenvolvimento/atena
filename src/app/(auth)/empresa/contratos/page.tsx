"use client";

import React from "react";
import { Copy, Filter, FolderOpen, Plus, Search } from "lucide-react";
import styles from "./contratos.module.css";
import TopHeaderBar from "../components/TopHeaderBar";
import { contracts, modelos } from "./data";
import type { ContractTab } from "./types";
import ContractsTable from "./components/ContractsTable";
import EditorSheet from "./components/EditorSheet";
import FilterSheet from "./components/FilterSheet";
import ModelosTable from "./components/ModelosTable";
import NewModelModal from "./components/NewModelModal";
import TutorialModal from "./components/TutorialModal";

export default function ContratosPage() {
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = React.useState(false);
  const [isEditorOpen, setIsEditorOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<ContractTab>("CONTRATOS");

  const handleNewModelNext = (type: "CONTRATO" | "ADITIVO") => {
    void type;
    setIsModalOpen(false);
    setIsTutorialOpen(true);
  };

  const handleWatchTutorial = () => {
    setIsTutorialOpen(false);
    setIsEditorOpen(true);
  };

  return (
    <div className={styles.container}>
      <TopHeaderBar title="Contratos" hasNotifications={false} />

      <div className={styles.contentWrapper}>
        <div className={styles.toolbarRow}>
          <div className={styles.tabsGroup}>
            <div
              className={`${styles.tabBtn} ${activeTab === "CONTRATOS" ? styles.tabBtnActive : ""}`}
              onClick={() => setActiveTab("CONTRATOS")}
            >
              <FolderOpen size={18} /> CONTRATOS
            </div>
            <div
              className={`${styles.tabBtn} ${activeTab === "MODELOS" ? styles.tabBtnActive : ""}`}
              onClick={() => setActiveTab("MODELOS")}
            >
              <Copy size={18} /> MODELOS
            </div>
          </div>

          <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            <div className={styles.searchBox}>
              <Search size={16} color="#c1c1c1" />
              <input
                className={styles.searchInput}
                placeholder={
                  activeTab === "CONTRATOS"
                    ? "Pesquise pelo nome do parceiro"
                    : "Pesquise pelo nome do modelo"
                }
              />
            </div>
            {activeTab === "MODELOS" && (
              <button className={styles.primaryButton} onClick={() => setIsModalOpen(true)}>
                <Plus size={24} />
                Novo modelo
              </button>
            )}
          </div>
        </div>

        <div className={styles.tableCard}>
          <div className={styles.cardTopRow}>
            <span className={styles.totalText}>
              {activeTab === "CONTRATOS"
                ? `${contracts.length} Contratos`
                : `${modelos.length} Modelos`}
            </span>
            <button className={styles.filterButton} onClick={() => setIsFilterOpen(true)}>
              <Filter size={20} color="#5352ed" />
              <span>FILTROS</span>
            </button>
          </div>

          {activeTab === "CONTRATOS" ? (
            <ContractsTable rows={contracts} />
          ) : (
            <ModelosTable rows={modelos} />
          )}
        </div>
      </div>

      <FilterSheet isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
      <NewModelModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onNext={handleNewModelNext}
      />
      <TutorialModal
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
        onWatch={handleWatchTutorial}
      />
      <EditorSheet
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        title="Novo modelo de contrato"
      />
    </div>
  );
}
