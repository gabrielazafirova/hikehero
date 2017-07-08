module.exports = tripRoutes;


function tripRoutes(passport) {

    var tripController = require('./tripController');
    var questionController = require('./questionController');
    var bookingController = require('./bookingController');
    var router = require('express').Router();
    var unless = require('express-unless');

    var mw = passport.authenticate('jwt', {session: false});
    mw.unless = unless;

    //middleware
    router.use(mw.unless({method: ['GET', 'OPTIONS']}));

    router.route('/')
        .post(tripController.postTrip)
        .get(tripController.getTrips);

    router.route('/:trip_id')
        .get(tripController.getTrip)
        .put(tripController.putTrip)
        .delete(tripController.deleteTrip);

    router.route('/:trip_id/questions')
        .get(questionController.getQuestions)
        .post(questionController.postQuestion);

    router.route('/:trip_id/questions/:question_id')
        .post(questionController.answerQuestion);


    router.route('/:trip_id/bookings')
        .get(bookingController.getBookings)
        .post(bookingController.postBooking);

    return router;
}
