const router = require('express').Router();
const controller = require('./quizController');
const auth = require('../auth/auth');

router.route('/')
	.get(auth.decodeToken(), controller.get) //tested
	.post(auth.decodeToken(), controller.post) //tested

router.route('/:id')
	.put(auth.decodeToken(), controller.put) //tested
	.get(auth.decodeToken(), controller.getOne) //tested
	.delete(auth.decodeToken(), controller.delete); //tested
	
module.exports = router;
