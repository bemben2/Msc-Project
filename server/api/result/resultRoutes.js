const router = require('express').Router();
const controller = require('./resultController');
const auth = require('../auth/auth');


router.route('/check')
  .post(auth.decodeToken(), controller.check);

// router.route('/question/:questionId')
//   .get(controller.getForQuestion);

// router.route('/:id')
//   .get(controller.getOne)
//   .put(controller.put)
//   .delete(controller.delete);

module.exports = router;
