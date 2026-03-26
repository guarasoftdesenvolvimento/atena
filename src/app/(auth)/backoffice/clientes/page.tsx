"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Plus, Search } from "lucide-react";
import backofficeStyles from "../backoffice.module.css";
import styles from "./clientes.module.css";
import AddClientModal from "../AddClientModal";

import type { ClientStatus } from "../types";
import { clientsListMock } from "../mock/clients";

const perPage = 15;

function statusToPillClass(status: ClientStatus) {
  if (status === "Ativo") return styles.pillActive;
  if (status === "Inadimplente") return styles.pillOverdue;
  return styles.pillInactive;
}

export default function ClientesBackofficePage() {
  const clients = clientsListMock;

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"Todos" | ClientStatus>("Todos");
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalKey, setModalKey] = useState(0);
  const statusMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!statusMenuRef.current) return;
      if (!statusMenuRef.current.contains(event.target as Node)) {
        setStatusMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const q = query.trim().toLowerCase();
  const filtered = clients.filter((c) => {
    const matchesStatus = status === "Todos" ? true : c.status === status;
    const matchesQuery = q.length === 0 ? true : `${c.nome} ${c.cnpj}`.toLowerCase().includes(q);
    return matchesStatus && matchesQuery;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(page, totalPages);

  const start = (safePage - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);

  const totalLabel = `${filtered.length} Clientes`;

  return (
    <>
      <div className={backofficeStyles.topHeader}>
        <div className={backofficeStyles.topTitle}>Clientes</div>
        <div className={backofficeStyles.userBadge}>
          <div className={backofficeStyles.userName}>Olá Daniel</div>
        </div>
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.toolbarRow}>
          <div className={styles.searchBox}>
            <Search size={16} color="#c1c1c1" />
            <input
              className={styles.searchInput}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Pesquise pelo nome ou cod. afiliado"
            />
          </div>

          <button
            type="button"
            className={styles.newClientButton}
            onClick={() => {
              setModalKey((k) => k + 1);
              setIsModalOpen(true);
            }}
          >
            <Plus size={20} color="#ffffff" />
            <span className={styles.newClientButtonLabel}>Novo cliente</span>
          </button>
        </div>

        <div className={styles.clientsCard}>
          <div className={styles.cardTopRow}>
            <div className={styles.totalText}>{totalLabel}</div>
            <div className={styles.filterGroup}>
              <div className={styles.filterLabel}>Filtrar por status</div>
              <div className={styles.selectWrap} ref={statusMenuRef}>
                <button
                  type="button"
                  className={styles.selectButton}
                  onClick={() => setStatusMenuOpen((open) => !open)}
                  aria-haspopup="listbox"
                  aria-expanded={statusMenuOpen}
                >
                  <span className={styles.selectButtonLabel}>{status}</span>
                  <ChevronDown size={18} color="#5c5e60" />
                </button>

                {statusMenuOpen ? (
                  <div className={styles.selectMenu} role="listbox" aria-label="Filtrar por status">
                    {(["Todos", "Ativo", "Inativo", "Inadimplente"] as const).map((option) => (
                      <button
                        key={option}
                        type="button"
                        role="option"
                        aria-selected={status === option}
                        className={`${styles.selectOption} ${
                          status === option ? styles.selectOptionActive : ""
                        }`}
                        onClick={() => {
                          setStatus(option);
                          setPage(1);
                          setStatusMenuOpen(false);
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className={styles.tableHeader} aria-label="Cabeçalho da tabela">
            <div className={styles.thText} style={{ paddingLeft: 4 }}>
              Nome da empresa
            </div>
            <div className={styles.thText}>CNPJ</div>
            <div className={styles.thText}>Contato</div>
            <div className={styles.thText}>Licenças</div>
            <div className={styles.thText}>Status</div>
            <div className={styles.thText} style={{ textAlign: "right", paddingRight: 4 }}>
              Ações
            </div>
          </div>

          <div className={styles.tableBody}>
            {paginated.length === 0 ? (
              <div className={styles.row} style={{ borderBottom: "0" }}>
                <div style={{ gridColumn: "1 / -1", color: "#737791", fontSize: 14 }}>Nenhum cliente encontrado.</div>
              </div>
            ) : (
              paginated.map((c, idx) => (
                <Link
                  key={`${c.cnpj}-${idx}`}
                  href={`/backoffice/clientes/${encodeURIComponent(c.cnpj)}`}
                  className={styles.row}
                >
                  <div className={`${styles.tdText} ${styles.tdName}`} style={{ paddingLeft: 4 }}>
                    {c.nome}
                  </div>
                  <div className={styles.tdText}>{c.cnpj}</div>
                  <div className={styles.tdText}>{c.contato}</div>
                  <div className={styles.tdText}>{c.licencas}</div>
                  <div className={`${styles.tdText} ${styles.statusCell}`}>
                    <span className={`${styles.pill} ${statusToPillClass(c.status)}`}>{c.status}</span>
                  </div>
                  <div className={styles.actions}>
                    <ArrowRight size={18} color="#527ca5" />
                  </div>
                </Link>
              ))
            )}
          </div>

          <div className={styles.paginationRow} aria-label="Paginação">
            <button
              type="button"
              className={styles.pageButton}
              disabled={safePage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Anterior
            </button>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#3d3e41" }}>
              {safePage} / {totalPages}
            </span>
            <button
              type="button"
              className={styles.pageButton}
              disabled={safePage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Próxima
            </button>
          </div>
        </div>
      </div>
      <AddClientModal key={modalKey} open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
