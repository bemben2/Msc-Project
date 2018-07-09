var express = require('express');
var app = express();
var config = require('./config/config');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var api = require('./api/api');

// var Sequelize = require('sequelize');
// var sequelize = require('./config/db_connection').sequelize;

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//API
app.use('/api', api);

//errors handling
app.use(function (err, req, res, next) {
    console.log('ERROR message: ', err.message);
    console.log('ERROR stack: ', err.stack);
    res.status(500).send(err.stack);
});

module.exports = app;