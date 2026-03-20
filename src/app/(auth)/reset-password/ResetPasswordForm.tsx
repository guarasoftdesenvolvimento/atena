"use client";

import React, { FormEvent, useState } from "react";
import TextField from "@/components/auth/TextField";
import PrimaryButton from "@/components/auth/PrimaryButton";
import { figmaAssets } from "@/lib/figmaAssets";
import { resetPassword } from "@/lib/auth/api";
import styles from "./reset-password.module.css";

type ResetPasswordFormProps = {
  token: string;
};

export default function ResetPasswordForm({
  token,
}: ResetPasswordFormProps) {
  const assets = figmaAssets.resetPassword;
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await resetPassword({ token, password });
      void confirm; // validação real entra depois
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardHeaderTitle}>Definição de senha</div>
      </div>

      <form className={styles.form} onSubmit={onSubmit}>
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

        <TextField
          label="Confirmar senha"
          type="password"
          placeholder="*******"
          value={confirm}
          onChange={setConfirm}
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

        <PrimaryButton label="Salvar" type="submit" disabled={loading} />
      </form>
    </div>
  );
}

