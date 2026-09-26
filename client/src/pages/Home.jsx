import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productAPI } from '../services/api';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    productAPI.getAll({ category: 'all', limit: 6 }).then(({ data }) => setFeatured(data.products));
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative h-[70vh] bg-cover bg-center flex items-center justify-center text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1920')`,
        }}
      >
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Wake up with MicKi</h1>
          <p className="text-xl mb-8 text-brown-100">Premium coffee, roasted to perfection.</p>
          <Link to="/menu" className="bg-brown-500 text-white px-8 py-3 rounded-lg text-lg hover:bg-brown-600 transition">
            Explore Menu
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-brown-800 mb-8 text-center">Featured Coffees</h2>
        {featured.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading...</p>
        )}
      </section>
    </div>
  );
}
