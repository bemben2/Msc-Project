
var User = require('./userModel');

exports.params = function (req, res, next, id) {

    User.findById(id).then(quiz => {
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
    res.json({ 'user': 'GET respond' });
    // if (err) {
    //     next(err);
    // }
};

exports.post = function (req, res, next) {
    // console.log(req.body);
    User.create(req.body).then((user) => {
        res.json(user);
    });
    // if (err) {
    //     next(err);
    // }
};

exports.getOne = function (req, res, next) {
    // res.json({ 'user': 'GET one respond' });
    res.json(req.user);
    // if (err) {
    //     next(err);
    // }
};

exports.put = function (req, res, next) {
    res.json({ 'user': 'PUT respond' });
    // if (err) {
    //     next(err);
    // }
};