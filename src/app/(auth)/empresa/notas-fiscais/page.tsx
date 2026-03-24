"use client";

import React from "react";
import TopHeaderBar from "../components/TopHeaderBar";
import {
  Filter,
  PieChart,
  FileText,
  Info,
  ChevronRight,
  Search,
  ListFilter,
  ChevronDown,
} from "lucide-react";
import styles from "./notas-fiscais.module.css";

// ─── Mock data ────────────────────────────────────────────────────────────────

const STATUS_COLORS: Record<string, string> = {
  emitida: "#af52de",
  agendada: "#f5a623",
  analise: "#f5a623",
  paga: "#1ba785",
  expirada: "#d22020",
  cancelada: "#d22020",
};

const STATUS_LABELS: Record<string, string> = {
  emitida: "Emitida (a pagar)",
  agendada: "Agendada para pagamento",
  analise: "Pagamento em análise",
  paga: "Paga",
  expirada: "Expirada (cancelada)",
  cancelada: "Cancelada",
};

const CAT_COLORS: Record<string, string> = {
  verde:    "#1ba785",
  roxo:     "#af52de",
  azul:     "#5352ed",
  vermelho: "#d22020",
  amarelo:  "#c9a800",
  laranja:  "#ff9500",
};

const DONUT_DATA = [
  { key: "emitida", pct: 50 },
  { key: "agendada", pct: 10 },
  { key: "analise", pct: 10 },
  { key: "paga", pct: 10 },
  { key: "expirada", pct: 10 },
  { key: "cancelada", pct: 10 },
];

const BAR_DATA = [
  { label: "1", emitida: 45000, agendada: 30000, analise: 8000, paga: 20000, expirada: 12000, cancelada: 10000 },
  { label: "2", emitida: 60000, agendada: 45000, analise: 15000, paga: 35000, expirada: 20000, cancelada: 18000 },
  { label: "3", emitida: 20000, agendada: 10000, analise: 5000, paga: 15000, expirada: 8000, cancelada: 6000 },
  { label: "4", emitida: 35000, agendada: 25000, analise: 12000, paga: 28000, expirada: 15000, cancelada: 12000 },
  { label: "5", emitida: 55000, agendada: 40000, analise: 18000, paga: 45000, expirada: 22000, cancelada: 19000 },
  { label: "6", emitida: 50000, agendada: 38000, analise: 16000, paga: 40000, expirada: 20000, cancelada: 17000 },
];

type Invoice = {
  id: string;
  numero: string;
  nome: string;
  dataEmissao: string;
  categorias: Array<{ label: string; cor: string }>;
  status: string;
};

const invoices: Invoice[] = [
  { id: "1", numero: "#NF1258", nome: "Felipe Alves dos Santos", dataEmissao: "09/07/2025", categorias: [{ label: "Categoria 1", cor: "verde" }], status: "emitida" },
  { id: "2", numero: "#NF1258", nome: "Felipe Alves dos Santos", dataEmissao: "09/07/2025", categorias: [{ label: "Categoria 1", cor: "roxo" }, { label: "Cat 2", cor: "azul" }, { label: "Cat 3", cor: "verde" }, { label: "Cat 4", cor: "vermelho" }, { label: "Cat 5", cor: "amarelo" }], status: "agendada" },
  { id: "3", numero: "#NF1258", nome: "Felipe Alves dos Santos", dataEmissao: "09/07/2025", categorias: [{ label: "Categoria 1", cor: "verde" }, { label: "Cat 2", cor: "azul" }], status: "analise" },
  { id: "4", numero: "#NF1258", nome: "Felipe Alves dos Santos", dataEmissao: "09/07/2025", categorias: [{ label: "Categoria 1", cor: "vermelho" }], status: "paga" },
  { id: "5", numero: "#NF1258", nome: "Felipe Alves dos Santos", dataEmissao: "09/07/2025", categorias: [{ label: "Categoria 1", cor: "verde" }, { label: "Cat 2", cor: "laranja" }], status: "emitida" },
  { id: "6", numero: "#NF1258", nome: "Felipe Alves dos Santos", dataEmissao: "09/07/2025", categorias: [{ label: "Categoria 1", cor: "amarelo" }], status: "expirada" },
  { id: "7", numero: "#NF1258", nome: "Felipe Alves dos Santos", dataEmissao: "09/07/2025", categorias: [{ label: "Categoria 1", cor: "verde" }, { label: "Cat 2", cor: "roxo" }], status: "emitida" },
  { id: "8", numero: "#NF1258", nome: "Felipe Alves dos Santos", dataEmissao: "09/07/2025", categorias: [{ label: "Categoria 1", cor: "laranja" }, { label: "Cat 2", cor: "azul" }], status: "emitida" },
];

// ─── Donut chart ──────────────────────────────────────────────────────────────

function DonutChart({ data }: { data: typeof DONUT_DATA }) {
  const size = 180;
  const strokeWidth = 30;
  const radius = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * radius;
  const cx = size / 2;
  const cy = size / 2;
  let offset = 0;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        {data.map((seg) => {
          const dash = (seg.pct / 100) * circ;
          const gap = circ - dash;
          const el = (
            <circle
              key={seg.key}
              cx={cx} cy={cy} r={radius}
              fill="none"
              stroke={STATUS_COLORS[seg.key]}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={-offset}
            />
          );
          offset += dash;
          return el;
        })}
        <circle cx={cx} cy={cy} r={radius - strokeWidth / 2 + 2} fill="#ffffff" />
      </svg>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontFamily: '"Inter",sans-serif', fontWeight: 700, fontSize: 22, color: "#3d3e41" }}>
        125
      </div>
    </div>
  );
}

// ─── Bar chart ────────────────────────────────────────────────────────────────

function BarChart({ data }: { data: typeof BAR_DATA }) {
  const W = 420, H = 140, padL = 46, padB = 24, padT = 8;
  const chartW = W - padL - 4, chartH = H - padB - padT;
  const maxVal = 60000;
  const yTicks = [0, 15000, 30000, 45000, 60000];
  const barGroupW = chartW / data.length;
  const keys: Array<keyof typeof data[0]> = ["emitida", "agendada", "analise", "paga", "expirada", "cancelada"];
  const barW = Math.max(6, barGroupW / keys.length - 1);
  return (
    <svg width={W} height={H} style={{ overflow: "visible" }}>
      {yTicks.map((tick) => {
        const y = padT + chartH - (tick / maxVal) * chartH;
        return (
          <g key={tick}>
            <line x1={padL} x2={W - 4} y1={y} y2={y} stroke="#e9eef5" strokeWidth={1} />
            <text x={padL - 4} y={y + 3} textAnchor="end" fontSize={7.5} fill="#8f9092" fontFamily="Inter, sans-serif">
              {tick === 0 ? "0" : `${tick / 1000}k`}
            </text>
          </g>
        );
      })}
      {data.map((group, gi) => {
        const groupX = padL + gi * barGroupW;
        return (
          <g key={gi}>
            {keys.map((k, ki) => {
              const val = group[k] as number;
              const barH = (val / maxVal) * chartH;
              return (
                <rect key={k as string} x={groupX + ki * (barW + 1)} y={padT + chartH - barH} width={barW} height={barH} rx={2} fill={STATUS_COLORS[k as string]} />
              );
            })}
            <text x={groupX + barGroupW / 2} y={H - 4} textAnchor="middle" fontSize={7.5} fill="#8f9092" fontFamily="Inter, sans-serif">
              {group.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── Legend item ──────────────────────────────────────────────────────────────

function LegendItem({ color, label, value }: { color: string; label: string; value?: string }) {
  return (
    <div className={styles.legendItem}>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <div className={styles.legendDot} style={{ backgroundColor: color }} />
        <span className={styles.legendLabel}>{label}</span>
      </div>
      {value && <span className={styles.legendValue}>{value}</span>}
    </div>
  );
}

// ─── Category badge ───────────────────────────────────────────────────────────

function CategoryBadge({ label, cor }: { label: string; cor: string }) {
  const bg = CAT_COLORS[cor] ?? "#8f9092";
  return (
    <span className={styles.catBadge} style={{ backgroundColor: bg }}>
      {label}
    </span>
  );
}

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; bg: string; color: string }> = {
    emitida:   { label: "Recebida (a pagar)",       bg: "#f0dbff", color: "#7c3aed" },
    agendada:  { label: "Agendada para pagamento",  bg: "#fef9c3", color: "#92400e" },
    analise:   { label: "Pagamento em análise",     bg: "#fef3c7", color: "#b45309" },
    paga:      { label: "Paga",                     bg: "#d1fae5", color: "#065f46" },
    expirada:  { label: "Expirada (não paga)",      bg: "#fee2e2", color: "#991b1b" },
    cancelada: { label: "Cancelada",                bg: "#fee2e2", color: "#991b1b" },
  };
  const s = map[status] ?? { label: status, bg: "#e9eef5", color: "#345070" };
  return (
    <span className={styles.statusBadge} style={{ backgroundColor: s.bg, color: s.color }}>
      {s.label}
    </span>
  );
}

// ─── Filter Sheet ─────────────────────────────────────────────────────────────

function FilterSheet({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <div className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ""}`} onClick={onClose}>
      <div className={`${styles.sheet} ${isOpen ? styles.sheetVisible : ""}`} onClick={(e) => e.stopPropagation()}>
        <div className={styles.sheetHeader}>
          <h2 className={styles.sheetTitle}>Filtros:</h2>
        </div>
        <div className={styles.sheetBody}>
          {["Status", "Parceiro PJ", "Período"].map((f) => (
            <div key={f} className={styles.filterGroup}>
              <label className={styles.filterLabel}>Filtrar por {f.toLowerCase()}</label>
              <div className={styles.inputField}>
                <span>Todos</span>
                <ChevronDown size={16} color="#737791" />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.sheetFooter}>
          <button className={styles.clearButton} onClick={onClose}>LIMPAR</button>
          <button className={styles.applyButton} onClick={onClose}>
            <ListFilter size={20} />
            APLICAR FILTRO
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function NotasFiscaisPage() {
  const [activeTab, setActiveTab] = React.useState<"visao" | "notas">("visao");
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  const summaryCards = [
    { label: "Emitida (a pagar)",       value: "R$ 350.000,00" },
    { label: "Agendada para pagamento", value: "R$ 350.000,00" },
    { label: "Pagamento em análise",    value: "R$ 350.000,00" },
    { label: "Total pago",              value: "R$ 350.000,00" },
  ];

  return (
    <div className={styles.container}>
      <TopHeaderBar title="Notas Fiscais" hasNotifications={true} />

      <div className={styles.contentWrapper}>
        {/* Tab bar */}
        <div className={styles.tabBar}>
          <button
            className={`${styles.tabBtn} ${activeTab === "visao" ? styles.tabBtnActive : ""}`}
            onClick={() => setActiveTab("visao")}
          >
            <PieChart size={20} />
            VISÃO GERAL
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === "notas" ? styles.tabBtnActive : ""}`}
            onClick={() => setActiveTab("notas")}
          >
            <FileText size={20} />
            NOTAS FISCAIS
          </button>
        </div>

        {activeTab === "visao" ? (
          /* ── VISÃO GERAL ──────────────────────────────────────────────── */
          <div className={styles.mainCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.registrosText}>57 REGISTROS</span>
              <button className={styles.filterButton} onClick={() => setIsFilterOpen(true)}>
                <Filter size={20} color="#5352ed" />
                <span>FILTROS</span>
              </button>
            </div>

            <div className={styles.summaryRow}>
              {summaryCards.map((card) => (
                <div key={card.label} className={styles.summaryCard}>
                  <p className={styles.summaryCardLabel}>{card.label}</p>
                  <p className={styles.summaryCardValue}>{card.value}</p>
                </div>
              ))}
            </div>

            <div className={styles.chartsRow}>
              <div className={styles.chartCard}>
                <div className={styles.chartCardHeader}>
                  <span className={styles.chartCardTitle}>Porcentagem por categoria</span>
                  <Info size={16} color="#8f9092" />
                </div>
                <div className={styles.donutRow}>
                  <DonutChart data={DONUT_DATA} />
                  <div className={styles.donutLegend}>
                    {DONUT_DATA.map((seg) => (
                      <LegendItem
                        key={seg.key}
                        color={STATUS_COLORS[seg.key]}
                        label={STATUS_LABELS[seg.key]}
                        value={`${seg.pct}%`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.chartCard}>
                <div className={styles.chartCardHeader}>
                  <span className={styles.chartCardTitle}>Total por categoria</span>
                </div>
                <div style={{ padding: "8px 12px 4px" }}>
                  <BarChart data={BAR_DATA} />
                </div>
                <div className={styles.barLegend}>
                  {Object.entries(STATUS_LABELS).map(([key, label], i) => (
                    <div key={key} className={styles.barLegendItem}>
                      <div className={styles.legendDot} style={{ backgroundColor: STATUS_COLORS[key] }} />
                      <span className={styles.legendLabel}>{`${i + 1} – ${label}`}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ── NOTAS FISCAIS TABLE ──────────────────────────────────────── */
          <div className={styles.mainCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.registrosText}>{invoices.length} Notas fiscais</span>
              <div style={{ display: "flex", gap: 12 }}>
                <div className={styles.searchBox}>
                  <Search size={16} color="#c1c1c1" />
                  <input className={styles.searchInput} placeholder="Pesquise pelo parceiro ou número" />
                </div>
                <button className={styles.filterButton} onClick={() => setIsFilterOpen(true)}>
                  <Filter size={20} color="#5352ed" />
                  <span>FILTROS</span>
                </button>
              </div>
            </div>

            <div className={styles.tableWrapper}>
              {/* Header */}
              <div className={styles.tableHeader}>
                <div className={styles.thCheck}>
                  <input type="checkbox" className={styles.checkbox} />
                </div>
                <div className={styles.thText}>Nº da NF</div>
                <div className={styles.thText}>Nome</div>
                <div className={styles.thText}>Data da emissão</div>
                <div className={styles.thText}>Categoria</div>
                <div className={styles.thText} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  Status da NF
                  <Info size={14} color="#8f9092" />
                </div>
                <div className={styles.thText}>Ações</div>
              </div>

              {/* Rows */}
              <div className={styles.tableBody}>
                {invoices.map((inv) => {
                  const visibleCats = inv.categorias.slice(0, 1);
                  const extraCount = inv.categorias.length - 1;
                  return (
                    <div key={inv.id} className={styles.tableRow}>
                      <div className={styles.tdCheck}>
                        <input type="checkbox" className={styles.checkbox} />
                      </div>
                      <div className={styles.tdTitle}>{inv.numero}</div>
                      <div className={styles.tdName}>{inv.nome}</div>
                      <div className={styles.tdDate}>{inv.dataEmissao}</div>
                      <div className={styles.tdCats}>
                        {visibleCats.map((c, i) => (
                          <CategoryBadge key={i} label={c.label} cor={c.cor} />
                        ))}
                        {extraCount > 0 && (
                          <span className={styles.catExtra}>+{extraCount}</span>
                        )}
                      </div>
                      <div className={styles.tdStatus}>
                        <StatusBadge status={inv.status} />
                      </div>
                      <div className={styles.tdActions}>
                        <ChevronRight size={18} color="#5352ed" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      <FilterSheet isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
    </div>
  );
}
