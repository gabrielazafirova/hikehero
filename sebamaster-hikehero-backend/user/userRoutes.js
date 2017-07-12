module.exports = userRoutes;

function userRoutes(passport) {

    var userController = require('./userController');
    var router = require('express').Router();
    var multer  = require('multer');

    var upload = multer({ storage: multer.diskStorage({

        destination: function (req, file, cb) {
            cb(null, './uploads');
        },

        filename: function (req, file, cb) {
            var ext = require('path').extname(file.originalname);
            ext = ext.length>1 ? ext : "." + require('mime').extension(file.mimetype);
            require('crypto').pseudoRandomBytes(16, function (err, raw) {
                cb(null, (err ? undefined : raw.toString('hex') ) + ext);
            });
        }

    })});
    //var upload = multer({ dest: 'uploads/' });
/*
    router.post('/upload', upload.single('photo'), function (req, res) {
        var photo = req.file;
        var originalname = photo.originalname;
        var filename = photo.filename;
        var path = photo.path;
        var destination = photo.destination;
        var size = photo.size;
        var mimetype = photo.mimetype;
        res.json(photo);
    })*/
    router.post('/login', userController.login);
    router.post('/upload', upload.single('photo'), userController.test);
    router.post('/signup', userController.signup);
    router.post('/unregister', passport.authenticate('jwt', {session: false}),userController.unregister)

    return router;

}