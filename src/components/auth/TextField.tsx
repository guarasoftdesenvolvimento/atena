import React from "react";
import styles from "./TextField.module.css";

export type TextFieldProps = {
  label: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  leftIcon?: React.ReactNode;
  leftIconSrc?: string;
  leftIconOverlaySrc?: string;
  leftIconOverlayStyle?: React.CSSProperties;
  rightIcon?: React.ReactNode;
  rightIconSrc?: string;
  rightIconAriaLabel?: string;
  onRightIconClick?: () => void;
};

export default function TextField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  leftIcon,
  leftIconSrc,
  leftIconOverlaySrc,
  leftIconOverlayStyle,
  rightIcon,
  rightIconSrc,
  rightIconAriaLabel,
  onRightIconClick,
}: TextFieldProps) {
  return (
    <div className={styles.field}>
      <div className={styles.label}>{label}</div>
      <div className={styles.inputShell}>
        {leftIcon || leftIconSrc ? (
          <span className={styles.icon}>
            {leftIcon ? <span className={styles.iconSvg}>{leftIcon}</span> : null}
            {leftIconSrc ? <img src={leftIconSrc} alt="" /> : null}
            {leftIconOverlaySrc && !leftIcon ? (
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

        {rightIcon || rightIconSrc ? (
          onRightIconClick ? (
            <button
              type="button"
              className={`${styles.rightIcon} ${styles.rightIconButton}`}
              onClick={onRightIconClick}
              aria-label={rightIconAriaLabel ?? "Ação do campo"}
            >
              {rightIcon ? <span className={styles.iconSvg}>{rightIcon}</span> : null}
              {rightIconSrc ? <img src={rightIconSrc} alt="" /> : null}
            </button>
          ) : (
            <span className={styles.rightIcon}>
              {rightIcon ? <span className={styles.iconSvg}>{rightIcon}</span> : null}
              {rightIconSrc ? <img src={rightIconSrc} alt="" /> : null}
            </span>
          )
        ) : null}
      </div>
    </div>
  );
}
