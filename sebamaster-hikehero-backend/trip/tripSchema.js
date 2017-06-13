// Load required packages
var mongoose = require('mongoose');

// Define our tour schema
var Trip   = new mongoose.Schema({
    title: String,
    startdate: Date,
    starttime: Number,
    location: String,
    difficulty: Number,
    price: Number,
    description: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

// Export the Mongoose model
module.exports = mongoose.model('Trip', Trip);

