import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Left */}
        <div style={styles.col}>
          <h2 style={styles.logo}>👑 CrownCart</h2>
          <p style={styles.text}>
            Shop Groceries, Electronics & Accessories with the best deals.
          </p>
        </div>

        {/* Middle */}
        <div style={styles.col}>
          <h3 style={styles.heading}>Quick Links</h3>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/cart" style={styles.link}>Cart</Link>
          <Link to="/login" style={styles.link}>Login</Link>
          <Link to="/signup" style={styles.link}>Signup</Link>
        </div>

        {/* Right */}
        <div style={styles.col}>
          <h3 style={styles.heading}>Support</h3>
          <p style={styles.text}>📞 +91 98765 43210</p>
          <p style={styles.text}>✉️ support@crowncart.com</p>
          <p style={styles.text}>📍 India</p>
        </div>
      </div>

      <div style={styles.bottom}>
        © {new Date().getFullYear()} CrownCart. All rights reserved.
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    marginTop: "40px",
    background: "linear-gradient(90deg, #0f172a, #1e3a8a)",
    color: "white",
    paddingTop: "35px",
  },
  container: {
    width: "92%",
    maxWidth: "1200px",
    margin: "auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "25px",
    paddingBottom: "30px",
  },
  col: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  logo: {
    fontSize: "22px",
    fontWeight: "900",
    color: "#ffd700",
  },
  heading: {
    fontSize: "16px",
    fontWeight: "800",
    marginBottom: "6px",
  },
  text: {
    color: "#cbd5e1",
    fontSize: "14px",
    lineHeight: "1.6",
  },
  link: {
    color: "#cbd5e1",
    fontSize: "14px",
    textDecoration: "none",
    fontWeight: "700",
  },
  bottom: {
    borderTop: "1px solid rgba(255,255,255,0.15)",
    textAlign: "center",
    padding: "14px",
    fontSize: "13px",
    color: "#cbd5e1",
  },
};
