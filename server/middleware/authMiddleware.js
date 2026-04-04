const asyncHandler = require('express-async-handler')
const User = require('../models/User')
const TokenService = require('../utils/generateToken')

class AuthMiddleware {
  // Protect routes — verify JWT
  static protect = asyncHandler(async (req, res, next) => {
    let token

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
      res.status(401)
      throw new Error('Not authorized, no token provided')
    }

    const decoded = TokenService.verifyToken(token)
    req.user = await User.findById(decoded.id).select('-password')

    if (!req.user) {
      res.status(401)
      throw new Error('Not authorized, user not found')
    }

    next()
  })
}

module.exports = AuthMiddleware