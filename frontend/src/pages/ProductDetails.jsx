import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { addToCart } from "../utils/cart";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(`http://localhost:5000/api/products/${id}`);
      setProduct(res.data);

      // related products same category
      const all = await axios.get("http://localhost:5000/api/products");
      const rel = all.data.filter(
        (p) => p.category === res.data.category && p._id !== res.data._id
      );
      setRelated(rel.slice(0, 4));
    };

    fetchProduct();
  }, [id]);

  if (!product) return <h2 style={{ padding: "30px" }}>Loading...</h2>;

  return (
    <div style={styles.page}>
      <div style={styles.box}>
        <img
          src={product.image || "https://via.placeholder.com/400"}
          alt={product.name}
          style={styles.img}
        />

        <div style={styles.info}>
          <h1 style={styles.title}>{product.name}</h1>

          <p style={styles.rating}>
            ⭐ {product.rating || 4.2} ({product.reviews || 120} reviews)
          </p>

          <h2 style={styles.price}>₹{product.price}</h2>

          <p style={styles.desc}>
            {product.description || "Best quality product from CrownCart."}
          </p>

          <button
            style={styles.btn}
            onClick={() => {
              addToCart(product);
            }}
          >
            Add to Cart
          </button>

          <button style={styles.backBtn} onClick={() => navigate("/")}>
            ⬅ Back to Home
          </button>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h2 style={{ marginBottom: "15px" }}>Related Products</h2>

          <div style={styles.grid}>
            {related.map((p) => (
              <div
                key={p._id}
                style={styles.card}
                onClick={() => navigate(`/product/${p._id}`)}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  style={{ width: "100%", height: "140px", objectFit: "contain" }}
                />
                <div style={{ padding: "10px" }}>
                  <h4>{p.name}</h4>
                  <p style={{ fontWeight: "800", color: "green" }}>₹{p.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    padding: "30px",
    background: "linear-gradient(135deg, #f3f7ff, #eef2ff, #f8fafc)",
    minHeight: "100vh",
  },
  box: {
    display: "flex",
    gap: "30px",
    background: "white",
    padding: "25px",
    borderRadius: "18px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.12)",
    maxWidth: "1000px",
    margin: "auto",
  },
  img: {
    width: "380px",
    height: "380px",
    objectFit: "contain",
    background: "#f1f5f9",
    borderRadius: "16px",
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: "30px",
    fontWeight: "900",
    color: "#111827",
  },
  rating: {
    marginTop: "10px",
    fontWeight: "700",
    color: "#475569",
  },
  price: {
    marginTop: "15px",
    color: "#16a34a",
    fontWeight: "900",
    fontSize: "26px",
  },
  desc: {
    marginTop: "12px",
    color: "#334155",
    lineHeight: "1.6",
  },
  btn: {
    marginTop: "20px",
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(90deg, #2563eb, #9333ea)",
    color: "white",
    fontWeight: "800",
    cursor: "pointer",
  },
  backBtn: {
    marginTop: "10px",
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "12px",
    background: "#334155",
    color: "white",
    fontWeight: "800",
    cursor: "pointer",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
    maxWidth: "1000px",
    margin: "auto",
  },
  card: {
    background: "white",
    borderRadius: "16px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
    cursor: "pointer",
    overflow: "hidden",
  },
};
