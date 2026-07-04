import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border-soft)", marginTop: 64 }}>
      <div className="container" style={{ padding: "40px 32px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
        <div>
          <div style={{ fontSize: 17, fontWeight: 700 }}>
            <span style={{ color: "var(--text)" }}>KICK</span><span style={{ color: "var(--accent)" }}>VERSE</span>
          </div>
          <p className="muted" style={{ fontSize: 13, marginTop: 8, maxWidth: 280 }}>
            Deadstock drops, weekly. Every pair authenticated before it ships.
          </p>
        </div>
        <div style={{ display: "flex", gap: 48, fontSize: 13 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span className="muted">Shop</span>
            <Link to="/shop">All sneakers</Link>
            <Link to="/shop">New in</Link>
            <Link to="/shop">Sale</Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span className="muted">Support</span>
            <span>Shipping &amp; returns</span>
            <span>Size guide</span>
            <span>Contact us</span>
          </div>
        </div>
      </div>
      <div className="container" style={{ padding: "16px 32px", borderTop: "1px solid var(--border-soft)" }}>
        <span className="muted" style={{ fontSize: 12 }}>© 2026 KickVerse. A SEG3125 prototype — not a real store.</span>
      </div>
    </footer>
  );
}
