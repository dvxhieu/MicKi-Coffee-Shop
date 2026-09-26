import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Thêm check đơn giản ở frontend trước khi gọi API
    if (formData.password.length < 6) {
      alert("Mật khẩu phải có ít nhất 6 ký tự!");
      return;
    }

    setLoading(true);
    setError('');
    try {
      await register(formData.name, formData.email, formData.password);
      navigate("/");
    } catch (err) {
      setError("Đăng ký thất bại, email có thể đã tồn tại.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-amber-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm border border-brown-100">
        <h2 className="text-3xl font-bold text-brown-900 mb-2 text-center">
          Tạo tài khoản
        </h2>
        {error && <p className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <input
            type="text"
            placeholder="Họ tên"
            className="w-full px-4 py-3 border border-brown-200 rounded-xl focus:ring-2 focus:ring-brown-500 outline-none"
            required
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-brown-200 rounded-xl focus:ring-2 focus:ring-brown-500 outline-none"
            required
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            className="w-full px-4 py-3 border border-brown-200 rounded-xl focus:ring-2 focus:ring-brown-500 outline-none"
            required
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <button
            type="submit"
            className="w-full bg-brown-700 text-white py-3 rounded-xl font-bold hover:bg-brown-800 transition"
          >
            {loading ? "Đang tạo..." : "Đăng ký"}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Đã có tài khoản?{" "}
          <Link
            to="/login"
            className="text-brown-700 font-bold hover:underline"
          >
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}
