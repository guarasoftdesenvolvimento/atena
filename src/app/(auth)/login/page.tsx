"use client";

import React, { useState } from "react";
import Link from "next/link";
import AuthPageShell from "@/components/auth/AuthPageShell";
import TextField from "@/components/auth/TextField";
import PrimaryButton from "@/components/auth/PrimaryButton";
import styles from "./login.module.css";
import { login } from "@/lib/auth/api";
import { figmaAssets } from "@/lib/figmaAssets";

const assets = figmaAssets.login;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <AuthPageShell
      rightIllustrationSrc={assets.illustrationSrc}
      mobileStatusBar={
        <div className={styles.statusBar}>
          <div className={styles.battery}>
            <img src={assets.mobileStatus.batterySrc} alt="" />
          </div>

          <div className={styles.time}>
            <img src={assets.mobileStatus.timeSrc} alt="" />
          </div>

          <div className={styles.service}>
            <img
              src={assets.mobileStatus.backArrowSrc}
              alt=""
              style={{ width: 7, height: 7 }}
            />
            <div className={styles.serviceText}>Service</div>
            <img
              src={assets.mobileStatus.receptionSrc}
              alt=""
              style={{ width: 10, height: 10 }}
            />
            <img
              src={assets.mobileStatus.wifiSrc}
              alt=""
              style={{ width: 12, height: 12 }}
            />
          </div>
        </div>
      }
      brand={
        <div className={styles.brand}>
          <div className={styles.brandLogoRow}>
            <div className={styles.brandIcon}>
              <img src={assets.logoIconSrc} alt="" />
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
          <div className={styles.cardHeader}>
            <div className={styles.cardHeaderTitle}>Acessar</div>
          </div>

          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              // Mock do fluxo de login (API plugável depois)
              setLoading(true);
              login({ email, password })
                .catch(() => {
                  // Em seguida a gente pluga tratamento de erro real.
                })
                .finally(() => setLoading(false));
            }}
          >
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

            <div>
              <TextField
                label="Senha"
                type="password"
                placeholder="*******"
                value={password}
                onChange={setPassword}
                leftIconSrc={assets.passwordIconSrc}
                leftIconOverlaySrc={assets.passwordIconOverlaySrc}
                leftIconOverlayStyle={{
                  position: "absolute",
                  top: "4.17%",
                  right: "16.67%",
                  bottom: "8.33%",
                  left: "16.67%",
                }}
                rightIconSrc={assets.dropdownIconSrc}
              />
              <div className={styles.passwordBottomRow}>
                <Link href="/forgot-password" className={styles.forgotLink}>
                  Esqueci minha senha
                </Link>
              </div>
            </div>

            <PrimaryButton
              label="Acessar"
              type="submit"
              disabled={loading}
            />
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
        </div>
      }
    />
  );
}

