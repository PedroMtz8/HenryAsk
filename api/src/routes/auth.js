const router = require('express').Router();
const { verifyToken } = require('../controllers/middlewares');
const { registerUser, approveUser, getUserById, checkStatusUser } = require('../controllers/users')

router.get('/status', verifyToken, checkStatusUser)
router.get('/', getUserById)
router.post('/register', registerUser)
router.put('/approve', approveUser)

module.exports = router