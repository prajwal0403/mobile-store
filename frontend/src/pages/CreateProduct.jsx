import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios'; // Assuming you have an axios instance setup
import toast from 'react-hot-toast';

const CreateEditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Check if there's an 'id' param (edit mode)
  
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
  });
  

  useEffect(() => {
    if (id) {
      // Fetch product details for editing if there's an ID in the URL
      const fetchProductDetails = async () => {
        try {
          const response = await api.get(`/products/${id}`);
          setProduct(response.data);
        } catch (err) {
          console.error('Error fetching product details:', err);
        }
      };

      fetchProductDetails();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // Edit product
        await api.put(`/products/${id}`, product);
        toast.success('Product updated successfully!');
      } else {
        // Create new product
        await api.post('/products', product);
        toast.success('Product created successfully!');
      }

      navigate('/admin-home'); // Redirect to admin home page
    } catch (err) {
      console.error('Error submitting form:', err);
      toast.error('Error submitting form');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-semibold text-center mb-6">
        {id ? 'Edit Product' : 'Create New Product'}
      </h1>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-md shadow-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          {id ? 'Update Product' : 'Create Product'}
        </button>
      </form>
    </div>
  );
};

export default CreateEditProduct;
