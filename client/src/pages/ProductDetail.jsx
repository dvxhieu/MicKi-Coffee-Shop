import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productAPI } from '../services/api';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    productAPI.getById(id).then(({ data }) => {
      setProduct(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <p className="text-center py-20 text-gray-500">Loading...</p>;
  if (!product) return <p className="text-center py-20 text-red-500">Product not found</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link to="/menu" className="text-brown-600 underline mb-4 inline-block">&larr; Back to Menu</Link>
      <div className="grid md:grid-cols-2 gap-8">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-80 object-cover rounded-lg shadow-lg"
        />
        <div>
          <span className="text-xs bg-brown-100 text-brown-700 px-2 py-1 rounded capitalize">
            {product.category}
          </span>
          <h1 className="text-3xl font-bold text-brown-900 mt-3">{product.name}</h1>
          <p className="text-gray-600 mt-4 leading-relaxed">{product.description}</p>
          <div className="mt-4 flex items-center gap-4">
            <span className="text-3xl font-bold text-brown-600">{product.price.toLocaleString()}₫</span>
            <span className="text-sm text-gray-500">★ {product.rating}/5</span>
          </div>
          <div className="mt-4">
            <button
              onClick={() => addToCart(product)}
              className="bg-brown-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-brown-700 transition"
            >
              Add to Cart
            </button>
          </div>
          <p className="mt-4 text-sm text-gray-500">Origin: {product.origin}</p>
          <p className="text-sm text-gray-500">Stock: {product.stock} available</p>
        </div>
      </div>
    </div>
  );
}
