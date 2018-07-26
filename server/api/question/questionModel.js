const Sequelize = require('sequelize');
const sequelize = require('../../config/db_connection').sequelize;

var Question = sequelize.define('question', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quizId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

});

module.exports = Question;
