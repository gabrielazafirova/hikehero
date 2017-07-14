// Load required packages
var mongoose = require('mongoose');

// Define our tour schema
var Trip   = new mongoose.Schema({
    title: String,
    date: String,
    starttime: String,
    endtime: String,
    location: String,
    lat: Number,
    lon: Number,
    difficulty: String,
    price: Number,
    description: String,
    creator: String,
    path: String,
    imagePath1: String,
    imagePath2: String,
    imagePath3: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

// Export the Mongoose model
module.exports = mongoose.model('Trip', Trip);

