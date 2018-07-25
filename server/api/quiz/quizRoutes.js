const router = require('express').Router();
const controller = require('./quizController');
const auth = require('../auth/auth');
// midlleware for parametized url 
// if rout has id parameter will be served by this before go to 
// the proper contoller function
//router.param('id', controller.params);
// router.param('userId', controller.userIdparams);

router.route('/')
	.get(auth.decodeToken(), controller.get) //tested
	.post(auth.decodeToken(), controller.post) //tested

router.route('/:id')
	.put(auth.decodeToken(), controller.put) //tested
	.get(controller.getOne);

router.route('/user/:userId')
	.get(controller.getForUser)
module.exports = router;
