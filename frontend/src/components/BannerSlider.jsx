import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BannerSlider() {
  const navigate = useNavigate();

  const banners = [
  {
    title: "Welcome to CrownCart 👑",
    desc: "Shop Groceries, Accessories & Electronics with amazing deals.",
    button: "Shop Now",
    emoji: "🛍️",
    bg: "linear-gradient(120deg, #3b82f6, #06b6d4)", // ✅ blue → cyan
    mini: "Trusted by 10K+ shoppers ⭐",
  },
  {
    title: "Mega Electronics Sale ⚡",
    desc: "Headphones, chargers & gadgets at unbeatable prices.",
    button: "Explore Deals",
    emoji: "🎧",
    bg: "linear-gradient(120deg, #ec4899, #8b5cf6)", // ✅ pink → purple
    mini: "Limited time offers ⏳",
  },
  {
    title: "Fresh Grocery Deals 🥦",
    desc: "Daily essentials delivered fast with super discounts.",
    button: "Buy Groceries",
    emoji: "🛒",
    bg: "linear-gradient(120deg, #22c55e, #84cc16)", // ✅ green → lime
    mini: "Fresh • Fast • Affordable ✅",
  },
];

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false); // start fade out
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % banners.length);
        setFade(true); // fade in
      }, 250);
    }, 3500);

    return () => clearInterval(timer);
  }, [banners.length]);

  return (
    <div style={{ ...styles.banner, background: banners[index].bg }}>
      {/* ✅ premium blur background circles */}
      <div style={styles.blurCircle1}></div>
      <div style={styles.blurCircle2}></div>

      {/* ✅ Left content */}
      <div style={{ ...styles.left, opacity: fade ? 1 : 0, transform: fade ? "translateY(0px)" : "translateY(10px)" }}>
        <div style={styles.miniTag}>{banners[index].mini}</div>

        <h1 style={styles.bannerTitle}>{banners[index].title}</h1>
        <p style={styles.bannerText}>{banners[index].desc}</p>

        <div style={styles.btnRow}>
          <button style={styles.bannerBtn} onClick={() => navigate("/")}>
            {banners[index].button} →
          </button>

          <button style={styles.secondaryBtn} onClick={() => navigate("/cart")}>
            View Cart 🛒
          </button>
        </div>
      </div>

      {/* ✅ Right emoji */}
      <div style={{ ...styles.right, opacity: fade ? 1 : 0 }}>
        <div style={styles.emojiBox}>{banners[index].emoji}</div>
      </div>

      {/* ✅ dots */}
      <div style={styles.dots}>
        {banners.map((_, i) => (
          <span
            key={i}
            onClick={() => setIndex(i)}
            style={{
              ...styles.dot,
              opacity: index === i ? 1 : 0.4,
              transform: index === i ? "scale(1.3)" : "scale(1)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  banner: {
    width: "92%",
    maxWidth: "1200px",
    margin: "25px auto",
    borderRadius: "26px",
    padding: "35px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
    boxShadow: "0 18px 45px rgba(0,0,0,0.25)",
    position: "relative",
    overflow: "hidden",
    minHeight: "220px",
  },

  left: {
    zIndex: 2,
    maxWidth: "650px",
    transition: "0.3s ease",
  },

  right: {
    zIndex: 2,
    transition: "0.3s ease",
  },

  miniTag: {
    display: "inline-block",
    padding: "7px 14px",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.18)",
    border: "1px solid rgba(255,255,255,0.25)",
    fontSize: "13px",
    fontWeight: "800",
    marginBottom: "14px",
  },

  bannerTitle: {
    fontSize: "38px",
    fontWeight: "950",
    margin: 0,
    letterSpacing: "0.3px",
  },

  bannerText: {
    marginTop: "10px",
    fontSize: "16px",
    opacity: 0.95,
    lineHeight: "1.5",
    maxWidth: "520px",
  },

  btnRow: {
    marginTop: "18px",
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },

  bannerBtn: {
    padding: "12px 18px",
    borderRadius: "14px",
    border: "none",
    background: "linear-gradient(90deg, #facc15, #f59e0b)",
    color: "#111",
    fontWeight: "900",
    cursor: "pointer",
    boxShadow: "0 10px 22px rgba(0,0,0,0.22)",
    transition: "0.2s",
  },

  secondaryBtn: {
    padding: "12px 18px",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.35)",
    background: "rgba(255,255,255,0.12)",
    color: "white",
    fontWeight: "850",
    cursor: "pointer",
    transition: "0.2s",
  },

  emojiBox: {
    fontSize: "78px",
    padding: "18px 25px",
    borderRadius: "26px",
    background: "rgba(255,255,255,0.14)",
    border: "1px solid rgba(255,255,255,0.22)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 18px 40px rgba(0,0,0,0.18)",
    transform: "rotate(-6deg)",
  },

  blurCircle1: {
  position: "absolute",
  width: "220px",
  height: "220px",
  borderRadius: "50%",
  background: "rgba(255,255,255,0.22)",
  top: "-70px",
  left: "-70px",
  filter: "blur(25px)",
  zIndex: 1,
},

blurCircle2: {
  position: "absolute",
  width: "260px",
  height: "260px",
  borderRadius: "50%",
  background: "rgba(255,255,255,0.10)",
  bottom: "-90px",
  right: "-90px",
  filter: "blur(30px)",
  zIndex: 1,
},


  dots: {
    position: "absolute",
    bottom: "14px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "10px",
    zIndex: 3,
  },

  dot: {
    width: "11px",
    height: "11px",
    borderRadius: "50%",
    background: "white",
    cursor: "pointer",
    transition: "0.2s",
  },
};
