"use client";

import React from "react";
import {
  Bookmark,
  CheckCircle2,
  Search,
  ChevronDown,
  ChevronUp,
  Pencil,
  Plus,
  UserRound,
  UserRoundPlus,
  Users,
  FileText,
  X,
} from "lucide-react";
import TopHeaderBar from "../components/TopHeaderBar";
import styles from "./configuracoes.module.css";

type ConfigTab = "dados" | "categorias" | "usuarios";

type AdditionalCompany = {
  cnpj: string;
  nome: string;
  razaoSocial: string;
  nomeFantasia: string;
  email: string;
  telefone: string;
  endereco: string;
  municipio: string;
  estado: string;
  cnaePrincipal: string;
  usuariosAtivos: string;
};
type ResponsibleData = {
  nome: string;
  whatsapp: string;
  email: string;
};
type SystemUser = {
  id: number;
  nome: string;
  email: string;
  perfil: string;
  status: "Ativo" | "Inativo";
};
type SystemUserDraft = {
  nome: string;
  email: string;
  perfil: string;
};

type AddAdditionalCnpjModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (cnpj: string) => void;
};

const company = {
  cnpj: "38.300.972/0001-19",
  razaoSocial: "GUARASOFT TECNOLOGIA - LTDA",
  nomeFantasia: "Guar\u00e1Soft",
  email: "contato@kalisoft.tech",
  telefone: "47 99999-9999",
  endereco: "Rua XV de Novembro, no 1457",
  municipio: "Blumenau",
  estado: "Santa Catarina",
  cnaePrincipal: "62.01-5/01",
  pacoteContratado: "15 acessos",
  acessosEmUso: "Acessos em uso: 15 de 15",
  usuariosAtivos: "10 acessos",
};

const initialAdditionalCompanies: AdditionalCompany[] = [
  {
    cnpj: "38.300.972/0002-01",
    nome: "Guar\u00e1Soft 02",
    razaoSocial: "GUARASOFT APLICATIVOS - LTDA",
    nomeFantasia: "Guar\u00e1Soft 02",
    email: "contato@kalisoft.tech",
    telefone: "47 99999-9999",
    endereco: "Rua XV de Novembro, no 1457",
    municipio: "Blumenau",
    estado: "Santa Catarina",
    cnaePrincipal: "62.01-5/01",
    usuariosAtivos: "05",
  },
  {
    cnpj: "38.300.972/0003-01",
    nome: "Guar\u00e1Soft 3",
    razaoSocial: "GUARASOFT APLICATIVOS - LTDA",
    nomeFantasia: "Guar\u00e1Soft 3",
    email: "contato@kalisoft.tech",
    telefone: "47 99999-9999",
    endereco: "Rua XV de Novembro, no 1457",
    municipio: "Blumenau",
    estado: "Santa Catarina",
    cnaePrincipal: "62.01-5/01",
    usuariosAtivos: "03",
  },
];

const categories = ["Tecnologia", "Desenvolvimento", "Design", "Financeiro", "Opera\u00e7\u00f5es"];

const initialSystemUsers: SystemUser[] = [
  { id: 1, nome: "Felipe Alves dos Santos", email: "contato@kalisoft.tech", perfil: "Administrador", status: "Ativo" },
  { id: 2, nome: "Mariana Costa", email: "mariana@kalisoft.tech", perfil: "Financeiro", status: "Ativo" },
  { id: 3, nome: "Rafael Souza", email: "rafael@kalisoft.tech", perfil: "Operador", status: "Inativo" },
];
const userRoleOptions = ["Administrador", "Financeiro", "Operador"];
const emptySystemUserDraft: SystemUserDraft = {
  nome: "",
  email: "",
  perfil: "Administrador",
};

const additionalCompanyPreview = {
  razaoSocial: "GUARASOFT APLICATIVOS - LTDA",
  email: "contato@kalisoft.tech",
  telefone: "47 99999-9999",
  endereco: "Rua XV de Novembro, no 1457",
  municipio: "Blumenau",
  estado: "Santa Catarina",
  cnaePrincipal: "62.01-5/01",
};

function useEscapeToClose(isOpen: boolean, onClose: () => void) {
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);
}

function EditResponsibleModal({
  isOpen,
  onClose,
  onSave,
  data,
  onChange,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  data: ResponsibleData;
  onChange: (field: keyof ResponsibleData, value: string) => void;
}) {
  useEscapeToClose(isOpen, onClose);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContent}
        role="dialog"
        aria-modal="true"
        aria-label="Editar dados do responsável"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.editModalHeader}>
          <div className={styles.headerTitleGroup}>
            <UserRound size={24} />
            <h2 className={styles.modalSectionTitle}>{"Editar dados do respons\u00e1vel"}</h2>
          </div>

          <button type="button" className={styles.closeContainer} onClick={onClose} aria-label="Fechar modal">
            <X size={16} />
          </button>
        </div>

        <div className={styles.editModalBody}>
          <div className={styles.inputFieldGroup}>
            <label className={styles.inputLabel}>{"Nome completo do respons\u00e1vel"}</label>
            <input
              className={styles.modalInput}
              type="text"
              placeholder="Ex: Simara Zatesko"
              value={data.nome}
              onChange={(event) => onChange("nome", event.target.value)}
            />
          </div>

          <div className={styles.inputFieldGroup}>
            <label className={styles.inputLabel}>WhatsApp</label>
            <input
              className={styles.modalInput}
              type="text"
              value={data.whatsapp}
              onChange={(event) => onChange("whatsapp", event.target.value)}
            />
          </div>

          <div className={styles.inputFieldGroup}>
            <label className={styles.inputLabel}>E-mail</label>
            <input
              className={styles.modalInput}
              type="email"
              placeholder="Ex: simara@guarasoft.com"
              value={data.email}
              onChange={(event) => onChange("email", event.target.value)}
            />
          </div>
        </div>

        <div className={styles.editModalFooter}>
          <button type="button" className={styles.btnCancel} onClick={onClose}>
            CANCELAR
          </button>
          <button type="button" className={styles.btnSave} onClick={onSave}>
            <CheckCircle2 size={20} />
            SALVAR
          </button>
        </div>
      </div>
    </div>
  );
}

function AddAdditionalCnpjModal({ isOpen, onClose, onAdd }: AddAdditionalCnpjModalProps) {
  const [cnpj, setCnpj] = React.useState("");
  const [isCnpjSearched, setIsCnpjSearched] = React.useState(false);

  useEscapeToClose(isOpen, onClose);

  React.useEffect(() => {
    if (!isOpen) {
      setCnpj("");
      setIsCnpjSearched(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSearch = () => {
    if (!cnpj.trim()) return;
    setIsCnpjSearched(true);
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContent}
        role="dialog"
        aria-modal="true"
        aria-label="Adicionar CNPJ adicional"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.editModalHeader}>
          <div className={styles.headerTitleGroup}>
            <Search size={20} />
            <h2 className={styles.modalSectionTitle}>CNPJ Adicional</h2>
          </div>

          <button type="button" className={styles.closeContainer} onClick={onClose} aria-label="Fechar modal">
            <X size={16} />
          </button>
        </div>

        <div className={styles.editModalBody}>
          <div className={styles.inputFieldGroup}>
            <label className={styles.inputLabel}>CNPJ</label>

            <div className={styles.cnpjInputShell}>
              <div className={styles.cnpjIcon}>
                <Search size={16} />
              </div>
              <input
                className={styles.cnpjInput}
                value={cnpj}
                onChange={(event) => {
                  setCnpj(event.target.value);
                  if (isCnpjSearched) setIsCnpjSearched(false);
                }}
                placeholder="38.300.972/0001-11"
                aria-label="CNPJ adicional"
              />
              <button type="button" className={styles.cnpjSearchButton} onClick={handleSearch} aria-label="Pesquisar CNPJ">
                <Search size={16} />
              </button>
            </div>
            <span className={styles.helperText}>{"Digite e pesquise um CNPJ v\u00e1lido"}</span>
          </div>

          {isCnpjSearched && (
            <div className={styles.detailsBox}>
              <div className={styles.detailsGrid}>
                <div className={styles.detailsColFull}>
                  <span className={styles.fieldLabel}>{"Raz\u00e3o social"}</span>
                  <span className={styles.fieldValue}>{additionalCompanyPreview.razaoSocial}</span>
                </div>

                <div className={styles.fieldGroup}>
                  <span className={styles.fieldLabel}>CNPJ</span>
                  <span className={styles.fieldValue}>{cnpj.trim()}</span>
                </div>
                <div className={styles.fieldGroup}>
                  <span className={styles.fieldLabel}>E-mail</span>
                  <span className={styles.fieldValue}>{additionalCompanyPreview.email}</span>
                </div>

                <div className={styles.fieldGroup}>
                  <span className={styles.fieldLabel}>Telefone</span>
                  <span className={styles.fieldValue}>{additionalCompanyPreview.telefone}</span>
                </div>
                <div className={styles.fieldGroup}>
                  <span className={styles.fieldLabel}>{"Endere\u00e7o"}</span>
                  <span className={styles.fieldValue}>{additionalCompanyPreview.endereco}</span>
                </div>

                <div className={styles.fieldGroup}>
                  <span className={styles.fieldLabel}>{"Munic\u00edpio"}</span>
                  <span className={styles.fieldValue}>{additionalCompanyPreview.municipio}</span>
                </div>
                <div className={styles.fieldGroup}>
                  <span className={styles.fieldLabel}>Estado</span>
                  <span className={styles.fieldValue}>{additionalCompanyPreview.estado}</span>
                </div>

                <div className={styles.detailsColFull}>
                  <span className={styles.fieldLabel}>CNAE Principal</span>
                  <span className={styles.cnaeChip}>{additionalCompanyPreview.cnaePrincipal}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={styles.editModalFooter}>
          <button type="button" className={styles.btnCancel} onClick={onClose}>
            CANCELAR
          </button>
          <button
            type="button"
            className={styles.btnSave}
            disabled={!cnpj.trim()}
            onClick={() => {
              const value = cnpj.trim();
              if (!value) return;
              onAdd(value);
              onClose();
            }}
          >
            ADICIONAR
          </button>
        </div>
      </div>
    </div>
  );
}

function SystemUserModal({
  isOpen,
  isEditing,
  data,
  onClose,
  onSave,
  onChange,
}: {
  isOpen: boolean;
  isEditing: boolean;
  data: SystemUserDraft;
  onClose: () => void;
  onSave: () => void;
  onChange: (field: keyof SystemUserDraft, value: string) => void;
}) {
  useEscapeToClose(isOpen, onClose);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContent}
        role="dialog"
        aria-modal="true"
        aria-label={isEditing ? "Editar usuário do sistema" : "Novo usuário do sistema"}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.editModalHeader}>
          <div className={styles.headerTitleGroup}>
            <UserRoundPlus size={24} />
            <h2 className={styles.modalSectionTitle}>
              {isEditing ? "Editar usu\u00e1rio do sistema" : "Novo usu\u00e1rio do sistema"}
            </h2>
          </div>

          <button type="button" className={styles.closeContainer} onClick={onClose} aria-label="Fechar modal">
            <X size={16} />
          </button>
        </div>

        <div className={styles.editModalBody}>
          <div className={styles.inputFieldGroup}>
            <label className={styles.inputLabel}>{"Nome completo do respons\u00e1vel"}</label>
            <input
              className={styles.modalInput}
              type="text"
              placeholder="Ex: Simara Zatesko"
              value={data.nome}
              onChange={(event) => onChange("nome", event.target.value)}
            />
          </div>

          <div className={styles.inputFieldGroup}>
            <label className={styles.inputLabel}>Email</label>
            <input
              className={styles.modalInput}
              type="email"
              placeholder="Ex: simara@guarasoft.com"
              value={data.email}
              onChange={(event) => onChange("email", event.target.value)}
            />
          </div>

          <div className={styles.inputFieldGroup}>
            <label className={styles.inputLabel}>{"Fun\u00e7\u00e3o"}</label>
            <div className={styles.modalSelectShell}>
              <select
                className={`${styles.modalInput} ${styles.modalSelectInput}`}
                value={data.perfil}
                onChange={(event) => onChange("perfil", event.target.value)}
              >
                {userRoleOptions.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              <ChevronDown size={20} className={styles.modalSelectIcon} />
            </div>
          </div>
        </div>

        <div className={styles.editModalFooter}>
          <button type="button" className={styles.btnCancel} onClick={onClose}>
            CANCELAR
          </button>
          <button
            type="button"
            className={styles.btnSave}
            onClick={onSave}
            disabled={!data.nome.trim() || !data.email.trim() || !data.perfil.trim()}
          >
            <CheckCircle2 size={20} />
            SALVAR
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ConfiguracoesEmpresaPage() {
  const [activeTab, setActiveTab] = React.useState<ConfigTab>("dados");
  const [expandedAdditionalIndex, setExpandedAdditionalIndex] = React.useState<number>(0);
  const [additionalCompanies, setAdditionalCompanies] = React.useState<AdditionalCompany[]>(initialAdditionalCompanies);
  const [isAddAdditionalCnpjOpen, setIsAddAdditionalCnpjOpen] = React.useState(false);
  const [isEditResponsibleOpen, setIsEditResponsibleOpen] = React.useState(false);
  const [systemUsers, setSystemUsers] = React.useState<SystemUser[]>(initialSystemUsers);
  const [isSystemUserModalOpen, setIsSystemUserModalOpen] = React.useState(false);
  const [selectedSystemUserId, setSelectedSystemUserId] = React.useState<number | null>(null);
  const [systemUserDraft, setSystemUserDraft] = React.useState<SystemUserDraft>(emptySystemUserDraft);
  const [responsibleData, setResponsibleData] = React.useState<ResponsibleData>({
    nome: "Felipe Alves dos Santos",
    whatsapp: "47 99999-9999",
    email: "contato@kalisoft.tech",
  });
  const [responsibleDraft, setResponsibleDraft] = React.useState<ResponsibleData>(responsibleData);

  const handleOpenEditResponsible = () => {
    setResponsibleDraft(responsibleData);
    setIsEditResponsibleOpen(true);
  };

  const handleCloseEditResponsible = () => {
    setIsEditResponsibleOpen(false);
    setResponsibleDraft(responsibleData);
  };

  const handleSaveResponsible = () => {
    setResponsibleData(responsibleDraft);
    setIsEditResponsibleOpen(false);
  };

  const handleResponsibleDraftChange = (field: keyof ResponsibleData, value: string) => {
    setResponsibleDraft((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleOpenAddAdditionalCnpj = () => {
    setIsAddAdditionalCnpjOpen(true);
  };

  const handleAddAdditionalCnpj = (additionalCnpj: string) => {
    const newIndex = additionalCompanies.length;

    setAdditionalCompanies((prev) => [
      ...prev,
      {
        cnpj: additionalCnpj,
        nome: additionalCnpj,
        razaoSocial: "",
        nomeFantasia: "",
        email: "",
        telefone: "",
        endereco: "",
        municipio: "",
        estado: "",
        cnaePrincipal: "",
        usuariosAtivos: "0",
      },
    ]);

    setExpandedAdditionalIndex(newIndex);
  };

  const handleSystemUserDraftChange = (field: keyof SystemUserDraft, value: string) => {
    setSystemUserDraft((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCloseSystemUserModal = () => {
    setIsSystemUserModalOpen(false);
    setSelectedSystemUserId(null);
    setSystemUserDraft(emptySystemUserDraft);
  };

  const handleOpenNewSystemUser = () => {
    setSelectedSystemUserId(null);
    setSystemUserDraft(emptySystemUserDraft);
    setIsSystemUserModalOpen(true);
  };

  const handleOpenEditSystemUser = (user: SystemUser) => {
    setSelectedSystemUserId(user.id);
    setSystemUserDraft({
      nome: user.nome,
      email: user.email,
      perfil: user.perfil,
    });
    setIsSystemUserModalOpen(true);
  };

  const handleSaveSystemUser = () => {
    const nextDraft = {
      nome: systemUserDraft.nome.trim(),
      email: systemUserDraft.email.trim(),
      perfil: systemUserDraft.perfil.trim(),
    };
    if (!nextDraft.nome || !nextDraft.email || !nextDraft.perfil) return;

    if (selectedSystemUserId !== null) {
      setSystemUsers((prev) =>
        prev.map((user) =>
          user.id === selectedSystemUserId
            ? {
              ...user,
              ...nextDraft,
            }
            : user,
        ),
      );
    } else {
      setSystemUsers((prev) => {
        const nextId = prev.length > 0 ? Math.max(...prev.map((user) => user.id)) + 1 : 1;
        return [
          ...prev,
          {
            id: nextId,
            ...nextDraft,
            status: "Ativo",
          },
        ];
      });
    }

    handleCloseSystemUserModal();
  };

  const handlePrimaryActionClick = () => {
    if (activeTab === "usuarios") {
      handleOpenNewSystemUser();
    }
  };

  return (
    <div className={styles.container}>
      <TopHeaderBar title={"Configura\u00e7\u00f5es"} hasNotifications={false} />

      <div className={styles.contentWrapper}>
        <div className={styles.topControls}>
          <div className={styles.tabs}>
            <button
              type="button"
              className={`${styles.tabButton} ${activeTab === "dados" ? styles.tabButtonActive : ""}`}
              onClick={() => setActiveTab("dados")}
            >
              <FileText size={20} />
              DADOS DA EMPRESA
            </button>

            <button
              type="button"
              className={`${styles.tabButton} ${activeTab === "categorias" ? styles.tabButtonActive : ""}`}
              onClick={() => setActiveTab("categorias")}
            >
              <Bookmark size={20} />
              CATEGORIAS
            </button>

            <button
              type="button"
              className={`${styles.tabButton} ${activeTab === "usuarios" ? styles.tabButtonActive : ""}`}
              onClick={() => setActiveTab("usuarios")}
            >
              <Users size={20} />
              {"USU\u00c1RIOS DO SISTEMA"}
            </button>
          </div>

          <button type="button" className={styles.primaryActionButton} onClick={handlePrimaryActionClick}>
            {
              activeTab === "categorias"
                ? "NOVA CATEGORIA"
                : activeTab === "usuarios"
                  ? "NOVO USU\u00c1RIO"
                  : "CONTRATAR MAIS ACESSOS"
            }
          </button>
        </div>

        {activeTab === "dados" && (
          <>
            <section className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardHeaderTitle}>
                  <FileText size={20} />
                  <h2>Dados da minha empresa</h2>
                </div>
                <span className={styles.statusPillPrincipal}>CNPJ Principal</span>
              </div>

              <div className={styles.companyGrid}>
                <div className={styles.fieldGroup}>
                  <span className={styles.fieldLabel}>{"Raz\u00e3o social"}</span>
                  <span className={styles.fieldValue}>{company.razaoSocial}</span>
                </div>
                <div className={styles.fieldGroup}>
                  <span className={styles.fieldLabel}>Nome fantasia</span>
                  <span className={styles.fieldValue}>{company.nomeFantasia}</span>
                </div>
                <div className={styles.fieldGroup}>
                  <span className={styles.fieldLabel}>E-mail</span>
                  <span className={styles.fieldValue}>{company.email}</span>
                </div>
                <div className={styles.fieldGroup}>
                  <span className={styles.fieldLabel}>Telefone</span>
                  <span className={styles.fieldValue}>{company.telefone}</span>
                </div>

                <div className={styles.fieldGroup}>
                  <span className={styles.fieldLabel}>{"Endere\u00e7o"}</span>
                  <span className={styles.fieldValue}>{company.endereco}</span>
                </div>
                <div className={styles.fieldGroup}>
                  <span className={styles.fieldLabel}>{"Munic\u00edpio"}</span>
                  <span className={styles.fieldValue}>{company.municipio}</span>
                </div>
                <div className={styles.fieldGroup}>
                  <span className={styles.fieldLabel}>Estado</span>
                  <span className={styles.fieldValue}>{company.estado}</span>
                </div>
                <div className={styles.fieldGroup}>
                  <span className={styles.fieldLabel}>CNPJ</span>
                  <span className={styles.fieldValue}>{company.cnpj}</span>
                </div>

                <div className={styles.fieldGroup}>
                  <span className={styles.fieldLabel}>CNAE Principal</span>
                  <span className={styles.cnaeChip}>{company.cnaePrincipal}</span>
                </div>
                <div className={styles.fieldGroup}>
                  <span className={styles.fieldLabel}>Pacote contratado</span>
                  <span className={styles.fieldValueHighlight}>{company.pacoteContratado}</span>
                  <span className={styles.fieldValueHighlight}>{company.acessosEmUso}</span>
                </div>
                <div className={styles.fieldGroup}>
                  <span className={styles.fieldLabel}>{"Usu\u00e1rios ativos neste CNPJ"}</span>
                  <span className={styles.fieldValueHighlight}>{company.usuariosAtivos}</span>
                </div>
              </div>
            </section>

            <section className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardHeaderTitle}>
                  <FileText size={20} />
                  <h2>CNPJs adicionais</h2>
                </div>
                <button type="button" className={styles.secondaryActionButton} onClick={handleOpenAddAdditionalCnpj}>
                  <Plus size={20} />
                  Novo CNPJ adicional
                </button>
              </div>

              <div className={styles.additionalList}>
                {additionalCompanies.map((item, idx) => {
                  const expanded = idx === expandedAdditionalIndex;

                  return (
                    <div key={item.cnpj} className={styles.additionalItem}>
                      <div className={styles.additionalHeader}>
                        <div className={styles.additionalCompanyInfo}>
                          <span className={styles.additionalName}>{item.nome}</span>
                          {!expanded && <span className={styles.additionalCnpj}>{item.cnpj}</span>}
                        </div>

                        <div className={styles.additionalHeaderRight}>
                          <span className={styles.statusPillAdditional}>CNPJ Adicional</span>
                          <button
                            type="button"
                            className={styles.toggleButton}
                            onClick={() => setExpandedAdditionalIndex(expanded ? -1 : idx)}
                          >
                            {expanded ? "Ver menos" : "Ver mais"}
                            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                        </div>
                      </div>

                      {expanded && (
                        <>
                          <div className={styles.additionalGrid}>
                            <div className={styles.fieldGroup}>
                              <span className={styles.fieldLabel}>{"Raz\u00e3o social"}</span>
                              <span className={styles.fieldValue}>{item.razaoSocial}</span>
                            </div>
                            <div className={styles.fieldGroup}>
                              <span className={styles.fieldLabel}>Nome fantasia</span>
                              <span className={styles.fieldValue}>{item.nomeFantasia}</span>
                            </div>
                            <div className={styles.fieldGroup}>
                              <span className={styles.fieldLabel}>E-mail</span>
                              <span className={styles.fieldValue}>{item.email}</span>
                            </div>
                            <div className={styles.fieldGroup}>
                              <span className={styles.fieldLabel}>Telefone</span>
                              <span className={styles.fieldValue}>{item.telefone}</span>
                            </div>

                            <div className={styles.fieldGroup}>
                              <span className={styles.fieldLabel}>{"Endere\u00e7o"}</span>
                              <span className={styles.fieldValue}>{item.endereco}</span>
                            </div>
                            <div className={styles.fieldGroup}>
                              <span className={styles.fieldLabel}>{"Munic\u00edpio"}</span>
                              <span className={styles.fieldValue}>{item.municipio}</span>
                            </div>
                            <div className={styles.fieldGroup}>
                              <span className={styles.fieldLabel}>Estado</span>
                              <span className={styles.fieldValue}>{item.estado}</span>
                            </div>
                            <div className={styles.fieldGroup}>
                              <span className={styles.fieldLabel}>CNPJ</span>
                              <span className={styles.fieldValue}>{item.cnpj}</span>
                            </div>

                            <div className={styles.fieldGroup}>
                              <span className={styles.fieldLabel}>CNAE Principal</span>
                              <span className={styles.cnaeChip}>{item.cnaePrincipal}</span>
                            </div>
                            <div className={styles.fieldGroup}>
                              <span className={styles.fieldLabel}>{"Usu\u00e1rios ativos neste CNPJ"}</span>
                              <span className={styles.fieldValueHighlight}>{item.usuariosAtivos}</span>
                            </div>
                          </div>

                          <div className={styles.additionalActions}>
                            <button type="button" className={styles.smallActionButtonPrimary}>
                              Editar
                            </button>
                            <button type="button" className={styles.smallActionButtonSecondary}>
                              Inativar
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            <section className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardHeaderTitle}>
                  <UserRound size={20} />
                  <div className={styles.responsavelTitleWrap}>
                    <h2>{"Dados do respons\u00e1vel legal"}</h2>
                    <p>{"Respons\u00e1vel por assinar os contratos com os Parceiros PJ"}</p>
                  </div>
                </div>

                <button
                  type="button"
                  className={styles.iconButton}
                  aria-label={"Editar respons\u00e1vel legal"}
                  onClick={handleOpenEditResponsible}
                >
                  <Pencil size={14} />
                </button>
              </div>

              <div className={styles.responsavelGrid}>
                <div className={styles.fieldGroup}>
                  <span className={styles.fieldLabel}>Nome completo</span>
                  <span className={styles.fieldValue}>{responsibleData.nome}</span>
                </div>
                <div className={styles.fieldGroup}>
                  <span className={styles.fieldLabel}>WhatsApp</span>
                  <span className={styles.fieldValue}>{responsibleData.whatsapp}</span>
                </div>
                <div className={styles.fieldGroup}>
                  <span className={styles.fieldLabel}>E-mail</span>
                  <span className={styles.fieldValue}>{responsibleData.email}</span>
                </div>
              </div>
            </section>
          </>
        )}

        {activeTab === "categorias" && (
          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardHeaderTitle}>
                <Bookmark size={20} />
                <h2>Categorias da empresa</h2>
              </div>
              </div>

            <div className={styles.categoryList}>
              {categories.map((categoria) => (
                <span key={categoria} className={styles.categoryChip}>
                  {categoria}
                </span>
              ))}
            </div>
          </section>
        )}

        {activeTab === "usuarios" && (
          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardHeaderTitle}>
                <Users size={20} />
                <h2>{"Usu\u00e1rios do sistema"}</h2>
              </div>
            </div>

            <div className={styles.usersTable}>
              <div className={styles.usersTableHeader}>
                <span>Nome</span>
                <span>E-mail</span>
                <span>Perfil</span>
                <span>Status</span>
              </div>

              {systemUsers.map((usuario) => (
                <div
                  key={usuario.id}
                  className={`${styles.usersTableRow} ${styles.usersTableRowClickable}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleOpenEditSystemUser(usuario)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      handleOpenEditSystemUser(usuario);
                    }
                  }}
                >
                  <span>{usuario.nome}</span>
                  <span>{usuario.email}</span>
                  <span>{usuario.perfil}</span>
                  <span className={usuario.status === "Ativo" ? styles.userStatusActive : styles.userStatusInactive}>{usuario.status}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
      <EditResponsibleModal
        isOpen={isEditResponsibleOpen}
        onClose={handleCloseEditResponsible}
        onSave={handleSaveResponsible}
        data={responsibleDraft}
        onChange={handleResponsibleDraftChange}
      />

      <AddAdditionalCnpjModal
        isOpen={isAddAdditionalCnpjOpen}
        onClose={() => setIsAddAdditionalCnpjOpen(false)}
        onAdd={handleAddAdditionalCnpj}
      />

      <SystemUserModal
        isOpen={isSystemUserModalOpen}
        isEditing={selectedSystemUserId !== null}
        data={systemUserDraft}
        onClose={handleCloseSystemUserModal}
        onSave={handleSaveSystemUser}
        onChange={handleSystemUserDraftChange}
      />
    </div>
  );
}
