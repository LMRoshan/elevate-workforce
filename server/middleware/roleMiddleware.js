class RoleMiddleware {
  // Authorize specific roles
  static authorize(...roles) {
    return (req, res, next) => {
      if (!req.user) {
        res.status(401)
        throw new Error('Not authorized')
      }

      if (!roles.includes(req.user.role)) {
        res.status(403)
        throw new Error(
          `Role '${req.user.role}' is not authorized to access this route`
        )
      }

      next()
    }
  }
}

module.exports = RoleMiddleware