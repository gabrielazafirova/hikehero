var Config = require('../config/config.js');
var User = require('./userSchema');
var jwt = require('jwt-simple');

//var path = "";


module.exports.test = function (req, res) {
    if(!req.file){
        res.status(400).send('Profil picture is required');
        return;
    }
    var photo = req.file;
    var originalname = photo.originalname;
    var filename = photo.filename;
    var path = photo.path;
    var destination = photo.destination;
    var size = photo.size;
    var mimetype = photo.mimetype;
    return res.json(photo);
};

module.exports.login = function(req, res){

    if(!req.body.email){
        res.status(400).send('Email required');
        return;
    }
    if(!req.body.password){
        res.status(400).send('Password required');
        return;
    }

    User.findOne({email: req.body.email}, function(err, user){
        if (err) {
            res.status(500).send(err);
            return
        }

        if (!user) {
            res.status(401).send('Invalid Credentials');
            return;
        }
        user.comparePassword(req.body.password, function(err, isMatch) {
            if(!isMatch || err){
                res.status(401).send('Invalid Credentials');
            } else {
                res.status(200).json({token: createToken(user)});
            }
        });
    });

};

module.exports.signup = function(req, res){
    if(!req.body.email){
        res.status(400).send('Email required');
        return;
    }
    if(!req.body.password){
        res.status(400).send('password required');
        return;
    }
    if(!req.body.firstname){
        res.status(400).send('First name required');
        return;
    }
    if(!req.body.lastname){
        res.status(400).send('Last name required');
        return;
    }
    if(!req.body.description){
        res.status(400).send('Description about yourself is required');
        return;
    }
    if(!req.body.path){
        res.status(400).send('Profil picture is required');
        return;
    }

    var user = new User();

    user.email = req.body.email;
    user.password = req.body.password;
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.description = req.body.description;
    user.path = req.body.path;
    //res.json(path)
    user.save(function(err) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.status(201).json({token: createToken(user)});
        //res.json(user.path);
    });
};

module.exports.unregister = function(req, res) {
    req.user.remove().then(function (user) {
        res.sendStatus(200);
    }, function(err){
        res.status(500).send(err);
    });
};

function createToken(user) {
    var tokenPayload = {
        user: {
            _id: user._id,
            email: user.email,
            firstname: user.firstname,
            path: user.path
        }

    };
    return jwt.encode(tokenPayload,Config.auth.jwtSecret);
};