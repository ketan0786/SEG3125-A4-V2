import { Link } from "react-router-dom";
import { TbShieldCheck, TbTruck, TbPackage, TbLock, TbArrowRight, TbFlame } from "react-icons/tb";
import ProductCard from "../components/ProductCard";
import ProductImage from "../components/ProductImage";
import Reveal from "../components/Reveal";
import { PRODUCTS, BRANDS } from "../data/products";

const TRENDING = PRODUCTS.slice(0, 4);
const HERO_PRODUCT = PRODUCTS[0];

const TRUST = [
  { icon: TbShieldCheck, title: "100% authentic", desc: "Every pair is verified by our experts." },
  { icon: TbTruck, title: "Fast shipping", desc: "Express shipping on all orders." },
  { icon: TbPackage, title: "Easy returns", desc: "14-day return policy guaranteed." },
  { icon: TbLock, title: "Secure payments", desc: "Your info is safe with us." },
];

const MARQUEE_ITEMS = [...BRANDS, ...BRANDS];

export default function Home() {
  return (
    <div style={{ overflow: "hidden" }}>
      <div className="container" style={{ padding: "56px 32px 0" }}>
        <section className="hero-section" style={{ display: "flex", alignItems: "center", gap: 48, paddingBottom: 64 }}>
          <div className="hero-text" style={{ flex: 1, maxWidth: 560 }}>
            <span className="kicker kicker-line fade-up">Deadstock · Drops weekly</span>
            <h1 className="display-xl" style={{ margin: "18px 0 20px" }}>
              <span className="reveal-line"><span style={{ animationDelay: "0.05s" }}>Found in</span></span>
              <span className="reveal-line"><span style={{ animationDelay: "0.15s" }}>the dark.</span></span>
              <span className="reveal-line"><span className="accent-word" style={{ animationDelay: "0.25s" }}>Worth the light.</span></span>
            </h1>
            <p className="muted fade-up" style={{ fontSize: 15, marginBottom: 28, animationDelay: "0.35s" }}>
              Every pair authenticated before it ships.
            </p>
            <div className="fade-up" style={{ display: "flex", gap: 12, animationDelay: "0.45s" }}>
              <Link to="/shop" className="btn btn-primary">Shop the drop <TbArrowRight size={16} /></Link>
              <Link to="/shop?badge=Just%20dropped" className="btn btn-secondary">Just dropped</Link>
            </div>
          </div>
          <Link
            to={`/product/${HERO_PRODUCT.id}`}
            className="fade-up hero-image-link"
            style={{
              flex: 1, display: "flex", justifyContent: "center", position: "relative", height: 300,
              animationDelay: "0.2s",
            }}
          >
            {[230, 195].map((d, i) => (
              <div key={d} className={i === 0 ? "ring-pulse" : "ring-pulse-delay"} style={{
                position: "absolute", width: d, height: d, borderRadius: "50%",
                top: `calc(50% - ${d / 2}px)`, left: `calc(50% - ${d / 2}px)`,
                background: "#160d09",
                border: `1px solid ${i === 0 ? "#3a2014" : "#5c2a17"}`,
              }} />
            ))}
            <div
              className="card lift-card float-slow"
              style={{
                position: "relative", width: 290, height: 290, borderRadius: "50%", overflow: "hidden",
                boxShadow: "0 30px 64px -20px rgba(226, 87, 43, 0.25), 0 24px 56px -20px rgba(0,0,0,0.6)",
              }}
            >
              <ProductImage image={HERO_PRODUCT.image} accent={HERO_PRODUCT.accent} size={120} zoom={1.15} />
            </div>
          </Link>
        </section>
      </div>

      <section className="marquee" style={{ borderTop: "1px solid var(--border-soft)", borderBottom: "1px solid var(--border-soft)", padding: "20px 0" }}>
        <div className="marquee-track">
          {MARQUEE_ITEMS.map((b, i) => (
            <Link key={`${b}-${i}`} to={`/shop?brand=${encodeURIComponent(b)}`} className="marquee-item">
              {b.toUpperCase()} <span className="marquee-dot">●</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="container" style={{ padding: "0 32px" }}>
        <section style={{ padding: "56px 0 48px" }}>
          <Reveal style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 22 }}>
            <h2 className="section-title">Trending now</h2>
            <Link to="/shop" className="muted" style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 4 }}>
              View all <TbArrowRight size={14} />
            </Link>
          </Reveal>
          <div className="grid-products" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {TRENDING.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.08}>
                <ProductCard product={p} index={0} />
              </Reveal>
            ))}
          </div>
        </section>

        <Reveal>
          <section
            className="card promo-card"
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24,
              padding: "36px 40px", marginBottom: 56,
              background: "linear-gradient(120deg, #1c0f08 0%, #241310 55%, #0d0d0d 100%)",
              border: "1px solid #3a2014",
            }}
          >
            <div style={{ maxWidth: 520 }}>
              <span className="kicker kicker-line" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <TbFlame size={14} /> Limited time
              </span>
              <h2 className="display-xl" style={{ fontSize: "clamp(26px, 3.6vw, 40px)", margin: "12px 0 10px" }}>
                Heat under <span className="accent-word">$140</span>. Don't sleep on it!
              </h2>
              <p className="muted" style={{ fontSize: 14, margin: 0 }}>
                Grails move fast — once a pair sells through, it's gone for good.
              </p>
            </div>
            <Link to="/shop?maxPrice=140" className="btn btn-primary" style={{ padding: "15px 28px", fontSize: 15 }}>
              Shop the sale <TbArrowRight size={16} />
            </Link>
          </section>
        </Reveal>

        <Reveal>
          <section className="card trust-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", marginBottom: 56 }}>
            {TRUST.map((t, i) => (
              <div key={t.title} className="trust-grid-item" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 8, borderLeft: i > 0 ? "1px solid var(--border-soft)" : "none" }}>
                <t.icon size={20} color="var(--accent)" />
                <span style={{ fontSize: 14, fontWeight: 600 }}>{t.title}</span>
                <span className="muted" style={{ fontSize: 13 }}>{t.desc}</span>
              </div>
            ))}
          </section>
        </Reveal>
      </div>
    </div>
  );
}
