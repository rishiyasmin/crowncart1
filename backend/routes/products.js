const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

/* ✅ GET ALL PRODUCTS */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ✅ ADD PRODUCT (POST) */
router.post("/", async (req, res) => {
  try {
    const { name, price, image, category } = req.body;

    if (!name || !price || !category) {
      return res
        .status(400)
        .json({ error: "name, price, category are required" });
    }

    const product = new Product({
      name,
      price,
      image: image || "",
      category,
    });

    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ✅ DELETE ALL PRODUCTS (MUST BE ABOVE /:id) */
router.delete("/all", async (req, res) => {
  try {
    await Product.deleteMany({});
    res.json({ message: "✅ All products deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ✅ DELETE PRODUCT BY ID */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "❌ Product not found" });
    }

    res.json({ message: "✅ Product deleted", deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ✅ UPDATE PRODUCT BY ID */
router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ error: "❌ Product not found" });
    }

    res.json({ message: "✅ Product updated", updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ✅ GET SINGLE PRODUCT
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
