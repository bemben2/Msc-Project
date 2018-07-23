var router = require('express').Router();
var verifyUser = require('./auth').verifyUser;
var controller = require('./authController');

router.post('/signin',verifyUser(), controller.signin);

module.exports = router;
