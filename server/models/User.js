const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

class UserSchema {
  static getSchema() {
    const schema = new mongoose.Schema(
      {
        name: {
          type: String,
          required: [true, 'Name is required'],
          trim: true,
        },
        email: {
          type: String,
          required: [true, 'Email is required'],
          unique: true,
          lowercase: true,
          trim: true,
          match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please enter a valid email',
          ],
        },
        password: {
          type: String,
          required: [true, 'Password is required'],
          minlength: [6, 'Password must be at least 6 characters'],
        },
        role: {
          type: String,
          enum: ['jobseeker', 'employer', 'admin'],
          required: [true, 'Role is required'],
        },
        // Employer specific fields
        companyName: {
          type: String,
          default: null,
        },
        companyDescription: {
          type: String,
          default: null,
        },
        website: {
          type: String,
          default: null,
        },
        // Job Seeker specific fields
        skills: {
          type: String,
          default: null,
        },
        experience: {
          type: String,
          default: null,
        },
        resumeUrl: {
          type: String,
          default: null,
        },
        // Shared profile fields
        location: {
          type: String,
          default: null,
        },
        isActive: {
          type: Boolean,
          default: true,
        },
      },
      {
        timestamps: true,
      }
    )

    // Hash password before saving
    schema.pre('save', async function (next) {
      if (!this.isModified('password')) return next()
      const salt = await bcrypt.genSalt(10)
      this.password = await bcrypt.hash(this.password, salt)
      next()
    })

    // Method to compare passwords
    schema.methods.matchPassword = async function (enteredPassword) {
      return await bcrypt.compare(enteredPassword, this.password)
    }

    // Method to get public profile (exclude password)
    schema.methods.toPublicProfile = function () {
      const user = this.toObject()
      delete user.password
      return user
    }

    return schema
  }
}

module.exports = mongoose.model('User', UserSchema.getSchema())