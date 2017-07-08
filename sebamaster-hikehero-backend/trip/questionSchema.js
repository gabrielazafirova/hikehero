// Load required packages
var mongoose = require('mongoose');

// Define our tour schema
var Question   = new mongoose.Schema({
    timeAsked: String,
    content: String,
    answer: String,
    questioner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    trip: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip'
    }
});

// Export the Mongoose model
module.exports = mongoose.model('Question', Question);

