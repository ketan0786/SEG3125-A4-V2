import { Link, useNavigate } from "react-router-dom";
import { TbTrash, TbMinus, TbPlus } from "react-icons/tb";
import ProductImage from "../components/ProductImage";
import StepTracker from "../components/StepTracker";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, removeFromCart, updateQty, subtotal, shipping, total } = useCart();
  const navigate = useNavigate();

  return (
    <div className="container" style={{ padding: "0 32px 64px", maxWidth: 900 }}>
      <StepTracker current={1} />

      {items.length === 0 ? (
        <div style={{ textAlign: "center", padding: 64 }}>
          <p className="muted" style={{ marginBottom: 16 }}>Your cart is empty.</p>
          <Link to="/shop" className="btn btn-primary">Browse sneakers</Link>
        </div>
      ) : (
        <>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {items.map((item) => (
              <div key={`${item.id}-${item.size}`} className="card" style={{ display: "flex", alignItems: "center", gap: 16, padding: 16 }}>
                <div style={{ width: 64, height: 64, borderRadius: 8, overflow: "hidden", flexShrink: 0 }}>
                  <ProductImage accent={item.accent} size={30} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{item.name}</div>
                  <div className="muted" style={{ fontSize: 12 }}>{item.colorway} · Size {item.size}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <button className="btn-icon" style={{ width: 30, height: 30 }} onClick={() => updateQty(item.id, item.size, item.qty - 1)}><TbMinus size={13} /></button>
                  <span style={{ width: 20, textAlign: "center", fontSize: 13 }}>{item.qty}</span>
                  <button className="btn-icon" style={{ width: 30, height: 30 }} onClick={() => updateQty(item.id, item.size, item.qty + 1)}><TbPlus size={13} /></button>
                </div>
                <div style={{ width: 70, textAlign: "right", color: "var(--accent)", fontWeight: 500, fontSize: 14 }}>${item.price * item.qty}</div>
                <button className="btn-icon" style={{ width: 34, height: 34 }} onClick={() => removeFromCart(item.id, item.size)} aria-label="Remove"><TbTrash size={15} /></button>
              </div>
            ))}
          </div>

          <div className="card" style={{ padding: 20, marginTop: 24, maxWidth: 360, marginLeft: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 8 }}>
              <span className="muted">Subtotal</span><span>${subtotal}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 12 }}>
              <span className="muted">Shipping</span><span>${shipping}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 600, borderTop: "1px solid var(--border-soft)", paddingTop: 12 }}>
              <span>Total</span><span style={{ color: "var(--accent)" }}>${total}</span>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
            <Link to="/shop" className="btn btn-secondary">← Continue shopping</Link>
            <button className="btn btn-primary" onClick={() => navigate("/checkout/shipping")}>Continue to checkout →</button>
          </div>
        </>
      )}
    </div>
  );
}
