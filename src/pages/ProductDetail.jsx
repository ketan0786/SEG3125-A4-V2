import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { TbHeart, TbHeartFilled, TbStarFilled, TbStarHalfFilled, TbShieldCheck, TbTruck, TbX, TbAlertTriangle } from "react-icons/tb";
import ProductImage from "../components/ProductImage";
import ProductCard from "../components/ProductCard";
import { getProduct, relatedProducts } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

// "Recognition rather than recall" (Nielsen heuristic #6): surface recently
// viewed products instead of making the user remember what they already
// looked at and re-search for it.
const RECENTLY_VIEWED_KEY = "kickverse_recently_viewed";
const RECENTLY_VIEWED_MAX = 8;

function readRecentlyViewed() {
  try {
    const raw = localStorage.getItem(RECENTLY_VIEWED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function pushRecentlyViewed(id) {
  try {
    const prev = readRecentlyViewed().filter((pid) => pid !== id);
    const next = [id, ...prev].slice(0, RECENTLY_VIEWED_MAX);
    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(next));
    return next;
  } catch {
    return [];
  }
}

// Gallery views. Products with a `views` array get real alternate photos
// (honestly labelled). Products with a single photo fall back to truthful
// zoom levels of that same shot — no fake "heel/sole" labels for crops that
// don't actually show those angles.
function buildViews(product) {
  const alts = product.views ?? [];
  if (alts.length > 0) {
    return [
      { label: "Main", image: product.image, objectPosition: "center", zoom: 1 },
      ...alts.map((img, i) => ({ label: `View ${i + 2}`, image: img, objectPosition: "center", zoom: 1 })),
    ];
  }
  return [
    { label: "Full view", image: product.image, objectPosition: "center", zoom: 1 },
    { label: "Close-up", image: product.image, objectPosition: "center", zoom: 1.5 },
    { label: "Detail", image: product.image, objectPosition: "center", zoom: 2 },
  ];
}

const SIZE_CHART = [
  { us: 8, uk: 7, eu: 41, cm: 26 },
  { us: 8.5, uk: 7.5, eu: 42, cm: 26.5 },
  { us: 9, uk: 8, eu: 42.5, cm: 27 },
  { us: 9.5, uk: 8.5, eu: 43, cm: 27.5 },
  { us: 10, uk: 9, eu: 44, cm: 28 },
  { us: 10.5, uk: 9.5, eu: 44.5, cm: 28.5 },
];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProduct(id);
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState(null);
  const [tab, setTab] = useState("reviews");
  const [added, setAdded] = useState(false);
  const [activeView, setActiveView] = useState(0);
  const [sizeWarning, setSizeWarning] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [recentlyViewedIds, setRecentlyViewedIds] = useState([]);
  const VIEWS = product ? buildViews(product) : [];

  useEffect(() => {
    if (product) setRecentlyViewedIds(pushRecentlyViewed(product.id));
    setActiveView(0);
  }, [product?.id]);

  if (!product) {
    return <div className="container" style={{ padding: 64 }}>Product not found. <Link to="/shop">Back to shop</Link></div>;
  }

  const recentlyViewed = recentlyViewedIds
    .filter((pid) => pid !== product.id)
    .map((pid) => getProduct(pid))
    .filter(Boolean)
    .slice(0, 4);

  const allSizes = [8, 8.5, 9, 9.5, 10, 10.5];
  const wishlisted = isWishlisted(product.id);

  function handleAddToCart() {
    if (!selectedSize) {
      setSizeWarning(true);
      setTimeout(() => setSizeWarning(false), 1600);
      return;
    }
    addToCart(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  function selectSize(s) {
    setSelectedSize(s);
    setSizeWarning(false);
  }

  return (
    <div className="container fade-up" style={{ padding: "32px 32px 72px" }}>
      <div className="muted" style={{ fontSize: 13, marginBottom: 24 }}>
        <Link to="/" className="muted" style={{ opacity: 0.8 }}>Home</Link>
        <span style={{ margin: "0 6px" }}>/</span>
        <Link to="/shop" className="muted" style={{ opacity: 0.8 }}>Shop</Link>
        <span style={{ margin: "0 6px" }}>/</span>
        <span style={{ color: "var(--text)" }}>{product.name}</span>
      </div>

      <div className="pd-main-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56 }}>
        {/* Gallery */}
        <div>
          <div
            className="card"
            style={{
              height: 420, position: "relative", overflow: "hidden",
              boxShadow: "0 24px 48px -24px rgba(0,0,0,0.55)",
            }}
          >
            {product.badge && (
              <span style={{ position: "absolute", top: 16, left: 16, zIndex: 1, background: "var(--accent-soft-bg)", color: "var(--accent-soft)", fontSize: 12, fontWeight: 600, padding: "5px 11px", borderRadius: 999 }}>
                {product.badge}
              </span>
            )}
            <span style={{ position: "absolute", bottom: 16, right: 16, zIndex: 1, background: "rgba(10,10,10,0.55)", color: "var(--text-dim)", fontSize: 11, fontWeight: 500, padding: "4px 10px", borderRadius: 999 }}>
              {VIEWS[activeView].label}
            </span>
            <ProductImage
              key={activeView}
              image={VIEWS[activeView].image}
              accent={product.accent}
              size={140}
              objectPosition={VIEWS[activeView].objectPosition}
              zoom={VIEWS[activeView].zoom}
            />
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
            {VIEWS.map((v, i) => (
              <button
                key={v.label}
                onClick={() => setActiveView(i)}
                className="card"
                style={{
                  width: 72, height: 72, padding: 0, display: "flex", alignItems: "center", justifyContent: "center",
                  border: i === activeView ? "2px solid var(--accent)" : "1px solid var(--border-soft)",
                  opacity: i === activeView ? 1 : 0.75,
                  transition: "opacity 0.15s ease, border-color 0.15s ease, transform 0.1s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = i === activeView ? 1 : 0.75)}
                aria-label={"View: " + v.label}
              >
                <ProductImage image={v.image} accent={product.accent} size={26} objectPosition={v.objectPosition} zoom={v.zoom} />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <span className="kicker">{product.brand.toUpperCase()}</span>
          <h1 style={{ fontSize: 28, fontWeight: 700, margin: "10px 0 4px", letterSpacing: "-0.01em" }}>{product.name}</h1>
          <p className="muted" style={{ fontSize: 14, marginBottom: 14 }}>{product.colorway}</p>

          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
            {Array.from({ length: Math.floor(product.rating) }).map((_, i) => <TbStarFilled key={i} size={15} color="var(--accent)" />)}
            {product.rating % 1 >= 0.5 && <TbStarHalfFilled size={15} color="var(--accent)" />}
            <span className="muted" style={{ fontSize: 13 }}>{product.rating} ({product.reviews} reviews)</span>
          </div>

          <div style={{ fontSize: 26, fontWeight: 700, color: "var(--accent)", marginBottom: 20 }}>${product.price}</div>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text-muted)", marginBottom: 26 }}>{product.description}</p>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <h3 style={{ fontSize: 13, fontWeight: 600 }}>Size (US)</h3>
            <button
              onClick={() => setShowSizeGuide(true)}
              className="muted"
              style={{ fontSize: 12, textDecoration: "underline", cursor: "pointer", background: "none", border: "none", padding: 0 }}
            >
              Size guide
            </button>
          </div>
          <div
            className={"pd-size-grid" + (sizeWarning ? " shake-warn" : "")}
            style={{
              display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8, marginBottom: 10,
            
              padding: sizeWarning ? 8 : 0,
              border: sizeWarning ? "1px solid var(--accent-dark)" : "1px solid transparent",
              borderRadius: 8,
              transition: "border-color 0.2s ease",
            }}
          >
            {allSizes.map((s) => {
              const oos = product.outOfStock?.includes(s);
              return (
                <button key={s} disabled={oos} onClick={() => selectSize(s)}
                  style={{
                    padding: "10px 0", borderRadius: 6, fontSize: 13, fontWeight: 500,
                    border: selectedSize === s ? "1px solid var(--accent)" : "1px solid var(--border)",
                    background: selectedSize === s ? "var(--accent)" : "var(--bg-elevated)",
                    color: oos ? "var(--text-dim)" : selectedSize === s ? "#0a0a0a" : "var(--text)",
                    textDecoration: oos ? "line-through" : "none", opacity: oos ? 0.5 : 1,
                    cursor: oos ? "not-allowed" : "pointer",
                    transition: "background 0.12s ease, border-color 0.12s ease",
                  }}>{s}</button>
              );
            })}
          </div>
          <div style={{ minHeight: 22, marginBottom: 8 }}>
            {sizeWarning && (
              <p style={{ fontSize: 12, color: "var(--accent-dark)", display: "flex", alignItems: "center", gap: 6, margin: 0 }}>
                <TbAlertTriangle size={14} /> Please select a size before adding to cart.
              </p>
            )}
          </div>

          <div style={{ display: "flex", gap: 10, marginBottom: 18, marginTop: 8 }}>
            <button className={"btn btn-primary" + (added ? " btn-added" : "")} style={{ flex: 1 }} onClick={handleAddToCart}>
              {added ? "Added ✓" : "Add to cart · $" + product.price}
            </button>
            <button className="btn-icon" onClick={() => toggleWishlist(product.id)} aria-label="Wishlist">
              {wishlisted ? <TbHeartFilled size={18} color="var(--accent)" /> : <TbHeart size={18} />}
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            <span className="muted" style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>
              <TbShieldCheck size={15} color="var(--accent)" /> Verified authentic · inspected before shipping
            </span>
            <span className="muted" style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>
              <TbTruck size={15} color="var(--accent)" /> Arrives in 2–4 business days
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ marginTop: 60 }}>
        <div style={{ display: "flex", gap: 28, borderBottom: "1px solid var(--border-soft)", marginBottom: 20 }}>
          {["reviews", "shipping"].map((t) => (
            <button key={t} onClick={() => setTab(t)}
              style={{
                background: "none", border: "none", padding: "0 0 12px", fontSize: 14, fontWeight: 500,
                color: tab === t ? "var(--text)" : "var(--text-dim)",
                borderBottom: tab === t ? "2px solid var(--accent)" : "2px solid transparent",
                transition: "color 0.15s ease",
              }}>
              {t === "reviews" ? "Reviews (" + product.reviews + ")" : "Shipping & returns"}
            </button>
          ))}
        </div>
        {tab === "reviews" ? (
          <div key="reviews" className="card fade-up" style={{ padding: 22, maxWidth: 480 }}>
            <div style={{ display: "flex", gap: 2, marginBottom: 10 }}>
              {Array.from({ length: 5 }).map((_, i) => <TbStarFilled key={i} size={13} color="var(--accent)" />)}
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 10 }}>
              "Exactly as described, box was pristine and the pair arrived faster than expected. Authentication tag made me trust the purchase."
            </p>
            <span className="muted" style={{ fontSize: 12 }}>Marcus T. · Verified buyer</span>
          </div>
        ) : (
          <p key="shipping" className="muted fade-up" style={{ fontSize: 14, maxWidth: 480, lineHeight: 1.6 }}>
            Free standard shipping on orders over $100. Express delivery available at checkout. 14-day returns on
            unworn pairs in original packaging.
          </p>
        )}
      </div>

      {/* Related */}
      <div style={{ marginTop: 60 }}>
        <h2 className="section-title" style={{ marginBottom: 18 }}>You might also like</h2>
        <div className="grid-products" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {relatedProducts(product).map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </div>

      {/* Recently viewed — recognition rather than recall */}
      {recentlyViewed.length > 0 && (
        <div style={{ marginTop: 60 }}>
          <h2 className="section-title" style={{ marginBottom: 18 }}>Recently viewed</h2>
          <div className="grid-products" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {recentlyViewed.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      )}

      {/* Size guide modal */}
      {showSizeGuide && (
        <div
          className="modal-backdrop"
          onClick={() => setShowSizeGuide(false)}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)",
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: 20,
          }}
        >
          <div
            className="card modal-panel"
            onClick={(e) => e.stopPropagation()}
            style={{ width: "100%", maxWidth: 420, padding: 24, boxShadow: "0 24px 60px -20px rgba(0,0,0,0.7)" }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>Size guide</h3>
              <button className="btn-icon" style={{ width: 32, height: 32 }} onClick={() => setShowSizeGuide(false)} aria-label="Close">
                <TbX size={15} />
              </button>
            </div>
            <p className="muted" style={{ fontSize: 12, marginBottom: 16 }}>Men's sizing · measurements approximate</p>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-soft)" }}>
                  {["US", "UK", "EU", "CM"].map((h) => (
                    <th key={h} style={{ textAlign: "left", padding: "8px 4px", color: "var(--text-dim)", fontWeight: 600, fontSize: 12 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SIZE_CHART.map((row) => (
                  <tr
                    key={row.us}
                    style={{
                      borderBottom: "1px solid var(--border-soft)",
                      background: selectedSize === row.us ? "var(--accent-soft-bg)" : "transparent",
                    }}
                  >
                    <td style={{ padding: "8px 4px", fontWeight: selectedSize === row.us ? 700 : 400, color: selectedSize === row.us ? "var(--accent-soft)" : "var(--text)" }}>{row.us}</td>
                    <td style={{ padding: "8px 4px" }}>{row.uk}</td>
                    <td style={{ padding: "8px 4px" }}>{row.eu}</td>
                    <td style={{ padding: "8px 4px" }}>{row.cm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="muted" style={{ fontSize: 12, marginTop: 14, lineHeight: 1.6 }}>
              Between sizes? We recommend sizing up for a roomier fit, especially for retro silhouettes.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
