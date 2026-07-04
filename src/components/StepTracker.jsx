import { TbCheck } from "react-icons/tb";

const STEPS = ["Cart", "Shipping", "Payment", "Confirmation"];

export default function StepTracker({ current }) {
  // current: 1-4
  return (
    <div className="steptracker-wrap" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, margin: "32px 0" }}>
      <div className="steptracker-row" style={{ display: "flex", alignItems: "center" }}>
        {STEPS.map((label, idx) => {
          const step = idx + 1;
          const done = step < current;
          const active = step === current;
          return (
            <div key={label} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div
                  className={`steptracker-circle${active ? " active" : ""}`}
                  style={{
                    width: 32, height: 32, borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: done || active ? "var(--accent)" : "transparent",
                    border: done || active ? "none" : "1px solid var(--border)",
                    color: done || active ? "#0a0a0a" : "var(--text-dim)",
                    fontSize: 13, fontWeight: 600,
                  }}
                >
                  {done ? <TbCheck size={16} /> : step}
                </div>
                <span className="steptracker-label" style={{ fontSize: 12, fontWeight: active ? 600 : 400, color: active ? "var(--text)" : "var(--text-dim)" }}>
                  {label}
                </span>
              </div>
              {idx < STEPS.length - 1 && (
                <div className="steptracker-connector" style={{ width: 64, height: 2, background: "var(--border)", margin: "0 8px 18px" }}>
                  {step < current && <span className="fill" style={{ animationDelay: `${idx * 0.12}s` }} />}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <span className="muted" style={{ fontSize: 13 }}>
        {current >= 4 ? "Order complete" : `Step ${current} of 4 · almost there`}
      </span>
    </div>
  );
}
