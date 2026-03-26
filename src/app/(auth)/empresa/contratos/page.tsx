"use client";

import React from "react";
import Link from "next/link";
import { Search, Filter, Info, ChevronRight, Bell, Building2, ChevronDown, ListFilter, ArrowDown, FolderOpen, Copy, CheckCircle2, X, Plus, Folder, FilePlus, PlayCircle, Square, CheckSquare, Undo2, Redo2, Bold, Italic, Underline, Strikethrough, AlignLeft, List, ListOrdered } from "lucide-react";
import styles from "./contratos.module.css";
import TopHeaderBar from "../components/TopHeaderBar";

type ContractStatus = "ativo" | "inativo";
type CategoryColor = "Green" | "Orange" | "Purple" | "Red" | "Yellow" | "Plus";
type ContractCategory = { name: string; color: CategoryColor };
type ContractRow = {
  id: number;
  partnerName: string;
  modelo: string;
  verificado: boolean;
  categorias: ContractCategory[];
  vigencia: string;
  status: ContractStatus;
};
type ModeloRow = {
  id: number;
  modelo: string;
  verificado: boolean;
  criadoEm: string;
  atualizadoEm: string;
};

const contracts: ContractRow[] = [
  {
    id: 1,
    partnerName: "Felipe Alves dos Santos",
    modelo: "CONTRATO PRESTAÇÃO GERAL",
    verificado: true,
    categorias: [{ name: "Categoria 1", color: "Green" }, { name: "+1", color: "Plus" }],
    vigencia: "08/07/2025",
    status: "ativo"
  },
  {
    id: 2,
    partnerName: "Felipe Alves dos Santos",
    modelo: "ADITIVO PRESTAÇÃO DE SERVIÇOS FRONT-END",
    verificado: true,
    categorias: [{ name: "Categoria 1", color: "Purple" }, { name: "+3", color: "Plus" }],
    vigencia: "08/07/2025",
    status: "ativo"
  },
  {
    id: 3,
    partnerName: "Felipe Alves dos Santos",
    modelo: "ADITIVO PRESTAÇÃO DE SERVIÇOS FRONT-END",
    verificado: false,
    categorias: [{ name: "Categoria 1", color: "Red" }],
    vigencia: "08/07/2025",
    status: "ativo"
  },
  {
    id: 4,
    partnerName: "Felipe Alves dos Santos",
    modelo: "ADITIVO PRESTAÇÃO DE SERVIÇOS FRONT-END",
    verificado: false,
    categorias: [{ name: "Categoria 1", color: "Red" }],
    vigencia: "08/07/2025",
    status: "ativo"
  },
  {
    id: 5,
    partnerName: "Felipe Alves dos Santos",
    modelo: "ADITIVO PRESTAÇÃO DE SERVIÇOS FRONT-END",
    verificado: false,
    categorias: [{ name: "Categoria 1", color: "Red" }],
    vigencia: "08/07/2025",
    status: "ativo"
  }
];

const modelos: ModeloRow[] = [
  {
    id: 1,
    modelo: "CONTRATO PRESTAÇÃO GERAL",
    verificado: true,
    criadoEm: "08/07/2025",
    atualizadoEm: "08/07/2025"
  },
  {
    id: 2,
    modelo: "ADITIVO PRESTAÇÃO DE SERVIÇOS FRONT-END",
    verificado: true,
    criadoEm: "08/07/2025",
    atualizadoEm: "08/07/2025"
  },
  {
    id: 3,
    modelo: "ADITIVO PRESTAÇÃO DE SERVIÇOS FRONT-END",
    verificado: false,
    criadoEm: "08/07/2025",
    atualizadoEm: "08/07/2025"
  },
  {
    id: 4,
    modelo: "ADITIVO PRESTAÇÃO DE SERVIÇOS FRONT-END",
    verificado: false,
    criadoEm: "08/07/2025",
    atualizadoEm: "08/07/2025"
  },
  {
    id: 5,
    modelo: "ADITIVO PRESTAÇÃO DE SERVIÇOS FRONT-END",
    verificado: false,
    criadoEm: "08/07/2025",
    atualizadoEm: "08/07/2025"
  }
];

interface FilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

function FilterSheet({ isOpen, onClose }: FilterSheetProps) {
  const [statusFilter, setStatusFilter] = React.useState("todos");
  const [categoryFilter, setCategoryFilter] = React.useState("todos");
  const [startDate, setStartDate] = React.useState("2025-01-01");
  const [endDate, setEndDate] = React.useState("2025-02-02");

  const handleClear = () => {
    setStatusFilter("todos");
    setCategoryFilter("todos");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`} onClick={onClose}>
      <div className={`${styles.sheet} ${isOpen ? styles.sheetVisible : ''}`} onClick={e => e.stopPropagation()}>
        <div className={styles.sheetHeader}>
          <h2 className={styles.sheetTitle}>Filtros:</h2>
        </div>

        <div className={styles.sheetBody}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Filtrar por status</label>
            <select
              className={`${styles.inputField} ${styles.selectControl}`}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="todos">Todos</option>
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Filtrar por categoria</label>
            <select
              className={`${styles.inputField} ${styles.selectControl}`}
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="todos">Todos</option>
              <option value="categoria-1">Categoria 1</option>
              <option value="categoria-2">Categoria 2</option>
              <option value="categoria-3">Categoria 3</option>
              <option value="categoria-4">Categoria 4</option>
              <option value="categoria-5">Categoria 5</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Filtrar por data</label>
            <div className={styles.dateRangeRow}>
              <div style={{ flex: 1 }}>
                <span className={styles.filterLabel} style={{ marginBottom: 4, display: 'block', color: '#8f9092' }}>De</span>
                <input
                  type="date"
                  className={styles.dateInput}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div style={{ flex: 1 }}>
                <span className={styles.filterLabel} style={{ marginBottom: 4, display: 'block', color: '#8f9092' }}>Até</span>
                <input
                  type="date"
                  className={styles.dateInput}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.sheetFooter}>
          <button
            className={styles.clearButton}
            onClick={() => {
              handleClear();
              onClose();
            }}
          >
            LIMPAR
          </button>
          <button className={styles.applyButton} onClick={onClose}>
            <ListFilter size={20} />
            APLICAR FILTRO
          </button>
        </div>
      </div>
    </div>
  );
}

interface NewModelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: (type: "CONTRATO" | "ADITIVO") => void;
}

function NewModelModal({ isOpen, onClose, onNext }: NewModelModalProps) {
  const [selectedModel, setSelectedModel] = React.useState<"CONTRATO" | "ADITIVO">("CONTRATO");

  if (!isOpen) return null;

  return (
    <div className={`${styles.modalOverlay} ${isOpen ? styles.modalOverlayVisible : ''}`} onClick={onClose}>
      <div className={styles.modalContainer} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div className={styles.modalTitleGroup}>
            <Folder size={24} color="#345070" />
            <h2 className={styles.modalTitle}>Novo modelo de contrato</h2>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.modalBody}>
          <p className={styles.modalSubtitle}>Qual modelo você quer criar?</p>
          <div className={styles.selectionBoxes}>
            <div
              className={`${styles.selectionBox} ${selectedModel === "CONTRATO" ? styles.selectionBoxActive : ''}`}
              onClick={() => setSelectedModel("CONTRATO")}
            >
              <div className={styles.boxIcon}>
                <Folder size={20} />
              </div>
              <span className={styles.boxLabel}>Modelo de contrato</span>
            </div>
            <div
              className={`${styles.selectionBox} ${selectedModel === "ADITIVO" ? styles.selectionBoxActive : ''}`}
              onClick={() => setSelectedModel("ADITIVO")}
            >
              <div className={styles.boxIcon}>
                <FilePlus size={20} />
              </div>
              <span className={styles.boxLabel}>Modelo de termo aditivo</span>
            </div>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.cancelButton} onClick={onClose}>
            CANCELAR
          </button>
          <button className={styles.nextButton} onClick={() => onNext(selectedModel)}>
            PRÓXIMO <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

interface NewContratoModelFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onNext: () => void;
}

function NewContratoModelFormModal({ isOpen, onClose, onBack, onNext }: NewContratoModelFormModalProps) {
  const [nome, setNome] = React.useState("");
  const [descricao, setDescricao] = React.useState("");
  const [categoria, setCategoria] = React.useState("");

  if (!isOpen) return null;

  return (
    <div className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`} onClick={onClose}>
      <div className={`${styles.sheet} ${isOpen ? styles.sheetVisible : ''}`} style={{ width: 500, padding: 0 }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div className={styles.modalHeader}>
          <div className={styles.modalTitleGroup}>
            <button className={styles.backButton} onClick={onBack}>
              <ChevronRight size={20} style={{ transform: 'rotate(180deg)' }} />
            </button>
            <Folder size={24} color="#345070" />
            <h2 className={styles.modalTitle}>Novo modelo de contrato</h2>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.modalBody} style={{ flex: 1, overflowY: 'auto', maxHeight: 'none' }}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Nome do modelo</label>
              <input
                type="text"
                className={styles.formInput}
                placeholder="Ex: Contrato de Prestação de Serviços"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Descrição</label>
              <textarea
                className={styles.formTextarea}
                placeholder="Descreva o propósito deste modelo..."
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Categoria</label>
              <div className={styles.selectField}>
                <span>Selecione uma categoria</span>
                <ChevronDown size={20} color="#737791" />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.modalFooter} style={{ marginTop: 'auto' }}>
          <button className={styles.cancelButton} onClick={onClose}>
            CANCELAR
          </button>
          <button className={styles.nextButton} onClick={onNext}>
            CRIAR MODELO <ChevronRight size={20} />
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}

interface NewAditivoModelFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onNext: () => void;
}

function NewAditivoModelFormModal({ isOpen, onClose, onBack, onNext }: NewAditivoModelFormModalProps) {
  const [nome, setNome] = React.useState("");
  const [descricao, setDescricao] = React.useState("");
  const [categoria, setCategoria] = React.useState("");

  if (!isOpen) return null;

  return (
    <div className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`} onClick={onClose}>
      <div className={`${styles.sheet} ${isOpen ? styles.sheetVisible : ''}`} style={{ width: 500, padding: 0 }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div className={styles.modalHeader}>
          <div className={styles.modalTitleGroup}>
            <button className={styles.backButton} onClick={onBack}>
              <ChevronRight size={20} style={{ transform: 'rotate(180deg)' }} />
            </button>
            <FilePlus size={24} color="#345070" />
            <h2 className={styles.modalTitle}>Novo modelo de termo aditivo</h2>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.modalBody} style={{ flex: 1, overflowY: 'auto', maxHeight: 'none' }}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Nome do modelo</label>
              <input
                type="text"
                className={styles.formInput}
                placeholder="Ex: Aditivo de Reajuste Salarial"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Descrição</label>
              <textarea
                className={styles.formTextarea}
                placeholder="Descreva o propósito deste modelo..."
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Categoria</label>
              <div className={styles.selectField}>
                <span>Selecione uma categoria</span>
                <ChevronDown size={20} color="#737791" />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.modalFooter} style={{ marginTop: 'auto' }}>
          <button className={styles.cancelButton} onClick={onClose}>
            CANCELAR
          </button>
          <button className={styles.nextButton} onClick={onNext}>
            CRIAR MODELO <ChevronRight size={20} />
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}



const ALL_VARIABLES = [
  "{{PARCEIRO_RAZAO_SOCIAL}}",
  "{{PARCEIRO_CNPJ}}",
  "{{PARCEIRO_ENDERECO}}",
  "{{PARCEIRO_REP_NOME}}",
  "{{PARCEIRO_REP_CPF}}",
  "{{PARCEIRO_REP_EMAIL}}",
  "{{PARCEIRO_REP_TELEFONE}}",
  "{{DATA_ASSINATURA_PARCEIRO}}",
  "{{CONTRATANTE_RAZAO_SOCIAL}}",
  "{{CONTRATANTE_CNPJ}}",
  "{{CONTRATANTE_ENDERECO}}",
  "{{CONTRATANTE_REP_NOME}}",
  "{{CONTRATANTE_REP_CPF}}",
  "{{CONTRATANTE_REP_EMAIL}}",
  "{{CONTRATANTE_REP_TELEFONE}}",
  "{{DATA_ASSINATURA_EMPRESA}}",
  "{{VALOR_HORA}}",
  "{{QTD_HORAS}}",
  "{{DATA_INICIO}}",
  "{{DATA_FIM}}",
  "{{DIA_PAGAMENTO}}",
  "{{OBJETO_CONTRATO}}",
];

// Required (mandatory) variables - the ones shown in the sidebar
const REQUIRED_VARIABLES = [
  "{{PARCEIRO_RAZAO_SOCIAL}}",
  "{{PARCEIRO_CNPJ}}",
  "{{PARCEIRO_ENDERECO}}",
  "{{PARCEIRO_REP_NOME}}",
  "{{PARCEIRO_REP_CPF}}",
  "{{PARCEIRO_REP_EMAIL}}",
  "{{PARCEIRO_REP_TELEFONE}}",
];

interface EditorSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

function EditorSheet({ isOpen, onClose, title }: EditorSheetProps) {
  const [pjOpen, setPjOpen] = React.useState(true);
  const [contratanteOpen, setContratanteOpen] = React.useState(false);
  const [contratoOpen, setContratoOpen] = React.useState(false);
  const [pastedVariables, setPastedVariables] = React.useState<Set<string>>(new Set());
  const [copiedTag, setCopiedTag] = React.useState<string | null>(null);
  const copiedTimeoutRef = React.useRef<number | null>(null);
  const editorRef = React.useRef<HTMLDivElement>(null);

  const total = REQUIRED_VARIABLES.length;
  const filled = REQUIRED_VARIABLES.filter(v => pastedVariables.has(v)).length;
  const progressPct = total > 0 ? Math.round((filled / total) * 100) : 0;
  const allFilled = filled === total;

  const handleEditorInput = () => {
    const text = editorRef.current?.innerText ?? "";
    const found = new Set<string>();
    for (const v of ALL_VARIABLES) {
      if (text.includes(v)) found.add(v);
    }
    setPastedVariables(found);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTag(text);
    if (copiedTimeoutRef.current) {
      window.clearTimeout(copiedTimeoutRef.current);
    }
    copiedTimeoutRef.current = window.setTimeout(() => {
      setCopiedTag(null);
      copiedTimeoutRef.current = null;
    }, 1500);
  };

  React.useEffect(() => {
    return () => {
      if (copiedTimeoutRef.current) {
        window.clearTimeout(copiedTimeoutRef.current);
      }
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className={`${styles.editorSheetOverlay} ${isOpen ? styles.editorSheetOverlayVisible : ''}`}>
      <div className={styles.editorHeader}>
        <div className={styles.editorHeaderTitle}>{title || "Novo modelo de contrato"}</div>
        <div className={styles.editorProgressContainer}>
          <p className={styles.editorProgressText}>{filled} de {total} preenchidas</p>
          <div className={styles.editorProgressBar}>
            <div className={styles.editorProgressBarFill} style={{ width: `${progressPct}%` }} />
          </div>
        </div>
        <div className={styles.editorHeaderActions}>
          <button className={styles.editorCancelButton} onClick={onClose}>
            CANCELAR
          </button>
          <button
            className={allFilled ? styles.editorPublishButton : styles.editorPublishButtonDisabled}
            disabled={!allFilled}
          >
            <CheckCircle2 size={24} color={allFilled ? "#ffffff" : "#8f9092"} />
            PUBLICAR MODELO
          </button>
        </div>
      </div>

      <div className={styles.editorBody}>
        {/* Sidebar */}
        <div className={styles.editorSidebar}>
          <div className={styles.editorInstructions}>
            <div className={styles.editorInstructionsHeader}>
              <h3 className={styles.editorInstructionsTitle}>Instruções</h3>
              <button className={styles.editorTutorialButton}>
                <PlayCircle size={20} color="#527ca5" />
                <span className={styles.editorTutorialButtonText}>Ver tutorial</span>
              </button>
            </div>
            <div className={styles.editorInstructionsText}>
              <p style={{ marginBottom: 16 }}>Copie e cole as variáveis no texto ao lado para que as informações sejam preenchidas automaticamente durante a criação do contrato.</p>
              <p className={styles.editorInstructionsSubtext}>A variável só funciona se for colada exatamente como aparece aqui, incluindo as chaves {`{{ }}`}.</p>
            </div>
          </div>

          <div className={styles.editorInputGroup}>
            <label className={styles.editorInputLabel}>Qual o nome do novo modelo de contrato?</label>
            <input 
              className={styles.editorInput} 
              defaultValue="ADITIVO CONTRATUAL DE PREST..." 
              onChange={(e) => {}}
            />
          </div>

          <div className={styles.editorDivider} />

          <div className={styles.editorVariablesTitleGroup}>
            <div className={styles.editorVariablesIcon}>
              <CheckSquare size={16} color="#ffffff" />
            </div>
            <h3 className={styles.editorVariablesTitle}>Variáveis Obrigatórias</h3>
          </div>

          <div className={styles.editorVariablesProgressBlock}>
            <p className={styles.editorVariablesProgressMinText}>{filled} de {total} preenchidas</p>
            <div className={styles.editorProgressBar}>
               <div className={styles.editorProgressBarFill} style={{ width: `${progressPct}%` }} />
            </div>
          </div>

          {/* Accordion List */}
          <div className={styles.editorVariablesList}>
            {/* DADOS DO PARCEIRO PJ */}
            <div className={styles.editorAccordion}>
              <button className={styles.editorAccordionHeader} onClick={() => setPjOpen(!pjOpen)}>
                DADOS DO PARCEIRO PJ (CONTRATADA)
                <ChevronDown size={24} color="#345070" style={{ transform: pjOpen ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
              </button>
              {pjOpen && (
                <div className={styles.editorAccordionContent}>
                  <VariableListItem tag="{{PARCEIRO_RAZAO_SOCIAL}}" desc="Será substituído pela razão social da empresa parceira (Contratada)." isDone={pastedVariables.has("{{PARCEIRO_RAZAO_SOCIAL}}")} onCopy={copyToClipboard} isCopied={copiedTag === "{{PARCEIRO_RAZAO_SOCIAL}}"} />
                  <VariableListItem tag="{{PARCEIRO_CNPJ}}" desc="Será substituído pelo número do CNPJ da empresa parceira." isDone={pastedVariables.has("{{PARCEIRO_CNPJ}}")} onCopy={copyToClipboard} isCopied={copiedTag === "{{PARCEIRO_CNPJ}}"} />
                  <VariableListItem tag="{{PARCEIRO_ENDERECO}}" desc="Será substituído pelo endereço completo da empresa parceira." isDone={pastedVariables.has("{{PARCEIRO_ENDERECO}}")} onCopy={copyToClipboard} isCopied={copiedTag === "{{PARCEIRO_ENDERECO}}"} />
                  <VariableListItem tag="{{PARCEIRO_REP_NOME}}" desc="Será substituído pelo nome completo do representante legal da empresa parceira." isDone={pastedVariables.has("{{PARCEIRO_REP_NOME}}")} onCopy={copyToClipboard} isCopied={copiedTag === "{{PARCEIRO_REP_NOME}}"} />
                  <VariableListItem tag="{{PARCEIRO_REP_CPF}}" desc="Será substituído pelo CPF do representante legal da empresa parceira." isDone={pastedVariables.has("{{PARCEIRO_REP_CPF}}")} onCopy={copyToClipboard} isCopied={copiedTag === "{{PARCEIRO_REP_CPF}}"} />
                  <VariableListItem tag="{{PARCEIRO_REP_EMAIL}}" desc="Será substituído pelo e-mail do representante legal da empresa parceira." isDone={pastedVariables.has("{{PARCEIRO_REP_EMAIL}}")} onCopy={copyToClipboard} isCopied={copiedTag === "{{PARCEIRO_REP_EMAIL}}"} />
                  <VariableListItem tag="{{PARCEIRO_REP_TELEFONE}}" desc="Será substituído pelo telefone do representante legal da empresa parceira." isDone={pastedVariables.has("{{PARCEIRO_REP_TELEFONE}}")} onCopy={copyToClipboard} isCopied={copiedTag === "{{PARCEIRO_REP_TELEFONE}}"} />
                  <VariableListItem tag="{{DATA_ASSINATURA_PARCEIRO}}" desc="Será substituído automaticamente pela data em que o parceiro assinou o contrato." isDone={pastedVariables.has("{{DATA_ASSINATURA_PARCEIRO}}")} onCopy={copyToClipboard} isCopied={copiedTag === "{{DATA_ASSINATURA_PARCEIRO}}"} />
                </div>
              )}
            </div>

            {/* DADOS DO CONTRATANTE */}
            <div className={styles.editorAccordion}>
              <button className={styles.editorAccordionHeader} onClick={() => setContratanteOpen(!contratanteOpen)}>
                DADOS DO CONTRATANTE
                <ChevronDown size={24} color="#345070" style={{ transform: contratanteOpen ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
              </button>
              {contratanteOpen && (
                <div className={styles.editorAccordionContent}>
                  <VariableListItem tag="{{CONTRATANTE_RAZAO_SOCIAL}}" desc="Será substituído pela razão social da empresa contratante." isDone={pastedVariables.has("{{CONTRATANTE_RAZAO_SOCIAL}}")} onCopy={copyToClipboard} isCopied={copiedTag === "{{CONTRATANTE_RAZAO_SOCIAL}}"} />
                  <VariableListItem tag="{{CONTRATANTE_CNPJ}}" desc="Será substituído pelo número do CNPJ da empresa contratante." isDone={pastedVariables.has("{{CONTRATANTE_CNPJ}}")} onCopy={copyToClipboard} isCopied={copiedTag === "{{CONTRATANTE_CNPJ}}"} />
                  <VariableListItem tag="{{CONTRATANTE_ENDERECO}}" desc="Será substituído pelo endereço completo da empresa contratante." isDone={pastedVariables.has("{{CONTRATANTE_ENDERECO}}")} onCopy={copyToClipboard} isCopied={copiedTag === "{{CONTRATANTE_ENDERECO}}"} />
                  <VariableListItem tag="{{CONTRATANTE_REP_NOME}}" desc="Será substituído pelo nome completo do representante legal da empresa contratante." isDone={pastedVariables.has("{{CONTRATANTE_REP_NOME}}")} onCopy={copyToClipboard} isCopied={copiedTag === "{{CONTRATANTE_REP_NOME}}"} />
                  <VariableListItem tag="{{CONTRATANTE_REP_CPF}}" desc="Será substituído pelo CPF do representante legal da empresa contratante." isDone={pastedVariables.has("{{CONTRATANTE_REP_CPF}}")} onCopy={copyToClipboard} isCopied={copiedTag === "{{CONTRATANTE_REP_CPF}}"} />
                  <VariableListItem tag="{{CONTRATANTE_REP_EMAIL}}" desc="Será substituído pelo e-mail do representante legal da empresa contratante." isDone={pastedVariables.has("{{CONTRATANTE_REP_EMAIL}}")} onCopy={copyToClipboard} isCopied={copiedTag === "{{CONTRATANTE_REP_EMAIL}}"} />
                  <VariableListItem tag="{{CONTRATANTE_REP_TELEFONE}}" desc="Será substituído pelo telefone do representante legal da empresa contratante." isDone={pastedVariables.has("{{CONTRATANTE_REP_TELEFONE}}")} onCopy={copyToClipboard} isCopied={copiedTag === "{{CONTRATANTE_REP_TELEFONE}}"} />
                  <VariableListItem tag="{{DATA_ASSINATURA_EMPRESA}}" desc="Será substituído automaticamente pela data em que a empresa assinou o contrato." isDone={pastedVariables.has("{{DATA_ASSINATURA_EMPRESA}}")} onCopy={copyToClipboard} isCopied={copiedTag === "{{DATA_ASSINATURA_EMPRESA}}"} />
                </div>
              )}
            </div>

            {/* DADOS DO CONTRATO */}
            <div className={styles.editorAccordion}>
              <button className={styles.editorAccordionHeader} onClick={() => setContratoOpen(!contratoOpen)}>
                DADOS DO CONTRATO
                <ChevronDown size={24} color="#345070" style={{ transform: contratoOpen ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
              </button>
              {contratoOpen && (
                <div className={styles.editorAccordionContent}>
                  <VariableListItem tag="{{VALOR_HORA}}" desc="Será substituído pelo valor combinado por hora trabalhada." isDone={pastedVariables.has("{{VALOR_HORA}}")} onCopy={copyToClipboard} isCopied={copiedTag === "{{VALOR_HORA}}"} />
                  <VariableListItem tag="{{QTD_HORAS}}" desc="Será substituído pela quantidade mensal de horas contratadas." isDone={pastedVariables.has("{{QTD_HORAS}}")} onCopy={copyToClipboard} isCopied={copiedTag === "{{QTD_HORAS}}"} />
                  <VariableListItem tag="{{DATA_INICIO}}" desc="Será substituído pela data de início da vigência do contrato." isDone={pastedVariables.has("{{DATA_INICIO}}")} onCopy={copyToClipboard} isCopied={copiedTag === "{{DATA_INICIO}}"} />
                  <VariableListItem tag="{{DATA_FIM}}" desc="Será substituído pela data de fim da vigência do contrato (se aplicável)." isDone={pastedVariables.has("{{DATA_FIM}}")} onCopy={copyToClipboard} isCopied={copiedTag === "{{DATA_FIM}}"} />
                  <VariableListItem tag="{{DIA_PAGAMENTO}}" desc="Será substituído pelo dia do mês definido para o pagamento." isDone={pastedVariables.has("{{DIA_PAGAMENTO}}")} onCopy={copyToClipboard} isCopied={copiedTag === "{{DIA_PAGAMENTO}}"} />
                  <VariableListItem tag="{{OBJETO_CONTRATO}}" desc="Será substituído pela descrição detalhada do serviço contratado." isDone={pastedVariables.has("{{OBJETO_CONTRATO}}")} onCopy={copyToClipboard} isCopied={copiedTag === "{{OBJETO_CONTRATO}}"} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Area */}
        <div className={styles.editorMainContent}>
          <span className={styles.editorMainLabel}>Editor de contrato</span>
          <div className={styles.editorToolbar}>
            <div className={styles.editorToolbarGroup}>
              <button className={styles.editorToolbarBtn}><Undo2 size={16} /></button>
              <button className={styles.editorToolbarBtn}><Redo2 size={16} /></button>
            </div>
            <div className={styles.editorToolbarGroup}>
              <button className={styles.editorToolbarBtn}><Bold size={16} /></button>
              <button className={styles.editorToolbarBtn}><Italic size={16} /></button>
              <button className={styles.editorToolbarBtn}><Underline size={16} /></button>
              <button className={styles.editorToolbarBtn}><Strikethrough size={16} /></button>
            </div>
            <div className={styles.editorToolbarGroup}>
              <button className={styles.editorToolbarBtn}><AlignLeft size={16} /></button>
            </div>
            <div className={styles.editorToolbarGroup}>
              <button className={styles.editorToolbarBtn}><List size={16} /></button>
              <button className={styles.editorToolbarBtn}><ListOrdered size={16} /></button>
            </div>
          </div>
          <div
            ref={editorRef}
            className={styles.editorTextAreaContainer}
            contentEditable
            suppressContentEditableWarning
            onInput={handleEditorInput}
            data-placeholder="Cole aqui o texto do seu contrato"
          />

          <div className={styles.editorAccordionFooter}>
            <div className={styles.editorFooterWarning}>
              <div className={styles.editorFooterWarningIcon}>
                <Info size={16} />
              </div>
              <p className={styles.editorFooterWarningText}>Para publicar, insira todas as variáveis obrigatórias no contrato</p>
            </div>
            <div className={styles.editorActionRow}>
              <button className={styles.editorCancelButton} onClick={onClose}>
                CANCELAR
              </button>
              <button
                className={allFilled ? styles.editorPublishButton : styles.editorPublishButtonDisabled}
                disabled={!allFilled}
              >
                <CheckCircle2 size={24} color={allFilled ? "#ffffff" : "#8f9092"} />
                PUBLICAR MODELO
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface VariableListItemProps {
  tag: string;
  desc: string;
  isDone: boolean;
  isCopied: boolean;
  onCopy: (text: string) => void;
}

function VariableListItem({ tag, desc, isDone, isCopied, onCopy }: VariableListItemProps) {
  return (
    <div className={`${styles.editorVariableItemStatus} ${isDone ? styles.editorVariableItemStatusDone : ''}`}>
      <div className={styles.editorVariableHeader}>
        <div className={styles.editorVariableCopyTagGroup}>
          <span className={`${styles.editorVariableTag} ${isDone ? styles.editorVariableTagDone : ''}`}>{tag}</span>
          <button className={`${styles.editorVariableCopyBtn} ${isCopied ? styles.editorVariableCopyBtnCopied : ''}`} onClick={() => onCopy(tag)}>
            <Copy size={12} color={isCopied ? "#019361" : "#5c5e60"} />
            <span className={styles.editorVariableCopyText}>{isCopied ? "Copiado!" : "Copiar"}</span>
          </button>
        </div>
      </div>
      <p className={`${styles.editorVariableDesc} ${isDone ? styles.editorVariableDescDone : ''}`}>{desc}</p>
    </div>
  );
}



interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWatch: () => void;
}

function TutorialModal({ isOpen, onClose, onWatch }: TutorialModalProps) {
  const [dontShowAgain, setDontShowAgain] = React.useState(false);

  if (!isOpen) return null;

  return (
    <div className={`${styles.modalOverlay} ${isOpen ? styles.modalOverlayVisible : ''}`} onClick={onClose}>
      <div className={styles.modalContainer} style={{ width: 440 }} onClick={e => e.stopPropagation()}>
        <div style={{ position: 'relative' }}>
          <button
            className={styles.closeButton}
            onClick={onClose}
            style={{ position: 'absolute', top: 16, right: 16, backgroundColor: '#dfe8ff', color: '#527ca5' }}
          >
            <X size={20} />
          </button>

          <div className={styles.tutorialContent}>
            <div className={styles.tutorialVideoBox}>
              <PlayCircle size={64} className={styles.tutorialVideoIcon} />
            </div>

            <div className={styles.tutorialTextGroup}>
              <div className={styles.tutorialBlock}>
                <h3 className={styles.tutorialMainTitle}>Antes de começar...</h3>
                <p className={styles.tutorialDesc}>
                  Para criar um modelo de contrato funcional, é importante entender como as variáveis funcionam.<br />
                  <span className={styles.tutorialDescBold}>Preparamos um vídeo rápido mostrando o passo a passo.</span>
                </p>
              </div>

              <div className={styles.tutorialBlock}>
                <h4 className={styles.tutorialSubtitle}>O que você vai aprender:</h4>
                <ul className={styles.tutorialList}>
                  <li>Como usar variáveis no texto do contrato</li>
                  <li>Como garantir que os dados sejam preenchidos automaticamente</li>
                  <li>Como estruturar seu modelo sem erros</li>
                </ul>
              </div>

              <div className={styles.tutorialInfoRow}>
                <Info size={16} color="#5c5e60" />
                <p className={styles.tutorialInfoText}>O editor será habilitado após assistir ao tutorial.</p>
              </div>
            </div>

            <div className={styles.tutorialActionGroup}>
              <button className={styles.tutorialWatchButton} onClick={onWatch}>
                <PlayCircle size={20} color="#ffffff" />
                <span className={styles.tutorialWatchText}>ASSISTIR TUTORIAL</span>
              </button>

              <div className={styles.dontShowRow} onClick={() => setDontShowAgain(!dontShowAgain)}>
                {dontShowAgain ? <CheckSquare size={16} color="#5352ed" /> : <Square size={16} color="#5352ed" />}
                <span className={styles.dontShowText}>Não mostrar isso novamente.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContratosPage() {
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = React.useState(false);
  const [isEditorOpen, setIsEditorOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<"CONTRATOS" | "MODELOS">("CONTRATOS");

  const handleNewModelNext = (_type: "CONTRATO" | "ADITIVO") => {
    setIsModalOpen(false);
    setIsTutorialOpen(true);
  };

  const handleWatchTutorial = () => {
    setIsTutorialOpen(false);
    setIsEditorOpen(true);
  };

  return (
    <div className={styles.container}>
      {/* Header Adaptado para Empresa */}
      <TopHeaderBar title="Contratos" hasNotifications={false} />

      <div className={styles.contentWrapper}>
        <div className={styles.toolbarRow}>
          <div className={styles.tabsGroup}>
            <div
              className={`${styles.tabBtn} ${activeTab === "CONTRATOS" ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab("CONTRATOS")}
            >
              <FolderOpen size={18} /> CONTRATOS
            </div>
            <div
              className={`${styles.tabBtn} ${activeTab === "MODELOS" ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab("MODELOS")}
            >
              <Copy size={18} /> MODELOS
            </div>
          </div>

          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <div className={styles.searchBox}>
              <Search size={16} color="#c1c1c1" />
              <input
                className={styles.searchInput}
                placeholder={activeTab === "CONTRATOS" ? "Pesquise pelo nome do parceiro" : "Pesquise pelo nome do modelo"}
              />
            </div>
            {activeTab === "MODELOS" && (
              <button
                className={styles.primaryButton}
                onClick={() => setIsModalOpen(true)}
              >
                <Plus size={24} />
                Novo modelo
              </button>
            )}
          </div>
        </div>

        <div className={styles.tableCard}>
          <div className={styles.cardTopRow}>
            <span className={styles.totalText}>{activeTab === "CONTRATOS" ? `${contracts.length} Contratos` : `${modelos.length} Modelos`}</span>
            <button className={styles.filterButton} onClick={() => setIsFilterOpen(true)}>
              <Filter size={20} color="#5352ed" />
              <span>FILTROS</span>
            </button>
          </div>

          {activeTab === "CONTRATOS" ? (
            <>
              <div className={styles.tableHeader}>
                <div className={styles.thText}>Parceiro PJ</div>
                <div className={styles.thText}>Modelo</div>
                <div className={styles.thText} style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>Verificado <Info size={14} /></div>
                <div className={styles.thText}>Categoria</div>
                <div className={styles.thText}>Vigência</div>
                <div className={styles.thText}>Situação</div>
                <div className={styles.thText} style={{ justifyContent: 'flex-end' }}>Ações</div>
              </div>

              <div className={styles.tableBody}>
                {contracts.map((contract) => (
                  <Link
                    key={contract.id}
                    href={`/empresa/parceiros/${contract.id}?tab=Contratos`}
                    className={styles.row}
                  >
                    <div className={styles.tdTitle}>{contract.partnerName}</div>
                    <div className={styles.tdText}>{contract.modelo}</div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      {contract.verificado ? (
                        <div className={`${styles.verifyBadge} ${styles.verifyValid}`}>
                          <CheckCircle2 size={12} strokeWidth={3} />
                        </div>
                      ) : (
                        <div className={`${styles.verifyBadge} ${styles.verifyInvalid}`}>
                          <X size={12} strokeWidth={3} />
                        </div>
                      )}
                    </div>
                    <div className={styles.categoriesList}>
                      {contract.categorias.map((cat) => (
                        <span key={`${contract.id}-${cat.name}-${cat.color}`} className={cat.color === 'Plus' ? styles.catPlus : `${styles.categoryTag} ${cat.color === 'Green' ? styles.catGreen :
                            cat.color === 'Orange' ? styles.catOrange :
                              cat.color === 'Purple' ? styles.catPurple :
                                cat.color === 'Red' ? styles.catRed :
                                  styles.catYellow
                          }`}>
                          {cat.name}
                        </span>
                      ))}
                    </div>
                    <div className={styles.tdText}>{contract.vigencia}</div>
                    <div>
                      <span className={`${styles.statusPill} ${contract.status === 'ativo' ? styles.statusAtivo : ''
                        }`}>
                        {contract.status === 'ativo' ? 'Ativo' : contract.status}
                      </span>
                    </div>
                    <div className={styles.actions}>
                      <ChevronRight size={16} color="#8f9092" />
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className={styles.tableHeaderModelos}>
                <div className={styles.thText}>Modelo</div>
                <div className={styles.thText} style={{ justifyContent: 'center' }}>Verificado <Info size={14} /></div>
                <div className={styles.thText}>Criado em</div>
                <div className={styles.thText}>Atualizado em</div>
                <div className={styles.thText} style={{ justifyContent: 'flex-end' }}>Ações</div>
              </div>

              <div className={styles.tableBody}>
                {modelos.map((modelo) => (
                  <div key={modelo.id} className={styles.rowModelos}>
                    <div className={styles.tdText} style={{ fontWeight: 500 }}>{modelo.modelo}</div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      {modelo.verificado ? (
                        <div className={`${styles.verifyBadge} ${styles.verifyValid}`}>
                          <CheckCircle2 size={12} strokeWidth={3} />
                        </div>
                      ) : (
                        <div className={`${styles.verifyBadge} ${styles.verifyInvalid}`}>
                          <X size={12} strokeWidth={3} />
                        </div>
                      )}
                    </div>
                    <div className={styles.tdText}>{modelo.criadoEm}</div>
                    <div className={styles.tdText}>{modelo.atualizadoEm}</div>
                    <div className={styles.actions}>
                      <ChevronRight size={16} color="#8f9092" />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <FilterSheet isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
      <NewModelModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onNext={handleNewModelNext} />
      <TutorialModal isOpen={isTutorialOpen} onClose={() => setIsTutorialOpen(false)} onWatch={handleWatchTutorial} />
      <EditorSheet isOpen={isEditorOpen} onClose={() => setIsEditorOpen(false)} title="Novo modelo de contrato" />
    </div>
  );
}
