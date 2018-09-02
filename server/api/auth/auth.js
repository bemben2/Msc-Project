var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var User = require('../user/userModel');
var config = require('../../config/config');
var checkToken = expressJwt({ secret: config.secrets.jwt });

exports.decodeToken = function () {
    return function (req, res, next) {
      // this will call next if token is valid
      // and send error if its not. It will attached
      // the decoded token to 3
      // console.log("sprawdzma token", req.headers.authorization);
      checkToken(req, res, next);
    };
  };

exports.verifyUser = function () {
    return function (req, res, next) {
        var email = req.body.email;
        var password = req.body.password;
        //console.log(email + password);
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
                    next(new Error('wrong password'));
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