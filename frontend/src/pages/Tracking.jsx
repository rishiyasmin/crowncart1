import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Tracking() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // ✅ demo status auto update
  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev < 4 ? prev + 1 : 4));
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>📍 Live Order Tracking</h2>
        <p style={styles.subtitle}>
          Your delivery partner is on the way 🚚✨
        </p>

        {/* ✅ Steps */}
        <div style={styles.stepsBox}>
          <StepItem active={step >= 1} text="✅ Order Confirmed" />
          <StepItem active={step >= 2} text="👨‍🍳 Packed & Ready" />
          <StepItem active={step >= 3} text="🚚 Out for Delivery" />
          <StepItem active={step >= 4} text="🏠 Delivered Successfully" />
        </div>

        {/* ✅ Map Placeholder */}
        <div style={styles.mapBox}>
          <p style={styles.mapText}>🗺️ Live Map (Demo)</p>
          <div style={styles.fakeMap}>
            <div style={styles.routeLine}></div>
            <div style={styles.shopPin}>🏪</div>
            <div style={styles.homePin}>🏠</div>

            {/* moving rider */}
            <div
              style={{
                ...styles.rider,
                left:
                  step === 1
                    ? "15%"
                    : step === 2
                    ? "35%"
                    : step === 3
                    ? "60%"
                    : "80%",
              }}
            >
              🚴
            </div>
          </div>

          <p style={styles.locationNote}>
            📌 Your order will reach soon. Stay ready!
          </p>
        </div>

        {/* ✅ Buttons */}
        <button style={styles.btn} onClick={() => navigate("/")}>
          Continue Shopping 🛍️
        </button>
      </div>
    </div>
  );
}

function StepItem({ active, text }) {
  return (
    <div style={{ ...styles.stepItem, opacity: active ? 1 : 0.4 }}>
      <div style={{ ...styles.dot, background: active ? "#22c55e" : "#cbd5e1" }}>
        {active ? "✓" : ""}
      </div>
      <span style={styles.stepText}>{text}</span>
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
    maxWidth: "800px",
    background: "white",
    borderRadius: "20px",
    padding: "28px",
    boxShadow: "0 18px 45px rgba(0,0,0,0.12)",
  },

  title: {
    fontSize: "26px",
    fontWeight: "950",
    color: "#111827",
  },

  subtitle: {
    marginTop: "8px",
    marginBottom: "18px",
    color: "#64748b",
    fontWeight: "700",
  },

  stepsBox: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "20px",
  },

  stepItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontWeight: "800",
    fontSize: "14px",
  },

  dot: {
    width: "26px",
    height: "26px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontWeight: "900",
  },

  stepText: {
    color: "#111827",
  },

  mapBox: {
    background: "#f8fafc",
    borderRadius: "18px",
    padding: "18px",
    border: "1px solid #e2e8f0",
    marginBottom: "18px",
  },

  mapText: {
    margin: 0,
    fontWeight: "900",
    color: "#111827",
    marginBottom: "12px",
  },

  fakeMap: {
    height: "250px",
    borderRadius: "16px",
    background: "linear-gradient(135deg, #e0f2fe, #ede9fe)",
    position: "relative",
    overflow: "hidden",
  },

  routeLine: {
    position: "absolute",
    top: "50%",
    left: "10%",
    width: "80%",
    height: "6px",
    borderRadius: "10px",
    background: "rgba(37, 99, 235, 0.4)",
  },

  shopPin: {
    position: "absolute",
    top: "45%",
    left: "10%",
    fontSize: "26px",
  },

  homePin: {
    position: "absolute",
    top: "45%",
    left: "85%",
    fontSize: "26px",
  },

  rider: {
    position: "absolute",
    top: "42%",
    fontSize: "26px",
    transition: "0.8s",
  },

  locationNote: {
    marginTop: "12px",
    fontWeight: "800",
    color: "#334155",
    fontSize: "14px",
  },

  btn: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "14px",
    background: "linear-gradient(90deg, #2563eb, #9333ea)",
    color: "white",
    fontWeight: "950",
    fontSize: "15px",
    cursor: "pointer",
  },
};
