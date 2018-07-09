var express = require('express');
var app = express();
var config = require('./config/config');
var morgan = require('morgan');
var bodyParser = require('body-parser');

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function (err, req, res, next) {
    console.log('ERROR message: ', err.message);
    console.log('ERROR stack: ', err.stack);
    res.status(500).send(err.stack.json());
});

module.exports = app;