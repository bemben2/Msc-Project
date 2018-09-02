const router = require('express').Router();
const controller = require('./resultController');
const auth = require('../auth/auth');


router.route('/check')
  .post(auth.decodeToken(), controller.check);

// router.route('/question/:questionId')
//   .get(controller.getForQuestion);

router.route('/user/:id')
  .get(auth.decodeToken(), controller.getForUser);
router.route('/quiz/:id')
  .get(auth.decodeToken(), controller.getForQuiz);
//   .put(controller.put)
//   .delete(controller.delete);

module.exports = router;
