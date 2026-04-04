import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import Spinner from '../components/common/Spinner'
import { useAuth } from '../context/AuthContext'
import axios from '../utils/axios'

const JobDetail = () => {
  const { id } = useParams()
  const { user, isJobSeeker } = useAuth()
  const navigate = useNavigate()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [applying, setApplying] = useState(false)
  const [applied, setApplied] = useState(false)
  const [coverLetter, setCoverLetter] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data } = await axios.get('/jobs/' + id)
        setJob(data.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchJob()
  }, [id])

  const handleApply = async (e) => {
    e.preventDefault()
    if (!user) {
      navigate('/login')
      return
    }
    setApplying(true)
    setError('')
    try {
      await axios.post('/applications/' + id, { coverLetter })
      setApplied(true)
      setShowForm(false)
      setMessage('Application submitted successfully!')
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Application failed')
    } finally {
      setApplying(false)
    }
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-NP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getFirstLetter = (str) => {
    if (!str) return 'E'
    return str.charAt(0)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral">
        <Navbar />
        <Spinner />
      </div>
    )
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-neutral">
        <Navbar />
        <div className="text-center py-20">
          <p className="text-4xl mb-4">🔍</p>
          <p className="font-headline text-xl text-gray-500">Job not found</p>
          <Link to="/jobs" className="btn-primary mt-4 inline-block text-sm">
            Back to Jobs
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">

            {/* Job Header */}
            <div className="card">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center">
                    <span className="text-white font-headline font-bold text-xl">
                      {getFirstLetter(job.employer && job.employer.companyName)}
                    </span>
                  </div>
                  <div>
                    <h1 className="font-headline text-2xl font-bold text-gray-900">
                      {job.title}
                    </h1>
                    <p className="font-body text-gray-500">
                      {job.employer && job.employer.companyName}
                    </p>
                  </div>
                </div>
                <span className="bg-blue-50 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                  {job.jobType}
                </span>
              </div>

              {/* Meta Info */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <span>📍</span>
                  <span className="font-body text-gray-600 text-sm">{job.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>💰</span>
                  <span className="font-body text-gray-600 text-sm">{job.salary}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>📂</span>
                  <span className="font-body text-gray-600 text-sm">{job.category}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>📅</span>
                  <span className="font-body text-gray-600 text-sm">
                    {formatDate(job.deadline)}
                  </span>
                </div>
              </div>

              {/* Messages */}
              {message && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm font-body mb-4">
                  {message}
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-body mb-4">
                  {error}
                </div>
              )}

              {/* Apply Button */}
              {isJobSeeker() && !applied && (
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="btn-primary"
                >
                  {showForm ? 'Cancel' : 'Apply Now'}
                </button>
              )}

              {!user && (
                <Link to="/login" className="btn-primary inline-block">
                  Login to Apply
                </Link>
              )}

              {/* Application Form */}
              {showForm && (
                <form onSubmit={handleApply} className="mt-6 space-y-4">
                  <div>
                    <label className="font-body text-sm font-medium text-gray-700 block mb-1">
                      Cover Letter
                    </label>
                    <textarea
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      rows={5}
                      placeholder="Tell the employer why you are a great fit..."
                      className="input-field resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={applying}
                    className="btn-secondary disabled:opacity-60"
                  >
                    {applying ? 'Submitting...' : 'Submit Application'}
                  </button>
                </form>
              )}
            </div>

            {/* Description */}
            <div className="card">
              <h2 className="font-headline text-lg font-bold text-gray-900 mb-4">
                Job Description
              </h2>
              <p className="font-body text-gray-600 leading-relaxed whitespace-pre-line">
                {job.description}
              </p>
            </div>

            {/* Requirements */}
            <div className="card">
              <h2 className="font-headline text-lg font-bold text-gray-900 mb-4">
                Requirements
              </h2>
              <p className="font-body text-gray-600 leading-relaxed whitespace-pre-line">
                {job.requirements}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">

            {/* Company Info */}
            <div className="card">
              <h3 className="font-headline font-semibold text-gray-900 mb-4">
                Company Information
              </h3>
              <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mb-4">
                <span className="text-white font-headline font-bold text-xl">
                  {getFirstLetter(job.employer && job.employer.companyName)}
                </span>
              </div>
              <p className="font-headline font-semibold text-gray-900">
                {job.employer && job.employer.companyName}
              </p>
              {job.employer && job.employer.location && (
                <p className="font-body text-gray-500 text-sm mt-2">
                  📍 {job.employer.location}
                </p>
              )}
              {job.employer && job.employer.website && (
                <a
                  href={job.employer.website}
                  target="_blank"
                  rel="noreferrer"
                  className="font-body text-primary text-sm hover:underline block mt-2"
                >
                  🌐 Visit Website
                </a>
              )}
            </div>

            {/* Job Overview */}
            <div className="card">
              <h3 className="font-headline font-semibold text-gray-900 mb-4">
                Job Overview
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-body text-gray-500 text-sm">Posted</span>
                  <span className="font-body text-gray-900 text-sm font-medium">
                    {formatDate(job.createdAt)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-body text-gray-500 text-sm">Deadline</span>
                  <span className="font-body text-gray-900 text-sm font-medium">
                    {formatDate(job.deadline)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-body text-gray-500 text-sm">Job Type</span>
                  <span className="font-body text-gray-900 text-sm font-medium">
                    {job.jobType}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-body text-gray-500 text-sm">Category</span>
                  <span className="font-body text-gray-900 text-sm font-medium">
                    {job.category}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-body text-gray-500 text-sm">Salary</span>
                  <span className="font-body text-gray-900 text-sm font-medium">
                    {job.salary}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-body text-gray-500 text-sm">Applications</span>
                  <span className="font-body text-gray-900 text-sm font-medium">
                    {job.applicationCount}
                  </span>
                </div>
              </div>
            </div>

            <Link to="/jobs" className="btn-outline w-full text-center block">
              Back to Jobs
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default JobDetail