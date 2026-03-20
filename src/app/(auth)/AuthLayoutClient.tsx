"use client";

import React from "react";
import Link from "next/link";
import { BarChart2, LogOut, UserPlus, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import styles from "./backoffice/backoffice.module.css";
import { figmaAssets } from "@/lib/figmaAssets";

const permaLogoIcon = figmaAssets.login.logoIconSrc;

function Logo() {
  return (
    <div style={{ display: "flex", gap: 7, alignItems: "center" }} aria-label="Atena">
      <div style={{ width: 40, height: 40, position: "relative" }}>
        <img
          src={permaLogoIcon}
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>
      <div
        style={{
          fontFamily: "Poppins, var(--atena-font-inter)",
          fontWeight: 700,
          fontSize: 41.273,
          letterSpacing: -2.0637,
          lineHeight: 1.2,
          color: "#3a3a3f",
          whiteSpace: "nowrap",
        }}
      >
        Atena
      </div>
    </div>
  );
}

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
  active: boolean;
};

export default function AuthLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isInicio = pathname === "/backoffice/inicio" || pathname === "/backoffice";
  const isClientes = pathname === "/backoffice/clientes";
  const isAfiliados = pathname === "/backoffice/afiliados";

  const isClientesDetalhes = pathname.startsWith("/backoffice/clientes/");

  const isDashboard = isInicio || isClientes || isClientesDetalhes || isAfiliados;

  if (!isDashboard) return <>{children}</>;

  const navItems: NavItem[] = [
    { label: "Início", href: "/backoffice/inicio", icon: <BarChart2 size={24} />, active: isInicio },
    { label: "Clientes", href: "/backoffice/clientes", icon: <Users size={24} />, active: isClientes || isClientesDetalhes },
    { label: "Afiliados", href: "/backoffice/afiliados", icon: <UserPlus size={24} />, active: isAfiliados },
  ];

  return (
    <div className={styles.page}>
      <aside className={styles.sidebar} aria-label="Menu Backoffice">
        <div className={styles.sidebarLogoArea}>
          <Logo />
        </div>
        <div className={styles.sidebarSeparator} />
        <div className={styles.sidebarItems}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.sideItem} ${item.active ? styles.sideItemActive : ""}`}
              aria-current={item.active ? "page" : undefined}
            >
              <div className={styles.sideIcon}>{item.icon}</div>
              <div className={item.active ? styles.sideItemTextActive : styles.sideItemText}>
                {item.label}
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.sidebarFooter}>
          <Link href="/login" className={styles.exitButton} aria-label="Sair">
            <div className={styles.sideIcon}>
              <LogOut size={24} />
            </div>
            <div className={styles.sidebarExitText}>
              Sair
            </div>
          </Link>
        </div>
      </aside>

      <main className={styles.main}>{children}</main>
    </div>
  );
}

