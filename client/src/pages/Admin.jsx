import React, { useState, useEffect } from 'react';
import { productAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Admin() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', price: '', category: 'espresso', stock: '', origin: '' });

  useEffect(() => {
    productAPI.getAll({ limit: 100 }).then(({ data }) => setProducts(data.products));
  }, []);

  if (!user || user.role !== 'admin') {
    return <p className="text-center py-20 text-red-500">Access denied. Admin only.</p>;
  }

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await productAPI.create({ ...form, price: Number(form.price), stock: Number(form.stock) });
      setShowForm(false);
      setForm({ name: '', description: '', price: '', category: 'espresso', stock: '', origin: '' });
      productAPI.getAll({ limit: 100 }).then(({ data }) => setProducts(data.products));
    } catch (err) {
      alert('Failed to create product');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    await productAPI.delete(id);
    productAPI.getAll({ limit: 100 }).then(({ data }) => setProducts(data.products));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-brown-800">Admin Dashboard</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-brown-600 text-white px-4 py-2 rounded-lg hover:bg-brown-700 transition"
        >
          {showForm ? 'Cancel' : '+ Add Product'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-brown-50 p-6 rounded-lg mb-8 space-y-4">
          <h3 className="font-bold text-lg text-brown-800">New Product</h3>
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Price (₫)"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="px-4 py-2 border rounded-lg"
              required
            />
            <input
              type="number"
              placeholder="Stock"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              className="px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="espresso">Espresso</option>
              <option value="latte">Latte</option>
              <option value="cappuccino">Cappuccino</option>
              <option value="cold-drink">Cold Drink</option>
              <option value="beans">Beans</option>
              <option value="accessories">Accessories</option>
            </select>
            <input
              placeholder="Origin"
              value={form.origin}
              onChange={(e) => setForm({ ...form, origin: e.target.value })}
              className="px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
            Create Product
          </button>
        </form>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-brown-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Stock</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b hover:bg-brown-50">
                <td className="px-4 py-3 font-medium">{product.name}</td>
                <td className="px-4 py-3 capitalize">{product.category}</td>
                <td className="px-4 py-3">{product.price.toLocaleString()}₫</td>
                <td className="px-4 py-3">{product.stock}</td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
