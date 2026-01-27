import { useState } from "react";
import { clearCart, getCart } from "../utils/cart";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullname: "",
    phone: "",
    street: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const placeOrder = () => {
    if (
      !address.fullname ||
      !address.phone ||
      !address.street ||
      !address.city ||
      !address.pincode
    ) {
      alert("Fill all address fields ❌");
      return;
    }

    alert("✅ Order Placed Successfully!");
    clearCart();
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>✅ Checkout</h2>

      <h3>📍 Delivery Address</h3>

      <input name="fullname" placeholder="Full Name" value={address.fullname} onChange={handleChange} style={styles.input} />
      <input name="phone" placeholder="Phone Number" value={address.phone} onChange={handleChange} style={styles.input} />
      <input name="street" placeholder="Street Address" value={address.street} onChange={handleChange} style={styles.input} />
      <input name="city" placeholder="City" value={address.city} onChange={handleChange} style={styles.input} />
      <input name="pincode" placeholder="Pincode" value={address.pincode} onChange={handleChange} style={styles.input} />

      <h3>🧾 Bill Summary</h3>
      <p>Total Items: {cart.length}</p>
      <h2>Total Payable: ₹{total}</h2>

      <button onClick={placeOrder} style={styles.btn}>
        Place Order
      </button>
    </div>
  );
}

const styles = {
  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "8px",
    border: "1px solid gray",
  },
  btn: {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    border: "none",
    borderRadius: "8px",
    background: "black",
    color: "white",
    cursor: "pointer",
    fontSize: "16px",
  },
};
