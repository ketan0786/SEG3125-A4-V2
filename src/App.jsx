import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import Help from "./pages/Help";
import Account from "./pages/Account";

export default function App() {
  const location = useLocation();
  const checkoutMode = location.pathname.startsWith("/checkout") || location.pathname.startsWith("/cart");

  return (
    <>
      <ScrollToTop />
      <Navbar checkout={checkoutMode} />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout/*" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/help" element={<Help />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </main>
      {!checkoutMode && <Footer />}
    </>
  );
}
