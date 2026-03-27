import React from "react";
import {
  AlignLeft,
  Bold,
  CheckSquare,
  CheckCircle2,
  ChevronDown,
  Copy,
  Info,
  Italic,
  List,
  ListOrdered,
  PlayCircle,
  Redo2,
  Strikethrough,
  Underline,
  Undo2,
} from "lucide-react";
import styles from "../contratos.module.css";

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

export default function EditorSheet({ isOpen, onClose, title }: EditorSheetProps) {
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

  if (!isOpen) return null;

  return (
    <div
      className={`${styles.editorSheetOverlay} ${isOpen ? styles.editorSheetOverlayVisible : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={title || "Editor de modelo de contrato"}
    >
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
              onChange={() => {}}
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
