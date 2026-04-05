import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from '../utils/axios'
import { HiArrowLeft } from 'react-icons/hi'

const Register = () => {
  const [role, setRole] = useState('jobseeker')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    location: '',
    skills: '',
    experience: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match')
    }

    setLoading(true)
    try {
      const { data } = await axios.post('/auth/register', {
        ...formData,
        role,
      })

      const { token, user } = data.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      login(data.data)

      if (role === 'employer') navigate('/employer/dashboard')
      else navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral flex flex-col items-center justify-center px-4 py-10">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2 mb-8">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
          <span className="text-white font-headline font-bold">E</span>
        </div>
        <span className="font-headline font-bold text-primary text-xl">
          Elevate Workforce
        </span>
      </Link>

      {/* Card */}
      <div className="card w-full max-w-md relative pt-12">
        {/* Back to Dashboard (Public Home) Button */}
        <Link 
          to="/" 
          className="absolute top-6 left-8 flex items-center text-xs font-bold text-gray-400 hover:text-primary transition-all group"
        >
          <HiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Link>

        <h2 className="font-headline text-2xl font-bold text-gray-900 mb-2">
          Create Account
        </h2>
        <p className="font-body text-gray-500 text-sm mb-6">
          Join Nepal's leading job portal today
        </p>

        {/* Role Toggle */}
        <div className="flex bg-neutral-dark rounded-xl p-1 mb-6">
          <button
            type="button"
            onClick={() => setRole('jobseeker')}
            className={`flex-1 py-2 rounded-lg font-body text-sm font-medium transition-all ${
              role === 'jobseeker'
                ? 'bg-primary text-white shadow-sm'
                : 'text-gray-600 hover:text-primary'
            }`}
          >
            Job Seeker
          </button>
          <button
            type="button"
            onClick={() => setRole('employer')}
            className={`flex-1 py-2 rounded-lg font-body text-sm font-medium transition-all ${
              role === 'employer'
                ? 'bg-primary text-white shadow-sm'
                : 'text-gray-600 hover:text-primary'
            }`}
          >
            Employer
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm mb-4 font-body">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-body text-sm font-medium text-gray-700 block mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="font-body text-sm font-medium text-gray-700 block mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              className="input-field"
              required
            />
          </div>

          {role === 'employer' && (
            <div>
              <label className="font-body text-sm font-medium text-gray-700 block mb-1">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Your Company Pvt Ltd"
                className="input-field"
                required
              />
            </div>
          )}

          <div>
            <label className="font-body text-sm font-medium text-gray-700 block mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Kathmandu, Nepal"
              className="input-field"
            />
          </div>

          {role === 'jobseeker' && (
            <>
              <div>
                <label className="font-body text-sm font-medium text-gray-700 block mb-1">
                  Skills
                </label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="React, Node.js, Python..."
                  className="input-field"
                />
              </div>
              <div>
                <label className="font-body text-sm font-medium text-gray-700 block mb-1">
                  Experience
                </label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="2 years"
                  className="input-field"
                />
              </div>
            </>
          )}

          <div>
            <label className="font-body text-sm font-medium text-gray-700 block mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="font-body text-sm font-medium text-gray-700 block mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="input-field"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full text-center disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Create Account →'}
          </button>
        </form>

        <p className="font-body text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register