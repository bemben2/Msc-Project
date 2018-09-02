var router = require('express').Router();
var verifyUser = require('./auth').verifyUser;
var controller = require('./authController');
const auth = require('../auth/auth');

router.post('/signin', verifyUser(), controller.signin);
router.post('/signup', controller.signup);
//router.get('/all', auth.decodeToken(), controller.getAll);
router.route('/:id')
    .get(auth.decodeToken(), controller.getOne);

module.exports = router;
