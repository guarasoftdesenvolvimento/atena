"use client";

import React from "react";
import Link from "next/link";
import {
  ChevronLeft,
  FolderSearch,
  ChevronDown,
  LayoutDashboard,
  Mail,
  History,
  FileText,
  Download,
  Bell,
  Building2,
  Copy,
  Edit2,
  PhoneCall,
  Wallet,
  Bookmark,
  X,
  CheckCircle2,
  ClipboardList,
  Circle,
  Calendar,
  User,
  CloudDownload,
  Cloud,
  Folder,
  Paperclip,
  Plus,
  MoreVertical,
  CircleDollarSign,
  Clock,
  FolderOpen,
  ExternalLink,
  XCircle,
  ArrowLeft,
  ChevronRight,
  ChevronUp,
  RefreshCcw
} from "lucide-react";
import backofficeStyles from "../../../backoffice/backoffice.module.css";
import TopHeaderBar from "../../components/TopHeaderBar";
import styles from "../detalhes.module.css";

function EditContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.editModalHeader}>
          <div className={styles.headerTitleGroup}>
            <FolderSearch size={24} className="text-[#345070]" />
            <h2 className={styles.modalSectionTitle}>Editar dados de contato</h2>
          </div>
          <div className={styles.closeContainer} onClick={onClose}>
            <X size={16} />
          </div>
        </div>

        <div className={styles.editModalBody}>
          <div className={styles.inputFieldGroup}>
            <label className={styles.inputLabel}>Nome completo do responsável</label>
            <input 
              className={`${styles.modalInput} ${styles.modalInputActive}`} 
              type="text" 
              defaultValue="Felipe Alves dos Santos" 
            />
          </div>
          <div className={styles.inputFieldGroup}>
            <label className={styles.inputLabel}>WhatsApp</label>
            <input 
              className={styles.modalInput} 
              type="text" 
              defaultValue="47 99999-9999" 
            />
          </div>
          <div className={styles.inputFieldGroup}>
            <label className={styles.inputLabel}>E-mail</label>
            <input 
              className={styles.modalInput} 
              type="text" 
              defaultValue="contato@kalisoft.tech" 
            />
          </div>
        </div>

        <div className={styles.editModalFooter}>
          <button className={styles.btnCancel} onClick={onClose}>
            CANCELAR
          </button>
          <button className={styles.btnSave}>
            <CheckCircle2 size={20} />
            SALVAR
          </button>
        </div>
      </div>
    </div>
  );
}

function EditBankingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.editModalHeader}>
          <div className={styles.headerTitleGroup}>
            <Wallet size={24} className="text-[#345070]" />
            <h2 className={styles.modalSectionTitle}>Editar dados bancários</h2>
          </div>
          <div className={styles.closeContainer} onClick={onClose}>
            <X size={16} />
          </div>
        </div>

        <div className={styles.editModalBody}>
          <div className={styles.inputFieldGroup}>
            <label className={styles.inputLabel}>Chave Pix tipo (CNPJ)</label>
            <input 
              className={`${styles.modalInput} ${styles.modalInputActive}`} 
              type="text" 
              defaultValue="38.300.972/0001-11" 
            />
            <p className={styles.infoLabel} style={{ marginTop: 4 }}>
              Chave do tipo <strong>CNPJ é obrigatório para segurança jurídica.</strong>
            </p>
          </div>
        </div>

        <div className={styles.editModalFooter}>
          <button className={styles.btnCancel} onClick={onClose}>
            CANCELAR
          </button>
          <button className={styles.btnSave}>
            <CheckCircle2 size={20} />
            SALVAR
          </button>
        </div>
      </div>
    </div>
  );
}

function EditCategoriesModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.editModalHeader}>
          <div className={styles.headerTitleGroup}>
            <Bookmark size={24} className="text-[#345070]" />
            <h2 className={styles.modalSectionTitle}>Mudar categoria</h2>
          </div>
          <div className={styles.closeContainer} onClick={onClose}>
            <X size={16} />
          </div>
        </div>

        <div className={styles.editModalBody}>
          <div className={styles.inputFieldGroup}>
            <label className={styles.inputLabel}>Nome da categoria</label>
            <div className={styles.selectionInput}>
              <div className={styles.selectionPills}>
                <div className={`${styles.selectionPill} ${styles.pillOrange}`}>
                  Freelancer
                  <div className={styles.selectionPillX}><X size={10} /></div>
                </div>
                <div className={`${styles.selectionPill} ${styles.pillPurple}`}>
                  Front-end
                  <div className={styles.selectionPillX}><X size={10} /></div>
                </div>
                <div className={`${styles.selectionPill} ${styles.pillRed}`}>
                  Time de Design
                  <div className={styles.selectionPillX}><X size={10} /></div>
                </div>
              </div>
              <ChevronDown size={20} className="text-[#345070]" />
            </div>
          </div>
        </div>

        <div className={styles.editModalFooter}>
          <button className={styles.btnCancel} onClick={onClose}>
            CANCELAR
          </button>
          <button className={styles.btnSave}>
            <CheckCircle2 size={20} />
            SALVAR
          </button>
        </div>
      </div>
    </div>
  );
}

function ContractModal({ isOpen, onClose, type }: { isOpen: boolean; onClose: () => void; type: "contrato" | "aditivo" }) {
  const [selectedCats, setSelectedCats] = React.useState(["Freelancer", "Front-end"]);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [vigenciaInicial, setVigenciaInicial] = React.useState("");
  const [vigenciaFinal, setVigenciaFinal] = React.useState("");
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  if (!isOpen) return null;

  const formatDate = (value: string) => {
    const v = value.replace(/\D/g, '').slice(0, 8);
    if (v.length >= 5) return `${v.slice(0, 2)}/${v.slice(2, 4)}/${v.slice(4)}`;
    if (v.length >= 3) return `${v.slice(0, 2)}/${v.slice(2)}`;
    return v;
  };

  const toggleCat = (cat: string) => {
    if (selectedCats.includes(cat)) {
      setSelectedCats(selectedCats.filter(c => c !== cat));
    } else {
      setSelectedCats([...selectedCats, cat]);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} style={{ width: '1000px', maxWidth: '95vw', padding: 0, overflow: 'visible' }}>
        {/* Header */}
        <div className={styles.editModalHeader}>
          <div className={styles.headerTitleGroup}>
            <FolderOpen size={24} className="text-[#345070]" />
            <h2 className={styles.modalSectionTitle} style={{ margin: 0, fontSize: '16px' }}>
              {type === "contrato" ? "Novo contrato" : "Novo aditivo"}
            </h2>
          </div>
          <div className={styles.closeContainer} onClick={onClose} style={{ width: '24px', height: '24px' }}>
            <X size={16} />
          </div>
        </div>

        {/* Body */}
        <div className={styles.modalBody} style={{ padding: 0, display: 'flex', flexDirection: 'row', height: 'auto', background: '#fff' }}>
          {/* Options Sidebar */}
          <div style={{ width: '360px', padding: '20px', borderRight: '1px solid #dfe8ff', display: 'flex', flexDirection: 'column', gap: '20px' }}>
             {/* Parceiro */}
             <div className={styles.inputGroup}>
                <label className={styles.inputLabel} style={{ display: 'block', marginBottom: '4px' }}>Parceiro PJ</label>
                <div style={{ background: '#f5f7fa', border: '1px solid #e9eef5', borderRadius: '12px', padding: '12px' }}>
                   <p className={styles.detailValueSmall} style={{ fontSize: '16px', margin: 0 }}>Felipe Alves dos Santos</p>
                </div>
             </div>

             {/* Categorias */}
             <div className={styles.inputFieldGroup}>
                <label className={styles.inputLabel}>Categorias deste contrato</label>
                <div className={styles.selectionInput} style={{ cursor: 'pointer', position: 'relative' }} onClick={() => setIsDropdownOpen(!isDropdownOpen)} ref={dropdownRef}>
                   <div className={styles.selectionPills}>
                      {selectedCats.map(cat => (
                        <div key={cat} className={`${styles.selectionPill} ${cat === "Freelancer" ? styles.pillOrange : styles.pillPurple}`}>
                           {cat}
                           <div className={styles.selectionPillX} onClick={(e) => { e.stopPropagation(); toggleCat(cat); }}><X size={10} /></div>
                        </div>
                      ))}
                   </div>
                   <ChevronDown size={20} className="text-[#8f9092]" />
                   
                   {isDropdownOpen && (
                     <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#fff', border: '1px solid #e9eef5', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 10, marginTop: '4px', padding: '8px' }}>
                        {["Backend", "UI/UX", "Mobile", "Time de Design"].map(opt => (
                          <div 
                            key={opt} 
                            style={{ padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', backgroundColor: selectedCats.includes(opt) ? '#f5f7fa' : 'transparent' }}
                            onClick={(e) => { e.stopPropagation(); toggleCat(opt); }}
                          >
                            <p className={styles.detailLabel} style={{ margin: 0, color: '#3d3e41' }}>{opt}</p>
                          </div>
                        ))}
                     </div>
                   )}
                </div>
             </div>

             {/* Pagamento */}
             <div className={styles.inputFieldGroup}>
                <label className={styles.inputLabel}>Dia de pagamento</label>
                <input 
                  type="text" 
                  className={styles.modalInput}
                  placeholder="10" 
                  defaultValue="10" 
                />
             </div>

             {/* Vigências */}
             <div style={{ display: 'flex', gap: '20px' }}>
                <div className={styles.inputFieldGroup} style={{ flex: 1 }}>
                   <label className={styles.inputLabel}>Vigência inicial</label>
                   <div style={{ position: 'relative' }}>
                      <input 
                        type="text" 
                        className={styles.modalInput} 
                        style={{ width: '100%', paddingRight: '24px' }} 
                        placeholder="00/00/00" 
                        value={vigenciaInicial}
                        onChange={(e) => setVigenciaInicial(formatDate(e.target.value))}
                      />
                      <ChevronDown size={18} style={{ position: 'absolute', right: 12, top: 11, color: '#8f9092' }} />
                   </div>
                </div>
                <div className={styles.inputFieldGroup} style={{ flex: 1 }}>
                   <label className={styles.inputLabel}>Vigência final</label>
                   <div style={{ position: 'relative' }}>
                      <input 
                        type="text" 
                        className={styles.modalInput} 
                        style={{ width: '100%', paddingRight: '24px' }} 
                        placeholder="00/00/00" 
                        value={vigenciaFinal}
                        onChange={(e) => setVigenciaFinal(formatDate(e.target.value))}
                      />
                      <ChevronDown size={18} style={{ position: 'absolute', right: 12, top: 11, color: '#8f9092' }} />
                   </div>
                </div>
             </div>

             {/* Valor e Horas */}
             <div style={{ display: 'flex', gap: '20px' }}>
                <div className={styles.inputFieldGroup} style={{ flex: 1 }}>
                   <label className={styles.inputLabel}>Valor hora em reais</label>
                   <input type="text" className={styles.modalInput} style={{ width: '100%' }} placeholder="R$ 10,00" />
                </div>
                <div className={styles.inputFieldGroup} style={{ flex: 1 }}>
                   <label className={styles.inputLabel}>Horas mensais</label>
                   <input type="text" className={styles.modalInput} style={{ width: '100%' }} placeholder="176" />
                </div>
             </div>

             {/* Descrição */}
             <div className={styles.inputFieldGroup}>
                <label className={styles.inputLabel}>Descrição do serviço prestado</label>
                <textarea 
                   className={styles.modalInput}
                   style={{ width: '100%', height: '90px', padding: '10px 12px', resize: 'none' }}
                   placeholder="Desenvolvimento de software e aplicativos"
                />
             </div>
          </div>

          {/* Preview Panel */}
          <div style={{ flex: 1, padding: '20px', backgroundColor: '#ffffff' }}>
             <div style={{ 
                border: '1px solid #e9eef5', 
                borderRadius: '6px', 
                padding: '24px', 
                height: '560px', 
                overflowY: 'auto',
                fontSize: '11px',
                lineHeight: '1.5',
                color: '#000'
             }}>
                <p style={{ fontWeight: 700, marginBottom: '16px' }}>
                  {type === "contrato" ? "CONTRATO DE PRESTAÇÃO DE SERVIÇOS" : "ADITIVO CONTRATUAL DE PRESTAÇÃO DE SERVIÇOS"}
                </p>
                <p style={{ marginBottom: '16px' }}>
                  <span style={{ fontWeight: 700 }}>{"{{contratante_razao_social}}"}</span>, pessoa jurídica de direito privado, inscrita no CNPJ/MF sob nº <span style={{ fontWeight: 700 }}>{"{{contratante_cnpj}}"}</span>, com sede na Rua <span style={{ fontWeight: 700 }}>{"{{contratante_endereco}}"}</span>, na cidade de <span style={{ fontWeight: 700 }}>{"{{contratante_cidade}}"}</span> – {"{{contratante_estado}}"}, neste ato representada na forma de seus atos constitutivos por {"{{contratante_representante_nome}}"}, de CPF nº {"{{contratante_representante_cpf}}"}, e.mail {"{{contratante_representante_email}}"} e sob nº de telefone para contato {"{{contratante_telefone}}"}, doravante denominado simplesmente “CONTRATANTE”; e
                </p>
                <p style={{ marginBottom: '16px' }}>
                   <span style={{ fontWeight: 700 }}>{"{{prestador_razao_social}}"}</span>, pessoa jurídica de direito privado, inscrita no CNPJ/MF sob nº <span style={{ fontWeight: 700 }}>{"{{prestador_cnpj}}"}</span>, com sede na Rua <span style={{ fontWeight: 700 }}>{"{{prestador_endereco}}"}</span>, neste ato representada na forma de seus atos constitutivos por {"{{prestador_representante_nome}}"}, sob nº de CPF {"{{prestador_representante_cpf}}"}, e.mail {"{{prestador_representante_email}}"} e sob nº de telefone para contato {"{{prestador_telefone}}"}, doravante denominada simplesmente “CONTRATADA”.
                </p>
                <p>
                  As Partes declaram e concordam que a assinatura do presente termo poderá ser realizada eletronicamente, devendo produzir os mesmos efeitos legais que uma via impressa assinada, nos termos da Lei nº 13.874, de 20 de setembro de 2019, conforme alterada ao longo do tempo, e do Decreto nº 10.278, de 18 de março de 2020, conforme alterado ao longo do tempo, bem como o art. 784, §4º do CPC, concordando ainda em não questionar sua validade, conteúdo, autenticidade e integridade.
                </p>
             </div>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.editModalFooter}>
           <button 
              className={styles.btnCancel}
              onClick={onClose}
           >
              CANCELAR
           </button>
           <button 
              className={styles.btnSave}
              style={{ padding: '0 24px' }}
           >
              <CheckCircle2 size={24} color="white" />
              {type === "contrato" ? "CRIAR CONTRATO" : "CRIAR ADITIVO"}
           </button>
        </div>
      </div>
    </div>
  );
}

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

  const [activeTab, setActiveTab] = React.useState("Dados gerais");
  const [isEditContactOpen, setIsEditContactOpen] = React.useState(false);
  const [isEditBankingOpen, setIsEditBankingOpen] = React.useState(false);
  const [isEditCategoriesOpen, setIsEditCategoriesOpen] = React.useState(false);
  const [openPopoverId, setOpenPopoverId] = React.useState<string | null>(null);
  const [selectedContractId, setSelectedContractId] = React.useState<string | null>(null);
  const [expandedAddendumId, setExpandedAddendumId] = React.useState<string | null>(null);
  const [isContractModalOpen, setIsContractModalOpen] = React.useState(false);
  const [modalType, setModalType] = React.useState<"contrato" | "aditivo">("contrato");

  return (
    <div className={styles.container} data-partner-id={partnerId}>
      {/* Header Identico ao da listagem */}
      <TopHeaderBar title="Parceiros PJ" hasNotifications={false} />

      <main className={styles.contentWrapper}>
        <div className={styles.breadcrumbRow}>
          <Link href="/empresa/parceiros" className={styles.backButton}>
            <ChevronLeft size={20} />
          </Link>
          <h2 className={styles.pageTitle} style={{ fontSize: '18px', margin: 0 }}>Voltar</h2>
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

          <div className={styles.tabsRow}>
            <div
              className={`${styles.tab} ${activeTab === "Dados gerais" ? styles.tabActive : ""}`}
              onClick={() => setActiveTab("Dados gerais")}
            >
              <LayoutDashboard size={20} />
              Dados Gerais
            </div>
            <div 
              className={`${styles.tab} ${activeTab === "Atividades" ? styles.tabActive : ""}`}
              onClick={() => setActiveTab("Atividades")}
            >
              <History size={20} />
              Atividades
            </div>
            <div 
              className={`${styles.tab} ${activeTab === "Contratos" ? styles.tabActive : ""}`}
              onClick={() => setActiveTab("Contratos")}
            >
              <FileText size={20} />
              Contratos
            </div>
            <div 
              className={`${styles.tab} ${activeTab === "Exportar registros" ? styles.tabActive : ""}`}
              onClick={() => setActiveTab("Exportar registros")}
            >
              <Download size={20} />
              Exportar registros
            </div>
          </div>
        </div>

        <div className={styles.gridContent}>
          {activeTab === "Dados gerais" ? (
            <>
              {/* Card: Dados da empresa */}
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <LayoutDashboard size={24} className="text-[#345070]" />
                  <div className="flex flex-col gap-1">
                    <h3 className={styles.cardTitle}>Dados da empresa</h3>
                  </div>
                </div>

                <div className={styles.dataSection}>
                  <div className={styles.infoRow}>
                    <div className={styles.infoItem} style={{ width: 240 }}>
                      <span className={styles.infoLabel}>Razão social</span>
                      <p className={styles.infoValue}>Kalisoft.tech</p>
                    </div>
                    <div className={styles.infoItem} style={{ width: 160 }}>
                      <span className={styles.infoLabel}>CNPJ</span>
                      <p className={styles.infoValue}>38.300.972/0001-19</p>
                    </div>
                    <div className={styles.infoItem} style={{ width: 180 }}>
                      <span className={styles.infoLabel}>E-mail</span>
                      <p className={styles.infoValue}>contato@kalisoft.tech</p>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Telefone</span>
                      <p className={styles.infoValue}>47 99999-9999</p>
                    </div>
                  </div>

                  <div className={styles.infoRow}>
                    <div className={styles.infoItem} style={{ width: 240 }}>
                      <span className={styles.infoLabel}>Endereço</span>
                      <p className={styles.infoValue}>Rua XV de Novembro, nº 1457</p>
                    </div>
                    <div className={styles.infoItem} style={{ width: 160 }}>
                      <span className={styles.infoLabel}>Município</span>
                      <p className={styles.infoValue}>Blumenau</p>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Estado</span>
                      <p className={styles.infoValue}>Santa Catarina</p>
                    </div>
                  </div>

                  <div className={styles.infoRow}>
                    <div className={styles.infoItem} style={{ width: 240 }}>
                      <span className={styles.infoLabel}>CNAE Principal</span>
                      <div className={styles.cnaePill}>62.01-5/01</div>
                    </div>
                    <div className={styles.infoItem} style={{ flex: 1 }}>
                      <span className={styles.infoLabel} style={{ marginBottom: 4, display: 'block' }}>CNAEs Secundários</span>
                      <div className={styles.cnaeList}>
                        <div className={styles.cnaePill}>62.01-5/02</div>
                        <div className={styles.cnaePill}>62.02-3/00</div>
                        <div className={styles.cnaePill}>62.02-3/00</div>
                        <div className={styles.cnaePill}>62.02-3/00</div>
                        <div className={styles.cnaePill}>62.02-3/00</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Grid: Contato, Bancário, Categorias */}
              <div className={styles.bottomGrid}>
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <PhoneCall size={24} className="text-[#345070]" />
                    <div className="flex flex-col gap-1">
                      <h3 className={styles.cardTitle}>Dados de contato</h3>
                      <p className={styles.cardDescription}>Esses são os dados de quem irá assinar contratos.</p>
                    </div>
                    <button className={styles.editButton} onClick={() => setIsEditContactOpen(true)}>
                      <Edit2 size={16} />
                    </button>
                  </div>

                  <div className={styles.itemsContainer} style={{ marginTop: 8 }}>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Responsável</span>
                      <p className={styles.infoValue}>Felipe Alves dos Santos</p>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>WhatsApp</span>
                      <p className={styles.infoValue}>47 99999-9999</p>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>E-mail</span>
                      <p className={styles.infoValue}>contato@kalisoft.tech</p>
                    </div>
                  </div>
                </div>

                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <Wallet size={24} className="text-[#345070]" />
                    <div className="flex flex-col gap-1">
                      <h3 className={styles.cardTitle}>Dados bancários</h3>
                      <p className={styles.cardDescription}>Utilize chave PIX do tipo CNPJ.</p>
                    </div>
                    <button className={styles.editButton} onClick={() => setIsEditBankingOpen(true)}>
                      <Edit2 size={16} />
                    </button>
                  </div>

                  <div className={styles.itemsContainer} style={{ marginTop: 8 }}>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Titular da conta</span>
                      <p className={styles.infoValue}>Felipe Alves dos Santos</p>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Chave PIX tipo cnpj:</span>
                      <div className={styles.pixRow}>
                        <p className={styles.infoValue}>38300973000119</p>
                        <div className={styles.copyBox}>
                          <Copy size={12} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.card} style={{ minWidth: 243 }}>
                  <div className={styles.cardHeader}>
                    <Bookmark size={24} className="text-[#345070]" />
                    <div className="flex flex-col gap-1">
                      <h3 className={styles.cardTitle}>Categorias</h3>
                      <p className={styles.cardDescription}>Selecione as categorias</p>
                    </div>
                    <button className={styles.editButton} onClick={() => setIsEditCategoriesOpen(true)}>
                      <Edit2 size={16} />
                    </button>
                  </div>

                  <div className={styles.categoryList}>
                    <span className={`${styles.categoryPill} ${styles.catGreen}`}>Freelancer</span>
                    <span className={`${styles.categoryPill} ${styles.catOrange}`}>Front-end</span>
                    <span className={`${styles.categoryPill} ${styles.catPurple}`}>Time de Design</span>
                    <span className={`${styles.categoryPill} ${styles.catYellow}`}>Wordpress</span>
                  </div>
                </div>
              </div>
            </>
          ) : activeTab === "Atividades" ? (
            <div className={styles.card}>
              <div className={styles.activityHeader}>
                <ClipboardList size={24} className="text-[#345070]" />
                <div className={styles.activityTitleGroup}>
                  <h3 className={styles.activityTitle}>Histórico de atividades</h3>
                  <p className={styles.activityDesc}>Veja aqui todas as movimentações referentes ao parceiro PJ selecionado.</p>
                </div>
              </div>

              <div className={styles.timelineContainer}>
                {/* Item 1 */}
                <div className={styles.timelineItem}>
                  <div className={styles.timelineMarker}>
                    <Circle size={14} className={styles.markerCircle} fill="currentColor" />
                    <div className={styles.markerLine}></div>
                  </div>
                  <div className={styles.timelineCard}>
                    <p className={styles.activitySummary}>
                      <strong>Comprovante de pagamento #CP-0002</strong> anexado ao <strong>Contrato #12366</strong>
                    </p>
                    <div className={styles.activityMetaRow}>
                      <div className={styles.activityMetaItem}>
                        <Calendar size={14} /> 24/02/2025 às 16:42
                      </div>
                      <div className={styles.activityMetaItem}>
                        <User size={14} /> Por <span className={styles.metaLink}>Guarásoft</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Item 2 */}
                <div className={styles.timelineItem}>
                  <div className={styles.timelineMarker}>
                    <Circle size={14} className={styles.markerCircle} fill="currentColor" />
                    <div className={styles.markerLine}></div>
                  </div>
                  <div className={styles.timelineCard}>
                    <p className={styles.activitySummary}>
                      <strong>Nota fiscal #12365</strong> emitida e enviada
                    </p>
                    <div className={styles.activityMetaRow}>
                      <div className={styles.activityMetaItem}>
                        <Calendar size={14} /> 24/02/2025 às 16:42
                      </div>
                      <div className={styles.activityMetaItem}>
                        <User size={14} /> Por <span className={styles.metaLink}>Felipe Alves</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Item 3 */}
                <div className={styles.timelineItem}>
                  <div className={styles.timelineMarker}>
                    <Circle size={14} className={styles.markerCircle} fill="currentColor" />
                  </div>
                  <div className={styles.timelineCard}>
                    <p className={styles.activitySummary}>
                      Parceiro Felipe foi <strong>cadastrado</strong> com sucesso!
                    </p>
                    <div className={styles.activityMetaRow}>
                      <div className={styles.activityMetaItem}>
                        <Calendar size={14} /> 24/02/2025 às 16:42
                      </div>
                      <div className={styles.activityMetaItem}>
                        <User size={14} /> Por <span className={styles.metaLink}>Guarásoft</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === "Contratos" ? (
            <div className={selectedContractId ? styles.tabContentWrapper : styles.card}>
              {!selectedContractId ? (
                <>
                  <div className={`${styles.activityHeader} ${styles.headerWithAction}`}>
                    <div className={styles.activityTitleGroupRow}>
                      <FolderOpen size={24} className="text-[#345070]" />
                      <h3 className={styles.activityTitle}>Contratos</h3>
                    </div>
                    <button 
                      className={styles.createButton}
                      onClick={() => {
                        setModalType("contrato");
                        setIsContractModalOpen(true);
                      }}
                    >
                       <Plus size={20} /> Criar novo contrato
                    </button>
                  </div>

                  <div className={styles.contractsGrid}>
                    {/* Contrato 1 - Ativo */}
                    <div className={styles.contractCard}>
                      <div className={styles.contractCardHeader}>
                        <p className={styles.contractNumber}>
                          Contrato <span className={styles.contractNumberHighlight}>#001</span>
                        </p>
                        <div 
                          className={`${styles.moreButton} ${openPopoverId === "001" ? styles.moreButtonActive : ""}`} 
                          onClick={() => setOpenPopoverId(openPopoverId === "001" ? null : "001")}
                        >
                          <MoreVertical size={16} />
                        </div>
                        {openPopoverId === "001" && (
                          <div className={styles.popover}>
                            <div 
                              className={styles.popoverItem} 
                              onClick={() => {
                                setSelectedContractId("001");
                                setOpenPopoverId(null);
                              }}
                            >
                              <ExternalLink size={14} className="text-[#5c5e60]" />
                              <p className={styles.popoverText}>Visualizar</p>
                            </div>
                            <div className={styles.popoverItem}>
                              <CheckCircle2 size={14} className="text-[#1ba785]" />
                              <p className={styles.popoverText}>Concluir contrato</p>
                            </div>
                            <div className={styles.popoverItem}>
                              <XCircle size={14} className="text-[#ec4f4f]" />
                              <p className={styles.popoverText}>Cancelar contrato</p>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className={styles.contractCardBody}>
                        <p className={styles.contractType}>CONTRATO PRESTAÇÃO GERAL</p>
                        <div className={`${styles.statusBadge} ${styles.statusActive}`}>Ativo</div>
                        <div className={styles.contractDivider} />
                        <div className={styles.dateRow}>
                          <div className={styles.dateItem}>
                            <div className={styles.dateLabel}><Calendar size={12} /> Início:</div>
                            <p className={styles.dateValue}>26/05/2025</p>
                          </div>
                          <div className={styles.dateItem}>
                            <div className={styles.dateLabel}><Calendar size={12} /> Fim:</div>
                            <p className={styles.dateValue}>24/06/2025</p>
                          </div>
                        </div>
                        <div className={styles.valueBox}>
                          <div className={styles.valueLabelGroup}>
                            <CircleDollarSign size={12} /> Valor:
                          </div>
                          <p className={styles.valueAmount}>R$ 4.500,00</p>
                        </div>
                        <div className={styles.contractDivider} />
                        <div className={styles.contractFooter}>
                          <CheckCircle2 size={12} /> Assinado em: <strong className="ml-1">12/02/2025</strong>
                        </div>
                      </div>
                    </div>

                    {/* Contrato 2 - Aguardando Assinatura */}
                    <div className={styles.contractCard}>
                      <div className={styles.contractCardHeader}>
                        <p className={styles.contractNumber}>
                          Contrato <span className={styles.contractNumberHighlight}>#002</span>
                        </p>
                        <div 
                          className={`${styles.moreButton} ${openPopoverId === "002" ? styles.moreButtonActive : ""}`} 
                          onClick={() => setOpenPopoverId(openPopoverId === "002" ? null : "002")}
                        >
                          <MoreVertical size={16} />
                        </div>
                        {openPopoverId === "002" && (
                          <div className={styles.popover}>
                            <div 
                              className={styles.popoverItem}
                              onClick={() => {
                                setSelectedContractId("002");
                                setOpenPopoverId(null);
                              }}
                            >
                              <ExternalLink size={14} className="text-[#5c5e60]" />
                              <p className={styles.popoverText}>Visualizar</p>
                            </div>
                            <div className={styles.popoverItem}>
                              <CheckCircle2 size={14} className="text-[#1ba785]" />
                              <p className={styles.popoverText}>Concluir contrato</p>
                            </div>
                            <div className={styles.popoverItem}>
                              <XCircle size={14} className="text-[#ec4f4f]" />
                              <p className={styles.popoverText}>Cancelar contrato</p>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className={styles.contractCardBody}>
                        <p className={styles.contractType}>CONTRATO PRESTAÇÃO GERAL 2</p>
                        <div className={`${styles.statusBadge} ${styles.statusWaiting}`}>Aguardando assinatura</div>
                        <div className={styles.contractDivider} />
                        <div className={styles.dateRow}>
                          <div className={styles.dateItem}>
                            <div className={styles.dateLabel}><Calendar size={12} /> Início:</div>
                            <p className={styles.dateValue}>26/05/2025</p>
                          </div>
                          <div className={styles.dateItem}>
                            <div className={styles.dateLabel}><Calendar size={12} /> Fim:</div>
                            <p className={styles.dateValue}>24/06/2025</p>
                          </div>
                        </div>
                        <div className={styles.valueBox}>
                          <div className={styles.valueLabelGroup}>
                            <CircleDollarSign size={12} /> Valor:
                          </div>
                          <p className={styles.valueAmount}>R$ 4.500,00</p>
                        </div>
                        <div className={styles.contractDivider} />
                        <div className={`${styles.contractFooter} ${styles.contractFooterWaiting}`}>
                          <Clock size={12} /> Aguardando
                        </div>
                      </div>
                    </div>

                    {/* Contrato 3 - A vencer em 30 dias */}
                    <div className={styles.contractCard}>
                      <div className={styles.contractCardHeader}>
                        <p className={styles.contractNumber}>
                          Contrato <span className={styles.contractNumberHighlight}>#003</span>
                        </p>
                        <div 
                          className={`${styles.moreButton} ${openPopoverId === "003" ? styles.moreButtonActive : ""}`} 
                          onClick={() => setOpenPopoverId(openPopoverId === "003" ? null : "003")}
                        >
                          <MoreVertical size={16} />
                        </div>
                        {openPopoverId === "003" && (
                          <div className={styles.popover}>
                            <div 
                              className={styles.popoverItem}
                              onClick={() => {
                                setSelectedContractId("003");
                                setOpenPopoverId(null);
                              }}
                            >
                              <ExternalLink size={14} className="text-[#5c5e60]" />
                              <p className={styles.popoverText}>Visualizar</p>
                            </div>
                            <div className={styles.popoverItem}>
                              <CheckCircle2 size={14} className="text-[#1ba785]" />
                              <p className={styles.popoverText}>Concluir contrato</p>
                            </div>
                            <div className={styles.popoverItem}>
                              <XCircle size={14} className="text-[#ec4f4f]" />
                              <p className={styles.popoverText}>Cancelar contrato</p>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className={styles.contractCardBody}>
                        <p className={styles.contractType}>CONTRATO PRESTAÇÃO GERAL 3</p>
                        <div className={`${styles.statusBadge} ${styles.statusExpiring}`}>A vencer em 30 dias</div>
                        <div className={styles.contractDivider} />
                        <div className={styles.dateRow}>
                          <div className={styles.dateItem}>
                            <div className={styles.dateLabel}><Calendar size={12} /> Início:</div>
                            <p className={styles.dateValue}>26/05/2025</p>
                          </div>
                          <div className={styles.dateItem}>
                            <div className={styles.dateLabel}><Calendar size={12} /> Fim:</div>
                            <p className={styles.dateValue}>24/06/2025</p>
                          </div>
                        </div>
                        <div className={styles.valueBox}>
                          <div className={styles.valueLabelGroup}>
                            <CircleDollarSign size={12} /> Valor:
                          </div>
                          <p className={styles.valueAmount}>R$ 4.500,00</p>
                        </div>
                        <div className={styles.contractDivider} />
                        <div className={`${styles.contractFooter} ${styles.contractFooterWaiting}`}>
                          <Clock size={12} /> Aguardando
                        </div>
                      </div>
                    </div>

                    {/* Contrato 4 - Vencido */}
                    <div className={styles.contractCard}>
                      <div className={styles.contractCardHeader}>
                        <p className={styles.contractNumber}>
                          Contrato <span className={styles.contractNumberHighlight}>#004</span>
                        </p>
                        <div 
                          className={`${styles.moreButton} ${openPopoverId === "004" ? styles.moreButtonActive : ""}`} 
                          onClick={() => setOpenPopoverId(openPopoverId === "004" ? null : "004")}
                        >
                          <MoreVertical size={16} />
                        </div>
                        {openPopoverId === "004" && (
                          <div className={styles.popover}>
                            <div 
                              className={styles.popoverItem}
                              onClick={() => {
                                setSelectedContractId("004");
                                setOpenPopoverId(null);
                              }}
                            >
                              <ExternalLink size={14} className="text-[#5c5e60]" />
                              <p className={styles.popoverText}>Visualizar</p>
                            </div>
                            <div className={styles.popoverItem}>
                              <CheckCircle2 size={14} className="text-[#1ba785]" />
                              <p className={styles.popoverText}>Concluir contrato</p>
                            </div>
                            <div className={styles.popoverItem}>
                              <XCircle size={14} className="text-[#ec4f4f]" />
                              <p className={styles.popoverText}>Cancelar contrato</p>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className={styles.contractCardBody}>
                        <p className={styles.contractType}>CONTRATO PRESTAÇÃO GERAL 4</p>
                        <div className={`${styles.statusBadge} ${styles.statusExpired}`}>Vencido</div>
                        <div className={styles.contractDivider} />
                        <div className={styles.dateRow}>
                          <div className={styles.dateItem}>
                            <div className={styles.dateLabel}><Calendar size={12} /> Início:</div>
                            <p className={styles.dateValue}>26/05/2025</p>
                          </div>
                          <div className={styles.dateItem}>
                            <div className={styles.dateLabel}><Calendar size={12} /> Fim:</div>
                            <p className={styles.dateValue}>24/06/2025</p>
                          </div>
                        </div>
                        <div className={styles.valueBox}>
                          <div className={styles.valueLabelGroup}>
                            <CircleDollarSign size={12} /> Valor:
                          </div>
                          <p className={styles.valueAmount}>R$ 4.500,00</p>
                        </div>
                        <div className={styles.contractDivider} />
                        <div className={`${styles.contractFooter} ${styles.contractFooterWaiting}`}>
                          <Clock size={12} /> Aguardando
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className={styles.contractDetailsContainer}>
                  <div className={styles.detailsHeader}>
                    <div className={styles.backButtonDetails} onClick={() => setSelectedContractId(null)}>
                      <ArrowLeft size={16} />
                      Voltar
                    </div>
                    <div className={styles.detailsBreadcrumbs}>
                      Contratos
                      <span className={styles.bcSeparator}><ChevronRight size={16} /></span>
                      <span className={styles.bcActive}>Contrato #{selectedContractId}</span>
                    </div>
                  </div>

                  <div className={styles.detailsGrid}>
                    <div className={styles.detailsCard}>
                      <div className={styles.detailsCardHeader}>
                        <div className={styles.detailsTitleGroup}>
                          <div className={styles.detailsIconBox}><ClipboardList size={24} /></div>
                          <p className={styles.detailsTitle}>Dados do contrato</p>
                        </div>
                        <div className={styles.detailsValueHighlight}>
                          <CircleDollarSign size={16} />
                          Valor: <strong>R$ 4.500,00</strong>
                        </div>
                      </div>

                      <div className={styles.detailInfoGrid}>
                        <div className={styles.detailRow}>
                          <div className={styles.detailField}>
                            <p className={styles.detailLabel}>ID do contrato</p>
                            <p className={styles.detailValue}>
                              Contrato <span className={styles.contractIdHighlight}>#{selectedContractId}</span>
                            </p>
                          </div>
                          <div className={styles.detailField} style={{ alignItems: 'flex-end' }}>
                            <p className={styles.detailLabel}>Status do contrato</p>
                            <div className={`${styles.statusBadge} ${styles.statusExpiring}`}>A vencer em 30 dias</div>
                          </div>
                        </div>
                        <div className={styles.detailField}>
                          <p className={styles.detailLabel}>Modelo de contrato</p>
                          <p className={styles.detailValueSmall}>CONTRATO PRESTAÇÃO GERAL</p>
                        </div>
                        <div className={styles.detailRow} style={{ justifyContent: 'flex-start', gap: '50px' }}>
                          <div className={styles.detailField}>
                            <p className={styles.detailLabel}>Início:</p>
                            <p className={styles.detailValueSmall}>26/05/2025</p>
                          </div>
                          <div className={styles.detailField}>
                            <p className={styles.detailLabel}>Fim:</p>
                            <p className={styles.detailValueSmall}>24/06/2025</p>
                          </div>
                        </div>
                        <div className={styles.detailField}>
                          <p className={styles.detailLabel}>Categorias deste contrato</p>
                          <div className={styles.categoryTags}>
                            <span className={`${styles.tag} ${styles.tagGreen}`}>Freelancer</span>
                            <span className={`${styles.tag} ${styles.tagBlue}`}>Front-end</span>
                            <span className={`${styles.tag} ${styles.tagPurple}`}>Time de design</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={styles.detailsCard}>
                      <div className={styles.detailsCardHeader}>
                        <div className={styles.detailsTitleGroup}>
                          <div className={styles.detailsIconBox}><FileText size={24} /></div>
                          <p className={styles.detailsTitle}>Assinaturas do contrato</p>
                        </div>
                      </div>
                      <div className={styles.signaturesContainer}>
                        <div className={styles.sigHeaderSection}>
                          <div className={styles.sigStatusGroup}>
                            <p className={styles.signerName} style={{ fontSize: '16px' }}>Contrato <span className="font-bold">#{selectedContractId}</span></p>
                            <p className={styles.detailLabel}>Data de envio: 24/05/2025</p>
                          </div>
                          <div className={styles.sigDownloadBtn}><CloudDownload size={14} /> Baixar</div>
                        </div>
                        <div className={styles.sigStatusGroup} style={{ marginTop: '10px' }}>
                          <p className="font-bold text-[12px] text-[#527ca5] uppercase">Status das assinaturas</p>
                          <div className={styles.signatureList}>
                            <div className={styles.signatureItem}>
                              <div className={styles.sigStatusGroup}>
                                <p className={styles.signerName}>Guarasoft</p>
                                <p className={styles.signerEmail}>contato@guarasoft.com</p>
                              </div>
                              <div className={`${styles.sigStatusBadge} ${styles.sigAssinado}`}>Assinado</div>
                            </div>
                            <div className={styles.signatureItem}>
                              <div className={styles.sigStatusGroup}>
                                <p className={styles.signerName}>Felipe Alves</p>
                                <p className={styles.signerEmail}>felipe@alves.com</p>
                              </div>
                              <div className={styles.signatureActions}>
                                <div className={styles.sigActionLink}><RefreshCcw size={12} /> Reenviar</div>
                                <div className={styles.sigActionLink}><Copy size={12} /> Link</div>
                                <div className={`${styles.sigStatusBadge} ${styles.sigPendente}`}>Pendente</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Aditivos do Contrato */}
                    <div className={`${styles.detailsCard} ${styles.addendumCard}`} style={{ gridColumn: '1 / -1' }}>
                      <div className={styles.detailsCardHeader}>
                        <div className={styles.detailsTitleGroup}>
                          <div className={styles.detailsIconBox}><FileText size={24} /></div>
                          <p className={styles.detailsTitle}>Aditivos deste contrato</p>
                        </div>
                        <button 
                          className={styles.createButton} 
                          style={{ padding: '8px 12px' }}
                          onClick={() => {
                            setModalType("aditivo");
                            setIsContractModalOpen(true);
                          }}
                        >
                          <Plus size={16} /> Criar novo aditivo
                        </button>
                      </div>

                      <div className={styles.addendumItem} style={{ padding: '12px', gap: '16px', flexDirection: expandedAddendumId === "1" ? 'column' : 'row' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                          <div className={styles.sigStatusGroup}>
                            <p className={styles.signerName} style={{ fontSize: '16px' }}>Aditivo <span className="font-bold">#1</span></p>
                            <p className={styles.detailLabel}>Data de envio: 24/05/2025</p>
                          </div>
                          <div className={styles.signatureActions}>
                             <div className={styles.sigDownloadBtn}><CloudDownload size={14} /> Baixar</div>
                             <div 
                                className={styles.sigActionLink} 
                                style={{ color: '#527ca5' }}
                                onClick={() => setExpandedAddendumId(expandedAddendumId === "1" ? null : "1")}
                             >
                                {expandedAddendumId === "1" ? "Ver menos" : "Ver mais"} 
                                {expandedAddendumId === "1" ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                             </div>
                          </div>
                        </div>

                        {expandedAddendumId === "1" && (
                          <div className={styles.sigStatusSection} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                             <p className="font-bold text-[12px] text-[#527ca5] uppercase">Status das assinaturas</p>
                             <div className={styles.signatureList} style={{ gap: '12px' }}>
                                <div className={styles.signatureItem}>
                                  <div className={styles.sigStatusGroup}>
                                    <p className={styles.signerName}>Felipe Alves</p>
                                    <p className={styles.signerEmail}>felipe@alves.com</p>
                                  </div>
                                  <div className={`${styles.sigStatusBadge} ${styles.sigAssinado}`}>Assinado</div>
                                </div>
                                <div className={styles.signatureItem}>
                                  <div className={styles.sigStatusGroup}>
                                    <p className={styles.signerName}>Guarasoft</p>
                                    <p className={styles.signerEmail}>contato@guarasoft.com</p>
                                  </div>
                                  <div className={styles.signatureActions}>
                                    <div className={styles.sigActionLink} style={{ color: '#7c8efd' }}><Mail size={14} /> Reenviar e-mail</div>
                                    <div className={styles.sigActionLink} style={{ color: '#7c8efd' }}><Copy size={14} /> Copiar link</div>
                                    <div className={`${styles.sigStatusBadge} ${styles.sigPendente}`}>Pendente</div>
                                  </div>
                                </div>
                             </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : activeTab === "Exportar registros" ? (
            <div className={styles.card}>
              <div className={styles.activityHeader}>
                <CloudDownload size={24} className="text-[#345070]" />
                <div className={styles.activityTitleGroup}>
                  <h3 className={styles.activityTitle}>Exportar registros</h3>
                  <p className={styles.activityDesc}>Faça download de toda a documentação e tenha lastro jurídico a qualquer momento</p>
                </div>
              </div>

              <div className={styles.exportGrid}>
                {/* Histórico */}
                <div className={styles.exportCard}>
                  <div className={styles.exportCardHeader}>
                    <History size={24} className="text-[#345070]" />
                    <h4 className={styles.exportCardTitle}>Histórico de movimentação</h4>
                    <p className={styles.exportCardDesc}>
                      Faça download do histórico com todas as movimentações do <strong>Parceiro PJ.</strong>
                    </p>
                  </div>
                  <div className={styles.exportCardFooter}>
                    <button className={styles.downloadButton}>
                      <Cloud size={14} /> Baixar documentos
                    </button>
                  </div>
                </div>

                {/* Contratos */}
                <div className={styles.exportCard}>
                  <div className={styles.exportCardHeader}>
                    <Folder size={24} className="text-[#345070]" />
                    <h4 className={styles.exportCardTitle}>Contratos</h4>
                    <p className={styles.exportCardDesc}>
                      Baixe todos os contratos emitidos por este <strong>Parceiro PJ.</strong>
                    </p>
                  </div>
                  <div className={styles.exportCardFooter}>
                    <button className={styles.downloadButton}>
                      <Cloud size={14} /> Baixar documentos
                    </button>
                  </div>
                </div>

                {/* Notas fiscais */}
                <div className={styles.exportCard}>
                  <div className={styles.exportCardHeader}>
                    <FileText size={24} className="text-[#345070]" />
                    <h4 className={styles.exportCardTitle}>Notas fiscais</h4>
                    <p className={styles.exportCardDesc}>
                      Faça download de todas as notas fiscais emitidas pelo <strong>Parceiro PJ.</strong>
                    </p>
                  </div>
                  <div className={styles.exportCardFooter}>
                    <button className={styles.downloadButton}>
                      <Cloud size={14} /> Baixar documentos
                    </button>
                  </div>
                </div>

                {/* Comprovantes */}
                <div className={styles.exportCard}>
                  <div className={styles.exportCardHeader}>
                    <Paperclip size={24} className="text-[#345070]" />
                    <h4 className={styles.exportCardTitle}>Comprovantes de pagamento</h4>
                    <p className={styles.exportCardDesc}>
                      Faça download de todos os comprovantes emitidos pelo <strong>Parceiro PJ.</strong>
                    </p>
                  </div>
                  <div className={styles.exportCardFooter}>
                    <button className={styles.downloadButton}>
                      <Cloud size={14} /> Baixar documentos
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.card}>
              <p className={styles.cardDescription}>Conteúdo da aba {activeTab} em desenvolvimento...</p>
            </div>
          )}
        </div>
      </main>

      <EditContactModal 
        isOpen={isEditContactOpen} 
        onClose={() => setIsEditContactOpen(false)} 
      />
      <EditBankingModal 
        isOpen={isEditBankingOpen} 
        onClose={() => setIsEditBankingOpen(false)} 
      />
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
