import React from "react";
import { Calendar } from "lucide-react";
import styles from "../../notas-fiscais.module.css";
import { formatDateForDisplay } from "../../utils/formatters";

export default function FilterDatePicker({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const openDatePicker = React.useCallback(() => {
    const input = inputRef.current;
    if (!input) return;

    const pickerInput = input as HTMLInputElement & { showPicker?: () => void };
    if (typeof pickerInput.showPicker === "function") {
      pickerInput.showPicker();
      return;
    }

    input.focus();
    input.click();
  }, []);

  return (
    <div
      className={`${styles.inputField} ${styles.datePickerField} ${className ?? ""}`}
      role="button"
      tabIndex={0}
      onClick={openDatePicker}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openDatePicker();
        }
      }}
    >
      <span className={styles.fieldValue}>{value ? formatDateForDisplay(value) : "Selecione"}</span>
      <Calendar size={20} color="#737791" />
      <input
        ref={inputRef}
        type="date"
        className={styles.dateNativeInput}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
