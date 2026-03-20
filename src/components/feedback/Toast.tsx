import React from "react";
import styles from "./Toast.module.css";

export type ToastVariant = "success" | "info";

type ToastProps = {
  message: string;
  variant?: ToastVariant;
};

export default function Toast({ message, variant = "info" }: ToastProps) {
  const variantClass = variant === "success" ? styles.success : "";
  return (
    <div className={`${styles.toast} ${variantClass}`}>{message}</div>
  );
}

