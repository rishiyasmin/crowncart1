const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    mrp: { type: Number, required: true },   // ✅ Original price
    price: { type: Number, required: true }, // ✅ Offer price

    image: { type: String, default: "" },

    category: {
      type: String,
      required: true,
      enum: ["groceries", "accessories", "electronics"],
    },

    rating: { type: Number, default: 4.2 },

    description: { type: String, default: "Best quality product" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
