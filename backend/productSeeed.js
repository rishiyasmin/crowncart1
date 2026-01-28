const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/Product");

const products = [
  // ✅ Groceries (10)
  {
    name: "Fresh Apples (1kg)",
    price: 120,
    category: "groceries",
    image: "https://tse1.mm.bing.net/th/id/OIP._RroWF4BahiY4ZWXcACHVwHaEo?pid=Api&P=0&h=180",
    description: "Fresh and juicy apples",
    rating: 4.6,
    reviewsCount: 120,
  },
  {
    name: "Bananas (1 dozen)",
    price: 60,
    category: "groceries",
    image: "https://tse2.mm.bing.net/th/id/OIP.qt55q2ajfGQhrq_wJUkS8gHaE7?pid=Api&P=0&h=180",
    description: "Healthy bananas for daily energy",
    rating: 4.4,
    reviewsCount: 86,
  },
  {
    name: "Basmati Rice (5kg)",
    price: 499,
    category: "groceries",
    image: "https://tse1.mm.bing.net/th/id/OIP.Z4Iq3jWGFVNLz4c1BVfQCAHaE8?pid=Api&P=0&h=180",
    description: "Premium basmati rice",
    rating: 4.7,
    reviewsCount: 210,
  },
  {
    name: "Wheat Flour (5kg)",
    price: 220,
    category: "groceries",
    image: "https://tse1.mm.bing.net/th/id/OIP.UOCOdHUIwmJUJ29uzli9fgHaEJ?pid=Api&P=0&h=180",
    description: "Soft wheat flour for rotis",
    rating: 4.5,
    reviewsCount: 145,
  },
  {
    name: "Sugar (1kg)",
    price: 55,
    category: "groceries",
    image: "https://images.alphacoders.com/640/640708.jpg",
    description: "Pure refined sugar",
    rating: 4.3,
    reviewsCount: 78,
  },
  {
    name: "Salt (1kg)",
    price: 25,
    category: "groceries",
    image: "https://static.vecteezy.com/system/resources/previews/031/984/428/non_2x/salt-background-on-wooden-table-photo.jpg",
    description: "Iodized salt for daily use",
    rating: 4.2,
    reviewsCount: 60,
  },
  {
    name: "Sunflower Oil (1L)",
    price: 150,
    category: "groceries",
    image: "https://myhealthopedia.com/wp-content/uploads/2025/04/Sunflower-Oil-1.jpg",
    description: "Healthy sunflower cooking oil",
    rating: 4.4,
    reviewsCount: 133,
  },
  {
    name: "Milk (1L)",
    price: 58,
    category: "groceries",
    image: "https://wallpaperaccess.com/full/1751326.jpg",
    description: "Fresh dairy milk",
    rating: 4.5,
    reviewsCount: 96,
  },
  {
    name: "Eggs (12 pack)",
    price: 85,
    category: "groceries",
    image: "https://static.vecteezy.com/system/resources/previews/030/637/817/large_2x/eggs-image-hd-free-photo.jpg",
    description: "Farm fresh eggs",
    rating: 4.6,
    reviewsCount: 110,
  },
  {
    name: "Tea Powder (500g)",
    price: 180,
    category: "groceries",
    image: "https://tse1.mm.bing.net/th/id/OIP.MkmW5W8koambNUHQp17JSwHaD-?pid=Api&P=0&h=180",
    description: "Strong and aromatic tea powder",
    rating: 4.7,
    reviewsCount: 190,
  },

  // ✅ Electronics (10)
  {
    name: "Bluetooth Headphones",
    price: 999,
    category: "electronics",
    image: "https://m.media-amazon.com/images/I/51yYK4RGtLL.jpg",
    description: "Wireless headphones with deep bass",
    rating: 4.5,
    reviewsCount: 340,
  },
  {
    name: "Smart Watch",
    price: 1499,
    category: "electronics",
    image: "https://cdn.mos.cms.futurecdn.net/DxpaKaHPBL5yF8vBjh2MjX.jpg",
    description: "Fitness tracking smartwatch",
    rating: 4.4,
    reviewsCount: 280,
  },
  {
    name: "USB Type-C Cable",
    price: 199,
    category: "electronics",
    image: "https://png.pngtree.com/background/20230527/original/pngtree-group-of-usb-cable-on-a-black-background-picture-image_2760992.jpg",
    description: "Fast charging USB Type-C cable",
    rating: 4.2,
    reviewsCount: 150,
  },
  {
    name: "Power Bank 10000mAh",
    price: 899,
    category: "electronics",
    image: "https://tse1.mm.bing.net/th/id/OIP.couzh-FaDVwd8kqw72U_4gHaFV?pid=Api&P=0&h=180",
    description: "Portable charger for your phone",
    rating: 4.6,
    reviewsCount: 410,
  },
  {
    name: "Wireless Mouse",
    price: 499,
    category: "electronics",
    image: "https://m.media-amazon.com/images/I/61qpQ7ZsSmL._AC_SL1500_.jpg",
    description: "Smooth and silent wireless mouse",
    rating: 4.3,
    reviewsCount: 220,
  },
  {
    name: "Mechanical Keyboard",
    price: 1999,
    category: "electronics",
    image: "https://cdn.shopify.com/s/files/1/0059/0630/1017/t/5/assets/keychronv6100layoutqmkviacustommechanicalkeyboard3-1667442346778.jpg?v=1667442349",
    description: "RGB mechanical gaming keyboard",
    rating: 4.7,
    reviewsCount: 310,
  },
  {
    name: "Bluetooth Speaker",
    price: 1299,
    category: "electronics",
    image: "https://m.media-amazon.com/images/I/71L9o0-0SML._AC_.jpg",
    description:
     "Loud speaker with clear sound",
    rating: 4.5,
    reviewsCount: 265,
  },
  {
    name: "Smart LED Bulb",
    price: 349,
    category: "electronics",
    image: "https://tse3.mm.bing.net/th/id/OIP.DXodlrj3qaIqFHdMCCywcQHaFj?pid=Api&P=0&h=180",
    description: "WiFi bulb with color modes",
    rating: 4.3,
    reviewsCount: 180,
  },
  {
    name: "Laptop Stand",
    price: 699,
    category: "electronics",
    image: "https://i.pinimg.com/originals/8d/9c/1f/8d9c1f0aa7e45c2cbd998ef8dea799e6.jpg",
    description: "Ergonomic stand for better posture",
    rating: 4.4,
    reviewsCount: 140,
  },
  {
    name: "32GB Pendrive",
    price: 299,
    category: "electronics",
    image: "https://tse3.mm.bing.net/th/id/OIP.jGX-6XYLgyuM5EnAch9t-wHaE8?pid=Api&P=0&h=180",
    description: "High speed USB 3.0 pendrive",
    rating: 4.2,
    reviewsCount: 210,
  },

  // ✅ Accessories (10)
  {
    name: "Leather Wallet",
    price: 399,
    category: "accessories",
    image: "https://tse3.mm.bing.net/th/id/OIP.y9IHR4UWqMxu7HfVD-7OygHaF7?pid=Api&P=0&h=180",
    description: "Premium quality wallet",
    rating: 4.4,
    reviewsCount: 170,
  },
  {
    name: "Sunglasses",
    price: 599,
    category: "accessories",
    image: "https://tse3.mm.bing.net/th/id/OIP.j_-KzDBmLd0AG-OmhNZqWQHaE8?pid=Api&P=0&h=180",
    description: "Stylish UV protection sunglasses",
    rating: 4.3,
    reviewsCount: 130,
  },
  {
    name: "Analog Watch",
    price: 999,
    category: "accessories",
    image: "https://i5.walmartimages.com/seo/Casio-Large-Analog-Watch_c582de7c-a419-43e4-86ae-5f47acbbc109.841a21110b9323260c44968d25b459e8.jpeg",
    description: "Classic design wrist watch",
    rating: 4.5,
    reviewsCount: 210,
  },
  {
    name: "Backpack",
    price: 799,
    category: "accessories",
    image: "https://tse4.mm.bing.net/th/id/OIP.zJpMF4cmH_qrPTmo8HKzUgHaIo?pid=Api&P=0&h=180",
    description: "Spacious travel backpack",
    rating: 4.6,
    reviewsCount: 250,
  },
  {
    name: "Travel Water Bottle",
    price: 249,
    category: "accessories",
    image: "https://m.media-amazon.com/images/I/71f5aocZpuL._AC_.jpg",
    description: "Leakproof reusable bottle",
    rating: 4.4,
    reviewsCount: 160,
  },
  {
    name: "Cap (Adjustable)",
    price: 199,
    category: "accessories",
    image: "https://tse2.mm.bing.net/th/id/OIP.vDEb3O3AzoWT0du7Vvm0QgHaFt?pid=Api&P=0&h=180",
    description: "Comfortable cotton cap",
    rating: 4.2,
    reviewsCount: 95,
  },
  {
    name: "Keychain Set",
    price: 149,
    category: "accessories",
    image: "https://m.media-amazon.com/images/I/71kqkMDk12L._AC_SL1500_.jpg",
    description: "Stylish keychain set",
    rating: 4.1,
    reviewsCount: 70,
  },
  {
    name: "Perfume (50ml)",
    price: 699,
    category: "accessories",
    image: "https://media.glamourmagazine.co.uk/photos/639362467b473e3dc755fb1e/16:9/w_2580,c_limit/BEST%20PERFUME%20FOR%20WOMEN%2091222_SF.jpg?mbid=social_retweet",
    description: "Long lasting fragrance",
    rating: 4.5,
    reviewsCount: 220,
  },
  {
    name: "Belt (Leather)",
    price: 499,
    category: "accessories",
    image: "https://tse1.mm.bing.net/th/id/OIP.kMgstq8F9G1Yr2cvL-kE4QHaHa?pid=Api&P=0&h=180",
    description: "Strong leather belt",
    rating: 4.3,
    reviewsCount: 115,
  },
  {
    name: "Bluetooth Earbuds Case Cover",
    price: 199,
    category: "accessories",
    image: "https://m.media-amazon.com/images/I/712VLI09jCL._AC_SL1500_.jpg",
    description: "Soft protective case cover",
    rating: 4.2,
    reviewsCount: 80,
  },
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    // ✅ Clear existing products
    await Product.deleteMany();
    console.log("✅ Old products deleted");

    // ✅ Insert new products
    await Product.insertMany(products);
    console.log("✅ 30 Products inserted successfully");

    process.exit();
  } catch (err) {
    console.log("❌ Seeding error:", err);
    process.exit(1);
  }
}

seedProducts();