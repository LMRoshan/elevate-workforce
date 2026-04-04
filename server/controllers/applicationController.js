const asyncHandler = require('express-async-handler')
const Application = require('../models/Application')
const JobListing = require('../models/Joblisting')

class ApplicationController {
  static applyForJob = asyncHandler(async (req, res) => {
    const job = await JobListing.findById(req.params.jobId)

    if (!job) {
      res.status(404)
      throw new Error('Job not found')
    }

    if (job.status !== 'active') {
      res.status(400)
      throw new Error('This job listing is not currently active')
    }

    if (new Date(job.deadline) < new Date()) {
      res.status(400)
      throw new Error('The application deadline for this job has passed')
    }

    const alreadyApplied = await Application.findOne({
      job: req.params.jobId,
      applicant: req.user._id,
    })

    if (alreadyApplied) {
      res.status(400)
      throw new Error('You have already applied for this job')
    }

    const application = await Application.create({
      job: req.params.jobId,
      applicant: req.user._id,
      coverLetter: req.body.coverLetter || '',
    })

    await JobListing.findByIdAndUpdate(req.params.jobId, {
      $inc: { applicationCount: 1 },
    })

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: application,
    })
  })

  static getMyApplications = asyncHandler(async (req, res) => {
    const applications = await Application.find({
      applicant: req.user._id,
    })
      .populate('job', 'title location salary deadline status category')
      .populate('job.employer', 'companyName')
      .sort({ createdAt: -1 })

    res.json({
      success: true,
      count: applications.length,
      data: applications,
    })
  })

  static getEmployerApplications = asyncHandler(async (req, res) => {
    const jobs = await JobListing.find({ employer: req.user._id })
    const jobIds = jobs.map((job) => job._id)

    const applications = await Application.find({ job: { $in: jobIds } })
      .populate('applicant', 'name email skills experience resumeUrl location')
      .populate('job', 'title location deadline')
      .sort({ createdAt: -1 })

    res.json({
      success: true,
      count: applications.length,
      data: applications,
    })
  })

  static updateApplicationStatus = asyncHandler(async (req, res) => {
    const { status } = req.body

    const application = await Application.findById(req.params.id).populate('job')

    if (!application) {
      res.status(404)
      throw new Error('Application not found')
    }

    if (application.job.employer.toString() !== req.user._id.toString()) {
      res.status(403)
      throw new Error('Not authorized to update this application')
    }

    application.status = status
    await application.save()

    res.json({
      success: true,
      message: 'Application status updated successfully',
      data: application,
    })
  })
}

module.exports = ApplicationController