var router = require('express').Router();

router.use('/users', require('./user/userRoutes'));
router.use('/quizzies', require('./quiz/quizRoutes'));
router.use('/questions', require('./question/questionRoutes'));
router.use('/answers', require('./answer/answerRoutes'));

module.exports = router;