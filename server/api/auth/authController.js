const User = require('../user/userModel');
const signToken = require('./auth').singToken;

exports.signin = (req, res, next) => {
    req.user.token = signToken(req.user.id);
    console.log("req.user" + req.user);
    res.json(req.user);
};

// exports.getAll = (req, res, next) => {
//     User.findAll().then(users => {
//         res.json(quizzes);
//     }).catch((err) => {
//         next(err);
//     });
//     }).then(user => {
//         if(!user) {
//             next(new Error ('user notfound'));
//         }
//         delete user.dataValues.token;
//         delete user.dataValues.password;
//         res.json(user);

//     }).catch((err) => {
//         next(err);
//     });
// }
exports.getOne = (req, res, next) => {
    User.findOne({
        where: {
            id: req.params.id
        }
    }).then(user => {
        if(!user) {
            next(new Error ('user notfound'));
        }
        delete user.dataValues.token;
        delete user.dataValues.password;
        res.json(user);

    }).catch((err) => {
        next(err);
    });
}

exports.signup = (req, res, next) => {
    //console.log("Signup " + JSON.stringify(req));
    // if (!req.body.email || !req.body.name || !req.body.password || !req.body.master ) {
    //     next(new Error("All fields required to create user"));
    //     return;
    // }
    User.create(req.body).then((user) => {
        var user = user.dataValues;
        user.token = signToken(user.id);
        res.json(user);
    }).catch((err) => {
        next(err);
    });
};