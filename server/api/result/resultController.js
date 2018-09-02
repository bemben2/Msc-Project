const Sequelize = require('sequelize');
const sequelize = require('../../config/db_connection').sequelize;
const Answer = require('../answer/answerModel');
const Question = require('../question/questionModel');
const Result = require('./resultModel');
const User = require('../user/userModel');

exports.getForQuiz = (req, res, next) => {
    Result.findAll({
        where: {
            quizId: req.params.id
        }
    }).then(results => {
        //console.log("results", results);
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
        //console.log("results", results);
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
        } else {

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
        //    console.log(_result);
        Result.create(JSON.parse(_result)).then((result) => {
            res.json(result);
        }).catch((err) => {
            next(err);
        });
        if (!user) {
            next(new Error('user notfound'));
        }
    }).catch((err) => {
        next(err);
    });

    // let answers = result.answers;
    // Answer.findAll().then((answersFromDB) => {

    //     answersFromDB.forEach(answerFromDB => {
    //         let correctAnswer = answerFromDB.dataValues;

    //         answers.forEach(answer => {
    //             if (correctAnswer.id === answer.answerId) {
    //                 correctAnswers.push({ answerId: answer.answerId, selected: answer.selected, correct: correctAnswer.result });
    //             }
    //         });
    //     });
    //     //console.log("correctAnswers" + correctAnswers);
    //     result.answers = correctAnswers;
    //     result.finishedAt = new Date();


    // });
}
