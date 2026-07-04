import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { TbTruck, TbRulerMeasure, TbMail, TbArrowRight } from "react-icons/tb";

const SIZE_CHART = [
  { us: 8, uk: 7, eu: 41, cm: 26 },
  { us: 8.5, uk: 7.5, eu: 42, cm: 26.5 },
  { us: 9, uk: 8, eu: 42.5, cm: 27 },
  { us: 9.5, uk: 8.5, eu: 43, cm: 27.5 },
  { us: 10, uk: 9, eu: 44, cm: 28 },
  { us: 10.5, uk: 9.5, eu: 44.5, cm: 28.5 },
];

const TOPICS = [
  { key: "shipping", label: "Shipping & returns", icon: TbTruck },
  { key: "size-guide", label: "Size guide", icon: TbRulerMeasure },
  { key: "contact", label: "Contact us", icon: TbMail },
];

export default function Help() {
  const [params] = useSearchParams();
  const [topic, setTopic] = useState(() => params.get("topic") || "shipping");

  useEffect(() => {
    setTopic(params.get("topic") || "shipping");
  }, [params.toString()]);

  return (
    <div className="container fade-up" style={{ padding: "32px 32px 80px", maxWidth: 880 }}>
      <div className="muted" style={{ fontSize: 13, marginBottom: 16 }}>Home / Support</div>
      <h1 className="section-title" style={{ marginBottom: 24 }}>How can we help?</h1>

      <div className="help-grid" style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 32 }}>
        <aside className="help-sidebar" style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {TOPICS.map((t) => (
            <Link
              key={t.key}
              to={`/help?topic=${t.key}`}
              style={{
                display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", borderRadius: 8,
                fontSize: 13, fontWeight: 500, transition: "background 0.15s ease, color 0.15s ease",
                background: topic === t.key ? "var(--accent-soft-bg)" : "transparent",
                color: topic === t.key ? "var(--accent-soft)" : "var(--text)",
              }}
            >
              <t.icon size={16} /> {t.label}
            </Link>
          ))}
        </aside>

        <div key={topic} className="card fade-up" style={{ padding: 28 }}>
          {topic === "shipping" && (
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>Shipping & returns</h2>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text-muted)", marginBottom: 14 }}>
                Free standard shipping on orders over $100 — arrives in 2–4 business days. Express
                delivery (1–2 business days) is available at checkout for a flat fee.
              </p>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text-muted)", marginBottom: 14 }}>
                Every pair is authenticated and inspected before it ships, and arrives with its
                original box and KickVerse authentication tag.
              </p>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text-muted)" }}>
                Returns are accepted within 14 days of delivery for unworn pairs in original
                packaging. Refunds are issued to the original payment method within 5–7 business days
                of us receiving the return.
              </p>
            </div>
          )}

          {topic === "size-guide" && (
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Size guide</h2>
              <p className="muted" style={{ fontSize: 12, marginBottom: 16 }}>Men's sizing · measurements approximate</p>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, marginBottom: 16 }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border-soft)" }}>
                    {["US", "UK", "EU", "CM"].map((h) => (
                      <th key={h} style={{ textAlign: "left", padding: "8px 4px", color: "var(--text-dim)", fontWeight: 600, fontSize: 12 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SIZE_CHART.map((row) => (
                    <tr key={row.us} style={{ borderBottom: "1px solid var(--border-soft)" }}>
                      <td style={{ padding: "8px 4px" }}>{row.us}</td>
                      <td style={{ padding: "8px 4px" }}>{row.uk}</td>
                      <td style={{ padding: "8px 4px" }}>{row.eu}</td>
                      <td style={{ padding: "8px 4px" }}>{row.cm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="muted" style={{ fontSize: 13, lineHeight: 1.6 }}>
                Between sizes? We recommend sizing up for a roomier fit, especially for retro
                silhouettes. You can also check size-specific guidance on any product page.
              </p>
            </div>
          )}

          {topic === "contact" && (
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>Contact us</h2>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text-muted)", marginBottom: 18 }}>
                Have a question about an order, a pair you're eyeing, or anything else? Reach out and
                we'll get back to you within one business day.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <a href="mailto:ketan@kickverse.ca" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "var(--accent-soft)" }}>
                  <TbMail size={16} /> ketan@kickverse.ca
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      <Link to="/shop" className="muted" style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 13, marginTop: 28 }}>
        Back to shop <TbArrowRight size={14} />
      </Link>
    </div>
  );
}
