var config = require('./config');
var Sequelize = require('sequelize');

var sequelize = new Sequelize(
    'mscproject',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql',
        define: {
            timestamps: false
          }
    }
    
);

//DB connection and connection test
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = {
    Sequelize: sequelize,
    sequelize: sequelize
};