import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  const cities = [
    "Abohar",
    "Achampet",
    "Adilabad",
    "Agartala",
    "Agra",
    "Ahmedabad",
    "Ajmer",
    "Aligarh",
    "Alappuzha",
    "Allahabad",
    "Alwar",
    "Amaravati",
    "Ambala",
    "Amritsar",
    "Anantapur",
    "Aurangabad",
    "Bengaluru",
    "Bhopal",
    "Bhubaneswar",
    "Chandigarh",
    "Chennai",
    "Coimbatore",
    "Delhi",
    "Erode",
    "Goa",
    "Guntur",
    "Guwahati",
    "Hyderabad",
    "Indore",
    "Jaipur",
    "Jammu",
    "Jodhpur",
    "Kakinada",
    "Kanpur",
    "Kochi",
    "Kolkata",
    "Kota",
    "Lucknow",
    "Madurai",
    "Mangalore",
    "Mumbai",
    "Mysuru",
    "Nagpur",
    "Nashik",
    "Patna",
    "Pune",
    "Raipur",
    "Rajahmundry",
    "Ranchi",
    "Salem",
    "Surat",
    "Thane",
    "Tirupati",
    "Trichy",
    "Udaipur",
    "Vadodara",
    "Vijayawada",
    "Visakhapatnam",
    "Warangal",
  ];

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* ✅ Top Columns */}
        <div style={styles.topGrid}>
          {/* ✅ Column 1 */}
          <div style={styles.col}>
            <h3 style={styles.title}>CrownCart</h3>
            <Link to="/" style={styles.link}>
              About Us
            </Link>
            <Link to="/" style={styles.link}>
              In News
            </Link>
            <Link to="/" style={styles.link}>
              Green CrownCart
            </Link>
            <Link to="/terms" style={styles.link}>
              Privacy Policy
            </Link>
            <Link to="/terms" style={styles.link}>
              Terms & Conditions
            </Link>
            <Link to="/" style={styles.link}>
              Affiliate
            </Link>
          </div>

          {/* ✅ Column 2 */}
          <div style={styles.col}>
            <h3 style={styles.title}>Help</h3>
            <Link to="/" style={styles.link}>
              FAQs
            </Link>
            <Link to="/" style={styles.link}>
              Contact Us
            </Link>
            <Link to="/" style={styles.link}>
              Shipping & Delivery
            </Link>
            <Link to="/" style={styles.link}>
              Return Policy
            </Link>
            <Link to="/" style={styles.link}>
              Payments
            </Link>
            <Link to="/" style={styles.link}>
              Vendor Connect
            </Link>
          </div>

          {/* ✅ Column 3 */}
          <div style={styles.col}>
            <h3 style={styles.title}>Download App</h3>

            <p style={styles.smallText}>
              Get the CrownCart app for faster checkout and exclusive offers.
            </p>

            <div style={styles.storeRow}>
              <button style={styles.storeBtn}>
                <span style={{ fontSize: "18px" }}>▶</span>
                <div>
                  <div style={styles.storeTop}>GET IT ON</div>
                  <div style={styles.storeBottom}>Google Play</div>
                </div>
              </button>

              <button style={styles.storeBtn}>
                <span style={{ fontSize: "18px" }}></span>
                <div>
                  <div style={styles.storeTop}>Download on the</div>
                  <div style={styles.storeBottom}>App Store</div>
                </div>
              </button>
            </div>

            <div style={styles.socialRow}>
              <a href="#" style={styles.socialIcon}>
                f
              </a>
              <a href="#" style={styles.socialIcon}>
                ⓘ
              </a>
              <a href="#" style={styles.socialIcon}>
                ✕
              </a>
              <a href="#" style={styles.socialIcon}>
                ▶
              </a>
            </div>
          </div>
        </div>

        {/* ✅ Divider */}
        <div style={styles.divider} />

        {/* ✅ Cities We Serve */}
        <div style={styles.citiesBox}>
          <h3 style={styles.citiesTitle}>Cities We Serve</h3>

          <p style={styles.citiesText}>
            {cities.map((c, i) => (
              <span key={i}>
                {c}
                {i !== cities.length - 1 ? " | " : ""}
              </span>
            ))}
          </p>
        </div>

        {/* ✅ Bottom Bar */}
        <div style={styles.bottomBar}>
          <p style={styles.copy}>
            © {year} CrownCart. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: "#0b0b0c",
    color: "white",
    marginTop: "40px",
    paddingTop: "40px",
  },

  container: {
    width: "92%",
    maxWidth: "1200px",
    margin: "0 auto",
    paddingBottom: "22px",
  },

  topGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "40px",
    paddingBottom: "25px",
  },

  col: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  title: {
    fontSize: "16px",
    fontWeight: "950",
    marginBottom: "10px",
  },

  link: {
    textDecoration: "none",
    color: "rgba(255,255,255,0.75)",
    fontWeight: "600",
    fontSize: "14px",
  },

  smallText: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.65)",
    lineHeight: "1.6",
    marginBottom: "12px",
  },

  storeRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    marginBottom: "15px",
  },

  storeBtn: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "rgba(255,255,255,0.08)",
    color: "white",
    border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: "12px",
    padding: "10px 14px",
    cursor: "pointer",
    fontWeight: "800",
    minWidth: "160px",
  },

  storeTop: {
    fontSize: "10px",
    opacity: 0.7,
    fontWeight: "800",
  },

  storeBottom: {
    fontSize: "14px",
    fontWeight: "950",
    lineHeight: 1.1,
  },

  socialRow: {
    display: "flex",
    gap: "12px",
    marginTop: "8px",
  },

  socialIcon: {
    width: "36px",
    height: "36px",
    borderRadius: "10px",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textDecoration: "none",
    color: "white",
    fontWeight: "900",
    cursor: "pointer",
  },

  divider: {
    height: "1px",
    background: "rgba(255,255,255,0.12)",
    margin: "15px 0 20px",
  },

  citiesBox: {
    paddingBottom: "20px",
  },

  citiesTitle: {
    textAlign: "center",
    fontWeight: "950",
    fontSize: "15px",
    marginBottom: "12px",
  },

  citiesText: {
    textAlign: "center",
    fontSize: "13px",
    lineHeight: "1.8",
    color: "rgba(255,255,255,0.65)",
    padding: "0 10px",
  },

  bottomBar: {
    borderTop: "1px solid rgba(255,255,255,0.12)",
    paddingTop: "14px",
    textAlign: "center",
  },

  copy: {
    margin: 0,
    fontSize: "13px",
    color: "rgba(255,255,255,0.7)",
    fontWeight: "700",
  },
};
