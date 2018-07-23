var User = require('../user/userModel');
var signToken = require('./auth').singToken;

exports.signin = function (req, res, next) {
    var token = signToken(req.user.id);
    res.json({ token: token });
};
