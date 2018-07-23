const User = require('../user/userModel');
const signToken = require('./auth').singToken;

exports.signin = (req, res, next) => {
    req.user.token = signToken(req.user.id);
   // console.log(req.user);
    res.json(req.user);
};

exports.signup = (req, res, next) => {
    //console.log(req.body);
    if (!req.body.email || !req.body.name || !req.body.password || !req.body.master ) {
        next(new Error("All fields required to create user"));
        return;
    }
    User.create(req.body).then((user) => {
        var user = user.dataValues;
        user.token = signToken(user.id);
        res.json(user);
    }).catch((err) => {
        next(err);
    });
};