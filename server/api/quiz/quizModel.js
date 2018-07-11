
var Sequelize = require('sequelize');
var sequelize = require('../../config/db_connection').sequelize;
var Question = require('../question/questionModel').Question;



var Quiz = sequelize.define('quiz', {
  name: {
    type: Sequelize.STRING
  },
  category: {
    type: Sequelize.STRING
  },
  duration: {
    type: Sequelize.INTEGER
  },
  authorId: {
    type: Sequelize.INTEGER
  },
  active: {
    type: Sequelize.BOOLEAN
  },
  level: {
    type: Sequelize.STRING
  }
});


// //   force: true will drop the table if it already exists
// Quiz.sync({ force: true }).then(() => {
  // Table created
  // return Quiz.create({
  //   name: 'Quiz numbero uno',
  //   duration: 90,
  //   authorId: 1
// });


module.exports = Quiz;
