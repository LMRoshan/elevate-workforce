const express = require('express')
const router = express.Router()
const ApplicationController = require('../controllers/applicationController')
const AuthMiddleware = require('../middleware/authMiddleware')
const RoleMiddleware = require('../middleware/roleMiddleware')

router.get(
  '/my',
  AuthMiddleware.protect,
  RoleMiddleware.authorize('jobseeker'),
  ApplicationController.getMyApplications
)
router.get(
  '/employer',
  AuthMiddleware.protect,
  RoleMiddleware.authorize('employer'),
  ApplicationController.getEmployerApplications
)
router.post(
  '/:jobId',
  AuthMiddleware.protect,
  RoleMiddleware.authorize('jobseeker'),
  ApplicationController.applyForJob
)
router.put(
  '/:id/status',
  AuthMiddleware.protect,
  RoleMiddleware.authorize('employer'),
  ApplicationController.updateApplicationStatus
)

module.exports = router