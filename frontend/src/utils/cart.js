// ✅ Get cart
export const getCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

// ✅ Save cart
export const saveCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));

  // ✅ trigger navbar update every time cart changes
  window.dispatchEvent(new Event("cartUpdated"));
};

// ✅ Add to cart
export const addToCart = (product) => {
  let cart = getCart();

  const existing = cart.find((item) => item._id === product._id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart(cart); // ✅ auto triggers navbar update
};

// ✅ Update quantity
export const updateQty = (_id, type) => {
  let cart = getCart();

  const item = cart.find((p) => p._id === _id);
  if (!item) return;

  if (type === "inc") item.qty += 1;
  if (type === "dec") item.qty -= 1;

  // ✅ remove if qty becomes 0
  cart = cart.filter((p) => p.qty > 0);

  saveCart(cart); // ✅ triggers navbar update
};

// ✅ Remove item completely
export const removeItem = (_id) => {
  let cart = getCart();
  cart = cart.filter((p) => p._id !== _id);

  saveCart(cart); // ✅ triggers navbar update
};

// ✅ Clear entire cart
export const clearCart = () => {
  saveCart([]); // ✅ triggers navbar update
};
