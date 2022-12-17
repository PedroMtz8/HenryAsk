const router = require('express').Router();
const { getAnswersFromUser, createAnswer, editAnswer, getAnswersFromPost } = require('../controllers/answers');

router.get('/post', getAnswersFromPost)
router.get('/user', getAnswersFromUser)
router.post('/', createAnswer)
router.put('/', editAnswer)

module.exports = router