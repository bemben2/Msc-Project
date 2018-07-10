
var Sequelize = require('sequelize');
var sequelize = require('../../config/db_connection').sequelize;
var Answer = require('./answerModel').Answer;

exports.params = function (req, res, next, id) {
    Answer.findById(id).then(answer => {
        if (answer) {
            req.answer = answer;
            next();
        } else {
            next(new Error('failed to load answer'));
        }
    }).catch(err => {
        next(err);
    });
};



exports.get = function (req, res, next) {
    Answer.findAll().then(answers => {
        res.json(answers);
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