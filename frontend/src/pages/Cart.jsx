import { useEffect, useState } from "react";
import { getCart, updateQty, clearCart } from "../utils/cart";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const load = () => setCart(getCart());

useEffect(() => {
  load();

  const handleUpdate = () => load();

  window.addEventListener("cartUpdated", handleUpdate);

  return () => window.removeEventListener("cartUpdated", handleUpdate);
}, []);


  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryFee = cart.length > 0 ? 40 : 0;
  const discount = subtotal > 499 ? 50 : 0;
  const total = subtotal + deliveryFee - discount;

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.heading}>🛒 Your Cart</h2>

        {cart.length === 0 ? (
          <div style={styles.emptyBox}>
            <h3 style={{ marginBottom: "8px" }}>Your cart is empty 😢</h3>
            <p style={{ color: "#64748b" }}>
              Add products to cart and come back here.
            </p>

            <button style={styles.shopBtn} onClick={() => navigate("/")}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <div style={styles.grid}>
            {/* ✅ Left - Items */}
            <div style={styles.itemsBox}>
              {cart.map((item) => (
                <div key={item._id} style={styles.row}>
                  <img
                    src={item.image || "https://via.placeholder.com/120"}
                    alt={item.name}
                    style={styles.img}
                  />

                  <div style={{ flex: 1 }}>
                    <h4 style={styles.name}>{item.name}</h4>
                    <p style={styles.price}>₹{item.price}</p>

                    <div style={styles.qtyBox}>
                      <button
                        style={styles.qtyBtn}
                        onClick={() => {
                          updateQty(item._id, "dec");
                          load();
                        }}
                      >
                        -
                      </button>

                      <span style={styles.qtyText}>{item.qty}</span>

                      <button
                        style={styles.qtyBtn}
                        onClick={() => {
                          updateQty(item._id, "inc");
                          load();
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div style={styles.itemTotal}>
                    ₹{item.price * item.qty}
                  </div>
                </div>
              ))}

              <button
                style={styles.clearBtn}
                onClick={() => {
                  clearCart();
                  load();
                }}
              >
                ❌ Clear Cart
              </button>
            </div>

            {/* ✅ Right - Summary */}
            <div style={styles.summary}>
              <h3 style={{ marginBottom: "10px" }}>🧾 Price Details</h3>

              <div style={styles.summaryRow}>
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div style={styles.summaryRow}>
                <span>Delivery Fee</span>
                <span>₹{deliveryFee}</span>
              </div>

              <div style={styles.summaryRow}>
                <span>Discount</span>
                <span style={{ color: "#16a34a", fontWeight: "800" }}>
                  -₹{discount}
                </span>
              </div>

              <hr style={{ margin: "12px 0" }} />

              <div style={styles.totalRow}>
                <span>Total Payable</span>
                <span>₹{total}</span>
              </div>

              <button
                style={styles.checkoutBtn}
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout ✅
              </button>

              <p style={styles.smallText}>
                ✅ Free discount ₹50 on orders above ₹499
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "90vh",
    background: "linear-gradient(135deg, #f3f7ff, #eef2ff, #f8fafc)",
    padding: "30px 0",
  },

  container: {
    width: "92%",
    maxWidth: "1200px",
    margin: "auto",
  },

  heading: {
    fontSize: "28px",
    fontWeight: "900",
    marginBottom: "20px",
    color: "#111827",
  },

  emptyBox: {
    background: "white",
    borderRadius: "18px",
    padding: "35px",
    textAlign: "center",
    boxShadow: "0 18px 40px rgba(0,0,0,0.10)",
    maxWidth: "550px",
    margin: "auto",
  },

  shopBtn: {
    marginTop: "18px",
    padding: "12px 18px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(90deg, #2563eb, #9333ea)",
    color: "white",
    fontWeight: "800",
    cursor: "pointer",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "20px",
  },

  itemsBox: {
    background: "white",
    borderRadius: "18px",
    padding: "15px",
    boxShadow: "0 18px 40px rgba(0,0,0,0.10)",
  },

  row: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
    padding: "15px 0",
    borderBottom: "1px solid #e2e8f0",
  },

  img: {
    width: "110px",
    height: "110px",
    borderRadius: "16px",
    objectFit: "cover",
    border: "1px solid #e2e8f0",
  },

  name: {
    fontSize: "17px",
    fontWeight: "800",
    color: "#111827",
  },

  price: {
    marginTop: "4px",
    fontWeight: "800",
    color: "#16a34a",
  },

  qtyBox: {
    display: "flex",
    gap: "10px",
    marginTop: "12px",
    alignItems: "center",
  },

  qtyBtn: {
    width: "35px",
    height: "35px",
    border: "none",
    borderRadius: "10px",
    background: "#0f172a",
    color: "white",
    cursor: "pointer",
    fontWeight: "900",
    fontSize: "16px",
  },

  qtyText: {
    fontSize: "16px",
    fontWeight: "900",
    color: "#111827",
  },

  itemTotal: {
    fontWeight: "900",
    color: "#111827",
    minWidth: "70px",
    textAlign: "right",
  },

  clearBtn: {
    marginTop: "15px",
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #ef4444",
    background: "white",
    color: "#ef4444",
    fontWeight: "900",
    cursor: "pointer",
  },

  summary: {
    background: "white",
    borderRadius: "18px",
    padding: "18px",
    boxShadow: "0 18px 40px rgba(0,0,0,0.10)",
    height: "fit-content",
  },

  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "8px",
    color: "#334155",
    fontWeight: "700",
  },

  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight: "900",
    fontSize: "18px",
    color: "#111827",
  },

  checkoutBtn: {
    marginTop: "15px",
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(90deg, #16a34a, #22c55e)",
    color: "white",
    fontWeight: "900",
    cursor: "pointer",
    fontSize: "15px",
  },

  smallText: {
    marginTop: "12px",
    fontSize: "13px",
    color: "#64748b",
    textAlign: "center",
  },
};
