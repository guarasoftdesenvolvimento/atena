import { STATUS_COLORS } from "../../constants";
import type { BarDatum, InvoiceStatus } from "../../types";

export default function BarChart({ data }: { data: readonly BarDatum[] }) {
  const W = 420;
  const H = 140;
  const padL = 46;
  const padB = 24;
  const padT = 8;
  const chartW = W - padL - 4;
  const chartH = H - padB - padT;
  const maxVal = 60000;
  const yTicks = [0, 15000, 30000, 45000, 60000];
  const barGroupW = chartW / data.length;
  const keys: InvoiceStatus[] = [
    "emitida",
    "agendada",
    "analise",
    "paga",
    "expirada",
    "cancelada",
  ];
  const barW = Math.max(6, barGroupW / keys.length - 1);

  return (
    <svg width={W} height={H} style={{ overflow: "visible" }}>
      {yTicks.map((tick) => {
        const y = padT + chartH - (tick / maxVal) * chartH;
        return (
          <g key={tick}>
            <line x1={padL} x2={W - 4} y1={y} y2={y} stroke="#e9eef5" strokeWidth={1} />
            <text
              x={padL - 4}
              y={y + 3}
              textAnchor="end"
              fontSize={7.5}
              fill="#8f9092"
              fontFamily="Inter, sans-serif"
            >
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
                <rect
                  key={k}
                  x={groupX + ki * (barW + 1)}
                  y={padT + chartH - barH}
                  width={barW}
                  height={barH}
                  rx={2}
                  fill={STATUS_COLORS[k]}
                />
              );
            })}
            <text
              x={groupX + barGroupW / 2}
              y={H - 4}
              textAnchor="middle"
              fontSize={7.5}
              fill="#8f9092"
              fontFamily="Inter, sans-serif"
            >
              {group.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
