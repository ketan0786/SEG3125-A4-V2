import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { TbHeart, TbHeartFilled, TbStarFilled, TbStarHalfFilled, TbShieldCheck, TbTruck } from "react-icons/tb";
import ProductImage from "../components/ProductImage";
import ProductCard from "../components/ProductCard";
import { getProduct, relatedProducts } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProduct(id);
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState(null);
  const [tab, setTab] = useState("reviews");
  const [added, setAdded] = useState(false);

  if (!product) {
    return <div className="container" style={{ padding: 64 }}>Product not found. <Link to="/shop">Back to shop</Link></div>;
  }

  const allSizes = [8, 8.5, 9, 9.5, 10, 10.5];
  const wishlisted = isWishlisted(product.id);

  function handleAddToCart() {
    if (!selectedSize) return;
    addToCart(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="container" style={{ padding: "32px 32px 64px" }}>
      <div className="muted" style={{ fontSize: 13, marginBottom: 20 }}>Home / Shop / {product.name}</div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
        {/* Gallery */}
        <div>
          <div className="card" style={{ height: 380, position: "relative", overflow: "hidden" }}>
            {product.badge && (
              <span style={{ position: "absolute", top: 14, left: 14, zIndex: 1, background: "var(--accent-soft-bg)", color: "var(--accent-soft)", fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 999 }}>
                {product.badge}
              </span>
            )}
            <ProductImage accent={product.accent} size={140} />
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="card" style={{ width: 64, height: 64, border: i === 0 ? "2px solid var(--accent)" : undefined, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ProductImage accent={product.accent} size={28} rotate={-8 + i * 6} />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <span className="kicker">{product.brand.toUpperCase()}{product.brand !== "Jordan" ? "" : " · JORDAN"}</span>
          <h1 style={{ fontSize: 26, fontWeight: 700, margin: "10px 0 4px" }}>{product.name}</h1>
          <p className="muted" style={{ fontSize: 14, marginBottom: 12 }}>{product.colorway}</p>

          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
            {Array.from({ length: Math.floor(product.rating) }).map((_, i) => <TbStarFilled key={i} size={15} color="var(--accent)" />)}
            {product.rating % 1 >= 0.5 && <TbStarHalfFilled size={15} color="var(--accent)" />}
            <span className="muted" style={{ fontSize: 13 }}>{product.rating} ({product.reviews} reviews)</span>
          </div>

          <div style={{ fontSize: 24, fontWeight: 600, color: "var(--accent)", marginBottom: 18 }}>${product.price}</div>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--text-muted)", marginBottom: 24 }}>{product.description}</p>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <h3 style={{ fontSize: 13, fontWeight: 600 }}>Size (US)</h3>
            <a className="muted" style={{ fontSize: 12, textDecoration: "underline", cursor: "pointer" }}>Size guide</a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8, marginBottom: 22 }}>
            {allSizes.map((s) => {
              const oos = product.outOfStock?.includes(s);
              return (
                <button key={s} disabled={oos} onClick={() => setSelectedSize(s)}
                  style={{
                    padding: "10px 0", borderRadius: 6, fontSize: 13, border: "1px solid var(--border)",
                    background: selectedSize === s ? "var(--accent)" : "var(--bg-elevated)",
                    color: oos ? "var(--text-dim)" : selectedSize === s ? "#0a0a0a" : "var(--text)",
                    textDecoration: oos ? "line-through" : "none", opacity: oos ? 0.5 : 1,
                    cursor: oos ? "not-allowed" : "pointer",
                  }}>{s}</button>
              );
            })}
          </div>

          <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
            <button className="btn btn-primary" style={{ flex: 1 }} disabled={!selectedSize} onClick={handleAddToCart}>
              {added ? "Added ✓" : `Add to cart · $${product.price}`}
            </button>
            <button className="btn-icon" onClick={() => toggleWishlist(product.id)} aria-label="Wishlist">
              {wishlisted ? <TbHeartFilled size={18} color="var(--accent)" /> : <TbHeart size={18} />}
            </button>
          </div>
          {!selectedSize && <p className="muted" style={{ fontSize: 12, marginTop: -8, marginBottom: 16 }}>Select a size to continue.</p>}

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
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
      <div style={{ marginTop: 56 }}>
        <div style={{ display: "flex", gap: 28, borderBottom: "1px solid var(--border-soft)", marginBottom: 20 }}>
          {["reviews", "shipping"].map((t) => (
            <button key={t} onClick={() => setTab(t)}
              style={{
                background: "none", border: "none", padding: "0 0 12px", fontSize: 14, fontWeight: 500,
                color: tab === t ? "var(--text)" : "var(--text-dim)",
                borderBottom: tab === t ? "2px solid var(--accent)" : "2px solid transparent",
              }}>
              {t === "reviews" ? `Reviews (${product.reviews})` : "Shipping & returns"}
            </button>
          ))}
        </div>
        {tab === "reviews" ? (
          <div className="card" style={{ padding: 20, maxWidth: 480 }}>
            <div style={{ display: "flex", gap: 2, marginBottom: 8 }}>
              {Array.from({ length: 5 }).map((_, i) => <TbStarFilled key={i} size={13} color="var(--accent)" />)}
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 8 }}>
              "Exactly as described, box was pristine and the pair arrived faster than expected. Authentication tag made me trust the purchase."
            </p>
            <span className="muted" style={{ fontSize: 12 }}>Marcus T. · Verified buyer</span>
          </div>
        ) : (
          <p className="muted" style={{ fontSize: 14, maxWidth: 480, lineHeight: 1.6 }}>
            Free standard shipping on orders over $100. Express delivery available at checkout. 14-day returns on
            unworn pairs in original packaging.
          </p>
        )}
      </div>

      {/* Related */}
      <div style={{ marginTop: 56 }}>
        <h2 className="section-title" style={{ marginBottom: 18 }}>You might also like</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {relatedProducts(product).map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  );
}
