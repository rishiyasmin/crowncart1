import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
      navigate("/login");
    } else {
      setUser(savedUser);
    }
  }, [navigate]);

  if (!user) return null; // ✅ avoids blank crash

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>👤 My Profile</h2>

        <div style={styles.row}>
          <span style={styles.label}>Name:</span>
          <span style={styles.value}>{user.name || "Not given"}</span>
        </div>

        <div style={styles.row}>
          <span style={styles.label}>Email:</span>
          <span style={styles.value}>{user.email}</span>
        </div>

        <button
          style={styles.logoutBtn}
          onClick={() => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            window.dispatchEvent(new Event("authUpdated"));
            navigate("/login");
          }}
        >
          Logout 🚪
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "85vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #f3f7ff, #eef2ff, #f8fafc)",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "450px",
    background: "white",
    borderRadius: "18px",
    padding: "28px",
    boxShadow: "0 18px 40px rgba(0,0,0,0.12)",
  },
  title: {
    fontSize: "26px",
    fontWeight: "900",
    marginBottom: "20px",
    color: "#111827",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: "1px solid #e2e8f0",
  },
  label: {
    fontWeight: "800",
    color: "#334155",
  },
  value: {
    fontWeight: "700",
    color: "#111827",
  },
  logoutBtn: {
    marginTop: "20px",
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(90deg, #ef4444, #dc2626)",
    color: "white",
    fontWeight: "900",
    cursor: "pointer",
    fontSize: "15px",
  },
};
