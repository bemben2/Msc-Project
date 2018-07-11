var router = require('express').Router();
var controller = require('./quizController');

// midlleware for parametized url 
// if rout has id parameter will be served by this before go to 
// the proper contoller function
router.param('id', controller.params);
// router.param('userId', controller.userIdparams);


router.route('/')
	.get(controller.get)
	.post(controller.post)
	.put(controller.put);

router.route('/:id')
	.get(controller.getOne);
router.route('/user/:userId')
	.get(controller.getForUser)
module.exports = router;