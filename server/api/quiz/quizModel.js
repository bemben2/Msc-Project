
var Sequelize = require('sequelize');
var sequelize = require('../../config/db_connection').sequelize;
var Question = require('../question/questionModel').Question;



var Quiz = sequelize.define('quiz', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  },
  duration: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  authorId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  active: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  level: {
    type: Sequelize.STRING,
    allowNull: false
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
