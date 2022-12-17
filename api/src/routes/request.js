const router = require('express').Router();
const { checkAdmin } = require('../controllers/middlewares/index')
const { createRegisterRequest, createRolRequest, completeRegisterRequest, completeRolRequest, getRequests } = require('../controllers/requests')

router.post('/register', createRegisterRequest)
router.put('/register', checkAdmin, completeRegisterRequest)
router.post('/rol', createRolRequest)
router.put('/rol', checkAdmin, completeRolRequest)
router.get('/', checkAdmin, getRequests)

module.exports = router