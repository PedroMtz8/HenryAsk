const router = require('express').Router();
const { verifyToken, checkAdmin } = require('../controllers/middlewares');
const { registerUser, approveUser, getUserById, checkStatusUser } = require('../controllers/users')

router.get('/status', verifyToken, checkStatusUser)
router.get('/', verifyToken, getUserById)
router.post('/register', registerUser)
router.put('/approve', verifyToken, checkAdmin, approveUser)

module.exports = router