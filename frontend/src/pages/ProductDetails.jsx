import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios'; // Adjust path as needed
import { getPlaceholderImage } from '../common';

const ProductDetails = () => {
  const { id } = useParams(); // Assuming product ID is in URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error('Failed to fetch product details:', err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="text-center mt-10 text-lg text-gray-600">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
         <img
            src={getPlaceholderImage(product.name)}
            alt={product.name}
            className="w-40 h-40 rounded-full mx-auto mb-4 object-cover"
          />
        <h1 className="text-3xl font-bold mb-4 py-5">{product.name}</h1>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold text-3xl">Price: ₹{product.price} </span>
        </p>
        <p className="text-gray-700 mb-2 py-4">
          <span className="font-semibold text-xl">Description:</span> {product.description}
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;
