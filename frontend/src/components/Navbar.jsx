import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCart } from "../utils/cart";

export default function Navbar() {
  const [cartQty, setCartQty] = useState(0);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Load cart count instantly
  const loadCartCount = () => {
    const cart = getCart();
    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    setCartQty(total);
  };

  // ✅ Load user from localStorage
  const loadUser = () => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    setUser(savedUser);
  };

  useEffect(() => {
    loadCartCount();
    loadUser();

    const handleCartUpdate = () => loadCartCount();
    window.addEventListener("cartUpdated", handleCartUpdate);

    window.addEventListener("authUpdated", loadUser);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
      window.removeEventListener("authUpdated", loadUser);
    };
  }, []);

  const isActive = (path) => location.pathname === path;

  // ✅ search submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/?search=${search}`);
  };

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("authUpdated"));
    navigate("/login");
  };

  const firstLetter = user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <nav style={styles.nav}>
      <div style={styles.inner}>
        {/* ✅ Logo */}
        <Link to="/" style={styles.logoBox}>
          <div style={styles.logoCircle}>
            <img src="/logo.png" alt="logo" style={styles.logoImg} />
          </div>

          <div>
            <span style={styles.logoText}>CrownCart</span>
            <div style={styles.logoTag}>Shop Smart • Shop Fast</div>
          </div>
        </Link>

        {/* ✅ Search Bar */}
        <form onSubmit={handleSearch} style={styles.searchBox}>
          <span style={styles.searchIcon}>🔎</span>
          <input
            placeholder="Search products, brands, offers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
          <button style={styles.searchBtn} type="submit">
            Search
          </button>
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
            Cart{" "}
            <span style={styles.cartIcon}>
              🛒 <span style={styles.badge}>{cartQty}</span>
            </span>
          </Link>

          {/* ✅ User Section */}
          {user ? (
            <div style={styles.userBox}>
              <Link
                to="/profile"
                style={
                  isActive("/profile") ? styles.activeProfile : styles.profile
                }
              >
                <span style={styles.avatar}>{firstLetter}</span>
                <span style={styles.userName}>{user.name}</span>
              </Link>

              <button onClick={handleLogout} style={styles.logoutBtn}>
                Logout
              </button>
            </div>
          ) : (
            <div style={styles.userBox}>
              <Link
                to="/login"
                style={isActive("/login") ? styles.activeLink : styles.link}
              >
                Login
              </Link>

              <Link
                to="/signup"
                style={isActive("/signup") ? styles.activeSignup : styles.signupBtn}
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

const styles = {
  /* ✅ Navbar background changed to lighter */
  nav: {
    background: "linear-gradient(90deg, #0f172a, #334155)",
    padding: "14px 0",
    position: "sticky",
    top: 0,
    zIndex: 100,
    boxShadow: "0 10px 25px rgba(0,0,0,0.18)",
  },

  inner: {
    width: "92%",
    maxWidth: "1250px",
    margin: "auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "22px",
  },

  /* ✅ Logo */
  logoBox: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    textDecoration: "none",
  },

  /* ✅ Logo circle now fully white */
  logoCircle: {
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    background: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
  },

  /* ✅ Bigger visible logo */
  logoImg: {
    width: "46px",
    height: "46px",
    borderRadius: "50%",
    objectFit: "cover",
  },

  /* ✅ Text visible on lighter navbar */
  logoText: {
    color: "white",
    fontWeight: "950",
    fontSize: "22px",
    letterSpacing: "0.5px",
  },

  logoTag: {
    color: "rgba(255,255,255,0.9)",
    fontSize: "12px",
    marginTop: "2px",
  },

  /* ✅ Search */
  searchBox: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "rgba(0,0,0,0.15)",
    borderRadius: "16px",
    padding: "6px 10px",
    overflow: "hidden",
    flex: 1,
    maxWidth: "520px",
    border: "1px solid rgba(255,255,255,0.25)",
  },

  searchIcon: {
    color: "rgba(255,255,255,0.9)",
    fontSize: "16px",
  },

  searchInput: {
    flex: 1,
    padding: "10px 6px",
    border: "none",
    outline: "none",
    background: "transparent",
    color: "white",
    fontSize: "14px",
  },

  searchBtn: {
    padding: "10px 18px",
    border: "none",
    borderRadius: "14px",
    background: "linear-gradient(90deg, #facc15, #f59e0b)",
    fontWeight: "900",
    cursor: "pointer",
    transition: "0.2s",
  },

  /* ✅ Links */
  links: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },

  link: {
    color: "white",
    padding: "9px 13px",
    borderRadius: "14px",
    textDecoration: "none",
    fontWeight: "750",
    transition: "0.2s",
    background: "transparent",
  },

  activeLink: {
    color: "white",
    background: "rgba(255,255,255,0.18)",
    padding: "9px 13px",
    borderRadius: "14px",
    textDecoration: "none",
    fontWeight: "850",
  },

  cartIcon: {
    marginLeft: "6px",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
  },

  badge: {
    background: "#ffd700",
    color: "#111",
    padding: "2px 9px",
    borderRadius: "18px",
    fontWeight: "950",
    fontSize: "12px",
  },

  /* ✅ Signup Button */
  signupBtn: {
    padding: "9px 14px",
    borderRadius: "14px",
    textDecoration: "none",
    fontWeight: "900",
    background: "linear-gradient(90deg, #9333ea, #2563eb)",
    color: "white",
  },

  activeSignup: {
    padding: "9px 14px",
    borderRadius: "14px",
    textDecoration: "none",
    fontWeight: "900",
    background: "linear-gradient(90deg, #7e22ce, #1d4ed8)",
    color: "white",
    boxShadow: "0 10px 20px rgba(0,0,0,0.22)",
  },

  /* ✅ User */
  userBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  profile: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "7px 12px",
    borderRadius: "16px",
    textDecoration: "none",
    background: "rgba(255,255,255,0.18)",
    border: "1px solid rgba(255,255,255,0.25)",
    color: "white",
    fontWeight: "900",
  },

  activeProfile: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "7px 12px",
    borderRadius: "16px",
    textDecoration: "none",
    background: "rgba(255,255,255,0.25)",
    border: "1px solid rgba(255,255,255,0.35)",
    color: "white",
    fontWeight: "900",
  },

  avatar: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    background: "linear-gradient(90deg, #9333ea, #2563eb)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "950",
    fontSize: "14px",
  },

  userName: {
    fontSize: "14px",
    fontWeight: "900",
  },

  logoutBtn: {
    border: "none",
    padding: "9px 14px",
    borderRadius: "14px",
    cursor: "pointer",
    background: "linear-gradient(90deg, #ef4444, #dc2626)",
    color: "white",
    fontWeight: "950",
    transition: "0.2s",
  },
};
