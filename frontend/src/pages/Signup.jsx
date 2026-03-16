import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // ✅ add state for checkbox
  const [agree, setAgree] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
  e.preventDefault();

  if (!name || !email || !password || !confirm) {
    alert("❌ Fill all fields");
    return;
  }

  if (password !== confirm) {
    alert("❌ Passwords do not match");
    return;
  }

  try {
    const res = await fetch("https://crowncart1.onrender.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert("❌ " + (data.error || "Signup failed"));
      return;
    }

    alert("✅ Signup Successful! Please login now");
    navigate("/login");
  } catch (error) {
    alert("❌ Server error");
  }
};


  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account ✨</h2>
        <p style={styles.subTitle}>Join CrownCart and start shopping today 👑</p>

        <form onSubmit={handleSignup} style={styles.form}>
          {/* Name */}
          <label style={styles.label}>Full Name</label>
          <input
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />

          {/* Email */}
          <label style={styles.label}>Email</label>
          <input
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          {/* Password */}
          <label style={styles.label}>Password</label>
          <div style={styles.passwordBox}>
            <input
              placeholder="Create password"
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.passwordInput}
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              style={styles.eyeBtn}
            >
              {showPass ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Confirm Password */}
          <label style={styles.label}>Confirm Password</label>
          <div style={styles.passwordBox}>
            <input
              placeholder="Re-enter password"
              type={showConfirm ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              style={styles.passwordInput}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              style={styles.eyeBtn}
            >
              {showConfirm ? "🙈" : "👁️"}
            </button>
          </div>

          {/* ✅ Terms */}
          <div style={styles.terms}>
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <span style={{ fontSize: "14px" }}>
              I agree to the{" "}
              {/* ✅ IMPORTANT: use /terms not /Terms */}
              <Link to="/terms" style={styles.termLink}>
                Terms & Conditions
              </Link>
            </span>
          </div>

          {/* Button */}
          <button type="submit" style={styles.btn}>
            Create Account
          </button>
        </form>

        <p style={styles.bottomText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Login
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
    maxWidth: "450px",
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
    marginBottom: "20px",
    color: "#64748b",
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

  terms: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "10px",
    color: "#334155",
  },

  termLink: {
    color: "#2563eb",
    fontWeight: "800",
    cursor: "pointer",
    textDecoration: "underline",
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
