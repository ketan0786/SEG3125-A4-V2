// Product catalog for KickVerse — demo data for the faceted search prototype.
let _id = 1;
const nid = () => _id++;

export const PRODUCTS = [
  {
    id: nid(), name: "Air Jordan 1 Retro High OG", brand: "Jordan", colorway: "Bred Toe",
    price: 170, category: "Basketball", condition: "Deadstock", badge: "Just dropped",
    rating: 4.6, reviews: 212, accent: "#d9462b",
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 12], outOfStock: [10.5],
    colors: ["#1a1a1a", "#c0392b", "#f5f5f4"],
    description: "The shoe that started it all. Premium leather upper, Air-Sole cushioning, and the colorway that made history.",
  },
  {
    id: nid(), name: "Air Jordan 4 Retro", brand: "Jordan", colorway: "Fear",
    price: 210, category: "Basketball", condition: "Deadstock", badge: "Trending",
    rating: 4.8, reviews: 341, accent: "#2c2c2c",
    sizes: [8, 9, 9.5, 10, 10.5, 11], outOfStock: [],
    colors: ["#1a1a1a", "#6c6c69"],
    description: "Suede and mesh paneling with visible Air cushioning. A grail-tier silhouette in a stealthy colorway.",
  },
  {
    id: nid(), name: "New Balance 550", brand: "New Balance", colorway: "White / Grey",
    price: 120, category: "Lifestyle", condition: "New", badge: null,
    rating: 4.4, reviews: 98, accent: "#9aa0a6",
    sizes: [7, 8, 9, 10, 11, 12], outOfStock: [],
    colors: ["#f5f5f4", "#9aa0a6", "#1a1a1a"],
    description: "Retro basketball styling reborn as an everyday lifestyle staple. Clean leather upper, cushy midsole.",
  },
  {
    id: nid(), name: "Yeezy Slide", brand: "Adidas", colorway: "Pure",
    price: 75, category: "Slides", condition: "New", badge: null,
    rating: 4.2, reviews: 156, accent: "#c9a876",
    sizes: [7, 8, 9, 10, 11], outOfStock: [],
    colors: ["#c9a876", "#1a1a1a"],
    description: "Molded EVA foam slide with a soft footbed. Minimal, lightweight, made for off-duty days.",
  },
  {
    id: nid(), name: "Air Max 90", brand: "Nike", colorway: "Infrared",
    price: 160, category: "Lifestyle", condition: "New", badge: null,
    rating: 4.5, reviews: 274, accent: "#e2572b",
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11], outOfStock: [],
    colors: ["#f5f5f4", "#e2572b", "#1a1a1a"],
    description: "The icon that defined visible Air. Waffle outsole, mixed leather and mesh, unmistakable silhouette.",
  },
  {
    id: nid(), name: "Dunk Low", brand: "Nike", colorway: "Panda",
    price: 110, category: "Lifestyle", condition: "New", badge: null,
    rating: 4.7, reviews: 503, accent: "#1a1a1a",
    sizes: [7, 8, 9, 9.5, 10, 11, 12], outOfStock: [],
    colors: ["#1a1a1a", "#f5f5f4"],
    description: "Low-profile hoops classic in a clean two-tone colorway. Leather upper, perforated toe box.",
  },
  {
    id: nid(), name: "React Infinity Run", brand: "Nike", colorway: "Trending",
    price: 159, category: "Running", condition: "New", badge: "Trending",
    rating: 4.3, reviews: 87, accent: "#3a6ea5",
    sizes: [8, 9, 10, 10.5, 11], outOfStock: [],
    colors: ["#3a6ea5", "#1a1a1a"],
    description: "Engineered to help reduce injury, with a wide stable base and a plush React foam ride.",
  },
  {
    id: nid(), name: "Pegasus 40", brand: "Nike", colorway: "Volt",
    price: 130, category: "Running", condition: "New", badge: null,
    rating: 4.5, reviews: 162, accent: "#c7e02c",
    sizes: [8, 8.5, 9, 10, 11, 12], outOfStock: [],
    colors: ["#c7e02c", "#1a1a1a"],
    description: "A responsive daily trainer tuned for speed, with Zoom Air units front and back.",
  },
  {
    id: nid(), name: "Ultraboost Light", brand: "Adidas", colorway: "Core Black",
    price: 190, category: "Running", condition: "New", badge: null,
    rating: 4.4, reviews: 119, accent: "#1a1a1a",
    sizes: [8, 9, 9.5, 10, 11], outOfStock: [],
    colors: ["#1a1a1a", "#f5f5f4"],
    description: "20% lighter Boost midsole for the most energy return yet. Primeknit+ upper hugs the foot.",
  },
  {
    id: nid(), name: "Gel-Kayano 14", brand: "Asics", colorway: "Cream Blue",
    price: 150, category: "Running", condition: "New", badge: "Just dropped",
    rating: 4.1, reviews: 64, accent: "#a9c9d6",
    sizes: [7, 8, 9, 10], outOfStock: [],
    colors: ["#a9c9d6", "#f5f5f4"],
    description: "Y2K running silhouette revived. GEL cushioning underfoot with a chunky retro-tech look.",
  },
  {
    id: nid(), name: "Air Force 1 Low", brand: "Nike", colorway: "Triple White",
    price: 115, category: "Lifestyle", condition: "New", badge: null,
    rating: 4.8, reviews: 612, accent: "#f5f5f4",
    sizes: [7, 8, 8.5, 9, 9.5, 10, 11, 12], outOfStock: [],
    colors: ["#f5f5f4"],
    description: "The blueprint. All-leather upper, Air-Sole unit, and a perfect-white finish that goes with everything.",
  },
  {
    id: nid(), name: "Samba OG", brand: "Adidas", colorway: "Cloud White",
    price: 100, category: "Lifestyle", condition: "New", badge: "Trending",
    rating: 4.6, reviews: 388, accent: "#2e6e3e",
    sizes: [7, 8, 9, 9.5, 10, 11], outOfStock: [],
    colors: ["#f5f5f4", "#2e6e3e"],
    description: "Originally built for indoor football, now a street style staple. Suede overlays, gum sole.",
  },
  {
    id: nid(), name: "990v6", brand: "New Balance", colorway: "Grey",
    price: 220, category: "Lifestyle", condition: "New", badge: null,
    rating: 4.3, reviews: 71, accent: "#9aa0a6",
    sizes: [8, 9, 10, 10.5, 11, 12], outOfStock: [],
    colors: ["#9aa0a6"],
    description: "Made in USA. The dad-shoe icon refined again with ENCAP cushioning and pigskin suede.",
  },
  {
    id: nid(), name: "Air Jordan 11 Retro", brand: "Jordan", colorway: "Bred",
    price: 230, category: "Basketball", condition: "Used – like new", badge: null,
    rating: 4.9, reviews: 445, accent: "#1a1a1a",
    sizes: [9, 9.5, 10, 10.5, 11], outOfStock: [],
    colors: ["#1a1a1a", "#c0392b"],
    description: "Patent leather mudguard, full-length Air cushioning. Worn once, inspected and verified authentic.",
  },
  {
    id: nid(), name: "Gel-1130", brand: "Asics", colorway: "Black Volt",
    price: 125, category: "Lifestyle", condition: "New", badge: null,
    rating: 4.0, reviews: 53, accent: "#c7e02c",
    sizes: [7, 8, 9, 10, 11], outOfStock: [],
    colors: ["#1a1a1a", "#c7e02c"],
    description: "Retro running DNA with a modern gorpcore edge. GEL cushioning, mesh and synthetic upper.",
  },
  {
    id: nid(), name: "Adilette Slide", brand: "Adidas", colorway: "Black White",
    price: 40, category: "Slides", condition: "New", badge: null,
    rating: 4.1, reviews: 233, accent: "#1a1a1a",
    sizes: [7, 8, 9, 10, 11, 12], outOfStock: [],
    colors: ["#1a1a1a", "#f5f5f4"],
    description: "The poolside essential. Adjustable comfort strap, soft cushioned footbed.",
  },
  {
    id: nid(), name: "Air Jordan 3 Retro", brand: "Jordan", colorway: "White Cement",
    price: 200, category: "Basketball", condition: "New", badge: null,
    rating: 4.7, reviews: 198, accent: "#9aa0a6",
    sizes: [8, 9, 9.5, 10, 11, 12], outOfStock: [],
    colors: ["#f5f5f4", "#9aa0a6"],
    description: "Elephant print overlays, visible Air heel unit — the silhouette that almost ended MJ's line.",
  },
];

export const BRANDS = ["Nike", "Jordan", "Adidas", "New Balance", "Asics"];
export const SIZES = [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12];
export const CATEGORIES = ["Running", "Basketball", "Lifestyle", "Slides"];
export const CONDITIONS = ["New", "Deadstock", "Used – like new"];
export const SWATCHES = [
  { name: "Black", hex: "#1a1a1a" },
  { name: "Off-white", hex: "#f5f5f4" },
  { name: "Orange", hex: "#e2572b" },
  { name: "Blue", hex: "#3a6ea5" },
  { name: "Tan", hex: "#c9a876" },
  { name: "Green", hex: "#2e6e3e" },
];

export function getProduct(id) {
  return PRODUCTS.find((p) => String(p.id) === String(id));
}

export function relatedProducts(product, count = 4) {
  return PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category)
    .concat(PRODUCTS.filter((p) => p.id !== product.id && p.category !== product.category))
    .slice(0, count);
}
