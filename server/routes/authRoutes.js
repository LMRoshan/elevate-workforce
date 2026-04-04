const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/authController')
const AuthMiddleware = require('../middleware/authMiddleware')

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.get('/profile', AuthMiddleware.protect, AuthController.getProfile)
router.put('/profile', AuthMiddleware.protect, AuthController.updateProfile)

module.exports = router