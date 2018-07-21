
var Sequelize = require('sequelize');
var sequelize = require('../../config/db_connection').sequelize;
var Question = require('./questionModel');
var Quiz = require('../quiz/quizModel');
exports.params = function (req, res, next, id) {
    Question.findById(id).then(question => {
        if (question) {
            req.question = question;
            next();
        } else {
            next(new Error('failed to load question'));
        }
    }).catch(err => {
        next(err);
    });
};

// exports.get = function (req, res, next) {
//     Question.findAll().then(questions => {
//         res.json(questions);
//     }).catch((err) => {
//         next(err);
//     });

// };

exports.post = function (req, res, next) {
    Question.create(req.body).then((questions) => {
        res.json(questions);
    }).catch((err) => {
        next(err);
    });
};

exports.getOne = function (req, res, next) {
    Question.findById(req.params.id).then(question => {
        if (question) {
            res.json(question);
        } else {
            next(new Error('failed to load question'));
        }
    }).catch(err => {
        next(err);
    });
};
exports.getForQuiz = function (req, res, next) {
    Quiz.findById(req.params.quizId).then((quiz) => {
        Question.findAll({
            where: {
                quizId: quiz.id
            }
        }).then((questions) => {
            res.set('Content-Type', 'application/json');
            res.json(questions);
        }).catch((err) => {
            next(err);
        });
    });
}
exports.put = function (req, res, next) {
    Question.findById(req.params.id).then((question) => {
        return question.update({
            title: req.body.title,
            body: req.body.body
        }).then((question) => {
            res.json(question);
        }).catch(err => {
            next(err);
        });
    }).catch(err => {
        next(err);
    });
};