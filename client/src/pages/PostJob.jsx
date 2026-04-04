import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import axios from '../utils/axios'

const CATEGORIES = [
  'IT & Software', 'Marketing', 'Finance', 'Healthcare',
  'Education', 'Engineering', 'Sales', 'Design', 'Administration', 'Other'
]

const PostJob = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    salary: '',
    location: '',
    category: '',
    jobType: 'Full Time',
    deadline: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await axios.post('/jobs', formData)
      navigate('/employer/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create job listing')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center space-x-4 mb-8">
          <Link to="/employer/dashboard" className="text-gray-400 hover:text-primary font-body text-sm">
            ← Back to Dashboard
          </Link>
        </div>

        <div className="card">
          <h1 className="font-headline text-2xl font-bold text-gray-900 mb-2">
            Post a New Job
          </h1>
          <p className="font-body text-gray-500 text-sm mb-6">
            Fill in the details below. Your listing will be reviewed by admin before going live.
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm mb-6 font-body">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="font-body text-sm font-medium text-gray-700 block mb-1">
                Job Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Senior React Developer"
                className="input-field"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="font-body text-sm font-medium text-gray-700 block mb-1">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="">Select Category</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-body text-sm font-medium text-gray-700 block mb-1">
                  Job Type
                </label>
                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  className="input-field"
                >
                  {['Full Time', 'Part Time', 'Remote', 'Contract', 'Internship'].map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="font-body text-sm font-medium text-gray-700 block mb-1">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Kathmandu, Nepal"
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="font-body text-sm font-medium text-gray-700 block mb-1">
                  Salary Range
                </label>
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="Rs. 50,000 - 80,000"
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="font-body text-sm font-medium text-gray-700 block mb-1">
                Application Deadline *
              </label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="font-body text-sm font-medium text-gray-700 block mb-1">
                Job Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                placeholder="Describe the role, responsibilities and what the candidate will be doing..."
                className="input-field resize-none"
                required
              />
            </div>

            <div>
              <label className="font-body text-sm font-medium text-gray-700 block mb-1">
                Requirements *
              </label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                rows={4}
                placeholder="List the required skills, experience and qualifications..."
                className="input-field resize-none"
                required
              />
            </div>

            <div className="bg-yellow-50 border border-yellow-200 px-4 py-3 rounded-xl">
              <p className="font-body text-yellow-700 text-sm">
                ⚠️ Your listing will be reviewed by admin before going live on the platform.
              </p>
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Submit Job Listing'}
              </button>
              <Link to="/employer/dashboard" className="btn-outline">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default PostJob