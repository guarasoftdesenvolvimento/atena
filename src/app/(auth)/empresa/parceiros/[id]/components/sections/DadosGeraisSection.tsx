import { Bookmark, Copy, Edit2, LayoutDashboard, PhoneCall, Wallet } from "lucide-react";
import styles from "../../../detalhes.module.css";

interface DadosGeraisSectionProps {
  onEditContact: () => void;
  onEditBanking: () => void;
  onEditCategories: () => void;
}

export default function DadosGeraisSection({
  onEditContact,
  onEditBanking,
  onEditCategories,
}: DadosGeraisSectionProps) {
  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <LayoutDashboard size={24} className="text-[#345070]" />
          <div className="flex flex-col gap-1">
            <h3 className={styles.cardTitle}>Dados da empresa</h3>
          </div>
        </div>

        <div className={styles.dataSection}>
          <div className={styles.infoRow}>
            <div className={styles.infoItem} style={{ width: 240 }}>
              <span className={styles.infoLabel}>Razão social</span>
              <p className={styles.infoValue}>Kalisoft.tech</p>
            </div>
            <div className={styles.infoItem} style={{ width: 160 }}>
              <span className={styles.infoLabel}>CNPJ</span>
              <p className={styles.infoValue}>38.300.972/0001-19</p>
            </div>
            <div className={styles.infoItem} style={{ width: 180 }}>
              <span className={styles.infoLabel}>E-mail</span>
              <p className={styles.infoValue}>contato@kalisoft.tech</p>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Telefone</span>
              <p className={styles.infoValue}>47 99999-9999</p>
            </div>
          </div>

          <div className={styles.infoRow}>
            <div className={styles.infoItem} style={{ width: 240 }}>
              <span className={styles.infoLabel}>Endereço</span>
              <p className={styles.infoValue}>Rua XV de Novembro, nº 1457</p>
            </div>
            <div className={styles.infoItem} style={{ width: 160 }}>
              <span className={styles.infoLabel}>Município</span>
              <p className={styles.infoValue}>Blumenau</p>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Estado</span>
              <p className={styles.infoValue}>Santa Catarina</p>
            </div>
          </div>

          <div className={styles.infoRow}>
            <div className={styles.infoItem} style={{ width: 240 }}>
              <span className={styles.infoLabel}>CNAE Principal</span>
              <div className={styles.cnaePill}>62.01-5/01</div>
            </div>
            <div className={styles.infoItem} style={{ flex: 1 }}>
              <span className={styles.infoLabel} style={{ marginBottom: 4, display: "block" }}>
                CNAEs Secundários
              </span>
              <div className={styles.cnaeList}>
                <div className={styles.cnaePill}>62.01-5/02</div>
                <div className={styles.cnaePill}>62.02-3/00</div>
                <div className={styles.cnaePill}>62.02-3/00</div>
                <div className={styles.cnaePill}>62.02-3/00</div>
                <div className={styles.cnaePill}>62.02-3/00</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottomGrid}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <PhoneCall size={24} className="text-[#345070]" />
            <div className="flex flex-col gap-1">
              <h3 className={styles.cardTitle}>Dados de contato</h3>
              <p className={styles.cardDescription}>
                Esses são os dados de quem irá assinar contratos.
              </p>
            </div>
            <button className={styles.editButton} onClick={onEditContact}>
              <Edit2 size={16} />
            </button>
          </div>

          <div className={styles.itemsContainer} style={{ marginTop: 8 }}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Responsável</span>
              <p className={styles.infoValue}>Felipe Alves dos Santos</p>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>WhatsApp</span>
              <p className={styles.infoValue}>47 99999-9999</p>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>E-mail</span>
              <p className={styles.infoValue}>contato@kalisoft.tech</p>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Wallet size={24} className="text-[#345070]" />
            <div className="flex flex-col gap-1">
              <h3 className={styles.cardTitle}>Dados bancários</h3>
              <p className={styles.cardDescription}>Utilize chave PIX do tipo CNPJ.</p>
            </div>
            <button className={styles.editButton} onClick={onEditBanking}>
              <Edit2 size={16} />
            </button>
          </div>

          <div className={styles.itemsContainer} style={{ marginTop: 8 }}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Titular da conta</span>
              <p className={styles.infoValue}>Felipe Alves dos Santos</p>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Chave PIX tipo cnpj:</span>
              <div className={styles.pixRow}>
                <p className={styles.infoValue}>38300973000119</p>
                <div className={styles.copyBox}>
                  <Copy size={12} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.card} style={{ minWidth: 243 }}>
          <div className={styles.cardHeader}>
            <Bookmark size={24} className="text-[#345070]" />
            <div className="flex flex-col gap-1">
              <h3 className={styles.cardTitle}>Categorias</h3>
              <p className={styles.cardDescription}>Selecione as categorias</p>
            </div>
            <button className={styles.editButton} onClick={onEditCategories}>
              <Edit2 size={16} />
            </button>
          </div>

          <div className={styles.categoryList}>
            <span className={`${styles.categoryPill} ${styles.catGreen}`}>Freelancer</span>
            <span className={`${styles.categoryPill} ${styles.catOrange}`}>Front-end</span>
            <span className={`${styles.categoryPill} ${styles.catPurple}`}>Time de Design</span>
            <span className={`${styles.categoryPill} ${styles.catYellow}`}>Wordpress</span>
          </div>
        </div>
      </div>
    </>
  );
}
