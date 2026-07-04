import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TbSearch, TbHeart, TbShoppingBag, TbUser, TbChevronDown, TbLock } from "react-icons/tb";
import { useCart } from "../context/CartContext";

export default function Navbar({ checkout = false }) {
  const { count } = useCart();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function onSearch(e) {
    e.preventDefault();
    navigate(query ? `/shop?q=${encodeURIComponent(query)}` : "/shop");
  }

  return (
    <header style={{ borderBottom: "1px solid var(--border-soft)", position: "sticky", top: 0, background: "var(--bg)", zIndex: 10 }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 76, gap: 24 }}>
        <Link to="/" style={{ fontSize: 19, fontWeight: 700, letterSpacing: "-0.02em", flexShrink: 0 }}>
          <span style={{ color: "var(--text)" }}>KICK</span>
          <span style={{ color: "var(--accent)" }}>VERSE</span>
        </Link>

        {checkout ? (
          <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--text-dim)", fontSize: 13 }}>
            <TbLock size={14} /> Secure checkout
          </div>
        ) : (
          <>
            <nav style={{ display: "flex", alignItems: "center", gap: 26, fontSize: 13, fontWeight: 500, flexShrink: 0 }}>
              <Link to="/shop" style={{ display: "flex", alignItems: "center", gap: 3 }}>SHOP <TbChevronDown size={13} /></Link>
              <Link to="/shop">RELEASES</Link>
              <Link to="/shop">BRANDS</Link>
              <Link to="/shop">NEW IN</Link>
              <Link to="/shop" style={{ color: "var(--accent)" }}>SALE</Link>
            </nav>

            <form onSubmit={onSearch} style={{ flex: 1, maxWidth: 360 }}>
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
              <Link to="/wishlist" className="btn-icon" aria-label="Wishlist"><TbHeart size={18} /></Link>
              <Link to="/cart" className="btn-icon" style={{ position: "relative" }} aria-label="Cart">
                <TbShoppingBag size={18} />
                {count > 0 && (
                  <span style={{
                    position: "absolute", top: -5, right: -5, background: "var(--accent-dark)", color: "#fff",
                    fontSize: 10, fontWeight: 700, borderRadius: "50%", width: 17, height: 17,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>{count}</span>
                )}
              </Link>
              <button className="btn-icon" aria-label="Account"><TbUser size={18} /></button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
