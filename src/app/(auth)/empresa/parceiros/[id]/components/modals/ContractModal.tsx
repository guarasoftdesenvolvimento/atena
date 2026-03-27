import React from "react";
import { CheckCircle2, ChevronDown, FolderOpen, X } from "lucide-react";
import styles from "../../../detalhes.module.css";
import type { ContractModalType } from "../../types";

export default function ContractModal({
  isOpen,
  onClose,
  type,
}: {
  isOpen: boolean;
  onClose: () => void;
  type: ContractModalType;
}) {
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
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContent}
        role="dialog"
        aria-modal="true"
        aria-label={type === "contrato" ? "Novo contrato" : "Novo aditivo"}
        style={{ width: '1000px', maxWidth: '95vw', padding: 0, overflow: 'visible' }}
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className={styles.editModalHeader}>
          <div className={styles.headerTitleGroup}>
            <FolderOpen size={24} className="text-[#345070]" />
            <h2 className={styles.modalSectionTitle} style={{ margin: 0, fontSize: '16px' }}>
              {type === "contrato" ? "Novo contrato" : "Novo aditivo"}
            </h2>
          </div>
          <div
            className={styles.closeContainer}
            role="button"
            tabIndex={0}
            aria-label="Fechar modal"
            onClick={onClose}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onClose();
              }
            }}
            style={{ width: '24px', height: '24px' }}
          >
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
              type="button"
              className={styles.btnCancel}
              onClick={onClose}
           >
              CANCELAR
           </button>
           <button
              type="button"
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
