
var Sequelize = require('sequelize');
var sequelize = require('../../config/db_connection').sequelize;

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


// //   force: true will drop the table if it already exists
// Question.sync({ force: true }).then(() => {
//     // Table created
//     return Question.create({
//         title: 'Q nuber 1',
//         body: 'Who is a god boy',
//         quizId: 1
//     });
// });


module.exports = Question;
