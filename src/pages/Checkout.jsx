import { useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { TbCheck, TbMoodSad, TbMoodNeutral, TbMoodSmile, TbMoodHappy, TbX, TbAlertCircle } from "react-icons/tb";
import { useEffect } from "react";
import StepTracker from "../components/StepTracker";
import { useCart } from "../context/CartContext";

const NAME_RE = /^[A-Za-z\s'-]{2,40}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const POSTAL_RE = /^[A-Za-z0-9\s-]{3,10}$/;
const PHONE_RE = /^[+]?[\d\s-]{7,15}$/;
const CARD_RE = /^\d{13,19}$/;
const EXPIRY_RE = /^(0[1-9]|1[0-2])\/\d{2}$/;
const CVC_RE = /^\d{3,4}$/;

const SHIPPING_VALIDATORS = {
  firstName: (v) => (NAME_RE.test(v.trim()) ? null : "Letters only, at least 2 characters."),
  lastName: (v) => (NAME_RE.test(v.trim()) ? null : "Letters only, at least 2 characters."),
  email: (v) => (EMAIL_RE.test(v.trim()) ? null : "Enter a valid email address."),
  address: (v) => (v.trim().length >= 5 ? null : "Enter a full street address."),
  city: (v) => (NAME_RE.test(v.trim()) ? null : "Letters only, at least 2 characters."),
  postalCode: (v) => (POSTAL_RE.test(v.trim()) ? null : "Enter a valid postal/ZIP code."),
  country: (v) => (v.trim().length >= 2 ? null : "Enter a country."),
  phone: (v) => (PHONE_RE.test(v.trim()) ? null : "Enter a valid phone number."),
};

const PAYMENT_VALIDATORS = {
  cardName: (v) => (NAME_RE.test(v.trim()) ? null : "Letters only, at least 2 characters."),
  cardNumber: (v) => (CARD_RE.test(v.replace(/\s/g, "")) ? null : "Enter a valid 13–19 digit card number."),
  expiry: (v) => {
    if (!EXPIRY_RE.test(v.trim())) return "Use MM/YY format.";
    const [mm, yy] = v.trim().split("/").map(Number);
    const now = new Date();
    const expYear = 2000 + yy;
    const curYear = now.getFullYear();
    const curMonth = now.getMonth() + 1;
    if (expYear < curYear || (expYear === curYear && mm < curMonth)) return "Card has expired.";
    return null;
  },
  cvc: (v) => (CVC_RE.test(v.trim()) ? null : "Enter a 3–4 digit CVC."),
};

function formatCardNumber(v) {
  const digits = v.replace(/\D/g, "").slice(0, 19);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(v) {
  const digits = v.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function OrderSummary() {
  const { items, subtotal, shipping, total } = useCart();
  return (
    <div className="card" style={{ padding: 20 }}>
      <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Order summary</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
        {items.map((item) => (
          <div key={item.id + "-" + item.size} style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
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

function Field({ label, required, name, value, onChange, error, placeholder, inputMode, maxLength }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12 }} className="muted">
      {label}{required ? " *" : ""}
      <input
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        inputMode={inputMode}
        maxLength={maxLength}
        style={{
          background: "var(--bg)",
          border: error ? "1px solid var(--accent-dark)" : "1px solid var(--border)",
          borderRadius: 6,
          padding: "10px 12px", color: "var(--text)", fontSize: 13, outline: "none",
          transition: "border-color 0.15s ease",
        }}
      />
      {error && (
        <span style={{ color: "var(--accent-dark)", fontSize: 11, display: "flex", alignItems: "center", gap: 4 }}>
          <TbAlertCircle size={12} /> {error}
        </span>
      )}
    </label>
  );
}

function Shipping({ data, setData }) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  function update(field, value) {
    setData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = {};
    for (const field of Object.keys(SHIPPING_VALIDATORS)) {
      const msg = SHIPPING_VALIDATORS[field](data[field] || "");
      if (msg) nextErrors[field] = msg;
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) navigate("/checkout/payment");
  }

  return (
    <div className="container fade-up" style={{ padding: "0 32px 64px", maxWidth: 900 }}>
      <StepTracker current={2} />
      <div className="checkout-grid" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 32 }}>
        <div className="card" style={{ padding: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Shipping information</h2>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }} noValidate>
            <div className="field-row-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Field label="First name" required name="firstName" value={data.firstName} error={errors.firstName} onChange={(e) => update("firstName", e.target.value)} />
              <Field label="Last name" required name="lastName" value={data.lastName} error={errors.lastName} onChange={(e) => update("lastName", e.target.value)} />
            </div>
            <Field label="Email" required name="email" value={data.email} error={errors.email} placeholder="you@example.com" onChange={(e) => update("email", e.target.value)} />
            <Field label="Street address" required name="address" value={data.address} error={errors.address} onChange={(e) => update("address", e.target.value)} />
            <div className="field-row-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              <Field label="City" required name="city" value={data.city} error={errors.city} onChange={(e) => update("city", e.target.value)} />
              <Field label="Postal code" required name="postalCode" value={data.postalCode} error={errors.postalCode} onChange={(e) => update("postalCode", e.target.value)} />
              <Field label="Country" required name="country" value={data.country} error={errors.country} onChange={(e) => update("country", e.target.value)} />
            </div>
            <Field label="Phone number" required name="phone" value={data.phone} error={errors.phone} placeholder="+1 555 123 4567" inputMode="tel" onChange={(e) => update("phone", e.target.value)} />
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

function Payment({ data, setData }) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);

  function update(field, value) {
    setData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (processing) return;
    const nextErrors = {};
    for (const field of Object.keys(PAYMENT_VALIDATORS)) {
      const msg = PAYMENT_VALIDATORS[field](data[field] || "");
      if (msg) nextErrors[field] = msg;
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      // Give the user explicit feedback that the system is working on their
      // request (visibility of system status) instead of jumping straight
      // to confirmation, which would feel instant/untrustworthy for a
      // "payment" action.
      setProcessing(true);
      setTimeout(() => navigate("/checkout/confirmation"), 1100);
    }
  }

  return (
    <div className="container fade-up" style={{ padding: "0 32px 64px", maxWidth: 900 }}>
      <StepTracker current={3} />
      <div className="checkout-grid" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 32 }}>
        <div className="card" style={{ padding: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Payment</h2>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }} noValidate>
            <Field label="Name on card" required name="cardName" value={data.cardName} error={errors.cardName} onChange={(e) => update("cardName", e.target.value)} />
            <Field
              label="Card number" required name="cardNumber" value={data.cardNumber} error={errors.cardNumber}
              placeholder="0000 0000 0000 0000" inputMode="numeric" maxLength={23}
              onChange={(e) => update("cardNumber", formatCardNumber(e.target.value))}
            />
            <div className="field-row-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Field
                label="Expiry (MM/YY)" required name="expiry" value={data.expiry} error={errors.expiry}
                placeholder="MM/YY" inputMode="numeric" maxLength={5}
                onChange={(e) => update("expiry", formatExpiry(e.target.value))}
              />
              <Field label="CVC" required name="cvc" value={data.cvc} error={errors.cvc} placeholder="123" inputMode="numeric" maxLength={4} onChange={(e) => update("cvc", e.target.value.replace(/\D/g, ""))} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
              <button type="button" className="btn btn-secondary" disabled={processing} onClick={() => navigate("/checkout/shipping")}>← Back to shipping</button>
              <button type="submit" className="btn btn-primary" disabled={processing} style={{ display: "flex", alignItems: "center", gap: 8, opacity: processing ? 0.85 : 1 }}>
                {processing ? (
                  <>
                    <span className="spinner" aria-hidden="true" /> Processing payment…
                  </>
                ) : (
                  "Place order →"
                )}
              </button>
            </div>
          </form>
        </div>
        <OrderSummary />
      </div>
    </div>
  );
}

// Dynamic delivery estimate: 2-4 business days from today (matches the
// shipping promise on the Help page), instead of a hardcoded date range.
function formatEta(businessDaysMin = 2, businessDaysMax = 4) {
  const addBusinessDays = (days) => {
    const d = new Date();
    let added = 0;
    while (added < days) {
      d.setDate(d.getDate() + 1);
      if (d.getDay() !== 0 && d.getDay() !== 6) added += 1;
    }
    return d;
  };
  const fmt = (d) => d.toLocaleDateString("en-US", { month: "long", day: "numeric" });
  return `${fmt(addBusinessDays(businessDaysMin))} – ${fmt(addBusinessDays(businessDaysMax))}`;
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
  const [orderNo] = useState(() => "KV-" + Math.floor(40000 + Math.random() * 9000));
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
    <div className="container fade-up" style={{ padding: "0 32px 80px", maxWidth: 900 }}>
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
        <p className="muted" style={{ fontSize: 13 }}>Estimated arrival: {formatEta()}</p>
      </div>

      {!dismissed && (
        <div className="card fade-up" style={{ maxWidth: 420, margin: "0 auto", padding: 24, position: "relative", animationDelay: "0.1s" }}>
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

const EMPTY_SHIPPING = { firstName: "", lastName: "", email: "", address: "", city: "", postalCode: "", country: "", phone: "" };
const EMPTY_PAYMENT = { cardName: "", cardNumber: "", expiry: "", cvc: "" };

export default function Checkout() {
  // Lifted above the nested <Routes> so shipping/payment data survives
  // back-and-forth navigation between checkout steps instead of resetting
  // every time a step component unmounts.
  const [shippingData, setShippingData] = useState(EMPTY_SHIPPING);
  const [paymentData, setPaymentData] = useState(EMPTY_PAYMENT);

  return (
    <Routes>
      <Route path="shipping" element={<Shipping data={shippingData} setData={setShippingData} />} />
      <Route path="payment" element={<Payment data={paymentData} setData={setPaymentData} />} />
      <Route path="confirmation" element={<Confirmation />} />
      <Route path="*" element={<Navigate to="shipping" replace />} />
    </Routes>
  );
}