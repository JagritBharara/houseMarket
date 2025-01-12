import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PropertyList = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    // Fetch properties from the backend
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/property/getAllProperties`);
                setProperties(response.data.properties);
                console.log(properties);
                setLoading(false);
            } catch (err) {
                // setError(err.message);
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    if (loading) return <div>Loading properties...</div>;
    // if (error) return <div>Error: {error}</div>;

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
                            Description: {property.description}
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
        </div>
    );
    
};

export default PropertyList;
