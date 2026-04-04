const express = require('express')
const router = express.Router()
const JobController = require('../controllers/jobController')
const AuthMiddleware = require('../middleware/authMiddleware')
const RoleMiddleware = require('../middleware/roleMiddleware')

router.get('/', JobController.getAllJobs)
router.get(
  '/employer/listings',
  AuthMiddleware.protect,
  RoleMiddleware.authorize('employer'),
  JobController.getEmployerJobs
)
router.get('/:id', JobController.getJobById)
router.post(
  '/',
  AuthMiddleware.protect,
  RoleMiddleware.authorize('employer'),
  JobController.createJob
)
router.put(
  '/:id',
  AuthMiddleware.protect,
  RoleMiddleware.authorize('employer'),
  JobController.updateJob
)
router.delete(
  '/:id',
  AuthMiddleware.protect,
  RoleMiddleware.authorize('employer'),
  JobController.deleteJob
)

module.exports = router