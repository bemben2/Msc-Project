
const Sequelize = require('sequelize');
const sequelize = require('../../config/db_connection').sequelize;
const Quiz = require('./quizModel');
const User = require('../user/userModel');
const _ = require('lodash');

exports.get = (req, res, next) => {
    Quiz.findAll().then(quizzes => {
        res.json(quizzes);
    }).catch((err) => {
        next(err);
    });

};

exports.delete = (req, res, next) => {
    Quiz.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.status(200).json("quiz deleted");
    }).catch(err => {
        next(err);
    });
};

exports.getForUser = (req, res, next) => {

    User.findById(req.params.userId).then(user => {
        Quiz.findAll({
            where: {
                authorId: req.params.userId
            }
        }).then(quizzies => {
            // console.log('JOJOJOJ');
            // console.log((quizzies));
            res.set('Content-Type', 'application/json');
            res.json(quizzies);
        });
    });
};

exports.post = (req, res, next) => {
    Quiz.create(req.body).then(quiz => {
        res.json(quiz);
    }).catch(err => {
        next(err);
    });
};

exports.getOne = (req, res, next) => {
    res.json(req.quiz);
};

exports.put = (req, res, next) => {
    //console.log("req.userXXXXXXXXXX",req.user);
    Quiz.findById(req.params.id).then((quiz) => {
        if (!quiz) {
            next(new Error("Quiz not found"));
        } else {
            quiz.update({
                name: req.body.name,
                category: req.body.category,
                duration: req.body.duration,
                authorId: req.body.authorId,
                active: req.body.active,
                level: req.body.level
            }).then((quiz) => {
                res.status(200).json(quiz);
            });
        }
    }).catch(err => {
        next(err);
    });
};
