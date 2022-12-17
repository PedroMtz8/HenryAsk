const router = require('express').Router();
const { getPostsByUserId, createPost, editPost, getPosts, sumPostScore, getPostDetail } = require('../controllers/posts');

router.get('/', getPosts)
router.get('/user', getPostsByUserId)
router.get('/:id', getPostDetail)
router.post('/', createPost)
router.put('/sum', sumPostScore)
router.put('/', editPost)

module.exports = router