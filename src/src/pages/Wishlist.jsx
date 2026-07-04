import { Link } from "react-router-dom";
import { TbShoppingBag, TbTrash } from "react-icons/tb";
import ProductImage from "../components/ProductImage";
import { PRODUCTS } from "../data/products";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

export default function Wishlist() {
  const { ids, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const saved = PRODUCTS.filter((p) => ids.includes(p.id));

  return (
    <div className="container" style={{ padding: "32px 32px 64px", maxWidth: 900 }}>
      <h1 className="section-title" style={{ marginBottom: 4 }}>Wishlist</h1>
      <p className="muted" style={{ fontSize: 13, marginBottom: 24 }}>{saved.length} saved pairs</p>

      {saved.length === 0 ? (
        <div style={{ textAlign: "center", padding: 64 }}>
          <p className="muted" style={{ marginBottom: 16 }}>Nothing saved yet — tap the heart on any pair to keep it here.</p>
          <Link to="/shop" className="btn btn-primary">Browse sneakers</Link>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {saved.map((p) => (
            <div key={p.id} className="card" style={{ display: "flex", alignItems: "center", gap: 16, padding: 16 }}>
              <Link to={`/product/${p.id}`} style={{ width: 64, height: 64, borderRadius: 8, overflow: "hidden", flexShrink: 0 }}>
                <ProductImage accent={p.accent} size={30} />
              </Link>
              <Link to={`/product/${p.id}`} style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{p.name}</div>
                <div className="muted" style={{ fontSize: 12 }}>{p.colorway}</div>
              </Link>
              <span style={{ color: "var(--accent)", fontWeight: 500, fontSize: 14 }}>${p.price}</span>
              <button className="btn-icon" onClick={() => addToCart(p, p.sizes[0])} aria-label="Add to cart">
                <TbShoppingBag size={16} />
              </button>
              <button className="btn-icon" onClick={() => toggleWishlist(p.id)} aria-label="Remove">
                <TbTrash size={15} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
