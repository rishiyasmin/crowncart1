import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../utils/cart";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `https://crowncart-1.onrender.com/api/products/${id}`
      );

      setProduct(res.data);

      // ✅ fetch related products (same category)
      const all = await axios.get("https://crowncart-1.onrender.com/api/products");
      const rel = all.data.filter(
        (p) => p.category === res.data.category && p._id !== res.data._id
      );
      setRelated(rel.slice(0, 4));
    } catch (err) {
      console.log(err);
      alert("❌ Product not found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) {
    return <h2 style={{ textAlign: "center", marginTop: "30px" }}>Loading...</h2>;
  }

  if (!product) return null;

  const discount =
    product.mrp && product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0;

  return (
    <div style={styles.page}>
      {/* ✅ Product Card */}
      <div style={styles.card}>
        {/* ✅ Image */}
        <div style={styles.left}>
          <div style={styles.imageBox}>
            <img
              src={product.image || "https://via.placeholder.com/400"}
              alt={product.name}
              style={styles.img}
            />
          </div>

          {/* ✅ Highlights */}
          <div style={styles.highlights}>
            <h3 style={styles.secTitle}>✨ Highlights</h3>
            <ul style={styles.ul}>
              <li>✅ Premium quality product</li>
              <li>✅ Best price guaranteed</li>
              <li>✅ Fast delivery available</li>
              <li>✅ Easy returns (demo)</li>
            </ul>
          </div>
        </div>

        {/* ✅ Details */}
        <div style={styles.right}>
          <h1 style={styles.title}>{product.name}</h1>

          {/* ✅ Rating only */}
          <div style={styles.ratingRow}>
            <span style={styles.star}>⭐</span>
            <span style={styles.rating}>{product.rating || 4.2}</span>
            <span style={styles.ratingText}>Top Rated Product</span>
          </div>

          {/* ✅ Price + MRP */}
          <div style={styles.priceRow}>
            <span style={styles.offerPrice}>₹{product.price}</span>

            {product.mrp && (
              <span style={styles.mrpPrice}>₹{product.mrp}</span>
            )}

            {discount > 0 && <span style={styles.offBadge}>{discount}% OFF</span>}
          </div>

          {/* ✅ Long Description */}
          <p style={styles.desc}>
            {product.description || "Best quality product"}{" "}
            This product is designed to give you the best value for money with
            premium quality and long-lasting performance. Whether you are
            shopping for daily needs or special items, CrownCart provides the
            most trusted shopping experience with fast delivery and secure
            checkout.
          </p>

          {/* ✅ Extra details */}
          <div style={styles.infoBox}>
            <div style={styles.infoItem}>🚚 Free Delivery in 2-4 Days</div>
            <div style={styles.infoItem}>🔁 Easy Return Policy (Demo)</div>
            <div style={styles.infoItem}>🔒 Secure Payments</div>
            <div style={styles.infoItem}>✅ Verified Product</div>
          </div>

          {/* ✅ Buttons */}
          <button
            style={styles.addBtn}
            onClick={() => {
              addToCart(product);
              alert("✅ Added to cart!");
            }}
          >
            Add to Cart
          </button>

          <button style={styles.backBtn} onClick={() => navigate("/")}>
            ← Back to Home
          </button>
        </div>
      </div>

      {/* ✅ Related Products */}
      <h2 style={styles.relatedTitle}>Related Products</h2>

      <div style={styles.relatedGrid}>
        {related.map((p) => (
          <div
            key={p._id}
            style={styles.relatedCard}
            onClick={() => navigate(`/product/${p._id}`)}
          >
            <img
              src={p.image || "https://via.placeholder.com/200"}
              alt={p.name}
              style={styles.relatedImg}
            />
            <div style={styles.relatedBody}>
              <h4 style={styles.relatedName}>{p.name}</h4>

              <div style={styles.relatedPriceRow}>
                <span style={styles.relatedOffer}>₹{p.price}</span>
                {p.mrp && <span style={styles.relatedMrp}>₹{p.mrp}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "85vh",
    padding: "30px 0",
    background: "linear-gradient(135deg, #f3f7ff, #eef2ff, #f8fafc)",
  },

  card: {
    width: "92%",
    maxWidth: "1200px",
    margin: "0 auto",
    background: "white",
    borderRadius: "22px",
    padding: "28px",
    display: "flex",
    gap: "30px",
    boxShadow: "0 18px 45px rgba(0,0,0,0.12)",
  },

  left: { flex: 1 },
  right: { flex: 1.2 },

  imageBox: {
    borderRadius: "20px",
    background: "#f8fafc",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  img: {
    width: "100%",
    maxWidth: "360px",
    height: "300px",
    objectFit: "contain",
  },

  highlights: {
    marginTop: "18px",
    background: "#f8fafc",
    borderRadius: "16px",
    padding: "16px",
    border: "1px solid #e2e8f0",
  },

  secTitle: {
    margin: "0 0 10px",
    fontSize: "16px",
    fontWeight: "900",
    color: "#111827",
  },

  ul: {
    margin: 0,
    paddingLeft: "18px",
    color: "#334155",
    fontWeight: "700",
    lineHeight: "1.8",
    fontSize: "14px",
  },

  title: {
    fontSize: "34px",
    fontWeight: "950",
    color: "#111827",
    marginBottom: "10px",
  },

  ratingRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "14px",
  },

  star: { fontSize: "16px" },

  rating: {
    fontWeight: "900",
    color: "#111827",
  },

  ratingText: {
    fontSize: "13px",
    color: "#64748b",
    fontWeight: "700",
  },

  priceRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "14px",
    flexWrap: "wrap",
  },

  offerPrice: {
    fontSize: "30px",
    fontWeight: "950",
    color: "#16a34a",
  },

  mrpPrice: {
    fontSize: "16px",
    fontWeight: "800",
    color: "#64748b",
    textDecoration: "line-through",
  },

  offBadge: {
    background: "#ef4444",
    color: "white",
    fontWeight: "900",
    fontSize: "12px",
    padding: "5px 10px",
    borderRadius: "999px",
  },

  desc: {
    fontSize: "15px",
    color: "#334155",
    lineHeight: "1.7",
    fontWeight: "600",
    marginBottom: "16px",
  },

  infoBox: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    marginBottom: "18px",
  },

  infoItem: {
    background: "#f8fafc",
    padding: "10px",
    borderRadius: "14px",
    border: "1px solid #e2e8f0",
    fontWeight: "800",
    color: "#111827",
    fontSize: "13px",
  },

  addBtn: {
    width: "100%",
    padding: "14px",
    borderRadius: "14px",
    border: "none",
    background: "linear-gradient(90deg, #2563eb, #9333ea)",
    color: "white",
    fontWeight: "950",
    cursor: "pointer",
    fontSize: "15px",
  },

  backBtn: {
    width: "100%",
    padding: "14px",
    borderRadius: "14px",
    border: "none",
    marginTop: "12px",
    background: "#334155",
    color: "white",
    fontWeight: "900",
    cursor: "pointer",
    fontSize: "15px",
  },

  relatedTitle: {
    width: "92%",
    maxWidth: "1200px",
    margin: "25px auto 15px",
    fontSize: "22px",
    fontWeight: "950",
    color: "#111827",
  },

  relatedGrid: {
    width: "92%",
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
    gap: "18px",
  },

  relatedCard: {
    background: "white",
    borderRadius: "18px",
    overflow: "hidden",
    boxShadow: "0 12px 25px rgba(0,0,0,0.08)",
    cursor: "pointer",
    transition: "0.2s",
  },

  relatedImg: {
    width: "100%",
    height: "150px",
    objectFit: "contain",
    background: "#f1f5f9",
    padding: "10px",
  },

  relatedBody: { padding: "12px" },

  relatedName: {
    fontWeight: "900",
    fontSize: "15px",
    color: "#111827",
    marginBottom: "8px",
  },

  relatedPriceRow: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },

  relatedOffer: {
    fontWeight: "950",
    color: "#16a34a",
  },

  relatedMrp: {
    fontWeight: "800",
    color: "#64748b",
    textDecoration: "line-through",
    fontSize: "13px",
  },
};
