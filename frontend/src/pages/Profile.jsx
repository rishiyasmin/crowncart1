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

  if (!user) return null;

  const firstLetter = user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.avatar}>{firstLetter}</div>

          <div>
            <h2 style={styles.title}>My Profile</h2>
            <p style={styles.subTitle}>Hello, {user.name || "User"} 👋</p>
          </div>
        </div>

        {/* Info */}
        <div style={styles.infoBox}>
          <div style={styles.row}>
            <span style={styles.label}>Name</span>
            <span style={styles.value}>{user.name || "Not given"}</span>
          </div>

          <div style={styles.row}>
            <span style={styles.label}>Email</span>
            <span style={styles.value}>{user.email || "Not given"}</span>
          </div>
        </div>

        {/* Buttons */}
        <div style={styles.btnRow}>
          <button style={styles.homeBtn} onClick={() => navigate("/")}>
            🏠 Go Home
          </button>

          <button
            style={styles.logoutBtn}
            onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("token");
              window.dispatchEvent(new Event("authUpdated"));
              navigate("/login");
            }}
          >
            🚪 Logout
          </button>
        </div>
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
    padding: "20px",
    background: "linear-gradient(135deg, #f3f7ff, #eef2ff, #f8fafc)",
  },

  card: {
    width: "100%",
    maxWidth: "520px",
    background: "white",
    borderRadius: "18px",
    padding: "28px",
    boxShadow: "0 18px 40px rgba(0,0,0,0.12)",
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "20px",
  },

  avatar: {
    width: "55px",
    height: "55px",
    borderRadius: "50%",
    background: "linear-gradient(90deg, #2563eb, #9333ea)",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "22px",
    fontWeight: "900",
  },

  title: {
    fontSize: "24px",
    fontWeight: "900",
    margin: 0,
    color: "#111827",
  },

  subTitle: {
    margin: "4px 0 0",
    fontSize: "14px",
    color: "#64748b",
    fontWeight: "600",
  },

  infoBox: {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
    padding: "16px",
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

  btnRow: {
    display: "flex",
    gap: "10px",
    marginTop: "18px",
  },

  homeBtn: {
    flex: 1,
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    background: "white",
    cursor: "pointer",
    fontWeight: "900",
  },

  logoutBtn: {
    flex: 1,
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
