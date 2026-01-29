import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Checkout from "./pages/Checkout";
import ProductDetails from "./pages/ProductDetails";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import Terms from "./pages/Terms";
import Tracking from "./pages/Tracking";


export default function App() {
  return (
    <BrowserRouter>
      <div style={styles.app}>
        <Navbar />

        <div style={styles.content}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/tracking" element={<Tracking />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: 1, // ✅ pushes footer to bottom always
  },
};
