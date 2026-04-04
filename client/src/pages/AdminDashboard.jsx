import { useState, useEffect } from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import Spinner from '../components/common/Spinner'
import axios from '../utils/axios'

const AdminDashboard = () => {
  const [stats, setStats] = useState(null)
  const [pendingJobs, setPendingJobs] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  const fetchData = async () => {
    try {
      const [statsRes, pendingRes, usersRes] = await Promise.all([
        axios.get('/admin/stats'),
        axios.get('/admin/jobs/pending'),
        axios.get('/admin/users'),
      ])
      setStats(statsRes.data.data)
      setPendingJobs(pendingRes.data.data)
      setUsers(usersRes.data.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleApprove = async (id) => {
    try {
      await axios.put(`/admin/jobs/${id}/approve`)
      setPendingJobs(pendingJobs.filter((job) => job._id !== id))
      setStats({ ...stats, pendingJobs: stats.pendingJobs - 1, activeJobs: stats.activeJobs + 1 })
    } catch (error) {
      console.error(error)
    }
  }

  const handleReject = async (id) => {
    try {
      await axios.put(`/admin/jobs/${id}/reject`)
      setPendingJobs(pendingJobs.filter((job) => job._id !== id))
      setStats({ ...stats, pendingJobs: stats.pendingJobs - 1 })
    } catch (error) {
      console.error(error)
    }
  }

  const handleToggleUser = async (id) => {
    try {
      await axios.put(`/admin/users/${id}`)
      setUsers(users.map((u) =>
        u._id === id ? { ...u, isActive: !u.isActive } : u
      ))
    } catch (error) {
      console.error(error)
    }
  }

  const getRoleBadge = (role) => {
    const classes = {
      employer: 'bg-blue-100 text-blue-700',
      jobseeker: 'bg-green-100 text-green-700',
      admin: 'bg-purple-100 text-purple-700',
    }
    return `px-3 py-1 rounded-full text-xs font-semibold ${classes[role] || 'bg-gray-100 text-gray-700'}`
  }

  if (loading) return <div className="min-h-screen bg-neutral"><Navbar /><Spinner /></div>

  return (
    <div className="min-h-screen bg-neutral">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-headline text-2xl font-bold text-gray-900">
            Admin Panel
          </h1>
          <p className="font-body text-gray-500 text-sm mt-1">
            Manage users, job listings and platform activity
          </p>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Users', value: stats.totalUsers, icon: '👥' },
              { label: 'Total Jobs', value: stats.totalJobs, icon: '💼' },
              { label: 'Pending Approvals', value: stats.pendingJobs, icon: '⏳', highlight: true },
              { label: 'Total Applications', value: stats.totalApplications, icon: '📋' },
            ].map((stat, i) => (
              <div key={i} className={`card text-center ${stat.highlight && stats.pendingJobs > 0 ? 'border-2 border-secondary' : ''}`}>
                <span className="text-3xl">{stat.icon}</span>
                <p className={`font-headline text-2xl font-bold mt-2 ${stat.highlight && stats.pendingJobs > 0 ? 'text-secondary' : 'text-primary'}`}>
                  {stat.value}
                </p>
                <p className="font-body text-gray-500 text-xs mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div className="flex space-x-2 mb-6">
          {[
            { key: 'overview', label: `Pending Approvals (${pendingJobs.length})` },
            { key: 'users', label: `All Users (${users.length})` },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-xl font-body text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-600 hover:text-primary border border-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Pending Jobs Tab */}
        {activeTab === 'overview' && (
          <div className="card">
            <h2 className="font-headline text-lg font-bold text-gray-900 mb-4">
              Pending Job Approvals
            </h2>
            {pendingJobs.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-4xl mb-4">✅</p>
                <p className="font-headline text-gray-500 text-lg">
                  All caught up!
                </p>
                <p className="font-body text-gray-400 text-sm mt-2">
                  No pending job listings to review
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-neutral-dark text-left">
                      <th className="font-body text-xs font-semibold text-gray-500 uppercase px-4 py-3 rounded-l-xl">Job Title</th>
                      <th className="font-body text-xs font-semibold text-gray-500 uppercase px-4 py-3">Company</th>
                      <th className="font-body text-xs font-semibold text-gray-500 uppercase px-4 py-3">Category</th>
                      <th className="font-body text-xs font-semibold text-gray-500 uppercase px-4 py-3">Posted</th>
                      <th className="font-body text-xs font-semibold text-gray-500 uppercase px-4 py-3 rounded-r-xl">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingJobs.map((job, index) => (
                      <tr key={job._id} className={index % 2 === 0 ? 'bg-white' : 'bg-neutral'}>
                        <td className="px-4 py-3 font-body font-medium text-gray-900 text-sm">{job.title}</td>
                        <td className="px-4 py-3 font-body text-gray-600 text-sm">{job.employer?.companyName}</td>
                        <td className="px-4 py-3 font-body text-gray-600 text-sm">{job.category}</td>
                        <td className="px-4 py-3 font-body text-gray-600 text-sm">{new Date(job.createdAt).toLocaleDateString()}</td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleApprove(job._id)}
                              className="bg-green-500 text-white px-3 py-1 rounded-lg text-xs font-semibold hover:bg-green-600 transition-colors"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(job._id)}
                              className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-semibold hover:bg-red-600 transition-colors"
                            >
                              Reject
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
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="card">
            <h2 className="font-headline text-lg font-bold text-gray-900 mb-4">
              All Users
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-neutral-dark text-left">
                    <th className="font-body text-xs font-semibold text-gray-500 uppercase px-4 py-3 rounded-l-xl">Name</th>
                    <th className="font-body text-xs font-semibold text-gray-500 uppercase px-4 py-3">Email</th>
                    <th className="font-body text-xs font-semibold text-gray-500 uppercase px-4 py-3">Role</th>
                    <th className="font-body text-xs font-semibold text-gray-500 uppercase px-4 py-3">Joined</th>
                    <th className="font-body text-xs font-semibold text-gray-500 uppercase px-4 py-3">Status</th>
                    <th className="font-body text-xs font-semibold text-gray-500 uppercase px-4 py-3 rounded-r-xl">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, index) => (
                    <tr key={u._id} className={index % 2 === 0 ? 'bg-white' : 'bg-neutral'}>
                      <td className="px-4 py-3 font-body font-medium text-gray-900 text-sm">{u.name}</td>
                      <td className="px-4 py-3 font-body text-gray-600 text-sm">{u.email}</td>
                      <td className="px-4 py-3">
                        <span className={getRoleBadge(u.role)}>{u.role}</span>
                      </td>
                      <td className="px-4 py-3 font-body text-gray-600 text-sm">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <span className={u.isActive ? 'badge-active' : 'badge-rejected'}>
                          {u.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {u.role !== 'admin' && (
                          <button
                            onClick={() => handleToggleUser(u._id)}
                            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                              u.isActive
                                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                                : 'bg-green-100 text-green-600 hover:bg-green-200'
                            }`}
                          >
                            {u.isActive ? 'Deactivate' : 'Activate'}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default AdminDashboard