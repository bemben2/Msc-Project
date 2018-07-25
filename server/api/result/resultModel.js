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
    answers: {
        type: Sequelize.JSON,
        allowNull:false
    },
    finishedAt: {
        type: Sequelize.DATE,
        allowNull: false
    }
});


module.exports = Result;
