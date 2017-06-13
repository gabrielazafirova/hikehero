// importing Trip model
var Trip = require('./tripSchema');
exports.postTrip = function(req, res) {
    var trip = new Trip(req.body);
    //do not allow user to fake identity. The user who postet the trip must be the same user that is logged in
    if (!req.user.equals(trip.user)) {
        res.sendStatus(401);
    }
    trip.save(function(err, m) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.status(201).json(m);
    });
};
// Create endpoint /api/trips for GET
exports.getTrips = function(req, res) {
    Trip.find(function(err, trips) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.json(trips);
    });
};
// Create endpoint /api/trips/:trip_id for GET
exports.getTrip = function(req, res) {
    // Use the Trip model to find a specific trip
    Trip.findById(req.params.trip_id, function(err, trip) {
        if (err) {
            res.status(400).send(err)
            return;
        };

        res.json(trip);
    });
};
// Create endpoint /api/trips/:trip_id for PUT
exports.putTrip = function(req, res) {
    // Use the Trip model to find a specific trip and update it
    Trip.findByIdAndUpdate(
        req.params.trip_id,
        req.body,
        {
            //pass the new object to cb function
            new: true,
            //run validations
            runValidators: true
        }, function (err, trip) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.json(trip);
    });
};
// Create endpoint /api/trips/:trip_id for DELETE
exports.deleteTrip = function(req, res) {
    // Use the Beer model to find a specific beer and remove it
    Trip.findById(req.params.trip_id, function(err, m) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        m.remove();
        res.sendStatus(200);
    });
};