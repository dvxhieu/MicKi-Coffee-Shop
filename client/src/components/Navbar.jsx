import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-brown-600 text-brown shadow-lg">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center py-4">
        <Link
          to="/"
          className="text-2xl font-bold hover:text-brown-200 transition"
        >
          ☕ MicKi
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-brown-200 transition">
            Home
          </Link>
          <Link to="/menu" className="hover:text-brown-200 transition">
            Menu
          </Link>
          {user ? (
            <>
              {user.role === "admin" && (
                <Link to="/admin" className="hover:text-brown-200 transition">
                  Admin
                </Link>
              )}
              <span className="text-brown-200">{user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-brown-400 px-3 py-1 rounded hover:bg-brown-500 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-brown-200 transition">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-brown-400 px-3 py-1 rounded hover:bg-brown-500 transition"
              >
                Sign Up
              </Link>
            </>
          )}
          <Link to="/cart" className="relative hover:text-brown-200 transition">
            🛒 Cart
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
