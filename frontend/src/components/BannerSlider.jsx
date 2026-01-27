import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BannerSlider() {
  const navigate = useNavigate();

  const banners = [
    {
      title: "Welcome to CrownCart 👑",
      desc: "Best deals on Groceries, Accessories & Electronics.",
      button: "Shop Now",
      emoji: "🛍️",
      bg: "linear-gradient(120deg, #2563eb, #9333ea)",
    },
    {
      title: "Mega Electronics Sale ⚡",
      desc: "Headphones, chargers & gadgets at best price!",
      button: "Explore",
      emoji: "🎧",
      bg: "linear-gradient(120deg, #f97316, #dc2626)",
    },
    {
      title: "Fresh Grocery Deals 🥦",
      desc: "Daily essentials with amazing discounts.",
      button: "Buy Groceries",
      emoji: "🛒",
      bg: "linear-gradient(120deg, #16a34a, #047857)",
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ ...styles.banner, background: banners[index].bg }}>
      <div>
        <h1 style={styles.bannerTitle}>{banners[index].title}</h1>
        <p style={styles.bannerText}>{banners[index].desc}</p>

        <button style={styles.bannerBtn} onClick={() => navigate("/")}>
          {banners[index].button}
        </button>
      </div>

      <div style={styles.bannerEmoji}>{banners[index].emoji}</div>

      {/* dots */}
      <div style={styles.dots}>
        {banners.map((_, i) => (
          <span
            key={i}
            onClick={() => setIndex(i)}
            style={{
              ...styles.dot,
              opacity: index === i ? 1 : 0.4,
              transform: index === i ? "scale(1.2)" : "scale(1)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  banner: {
    borderRadius: "20px",
    padding: "30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
    marginBottom: "25px",
    boxShadow: "0 15px 30px rgba(0,0,0,0.35)",
    position: "relative",
    overflow: "hidden",
    minHeight: "180px",
  },
  bannerTitle: { fontSize: "32px", fontWeight: "900" },
  bannerText: { marginTop: "10px", fontSize: "16px", opacity: 0.95 },
  bannerBtn: {
    marginTop: "15px",
    padding: "12px 18px",
    borderRadius: "12px",
    border: "none",
    background: "white",
    color: "#111",
    fontWeight: "800",
    cursor: "pointer",
  },
  bannerEmoji: { fontSize: "60px" },

  dots: {
    position: "absolute",
    bottom: "12px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "8px",
  },
  dot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: "white",
    cursor: "pointer",
    transition: "0.2s",
  },
};
