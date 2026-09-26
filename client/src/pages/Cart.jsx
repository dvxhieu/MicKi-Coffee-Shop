import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, total, removeFromCart, updateQuantity, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold text-brown-800 mb-4">Your Cart</h2>
        <p className="text-gray-500 mb-6">Your cart is empty.</p>
        <Link to="/menu" className="bg-brown-600 text-white px-6 py-3 rounded-lg hover:bg-brown-700 transition">
          Browse Menu
        </Link>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-brown-800 mb-8">Shopping Cart</h2>
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item._id} className="flex items-center gap-4 bg-white p-4 rounded-lg shadow">
            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
            <div className="flex-grow">
              <h4 className="font-bold text-brown-900">{item.name}</h4>
              <p className="text-brown-600">{item.price.toLocaleString()}₫</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                className="w-8 h-8 bg-brown-100 rounded hover:bg-brown-200 transition"
              >
                −
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                className="w-8 h-8 bg-brown-100 rounded hover:bg-brown-200 transition"
              >
                +
              </button>
            </div>
            <span className="font-bold text-brown-700 w-24 text-right">
              {(item.price * item.quantity).toLocaleString()}₫
            </span>
            <button
              onClick={() => removeFromCart(item._id)}
              className="text-red-500 hover:text-red-700 transition"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="bg-brown-50 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold text-brown-900">Total</span>
          <span className="text-2xl font-bold text-brown-700">{total.toLocaleString()}₫</span>
        </div>
        <div className="flex gap-4">
          <button
            onClick={clearCart}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300 transition"
          >
            Clear Cart
          </button>
          <button className="bg-brown-600 text-white px-8 py-2 rounded-lg hover:bg-brown-700 transition">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </section>
  );
}
