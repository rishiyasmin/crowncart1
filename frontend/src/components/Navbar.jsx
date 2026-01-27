import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCart } from "../utils/cart";

export default function Navbar() {
  const [cartQty, setCartQty] = useState(0);
  const [search, setSearch] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Load cart count instantly
  const loadCartCount = () => {
    const cart = getCart();
    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    setCartQty(total);
  };

  useEffect(() => {
    loadCartCount();

    const handleCartUpdate = () => loadCartCount();
    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, []);

  const isActive = (path) => location.pathname === path;

  // ✅ search submit
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${search}`);
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.inner}>
        {/* ✅ Logo */}
        <Link to="/" style={styles.logoBox}>
          <img src="/logo.png" alt="logo" style={styles.logoImg} />
          <span style={styles.logoText}>CrownCart</span>
        </Link>

        {/* ✅ Search Bar */}
        <form onSubmit={handleSearch} style={styles.searchBox}>
          <input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
          <button style={styles.searchBtn}>Search</button>
        </form>

        {/* ✅ Links */}
        <div style={styles.links}>
          <Link to="/" style={isActive("/") ? styles.activeLink : styles.link}>
            Home
          </Link>

          <Link
            to="/cart"
            style={isActive("/cart") ? styles.activeLink : styles.link}
          >
            Cart 🛒 <span style={styles.badge}>{cartQty}</span>
          </Link>

          <Link
            to="/login"
            style={isActive("/login") ? styles.activeLink : styles.link}
          >
            Login
          </Link>

          <Link
            to="/signup"
            style={isActive("/signup") ? styles.activeLink : styles.link}
          >
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    background: "linear-gradient(90deg, #0f172a, #1e3a8a)",
    padding: "14px 0",
    boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },

  inner: {
    width: "92%",
    maxWidth: "1200px",
    margin: "auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
  },

  logoBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    textDecoration: "none",
  },

  logoImg: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    objectFit: "cover",
    background: "white",
    padding: "4px",
  },

  logoText: {
    color: "#ffd700",
    fontWeight: "900",
    fontSize: "22px",
  },

  searchBox: {
    display: "flex",
    alignItems: "center",
    background: "rgba(255,255,255,0.12)",
    borderRadius: "14px",
    overflow: "hidden",
    flex: 1,
    maxWidth: "420px",
  },

  searchInput: {
    flex: 1,
    padding: "10px 14px",
    border: "none",
    outline: "none",
    background: "transparent",
    color: "white",
    fontSize: "14px",
  },

  searchBtn: {
    padding: "10px 16px",
    border: "none",
    background: "#facc15",
    fontWeight: "800",
    cursor: "pointer",
  },

  links: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
  },

  link: {
    color: "white",
    padding: "8px 12px",
    borderRadius: "12px",
    textDecoration: "none",
    fontWeight: "700",
  },

  activeLink: {
    color: "white",
    background: "rgba(255,255,255,0.18)",
    padding: "8px 12px",
    borderRadius: "12px",
    textDecoration: "none",
    fontWeight: "700",
  },

  badge: {
    background: "#ffd700",
    color: "#111",
    padding: "2px 9px",
    borderRadius: "18px",
    fontWeight: "900",
    marginLeft: "5px",
    fontSize: "13px",
  },
};
