import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/common/ProtectedRoute'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import JobListings from './pages/JobListings'
import JobDetail from './pages/JobDetail'
import EmployerDashboard from './pages/EmployerDashboard'
import PostJob from './pages/PostJob'
import EditJob from './pages/EditJob'
import JobSeekerDashboard from './pages/JobSeerkerDashbaord'
import AdminDashboard from './pages/AdminDashboard'
import NotFound from './pages/NotFound'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="/jobs" element={<JobListings />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/dashboard" element={
            <ProtectedRoute roles={['jobseeker']}>
              <JobSeekerDashboard />
            </ProtectedRoute>
          } />
          <Route path="/employer/dashboard" element={
            <ProtectedRoute roles={['employer']}>
              <EmployerDashboard />
            </ProtectedRoute>
          } />
          <Route path="/employer/post-job" element={
            <ProtectedRoute roles={['employer']}>
              <PostJob />
            </ProtectedRoute>
          } />
          <Route path="/employer/edit-job/:id" element={
            <ProtectedRoute roles={['employer']}>
              <EditJob />
            </ProtectedRoute>
          } />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute roles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App