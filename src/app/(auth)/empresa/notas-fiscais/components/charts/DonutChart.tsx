import { STATUS_COLORS } from "../../constants";
import type { DonutDatum } from "../../types";

export default function DonutChart({ data }: { data: readonly DonutDatum[] }) {
  const size = 180;
  const strokeWidth = 30;
  const radius = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * radius;
  const cx = size / 2;
  const cy = size / 2;
  const segments = data.map((seg, index) => {
    const dash = (seg.pct / 100) * circ;
    const previousDashTotal = data
      .slice(0, index)
      .reduce((acc, current) => acc + (current.pct / 100) * circ, 0);
    return { seg, dash, gap: circ - dash, offset: previousDashTotal };
  });

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        {segments.map(({ seg, dash, gap, offset }) => (
          <circle
            key={seg.key}
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke={STATUS_COLORS[seg.key]}
            strokeWidth={strokeWidth}
            strokeDasharray={`${dash} ${gap}`}
            strokeDashoffset={-offset}
          />
        ))}
        <circle cx={cx} cy={cy} r={radius - strokeWidth / 2 + 2} fill="#ffffff" />
      </svg>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          fontFamily: '"Inter",sans-serif',
          fontWeight: 700,
          fontSize: 22,
          color: "#3d3e41",
        }}
      >
        125
      </div>
    </div>
  );
}
