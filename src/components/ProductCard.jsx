import { Link } from "react-router-dom";
import { TbHeart, TbHeartFilled, TbArrowRight } from "react-icons/tb";
import ProductImage from "./ProductImage";
import { useWishlist } from "../context/WishlistContext";

export default function ProductCard({ product, subtitle, index = 0 }) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  return (
    <div
      className="card lift-card fade-up"
      style={{ overflow: "hidden", display: "flex", flexDirection: "column", animationDelay: `${Math.min(index, 8) * 0.05}s` }}
    >
      <div style={{ position: "relative", height: 180 }}>
        {product.badge && (
          <span
            style={{
              position: "absolute", top: 10, left: 10, zIndex: 1,
              background: "var(--accent-soft-bg)", color: "var(--accent-soft)",
              fontSize: 11, fontWeight: 600, padding: "4px 9px", borderRadius: 999,
            }}
          >
            {product.badge}
          </span>
        )}
        <button
          className="btn-icon"
          onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
          style={{ position: "absolute", top: 8, right: 8, zIndex: 1, width: 34, height: 34, background: "rgba(10,10,10,0.6)" }}
          aria-label="Toggle wishlist"
        >
          {wishlisted ? <TbHeartFilled size={16} color="var(--accent)" /> : <TbHeart size={16} />}
        </button>
        <Link to={`/product/${product.id}`}>
          <ProductImage image={product.image} accent={product.accent} />
        </Link>
      </div>
      <Link to={`/product/${product.id}`} style={{ padding: "14px 14px 16px", display: "flex", flexDirection: "column", gap: 4 }}>
        <span style={{ fontSize: 13, fontWeight: 500 }}>{product.name}</span>
        <span style={{ fontSize: 11, color: "var(--text-dim)" }}>
          {product.colorway}{subtitle ? ` · ${subtitle}` : ""}
        </span>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: "var(--accent)" }}>${product.price}</span>
          <TbArrowRight size={15} color="var(--accent)" className="card-arrow" />
        </div>
      </Link>
    </div>
  );
}
