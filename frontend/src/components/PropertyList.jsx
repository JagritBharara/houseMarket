import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

const PropertyList = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const [totalPages, setTotalPages] = useState(1); // Track total pages

    // Fetch properties from the backend
    const fetchProperties = async (page) => {
        try {
            setLoading(true); // Set loading to true before fetching data
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/property/getAllProperties?page=${page}`);
            setProperties(response.data.properties);
            setTotalPages(response.data.totalPages);
            setLoading(false); // Set loading to false after data is fetched
        } catch (err) {
            setLoading(false); // Handle errors and stop loading
            console.error(err);
        }
    };

    // Fetch properties when component mounts or page changes
    useEffect(() => {
        fetchProperties(currentPage);
    }, [currentPage]);

    if (loading) return <div>Loading properties...</div>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Properties</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                    <div
                        key={property._id}
                        className="border rounded-lg shadow p-4 bg-white"
                    >
                        <h2 className="text-lg font-semibold mb-2">{property.category}</h2>
                        <p className="text-sm text-gray-600">Amount: ${property.amount}</p>
                        <p className="text-sm text-gray-600">
                            Address: {property.description}
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
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-6">
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="inline-flex items-center p-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                >
                    <ChevronLeftIcon className="w-5 h-5" />
                    Previous
                </button>
                <span className="text-sm text-gray-700">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="inline-flex items-center p-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                >
                    Next
                    <ChevronRightIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default PropertyList;

