import React from "react";
import styles from "./TextField.module.css";

export type TextFieldProps = {
  label: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  leftIconSrc?: string;
  leftIconOverlaySrc?: string;
  leftIconOverlayStyle?: React.CSSProperties;
  rightIconSrc?: string;
};

export default function TextField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  leftIconSrc,
  leftIconOverlaySrc,
  leftIconOverlayStyle,
  rightIconSrc,
}: TextFieldProps) {
  return (
    <div className={styles.field}>
      <div className={styles.label}>{label}</div>
      <div className={styles.inputShell}>
        {leftIconSrc ? (
          <span className={styles.icon}>
            <img src={leftIconSrc} alt="" />
            {leftIconOverlaySrc ? (
              <span
                className={styles.iconOverlayFrame}
                style={leftIconOverlayStyle}
              >
                <img src={leftIconOverlaySrc} alt="" />
              </span>
            ) : null}
          </span>
        ) : null}

        <input
          className={styles.input}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          autoComplete="off"
        />

        {rightIconSrc ? (
          <span className={styles.rightIcon}>
            <img src={rightIconSrc} alt="" />
          </span>
        ) : null}
      </div>
    </div>
  );
}

