import { Link } from "react-router-dom";
import { TbShoe, TbShieldCheck, TbTruck, TbPackage, TbLock, TbArrowRight } from "react-icons/tb";
import ProductCard from "../components/ProductCard";
import { PRODUCTS, BRANDS } from "../data/products";

const TRENDING = PRODUCTS.slice(0, 4);

const TRUST = [
  { icon: TbShieldCheck, title: "100% authentic", desc: "Every pair is verified by our experts." },
  { icon: TbTruck, title: "Fast shipping", desc: "Express shipping on all orders." },
  { icon: TbPackage, title: "Easy returns", desc: "14-day return policy guaranteed." },
  { icon: TbLock, title: "Secure payments", desc: "Your info is safe with us." },
];

export default function Home() {
  return (
    <div className="container" style={{ padding: "56px 32px 0" }}>
      {/* Hero */}
      <section style={{ display: "flex", alignItems: "center", gap: 48, paddingBottom: 64 }}>
        <div style={{ flex: 1, maxWidth: 520 }}>
          <span className="kicker">Deadstock · Drops weekly</span>
          <h1 style={{ fontSize: 48, lineHeight: 1.08, fontWeight: 700, letterSpacing: "-0.02em", margin: "16px 0" }}>
            Found in the dark.<br />Worth the light.
          </h1>
          <p className="muted" style={{ fontSize: 15, marginBottom: 28 }}>Every pair authenticated before it ships.</p>
          <Link to="/shop" className="btn btn-primary">Shop the drop <TbArrowRight size={16} /></Link>
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "center", position: "relative", height: 280 }}>
          {[220, 190, 160].map((d, i) => (
            <div key={d} style={{
              position: "absolute", width: d, height: d, borderRadius: "50%",
              top: `calc(50% - ${d / 2}px)`, left: `calc(50% - ${d / 2}px)`,
              background: "#160d09",
              border: `1px solid ${i === 0 ? "#3a2014" : "#5c2a17"}`,
            }} />
          ))}
          <TbShoe size={130} color="#f5f5f4" style={{ position: "relative", transform: "rotate(-8deg)" }} />
        </div>
      </section>

      {/* Brand strip */}
      <section style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 0", borderTop: "1px solid var(--border-soft)", borderBottom: "1px solid var(--border-soft)" }}>
        <div style={{ display: "flex", gap: 36, fontSize: 13, fontWeight: 600, letterSpacing: "0.05em", color: "var(--text-dim)" }}>
          {BRANDS.map((b) => <span key={b}>{b.toUpperCase()}</span>)}
        </div>
        <Link to="/shop" className="muted" style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
          View all brands <TbArrowRight size={14} />
        </Link>
      </section>

      {/* Trending */}
      <section style={{ padding: "48px 0" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 20 }}>
          <h2 className="section-title">Trending now</h2>
          <Link to="/shop" className="muted" style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 4 }}>
            View all <TbArrowRight size={14} />
          </Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {TRENDING.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Trust badges */}
      <section className="card" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", marginBottom: 56 }}>
        {TRUST.map((t, i) => (
          <div key={t.title} style={{ padding: 24, display: "flex", flexDirection: "column", gap: 8, borderLeft: i > 0 ? "1px solid var(--border-soft)" : "none" }}>
            <t.icon size={20} color="var(--accent)" />
            <span style={{ fontSize: 14, fontWeight: 600 }}>{t.title}</span>
            <span className="muted" style={{ fontSize: 13 }}>{t.desc}</span>
          </div>
        ))}
      </section>
    </div>
  );
}
