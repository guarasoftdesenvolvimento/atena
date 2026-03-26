"use client";

import React from "react";
import Link from "next/link";
import {
  BarChart2,
  LogOut,
  UserPlus,
  Users,
  FileText,
  ClipboardList,
  Truck,
  HelpCircle,
  Settings,
} from "lucide-react";
import { usePathname } from "next/navigation";
import styles from "./backoffice/backoffice.module.css";
import { figmaAssets } from "@/lib/figmaAssets";

const permaLogoIcon = figmaAssets.login.logoIconSrc;

function Logo() {
  return (
    <div className={styles.logoWrap} aria-label="Atena">
      <div className={styles.logoIcon}>
        <img src={permaLogoIcon} alt="" />
      </div>
      <div className={styles.logoWordmark}>Atena</div>
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

  const isBackoffice = pathname.startsWith("/backoffice");
  const isEmpresa = pathname.startsWith("/empresa");

  const isDashboard = isBackoffice || isEmpresa;

  if (!isDashboard) return <>{children}</>;

  let navItems: NavItem[] = [];

  if (isBackoffice) {
    const isInicio = pathname === "/backoffice/inicio" || pathname === "/backoffice";
    const isClientes = pathname === "/backoffice/clientes";
    const isAfiliados = pathname === "/backoffice/afiliados";
    const isClientesDetalhes = pathname.startsWith("/backoffice/clientes/");

    navItems = [
      { label: "Início", href: "/backoffice/inicio", icon: <BarChart2 size={24} />, active: isInicio },
      { label: "Clientes", href: "/backoffice/clientes", icon: <Users size={24} />, active: isClientes || isClientesDetalhes },
      { label: "Afiliados", href: "/backoffice/afiliados", icon: <UserPlus size={24} />, active: isAfiliados },
    ];
  } else if (isEmpresa) {
    const isInicio = pathname === "/empresa" || pathname === "/empresa/inicio";
    // For now, let's assume other paths are just placeholders
    navItems = [
      { label: "Dashboard", href: "/empresa", icon: <BarChart2 size={24} />, active: isInicio },
      { label: "Parceiros PJ", href: "/empresa/parceiros", icon: <Users size={24} />, active: pathname.startsWith("/empresa/parceiros") },
      { label: "Contratos", href: "/empresa/contratos", icon: <FileText size={24} />, active: pathname.startsWith("/empresa/contratos") },
      { label: "Notas Fiscais", href: "/empresa/notas-fiscais", icon: <ClipboardList size={24} />, active: pathname.startsWith("/empresa/notas-fiscais") },
      { label: "Remessas", href: "/empresa/remessas", icon: <Truck size={24} />, active: pathname.startsWith("/empresa/remessas") },
      { label: "Suporte", href: "/empresa/suporte", icon: <HelpCircle size={24} />, active: pathname.startsWith("/empresa/suporte") },
    ];
  }

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
          {isEmpresa && (
            <Link
              href="/empresa/configuracoes"
              className={`${styles.sideItem} ${pathname.startsWith("/empresa/configuracoes") ? styles.sideItemActive : ""}`}
            >
              <div className={styles.sideIcon}>
                <Settings size={24} />
              </div>
              <div className={pathname.startsWith("/empresa/configuracoes") ? styles.sideItemTextActive : styles.sideItemText}>
                Configurações
              </div>
            </Link>
          )}

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
