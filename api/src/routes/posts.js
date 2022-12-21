const router = require('express').Router();
const { getPostsByUserId, createPost, editPost, getPosts, getPostDetail, votePost } = require('../controllers/posts');

router.get('/', getPosts)
router.get('/user', getPostsByUserId)
router.get('/:id', getPostDetail)
router.post('/', createPost)
router.put('/:type', votePost)
router.put('/', editPost)

module.exports = router