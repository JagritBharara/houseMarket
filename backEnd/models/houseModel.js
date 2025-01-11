const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    data: {
        type: Buffer, // Binary data for the image
        required: true
    },
    type: {
        type: String, // MIME type (e.g., 'image/jpeg', 'image/png')
        required: true
    },
    filename: {
        type: String, // Original file name
        required: true
    },
    uploadedAt: {
        type: Date, // Timestamp for when the image was uploaded
        default: Date.now
    }
});

const houseSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    propertyId:{
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ['residential', 'commercial', 'industrial'],
        required: true
    },
    images: [imageSchema], // Array of images using the `imageSchema`
    description: {
        type: String
    },
    date: { 
        type: Date, default: Date.now() 
    }
});

// Export the model
module.exports = mongoose.model('House', houseSchema);
