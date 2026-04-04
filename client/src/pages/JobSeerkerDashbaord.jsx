import { useState, useEffect } from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import Spinner from '../components/common/Spinner'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from '../utils/axios'

const JobSeekerDashboard = () => {
  const { user } = useAuth()
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data } = await axios.get('/applications/my')
        setApplications(data.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchApplications()
  }, [])

  const getBadgeClass = (status) => {
    const classes = {
      pending: 'badge-pending',
      reviewed: 'badge-reviewed',
      shortlisted: 'badge-shortlisted',
      rejected: 'badge-rejected',
    }
    return classes[status] || 'badge-pending'
  }

  const stats = [
    { label: 'Jobs Applied', value: applications.length, icon: '📋' },
    { label: 'Under Review', value: applications.filter(a => a.status === 'reviewed').length, icon: '🔍' },
    { label: 'Shortlisted', value: applications.filter(a => a.status === 'shortlisted').length, icon: '⭐' },
    { label: 'Rejected', value: applications.filter(a => a.status === 'rejected').length, icon: '❌' },
  ]

  if (loading) return <div className="min-h-screen bg-neutral"><Navbar /><Spinner /></div>

  return (
    <div className="min-h-screen bg-neutral">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="font-headline text-2xl font-bold text-gray-900">
              Welcome back, {user?.name}
            </h1>
            <p className="font-body text-gray-500 text-sm mt-1">
              Track your job applications and career progress
            </p>
          </div>
          <Link to="/jobs" className="btn-primary text-sm">
            Browse Jobs
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="card text-center">
              <span className="text-3xl">{stat.icon}</span>
              <p className="font-headline text-2xl font-bold text-primary mt-2">
                {stat.value}
              </p>
              <p className="font-body text-gray-500 text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Applications Table */}
        <div className="card">
          <h2 className="font-headline text-lg font-bold text-gray-900 mb-4">
            My Applications
          </h2>

          {applications.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-4xl mb-4">📭</p>
              <p className="font-headline text-gray-500 text-lg">
                No applications yet
              </p>
              <p className="font-body text-gray-400 text-sm mt-2 mb-6">
                Start applying for jobs to track your progress here
              </p>
              <Link to="/jobs" className="btn-primary text-sm">
                Browse Jobs
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-neutral-dark text-left">
                    <th className="font-body text-xs font-semibold text-gray-500 uppercase px-4 py-3 rounded-l-xl">
                      Job Title
                    </th>
                    <th className="font-body text-xs font-semibold text-gray-500 uppercase px-4 py-3">
                      Location
                    </th>
                    <th className="font-body text-xs font-semibold text-gray-500 uppercase px-4 py-3">
                      Applied Date
                    </th>
                    <th className="font-body text-xs font-semibold text-gray-500 uppercase px-4 py-3">
                      Deadline
                    </th>
                    <th className="font-body text-xs font-semibold text-gray-500 uppercase px-4 py-3 rounded-r-xl">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app, index) => (
                    <tr
                      key={app._id}
                      className={index % 2 === 0 ? 'bg-white' : 'bg-neutral'}
                    >
                      <td className="px-4 py-3">
                        <Link
                          to={`/jobs/${app.job?._id}`}
                          className="font-body font-medium text-primary hover:underline text-sm"
                        >
                          {app.job?.title}
                        </Link>
                      </td>
                      <td className="px-4 py-3 font-body text-gray-600 text-sm">
                        {app.job?.location}
                      </td>
                      <td className="px-4 py-3 font-body text-gray-600 text-sm">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 font-body text-gray-600 text-sm">
                        {new Date(app.job?.deadline).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <span className={getBadgeClass(app.status)}>
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default JobSeekerDashboard