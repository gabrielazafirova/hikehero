// Load required packages
var mongoose = require('mongoose');

// Define our tour schema
var Booking   = new mongoose.Schema({
    cardFirstName: String,
    cardLastName: String,
    cardType: String,
    cardNumber: Number,
    cardApprovalNumber: Number,
    cardValidUntilMonth: Number,
    cardValidUntilYear: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    trip: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip'
    }
});

// Export the Mongoose model
module.exports = mongoose.model('Booking', Booking);

