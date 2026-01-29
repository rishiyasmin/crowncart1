import { useState } from "react";
import { clearCart, getCart } from "../utils/cart";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const cart = getCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // ✅ Delivery Fee Logic
  // ✅ Above or equal 999 => Free Delivery
  // ✅ Below 999 => 99 delivery charge
  const deliveryFee = total >= 999 ? 0 : 99;
  const grandTotal = total + deliveryFee;

  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullname: "",
    phone: "",
    street: "",
    city: "",
    pincode: "",
  });

  // ✅ Payment Method
  const [paymentMethod, setPaymentMethod] = useState(""); // "cod" | "online"
  const [onlineMethod, setOnlineMethod] = useState(""); // "upi" | "card" | "netbanking"
  const [loadingPay, setLoadingPay] = useState(false);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (
      !address.fullname ||
      !address.phone ||
      !address.street ||
      !address.city ||
      !address.pincode
    ) {
      alert("❌ Fill all address fields");
      return false;
    }

    if (!paymentMethod) {
      alert("❌ Please select payment method");
      return false;
    }

    if (paymentMethod === "online" && !onlineMethod) {
      alert("❌ Please select Online Payment option (UPI/Card/NetBanking)");
      return false;
    }

    if (cart.length === 0) {
      alert("❌ Cart is empty");
      return false;
    }

    return true;
  };

  // ✅ Demo Payment Handler
  const handleOnlinePayment = async () => {
    setLoadingPay(true);

    // ✅ Simulate payment process (2 seconds)
    setTimeout(() => {
      setLoadingPay(false);
      alert("✅ Payment Successful!");
      placeOrderFinal();
    }, 2000);
  };

  // ✅ Final Order Placement
  const placeOrderFinal = () => {
    alert("✅ Order Placed Successfully!");
    clearCart();
    window.dispatchEvent(new Event("cartUpdated"));
    navigate("/tracking");
  };

  // ✅ Click Place Order
  const placeOrder = () => {
    if (!validateForm()) return;

    if (paymentMethod === "cod") {
      // ✅ COD direct order
      placeOrderFinal();
    } else {
      // ✅ Online payment first
      handleOnlinePayment();
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>✅ Checkout</h2>

        {/* ✅ Address */}
        <h3 style={styles.sectionTitle}>📍 Delivery Address</h3>

        <input
          name="fullname"
          placeholder="Full Name"
          value={address.fullname}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          name="phone"
          placeholder="Phone Number"
          value={address.phone}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          name="street"
          placeholder="Street Address"
          value={address.street}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          name="city"
          placeholder="City"
          value={address.city}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          name="pincode"
          placeholder="Pincode"
          value={address.pincode}
          onChange={handleChange}
          style={styles.input}
        />

        {/* ✅ Payment Method */}
        <h3 style={styles.sectionTitle}>💳 Payment Method</h3>

        <div style={styles.radioBox}>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={() => {
                setPaymentMethod("cod");
                setOnlineMethod("");
              }}
            />
            <span style={styles.radioText}>Cash on Delivery (COD)</span>
          </label>

          <label style={styles.radioLabel}>
            <input
              type="radio"
              name="payment"
              value="online"
              checked={paymentMethod === "online"}
              onChange={() => setPaymentMethod("online")}
            />
            <span style={styles.radioText}>Online Payment</span>
          </label>
        </div>

        {/* ✅ Online Payment Options */}
        {paymentMethod === "online" && (
          <div style={styles.onlineBox}>
            <p style={styles.smallNote}>Select Online Payment option:</p>

            <div style={styles.radioBox}>
              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  name="online"
                  value="upi"
                  checked={onlineMethod === "upi"}
                  onChange={() => setOnlineMethod("upi")}
                />
                <span style={styles.radioText}>📱 UPI</span>
              </label>

              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  name="online"
                  value="card"
                  checked={onlineMethod === "card"}
                  onChange={() => setOnlineMethod("card")}
                />
                <span style={styles.radioText}>💳 Debit / Credit Card</span>
              </label>

              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  name="online"
                  value="netbanking"
                  checked={onlineMethod === "netbanking"}
                  onChange={() => setOnlineMethod("netbanking")}
                />
                <span style={styles.radioText}>🏦 NetBanking</span>
              </label>
            </div>
          </div>
        )}

        {/* ✅ Bill Summary */}
        <h3 style={styles.sectionTitle}>🧾 Bill Summary</h3>

        <div style={styles.summaryRow}>
          <span>Total Items</span>
          <span style={{ fontWeight: "900" }}>{cart.length}</span>
        </div>

        <div style={styles.summaryRow}>
          <span>Sub Total</span>
          <span style={{ fontWeight: "900" }}>₹{total}</span>
        </div>

        <div style={styles.summaryRow}>
          <span>Delivery Fee</span>
          <span style={{ fontWeight: "900", color: "#16a34a" }}>
            ₹{deliveryFee}
          </span>
        </div>

        {/* ✅ Free Delivery Note */}
        {total >= 999 ? (
          <p style={styles.freeNote}>✅ Free Delivery applied (Above ₹999)</p>
        ) : (
          <p style={styles.freeNote}>
            ⚠️ Add ₹{999 - total} more to get Free Delivery!
          </p>
        )}

        <div style={styles.summaryRow}>
          <span>Total Payable</span>
          <span style={styles.totalPrice}>₹{grandTotal}</span>
        </div>

        {/* ✅ Place Order */}
        <button
          onClick={placeOrder}
          style={{
            ...styles.btn,
            opacity: loadingPay ? 0.6 : 1,
            cursor: loadingPay ? "not-allowed" : "pointer",
          }}
          disabled={loadingPay}
        >
          {loadingPay
            ? "Processing Payment..."
            : paymentMethod === "online"
            ? "Pay Now & Place Order"
            : "Place Order"}
        </button>
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
    maxWidth: "650px",
    background: "white",
    borderRadius: "18px",
    padding: "28px",
    boxShadow: "0 18px 40px rgba(0,0,0,0.12)",
  },

  title: {
    fontSize: "26px",
    fontWeight: "950",
    marginBottom: "15px",
    color: "#111827",
  },

  sectionTitle: {
    marginTop: "18px",
    marginBottom: "10px",
    fontSize: "17px",
    fontWeight: "900",
    color: "#111827",
  },

  input: {
    width: "100%",
    padding: "12px",
    margin: "8px 0",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    outline: "none",
    fontSize: "14px",
  },

  radioBox: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "10px",
  },

  radioLabel: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontWeight: "800",
    color: "#334155",
    fontSize: "14px",
  },

  radioText: {
    fontWeight: "800",
  },

  onlineBox: {
    marginTop: "12px",
    padding: "14px",
    background: "#f8fafc",
    borderRadius: "14px",
    border: "1px solid #e2e8f0",
  },

  smallNote: {
    margin: "0 0 8px",
    fontSize: "13px",
    fontWeight: "800",
    color: "#475569",
  },

  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid #e2e8f0",
    fontWeight: "700",
    color: "#111827",
  },

  totalPrice: {
    fontWeight: "950",
    fontSize: "18px",
    color: "#16a34a",
  },

  freeNote: {
    marginTop: "10px",
    fontSize: "13px",
    fontWeight: "850",
    color: "#475569",
  },

  btn: {
    width: "100%",
    padding: "14px",
    marginTop: "18px",
    border: "none",
    borderRadius: "14px",
    background: "linear-gradient(90deg, #2563eb, #9333ea)",
    color: "white",
    fontWeight: "950",
    fontSize: "15px",
  },
};
