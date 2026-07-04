import { useState } from "react";
import { Link } from "react-router-dom";
import { TbUserCircle, TbMail, TbLock, TbHeart, TbShoppingBag, TbAlertCircle, TbInfoCircle } from "react-icons/tb";
import { useToast } from "../context/ToastContext";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(v) {
  if (!v.trim()) return "Email is required.";
  return EMAIL_RE.test(v.trim()) ? null : "Enter a valid email address, e.g. you@example.com.";
}

function validatePassword(v) {
  if (!v) return "Password is required.";
  return v.length >= 8 ? null : "Password must be at least 8 characters.";
}

function FieldShell({ icon: Icon, children, hasError }) {
  const [focused, setFocused] = useState(false);
  return (
    <div
      className={`input-field${focused ? " focused" : ""}`}
      style={{
        display: "flex", alignItems: "center", gap: 8, background: "var(--bg-elevated)", borderRadius: 8, padding: "11px 14px",
        border: hasError ? "1px solid #e5484d" : undefined,
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <Icon size={15} color={hasError ? "#e5484d" : "var(--text-dim)"} />
      {children}
    </div>
  );
}

export default function Account() {
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [formNotice, setFormNotice] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      setFormNotice(null);
      return;
    }
    setErrors({});
    setFormNotice("This is a demo store, so sign-in isn't connected to a real account yet. Browse as a guest using Wishlist or Cart below.");
    showToast("Sign-in isn't available in this demo.");
  }

  return (
    <div className="container" style={{ padding: "32px 32px 80px", maxWidth: 880 }}>
      <div className="muted" style={{ fontSize: 13, marginBottom: 16 }}>Home / Account</div>

      <div className="account-grid" style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 32 }}>
        <div className="card fade-up" style={{ padding: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <TbUserCircle size={24} color="var(--accent)" />
            <h1 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Sign in</h1>
          </div>

          {formNotice && (
            <div
              role="status"
              style={{
                display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, lineHeight: 1.4,
                background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: 8,
                padding: "10px 12px", marginBottom: 14,
              }}
            >
              <TbInfoCircle size={16} style={{ flexShrink: 0, marginTop: 1 }} color="var(--accent)" />
              <span>{formNotice}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }} noValidate>
            <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13 }}>
              Email
              <FieldShell icon={TbMail} hasError={!!errors.email}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  aria-invalid={!!errors.email}
                  style={{ background: "transparent", border: "none", outline: "none", color: "var(--text)", fontSize: 13, width: "100%" }}
                />
              </FieldShell>
              {errors.email && (
                <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#e5484d" }}>
                  <TbAlertCircle size={12} /> {errors.email}
                </span>
              )}
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13 }}>
              Password
              <FieldShell icon={TbLock} hasError={!!errors.password}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  aria-invalid={!!errors.password}
                  style={{ background: "transparent", border: "none", outline: "none", color: "var(--text)", fontSize: 13, width: "100%" }}
                />
              </FieldShell>
              {errors.password && (
                <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#e5484d" }}>
                  <TbAlertCircle size={12} /> {errors.password}
                </span>
              )}
            </label>
            <button type="submit" className="btn btn-primary" style={{ marginTop: 4 }}>Sign in</button>
          </form>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Link to="/wishlist" className="card lift-card fade-up" style={{ display: "flex", alignItems: "center", gap: 10, padding: 16, fontSize: 14, animationDelay: "0.05s" }}>
            <TbHeart size={17} color="var(--accent)" /> Wishlist
          </Link>
          <Link to="/cart" className="card lift-card fade-up" style={{ display: "flex", alignItems: "center", gap: 10, padding: 16, fontSize: 14, animationDelay: "0.1s" }}>
            <TbShoppingBag size={17} color="var(--accent)" /> Cart
          </Link>
          <Link to="/help?topic=contact" className="card lift-card fade-up" style={{ display: "flex", alignItems: "center", gap: 10, padding: 16, fontSize: 14, animationDelay: "0.15s" }}>
            <TbMail size={17} color="var(--accent)" /> Contact support
          </Link>
        </div>
      </div>
    </div>
  );
}
