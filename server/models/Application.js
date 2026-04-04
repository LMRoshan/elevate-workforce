const mongoose = require('mongoose')

class ApplicationSchema {
  static getSchema() {
    const schema = new mongoose.Schema(
      {
        job: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'JobListing',
          required: [true, 'Job reference is required'],
        },
        applicant: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: [true, 'Applicant reference is required'],
        },
        coverLetter: {
          type: String,
          default: '',
        },
        status: {
          type: String,
          enum: ['pending', 'reviewed', 'shortlisted', 'rejected'],
          default: 'pending',
        },
      },
      {
        timestamps: true,
      }
    )

    schema.index({ job: 1, applicant: 1 }, { unique: true })

    return schema
  }
}

module.exports = mongoose.model('Application', ApplicationSchema.getSchema())