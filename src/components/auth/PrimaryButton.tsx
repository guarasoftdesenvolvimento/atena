import React from "react";
import styles from "./PrimaryButton.module.css";

type PrimaryButtonProps = {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

export default function PrimaryButton({
  label,
  onClick,
  type = "button",
  disabled,
}: PrimaryButtonProps) {
  return (
    <button
      type={type}
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
    >
      <span className={styles.label}>{label}</span>
    </button>
  );
}

