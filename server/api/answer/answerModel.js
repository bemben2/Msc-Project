var Sequelize = require('sequelize');
var sequelize = require('../../config/db_connection').sequelize;

var Answer = sequelize.define('answer', {
    content: {
        type: Sequelize.STRING,
        allowNull: false
    },
    result: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    questionId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});


//   force: true will drop the table if it already exists
// Answer.sync({ force: true }).then(() => {
//     // Table created
//     return Answer.create(
//         {
//             content: 'answer nu 1',
//             result: true,
//             questionId: 1
//         }
//     );
// });

module.exports = Answer;

