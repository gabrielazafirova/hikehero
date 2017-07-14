module.exports = tripRoutes;


function tripRoutes(passport) {

    var tripController = require('./tripController');
    var questionController = require('./questionController');
    var bookingController = require('./bookingController');
    var router = require('express').Router();
    var unless = require('express-unless');
    var multer  = require('multer');

   /* var upload = multer({ storage: multer.diskStorage({


        destination: function (req, file, cb) {
            cb(null, '../sebamaster-hikehero-frontend/dist');
        },

        filename: function (req, file, cb) {
            var ext = require('path').extname(file.originalname);
            ext = ext.length>1 ? ext : "." + require('mime').extension(file.mimetype);
            require('crypto').pseudoRandomBytes(16, function (err, raw) {
                cb(null, (err ? undefined : raw.toString('hex') ) + ext);
            });
        }

    })});*/

    var upload = multer({ dest: '../sebamaster-hikehero-frontend/dist'})

    var mw = passport.authenticate('jwt', {session: false});
    mw.unless = unless;

    //middleware
    router.use(mw.unless({method: ['GET', 'OPTIONS']}));

    router.route('/')
        .post(tripController.postTrip)
        .get(tripController.getTrips);

    router.post('/upload', upload.any(), tripController.test);

    router.route('/:trip_id')
        .get(tripController.getTrip)
        .put(tripController.putTrip)
        .delete(tripController.deleteTrip);

    router.route('/:trip_id/bookings')
        .get(bookingController.getBookings)
        .post(bookingController.postBooking);

    router.route('/:trip_id/questions')
        .get(questionController.getQuestions)
        .post(questionController.postQuestion);

    router.route('/:trip_id/questions/:question_id')
        .post(questionController.answerQuestion);

    return router;
}
