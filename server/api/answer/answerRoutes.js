var router = require('express').Router();
var controller = require('./answerController');
var auth = require('../auth/auth');

// midlleware for parametized url 
// if rout has id parameter will be served by this before go to 
// the proper contoller function
//router.param('id', controller.params);

router.route('/')
  .get(controller.get)
  .post(auth.decodeToken(), controller.post); //tested

router.route('/question/:questionId')
  .get(controller.getForQuestion);

router.route('/:id')
  .get(controller.getOne)
  .put(controller.put)
  .delete(controller.delete);

module.exports = router;