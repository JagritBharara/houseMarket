const mongoose = require('mongoose');

const blacklistedTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true, // Ensures no duplicate tokens are added
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set to the current time
        expires: 86400, // TTL index: document expires after 24 hours (86400 seconds)
    },
});

// Create the model from the schema
const BlacklistedToken = mongoose.model('BlacklistedToken', blacklistedTokenSchema);

module.exports = BlacklistedToken;