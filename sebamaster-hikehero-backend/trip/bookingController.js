var Booking = require('./bookingSchema');
var Trip = require('./tripSchema');
var User = require('../user/userSchema');

// Create endpoint /api/trips/:trip_id/bookings for GET
exports.postBooking = function(req, res) {
    var booking = new Booking(req.body);
    booking.trip = req.params.trip_id;
    booking.user = req.user;
    booking.save(function(err, m) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.status(201).json(m);
    });
};
// Create endpoint /api/trips/:trip_id/bookings for GET
exports.getBookings = function(req, res) {
    Booking.find(function(err, bookings) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        bookings.forEach(function (booking) {
            booking["user"] = User.findById(booking["user"]);
        });
        res.json(bookings);
    });
};