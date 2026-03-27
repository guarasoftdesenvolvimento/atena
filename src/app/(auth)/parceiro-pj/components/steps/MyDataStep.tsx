import { ArrowLeft, ChevronDown, CircleDollarSign, NotebookText, Pencil, Phone } from "lucide-react";
import { firstAccessCompanyData, uiText } from "../../data";
import styles from "../../parceiro-pj.module.css";
import type { ProfileAccordionId } from "../../types";

interface MyDataStepProps {
  openProfileSections: ProfileAccordionId[];
  onToggleProfileSection: (sectionId: ProfileAccordionId) => void;
  onBack: () => void;
}

export default function MyDataStep({
  openProfileSections,
  onToggleProfileSection,
  onBack,
}: MyDataStepProps) {
  const companyIsOpen = openProfileSections.includes("company");
  const contactIsOpen = openProfileSections.includes("contact");
  const bankingIsOpen = openProfileSections.includes("banking");

  return (
    <div className={`${styles.content} ${styles.homeContent} ${styles.supportContent}`}>
      <header className={styles.contractsTopBar}>
        <button
          type="button"
          className={styles.contractsBackButton}
          aria-label="Voltar para Home"
          onClick={onBack}
        >
          <ArrowLeft size={24} strokeWidth={2.2} />
        </button>
        <h1 className={styles.contractsHeading}>{uiText.myData}</h1>
      </header>

      <section className={styles.profileAccordionList}>
        <article className={styles.profileAccordionCard}>
          <button
            type="button"
            className={styles.profileAccordionHeader}
            onClick={() => onToggleProfileSection("company")}
          >
            <span className={styles.profileAccordionTitleRow}>
              <span className={styles.profileAccordionIcon}>
                <NotebookText size={20} strokeWidth={2.1} />
              </span>
              <strong>{uiText.companyData}</strong>
            </span>
            <ChevronDown
              size={20}
              strokeWidth={2.2}
              className={`${styles.profileAccordionChevron} ${
                companyIsOpen ? styles.profileAccordionChevronOpen : ""
              }`}
            />
          </button>

          {companyIsOpen ? (
            <div className={styles.profileAccordionBody}>
              <div className={styles.profileFieldGroup}>
                <span>{uiText.razaoSocial}</span>
                <strong>{firstAccessCompanyData.razaoSocial}</strong>
              </div>
              <div className={styles.profileFieldGroup}>
                <span>CNPJ</span>
                <strong>{firstAccessCompanyData.cnpj}</strong>
              </div>
              <div className={styles.profileFieldGroup}>
                <span>{uiText.email}</span>
                <strong>{firstAccessCompanyData.email}</strong>
              </div>
              <div className={styles.profileFieldGroup}>
                <span>Telefone</span>
                <strong>{firstAccessCompanyData.telefone}</strong>
              </div>
              <div className={styles.profileFieldGroup}>
                <span>{uiText.endereco}</span>
                <strong>{firstAccessCompanyData.endereco}</strong>
              </div>
              <div className={styles.profileFieldGroup}>
                <span>{uiText.municipio}</span>
                <strong>{firstAccessCompanyData.municipio}</strong>
              </div>
              <div className={styles.profileFieldGroup}>
                <span>Estado</span>
                <strong>{firstAccessCompanyData.estado}</strong>
              </div>
              <div className={styles.profileFieldGroup}>
                <span>CNAE Principal</span>
                <div className={styles.profileChipRow}>
                  <span className={styles.profileChip}>{firstAccessCompanyData.cnaePrincipal}</span>
                </div>
              </div>
              <div className={styles.profileFieldGroup}>
                <span>{uiText.cnaesSecundarios}</span>
                <div className={styles.profileChipRow}>
                  {firstAccessCompanyData.cnaesSecundarios.map((cnae) => (
                    <span key={cnae} className={styles.profileChip}>
                      {cnae}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </article>

        <article className={styles.profileAccordionCard}>
          <button
            type="button"
            className={styles.profileAccordionHeader}
            onClick={() => onToggleProfileSection("contact")}
          >
            <span className={styles.profileAccordionTitleRow}>
              <span className={styles.profileAccordionIcon}>
                <Phone size={20} strokeWidth={2.1} />
              </span>
              <strong>{uiText.contactData}</strong>
            </span>
            <ChevronDown
              size={20}
              strokeWidth={2.2}
              className={`${styles.profileAccordionChevron} ${
                contactIsOpen ? styles.profileAccordionChevronOpen : ""
              }`}
            />
          </button>

          {contactIsOpen ? (
            <div className={styles.profileAccordionBody}>
              <div className={styles.profileFieldGroup}>
                <span>{uiText.responsible}</span>
                <div className={styles.profileFieldValueRow}>
                  <strong>{uiText.responsibleName}</strong>
                  <button type="button" className={styles.profileEditButton} aria-label="Editar responsável">
                    <Pencil size={14} strokeWidth={2.2} />
                  </button>
                </div>
              </div>
              <div className={styles.profileFieldGroup}>
                <span>{uiText.whatsapp}</span>
                <strong>{firstAccessCompanyData.telefone}</strong>
              </div>
              <div className={styles.profileFieldGroup}>
                <span>{uiText.email}</span>
                <strong>{firstAccessCompanyData.email}</strong>
              </div>
            </div>
          ) : null}
        </article>

        <article className={styles.profileAccordionCard}>
          <button
            type="button"
            className={styles.profileAccordionHeader}
            onClick={() => onToggleProfileSection("banking")}
          >
            <span className={styles.profileAccordionTitleRow}>
              <span className={styles.profileAccordionIcon}>
                <CircleDollarSign size={20} strokeWidth={2.1} />
              </span>
              <strong>{uiText.bankingData}</strong>
            </span>
            <ChevronDown
              size={20}
              strokeWidth={2.2}
              className={`${styles.profileAccordionChevron} ${
                bankingIsOpen ? styles.profileAccordionChevronOpen : ""
              }`}
            />
          </button>

          {bankingIsOpen ? (
            <div className={styles.profileAccordionBody}>
              <div className={styles.profileFieldGroup}>
                <span>{uiText.accountHolder}</span>
                <strong>{uiText.responsibleName}</strong>
              </div>
              <div className={styles.profileFieldGroup}>
                <span>{uiText.pixKeyType}</span>
                <strong>{uiText.pixKeyValue}</strong>
              </div>
            </div>
          ) : null}
        </article>
      </section>
    </div>
  );
}
