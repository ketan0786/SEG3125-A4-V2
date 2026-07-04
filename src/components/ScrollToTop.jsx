import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// React Router doesn't reset scroll position on navigation. Without this,
// clicking a link while scrolled down (e.g. a "You might also like" card at
// the bottom of a product page) lands you at the same scroll offset on the
// new page — so the hero/title/price above the fold change unnoticed, and it
// looks like nothing happened or the link didn't work.
export default function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return null;
}
