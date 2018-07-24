var Sequelize = require('sequelize');
var sequelize = require('../../config/db_connection').sequelize;
// var Answer = require('./answerModel');
var Answer = require('../answer/answerModel');
var Question = require('../question/questionModel');

var correctAnswers = [];

let index = 0;

exports.check = function (req, res, next) {
    console.log("#####  req.body ", req.body.answers.length);
    //var answers = req.body.answers;

    let answers = req.body.answers;
    Answer.findAll().then((answersFromDB) => {

        answersFromDB.forEach(answerFromDB => {
            //console.log(answerFromDB.dataValues);
            //console.log("answers.length--------", answers.length);
            let correctAnswer = answerFromDB.dataValues;

           // console.log("correctAnswer.id--------", correctAnswer.id);

            answers.forEach(answer => {
              //  console.log("answer.id--------", answer.answerId);
                if (correctAnswer.id === answer.answerId) {
                 //   console.log("answer------------", answer);
                    correctAnswers.push({ answerId: answer.answerId, selected: answer.selected, correct: correctAnswer.result });
                }
            });
        });
        console.log("ZZZZZZZZZZZZZZZZZZZZZ correctAnswers");
        console.log(JSON.stringify(correctAnswers, undefined, 2));

        // req.body.answers.forEach(answer => {

        //     Answer.findById(answer.answerId).then((answerDB) => {
        //         // console.log("answerDB", answerDB)
        //         answer.correct = answerDB.result;

        //         //json.answerId = answer.answerId;
        //         correctAnswers.push({answerId: answer.answerId , selected: answer.selected, correct: answerDB.result });
        //     }).catch((err) =>{
        //         next(err);
        //     });
        //});


        console.log("#####  req.body corrected", correctAnswers);
        res.json(req.body);
    });
}

    // var reqCheck = (index, answers) => {
    //     // if (index < answers.length) {
    //     // console.log("index", index);
    //     // console.log("answers[index].answerId", answers[index].answerId);
    //     Answer.findAll().then((answersFromDB) => {

    //         answersFromDB.forEach(answerFromDB => {
    //             console.log(answerFromDB.dataValues);
    //             console.log("answers.length--------", answers.length);
    //             let correctAnswer = answerFromDB.dataValues;

    //             console.log("correctAnswer.id--------", correctAnswer.id);

    //             answers.forEach(answer => {
    //                 console.log("answer.id--------", answer.answerId);
    //                 if (correctAnswer.id === answer.answerId) {
    //                     console.log("answer------------", answer);
    //                     correctAnswers.push({ answerId: answer.answerId, selected: answer.selected, correct: correctAnswer.result });
    //                 }
    //             });
    //         });
    //         // console.log("correctAnswerscorrectAnswers",correctAnswers);



    //         // answers[index].answerId).then((answerDB) => {
    //         // answers[index].correct = answerDB.result;
    //         // console.log("answerDB.result", answerDB.result);
    //         // console.log("answer", answers[index]);
    //         // index++;
    //         // reqCheck(index, answers);
    //     }).catch((err) => {
    //         next(err);
    //     });
    // }
// }