// importing Trip model
var Question = require('./questionSchema');
var User = require('../user/userSchema');

// Create endpoint /api/trips/:trip_id/questions for GET
exports.getQuestions = function(req, res) {
    Question.find({ trip: req.params.trip_id }, function(err, questions) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        questions.forEach(function (question) {
            question["questioner"] = User.findById(question["questioner"]);
        });
        res.json(questions);
    });
};

// Create endpoint /api/trips/:trip_id/questions for POST
exports.postQuestion = function(req, res) {
    var question = new Question(req.body);
    question.trip = req.params.trip_id;
    question.questioner = req.user;
    question.save(function(err, m) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.status(201).json(m);
    });
};

// Create endpoint /api/trips/:trip_id/questions/:question_id for POST
exports.answerQuestion = function(req, res) {
    Question.findById(req.params.question_id, function(err, question) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        question.answer = req.body;
        question.save(function(err, question) {
            if (err) {
                res.status(400).send(err);
                return;
            }
            res.status(201).json(question);
        });
    });
};