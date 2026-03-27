"use client";

import React, { FormEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import AuthPageShell from "@/components/auth/AuthPageShell";
import TextField from "@/components/auth/TextField";
import PrimaryButton from "@/components/auth/PrimaryButton";
import Toast from "@/components/feedback/Toast";
import styles from "./login.module.css";
import { login, requestPasswordReset } from "@/lib/auth/api";
import { figmaAssets } from "@/lib/figmaAssets";

const assets = figmaAssets.login;

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotToast, setForgotToast] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmitLogin(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    login({ email, password })
      .catch(() => {
        // Em seguida a gente pluga tratamento de erro real.
      })
      .finally(() => setLoading(false));
  }

  async function onSubmitForgotPassword(e: FormEvent) {
    e.preventDefault();
    setForgotLoading(true);
    try {
      await requestPasswordReset({ email: forgotEmail });
      setForgotToast("Solicitação enviada com sucesso. Verifique seu e-mail para continuar.");
    } finally {
      setForgotLoading(false);
    }
  }

  return (
    <AuthPageShell
      rightIllustrationSrc={assets.illustrationSrc}
      mobileStatusBar={
        <div className={styles.statusBar}>
          <div className={styles.battery}>
            <Image src={assets.mobileStatus.batterySrc} alt="" width={27} height={12} style={{ width: "100%", height: "100%" }} />
          </div>

          <div className={styles.time}>
            <Image src={assets.mobileStatus.timeSrc} alt="" width={32} height={9} style={{ width: "100%", height: "100%" }} />
          </div>

          <div className={styles.service}>
            <Image
              src={assets.mobileStatus.backArrowSrc}
              alt=""
              width={7}
              height={7}
              style={{ width: 7, height: 7 }}
            />
            <div className={styles.serviceText}>Service</div>
            <Image
              src={assets.mobileStatus.receptionSrc}
              alt=""
              width={10}
              height={10}
              style={{ width: 10, height: 10 }}
            />
            <Image
              src={assets.mobileStatus.wifiSrc}
              alt=""
              width={12}
              height={12}
              style={{ width: 12, height: 12 }}
            />
          </div>
        </div>
      }
      brand={
        <div className={styles.brand}>
          <div className={styles.brandLogoRow}>
            <div className={styles.brandIcon}>
              <Image src={assets.logoIconSrc} alt="" width={26} height={26} style={{ width: "100%", height: "100%" }} />
            </div>
            <div className={styles.brandWordmark}>Atena</div>
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
          {mode === "forgot" && forgotToast ? (
            <div className={styles.toastWrap}>
              <Toast variant="success" message={forgotToast} />
            </div>
          ) : null}

          <div
            className={`${styles.cardHeader} ${
              mode === "forgot" ? styles.cardHeaderForgot : ""
            }`}
          >
            {mode === "forgot" ? (
              <div className={styles.backRow}>
                <button
                  type="button"
                  className={styles.backButton}
                  onClick={() => {
                    setMode("login");
                    setForgotToast(null);
                  }}
                >
                  Voltar
                </button>
              </div>
            ) : null}
            <div className={styles.cardHeaderTitle}>
              {mode === "forgot" ? "Recuperação de senha" : "Acessar"}
            </div>
          </div>

          {mode === "login" ? (
            <>
              <form className={styles.form} onSubmit={onSubmitLogin}>
                <TextField
                  label="E-mail"
                  type="email"
                  placeholder="parceiropj@exemplo.com"
                  value={email}
                  onChange={setEmail}
                  leftIcon={<Mail size={16} />}
                />

                <div>
                  <TextField
                    label="Senha"
                    type={showPassword ? "text" : "password"}
                    placeholder="*******"
                    value={password}
                    onChange={setPassword}
                    leftIcon={<LockKeyhole size={16} />}
                    rightIcon={showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    rightIconAriaLabel={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    onRightIconClick={() => setShowPassword((prev) => !prev)}
                  />
                  <div className={styles.passwordBottomRow}>
                    <button
                      type="button"
                      className={styles.forgotLink}
                      onClick={() => {
                        setForgotEmail(email);
                        setForgotToast(null);
                        setMode("forgot");
                      }}
                    >
                      Esqueci minha senha
                    </button>
                  </div>
                </div>

                <PrimaryButton label="Acessar" type="submit" disabled={loading} />
              </form>

              <div className={styles.roleButtons} aria-label="Acesso por role">
                <Link href="/backoffice/inicio" className={styles.roleButton}>
                  Backoffice
                </Link>
                <Link href="/empresa" className={styles.roleButton}>
                  Empresa
                </Link>
                <Link href="/parceiro-pj" className={styles.roleButton}>
                  Parceiro PJ
                </Link>
              </div>
            </>
          ) : (
            <form className={styles.form} onSubmit={onSubmitForgotPassword}>
              <TextField
                label="E-mail"
                type="email"
                placeholder="parceiropj@exemplo.com"
                value={forgotEmail}
                onChange={setForgotEmail}
                leftIcon={<Mail size={16} />}
              />

              <PrimaryButton label="Enviar" type="submit" disabled={forgotLoading} />
            </form>
          )}
        </div>
      }
    />
  );
}
