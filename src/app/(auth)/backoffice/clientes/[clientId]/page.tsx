// Client component because the "CNPJs adicionais" section uses accordion state.
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronLeft, ChevronUp, ExternalLink, Pencil, Plus, UserRound } from "lucide-react";
import backofficeStyles from "../../backoffice.module.css";
import styles from "../clienteDetails.module.css";
import ChangeAccessPlanModal from "../../ChangeAccessPlanModal";
import AddAdditionalCnpjModal from "../../AddAdditionalCnpjModal";
import AddClientModal from "../../AddClientModal";
import type { AdditionalClient } from "../../types";
import { clientDetailsMock } from "../../mock/clients";

export default function ClienteDetailsPage({ params }: { params: { clientId: string } }) {
  const decodedId = (() => {
    try {
      return decodeURIComponent(params.clientId);
    } catch {
      return params.clientId;
    }
  })();

  const client = clientDetailsMock.find((c) => c.cnpj === decodedId) ?? clientDetailsMock[0];

  const [additionalCnpjs, setAdditionalCnpjs] = useState<AdditionalClient[]>([
    {
      cnpj: "38.300.972/0001-11",
      nome: "GuaráSoft 02",
      razaoSocial: "GUARASOFT APLICATIVOS - LTDA",
      nomeFantasia: "GuaráSoft 02",
      email: "contato@kalisoft.tech",
      telefone: "47 99999-9999",
      endereco: "Rua XV de Novembro, nº 1457",
      municipio: "Blumenau",
      estado: "Santa Catarina",
      cnaePrincipal: "62.01-5/01",
      usuariosAtivos: "05 acessos",
    },
    {
      cnpj: "38.300.972/0001-11",
      nome: "GuaráSoft 3",
      razaoSocial: "GUARASOFT APLICATIVOS - LTDA",
      nomeFantasia: "GuaráSoft 3",
      email: "contato@kalisoft.tech",
      telefone: "47 99999-9999",
      endereco: "Rua XV de Novembro, nº 1457",
      municipio: "Blumenau",
      estado: "Santa Catarina",
      cnaePrincipal: "62.01-5/01",
      usuariosAtivos: "05 acessos",
    },
  ]);

  const [expandedAdditionalIndex, setExpandedAdditionalIndex] = useState<number>(0);
  const [isChangePlanOpen, setIsChangePlanOpen] = useState(false);
  const [changePlanKey, setChangePlanKey] = useState(0);
  const [isEditClientOpen, setIsEditClientOpen] = useState(false);
  const [editClientKey, setEditClientKey] = useState(0);
  const [isAddAdditionalCnpjOpen, setIsAddAdditionalCnpjOpen] = useState(false);
  const [addAdditionalCnpjKey, setAddAdditionalCnpjKey] = useState(0);

  return (
    <>
      <div className={backofficeStyles.topHeader}>
        <div className={backofficeStyles.topTitle}>Clientes</div>
        <div className={backofficeStyles.userBadge}>
          <div className={backofficeStyles.userName}>Olá Daniel</div>
        </div>
      </div>

      <div className={backofficeStyles.contentBg}>
        <div className={styles.detailsWrap}>
          <div className={styles.topBar}>
            <Link
              href="/backoffice/clientes"
              className={styles.backLink}
              aria-label="Voltar para clientes"
            >
              <ChevronLeft size={18} />
              Voltar
            </Link>

            <div className={styles.actionsRow}>
              <button type="button" className={styles.secondaryButton}>
                ACESSAR PAINEL CLIENTE <ExternalLink size={20} />
              </button>
              <button
                type="button"
                className={styles.primaryButton}
                onClick={() => {
                  setChangePlanKey((k) => k + 1);
                  setIsChangePlanOpen(true);
                }}
              >
                ALTERAR PLANO DE ACESSOS
              </button>
            </div>
          </div>

          <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.cardHeaderLeft}>
            <UserRound size={18} color="var(--atena-secondary-600)" />
            <div className={styles.cardTitle}>Dados do cliente</div>
          </div>
          <div className={styles.actionsRow}>
            <div className={styles.statusPill}>CNPJ Principal</div>
              <button
                type="button"
                className={`${styles.secondaryButton} ${styles.editButtonCompact}`}
                onClick={() => {
                  setEditClientKey((k) => k + 1);
                  setIsEditClientOpen(true);
                }}
              >
              <Pencil size={14} />
                Editar
            </button>
          </div>
        </div>

        <div className={styles.twoColGrid}>
          <div className={styles.fieldGroup}>
            <div className={styles.fieldLabel}>Razão social</div>
            <div className={styles.fieldValue}>{client.razaoSocial}</div>
          </div>
          <div className={styles.fieldGroup}>
            <div className={styles.fieldLabel}>Nome fantasia</div>
            <div className={styles.fieldValue}>{client.nomeFantasia}</div>
          </div>

          <div className={styles.fieldGroup}>
            <div className={styles.fieldLabel}>E-mail</div>
            <div className={styles.fieldValue}>{client.email}</div>
          </div>
          <div className={styles.fieldGroup}>
            <div className={styles.fieldLabel}>Telefone</div>
            <div className={styles.fieldValue}>{client.telefone}</div>
          </div>

          <div className={styles.fieldGroup}>
            <div className={styles.fieldLabel}>Endereço</div>
            <div className={styles.fieldValue}>{client.endereco}</div>
          </div>
          <div className={styles.fieldGroup}>
            <div className={styles.fieldLabel}>Município</div>
            <div className={styles.fieldValue}>{client.municipio}</div>
          </div>

          <div className={styles.fieldGroup}>
            <div className={styles.fieldLabel}>Estado</div>
            <div className={styles.fieldValue}>{client.estado}</div>
          </div>
          <div className={styles.fieldGroup}>
            <div className={styles.fieldLabel}>CNPJ</div>
            <div className={styles.fieldValue}>{client.cnpj}</div>
          </div>

          <div className={styles.fieldGroup}>
            <div className={styles.fieldLabel}>CNAE Principal</div>
            <div className={styles.tag}>{client.cnaePrincipal}</div>
          </div>
          <div className={styles.fieldGroup}>
            <div className={styles.fieldLabel}>Pacote contratado</div>
            <div className={styles.fieldValue} style={{ color: "#4079ed" }}>
              {client.pacoteContratado}
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <div className={styles.fieldLabel}>Acessos em uso</div>
            <div className={styles.fieldValue} style={{ color: "#4079ed" }}>
              {client.acessosEmUso}
            </div>
          </div>
          <div className={styles.fieldGroup}>
            <div className={styles.fieldLabel}>Usuários ativos neste CNPJ</div>
            <div className={styles.fieldValue} style={{ color: "#4079ed" }}>
              {client.usuariosAtivos}
            </div>
          </div>
        </div>
          </div>

          <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.cardHeaderLeft}>
            <div className={styles.cardTitle}>CNPJs adicionais</div>
          </div>
              <button
                type="button"
                className={styles.addButton}
                onClick={() => {
                  setAddAdditionalCnpjKey((k) => k + 1);
                  setIsAddAdditionalCnpjOpen(true);
                }}
              >
            <span>Adicionar</span>
            <Plus size={20} />
          </button>
        </div>

            <div className={styles.accordionContent}>
              {additionalCnpjs.map((item, idx) => {
                const expanded = idx === expandedAdditionalIndex;
                return (
                  <div key={item.cnpj + idx} className={styles.accordionItem}>
                    <div className={styles.accordionHeader}>
                      <div className={styles.additionalName}>{item.nome}</div>

                      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <div className={styles.badgeCnpjAdditional}>CNPJ Adicional</div>

                        <button
                          type="button"
                          className={styles.toggleMoreButton}
                          aria-expanded={expanded}
                          onClick={() => setExpandedAdditionalIndex(expanded ? -1 : idx)}
                        >
                          {expanded ? "Ver menos" : "Ver mais"}
                          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                      </div>
                    </div>

                    {expanded ? (
                      <div className={styles.accordionContent}>
                        <div className={styles.accordionGrid}>
                          <div className={styles.fieldGroup}>
                            <div className={styles.fieldLabel}>Razão social</div>
                            <div className={styles.fieldValue}>{item.razaoSocial}</div>
                          </div>
                          <div className={styles.fieldGroup}>
                            <div className={styles.fieldLabel}>Nome fantasia</div>
                            <div className={styles.fieldValue}>{item.nomeFantasia}</div>
                          </div>
                          <div className={styles.fieldGroup}>
                            <div className={styles.fieldLabel}>E-mail</div>
                            <div className={styles.fieldValue}>{item.email}</div>
                          </div>
                          <div className={styles.fieldGroup}>
                            <div className={styles.fieldLabel}>Telefone</div>
                            <div className={styles.fieldValue}>{item.telefone}</div>
                          </div>
                          <div className={styles.fieldGroup}>
                            <div className={styles.fieldLabel}>Endereço</div>
                            <div className={styles.fieldValue}>{item.endereco}</div>
                          </div>
                          <div className={styles.fieldGroup}>
                            <div className={styles.fieldLabel}>Município</div>
                            <div className={styles.fieldValue}>{item.municipio}</div>
                          </div>
                          <div className={styles.fieldGroup}>
                            <div className={styles.fieldLabel}>Estado</div>
                            <div className={styles.fieldValue}>{item.estado}</div>
                          </div>
                          <div className={styles.fieldGroup}>
                            <div className={styles.fieldLabel}>CNAE Principal</div>
                            <div className={styles.cnaeChip}>
                              <span className={styles.cnaeChipText}>{item.cnaePrincipal}</span>
                            </div>
                          </div>
                        </div>

                        <div className={styles.usersActiveRow}>
                          <div className={styles.fieldGroup}>
                            <div className={styles.fieldLabel}>Usuários ativos neste CNPJ</div>
                            <div className={styles.fieldValue} style={{ color: "#4079ed" }}>
                              {item.usuariosAtivos}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardHeaderLeft}>
                <div className={styles.cardTitle}>Dados do responsável legal</div>
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <div className={styles.fieldLabel}>Nome completo</div>
              <div className={styles.fieldValue}>Felipe Alves dos Santos</div>
            </div>
            <div className={styles.fieldGroup}>
              <div className={styles.fieldLabel}>WhatsApp</div>
              <div className={styles.fieldValue}>47 99999-9999</div>
            </div>
            <div className={styles.fieldGroup}>
              <div className={styles.fieldLabel}>E-mail</div>
              <div className={styles.fieldValue}>contato@kalisoft.tech</div>
            </div>
          </div>
        </div>
      </div>

      <ChangeAccessPlanModal
        key={changePlanKey}
        open={isChangePlanOpen}
        onClose={() => setIsChangePlanOpen(false)}
        initialCnpj={client.cnpj}
        initialCompanyName={client.nomeFantasia}
        initialCompanyCnpj={client.cnpj}
        initialAccesses={15}
        initialValuePerPerson="R$ 99,00"
      />

      <AddClientModal
        key={editClientKey}
        open={isEditClientOpen}
        onClose={() => setIsEditClientOpen(false)}
        mode="edit"
        initialClient={client}
        initialValuePerPerson="R$ 99,00"
        initialResponsible={{
          nomeCompleto: "Felipe Alves dos Santos",
          whatsapp: "47 99999-9999",
          email: "contato@kalisoft.tech",
        }}
      />

      <AddAdditionalCnpjModal
        key={addAdditionalCnpjKey}
        open={isAddAdditionalCnpjOpen}
        onClose={() => setIsAddAdditionalCnpjOpen(false)}
        onAdd={(additionalCnpj) => {
          const newIndex = additionalCnpjs.length;
          setAdditionalCnpjs((prev) => [
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
              usuariosAtivos: "0 acessos",
            },
          ]);
          setExpandedAdditionalIndex(newIndex);
        }}
      />
    </>
  );
}


