const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const db = require('./config/db')
const ErrorMiddleware = require('./middleware/errorMiddleware')

dotenv.config()

// Connect to database
db.connect()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/jobs', require('./routes/jobRoutes'))
app.use('/api/applications', require('./routes/applicationRoutes'))
app.use('/api/admin', require('./routes/adminRoutes'))

// Health check route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Elevate Workforce Solutions API is running',
    version: '1.0.0'
  })
})

// Error handling middleware
app.use(ErrorMiddleware.notFound)
app.use(ErrorMiddleware.errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})