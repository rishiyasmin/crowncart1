const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, default: "" },

    category: {
      type: String,
      required: true,
      enum: ["groceries", "accessories", "electronics"], // ✅ correct
    },

    rating: { type: Number, default: 4.2 },
    reviews: { type: Number, default: 120 },
    description: { type: String, default: "Best quality product" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
