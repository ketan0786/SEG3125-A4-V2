import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border-soft)", marginTop: 64 }}>
      <div className="container" style={{ padding: "48px 32px 36px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 32 }}>
        <div style={{ maxWidth: 280 }}>
          <Link to="/" style={{ fontSize: 17, fontWeight: 700 }}>
            <span style={{ color: "var(--text)" }}>KICK</span><span style={{ color: "var(--accent)" }}>VERSE</span>
          </Link>
          <p className="muted" style={{ fontSize: 13, marginTop: 8, lineHeight: 1.6 }}>
            Deadstock drops, weekly. Every pair authenticated before it ships.
          </p>
        </div>
        <div className="footer-links" style={{ display: "flex", gap: 56, fontSize: 13, flexWrap: "wrap" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <span className="muted" style={{ fontWeight: 600, color: "var(--text)" }}>Shop</span>
            <Link to="/shop" className="muted">All sneakers</Link>
            <Link to="/shop?condition=New" className="muted">New in</Link>
            <Link to="/shop?maxPrice=140" className="muted">Sale</Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <span className="muted" style={{ fontWeight: 600, color: "var(--text)" }}>Support</span>
            <Link to="/help?topic=shipping" className="muted">Shipping &amp; returns</Link>
            <Link to="/help?topic=size-guide" className="muted">Size guide</Link>
            <Link to="/help?topic=contact" className="muted">Contact us</Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <span className="muted" style={{ fontWeight: 600, color: "var(--text)" }}>Account</span>
            <Link to="/wishlist" className="muted">Wishlist</Link>
            <Link to="/cart" className="muted">Cart</Link>
          </div>
        </div>
      </div>
      <div className="container" style={{ padding: "16px 32px", borderTop: "1px solid var(--border-soft)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
        <span className="muted" style={{ fontSize: 12 }}>© 2026 KickVerse. A SEG3125 prototype.</span>
        <span className="muted" style={{ fontSize: 12 }}>Designed &amp; built by Ketan Kumar · SEG3125 Assignment 4</span>
      </div>
    </footer>
  );
}
