var router = require('express').Router();

router.use('/auth', require('./auth/authRoutes'));
router.use('/users', require('./user/userRoutes'));
router.use('/quizzes', require('./quiz/quizRoutes'));
router.use('/questions', require('./question/questionRoutes'));
router.use('/answers', require('./answer/answerRoutes'));
router.use('/results', require('./result/resultRoutes'));

module.exports = router;