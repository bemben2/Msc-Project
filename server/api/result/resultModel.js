var Sequelize = require('sequelize');
var sequelize = require('../../config/db_connection').sequelize;
var Question = require('../question/questionModel').Question;

var Result = sequelize.define('quiz', {
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    quizId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    answers: {
        type: Sequelize.JSON,
        allowNull:false
    }
});


module.exports = Result;
