
var Sequelize = require('sequelize');
var sequelize = require('../../config/db_connection').sequelize;
var Question = require('./questionModel').Question;

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



exports.get = function (req, res, next) {
    Question.findAll().then(questions => {
        res.json(questions);
    }).catch((err) => {
        next(err);
    });

};

exports.post = function (req, res, next) {
    res.json({ 'quiz': 'POST respond' });
};

exports.getOne = function (req, res, next) {
    res.json(req.question);
};

exports.put = function (req, res, next) {
    res.json({ 'quiz': 'PUT respond' });
};