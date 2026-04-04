import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import Spinner from '../components/common/Spinner'
import axios from '../utils/axios'

const CATEGORIES = [
  'IT & Software', 'Marketing', 'Finance', 'Healthcare',
  'Education', 'Engineering', 'Sales', 'Design', 'Administration', 'Other'
]

const EditJob = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    title: '', description: '', requirements: '',
    salary: '', location: '', category: '', jobType: 'Full Time', deadline: '',
  })

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data } = await axios.get(`/jobs/${id}`)
        const job = data.data
        setFormData({
          title: job.title,
          description: job.description,
          requirements: job.requirements,
          salary: job.salary,
          location: job.location,
          category: job.category,
          jobType: job.jobType,
          deadline: job.deadline?.split('T')[0],
        })
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchJob()
  }, [id])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      await axios.put(`/jobs/${id}`, formData)
      navigate('/employer/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update job listing')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="min-h-screen bg-neutral"><Navbar /><Spinner /></div>

  return (
    <div className="min-h-screen bg-neutral">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link to="/employer/dashboard" className="text-gray-400 hover:text-primary font-body text-sm block mb-8">
          ← Back to Dashboard
        </Link>
        <div className="card">
          <h1 className="font-headline text-2xl font-bold text-gray-900 mb-2">
            Edit Job Listing
          </h1>
          <p className="font-body text-gray-500 text-sm mb-6">
            Updating this listing will reset it to pending status for admin review.
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm mb-6 font-body">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="font-body text-sm font-medium text-gray-700 block mb-1">Job Title *</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} className="input-field" required />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="font-body text-sm font-medium text-gray-700 block mb-1">Category *</label>
                <select name="category" value={formData.category} onChange={handleChange} className="input-field" required>
                  <option value="">Select Category</option>
                  {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div>
                <label className="font-body text-sm font-medium text-gray-700 block mb-1">Job Type</label>
                <select name="jobType" value={formData.jobType} onChange={handleChange} className="input-field">
                  {['Full Time', 'Part Time', 'Remote', 'Contract', 'Internship'].map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="font-body text-sm font-medium text-gray-700 block mb-1">Location *</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} className="input-field" required />
              </div>
              <div>
                <label className="font-body text-sm font-medium text-gray-700 block mb-1">Salary Range</label>
                <input type="text" name="salary" value={formData.salary} onChange={handleChange} className="input-field" />
              </div>
            </div>
            <div>
              <label className="font-body text-sm font-medium text-gray-700 block mb-1">Application Deadline *</label>
              <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} className="input-field" required />
            </div>
            <div>
              <label className="font-body text-sm font-medium text-gray-700 block mb-1">Job Description *</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows={5} className="input-field resize-none" required />
            </div>
            <div>
              <label className="font-body text-sm font-medium text-gray-700 block mb-1">Requirements *</label>
              <textarea name="requirements" value={formData.requirements} onChange={handleChange} rows={4} className="input-field resize-none" required />
            </div>
            <div className="flex space-x-3 pt-2">
              <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <Link to="/employer/dashboard" className="btn-outline">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default EditJob