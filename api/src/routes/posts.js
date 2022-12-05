const router = require('express').Router();
const { getPostsByUserId, createPost, editPost } = require('../controllers/posts');

router.get('/date', getPostsByUserId)
router.post('/', createPost)
router.put('/', editPost)

module.exports = router