import React, { useState } from 'react';

const AddProperty = () => {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    propertyId: '',
    images: null, // Changed to store multiple files
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    // Convert the FileList to an array and set it in state
    setFormData({ ...formData, images: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to handle file uploads
    const form = new FormData();
    form.append('amount', formData.amount);
    form.append('category', formData.category);
    form.append('description', formData.description);
    form.append('propertyId', formData.propertyId);

    // Append multiple files (if any)
    if (formData.images) {
      for (let i = 0; i < formData.images.length; i++) {
        form.append('images', formData.images[i]);
      }
    }

    try {
      const response = await fetch('http://localhost:3000/property/addProperty', {
        method: 'POST',
        headers: {
          // Add authorization headers if needed
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: form,
      });

      const result = await response.json();

      if (response.ok) {
        alert('Property added successfully!');
      } else {
        alert('Error adding property: ' + result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong while adding the property.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Add New Property</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Property ID */}
        <div className="flex flex-col">
          <label htmlFor="propertyId" className="text-sm font-medium text-gray-600">Property ID</label>
          <input
            type="text"
            id="propertyId"
            name="propertyId"
            value={formData.propertyId}
            onChange={handleChange}
            placeholder="Enter property ID"
            className="p-3 rounded-md border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Amount */}
        <div className="flex flex-col">
          <label htmlFor="amount" className="text-sm font-medium text-gray-600">Amount</label>
          <input
            type="text"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter property amount"
            className="p-3 rounded-md border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <label htmlFor="category" className="text-sm font-medium text-gray-600">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="p-3 rounded-md border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Category</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="industrial">Industrial</option>
          </select>
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label htmlFor="description" className="text-sm font-medium text-gray-600">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter property description"
            className="p-3 rounded-md border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Image Upload */}
        <div className="flex flex-col">
          <label htmlFor="images" className="text-sm font-medium text-gray-600">Upload Images (Multiple)</label>
          <input
            type="file"
            id="images"
            name="images"
            accept="image/*"
            multiple // Enable multiple file selection
            onChange={handleFileChange}
            className="p-3 rounded-md border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-4 p-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-500 transition duration-200"
        >
          Add Property
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
