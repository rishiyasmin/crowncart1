import { Link, useNavigate } from "react-router-dom";

export default function Terms() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>📄 Terms & Conditions</h2>
        <p style={styles.subTitle}>
          Please read these terms carefully before using CrownCart.
        </p>

        <div style={styles.content}>
          <h3 style={styles.heading}>1. Acceptance of Terms</h3>
          <p style={styles.text}>
            By accessing or using CrownCart, you agree to be bound by these Terms
            & Conditions.
          </p>

          <h3 style={styles.heading}>2. User Responsibility</h3>
          <p style={styles.text}>
            You are responsible for keeping your account information secure and
            accurate.
          </p>

          <h3 style={styles.heading}>3. Orders & Payments</h3>
          <p style={styles.text}>
            All orders are subject to availability and confirmation. Payments
            must be made through supported payment methods.
          </p>

          <h3 style={styles.heading}>4. Returns & Refunds</h3>
          <p style={styles.text}>
            Refunds and returns depend on the seller policy and item category.
          </p>

          <h3 style={styles.heading}>5. Privacy</h3>
          <p style={styles.text}>
            We respect your privacy. Your personal data is handled safely and
            responsibly.
          </p>
        </div>

        <div style={styles.btnRow}>
          <button onClick={() => navigate(-1)} style={styles.backBtn}>
            ⬅ Back
          </button>

          <Link to="/signup" style={styles.signupBtn}>
            ✅ Go to Signup
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "25px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #f3f7ff, #eef2ff, #f8fafc)",
  },

  card: {
    width: "100%",
    maxWidth: "850px",
    background: "white",
    borderRadius: "18px",
    padding: "28px",
    boxShadow: "0 18px 40px rgba(0,0,0,0.12)",
  },

  title: {
    fontSize: "28px",
    fontWeight: "900",
    marginBottom: "6px",
    color: "#111827",
  },

  subTitle: {
    color: "#64748b",
    fontSize: "14px",
    marginBottom: "20px",
  },

  content: {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    padding: "18px",
    borderRadius: "14px",
  },

  heading: {
    marginTop: "10px",
    marginBottom: "5px",
    fontSize: "16px",
    fontWeight: "800",
    color: "#1e293b",
  },

  text: {
    marginTop: "0px",
    marginBottom: "10px",
    fontSize: "14px",
    color: "#334155",
    lineHeight: "1.6",
  },

  btnRow: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    flexWrap: "wrap",
  },

  backBtn: {
    padding: "12px 18px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    background: "white",
    cursor: "pointer",
    fontWeight: "800",
  },

  signupBtn: {
    padding: "12px 18px",
    borderRadius: "12px",
    background: "linear-gradient(90deg, #2563eb, #9333ea)",
    color: "white",
    textDecoration: "none",
    fontWeight: "800",
  },
};
