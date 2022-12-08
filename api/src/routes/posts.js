const router = require('express').Router();
const { getPostsByUserId, createPost, editPost, getPostsByTag, getPosts, deletePosts, sumPostScore } = require('../controllers/posts');

router.get('/', getPosts)
router.get('/user', getPostsByUserId)
router.post('/', createPost)
router.put('/sum', sumPostScore)
router.put('/', editPost)

module.exports = router