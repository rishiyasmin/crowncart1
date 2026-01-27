import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: email.trim(),
        password,
      });

      // ✅ Save login data
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // ✅ token may be demo sometimes, so fallback safe
      localStorage.setItem("token", res.data.token || "demo-token");

      // ✅ Update navbar instantly
      window.dispatchEvent(new Event("authUpdated"));

      // ✅ go to profile
      navigate("/profile");
    } catch (err) {
      console.log("LOGIN ERROR =>", err.response?.data || err.message);
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back 👋</h2>
        <p style={styles.subTitle}>Login to continue shopping at CrownCart</p>

        {error && <p style={styles.errorText}>{error}</p>}

        <form onSubmit={handleLogin} style={styles.form}>
          {/* Email */}
          <label style={styles.label}>Email</label>
          <input
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            type="email"
            required
          />

          {/* Password */}
          <label style={styles.label}>Password</label>
          <div style={styles.passwordBox}>
            <input
              placeholder="Enter your password"
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.passwordInput}
              required
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              style={styles.eyeBtn}
            >
              {showPass ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Remember + Forgot */}
          <div style={styles.row}>
            <div style={styles.remember}>
              <input type="checkbox" />
              <span style={{ fontSize: "14px" }}>Remember me</span>
            </div>

            <span style={styles.forgot}>Forgot password?</span>
          </div>

          {/* Button */}
          <button style={styles.btn} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={styles.bottomText}>
          Don’t have an account?{" "}
          <Link to="/signup" style={styles.link}>
            Signup
          </Link>
        </p>
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
    maxWidth: "420px",
    background: "white",
    borderRadius: "18px",
    padding: "28px",
    boxShadow: "0 18px 40px rgba(0,0,0,0.12)",
  },

  title: {
    fontSize: "26px",
    fontWeight: "900",
    color: "#111827",
  },

  subTitle: {
    marginTop: "6px",
    marginBottom: "18px",
    color: "#64748b",
    fontSize: "14px",
  },

  errorText: {
    background: "#fee2e2",
    color: "#b91c1c",
    padding: "10px",
    borderRadius: "12px",
    fontWeight: "700",
    marginBottom: "12px",
    fontSize: "14px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  label: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#334155",
    marginTop: "6px",
  },

  input: {
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    outline: "none",
    fontSize: "14px",
  },

  passwordBox: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #cbd5e1",
    borderRadius: "12px",
    overflow: "hidden",
    background: "white",
  },

  passwordInput: {
    flex: 1,
    padding: "12px",
    border: "none",
    outline: "none",
    fontSize: "14px",
  },

  eyeBtn: {
    border: "none",
    background: "transparent",
    padding: "0 12px",
    cursor: "pointer",
    fontSize: "18px",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "8px",
  },

  remember: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#334155",
  },

  forgot: {
    fontSize: "14px",
    color: "#2563eb",
    cursor: "pointer",
    fontWeight: "700",
  },

  btn: {
    marginTop: "15px",
    padding: "12px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(90deg, #2563eb, #9333ea)",
    color: "white",
    fontWeight: "800",
    cursor: "pointer",
    fontSize: "15px",
    transition: "0.2s",
  },

  bottomText: {
    marginTop: "18px",
    textAlign: "center",
    color: "#475569",
    fontSize: "14px",
  },

  link: {
    color: "#9333ea",
    fontWeight: "800",
  },
};
