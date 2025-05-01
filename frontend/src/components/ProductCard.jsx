import React from 'react';
import { Link } from 'react-router-dom';
import { getPlaceholderImage } from '../common';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-md overflow-hidden">
      <img
        src={getPlaceholderImage(product.name)}
        alt={product.name}
        className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold mb-1">{product.name}</h2>
        <p className="text-gray-700 text-sm mb-2 line-clamp-2">
          {product.description}
        </p>
        <p className="text-green-600 font-semibold mb-4">{product.price} Rs</p>

        <Link
          to={`/product/${product.id}`}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
