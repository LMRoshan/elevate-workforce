import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import Spinner from '../components/common/Spinner'
import { useAuth } from '../context/AuthContext'
import axios from '../utils/axios'

const EmployerDashboard = () => {
  const { user } = useAuth()
  const [jobs, setJobs] = useState([])
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const [jobsRes, appsRes] = await Promise.all([
        axios.get('/jobs/employer/listings'),
        axios.get('/applications/employer'),
      ])
      setJobs(jobsRes.data.data)
      setApplications(appsRes.data.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job listing?')) return
    try {
      await axios.delete(`/jobs/${id}`)
      setJobs(jobs.filter((job) => job._id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  const handleStatusUpdate = async (appId, status) => {
    try {
      await axios.put(`/applications/${appId}/status`, { status })
      setApplications(applications.map((app) =>
        app._id === appId ? { ...app, status } : app
      ))
    } catch (error) {
      console.error(error)
    }
  }

  const getBadgeClass = (status) => {
    const classes = {
      active: 'badge-active',
      pending: 'badge-pending',
      closed: 'badge-rejected',
      rejected: 'badge-rejected',
      shortlisted: 'badge-shortlisted',
      reviewed: 'badge-reviewed',
    }
    return classes[status] || 'badge-pending'
  }

  const stats = [
    { label: 'Total Jobs Posted', value: jobs.length, icon: '💼' },
    { label: 'Applications Received', value: applications.length, icon: '📋' },
    { label: 'Active Listings', value: jobs.filter(j => j.status === 'active').length, icon: '✅' },
    { label: 'Pending Approval', value: jobs.filter(j => j.status === 'pending').length, icon: '⏳' },
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
              Welcome back, {user?.companyName || user?.name}
            </h1>
            <p className="font-body text-gray-500 text-sm mt-1">
              Here is an overview of your hiring activity
            </p>
          </div>
          <Link to="/employer/post-job" className="btn-primary text-sm">
            + Post New Job
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

        {/* My Job Listings */}
        <div className="card mb-8">
          <h2 className="font-headline text-lg font-bold text-gray-900 mb-4">
            My Job Listings
          </h2>
          {jobs.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-3xl mb-2">📝</p>
              <p className="font-body text-gray-500">No job listings yet</p>
              <Link to="/employer/post-job" className="btn-primary text-sm mt-4 inline-block">
                Post Your First Job
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
                      Status
                    </th>
                    <th className="font-body text-xs font-semibold text-gray-500 uppercase px-4 py-3">
                      Applications
                    </th>
                    <th className="font-body text-xs font-semibold text-gray-500 uppercase px-4 py-3">
                      Deadline
                    </th>
                    <th className="font-body text-xs font-semibold text-gray-500 uppercase px-4 py-3 rounded-r-xl">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job, index) => (
                    <tr
                      key={job._id}
                      className={index % 2 === 0 ? 'bg-white' : 'bg-neutral'}
                    >
                      <td className="px-4 py-3 font-body font-medium text-gray-900 text-sm">
                        {job.title}
                      </td>
                      <td className="px-4 py-3">
                        <span className={getBadgeClass(job.status)}>
                          {job.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-body text-gray-600 text-sm">
                        {job.applicationCount}
                      </td>
                      <td className="px-4 py-3 font-body text-gray-600 text-sm">
                        {new Date(job.deadline).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-2">
                          <Link
                            to={`/employer/edit-job/${job._id}`}
                            className="text-primary hover:underline font-body text-sm"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(job._id)}
                            className="text-red-500 hover:underline font-body text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recent Applications */}
        <div className="card">
          <h2 className="font-headline text-lg font-bold text-gray-900 mb-4">
            Recent Applications
          </h2>
          {applications.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-3xl mb-2">📭</p>
              <p className="font-body text-gray-500">No applications received yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-neutral-dark text-left">
                    <th className="font-body text-xs font-semibold text-gray-500 uppercase px-4 py-3 rounded-l-xl">
                      Applicant
                    </th>
                    <th className="font-body text-xs font-semibold text-gray-500 uppercase px-4 py-3">
                      Job
                    </th>
                    <th className="font-body text-xs font-semibold text-gray-500 uppercase px-4 py-3">
                      Applied
                    </th>
                    <th className="font-body text-xs font-semibold text-gray-500 uppercase px-4 py-3">
                      Status
                    </th>
                    <th className="font-body text-xs font-semibold text-gray-500 uppercase px-4 py-3 rounded-r-xl">
                      Update
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {applications.slice(0, 10).map((app, index) => (
                    <tr
                      key={app._id}
                      className={index % 2 === 0 ? 'bg-white' : 'bg-neutral'}
                    >
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-body font-medium text-gray-900 text-sm">
                            {app.applicant?.name}
                          </p>
                          <p className="font-body text-gray-400 text-xs">
                            {app.applicant?.email}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-body text-gray-600 text-sm">
                        {app.job?.title}
                      </td>
                      <td className="px-4 py-3 font-body text-gray-600 text-sm">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <span className={getBadgeClass(app.status)}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={app.status}
                          onChange={(e) => handleStatusUpdate(app._id, e.target.value)}
                          className="font-body text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:border-primary"
                        >
                          <option value="pending">Pending</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="shortlisted">Shortlisted</option>
                          <option value="rejected">Rejected</option>
                        </select>
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

export default EmployerDashboard