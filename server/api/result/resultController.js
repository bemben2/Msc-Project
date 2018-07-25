const Sequelize = require('sequelize');
const sequelize = require('../../config/db_connection').sequelize;
const Answer = require('../answer/answerModel');
const Question = require('../question/questionModel');
const Result = require('./resultModel'); 


//let index = 0;

exports.check = function (req, res, next) {
    
    var correctAnswers = [];
    let result = req.body;
    let answers = result.answers;
    Answer.findAll().then((answersFromDB) => {

        answersFromDB.forEach(answerFromDB => {
            let correctAnswer = answerFromDB.dataValues;

            answers.forEach(answer => {
                if (correctAnswer.id === answer.answerId) {
                    correctAnswers.push({ answerId: answer.answerId, selected: answer.selected, correct: correctAnswer.result });
                }
            });
        });
        //console.log("correctAnswers" + correctAnswers);
        result.answers = correctAnswers;
        result.finishedAt = new Date();
        
        Result.create(result).then((result)=>{
            res.json(result);
        }).catch((err)=>{
            next(err);
        });
    });
}
