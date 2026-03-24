"use client";

import React from "react";
import Link from "next/link";
import TopHeaderBar from "../components/TopHeaderBar";
import { Search, Plus, Filter, Info, ChevronRight, Bell, Building2, ChevronDown, ChevronDown as ArrowDown, ListFilter, FolderRoot, X, CheckCircle2, AlertCircle, QrCode, FileSearch } from "lucide-react";
import backofficeStyles from "../../backoffice/backoffice.module.css";
import styles from "./parceiros.module.css";

const partners = [
  {
    id: 1,
    name: "Felipe Alves dos Santos",
    cnpj: "38.300.973/0001-19",
    cadastro: "25/01/2025",
    risco: "regular",
    status: "ativo",
    categorias: [{ name: "Categoria 1", color: "Green" }, { name: "+1", color: "Plus" }]
  },
  {
    id: 2,
    name: "Felipe Alves dos Santos",
    cnpj: "38.300.973/0001-19",
    cadastro: "25/01/2025",
    risco: "regular",
    status: "ativo",
    categorias: [{ name: "Categoria 2", color: "Orange" }, { name: "+25", color: "Plus" }]
  },
  {
    id: 3,
    name: "Felipe Alves dos Santos",
    cnpj: "38.300.973/0001-19",
    cadastro: "25/01/2025",
    risco: "regular",
    status: "ativo",
    categorias: [{ name: "Categoria 3", color: "Purple" }]
  },
  {
    id: 4,
    name: "Felipe Alves dos Santos",
    cnpj: "38.300.973/0001-19",
    cadastro: "25/01/2025",
    risco: "em risco",
    status: "ativo",
    categorias: [{ name: "Categoria 4", color: "Red" }]
  },
  {
    id: 5,
    name: "Felipe Alves dos Santos",
    cnpj: "38.300.973/0001-19",
    cadastro: "25/01/2025",
    risco: "em risco",
    status: "ativo",
    categorias: [{ name: "Categoria 5", color: "Yellow" }, { name: "+1", color: "Plus" }]
  },
  {
    id: 6,
    name: "Felipe Alves dos Santos",
    cnpj: "38.300.973/0001-19",
    cadastro: "25/01/2025",
    risco: "irregular",
    status: "inativo",
    categorias: [{ name: "Categoria 1", color: "Green" }]
  },
  {
    id: 7,
    name: "Felipe Alves dos Santos",
    cnpj: "38.300.973/0001-19",
    cadastro: "25/01/2025",
    risco: "irregular",
    status: "ativo",
    categorias: [{ name: "Categoria 1", color: "Green" }]
  },
  {
    id: 8,
    name: "Felipe Alves dos Santos",
    cnpj: "38.300.973/0001-19",
    cadastro: "25/01/2025",
    risco: "irregular",
    status: "ativo",
    categorias: [{ name: "Categoria 1", color: "Green" }]
  }
];

interface FilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FinalSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function FinalSuccessModal({ isOpen, onClose }: FinalSuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} style={{ maxWidth: 440 }} onClick={e => e.stopPropagation()}>
        <div className={styles.qrContent} style={{ gap: 36, padding: '48px 40px 16px' }}>
          <div className={styles.illustrationBox}>
            <FileSearch size={100} strokeWidth={1} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
            <h2 className={styles.postSaveTitle} style={{ textAlign: 'center' }}>Aguardando confirmação do pagamento</h2>
            <p className={styles.postSaveDescription} style={{ color: '#8f9092', fontWeight: 500 }}>
              Assim que o pagamento for identificado, sua consulta será processada e os resultados enviados para o seu e-mail.
            </p>
          </div>
        </div>

        <div className={styles.stackedFooter}>
          <button className={`${styles.fullWidthButton} ${styles.primaryFullBtn}`} onClick={onClose}>
            <CheckCircle2 size={20} />
            IR PARA PARCEIRO PJ
          </button>
        </div>
      </div>
    </div>
  );
}

interface PaymentQrModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFinish: () => void;
}

function PaymentQrModal({ isOpen, onClose, onFinish }: PaymentQrModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} style={{ maxWidth: 400 }} onClick={e => e.stopPropagation()}>
        <div className={styles.qrContent}>
          <h2 className={styles.postSaveTitle}>Escaneie o QR para pagar a consulta</h2>
          <div className={styles.qrContainer}>
             <QrCode size={200} strokeWidth={1} />
          </div>
        </div>

        <div className={styles.stackedFooter}>
          <button className={`${styles.fullWidthButton} ${styles.primaryFullBtn}`} onClick={() => {
            onFinish();
            onClose();
          }}>
            <CheckCircle2 size={20} />
            JÁ REALIZEI O PAGAMENTO
          </button>
        </div>
      </div>
    </div>
  );
}

function SuccessUpsellModal({ isOpen, onClose, onConsult }: { isOpen: boolean; onClose: () => void; onConsult: () => void }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} style={{ maxWidth: 400 }} onClick={e => e.stopPropagation()}>
        <div className={styles.postSaveContent}>
          <div className={styles.largeIconCircle}>
            <Search size={32} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
            <h2 className={styles.postSaveTitle}>Consulte processos deste CNPJ por R$ 9,90</h2>
            <p className={styles.postSaveDescription}>
              Serão verificados se existem processos envolvendo o parceiro cadastrado, e o resultado da consulta estará disponível na página de consultas.
            </p>
          </div>
        </div>

        <div className={styles.stackedFooter}>
          <button className={`${styles.fullWidthButton} ${styles.secondaryFullBtn}`} onClick={onClose}>
            Não tenho interesse
          </button>
          <button className={`${styles.fullWidthButton} ${styles.primaryFullBtn}`} onClick={onConsult}>
            <CheckCircle2 size={20} />
            Consultar histórico processual
          </button>
        </div>
      </div>
    </div>
  );
}

function FilterSheet({ isOpen, onClose }: FilterSheetProps) {
  return (
    <div className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`} onClick={onClose}>
      <div className={`${styles.sheet} ${isOpen ? styles.sheetVisible : ''}`} onClick={e => e.stopPropagation()}>
        <div className={styles.sheetHeader}>
          <h2 className={styles.sheetTitle}>Filtros:</h2>
        </div>

        <div className={styles.sheetBody}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Filtrar por status</label>
            <div className={styles.inputField}>
              <span>Todos</span>
              <ArrowDown size={16} color="#737791" />
            </div>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Filtrar por categoria</label>
            <div className={styles.inputField}>
              <span>Todos</span>
              <ArrowDown size={16} color="#737791" />
            </div>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Filtrar por risco</label>
            <div className={styles.inputField}>
              <span>Todos</span>
              <ArrowDown size={16} color="#737791" />
            </div>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Filtrar por data</label>
            <div className={styles.dateRangeRow}>
              <div style={{ flex: 1 }}>
                <span className={styles.filterLabel} style={{ marginBottom: 4, display: 'block', color: '#8f9092' }}>De</span>
                <div className={styles.inputField}>
                  <span>01/01/2025</span>
                  <ArrowDown size={16} color="#737791" />
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <span className={styles.filterLabel} style={{ marginBottom: 4, display: 'block', color: '#8f9092' }}>Até</span>
                <div className={styles.inputField}>
                  <span>02/02/2025</span>
                  <ArrowDown size={16} color="#737791" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.sheetFooter}>
          <button className={styles.clearButton} onClick={onClose}>LIMPAR</button>
          <button className={styles.applyButton} onClick={onClose}>
            <ListFilter size={20} />
            APLICAR FILTRO
          </button>
        </div>
      </div>
    </div>
  );
}

interface NewPartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFinish: () => void;
}

function NewPartnerModal({ isOpen, onClose, onFinish }: NewPartnerModalProps) {
  const [step, setStep] = React.useState(1);
  const [isCnpjSearched, setIsCnpjSearched] = React.useState(false);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else {
      onFinish();
      onClose();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div className={styles.modalTitleRow}>
            <FolderRoot size={24} className={styles.modalIconBox} />
            <h2 className={styles.modalTitle}>Novo Parceiro PJ</h2>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.stepperContainer}>
            <div className={styles.stepperRow}>
              <div className={`${styles.stepBar} ${step > 1 ? styles.stepBarSuccess : styles.stepBarActive}`} />
              <div className={`${styles.stepBar} ${step === 2 ? styles.stepBarActive : (step > 2 ? styles.stepBarSuccess : '')}`} />
              <div className={`${styles.stepBar} ${step === 3 ? styles.stepBarActive : (step > 3 ? styles.stepBarSuccess : '')}`} />
              <div className={`${styles.stepBar} ${step === 4 ? styles.stepBarActive : ''}`} />
            </div>
            <p className={styles.stepSubtitle}>
              {step === 1 && "1 - Dados de contato"}
              {step === 2 && "2 - Identificação da empresa"}
              {step === 3 && "3 - Dados bancários"}
              {step === 4 && "4 - Finalizar cadastro"}
            </p>
          </div>

          <div className={styles.formFields}>
            {step === 1 && (
              <>
                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Nome completo do responsável</label>
                  <div className={styles.inputField}>
                    <input 
                      type="text" 
                      placeholder="Digite o nome completo" 
                      style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none' }}
                      autoFocus
                    />
                  </div>
                </div>
                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>WhatsApp</label>
                  <div className={styles.inputField}>
                    <input 
                      type="text" 
                      placeholder="11 99999-9999" 
                      style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none' }}
                    />
                  </div>
                </div>
                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>E-mail</label>
                  <div className={styles.inputField}>
                    <input 
                      type="text" 
                      placeholder="exemplo@exemplo.com.br" 
                      style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none' }}
                    />
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>CNPJ do parceiro PJ</label>
                  <div className={styles.inputField}>
                    <input 
                      type="text" 
                      placeholder="00.000.000/0001-00" 
                      style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none' }}
                      autoFocus
                    />
                    <button className={styles.searchInnerBtn} onClick={() => setIsCnpjSearched(true)}>
                      <Search size={18} />
                    </button>
                  </div>
                  <div className={styles.helperText}>Digite e pesquise um CNPJ valido</div>
                </div>

                {isCnpjSearched && (
                  <div className={styles.detailsBox}>
                    <div className={styles.detailsRow}>
                      <div className={styles.detailItem} style={{ width: '100%' }}>
                        <span className={styles.detailLabel}>Razão social</span>
                        <span className={styles.detailValue}>Kalisoft.tech</span>
                      </div>
                    </div>
                    <div className={styles.detailsRow}>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>CNPJ</span>
                        <span className={styles.detailValue}>38.300.972/0001-19</span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>E-mail</span>
                        <span className={styles.detailValue}>contato@kalisoft.tech</span>
                      </div>
                    </div>
                    <div className={styles.detailsRow}>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Telefone</span>
                        <span className={styles.detailValue}>47 99999-9999</span>
                      </div>
                    </div>
                    <div className={styles.detailsRow}>
                      <div className={styles.detailItem} style={{ width: '100%' }}>
                        <span className={styles.detailLabel}>Endereço</span>
                        <span className={styles.detailValue}>Rua XV de Novembro, nº 1457</span>
                      </div>
                    </div>
                    <div className={styles.detailsRow}>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Município</span>
                        <span className={styles.detailValue}>Blumenau</span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Estado</span>
                        <span className={styles.detailValue}>Santa Catarina</span>
                      </div>
                    </div>
                    <div className={styles.filterGroup}>
                      <label className={styles.cnaeLabel}>CNAE Principal</label>
                      <div className={styles.cnaePill}>62.01-5/01</div>
                    </div>
                    <div className={styles.filterGroup}>
                      <label className={styles.cnaeLabel}>CNAEs Secundários</label>
                      <div className={styles.cnaeList}>
                        <div className={styles.cnaePill}>62.01-5/02</div>
                        <div className={styles.cnaePill}>62.02-3/00</div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {step === 3 && (
              <div className={styles.detailsBox}>
                <p className={styles.detailLabel} style={{ color: '#5352ed', fontWeight: 700, marginBottom: 16 }}>
                  Insira a chave PIX da conta
                </p>
                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Chave Pix tipo (CNPJ)</label>
                  <div className={styles.inputField}>
                    <input 
                      type="text" 
                      placeholder="38.300.972/0001-11" 
                      style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none' }}
                      autoFocus
                    />
                  </div>
                  <div className={styles.helperText} style={{ textAlign: 'left' }}>
                    Chave do tipo <strong>CNPJ é obrigatório para segurança jurídica.</strong>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className={styles.validationList}>
                <div>
                  <h3 className={styles.validationSectionTitle}>Pontos corretos</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div className={styles.validationItem}>
                      <CheckCircle2 size={20} className={styles.correctIcon} />
                      <span className={styles.validationText}>CNPJ ativo</span>
                    </div>
                    <div className={styles.validationItem}>
                      <CheckCircle2 size={20} className={styles.correctIcon} />
                      <span className={styles.validationText}>A chave pix validada e é o mesmo CNPJ da empresa</span>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: 8 }}>
                  <h3 className={styles.validationSectionTitle}>Pontos de atenção</h3>
                  <div className={styles.validationItem}>
                    <AlertCircle size={20} className={styles.attentionIcon} />
                    <span className={styles.validationText}>Esse CNPJ possui DAS em atraso</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.cancelButton} onClick={step === 1 ? onClose : handleBack}>
            {step === 1 ? 'CANCELAR' : 'VOLTAR'}
          </button>
          <button className={styles.nextButton} onClick={handleNext}>
            {step === 4 && <CheckCircle2 size={20} />}
            {step < 4 ? 'PRÓXIMO' : 'SALVAR'}
            {step < 4 && <ChevronRight size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ParceirosPage() {
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isUpsellOpen, setIsUpsellOpen] = React.useState(false);
  const [isQrOpen, setIsQrOpen] = React.useState(false);
  const [isFinalSuccessOpen, setIsFinalSuccessOpen] = React.useState(false);

  return (
    <div className={styles.container}>
      {/* Header Adaptado para Empresa */}
      <TopHeaderBar title="Parceiros PJ" hasNotifications={false} />

      <div className={styles.contentWrapper}>
        <div className={styles.toolbarRow}>
          <div className={styles.searchBox}>
            <Search size={16} color="#c1c1c1" />
            <input 
              className={styles.searchInput} 
              placeholder="Pesquise pelo nome ou CNPJ" 
            />
          </div>
          <button className={styles.newButton} onClick={() => setIsModalOpen(true)}>
            <Plus size={24} color="#ffffff" />
            <span className={styles.newButtonLabel}>Novo Parceiro PJ</span>
          </button>
        </div>

        <div className={styles.tableCard}>
          <div className={styles.cardTopRow}>
            <span className={styles.totalText}>14 Parceiros PJ</span>
            <button className={styles.filterButton} onClick={() => setIsFilterOpen(true)}>
              <Filter size={24} color="#5352ed" />
              <span>FILTROS</span>
            </button>
          </div>

          <div className={styles.tableHeader}>
            <div className={styles.thText}>
              Risco <Info size={16} />
            </div>
            <div className={styles.thText}>Nome</div>
            <div className={styles.thText}>CNPJ</div>
            <div className={styles.thText}>Cadastro</div>
            <div className={styles.thText}>Categoria</div>
            <div className={styles.thText}>Status</div>
            <div className={styles.thText} style={{ justifyContent: 'flex-end' }}>Ações</div>
          </div>

          <div className={styles.tableBody}>
            {partners.map((partner) => (
              <Link 
                key={partner.id} 
                href={`/empresa/parceiros/${partner.id}`} 
                className={styles.row}
              >
                <div>
                  <span className={`${styles.pill} ${
                    partner.risco === 'regular' ? styles.riskRegular : 
                    partner.risco === 'em risco' ? styles.riskEmRisco : 
                    styles.riskIrregular
                  }`}>
                    {partner.risco.charAt(0).toUpperCase() + partner.risco.slice(1)}
                  </span>
                </div>
                <div className={`${styles.tdText} ${styles.tdName}`}>{partner.name}</div>
                <div className={styles.tdText}>{partner.cnpj}</div>
                <div className={styles.tdText}>{partner.cadastro}</div>
                <div className={styles.categoriesList}>
                  {partner.categorias.map((cat, idx) => (
                    <span key={idx} className={cat.color === 'Plus' ? styles.catPlus : `${styles.categoryTag} ${
                      cat.color === 'Green' ? styles.catGreen :
                      cat.color === 'Orange' ? styles.catOrange :
                      cat.color === 'Purple' ? styles.catPurple :
                      cat.color === 'Red' ? styles.catRed :
                      styles.catYellow
                    }`}>
                      {cat.name}
                    </span>
                  ))}
                </div>
                <div>
                  <span className={`${styles.pill} ${
                    partner.status === 'ativo' ? styles.statusAtivo : styles.statusInativo
                  }`}>
                    {partner.status === 'ativo' ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
                <div className={styles.actions}>
                  <ChevronRight size={16} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <FilterSheet isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
      <NewPartnerModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onFinish={() => setIsUpsellOpen(true)}
      />
      <SuccessUpsellModal 
        isOpen={isUpsellOpen} 
        onClose={() => setIsUpsellOpen(false)} 
        onConsult={() => {
          setIsUpsellOpen(false);
          setIsQrOpen(true);
        }}
      />
      <PaymentQrModal 
        isOpen={isQrOpen} 
        onClose={() => setIsQrOpen(false)} 
        onFinish={() => setIsFinalSuccessOpen(true)}
      />
      <FinalSuccessModal 
        isOpen={isFinalSuccessOpen} 
        onClose={() => setIsFinalSuccessOpen(false)} 
      />
    </div>
  );
}
