import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      enum: ['espresso', 'latte', 'cappuccino', 'cold-drink', 'beans', 'accessories'],
      required: true,
    },
    image: { type: String, default: '' },
    stock: { type: Number, default: 0, min: 0 },
    origin: { type: String, default: '' },
    rating: { type: Number, default: 0, min: 0, max: 5 },
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
