import React from "react";
import { ChevronDown } from "lucide-react";
import styles from "../../notas-fiscais.module.css";
import type { FilterOption } from "../../types";

export default function FilterSelect({
  value,
  options,
  onChange,
}: {
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!isOpen) return;

    function onDocumentMouseDown(event: MouseEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function onDocumentKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", onDocumentMouseDown);
    document.addEventListener("keydown", onDocumentKeyDown);
    return () => {
      document.removeEventListener("mousedown", onDocumentMouseDown);
      document.removeEventListener("keydown", onDocumentKeyDown);
    };
  }, [isOpen]);

  const selectedLabel = options.find((option) => option.value === value)?.label ?? "Todos";

  return (
    <div className={styles.dropdownWrapper} ref={wrapperRef}>
      <button
        type="button"
        className={`${styles.inputField} ${styles.inputFieldButton} ${isOpen ? styles.inputFieldActive : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className={styles.fieldValue}>{selectedLabel}</span>
        <ChevronDown size={20} color="#737791" />
      </button>

      {isOpen ? (
        <div className={styles.dropdownMenu}>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`${styles.dropdownOption} ${option.value === value ? styles.dropdownOptionActive : ""}`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
