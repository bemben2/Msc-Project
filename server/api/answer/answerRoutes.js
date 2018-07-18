var router = require('express').Router();
var controller = require('./answerController');

// midlleware for parametized url 
// if rout has id parameter will be served by this before go to 
// the proper contoller function
//router.param('id', controller.params);

router.route('/')
  .get(controller.get)
  .post(controller.post);

router.route('/:id')
  .get(controller.getOne)
  .put(controller.put)
  .delete(controller.delete);

module.exports = router;