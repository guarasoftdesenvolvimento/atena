"use client";

import React from "react";
import TopHeaderBar from "../../components/TopHeaderBar";
import EditBankingModal from "./components/modals/EditBankingModal";
import EditCategoriesModal from "./components/modals/EditCategoriesModal";
import EditContactModal from "./components/modals/EditContactModal";
import ContractModal from "./components/modals/ContractModal";
import PartnerHeaderCard from "./components/PartnerHeaderCard";
import AtividadesSection from "./components/sections/AtividadesSection";
import ContratosSection from "./components/sections/ContratosSection";
import DadosGeraisSection from "./components/sections/DadosGeraisSection";
import ExportarRegistrosSection from "./components/sections/ExportarRegistrosSection";
import styles from "../detalhes.module.css";
import type { ContractModalType, PartnerDetailsTab } from "./types";

export default function PartnerDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const partnerId = (() => {
    try {
      return decodeURIComponent(id);
    } catch {
      return id;
    }
  })();

  const [activeTab, setActiveTab] = React.useState<PartnerDetailsTab>("Dados gerais");
  const [isEditContactOpen, setIsEditContactOpen] = React.useState(false);
  const [isEditBankingOpen, setIsEditBankingOpen] = React.useState(false);
  const [isEditCategoriesOpen, setIsEditCategoriesOpen] = React.useState(false);
  const [openPopoverId, setOpenPopoverId] = React.useState<string | null>(null);
  const [selectedContractId, setSelectedContractId] = React.useState<string | null>(null);
  const [expandedAddendumId, setExpandedAddendumId] = React.useState<string | null>(null);
  const [isContractModalOpen, setIsContractModalOpen] = React.useState(false);
  const [modalType, setModalType] = React.useState<ContractModalType>("contrato");

  const handleTogglePopover = (contractId: string) => {
    setOpenPopoverId((current) => (current === contractId ? null : contractId));
  };

  const handleSelectContract = (contractId: string) => {
    setSelectedContractId(contractId);
    setOpenPopoverId(null);
  };

  const handleOpenContractModal = (type: ContractModalType) => {
    setModalType(type);
    setIsContractModalOpen(true);
  };

  const handleToggleAddendum = (addendumId: string) => {
    setExpandedAddendumId((current) => (current === addendumId ? null : addendumId));
  };

  return (
    <div className={styles.container} data-partner-id={partnerId}>
      <TopHeaderBar title="Parceiros PJ" hasNotifications={false} />

      <main className={styles.contentWrapper}>
        <PartnerHeaderCard activeTab={activeTab} onChangeTab={setActiveTab} />

        <div className={styles.gridContent}>
          {activeTab === "Dados gerais" ? (
            <DadosGeraisSection
              onEditContact={() => setIsEditContactOpen(true)}
              onEditBanking={() => setIsEditBankingOpen(true)}
              onEditCategories={() => setIsEditCategoriesOpen(true)}
            />
          ) : null}

          {activeTab === "Atividades" ? <AtividadesSection /> : null}

          {activeTab === "Contratos" ? (
            <ContratosSection
              openPopoverId={openPopoverId}
              selectedContractId={selectedContractId}
              expandedAddendumId={expandedAddendumId}
              onTogglePopover={handleTogglePopover}
              onSelectContract={handleSelectContract}
              onBackFromContractDetails={() => setSelectedContractId(null)}
              onOpenCreateContractModal={() => handleOpenContractModal("contrato")}
              onOpenCreateAddendumModal={() => handleOpenContractModal("aditivo")}
              onToggleAddendum={handleToggleAddendum}
            />
          ) : null}

          {activeTab === "Exportar registros" ? <ExportarRegistrosSection /> : null}
        </div>
      </main>

      <EditContactModal isOpen={isEditContactOpen} onClose={() => setIsEditContactOpen(false)} />
      <EditBankingModal isOpen={isEditBankingOpen} onClose={() => setIsEditBankingOpen(false)} />
      <EditCategoriesModal
        isOpen={isEditCategoriesOpen}
        onClose={() => setIsEditCategoriesOpen(false)}
      />
      <ContractModal
        isOpen={isContractModalOpen}
        onClose={() => setIsContractModalOpen(false)}
        type={modalType}
      />
    </div>
  );
}
