"use client";

import React from "react";
import { Bell, Building2, ChevronDown } from "lucide-react";
import backofficeStyles from "../../backoffice/backoffice.module.css";

type CompanyOption = {
  name: string;
  cnpj: string;
};

interface TopHeaderBarProps {
  title: string;
  hasNotifications?: boolean;
  companyOptions?: CompanyOption[];
}

const defaultCompanyOptions: CompanyOption[] = [
  { name: "Guar\u00e1soft", cnpj: "40.227.403/0001-92" },
  { name: "Guar\u00e1soft Filial", cnpj: "40.227.403/0002-73" },
];

export default function TopHeaderBar({
  title,
  hasNotifications = false,
  companyOptions,
}: TopHeaderBarProps) {
  const shouldShowNotifications = false;
  const options = companyOptions && companyOptions.length > 0 ? companyOptions : defaultCompanyOptions;
  const hasAdditionalCnpj = options.length > 1;

  const [selectedCompany, setSelectedCompany] = React.useState<CompanyOption>(options[0]);
  const [isCompanyMenuOpen, setIsCompanyMenuOpen] = React.useState(false);
  const companyMenuRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!options.some((item) => item.cnpj === selectedCompany.cnpj)) {
      setSelectedCompany(options[0]);
    }
  }, [options, selectedCompany.cnpj]);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!companyMenuRef.current) return;
      if (!companyMenuRef.current.contains(event.target as Node)) {
        setIsCompanyMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={backofficeStyles.topHeader}>
      <div className={backofficeStyles.topTitle}>{title}</div>

      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        {shouldShowNotifications ? (
          <div
            style={{
              backgroundColor: hasNotifications ? "rgba(248,187,187,0.5)" : "#e9eef5",
              padding: "8px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            <Bell size={24} color={hasNotifications ? "#d22020" : "#737791"} />
          </div>
        ) : null}

        <div ref={companyMenuRef} style={{ position: "relative" }}>
          <button
            type="button"
            onClick={() => {
              if (hasAdditionalCnpj) {
                setIsCompanyMenuOpen((open) => !open);
              }
            }}
            style={{
              border: "none",
              display: "flex",
              gap: "10px",
              alignItems: "center",
              padding: "8px 12px",
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              boxShadow: "0px 20px 50px 0px rgba(55, 69, 87, 0.1)",
              cursor: hasAdditionalCnpj ? "pointer" : "default",
            }}
            aria-haspopup={hasAdditionalCnpj ? "listbox" : undefined}
            aria-expanded={hasAdditionalCnpj ? isCompanyMenuOpen : undefined}
          >
            <div
              style={{
                backgroundColor: "#e9eef5",
                padding: "10px",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Building2 size={24} color="#527ca5" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <span style={{ fontWeight: 600, fontSize: "16px", color: "#527ca5", lineHeight: 1.2 }}>
                {selectedCompany.name}
              </span>
              <span style={{ fontSize: "11px", color: "#527ca5" }}>{selectedCompany.cnpj}</span>
            </div>
            {hasAdditionalCnpj ? (
              <ChevronDown
                size={20}
                color="#737791"
                style={{
                  transform: isCompanyMenuOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s",
                }}
              />
            ) : null}
          </button>

          {hasAdditionalCnpj && isCompanyMenuOpen ? (
            <div
              role="listbox"
              aria-label="Selecionar CNPJ"
              style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                right: 0,
                minWidth: "280px",
                backgroundColor: "#ffffff",
                border: "1px solid #e9eef5",
                borderRadius: "12px",
                boxShadow: "0 20px 50px rgba(55, 69, 87, 0.1)",
                overflow: "hidden",
                zIndex: 30,
              }}
            >
              {options.map((option) => {
                const isSelected = option.cnpj === selectedCompany.cnpj;
                return (
                  <button
                    key={option.cnpj}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      setSelectedCompany(option);
                      setIsCompanyMenuOpen(false);
                    }}
                    style={{
                      width: "100%",
                      border: "none",
                      background: isSelected ? "#eef3ff" : "#ffffff",
                      padding: "10px 12px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "2px",
                      cursor: "pointer",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 600,
                        fontSize: "14px",
                        lineHeight: 1.2,
                        color: "#345070",
                      }}
                    >
                      {option.name}
                    </span>
                    <span
                      style={{
                        fontSize: "11px",
                        lineHeight: 1.2,
                        color: "#737791",
                      }}
                    >
                      {option.cnpj}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
