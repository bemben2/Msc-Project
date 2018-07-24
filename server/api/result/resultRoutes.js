var router = require('express').Router();
var controller = require('./resultController');
var auth = require('../auth/auth');


router.route('/check')
  .post(controller.check);

// router.route('/question/:questionId')
//   .get(controller.getForQuestion);

// router.route('/:id')
//   .get(controller.getOne)
//   .put(controller.put)
//   .delete(controller.delete);

module.exports = router;
