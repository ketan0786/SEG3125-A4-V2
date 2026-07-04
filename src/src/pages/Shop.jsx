import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TbX } from "react-icons/tb";
import ProductCard from "../components/ProductCard";
import { PRODUCTS, BRANDS, SIZES, CATEGORIES, CONDITIONS, SWATCHES } from "../data/products";

const SORTS = ["Newest", "Price: low to high", "Price: high to low", "Top rated"];

export default function Shop() {
  const [params] = useSearchParams();
  const initialQuery = params.get("q") || "";

  const [brands, setBrands] = useState([]);
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);
  const [maxPrice, setMaxPrice] = useState(500);
  const [category, setCategory] = useState(null);
  const [condition, setCondition] = useState(null);
  const [sort, setSort] = useState("Newest");
  const [query] = useState(initialQuery);

  function toggleBrand(b) {
    setBrands((prev) => (prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]));
  }

  function clearAll() {
    setBrands([]); setSize(null); setColor(null); setMaxPrice(500); setCategory(null); setCondition(null);
  }

  const brandCounts = useMemo(() => {
    const counts = {};
    BRANDS.forEach((b) => { counts[b] = PRODUCTS.filter((p) => p.brand === b).length; });
    return counts;
  }, []);

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      if (query && !`${p.name} ${p.brand} ${p.colorway}`.toLowerCase().includes(query.toLowerCase())) return false;
      if (brands.length && !brands.includes(p.brand)) return false;
      if (size && !p.sizes.includes(size)) return false;
      if (color && !p.colors.includes(color)) return false;
      if (p.price > maxPrice) return false;
      if (category && p.category !== category) return false;
      if (condition && p.condition !== condition) return false;
      return true;
    });
    if (sort === "Price: low to high") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "Price: high to low") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "Top rated") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [query, brands, size, color, maxPrice, category, condition, sort]);

  const chips = [
    ...brands.map((b) => ({ key: `brand-${b}`, label: b, clear: () => toggleBrand(b) })),
    ...(size ? [{ key: "size", label: `Size ${size}`, clear: () => setSize(null) }] : []),
    ...(maxPrice < 500 ? [{ key: "price", label: `Under $${maxPrice}`, clear: () => setMaxPrice(500) }] : []),
    ...(category ? [{ key: "cat", label: category, clear: () => setCategory(null) }] : []),
    ...(condition ? [{ key: "cond", label: condition, clear: () => setCondition(null) }] : []),
  ];

  return (
    <div className="container" style={{ padding: "32px 32px 80px" }}>
      <div className="muted" style={{ fontSize: 13, marginBottom: 16 }}>Home / Shop</div>

      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 8 }}>
        <div>
          <h1 className="section-title">All sneakers</h1>
          <span className="muted" style={{ fontSize: 13 }}>{filtered.length} results</span>
        </div>
        <select value={sort} onChange={(e) => setSort(e.target.value)}
          style={{ background: "var(--bg-elevated)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: 999, padding: "9px 16px", fontSize: 13 }}>
          {SORTS.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      {chips.length > 0 && (
        <div style={{ display: "flex", gap: 8, alignItems: "center", margin: "16px 0", flexWrap: "wrap" }}>
          {chips.map((c) => (
            <button key={c.key} onClick={c.clear} className="pill" style={{ border: "none" }}>
              {c.label} <TbX size={13} />
            </button>
          ))}
          <button onClick={clearAll} className="muted" style={{ background: "none", border: "none", fontSize: 13, textDecoration: "underline" }}>
            Clear all
          </button>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 32, marginTop: 16 }}>
        {/* Sidebar facets */}
        <aside style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div>
            <h3 style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Brand</h3>
            {BRANDS.map((b) => (
              <label key={b} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 13, padding: "5px 0", cursor: "pointer", color: brands.includes(b) ? "var(--accent)" : "var(--text)" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <input type="checkbox" checked={brands.includes(b)} onChange={() => toggleBrand(b)} />
                  {b}
                </span>
                <span className="muted">{brandCounts[b]}</span>
              </label>
            ))}
          </div>

          <div>
            <h3 style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Size (US)</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
              {[7, 8, 9, 10, 11, 12].map((s) => (
                <button key={s} onClick={() => setSize(size === s ? null : s)}
                  style={{
                    padding: "7px 0", borderRadius: 6, fontSize: 12, border: "1px solid var(--border)",
                    background: size === s ? "var(--accent)" : "var(--bg-elevated)",
                    color: size === s ? "#0a0a0a" : "var(--text)",
                  }}>{s}</button>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Color</h3>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {SWATCHES.map((s) => (
                <button key={s.hex} onClick={() => setColor(color === s.hex ? null : s.hex)} aria-label={s.name}
                  style={{
                    width: 26, height: 26, borderRadius: "50%", background: s.hex,
                    border: color === s.hex ? "2px solid var(--accent)" : "1px solid var(--border)",
                    boxShadow: color === s.hex ? "0 0 0 2px var(--bg)" : "none",
                  }} />
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Price range</h3>
            <input type="range" min={0} max={500} step={10} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} style={{ width: "100%" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }} className="muted">
              <span>$0</span><span>${maxPrice}</span><span>$500+</span>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Category</h3>
            {CATEGORIES.map((c) => (
              <div key={c} onClick={() => setCategory(category === c ? null : c)}
                style={{ fontSize: 13, padding: "5px 0", cursor: "pointer", color: category === c ? "var(--accent)" : "var(--text-dim)" }}>{c}</div>
            ))}
          </div>

          <div>
            <h3 style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Condition</h3>
            {CONDITIONS.map((c) => (
              <div key={c} onClick={() => setCondition(condition === c ? null : c)}
                style={{ fontSize: 13, padding: "5px 0", cursor: "pointer", color: condition === c ? "var(--accent)" : "var(--text-dim)" }}>{c}</div>
            ))}
          </div>
        </aside>

        {/* Results */}
        <div>
          {filtered.length === 0 ? (
            <div className="muted" style={{ padding: 48, textAlign: "center" }}>No sneakers match those filters.</div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} subtitle={size ? `Size ${size}` : null} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
