const router = require('express').Router();
const controller = require('./questionController');
const auth = require('../auth/auth');

router.route('/')
	.post(auth.decodeToken(),controller.post) //tested

router.route('/:id')
	.put(auth.decodeToken(), controller.put) //tested
	.delete(auth.decodeToken(), controller.delete); //tested

router.route('/quiz/:id')
	.get(auth.decodeToken(), controller.getForQuiz); //tested
module.exports = router;
