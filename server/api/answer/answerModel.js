var Sequelize = require('sequelize');
var sequelize = require('../../config/db_connection').sequelize;

var Answer = sequelize.define('answer', {
    content: {
        type: Sequelize.STRING
    },
    result: {
        type: Sequelize.BOOLEAN
    },
    questionId: {
        type: Sequelize.INTEGER
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

module.exports = {
    Answer: Answer
};
