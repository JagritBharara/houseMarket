const propertyModel = require('../models/houseModel');
const fs = require('fs'); // For file handling

// Add property with images
module.exports.addProperty = async (req, res) => {
    const { userId, amount, category, description, date,properyId } = req.body;

    try {
        // Validate required fields
        if (!userId || !amount || !category || !properyId) {
            return res.status(400).json({ message: 'Required fields are missing.' });
        }

        // Process uploaded images (if any)
        const images = req.files.map((file) => {
            const imageData = fs.readFileSync(file.path); // Read file as Buffer
            return {
                data: imageData,
                type: file.mimetype,
                filename: file.originalname
            };
        });

        // Create a new property
        const newProperty = new propertyModel({
            userId,
            properyId,
            amount,
            category,
            images,
            description,
            date
        });

        // Save the property to the database
        const savedProperty = await newProperty.save();

        // Clean up temporary files
        req.files.forEach((file) => fs.unlinkSync(file.path));

        // Send a response back to the client
        res.status(201).json({
            message: 'Property added successfully.',
            property: savedProperty
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while adding the property.', error: err.message });
    }
};

// Delete property
module.exports.getdeleteProperty = async (req, res) => {
    const { userId, propertyId } = req.body;

    try {
        console.log(userId);
            console.log(propertyId);
        // Validate inputs
        if (!userId || !propertyId) {
            console.log(userId);
            console.log(propertyId);
            return res.status(400).json({ message: 'Required fields are missing.' });
        }

        // Check if user exists
        const user = await propertyModel.findOne({ userId });
        if (!user) {
            return res.status(400).json({ message: 'Incorrect userId.' });
        }

        // Check if property exists
        const property = await propertyModel.findOne({ propertyId });
        if (!property) {
            return res.status(400).json({ message: 'Incorrect propertyId.' });
        }

        // Delete the property
        await propertyModel.deleteOne({ userId, propertyId });

        res.status(200).json({ message: 'Property deleted successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while deleting the property.', error: err.message });
    }
};

// Show all properties
module.exports.getAllProperties = async (req, res) => {
    try {
        const properties = await propertyModel.find(); // Fetch all properties
        res.status(200).json({
            message: 'Properties fetched successfully.',
            properties
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while fetching properties.', error: err.message });
    }
};