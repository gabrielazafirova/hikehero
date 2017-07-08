module.exports = bookingRoutes;


function bookingRoutes(passport) {

    var bookingController = require('./bookingController');
    var router = require('express').Router();
    var unless = require('express-unless');

    var mw = passport.authenticate('jwt', {session: false});
    mw.unless = unless;

    //middleware
    router.use(mw.unless({method: ['GET', 'OPTIONS']}));

    /*
    router.route('/')
        .post(bookingController.postTrip)
        .get(bookingController.getTrips);
    */

    router.route('/:trip_id/bookings')
        .get(bookingController.getBookings)
        .post(bookingController.postBooking);


    return router;
}
