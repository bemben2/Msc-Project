const Sequelize = require('sequelize');
const sequelize = require('../../config/db_connection').sequelize;

let Result = sequelize.define('result', {
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    quizId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    finishedAt: {
        type: Sequelize.DATE,
        allowNull: false
    },
    answers: {
        type: Sequelize.JSON,
        allowNull:false
    },
    questionNo: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    userName : {
        type: Sequelize.STRING
    }
});

module.exports = Result;
