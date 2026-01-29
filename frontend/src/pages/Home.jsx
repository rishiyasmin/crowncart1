import Fuse from "fuse.js";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { addToCart } from "../utils/cart";
import { useNavigate, useSearchParams } from "react-router-dom";
import BannerSlider from "../components/BannerSlider";

export default function Home() {
  const [products, setProducts] = useState([]);

  // ✅ navbar search query
  const [searchParams] = useSearchParams();
  const querySearch = searchParams.get("search") || "";

  // ✅ Category state
  const [category, setCategory] = useState("all");

  const navigate = useNavigate();

  // ✅ Fetch products from Render backend
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "https://crowncart-1.onrender.com/api/products"
      );
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      alert("❌ Backend not connected OR No products in DB");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ when click category -> clear search from URL
  const handleCategoryClick = (cat) => {
    setCategory(cat);
    navigate("/", { replace: true });
  };

  // ✅ Fuse search instance
  const fuse = useMemo(() => {
    return new Fuse(products, {
      keys: ["name", "category"],
      threshold: 0.4,
    });
  }, [products]);

  // ✅ Search filter
  const searchedProducts = querySearch
    ? fuse.search(querySearch).map((result) => result.item)
    : products;

  // ✅ Category filter
  const finalFiltered = searchedProducts.filter((p) =>
    category === "all"
      ? true
      : (p.category || "").toLowerCase() === category.toLowerCase()
  );

  return (
    <div className="container">
      {/* ✅ Banner Slider */}
      <BannerSlider />

      <div style={styles.categoryBar}>
  <button
    style={category === "all" ? styles.activeCatBtn : styles.catBtn}
    onClick={() => handleCategoryClick("all")}
  >
    ⭐ All
  </button>

  <button
    style={category === "groceries" ? styles.activeCatBtn : styles.catBtn}
    onClick={() => handleCategoryClick("groceries")}
  >
    🥦 Groceries
  </button>

  <button
    style={category === "electronics" ? styles.activeCatBtn : styles.catBtn}
    onClick={() => handleCategoryClick("electronics")}
  >
    ⚡ Electronics
  </button>

  <button
    style={category === "accessories" ? styles.activeCatBtn : styles.catBtn}
    onClick={() => handleCategoryClick("accessories")}
  >
    🎒 Accessories
  </button>
</div>


      <h2 style={{ marginBottom: "15px" }}>Products</h2>

      {/* ✅ Products */}
      <div style={styles.grid}>
        {finalFiltered.map((p) => (
          <div
            key={p._id}
            style={styles.card}
            onClick={() => navigate(`/product/${p._id}`)}
          >
            <img
              src={p.image || "https://via.placeholder.com/300"}
              alt={p.name}
              style={styles.img}
            />

            <div style={{ padding: "12px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "800" }}>
                {p.name}
              </h3>

              <div style={styles.priceBox}>
  <span style={styles.offerPrice}>₹{p.price}</span>

  {p.mrp && (
    <span style={styles.mrpPrice}>₹{p.mrp}</span>
  )}

  {p.mrp && (
    <span style={styles.discount}>
      {Math.round(((p.mrp - p.price) / p.mrp) * 100)}% OFF
    </span>
  )}
</div>


              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(p);
                }}
                style={styles.btn}
              >
                Add to Cart
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/cart");
                }}
                style={{ ...styles.btn, background: "#334155" }}
              >
                Go to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ No products */}
      {finalFiltered.length === 0 && (
        <h3 style={{ marginTop: "20px", color: "red" }}>
          ❌ No products found
        </h3>
      )}
    </div>
  );
}

const styles = {
  categoryBar: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginBottom: "20px",
  },

  catBtn: {
    padding: "10px 16px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    background: "white",
    cursor: "pointer",
    fontWeight: "800",
    color: "#111827",
    boxShadow: "0 5px 12px rgba(0,0,0,0.06)",
  },

  activeCatBtn: {
    padding: "10px 16px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(90deg, #2563eb, #9333ea)",
    cursor: "pointer",
    fontWeight: "800",
    color: "white",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "white",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    cursor: "pointer",
    transition: "0.2s",
  },

  img: {
    width: "100%",
    height: "160px",
    objectFit: "contain",
    background: "#f1f5f9",
  },

  price: {
    fontSize: "18px",
    fontWeight: "800",
    marginTop: "6px",
    marginBottom: "10px",
    color: "#16a34a",
  },

  btn: {
    width: "100%",
    padding: "10px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontWeight: "700",
    color: "white",
    background: "linear-gradient(90deg, #2563eb, #9333ea)",
    marginTop: "10px",
  },
  priceBox: {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginTop: "6px",
  marginBottom: "10px",
  flexWrap: "wrap",
},

offerPrice: {
  fontSize: "18px",
  fontWeight: "900",
  color: "#16a34a",
},

mrpPrice: {
  fontSize: "14px",
  fontWeight: "800",
  color: "#64748b",
  textDecoration: "line-through",
},

discount: {
  fontSize: "12px",
  fontWeight: "900",
  color: "white",
  background: "#ef4444",
  padding: "3px 8px",
  borderRadius: "10px",
},

};
