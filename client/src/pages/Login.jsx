import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from '../utils/axios'

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
 const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await axios.post("/auth/login", formData);
      const { token } = data.data;

      localStorage.setItem('token', token);

      login(data.data);

      const role = data.data.role;
      if (role === "employer") navigate("/employer/dashboard");
      else if (role === "jobseeker") navigate("/dashboard");
      else if (role === "admin") navigate("/admin/dashboard");
      
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral flex flex-col items-center justify-center px-4">
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
      <div className="card w-full max-w-md">
        <h2 className="font-headline text-2xl font-bold text-gray-900 mb-2">
          Welcome Back
        </h2>
        <p className="font-body text-gray-500 text-sm mb-6">
          Please enter your credentials to continue
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm mb-4 font-body">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full text-center disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>

        <p className="font-body text-center text-sm text-gray-500 mt-6">
          New to Elevate?{' '}
          <Link to="/register" className="text-primary font-semibold hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login