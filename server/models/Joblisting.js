const mongoose = require('mongoose')

class JobListingSchema {
  static getSchema() {
    const schema = new mongoose.Schema(
      {
        title: {
          type: String,
          required: [true, 'Job title is required'],
          trim: true,
        },
        description: {
          type: String,
          required: [true, 'Job description is required'],
        },
        requirements: {
          type: String,
          required: [true, 'Job requirements are required'],
        },
        salary: {
          type: String,
          default: 'Negotiable',
        },
        location: {
          type: String,
          required: [true, 'Job location is required'],
        },
        category: {
          type: String,
          required: [true, 'Job category is required'],
          enum: [
            'IT & Software',
            'Marketing',
            'Finance',
            'Healthcare',
            'Education',
            'Engineering',
            'Sales',
            'Design',
            'Administration',
            'Other',
          ],
        },
        jobType: {
          type: String,
          enum: ['Full Time', 'Part Time', 'Remote', 'Contract', 'Internship'],
          default: 'Full Time',
        },
        deadline: {
          type: Date,
          required: [true, 'Application deadline is required'],
        },
        status: {
          type: String,
          enum: ['pending', 'active', 'closed', 'rejected'],
          default: 'pending',
        },
        employer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        applicationCount: {
          type: Number,
          default: 0,
        },
      },
      {
        timestamps: true,
      }
    )

    // Index for search performance
    schema.index({ title: 'text', description: 'text' })
    schema.index({ status: 1, category: 1, location: 1 })

    return schema
  }
}

module.exports = mongoose.model('JobListing', JobListingSchema.getSchema())