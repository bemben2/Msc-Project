var express = require('express');
var app = express();
var config = require('./config/config');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var api = require('./api/api');

var Sequelize = require('sequelize');
var sequelize = require('./config/db_connection').sequelize;

//DB connection and connection test
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//API
app.use('/api', api);

//errors handling
app.use(function (err, req, res, next) {
    console.log('ERROR message from SERVER.JS: ', err.message);
    console.log('ERROR stack from SERVER.JS: ', err.stack);
    res.status(500).json(err.message);
});



module.exports = app;