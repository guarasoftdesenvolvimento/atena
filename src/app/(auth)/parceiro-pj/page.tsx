import React from "react";
import AuthPageShell from "@/components/auth/AuthPageShell";
import { figmaAssets } from "@/lib/figmaAssets";
import Link from "next/link";

export default function ParceiroPJPage() {
  const assets = figmaAssets.login;

  return (
    <AuthPageShell
      rightIllustrationSrc={assets.illustrationSrc}
      brand={
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          <div style={{ width: 25.7, height: 25.7 }}>
            <img
              src={assets.logoIconSrc}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
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
      }
      footer={
        <div
          style={{
            width: "100%",
            fontSize: 12,
            letterSpacing: 0.18,
            lineHeight: 1,
            color: "var(--atena-primary-300)",
            fontWeight: 400,
            textAlign: "center",
          }}
        >
          <span>Um produto </span>
          <strong style={{ fontWeight: 700 }}>GuaráSoft</strong>
        </div>
      }
      card={
        <div
          style={{
            background: "var(--atena-surface)",
            borderRadius: "var(--atena-radius-card)",
            boxShadow: "var(--atena-shadow-card)",
            padding: 24,
            width: "100%",
            maxWidth: 386,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              fontSize: 14,
              letterSpacing: 0.21,
              lineHeight: 1.5,
              fontWeight: 700,
              color: "var(--atena-primary-600)",
              marginBottom: 16,
            }}
          >
            Parceiro PJ
          </div>
          <div style={{ fontSize: 14, color: "var(--atena-text-muted)" }}>
            View provisória para o role <strong>Parceiro PJ</strong>.
          </div>
          <div style={{ marginTop: 16 }}>
            <Link href="/login" style={{ color: "var(--atena-primary-400)" }}>
              Voltar para login
            </Link>
          </div>
        </div>
      }
    />
  );
}

