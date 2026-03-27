"use client";

import React, { FormEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AuthPageShell from "@/components/auth/AuthPageShell";
import TextField from "@/components/auth/TextField";
import PrimaryButton from "@/components/auth/PrimaryButton";
import Toast from "@/components/feedback/Toast";
import styles from "./forgot-password.module.css";
import { requestPasswordReset } from "@/lib/auth/api";
import { figmaAssets } from "@/lib/figmaAssets";

const assets = figmaAssets.forgotPassword;

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await requestPasswordReset({ email });
      setToast(
        "Solicitação enviada com sucesso. Verifique seu e-mail para continuar."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthPageShell
      rightIllustrationSrc={assets.illustrationSrc}
      brand={
        <div className={styles.brand}>
          <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
            <div style={{ width: 25.7, height: 25.7 }}>
              <Image
                src={assets.logoIconSrc}
                alt=""
                width={26}
                height={26}
                style={{ width: "100%", height: "100%" }}
              />
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
      card={
        <div className={styles.card}>
          {toast ? (
            <div className={styles.toastWrap}>
              <Toast variant="success" message={toast} />
            </div>
          ) : null}

          <div className={styles.cardHeader}>
            <div className={styles.backRow}>
              <Link href="/login" className={styles.backButton}>
                Voltar
              </Link>
            </div>
            <div className={styles.cardHeaderTitle}>
              Recuperação de senha
            </div>
          </div>

          <form className={styles.form} onSubmit={onSubmit}>
            <TextField
              label="E-mail"
              type="email"
              placeholder="parceiropj@exemplo.com"
              value={email}
              onChange={setEmail}
              leftIconSrc={assets.emailIconSrc}
              leftIconOverlaySrc={assets.emailIconOverlaySrc}
              leftIconOverlayStyle={{
                position: "absolute",
                top: "16.67%",
                right: "8.33%",
                bottom: "16.67%",
                left: "8.33%",
              }}
              rightIconSrc={assets.dropdownIconSrc}
            />

            <PrimaryButton
              label="Enviar"
              type="submit"
              disabled={loading}
            />
          </form>
        </div>
      }
    />
  );
}
