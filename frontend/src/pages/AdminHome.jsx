import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { getPlaceholderImage } from '../common';

const AdminHome = () => {
  const user = useSelector((state) => state.auth.user);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchAdminProducts = async () => {
      try {
        const res = await api.get(`/products?admin=${user.email}`);
        setProducts(res.data);
      } catch (err) {
        console.error('Failed to fetch products', err);
      }
    };

    fetchAdminProducts();
  }, [user.id]);

  const handleDelete = async (productId) => {
    try {
      await api.delete(`/products/${productId}`);
      setProducts(products.filter((product) => product.id !== productId));
    } catch (err) {
      console.error('Failed to delete product', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>

      <div className="flex justify-end mb-6">
        <Link
          to="/create-product"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          + Create Product
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow p-4 flex flex-col">
            <img
              src={getPlaceholderImage(product.name)}
              alt={product.name}
              className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
            />
            <h2 className="text-lg font-semibold text-center mb-2">{product.name}</h2>
            <p className="text-gray-600 text-sm text-center line-clamp-2 mb-4">
              {product.description}
            </p>
            <p className='py-5 text-semibold'>{`${product.price} Rs`}</p>
            <div className="mt-auto flex justify-between items-center text-sm">
              <Link
                to={`/product/${product.id}`}
                className="text-blue-600 hover:underline"
              >
                View
              </Link>
              <div className="flex gap-3">
                <Link
                  to={`/edit-product/${product.id}`}
                  className="text-yellow-600 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-red-600 hover:underline cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHome;
