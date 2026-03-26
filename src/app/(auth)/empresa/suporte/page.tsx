import { Phone } from "lucide-react";
import TopHeaderBar from "../components/TopHeaderBar";
import styles from "./suporte.module.css";

const WHATSAPP_QR_CODE_IMAGE_URL = "https://www.figma.com/api/mcp/asset/c9e0f122-1ac8-4429-a1a6-7300fa918160";
const SUPPORT_ILLUSTRATION_IMAGE_URL = "https://www.figma.com/api/mcp/asset/d0c3f716-c14f-476b-96f2-54c2cf582204";

export default function SuporteEmpresaPage() {
  return (
    <div className={styles.container}>
      <TopHeaderBar title="Suporte" hasNotifications={false} />

      <div className={styles.contentWrapper}>
        <div className={styles.supportCard}>
          <h2 className={styles.title}>Precisa de ajuda?</h2>

          <div className={styles.columns}>
            <div className={styles.channelCard}>
              <p className={styles.channelTitle}>Entre em contato pelos canais abaixo</p>

              <div className={styles.contactBlock}>
                <p className={styles.contactLabel}>Telefone</p>
                <p className={styles.contactValue}>41 99999-9999</p>
              </div>

              <div className={styles.contactBlock}>
                <p className={styles.contactLabel}>E-mail</p>
                <p className={styles.contactValue}>suporte@seupj.com</p>
              </div>

              <a className={styles.whatsappButton} href="https://wa.me/5541999999999" target="_blank" rel="noreferrer">
                <Phone size={18} />
                <span>Chamar no WhatsApp</span>
              </a>
            </div>

            <div className={styles.qrCard}>
              <p className={styles.channelTitle}>Ou escaneie o QR Code abaixo para chamar no WhatsApp</p>
              <img src={WHATSAPP_QR_CODE_IMAGE_URL} alt="QR code do WhatsApp" className={styles.qrImage} />
            </div>

            <div className={styles.illustrationCard}>
              <img src={SUPPORT_ILLUSTRATION_IMAGE_URL} alt="Ilustração de suporte" className={styles.illustrationImage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
