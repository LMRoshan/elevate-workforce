const jwt = require('jsonwebtoken')

class TokenService {
  static generateToken(userId, role) {
    return jwt.sign(
      { id: userId, role: role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    )
  }

  static verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET)
  }
}

module.exports = TokenService