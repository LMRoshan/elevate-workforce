const asyncHandler = require('express-async-handler')
const JobListing = require('../models/Joblisting')

class JobController {
  static getAllJobs = asyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    const filter = { status: 'active' }

    if (req.query.keyword) {
      filter.title = { $regex: req.query.keyword, $options: 'i' }
    }
    if (req.query.category) {
      filter.category = req.query.category
    }
    if (req.query.location) {
      filter.location = { $regex: req.query.location, $options: 'i' }
    }
    if (req.query.jobType) {
      filter.jobType = req.query.jobType
    }

    const total = await JobListing.countDocuments(filter)
    const jobs = await JobListing.find(filter)
      .populate('employer', 'name companyName location website')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    res.json({
      success: true,
      data: jobs,
      pagination: {
        page,
        pages: Math.ceil(total / limit),
        total,
        limit,
      },
    })
  })

  static getJobById = asyncHandler(async (req, res) => {
    const job = await JobListing.findById(req.params.id).populate(
      'employer',
      'name companyName companyDescription location website'
    )

    if (!job) {
      res.status(404)
      throw new Error('Job not found')
    }

    res.json({
      success: true,
      data: job,
    })
  })

  static createJob = asyncHandler(async (req, res) => {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      category,
      jobType,
      deadline,
    } = req.body

    if (!title || !description || !requirements || !location || !category || !deadline) {
      res.status(400)
      throw new Error('Please provide all required fields')
    }

    const job = await JobListing.create({
      title,
      description,
      requirements,
      salary,
      location,
      category,
      jobType,
      deadline,
      employer: req.user._id,
      status: 'pending',
    })

    res.status(201).json({
      success: true,
      message: 'Job listing created successfully. Awaiting admin approval.',
      data: job,
    })
  })

  static updateJob = asyncHandler(async (req, res) => {
    const job = await JobListing.findById(req.params.id)

    if (!job) {
      res.status(404)
      throw new Error('Job not found')
    }

    // Check ownership
    if (job.employer.toString() !== req.user._id.toString()) {
      res.status(403)
      throw new Error('Not authorized to update this job listing')
    }

    const updatedJob = await JobListing.findByIdAndUpdate(
      req.params.id,
      { ...req.body, status: 'pending' },
      { new: true, runValidators: true }
    )

    res.json({
      success: true,
      message: 'Job listing updated successfully',
      data: updatedJob,
    })
  })

  static deleteJob = asyncHandler(async (req, res) => {
    const job = await JobListing.findById(req.params.id)

    if (!job) {
      res.status(404)
      throw new Error('Job not found')
    }

    // Check ownership
    if (job.employer.toString() !== req.user._id.toString()) {
      res.status(403)
      throw new Error('Not authorized to delete this job listing')
    }

    await job.deleteOne()

    res.json({
      success: true,
      message: 'Job listing deleted successfully',
    })
  })

  static getEmployerJobs = asyncHandler(async (req, res) => {
    const jobs = await JobListing.find({ employer: req.user._id })
      .sort({ createdAt: -1 })

    res.json({
      success: true,
      count: jobs.length,
      data: jobs,
    })
  })
}

module.exports = JobController