import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TbSearch, TbHeart, TbShoppingBag, TbUser, TbChevronDown, TbLock, TbMenu2, TbX } from "react-icons/tb";
import { useCart } from "../context/CartContext";
import { BRANDS, CATEGORIES } from "../data/products";

function NavDropdown({ label, items, accent = false }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex", alignItems: "center", gap: 3, background: "none", border: "none",
          color: accent ? "var(--accent)" : "var(--text)", fontSize: 13, fontWeight: 500, padding: 0,
        }}
      >
        {label} <TbChevronDown size={13} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.15s ease" }} />
      </button>
      {open && (
        <>
          {/* Invisible bridge: keeps the dropdown open while the mouse moves
              through the visual gap between the button and the panel below it.
              Without this, that gap has no element under the cursor, so
              onMouseLeave fires on the wrapper and closes the menu before a
              click on an item can register. */}
          <div style={{ position: "absolute", top: "100%", left: 0, width: "100%", minWidth: 180, height: 14, zIndex: 19 }} />
          <div
            className="card scaleIn"
            style={{ position: "absolute", top: "calc(100% + 14px)", left: 0, minWidth: 180, padding: 8, zIndex: 20, boxShadow: "0 16px 40px -16px rgba(0,0,0,0.6)", transformOrigin: "top left" }}
          >
            {items.map((it) => (
              <Link
                key={it.label}
                to={it.to}
                onClick={() => setOpen(false)}
                style={{ display: "block", padding: "9px 10px", borderRadius: 6, fontSize: 13, color: "var(--text)", transition: "background 0.12s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-soft)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                {it.label}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function Navbar({ checkout = false }) {
  const { count } = useCart();
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  function onSearch(e) {
    e.preventDefault();
    setMobileOpen(false);
    navigate(query ? `/shop?q=${encodeURIComponent(query)}` : "/shop");
  }

  return (
    <header style={{ borderBottom: "1px solid var(--border-soft)", position: "sticky", top: 0, background: "var(--bg)", zIndex: 10 }}>
      <div className="container navbar-inner" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 76, gap: 24 }}>
        <Link to="/" style={{ fontFamily: "var(--font-display)", fontSize: 18, letterSpacing: "0.02em", flexShrink: 0 }} onClick={() => setMobileOpen(false)}>
          <span style={{ color: "var(--text)" }}>KICK</span>
          <span style={{ color: "var(--accent)" }}>VERSE</span>
        </Link>

        {checkout ? (
          <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--text-dim)", fontSize: 13 }}>
            <TbLock size={14} /> Secure checkout
          </div>
        ) : (
          <>
            <nav className="navbar-links" style={{ display: "flex", alignItems: "center", gap: 26, fontSize: 13, fontWeight: 500, flexShrink: 0 }}>
              <NavDropdown
                label="SHOP"
                items={[
                  { label: "All sneakers", to: "/shop" },
                  ...CATEGORIES.map((c) => ({ label: c, to: `/shop?category=${encodeURIComponent(c)}` })),
                ]}
              />
              <Link to="/shop?badge=Just%20dropped">RELEASES</Link>
              <NavDropdown
                label="BRANDS"
                items={BRANDS.map((b) => ({ label: b, to: `/shop?brand=${encodeURIComponent(b)}` }))}
              />
              <Link to="/shop?condition=New">NEW IN</Link>
              <Link to="/shop?maxPrice=140" style={{ color: "var(--accent)" }}>SALE</Link>
            </nav>

            <form onSubmit={onSearch} className="navbar-search" style={{ flex: 1, maxWidth: 360 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: 999, padding: "9px 16px" }}>
                <TbSearch size={15} color="var(--text-dim)" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search sneakers..."
                  style={{ background: "transparent", border: "none", outline: "none", color: "var(--text)", fontSize: 13, width: "100%" }}
                />
              </div>
            </form>

            <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
              <button className="btn-icon navbar-mobile-toggle" onClick={() => setMobileOpen((o) => !o)} aria-label="Menu">
                {mobileOpen ? <TbX size={18} /> : <TbMenu2 size={18} />}
              </button>
              <Link to="/wishlist" className="btn-icon" aria-label="Wishlist"><TbHeart size={18} /></Link>
              <Link to="/cart" className="btn-icon" style={{ position: "relative" }} aria-label="Cart">
                <TbShoppingBag size={18} />
                {count > 0 && (
                  <span key={count} className="badge-pop" style={{
                    position: "absolute", top: -5, right: -5, background: "var(--accent-dark)", color: "#fff",
                    fontSize: 10, fontWeight: 700, borderRadius: "50%", width: 17, height: 17,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>{count}</span>
                )}
              </Link>
              <Link to="/account" className="btn-icon" aria-label="Account"><TbUser size={18} /></Link>
            </div>
          </>
        )}
      </div>

      {!checkout && mobileOpen && (
        <div className="navbar-mobile-panel card" style={{ margin: "0 16px 16px", padding: 16 }}>
          <form onSubmit={onSearch} style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: 999, padding: "9px 16px" }}>
              <TbSearch size={15} color="var(--text-dim)" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search sneakers..."
                style={{ background: "transparent", border: "none", outline: "none", color: "var(--text)", fontSize: 13, width: "100%" }}
              />
            </div>
          </form>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <Link to="/shop" onClick={() => setMobileOpen(false)} className="navbar-mobile-link">All sneakers</Link>
            {CATEGORIES.map((c) => (
              <Link key={c} to={`/shop?category=${encodeURIComponent(c)}`} onClick={() => setMobileOpen(false)} className="navbar-mobile-link">{c}</Link>
            ))}
            <Link to="/shop?badge=Just%20dropped" onClick={() => setMobileOpen(false)} className="navbar-mobile-link">Releases</Link>
            {BRANDS.map((b) => (
              <Link key={b} to={`/shop?brand=${encodeURIComponent(b)}`} onClick={() => setMobileOpen(false)} className="navbar-mobile-link">{b}</Link>
            ))}
            <Link to="/shop?condition=New" onClick={() => setMobileOpen(false)} className="navbar-mobile-link">New in</Link>
            <Link to="/shop?maxPrice=140" onClick={() => setMobileOpen(false)} className="navbar-mobile-link" style={{ color: "var(--accent)" }}>Sale</Link>
          </div>
        </div>
      )}
    </header>
  );
}
