const propertyModel = require('../models/houseModel');
const fs = require('fs'); // For file handling

// Add property with images
module.exports.addProperty = async (req, res) => {
    const { amount, category, description, date, propertyId } = req.body;
    const userId = req.user.email; 

    try {
        if (!userId || !amount || !category || !propertyId) {
            return res.status(400).json({ message: 'Required fields are missing.' });
        }

        const images = req.files.map((file) => {
            const imageData = fs.readFileSync(file.path); // Read file as Buffer
            return {
                data: imageData,
                type: file.mimetype,
                filename: file.originalname
            };
        });

        const newProperty = new propertyModel({
            userId,
            propertyId,
            amount,
            category,
            images,
            description,
            date
        });

        const savedProperty = await newProperty.save();

        // Clean up files after saving
        req.files.forEach((file) => {
            try {
                if (fs.existsSync(file.path)) {
                    fs.unlinkSync(file.path);
                }
            } catch (err) {
                console.error(`Error deleting file: ${file.path}`, err);
            }
        });

        res.status(201).json({
            message: 'Property added successfully.',
            property: savedProperty
        });
    } catch (err) {
        console.error(err);

        // Clean up files in case of an error
        req.files.forEach((file) => {
            try {
                if (fs.existsSync(file.path)) {
                    fs.unlinkSync(file.path);
                }
            } catch (cleanupErr) {
                console.error(`Error cleaning up file: ${file.path}`, cleanupErr);
            }
        });

        res.status(500).json({
            message: 'An error occurred while adding the property.',
            error: err.message
        });
    }
};

// Delete property
module.exports.getdeleteProperty = async (req, res) => {
    const { propertyId } = req.body;
    const userId = req.user.email;

    try {
        // console.log(userId);
            // console.log(propertyId);
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
        const properties = await propertyModel.find();

        // Convert image buffers to Base64 strings
        const formattedProperties = properties.map((property) => ({
            ...property.toObject(),
            images: property.images.map((image) => ({
                data: image.data.toString('base64'), // Convert Buffer to Base64
                type: image.type,
            })),
        }));

        res.status(200).json({
            message: 'Properties fetched successfully.',
            properties: formattedProperties,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while fetching properties.', error: err.message });
    }
};

module.exports.getMyProperties = async(req,res)=>{
    const user = req.user;
    // console.log(user);
    try{
        const properties = await propertyModel.find({userId:user.email})
        // console.log(properties);
        const formattedProperties = properties.map((property) => ({
            ...property.toObject(),
            images: property.images.map((image) => ({
                data: image.data.toString('base64'), // Convert Buffer to Base64
                type: image.type,
            })),
        }));

        res.status(200).json({
            message: 'Properties fetched successfully.',
            properties: formattedProperties,
        });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'An error occurred while fetching Your properties.', error: err.message });
    }
};