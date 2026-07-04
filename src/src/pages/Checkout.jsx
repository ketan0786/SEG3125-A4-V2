import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { TbCheck, TbMoodSad, TbMoodNeutral, TbMoodSmile, TbMoodHappy, TbX } from "react-icons/tb";
import StepTracker from "../components/StepTracker";
import { useCart } from "../context/CartContext";

function OrderSummary() {
  const { items, subtotal, shipping, total } = useCart();
  return (
    <div className="card" style={{ padding: 20 }}>
      <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Order summary</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
        {items.map((item) => (
          <div key={`${item.id}-${item.size}`} style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
            <div>
              <div>{item.name}</div>
              <div className="muted" style={{ fontSize: 11 }}>Size {item.size} · Qty {item.qty}</div>
            </div>
            <span style={{ color: "var(--accent)" }}>${item.price * item.qty}</span>
          </div>
        ))}
      </div>
      <div style={{ borderTop: "1px solid var(--border-soft)", paddingTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }} className="muted"><span>Subtotal</span><span>${subtotal}</span></div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }} className="muted"><span>Shipping</span><span>${shipping}</span></div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15, fontWeight: 600 }}><span>Total</span><span style={{ color: "var(--accent)" }}>${total}</span></div>
      </div>
    </div>
  );
}

function Shipping() {
  const navigate = useNavigate();
  return (
    <div className="container" style={{ padding: "0 32px 64px", maxWidth: 900 }}>
      <StepTracker current={2} />
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 32 }}>
        <div className="card" style={{ padding: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Shipping information</h2>
          <form onSubmit={(e) => { e.preventDefault(); navigate("/checkout/payment"); }} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Field label="First name" required />
              <Field label="Last name" required />
            </div>
            <Field label="Street address" required />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              <Field label="City" required />
              <Field label="Postal code" required />
              <Field label="Country" required />
            </div>
            <Field label="Phone number" required />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
              <button type="button" className="btn btn-secondary" onClick={() => navigate("/cart")}>← Back to cart</button>
              <button type="submit" className="btn btn-primary">Continue to payment →</button>
            </div>
          </form>
        </div>
        <OrderSummary />
      </div>
    </div>
  );
}

function Field({ label, required }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12 }} className="muted">
      {label}{required ? " *" : ""}
      <input required={required} style={{
        background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 6,
        padding: "10px 12px", color: "var(--text)", fontSize: 13, outline: "none",
      }} />
    </label>
  );
}

function Payment() {
  const navigate = useNavigate();
  return (
    <div className="container" style={{ padding: "0 32px 64px", maxWidth: 900 }}>
      <StepTracker current={3} />
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 32 }}>
        <div className="card" style={{ padding: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Payment</h2>
          <form onSubmit={(e) => { e.preventDefault(); navigate("/checkout/confirmation"); }} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Field label="Name on card" required />
            <Field label="Card number" required />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Field label="Expiry (MM/YY)" required />
              <Field label="CVC" required />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
              <button type="button" className="btn btn-secondary" onClick={() => navigate("/checkout/shipping")}>← Back to shipping</button>
              <button type="submit" className="btn btn-primary">Place order →</button>
            </div>
          </form>
        </div>
        <OrderSummary />
      </div>
    </div>
  );
}

const MOODS = [
  { icon: TbMoodSad, label: "Difficult" },
  { icon: TbMoodNeutral, label: "OK" },
  { icon: TbMoodSmile, label: "Easy" },
  { icon: TbMoodHappy, label: "Great" },
];
const FRICTION_CHIPS = ["Price", "Size availability", "Shipping time", "Nothing!"];

function Confirmation() {
  const { clearCart } = useCart();
  const [orderNo] = useState(() => `KV-${Math.floor(40000 + Math.random() * 9000)}`);
  const [dismissed, setDismissed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [mood, setMood] = useState(2);
  const [friction, setFriction] = useState(["Size availability"]);
  const [comment, setComment] = useState("");

  // Clear the cart once when confirmation is reached.
  useEffect(() => { clearCart(); }, []);

  function toggleFriction(chip) {
    setFriction((prev) => (prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]));
  }

  return (
    <div className="container" style={{ padding: "0 32px 80px", maxWidth: 900 }}>
      <StepTracker current={4} />

      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{
          width: 56, height: 56, borderRadius: "50%", background: "var(--accent)", color: "#0a0a0a",
          display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px",
        }}>
          <TbCheck size={28} />
        </div>
        <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 6 }}>You're all set, it's on the way.</h1>
        <p className="muted" style={{ fontSize: 13 }}>Order #{orderNo} · confirmation sent to your email</p>
        <p className="muted" style={{ fontSize: 13 }}>Estimated arrival: June 30 – July 2</p>
      </div>

      {!dismissed && (
        <div className="card" style={{ maxWidth: 420, margin: "0 auto", padding: 24, position: "relative" }}>
          <button onClick={() => setDismissed(true)} aria-label="Dismiss" style={{ position: "absolute", top: 14, right: 14, background: "none", border: "none", color: "var(--text-dim)" }}>
            <TbX size={16} />
          </button>

          {submitted ? (
            <div style={{ textAlign: "center", padding: "12px 0" }}>
              <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>Thank you — that's a huge help.</p>
              <p className="muted" style={{ fontSize: 13 }}>We read every response. See you on the next drop.</p>
            </div>
          ) : (
            <>
              <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 4, paddingRight: 20 }}>
                Got 60 seconds? You just helped us get one pair closer to legendary.
              </h3>
              <p className="muted" style={{ fontSize: 12, marginBottom: 18 }}>Three quick questions · no account needed</p>

              <p style={{ fontSize: 13, fontWeight: 500, marginBottom: 10 }}>How was finding your pair?</p>
              <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
                {MOODS.map((m, i) => (
                  <button key={m.label} onClick={() => setMood(i)} aria-label={m.label}
                    className="btn-icon" style={{ width: 42, height: 42, background: mood === i ? "var(--accent)" : "var(--bg-elevated)", color: mood === i ? "#0a0a0a" : "var(--text)" }}>
                    <m.icon size={20} />
                  </button>
                ))}
              </div>

              <p style={{ fontSize: 13, fontWeight: 500, marginBottom: 10 }}>Anything that almost stopped you from checking out?</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
                {FRICTION_CHIPS.map((chip) => (
                  <button key={chip} onClick={() => toggleFriction(chip)} className="pill"
                    style={{ border: friction.includes(chip) ? "1px solid var(--accent)" : "1px solid transparent", color: friction.includes(chip) ? "var(--accent-soft)" : "var(--text-dim)" }}>
                    {chip}
                  </button>
                ))}
              </div>

              <textarea
                value={comment} onChange={(e) => setComment(e.target.value)}
                placeholder="Anything else you'd tell a friend before they shop here? (optional)"
                rows={3}
                style={{ width: "100%", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 6, padding: 10, color: "var(--text)", fontSize: 13, resize: "vertical", marginBottom: 18 }}
              />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <button onClick={() => setDismissed(true)} className="muted" style={{ background: "none", border: "none", fontSize: 13 }}>Maybe next time</button>
                <button onClick={() => setSubmitted(true)} className="btn btn-primary">Send it · thank you!</button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default function Checkout() {
  return (
    <Routes>
      <Route path="shipping" element={<Shipping />} />
      <Route path="payment" element={<Payment />} />
      <Route path="confirmation" element={<Confirmation />} />
      <Route path="*" element={<Navigate to="shipping" replace />} />
    </Routes>
  );
}
