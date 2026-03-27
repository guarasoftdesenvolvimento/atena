"use client";

import React from "react";
import { figmaAssets } from "@/lib/figmaAssets";
import {
  contractItems,
  fallbackContractItem,
  invoiceItems,
  quickAccessItems,
} from "./data";
import FloatingNav from "./components/FloatingNav";
import AlertsStep from "./components/steps/AlertsStep";
import ContractDetailStep from "./components/steps/ContractDetailStep";
import ContractsStep from "./components/steps/ContractsStep";
import FirstAccessStep from "./components/steps/FirstAccessStep";
import HomeStep from "./components/steps/HomeStep";
import InvoicesStep from "./components/steps/InvoicesStep";
import MyDataStep from "./components/steps/MyDataStep";
import SupportStep from "./components/steps/SupportStep";
import styles from "./parceiro-pj.module.css";
import type {
  InvoiceFlowMode,
  InvoiceItem,
  NavItemId,
  OnboardingStep,
  ProfileAccordionId,
} from "./types";
import { formatDateToBR } from "./utils/formatters";

export default function ParceiroPJPage() {
  const assets = figmaAssets.login;
  const firstContractCode = contractItems[0]?.detailCode ?? "";
  const [step, setStep] = React.useState<OnboardingStep>("company_data");
  const [confirmed, setConfirmed] = React.useState(true);
  const [selectedContractCode, setSelectedContractCode] = React.useState<string>(firstContractCode);
  const [openAddendaIndexes, setOpenAddendaIndexes] = React.useState<number[]>([0]);
  const [openInvoiceIndexes, setOpenInvoiceIndexes] = React.useState<number[]>([0, 1]);
  const [openProfileSections, setOpenProfileSections] = React.useState<ProfileAccordionId[]>([
    "company",
  ]);
  const [invoiceModal, setInvoiceModal] = React.useState<InvoiceItem | null>(null);
  const [isEmitInvoiceModalOpen, setIsEmitInvoiceModalOpen] = React.useState(false);
  const [invoiceFlowMode, setInvoiceFlowMode] = React.useState<InvoiceFlowMode>("emit");
  const [uploadedInvoiceFileName, setUploadedInvoiceFileName] = React.useState("");
  const [emitInvoiceAmount, setEmitInvoiceAmount] = React.useState("");
  const [emitInvoiceContractCode, setEmitInvoiceContractCode] = React.useState(firstContractCode);
  const uploadInvoiceInputRef = React.useRef<HTMLInputElement>(null);

  const activeNavItemId: NavItemId | null = (() => {
    if (step === "contracts" || step === "contract_detail") {
      return "contracts";
    }

    if (step === "invoices") {
      return "nfs";
    }

    if (step === "alerts") {
      return "alerts";
    }

    if (step === "support") {
      return null;
    }

    return "home";
  })();

  const selectedContract =
    contractItems.find((contract) => contract.detailCode === selectedContractCode) ??
    contractItems[0] ??
    fallbackContractItem;

  const handleQuickAccessClick = (itemId: (typeof quickAccessItems)[number]["id"]) => {
    if (itemId === "contracts") {
      setStep("contracts");
    }

    if (itemId === "nfs") {
      setStep("invoices");
    }

    if (itemId === "support") {
      setStep("support");
    }

    if (itemId === "profile") {
      setStep("my_data");
    }
  };

  const handleBottomNavClick = (itemId: NavItemId) => {
    if (itemId === "home") {
      setStep("home");
    }

    if (itemId === "contracts") {
      setStep("contracts");
    }

    if (itemId === "nfs") {
      setStep("invoices");
    }

    if (itemId === "alerts") {
      setStep("alerts");
    }
  };

  const handleContractCardClick = (contractCode: string) => {
    setSelectedContractCode(contractCode);
    setStep("contract_detail");
  };

  const handleToggleAddendum = (index: number) => {
    setOpenAddendaIndexes((current) =>
      current.includes(index) ? current.filter((item) => item !== index) : [...current, index],
    );
  };

  const handleOpenInvoiceModal = (invoice: InvoiceItem) => {
    setInvoiceModal(invoice);
  };

  const handleToggleInvoice = (index: number) => {
    setOpenInvoiceIndexes((current) =>
      current.includes(index) ? current.filter((item) => item !== index) : [...current, index],
    );
  };

  const handleToggleProfileSection = (sectionId: ProfileAccordionId) => {
    setOpenProfileSections((current) =>
      current.includes(sectionId)
        ? current.filter((item) => item !== sectionId)
        : [...current, sectionId],
    );
  };

  const handleOpenEmitInvoiceModal = () => {
    setInvoiceFlowMode("emit");
    setUploadedInvoiceFileName("");
    setEmitInvoiceAmount("");
    setEmitInvoiceContractCode(firstContractCode);
    setIsEmitInvoiceModalOpen(true);
  };

  const handleCloseEmitInvoiceModal = () => {
    setIsEmitInvoiceModalOpen(false);
  };

  const handleInvoiceFlowModeChange = (mode: InvoiceFlowMode) => {
    setInvoiceFlowMode(mode);

    if (mode === "emit") {
      setUploadedInvoiceFileName("");
    }
  };

  const handleInvoiceUploadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setUploadedInvoiceFileName(file?.name ?? "");
  };

  const canSubmitEmitInvoice =
    emitInvoiceAmount.trim().length > 0 &&
    emitInvoiceContractCode.length > 0 &&
    (invoiceFlowMode === "emit" || uploadedInvoiceFileName.length > 0);
  const emitInvoicePrimaryActionLabel =
    invoiceFlowMode === "upload" ? "ENVIAR NF" : "EMITIR NF";

  const handleSubmitEmitInvoice = () => {
    if (!canSubmitEmitInvoice) {
      return;
    }

    if (invoiceFlowMode === "emit") {
      const createdInvoice: InvoiceItem = {
        id: `invoice-created-${invoiceItems.length + 1}`,
        code: `NF${String(invoiceItems.length + 1).padStart(4, "0")}`,
        issuedAt: formatDateToBR(new Date()),
        contractCode: emitInvoiceContractCode,
      };

      setIsEmitInvoiceModalOpen(false);
      setInvoiceModal(createdInvoice);
      return;
    }

    setIsEmitInvoiceModalOpen(false);
  };

  if (step === "invoices") {
    return (
      <main className={styles.page}>
        <InvoicesStep
          openInvoiceIndexes={openInvoiceIndexes}
          invoiceModal={invoiceModal}
          isEmitInvoiceModalOpen={isEmitInvoiceModalOpen}
          invoiceFlowMode={invoiceFlowMode}
          uploadedInvoiceFileName={uploadedInvoiceFileName}
          emitInvoiceAmount={emitInvoiceAmount}
          emitInvoiceContractCode={emitInvoiceContractCode}
          canSubmitEmitInvoice={canSubmitEmitInvoice}
          emitInvoicePrimaryActionLabel={emitInvoicePrimaryActionLabel}
          uploadInvoiceInputRef={uploadInvoiceInputRef}
          onBack={() => setStep("home")}
          onOpenEmitInvoiceModal={handleOpenEmitInvoiceModal}
          onToggleInvoice={handleToggleInvoice}
          onOpenInvoiceModal={handleOpenInvoiceModal}
          onCloseInvoiceModal={() => setInvoiceModal(null)}
          onCloseEmitInvoiceModal={handleCloseEmitInvoiceModal}
          onInvoiceFlowModeChange={handleInvoiceFlowModeChange}
          onInvoiceUploadChange={handleInvoiceUploadChange}
          onEmitInvoiceAmountChange={setEmitInvoiceAmount}
          onEmitInvoiceContractCodeChange={setEmitInvoiceContractCode}
          onSubmitEmitInvoice={handleSubmitEmitInvoice}
        />
        <FloatingNav activeNavItemId={activeNavItemId} onItemClick={handleBottomNavClick} />
      </main>
    );
  }

  if (step === "alerts") {
    return (
      <main className={styles.page}>
        <AlertsStep onBack={() => setStep("home")} />
        <FloatingNav activeNavItemId={activeNavItemId} onItemClick={handleBottomNavClick} />
      </main>
    );
  }

  if (step === "contract_detail") {
    return (
      <main className={styles.page}>
        <ContractDetailStep
          selectedContract={selectedContract}
          openAddendaIndexes={openAddendaIndexes}
          onBack={() => setStep("contracts")}
          onToggleAddendum={handleToggleAddendum}
        />
        <FloatingNav activeNavItemId={activeNavItemId} onItemClick={handleBottomNavClick} />
      </main>
    );
  }

  if (step === "contracts") {
    return (
      <main className={styles.page}>
        <ContractsStep onBack={() => setStep("home")} onContractCardClick={handleContractCardClick} />
        <FloatingNav activeNavItemId={activeNavItemId} onItemClick={handleBottomNavClick} />
      </main>
    );
  }

  if (step === "my_data") {
    return (
      <main className={styles.page}>
        <MyDataStep
          openProfileSections={openProfileSections}
          onToggleProfileSection={handleToggleProfileSection}
          onBack={() => setStep("home")}
        />
        <FloatingNav activeNavItemId={activeNavItemId} onItemClick={handleBottomNavClick} />
      </main>
    );
  }

  if (step === "support") {
    return (
      <main className={styles.page}>
        <SupportStep onBack={() => setStep("home")} />
        <FloatingNav activeNavItemId={activeNavItemId} onItemClick={handleBottomNavClick} />
      </main>
    );
  }

  if (step === "home") {
    return (
      <main className={styles.page}>
        <HomeStep logoIconSrc={assets.logoIconSrc} onQuickAccessClick={handleQuickAccessClick} />
        <FloatingNav activeNavItemId={activeNavItemId} onItemClick={handleBottomNavClick} />
      </main>
    );
  }

  return (
    <FirstAccessStep
      step={step}
      logoIconSrc={assets.logoIconSrc}
      confirmed={confirmed}
      onConfirmChange={setConfirmed}
      onGoToSuccess={() => setStep("success")}
      onAccessApp={() => setStep("home")}
    />
  );
}
