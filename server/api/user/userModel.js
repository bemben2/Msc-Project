
var Sequelize = require('sequelize');
var sequelize = require('../../config/db_connection').sequelize;

const User = sequelize.define('user', {
	name: {
        type: Sequelize.STRING,
        allowNull: false,
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	},
	password: {
        type: Sequelize.STRING,
        allowNull: false,
	},
	master: {
		type: Sequelize.BOOLEAN
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
