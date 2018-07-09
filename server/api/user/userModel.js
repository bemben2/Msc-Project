
var Sequelize = require('sequelize');
var sequelize = require('../../config/db_connection').sequelize;

const User = sequelize.define('user', {
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    }

  });

  // force: true will drop the table if it already exists
User.sync({force: true}).then(() => {
    // Table created
    return User.create({
      firstName: 'John',
      lastName: 'Hancock'
    });
  });
module.exports;