const express = require('express')
const router = express.Router()
const AdminController = require('../controllers/adminController')
const AuthMiddleware = require('../middleware/authMiddleware')
const RoleMiddleware = require('../middleware/roleMiddleware')

// All admin routes are protected
router.use(AuthMiddleware.protect)
router.use(RoleMiddleware.authorize('admin'))

router.get('/stats', AdminController.getDashboardStats)
router.get('/users', AdminController.getAllUsers)
router.put('/users/:id', AdminController.toggleUserStatus)
router.delete('/users/:id', AdminController.deleteUser)
router.get('/jobs', AdminController.getAllJobs)
router.get('/jobs/pending', AdminController.getPendingJobs)
router.put('/jobs/:id/approve', AdminController.approveJob)
router.put('/jobs/:id/reject', AdminController.rejectJob)

module.exports = router