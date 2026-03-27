import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  CircleDollarSign,
  ClipboardList,
  Clock,
  CloudDownload,
  Copy,
  ExternalLink,
  FileText,
  FolderOpen,
  Mail,
  MoreVertical,
  Plus,
  RefreshCcw,
  XCircle,
} from "lucide-react";
import styles from "../../../detalhes.module.css";
import type { ContractCardItem } from "../../types";

interface ContratosSectionProps {
  openPopoverId: string | null;
  selectedContractId: string | null;
  expandedAddendumId: string | null;
  onTogglePopover: (contractId: string) => void;
  onSelectContract: (contractId: string) => void;
  onBackFromContractDetails: () => void;
  onOpenCreateContractModal: () => void;
  onOpenCreateAddendumModal: () => void;
  onToggleAddendum: (addendumId: string) => void;
}

const contractCards: ContractCardItem[] = [
  {
    id: "001",
    nomeModelo: "CONTRATO PRESTAÇÃO GERAL",
    status: "Ativo",
    dataInicio: "26/05/2025",
    dataFim: "24/06/2025",
    valor: "R$ 4.500,00",
    assinadoEm: "12/02/2025",
  },
  {
    id: "002",
    nomeModelo: "CONTRATO PRESTAÇÃO GERAL 2",
    status: "Aguardando assinatura",
    dataInicio: "26/05/2025",
    dataFim: "24/06/2025",
    valor: "R$ 4.500,00",
  },
  {
    id: "003",
    nomeModelo: "CONTRATO PRESTAÇÃO GERAL 3",
    status: "A vencer em 30 dias",
    dataInicio: "26/05/2025",
    dataFim: "24/06/2025",
    valor: "R$ 4.500,00",
  },
  {
    id: "004",
    nomeModelo: "CONTRATO PRESTAÇÃO GERAL 4",
    status: "Vencido",
    dataInicio: "26/05/2025",
    dataFim: "24/06/2025",
    valor: "R$ 4.500,00",
  },
];

const statusClassMap = {
  Ativo: styles.statusActive,
  "Aguardando assinatura": styles.statusWaiting,
  "A vencer em 30 dias": styles.statusExpiring,
  Vencido: styles.statusExpired,
} as const;

export default function ContratosSection({
  openPopoverId,
  selectedContractId,
  expandedAddendumId,
  onTogglePopover,
  onSelectContract,
  onBackFromContractDetails,
  onOpenCreateContractModal,
  onOpenCreateAddendumModal,
  onToggleAddendum,
}: ContratosSectionProps) {
  if (selectedContractId) {
    return (
      <div className={styles.tabContentWrapper}>
        <div className={styles.contractDetailsContainer}>
          <div className={styles.detailsHeader}>
            <div className={styles.backButtonDetails} onClick={onBackFromContractDetails}>
              <ArrowLeft size={16} />
              Voltar
            </div>
            <div className={styles.detailsBreadcrumbs}>
              Contratos
              <span className={styles.bcSeparator}>
                <ChevronRight size={16} />
              </span>
              <span className={styles.bcActive}>Contrato #{selectedContractId}</span>
            </div>
          </div>

          <div className={styles.detailsGrid}>
            <div className={styles.detailsCard}>
              <div className={styles.detailsCardHeader}>
                <div className={styles.detailsTitleGroup}>
                  <div className={styles.detailsIconBox}>
                    <ClipboardList size={24} />
                  </div>
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
                  <div className={styles.detailField} style={{ alignItems: "flex-end" }}>
                    <p className={styles.detailLabel}>Status do contrato</p>
                    <div className={`${styles.statusBadge} ${styles.statusExpiring}`}>
                      A vencer em 30 dias
                    </div>
                  </div>
                </div>
                <div className={styles.detailField}>
                  <p className={styles.detailLabel}>Modelo de contrato</p>
                  <p className={styles.detailValueSmall}>CONTRATO PRESTAÇÃO GERAL</p>
                </div>
                <div className={styles.detailRow} style={{ justifyContent: "flex-start", gap: "50px" }}>
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
                  <div className={styles.detailsIconBox}>
                    <FileText size={24} />
                  </div>
                  <p className={styles.detailsTitle}>Assinaturas do contrato</p>
                </div>
              </div>
              <div className={styles.signaturesContainer}>
                <div className={styles.sigHeaderSection}>
                  <div className={styles.sigStatusGroup}>
                    <p className={styles.signerName} style={{ fontSize: "16px" }}>
                      Contrato <span className="font-bold">#{selectedContractId}</span>
                    </p>
                    <p className={styles.detailLabel}>Data de envio: 24/05/2025</p>
                  </div>
                  <div className={styles.sigDownloadBtn}>
                    <CloudDownload size={14} /> Baixar
                  </div>
                </div>
                <div className={styles.sigStatusGroup} style={{ marginTop: "10px" }}>
                  <p className="font-bold text-[12px] text-[#527ca5] uppercase">
                    Status das assinaturas
                  </p>
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
                        <div className={styles.sigActionLink}>
                          <RefreshCcw size={12} /> Reenviar
                        </div>
                        <div className={styles.sigActionLink}>
                          <Copy size={12} /> Link
                        </div>
                        <div className={`${styles.sigStatusBadge} ${styles.sigPendente}`}>Pendente</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${styles.detailsCard} ${styles.addendumCard}`} style={{ gridColumn: "1 / -1" }}>
              <div className={styles.detailsCardHeader}>
                <div className={styles.detailsTitleGroup}>
                  <div className={styles.detailsIconBox}>
                    <FileText size={24} />
                  </div>
                  <p className={styles.detailsTitle}>Aditivos deste contrato</p>
                </div>
                <button
                  className={styles.createButton}
                  style={{ padding: "8px 12px" }}
                  onClick={onOpenCreateAddendumModal}
                >
                  <Plus size={16} /> Criar novo aditivo
                </button>
              </div>

              <div
                className={styles.addendumItem}
                style={{
                  padding: "12px",
                  gap: "16px",
                  flexDirection: expandedAddendumId === "1" ? "column" : "row",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}
                >
                  <div className={styles.sigStatusGroup}>
                    <p className={styles.signerName} style={{ fontSize: "16px" }}>
                      Aditivo <span className="font-bold">#1</span>
                    </p>
                    <p className={styles.detailLabel}>Data de envio: 24/05/2025</p>
                  </div>
                  <div className={styles.signatureActions}>
                    <div className={styles.sigDownloadBtn}>
                      <CloudDownload size={14} /> Baixar
                    </div>
                    <div
                      className={styles.sigActionLink}
                      style={{ color: "#527ca5" }}
                      onClick={() => onToggleAddendum("1")}
                    >
                      {expandedAddendumId === "1" ? "Ver menos" : "Ver mais"}
                      {expandedAddendumId === "1" ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </div>
                  </div>
                </div>

                {expandedAddendumId === "1" ? (
                  <div
                    className={styles.sigStatusSection}
                    style={{ width: "100%", display: "flex", flexDirection: "column", gap: "6px" }}
                  >
                    <p className="font-bold text-[12px] text-[#527ca5] uppercase">
                      Status das assinaturas
                    </p>
                    <div className={styles.signatureList} style={{ gap: "12px" }}>
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
                          <div className={styles.sigActionLink} style={{ color: "#7c8efd" }}>
                            <Mail size={14} /> Reenviar e-mail
                          </div>
                          <div className={styles.sigActionLink} style={{ color: "#7c8efd" }}>
                            <Copy size={14} /> Copiar link
                          </div>
                          <div className={`${styles.sigStatusBadge} ${styles.sigPendente}`}>Pendente</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <div className={`${styles.activityHeader} ${styles.headerWithAction}`}>
        <div className={styles.activityTitleGroupRow}>
          <FolderOpen size={24} className="text-[#345070]" />
          <h3 className={styles.activityTitle}>Contratos</h3>
        </div>
        <button className={styles.createButton} onClick={onOpenCreateContractModal}>
          <Plus size={20} /> Criar novo contrato
        </button>
      </div>

      <div className={styles.contractsGrid}>
        {contractCards.map((contract) => (
          <div key={contract.id} className={styles.contractCard}>
            <div className={styles.contractCardHeader}>
              <p className={styles.contractNumber}>
                Contrato <span className={styles.contractNumberHighlight}>#{contract.id}</span>
              </p>
              <div
                className={`${styles.moreButton} ${openPopoverId === contract.id ? styles.moreButtonActive : ""}`}
                onClick={() => onTogglePopover(contract.id)}
              >
                <MoreVertical size={16} />
              </div>
              {openPopoverId === contract.id ? (
                <div className={styles.popover}>
                  <div className={styles.popoverItem} onClick={() => onSelectContract(contract.id)}>
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
              ) : null}
            </div>
            <div className={styles.contractCardBody}>
              <p className={styles.contractType}>{contract.nomeModelo}</p>
              <div className={`${styles.statusBadge} ${statusClassMap[contract.status]}`}>
                {contract.status}
              </div>
              <div className={styles.contractDivider} />
              <div className={styles.dateRow}>
                <div className={styles.dateItem}>
                  <div className={styles.dateLabel}>
                    <Calendar size={12} /> Início:
                  </div>
                  <p className={styles.dateValue}>{contract.dataInicio}</p>
                </div>
                <div className={styles.dateItem}>
                  <div className={styles.dateLabel}>
                    <Calendar size={12} /> Fim:
                  </div>
                  <p className={styles.dateValue}>{contract.dataFim}</p>
                </div>
              </div>
              <div className={styles.valueBox}>
                <div className={styles.valueLabelGroup}>
                  <CircleDollarSign size={12} /> Valor:
                </div>
                <p className={styles.valueAmount}>{contract.valor}</p>
              </div>
              <div className={styles.contractDivider} />
              {contract.assinadoEm ? (
                <div className={styles.contractFooter}>
                  <CheckCircle2 size={12} /> Assinado em:{" "}
                  <strong className="ml-1">{contract.assinadoEm}</strong>
                </div>
              ) : (
                <div className={`${styles.contractFooter} ${styles.contractFooterWaiting}`}>
                  <Clock size={12} /> Aguardando
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
