
var Sequelize = require('sequelize');
var sequelize = require('../../config/db_connection').sequelize;

const User = sequelize.define('user', {
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  });

  // force: true will drop the table if it already exists
// User.sync(
//  // {force: true}
// ).then(() => {
//     // Table created
//     return User.create({
//       name: 'Michal Smigiel',
//       email: 'ms@gmal.com',
//       role: "creator",
//       password: "123"
//     });
//   });


module.exports = User;
