import { createContext, useContext, useMemo, useState } from "react";
import { useToast } from "./ToastContext";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const { showToast } = useToast();

  function addToCart(product, size, qty = 1) {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id && i.size === size);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id && i.size === size ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { id: product.id, name: product.name, colorway: product.colorway,
        price: product.price, accent: product.accent, image: product.image, size, qty }];
    });
    showToast(`Added ${product.name} (size ${size}) to your cart`, { action: { label: "View cart", to: "/cart" } });
  }

  function removeFromCart(id, size) {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
  }

  function updateQty(id, size, qty) {
    setItems((prev) =>
      prev.map((i) => (i.id === id && i.size === size ? { ...i, qty: Math.max(1, qty) } : i))
    );
  }

  function clearCart() {
    setItems([]);
  }

  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.qty, 0), [items]);
  const shipping = items.length === 0 ? 0 : 12;
  const total = subtotal + shipping;
  const count = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);

  const value = { items, addToCart, removeFromCart, updateQty, clearCart, subtotal, shipping, total, count };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
