const Result = require('./resultModel');
const User = require('../user/userModel');

exports.getForQuiz = (req, res, next) => {
    Result.findAll({
        where: {
            quizId: req.params.id
        }
    }).then(results => {
        res.json(results);
    }).catch(err => {
        next(err);
    })
}

exports.getForUser = (req, res, next) => {
    Result.findAll({
        where: {
            userId: req.params.id
        }
    }).then(results => {
        res.json(results);
    }).catch(err => {
        next(err);
    })
}

exports.check = (req, res, next) => {
    var result = req.body;
    var _answers = '';
    for (var i = 0; i < result[3].answers.length; i++) {
        _answers += `{"questionId": ${result[3].answers[i].questionId}, "correct": "${result[3].answers[i].correct}"}`;
        if (i < result[3].answers.length - 1) {
            _answers += ', ';
        }
    }

    User.findOne({
        where: {
            id: result[0].userId
        }
    }).then(user => {
        var _result = `{
            "userId": "${result[0].userId}",
            "quizId": ${result[1].quizId},
            "finishedAt" :"${result[2].finishedAt}",
            "answers": [${_answers}],
            "questionNo":${result[4].questionNo},
            "userName": "${user.name}"
        }`;
        Result.create(JSON.parse(_result)).then((result) => {
            res.json(result);
        }).catch((err) => {
            next(err);
        });
        if (!user) {
            var _result = `{
                "userId": "${result[0].userId}",
                "quizId": ${result[1].quizId},
                "finishedAt" :"${result[2].finishedAt}",
                "answers": [${_answers}],
                "questionNo":${result[4].questionNo},
                "userName": "No name"
            }`;
            Result.create(JSON.parse(_result)).then((result) => {
                res.json(result);

            })
        }
    }).catch((err) => {
        next(err);
    });

}
