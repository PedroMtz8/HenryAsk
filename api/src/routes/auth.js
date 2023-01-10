const router = require('express').Router();
const { verifyToken, checkAdmin } = require('../controllers/middlewares');
const { registerUser, getUserById, checkStatusUser, getUsers, registerAdmin, editUser } = require('../controllers/users')

router.get('/users', verifyToken, checkAdmin, getUsers)
router.get('/', verifyToken, getUserById)
router.post('/register', registerUser)
router.post('/register/admin', verifyToken, checkAdmin, registerAdmin) //tenemos un superadmin registrado en la base de datos
router.put('/', verifyToken, editUser)
module.exports = router