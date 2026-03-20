import React from "react";
import styles from "./backoffice.module.css";

// Assets (MCP/Figma) - usados para montar o layout do dashboard inicial
const imgBarChart =
  "https://www.figma.com/api/mcp/asset/0c64567a-7c15-474d-bc89-cfe3d1520ab9";

const imgEllipse3 =
  "https://www.figma.com/api/mcp/asset/ac729498-b4d3-43d3-acc0-6977dd50c812";
const imgEllipse4 =
  "https://www.figma.com/api/mcp/asset/05600740-da14-499a-bf20-2b6013f1a5e1";
const imgEllipse5 =
  "https://www.figma.com/api/mcp/asset/f0b74619-94bc-4ef2-ad47-cdcfadbf1ce2";
const imgEllipse6 =
  "https://www.figma.com/api/mcp/asset/4d8c82ee-dfc9-4461-bde8-119a53214fd0";

const imgVector3 =
  "https://www.figma.com/api/mcp/asset/926d4645-fde0-4938-9108-7ffbccae8768";
const imgVector4 =
  "https://www.figma.com/api/mcp/asset/5fe36d96-fc0c-4996-9fa6-a0ddee553e71";

const imgTextSnippet =
  "https://www.figma.com/api/mcp/asset/08c03af8-604e-40b7-87b1-7157758429db";

const imgStickyNote2 =
  "https://www.figma.com/api/mcp/asset/ea643b7b-6515-42c0-99b3-dc29880f44b4";
const imgVector5 =
  "https://www.figma.com/api/mcp/asset/597e3a2f-9456-434d-8a04-489aba0492a8";

function StatCard({
  bg,
  ellipseSrc,
  iconSrc,
  vectorSrc,
  value,
  title,
  footer,
}: {
  bg: string;
  ellipseSrc: string;
  iconSrc: string;
  vectorSrc?: string;
  value: string;
  title: string;
  footer: string;
}) {
  return (
    <div className={styles.statCard} style={{ background: bg }}>
      <div className={styles.statIconWrap}>
        <div className="ellipse" style={{ position: "absolute", left: -8, top: -8 }}>
          <img alt="" src={ellipseSrc} />
        </div>
        <div className="icon" style={{ position: "absolute", left: 0, top: 0 }}>
          <img alt="" src={iconSrc} style={{ position: "absolute", inset: 0 }} />
          {vectorSrc ? (
            <div
              className="vector"
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
              }}
            >
              <img
                alt=""
                src={vectorSrc}
                style={{ position: "absolute", inset: 0 }}
              />
            </div>
          ) : null}
        </div>
      </div>
      <div className={styles.statValue}>{value}</div>
      <div className={styles.statTitle}>{title}</div>
      <div className={styles.statFooter}>{footer}</div>
    </div>
  );
}

export default function BackofficePage() {
  return (
    <>
      <div className={styles.topHeader}>
        <div className={styles.topTitle}>Dashboard</div>
        <div className={styles.userBadge}>
          <div className={styles.userName}>Olá Daniel</div>
        </div>
      </div>

      <div className={styles.contentBg}>
        <div className={styles.contentCard}>
          <div className={styles.contentHeader}>
            <div className={styles.contentHeaderTitle}>Contratos</div>
          </div>

          <div className={styles.statsRow}>
            <StatCard
              bg="#dcfce7"
              ellipseSrc={imgEllipse3}
              iconSrc={imgBarChart}
              vectorSrc={imgVector3}
              value="124"
              title="Empresas"
              footer="Cadastradas"
            />
            <StatCard
              bg="#fff4de"
              ellipseSrc={imgEllipse4}
              iconSrc={imgBarChart}
              vectorSrc={imgVector4}
              value="3.458"
              title="Parceiros PJ"
              footer="Ativos"
            />
            <StatCard
              bg="rgba(0,149,255,0.2)"
              ellipseSrc={imgEllipse5}
              iconSrc={imgTextSnippet}
              value="1789"
              title="Contratos"
              footer="Total"
            />
            <StatCard
              bg="#ffe2e5"
              ellipseSrc={imgEllipse6}
              iconSrc={imgStickyNote2}
              vectorSrc={imgVector5}
              value="32"
              title="Notas Fiscais"
              footer="Emitidas"
            />
          </div>
        </div>
      </div>
    </>
  );
}

