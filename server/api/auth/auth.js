var jwt = require('jsonwebtoken');
var User = require('../user/userModel');
var config = require('../../config/config');

exports.verifyUser = function () {
    return function (req, res, next) {
        var login = req.body.email;
        var password = req.body.password;

        if (!login || !password) {
            return res.status(400).send('No login or password');
        }

        User.findOne({
            where: {
                email: login
            }
        }).then((user) => {
            if (!user) {
                res.status(401).send(' no user with this login');
            } else {
                // check password
                if (user.password !== password) {
                    res.status(401).send('Wrong password');
                } else {
                    req.user = user;
                    next(); // to add token 
                }
            }
        }).catch((err) => {
            next(err);
        }); 
    }

};

exports.singToken = function (id) {
    return jwt.sign(
        { id: id },
        config.secrets.jwt,
        { expiresIn: (10 * 24 * 60) }
    );
}