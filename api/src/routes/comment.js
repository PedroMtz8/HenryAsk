const router = require('express').Router();
const { createComment, editComment, getCommentsFromAnswer, getCommentsFromPost } = require('../controllers/comments');

router.post('/', createComment)
router.put('/', editComment)
router.get('/answer', getCommentsFromAnswer)
router.get('/post', getCommentsFromPost)

module.exports = router