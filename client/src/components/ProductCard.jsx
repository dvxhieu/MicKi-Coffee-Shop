import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <span className="text-xs bg-brown-100 text-brown-700 px-2 py-1 rounded capitalize">
          {product.category}
        </span>
        <h3 className="font-bold text-lg mt-2 text-brown-900">{product.name}</h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center mt-3">
          <span className="text-brown-600 font-bold text-xl">
            {product.price.toLocaleString()}₫
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => addToCart(product)}
              className="bg-brown-600 text-white px-3 py-1 rounded text-sm hover:bg-brown-700 transition"
            >
              Add
            </button>
            <Link
              to={`/menu/${product._id}`}
              className="text-brown-600 text-sm underline hover:text-brown-800"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
