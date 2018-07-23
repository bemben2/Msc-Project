var jwt = require('jsonwebtoken');
var User = require('../user/userModel');
var config = require('../../config/config');

exports.verifyUser = function () {
    return function (req, res, next) {
        var email = req.body.email;
        var password = req.body.password;

        if (!email || !password) {
            next(new Error("no login or password"));
        }
        
        User.findOne({
            where: {
                email: email
            }
        }).then((user) => {
            if (!user) {
                next(new Error("no user with this login"));

            } else {
                // check password add hashing
                if (user.password !== password) {
                    res.status(401).send('wrong password');
                } else {
                    req.user = user.dataValues;
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