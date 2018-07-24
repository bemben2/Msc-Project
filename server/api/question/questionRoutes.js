var router = require('express').Router();
var controller = require('./questionController');
var auth = require('../auth/auth');

// midlleware for parametized url 
// if rout has id parameter will be served by this before go to 
// the proper contoller function
//router.param('id', controller.params);

router.route('/')
	// .get(controller.get)
	.post(auth.decodeToken(),controller.post) //tested

router.route('/:id')
	.put(controller.put)
	.get(controller.getOne);
router.route('/quiz/:quizId')
	.get(controller.getForQuiz);
module.exports = router;