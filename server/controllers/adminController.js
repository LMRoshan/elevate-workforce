const asyncHandler = require('express-async-handler')
const User = require('../models/User')
const JobListing = require('../models/Joblisting')
const Application = require('../models/Application')

class AdminController {
  static getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 })

    res.json({
      success: true,
      count: users.length,
      data: users,
    })
  })

  static toggleUserStatus = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (!user) {
      res.status(404)
      throw new Error('User not found')
    }

    user.isActive = !user.isActive
    await user.save()

    res.json({
      success: true,
      message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`,
      data: { _id: user._id, isActive: user.isActive },
    })
  })

  static deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (!user) {
      res.status(404)
      throw new Error('User not found')
    }

    await user.deleteOne()

    res.json({
      success: true,
      message: 'User deleted successfully',
    })
  })

  static getAllJobs = asyncHandler(async (req, res) => {
    const jobs = await JobListing.find({})
      .populate('employer', 'name companyName email')
      .sort({ createdAt: -1 })

    res.json({
      success: true,
      count: jobs.length,
      data: jobs,
    })
  })

  static getPendingJobs = asyncHandler(async (req, res) => {
    const jobs = await JobListing.find({ status: 'pending' })
      .populate('employer', 'name companyName email')
      .sort({ createdAt: -1 })

    res.json({
      success: true,
      count: jobs.length,
      data: jobs,
    })
  })

  static approveJob = asyncHandler(async (req, res) => {
    const job = await JobListing.findById(req.params.id)

    if (!job) {
      res.status(404)
      throw new Error('Job not found')
    }

    job.status = 'active'
    await job.save()

    res.json({
      success: true,
      message: 'Job listing approved and is now active',
      data: job,
    })
  })

  static rejectJob = asyncHandler(async (req, res) => {
    const job = await JobListing.findById(req.params.id)

    if (!job) {
      res.status(404)
      throw new Error('Job not found')
    }

    job.status = 'rejected'
    await job.save()

    res.json({
      success: true,
      message: 'Job listing has been rejected',
      data: job,
    })
  })

  static getDashboardStats = asyncHandler(async (req, res) => {
    const totalUsers = await User.countDocuments()
    const totalEmployers = await User.countDocuments({ role: 'employer' })
    const totalJobSeekers = await User.countDocuments({ role: 'jobseeker' })
    const totalJobs = await JobListing.countDocuments()
    const activeJobs = await JobListing.countDocuments({ status: 'active' })
    const pendingJobs = await JobListing.countDocuments({ status: 'pending' })
    const totalApplications = await Application.countDocuments()

    res.json({
      success: true,
      data: {
        totalUsers,
        totalEmployers,
        totalJobSeekers,
        totalJobs,
        activeJobs,
        pendingJobs,
        totalApplications,
      },
    })
  })
}

module.exports = AdminController