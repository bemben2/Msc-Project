
var Sequelize = require('sequelize');
var sequelize = require('../../config/db_connection').sequelize;
var Quiz = require('./quizModel');
var User = require('../user/userModel');
var _ = require('lodash');

exports.userIdparams = function (req, res, next, id) {
    next();
};

exports.params = function (req, res, next, id) {
    Quiz.findById(id).then(quiz => {
        if (quiz) {
            //console.log('quiz',quiz);
            req.quiz = _.merge(req.body, quiz);
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

exports.getForUser = function (req, res, next) {
  
    User.findById(req.params.userId).then((user) => {
        Quiz.findAll({
            where: {
                authorId: req.params.userId
            }
        }).then((quizzies)=>{
            // console.log('JOJOJOJ');
            // console.log((quizzies));
            res.set('Content-Type', 'application/json');
            res.json(quizzies);
        });
    });
};

exports.post = function (req, res, next) {
    Quiz.create(req.body).then((quiz) => {
        res.json(quiz);
    }).catch((err) => {
        next(err);
    });
};

exports.getOne = function (req, res, next) {
    res.json(req.quiz);
};

exports.put = function (req, res, next) {
    Quiz.findById(req.body.id).then((quiz) => {
        quiz.update({
            name: req.body.name,
            category: req.body.category,
            duration: req.body.duration,
            authorId: req.body.authorId,
            active: req.body.active,
        }).then(() => {
            Quiz.findById(req.body.id).then((quiz) => {
                res.status(200).json({ 'PUT request': 'success' });
            });
        });
    }).catch(() => {
        res.status(404).json({ 'PUT request': 'quiz FOR UPDATE not found' });
    });
};