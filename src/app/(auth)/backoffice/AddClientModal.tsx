"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { CheckCircle, ChevronRight, Search, X } from "lucide-react";
import styles from "./AddClientModal.module.css";
import { useEscapeToClose, useLockBodyScroll } from "./useModalEffects";

type AddClientModalProps = {
  open: boolean;
  onClose: () => void;
  mode?: "create" | "edit";
  initialClient?: {
    cnpj: string;
    razaoSocial: string;
    nomeFantasia: string;
    email: string;
    telefone: string;
    endereco: string;
    municipio: string;
    estado: string;
    cnaePrincipal: string;
    pacoteContratado?: string;
    acessosEmUso?: string;
    usuariosAtivos?: string;
  };
  initialValuePerPerson?: string;
  initialResponsible?: {
    nomeCompleto: string;
    whatsapp: string;
    email: string;
  };
};

type Step = 1 | 2 | 3;

type FormState = {
  // Step 1: empresa
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  cnaePrincipal: string;
  telefone: string;
  emailEmpresa: string;
  codigoIndicacao: string;
  numeroAcessos: string;
  valorPorPessoa: string;

  // Step 2: endereço
  logradouro: string;
  numero: string;
  bairro: string;
  municipio: string;
  uf: string;
  complemento: string;

  // Step 3: responsável
  nomeResponsavel: string;
  whatsapp: string;
  emailResponsavel: string;
};

function extractFirstNumber(value: string) {
  const match = value.replace(/\./g, "").match(/(\d+)/);
  return match ? match[1] : "";
}

export default function AddClientModal({
  open,
  onClose,
  mode = "create",
  initialClient,
  initialValuePerPerson = "R$ 99,00",
  initialResponsible,
}: AddClientModalProps) {
  const [step, setStep] = useState<Step>(1);
  const titleId = useId();
  const cnpjInputRef = useRef<HTMLInputElement | null>(null);

  const [form, setForm] = useState<FormState>(() => {
    const client = initialClient;
    const endereco = (client?.endereco ?? "").trim();
    const enderecoParts = endereco.split(",");
    const logradouro = enderecoParts[0]?.trim() ?? "";
    const numero = extractFirstNumber(endereco);

    return {
      cnpj: client?.cnpj ?? "",
      razaoSocial: client?.razaoSocial ?? "",
      nomeFantasia: client?.nomeFantasia ?? "",
      cnaePrincipal: client?.cnaePrincipal ?? "",
      telefone: client?.telefone ?? "",
      emailEmpresa: client?.email ?? "",
      codigoIndicacao: "",
      numeroAcessos: client?.pacoteContratado ? extractFirstNumber(client.pacoteContratado) : "",
      valorPorPessoa: initialValuePerPerson,

      logradouro,
      numero,
      bairro: "",
      municipio: client?.municipio ?? "",
      uf: client?.estado ?? "",
      complemento: "",

      nomeResponsavel: initialResponsible?.nomeCompleto ?? "Felipe Alves dos Santos",
      whatsapp: initialResponsible?.whatsapp ?? client?.telefone ?? "",
      emailResponsavel: initialResponsible?.email ?? client?.email ?? "",
    };
  });

  useLockBodyScroll(open);
  useEscapeToClose(open, onClose);

  useEffect(() => {
    if (!open) return;
    if (step !== 1) return;
    const t = window.setTimeout(() => cnpjInputRef.current?.focus(), 0);
    return () => window.clearTimeout(t);
  }, [open, step]);

  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  if (!open) return null;

  const onBackdropMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const stepLabel = step === 1 ? "1 - Dados da empresa" : step === 2 ? "2 - Endereço" : "3 - Dados do contratante";

  const segmentColor = (segmentIndex: 0 | 1 | 2) => {
    // Segment order: [1] [2] [3]
    if (step === 1) {
      if (segmentIndex === 0) return "var(--atena-primary-600)"; // active
      return "var(--atena-primary-300)"; // inactive
    }
    if (step === 2) {
      if (segmentIndex === 1) return "var(--atena-primary-600)";
      if (segmentIndex === 0) return "var(--atena-success-200)";
      return "var(--atena-primary-300)";
    }
    // step === 3
    if (segmentIndex === 2) return "var(--atena-primary-600)";
    return "var(--atena-success-200)";
  };

  const segmentWidth = (segmentIndex: 0 | 1 | 2) => {
    // Widths in px from Figma: active=60, others=30
    if (step === 1) {
      return segmentIndex === 0 ? 60 : 30;
    }
    if (step === 2) {
      return segmentIndex === 1 ? 60 : 30;
    }
    // step 3
    return segmentIndex === 2 ? 60 : 30;
  };

  const renderStepBody = () => {
    if (step === 1) {
      return (
        <>
          <div className={styles.fields}>
            <div className={styles.field}>
              <div className={styles.label}>CNPJ</div>
              <div className={styles.cnpjInputShell}>
                <div className={styles.cnpjLeftIcon} aria-hidden="true">
                  <Search size={16} />
                </div>
                <input
                  ref={cnpjInputRef}
                  className={styles.cnpjInput}
                  value={form.cnpj}
                  onChange={(e) => setForm((prev) => ({ ...prev, cnpj: e.target.value }))}
                  placeholder="38.300.972/0001-11"
                  aria-label="CNPJ"
                />
                <button type="button" className={styles.cnpjSearchButton} aria-label="Pesquisar CNPJ">
                  <Search size={16} />
                </button>
              </div>
              <div className={styles.helperText}>Digite e pesquise um CNPJ valido</div>
            </div>

            <div className={styles.field}>
              <div className={styles.label}>Razão social</div>
              <input
                className={styles.input}
                value={form.razaoSocial}
                onChange={(e) => setForm((prev) => ({ ...prev, razaoSocial: e.target.value }))}
                placeholder="Empresa Forte LTDA"
                aria-label="Razão social"
              />
            </div>

            <div className={styles.field}>
              <div className={styles.label}>Nome fantasia</div>
              <input
                className={styles.input}
                value={form.nomeFantasia}
                onChange={(e) => setForm((prev) => ({ ...prev, nomeFantasia: e.target.value }))}
                placeholder="Empresa Forte"
                aria-label="Nome fantasia"
              />
            </div>

            <div className={styles.twoCols}>
              <div className={styles.field}>
                <div className={styles.label}>CNAE Principal</div>
                <input
                  className={styles.input}
                  value={form.cnaePrincipal}
                  onChange={(e) => setForm((prev) => ({ ...prev, cnaePrincipal: e.target.value }))}
                  placeholder="2000.5615.22"
                  aria-label="CNAE Principal"
                />
              </div>
              <div className={styles.field}>
                <div className={styles.label}>Telefone</div>
                <input
                  className={styles.input}
                  value={form.telefone}
                  onChange={(e) => setForm((prev) => ({ ...prev, telefone: e.target.value }))}
                  placeholder="16 9906079188"
                  aria-label="Telefone"
                />
              </div>
            </div>

            <div className={styles.field}>
              <div className={styles.label}>E-mail da empresa</div>
              <input
                className={styles.input}
                value={form.emailEmpresa}
                onChange={(e) => setForm((prev) => ({ ...prev, emailEmpresa: e.target.value }))}
                placeholder="exemplo@exemplo.com.br"
                aria-label="E-mail da empresa"
              />
            </div>

            <div className={styles.twoCols}>
              <div className={styles.field}>
                <div className={styles.label}>Código da indicação (opcional)</div>
                <input
                  className={styles.input}
                  value={form.codigoIndicacao}
                  onChange={(e) => setForm((prev) => ({ ...prev, codigoIndicacao: e.target.value }))}
                  placeholder="AP1582"
                  aria-label="Código da indicação"
                />
              </div>
              <div className={styles.field}>
                <div className={styles.label}>Número de acessos</div>
                <input
                  className={styles.input}
                  value={form.numeroAcessos}
                  onChange={(e) => setForm((prev) => ({ ...prev, numeroAcessos: e.target.value }))}
                  placeholder="15"
                  aria-label="Número de acessos"
                />
              </div>
            </div>

            <div className={styles.field}>
              <div className={styles.label}>Valor por pessoa</div>
              <input
                className={styles.input}
                value={form.valorPorPessoa}
                onChange={(e) => setForm((prev) => ({ ...prev, valorPorPessoa: e.target.value }))}
                placeholder="R$ 99,00"
                aria-label="Valor por pessoa"
              />
            </div>
          </div>
        </>
      );
    }

    if (step === 2) {
      return (
        <div className={styles.fields}>
          <div className={styles.twoCols}>
            <div className={styles.field}>
              <div className={styles.label}>Logradouro</div>
              <input
                className={styles.input}
                value={form.logradouro}
                onChange={(e) => setForm((prev) => ({ ...prev, logradouro: e.target.value }))}
                placeholder="Rua das Flores"
                aria-label="Logradouro"
              />
            </div>
            <div className={styles.field}>
              <div className={styles.label}>Número</div>
              <input
                className={styles.input}
                value={form.numero}
                onChange={(e) => setForm((prev) => ({ ...prev, numero: e.target.value }))}
                placeholder="100"
                aria-label="Número"
              />
            </div>
          </div>
          <div className={styles.field}>
            <div className={styles.label}>Bairro</div>
            <input
              className={styles.input}
              value={form.bairro}
              onChange={(e) => setForm((prev) => ({ ...prev, bairro: e.target.value }))}
              placeholder="Centro"
              aria-label="Bairro"
            />
          </div>
          <div className={styles.twoCols}>
            <div className={styles.field}>
              <div className={styles.label}>Município</div>
              <input
                className={styles.input}
                value={form.municipio}
                onChange={(e) => setForm((prev) => ({ ...prev, municipio: e.target.value }))}
                placeholder="São Paulo"
                aria-label="Município"
              />
            </div>
            <div className={styles.field}>
              <div className={styles.label}>UF</div>
              <input
                className={styles.input}
                value={form.uf}
                onChange={(e) => setForm((prev) => ({ ...prev, uf: e.target.value }))}
                placeholder="SP"
                aria-label="UF"
              />
            </div>
          </div>
          <div className={styles.field}>
            <div className={styles.label}>Complemento</div>
            <input
              className={styles.input}
              value={form.complemento}
              onChange={(e) => setForm((prev) => ({ ...prev, complemento: e.target.value }))}
              placeholder="Atrás do barracão"
              aria-label="Complemento"
            />
          </div>
        </div>
      );
    }

    // step === 3
    return (
      <div className={styles.fields}>
        <div className={styles.field}>
          <div className={styles.label}>Nome completo do responsável</div>
          <input
            className={styles.input}
            value={form.nomeResponsavel}
            onChange={(e) => setForm((prev) => ({ ...prev, nomeResponsavel: e.target.value }))}
            placeholder="Felipe Alves dos Santos"
            aria-label="Nome completo do responsável"
          />
        </div>
        <div className={styles.field}>
          <div className={styles.label}>WhatsApp</div>
          <input
            className={styles.input}
            value={form.whatsapp}
            onChange={(e) => setForm((prev) => ({ ...prev, whatsapp: e.target.value }))}
            placeholder="11 99999-9999"
            aria-label="WhatsApp"
          />
        </div>
        <div className={styles.field}>
          <div className={styles.label}>E-mail do responsável</div>
          <input
            className={styles.input}
            value={form.emailResponsavel}
            onChange={(e) => setForm((prev) => ({ ...prev, emailResponsavel: e.target.value }))}
            placeholder="exemplo@exemplo.com.br"
            aria-label="E-mail do responsável"
          />
        </div>
      </div>
    );
  };

  return (
    <div className={styles.overlay} onMouseDown={onBackdropMouseDown}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-label={mode === "edit" ? "Editar cliente" : "Adicionar cliente"}
        aria-labelledby={titleId}
        onMouseDown={stopPropagation}
      >
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.cnpjLeftIcon} aria-hidden="true" style={{ background: "transparent" }}>
              <Search size={18} />
            </div>
            <div id={titleId} className={styles.headerTitle}>
              {mode === "edit" ? "Editar cliente" : "Adicionar cliente"}
            </div>
          </div>
          <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Fechar">
            <X size={16} color="var(--atena-primary-400)" />
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.stepperWrap}>
            <div className={styles.stepper}>
              {[0, 1, 2].map((idx) => (
                <div
                  key={idx}
                  className={styles.stepBar}
                  style={{
                    width: `${segmentWidth(idx as 0 | 1 | 2)}px`,
                    background: segmentColor(idx as 0 | 1 | 2),
                  }}
                />
              ))}
            </div>
            <div className={styles.stepLabel}>{stepLabel}</div>
          </div>

          {renderStepBody()}
        </div>

        <div className={styles.footer}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={() => {
              if (step === 1) onClose();
              else setStep((s) => (s > 1 ? ((s - 1) as Step) : s));
            }}
          >
            {step === 1 ? "CANCELAR" : "VOLTAR"}
          </button>

          {step < 3 ? (
            <button
              type="button"
              className={styles.primaryButton}
              onClick={() => setStep((s) => (s === 1 ? 2 : 3))}
            >
              <span className={styles.primaryButtonText}>PRÓXIMO</span>
              <ChevronRight size={20} />
            </button>
          ) : (
            <button type="button" className={styles.primaryButton} onClick={onClose}>
              <CheckCircle size={20} />
              <span className={styles.primaryButtonText}>SALVAR</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

