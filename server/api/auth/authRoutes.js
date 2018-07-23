var router = require('express').Router();
var verifyUser = require('./auth').verifyUser;
var controller = require('./authController');

router.post('/signin',verifyUser(), controller.signin);
router.post('/signup', controller.signup);

module.exports = router;
