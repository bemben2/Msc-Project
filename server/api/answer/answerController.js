
var Sequelize = require('sequelize');
var sequelize = require('../../config/db_connection').sequelize;
var Answer = require('./answerModel');

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

exports.delete = function (req, res, next) {
    Answer.findById(req.params.id).then((answer) => {
        if (answer) {
            return answer.destroy();
        } 
        
    }).then(() => {
       // console.log(no);
        res.status(204).json({ message: 'Successfully deleted' });
    }).catch((err) => {
        next(err);
    });
};

exports.post = function (req, res, next) {
    Answer.create(req.body).then((questions) => {
        res.json(questions);
    }).catch((err) => {
        next(err);
    });
};

exports.getOne = function (req, res, next) {
    res.json(req.question);
};

exports.put = function (req, res, next) {
    res.json({ 'quiz': 'PUT respond' });
};