const asyncHandler = require('express-async-handler')
const User = require('../models/User')
const TokenService = require('../utils/generateToken')

class AuthController {
  static register = asyncHandler(async (req, res) => {
    const {
      name,
      email,
      password,
      role,
      companyName,
      companyDescription,
      website,
      location,
      skills,
      experience,
    } = req.body

    // Validation
    if (!name || !email || !password || !role) {
      res.status(400)
      throw new Error('Please provide all required fields')
    }

    // Check if user exists
    const userExists = await User.findOne({ email })
    if (userExists) {
      res.status(400)
      throw new Error('User already exists with this email')
    }

    // Employer validation
    if (role === 'employer' && !companyName) {
      res.status(400)
      throw new Error('Company name is required for employer registration')
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role,
      companyName: role === 'employer' ? companyName : null,
      companyDescription: role === 'employer' ? companyDescription : null,
      website: role === 'employer' ? website : null,
      location,
      skills: role === 'jobseeker' ? skills : null,
      experience: role === 'jobseeker' ? experience : null,
    })

    const token = TokenService.generateToken(user._id, user.role)

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        companyName: user.companyName,
        location: user.location,
        token,
      },
    })
  })

  static login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
      res.status(400)
      throw new Error('Please provide email and password')
    }

    const user = await User.findOne({ email })

    if (!user || !(await user.matchPassword(password))) {
      res.status(401)
      throw new Error('Invalid email or password')
    }

    if (!user.isActive) {
      res.status(403)
      throw new Error('Your account has been deactivated')
    }

    const token = TokenService.generateToken(user._id, user.role)

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        companyName: user.companyName,
        location: user.location,
        skills: user.skills,
        experience: user.experience,
        token,
      },
    })
  })

  static getProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password')

    if (!user) {
      res.status(404)
      throw new Error('User not found')
    }

    res.json({
      success: true,
      data: user,
    })
  })

  static updateProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (!user) {
      res.status(404)
      throw new Error('User not found')
    }

    user.name = req.body.name || user.name
    user.location = req.body.location || user.location

    if (user.role === 'employer') {
      user.companyName = req.body.companyName || user.companyName
      user.companyDescription =
        req.body.companyDescription || user.companyDescription
      user.website = req.body.website || user.website
    }

    if (user.role === 'jobseeker') {
      user.skills = req.body.skills || user.skills
      user.experience = req.body.experience || user.experience
      user.resumeUrl = req.body.resumeUrl || user.resumeUrl
    }

    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        companyName: updatedUser.companyName,
        location: updatedUser.location,
        skills: updatedUser.skills,
        experience: updatedUser.experience,
      },
    })
  })
}

module.exports = AuthController