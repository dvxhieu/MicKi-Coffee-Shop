import Product from "../models/Product.js";
import mongoose from "mongoose";

const seedProducts = [
  {
    name: "Espresso Arabica",
    description:
      "Bold and rich single-origin espresso from high-altitude farms.",
    price: 35000,
    category: "espresso",
    image:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=400",
    stock: 100,
    origin: "Colombia",
    rating: 4.8,
  },
  {
    name: "Classic Latte",
    description: "Smooth steamed milk layered with rich espresso.",
    price: 40000,
    category: "latte",
    image:
      "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80&w=400",
    stock: 80,
    origin: "Ethiopia",
    rating: 4.7,
  },
  {
    name: "Velvet Cappuccino",
    description: "Perfect ratio of espresso, steamed milk, and foam.",
    price: 42000,
    category: "cappuccino",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&q=80&w=400",
    stock: 60,
    origin: "Brazil",
    rating: 4.9,
  },
  {
    name: "Iced Cold Brew",
    description: "Slow-steeped 24 hours for smooth, refreshing cold coffee.",
    price: 45000,
    category: "cold-drink",
    image:
      "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&q=80&w=400",
    stock: 50,
    origin: "Kenya",
    rating: 4.6,
  },
  {
    name: "Premium Robusta Beans",
    description: "100% Arabica beans, medium roast, whole bean.",
    price: 280000,
    category: "beans",
    image:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=400",
    stock: 200,
    origin: "Sumatra",
    rating: 4.5,
  },
  {
    name: "French Press Set",
    description: "Borosilicate glass French press with bamboo lid.",
    price: 550000,
    category: "accessories",
    image:
      "https://images.unsplash.com/photo-1517668808772-bd14b96af49b?auto=format&fit=crop&q=80&w=400",
    stock: 30,
    origin: "France",
    rating: 4.4,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/micki-coffee",
    );
    await Product.deleteMany({});
    await Product.insertMany(seedProducts);
    console.log("✅ Seed products created");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDB();
