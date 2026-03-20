import AuthPageShell from "@/components/auth/AuthPageShell";
import { figmaAssets } from "@/lib/figmaAssets";
import styles from "./reset-password.module.css";
import ResetPasswordForm from "./ResetPasswordForm";

type ResetPasswordPageProps = {
  searchParams?: { token?: string };
};

export default function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const token = searchParams?.token ?? "";
  const assets = figmaAssets.resetPassword;

  return (
    <AuthPageShell
      rightIllustrationSrc={assets.illustrationSrc}
      brand={
        <div className={styles.brand}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 0,
              width: 115.266,
            }}
          >
            <div style={{ width: 25.7, height: 25.7 }}>
              <img src={assets.logoIconSrc} alt="" style={{ width: "100%" }} />
            </div>
            <div
              style={{
                fontFamily: "Poppins, var(--atena-font-inter)",
                fontSize: 26.41,
                letterSpacing: -1.3205,
                fontWeight: 700,
                lineHeight: 1.2,
                color: "#3a3a3f",
              }}
            >
              Atena
            </div>
          </div>

        </div>
      }
      footer={
        <div className={styles.footer}>
          <span>Um produto </span>
          <strong>GuaráSoft</strong>
        </div>
      }
      card={<ResetPasswordForm token={token} />}
    />
  );
}

