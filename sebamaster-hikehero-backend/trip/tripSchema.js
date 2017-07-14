// Load required packages
var mongoose = require('mongoose');

// Define our tour schema
var Trip   = new mongoose.Schema({
    title: String,
    startdate: String,
    starttime: String,
    location: String,
    lat: Number,
    lon: Number,
    difficulty: String,
    price: Number,
    description: String,
    creator: String,
    path: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

// Export the Mongoose model
module.exports = mongoose.model('Trip', Trip);

