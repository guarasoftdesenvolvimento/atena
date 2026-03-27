import { bottomNavItems } from "../data";
import styles from "../parceiro-pj.module.css";
import type { NavItemId } from "../types";

interface FloatingNavProps {
  activeNavItemId: NavItemId | null;
  onItemClick: (itemId: NavItemId) => void;
}

export default function FloatingNav({ activeNavItemId, onItemClick }: FloatingNavProps) {
  return (
    <nav className={styles.floatingNav} aria-label="Menu principal">
      {bottomNavItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeNavItemId === item.id;

        return (
          <button
            key={item.id}
            type="button"
            className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
            onClick={() => onItemClick(item.id)}
          >
            <Icon size={18} strokeWidth={2.1} />
            <span className={styles.navLabel}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
