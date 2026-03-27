import Image from "next/image";
import { ChevronRight } from "lucide-react";
import {
  companyIllustrationSrc,
  firstAccessCompanyData,
  successIllustrationSrc,
  uiText,
} from "../../data";
import styles from "../../parceiro-pj.module.css";

interface FirstAccessStepProps {
  step: "company_data" | "success";
  logoIconSrc: string;
  confirmed: boolean;
  onConfirmChange: (checked: boolean) => void;
  onGoToSuccess: () => void;
  onAccessApp: () => void;
}

export default function FirstAccessStep({
  step,
  logoIconSrc,
  confirmed,
  onConfirmChange,
  onGoToSuccess,
  onAccessApp,
}: FirstAccessStepProps) {
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <header className={styles.brand}>
          <div className={styles.brandRow}>
            <div className={styles.brandIcon}>
              <Image src={logoIconSrc} alt="" width={26} height={26} style={{ width: "100%", height: "100%" }} />
            </div>
            <div className={styles.brandWordmark}>Atena</div>
          </div>
        </header>

        <div className={styles.card}>
          {step === "company_data" ? (
            <>
              <div className={styles.cardBody}>
                <img src={companyIllustrationSrc} alt="" className={styles.hero} />

                <div className={styles.intro}>
                  <div className={styles.stepBar} />
                  <div className={styles.introTitle}>{uiText.heading}</div>
                  <p className={styles.introSubtitle}>{uiText.subtitle}</p>
                </div>

                <div className={styles.infoPanel}>
                  <div className={styles.fieldGroup}>
                    <span className={styles.fieldLabel}>{uiText.razaoSocial}</span>
                    <strong className={styles.fieldValue}>{firstAccessCompanyData.razaoSocial}</strong>
                  </div>
                  <div className={styles.fieldGroup}>
                    <span className={styles.fieldLabel}>CNPJ</span>
                    <strong className={styles.fieldValue}>{firstAccessCompanyData.cnpj}</strong>
                  </div>
                  <div className={styles.fieldGroup}>
                    <span className={styles.fieldLabel}>{uiText.email}</span>
                    <strong className={styles.fieldValue}>{firstAccessCompanyData.email}</strong>
                  </div>
                  <div className={styles.fieldGroup}>
                    <span className={styles.fieldLabel}>Telefone</span>
                    <strong className={styles.fieldValue}>{firstAccessCompanyData.telefone}</strong>
                  </div>
                  <div className={styles.fieldGroup}>
                    <span className={styles.fieldLabel}>{uiText.endereco}</span>
                    <strong className={styles.fieldValue}>{firstAccessCompanyData.endereco}</strong>
                  </div>
                  <div className={styles.fieldGroup}>
                    <span className={styles.fieldLabel}>{uiText.municipio}</span>
                    <strong className={styles.fieldValue}>{firstAccessCompanyData.municipio}</strong>
                  </div>
                  <div className={styles.fieldGroup}>
                    <span className={styles.fieldLabel}>Estado</span>
                    <strong className={styles.fieldValue}>{firstAccessCompanyData.estado}</strong>
                  </div>
                  <div className={styles.fieldGroup}>
                    <span className={styles.fieldLabel}>CNAE Principal</span>
                    <div className={styles.chipRow}>
                      <span className={styles.chip}>{firstAccessCompanyData.cnaePrincipal}</span>
                    </div>
                  </div>
                  <div className={styles.fieldGroup}>
                    <span className={styles.fieldLabel}>{uiText.cnaesSecundarios}</span>
                    <div className={styles.chipRow}>
                      {firstAccessCompanyData.cnaesSecundarios.map((cnae) => (
                        <span key={cnae} className={styles.chip}>
                          {cnae}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <label className={styles.confirmRow}>
                  <input
                    type="checkbox"
                    checked={confirmed}
                    onChange={(event) => onConfirmChange(event.target.checked)}
                    className={styles.confirmInput}
                  />
                  <span
                    className={`${styles.confirmIndicator} ${confirmed ? styles.confirmIndicatorChecked : ""}`}
                    aria-hidden="true"
                  >
                    {confirmed ? <span className={styles.confirmDot} /> : null}
                  </span>
                  <span className={styles.confirmText}>{uiText.confirm}</span>
                </label>
              </div>

              <div className={styles.cardFooter}>
                <button
                  type="button"
                  className={styles.nextButton}
                  disabled={!confirmed}
                  onClick={onGoToSuccess}
                >
                  {uiText.next}
                  <ChevronRight size={20} strokeWidth={2.2} />
                </button>
              </div>
            </>
          ) : (
            <>
              <div className={`${styles.cardBody} ${styles.successBody}`}>
                <img src={successIllustrationSrc} alt="" className={styles.successHero} />

                <div className={styles.successCopy}>
                  <h2 className={styles.successTitle}>{uiText.successTitle}</h2>
                  <p className={styles.successSubtitle}>{uiText.successSubtitle}</p>
                </div>
              </div>

              <div className={styles.cardFooter}>
                <button
                  type="button"
                  className={`${styles.nextButton} ${styles.accessButton}`}
                  onClick={onAccessApp}
                >
                  {uiText.accessApp}
                  <ChevronRight size={20} strokeWidth={2.2} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
