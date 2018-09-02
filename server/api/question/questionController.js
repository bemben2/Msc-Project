
const Sequelize = require('sequelize');
const sequelize = require('../../config/db_connection').sequelize;
const Question = require('./questionModel');
const Quiz = require('../quiz/quizModel');

exports.delete = (req, res, next) => {
    Question.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.status(200).json("question deleted");
    }).catch(err => {
        next(err);
    });
};

exports.post = function (req, res, next) {
    Question.create(req.body).then((questions) => {
        res.json(questions);
    }).catch((err) => {
        next(err);
    });
};

exports.getForQuiz = function (req, res, next) {
    Quiz.findById(req.params.id)
        .then(quiz => {

            Question.findAll({
                where: {
                    quizId: quiz.id
                }
            })
                .then((questions) => {
                    res.set('Content-Type', 'application/json');
                    res.json(questions);
                })
                .catch((err) => {
                    next(err);
                });
        })
        
        .catch(err => {
            next(err);
        });
}

exports.put = function (req, res, next) {
    Question.findById(req.params.id).then((question) => {
        if (!question) {
            next(new Error("question not found"));
        } else {
            question.update({
                title: req.body.title,
                body: req.body.body
            }).then((question) => {
                res.status(200).json(question);
            });
        }
    }).catch(err => {
        next(err);
    });
};
