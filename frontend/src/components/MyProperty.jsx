import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import axios from 'axios';

const MyProperty = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Check login status
    useEffect(() => {
        const token = localStorage.getItem('token'); // Assuming the token is stored in `localStorage` under `token`
        if (!token) {
            navigate('/signin'); // Redirect to the login page
        }
    }, [navigate]);

    // Fetch properties from the backend
    const fetchProperties = async () => {
        try {
            const token = localStorage.getItem('token'); // Retrieve token
            if (!token) {
                throw new Error('Authentication token is missing.');
            }

            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/property/myProperties`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include token in the request header
                },
            });

            setProperties(response.data.properties || []); // Default to an empty array
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch properties. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties(); // Fetch properties when the component mounts
    }, []);

    const handleDelete = async (propertyId) => {
        try {
            const token = localStorage.getItem('token'); // Retrieve token
            if (!token) {
                throw new Error('Authentication token is missing.');
            }

            // Send the propertyId as the only data in the request body
            await axios.post(`${import.meta.env.VITE_BASE_URL}/property/deleteProperty`, {
                propertyId: propertyId, // Only sending propertyId as requested
            }, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include token in the request header
                },
            });

            // After deletion, fetch the properties again to reload the list
            fetchProperties();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete property. Please try again later.');
        }
    };

    if (loading) return <div>Loading properties...</div>;

    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="container mx-auto p-6">
            {properties.length === 0 ? (
                <h1 className="text-xl font-bold text-gray-600">No properties listed.</h1>
            ) : (
                <>
                    <h1 className="text-2xl font-bold mb-6">My Properties</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {properties.map((property) => (
                            <div
                                key={property._id}
                                className="border rounded-lg shadow p-4 bg-white"
                            >
                                <h2 className="text-lg font-semibold mb-2">
                                    {property.category}
                                </h2>
                                <p className="text-sm text-gray-600">
                                    Amount: ${property.amount}
                                </p>
                                <p className="text-sm text-gray-600">
                                    PropertyId: {property.propertyId}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Description: {property.description || 'No description available'}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Date: {new Date(property.date).toLocaleDateString()}
                                </p>
                                <div className="flex flex-wrap mt-4">
                                    {property.images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={`data:${image.type};base64,${image.data}`}
                                            alt="Property"
                                            className="w-24 h-24 mr-4 rounded"
                                        />
                                    ))}
                                </div>
                                <button
                                    onClick={() => handleDelete(property.propertyId)} // Delete button calls handleDelete with propertyId
                                    className="mt-4 inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-500"
                                >
                                    Delete Property
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default MyProperty;
