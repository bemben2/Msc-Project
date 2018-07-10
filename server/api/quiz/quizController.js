
var Sequelize = require('sequelize');
var sequelize = require('../../config/db_connection').sequelize;
var Quiz = require('./quizModel').Quiz;

exports.params = function (req, res, next, id) {
    Quiz.findById(id).then(quiz => {
        if (quiz) {
            req.quiz = quiz;
            next();
        } else {
            next(new Error('failed to load quiz'));
        }
    }).catch(err => {
        next(err);
    });
};



exports.get = function (req, res, next) {
    Quiz.findAll().then(quizzes => {
        res.json(quizzes);
    }).catch((err) => {
        next(err);
    });

};

exports.post = function (req, res, next) {
    res.json({ 'quiz': 'POST respond' });
};

exports.getOne = function (req, res, next) {
    res.json(req.quiz);
};

exports.put = function (req, res, next) {
    res.json({ 'quiz': 'PUT respond' });
};