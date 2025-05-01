import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios'; // Adjust API import based on your project structure
import ProductCard from '../components/ProductCard';

const CustomerHome = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await api.get('/products/all');
        setProducts(res.data);
      } catch (err) {
        console.error('Failed to fetch products', err);
      }
    };

    fetchAllProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-semibold text-center mb-6">All Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-lg rounded-md p-4">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerHome;
