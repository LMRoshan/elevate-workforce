import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import JobCard from '../components/jobs/JobCard'
import Pagination from '../components/jobs/Pagination'
import Spinner from '../components/common/Spinner'
import axios from '../utils/axios'

const CATEGORIES = [
  'All', 'IT & Software', 'Marketing', 'Finance', 'Healthcare',
  'Education', 'Engineering', 'Sales', 'Design', 'Administration', 'Other'
]

const JOB_TYPES = ['All', 'Full Time', 'Part Time', 'Remote', 'Contract', 'Internship']

const JobListings = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [searchParams] = useSearchParams()

  const [filters, setFilters] = useState({
    keyword: searchParams.get('keyword') || '',
    location: searchParams.get('location') || '',
    category: '',
    jobType: '',
  })

  const [appliedFilters, setAppliedFilters] = useState(filters)

  const fetchJobs = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page,
        limit: 9,
        ...(appliedFilters.keyword && { keyword: appliedFilters.keyword }),
        ...(appliedFilters.location && { location: appliedFilters.location }),
        ...(appliedFilters.category && appliedFilters.category !== 'All' && { category: appliedFilters.category }),
        ...(appliedFilters.jobType && appliedFilters.jobType !== 'All' && { jobType: appliedFilters.jobType }),
      })

      const { data } = await axios.get(`/jobs?${params}`)
      setJobs(data.data)
      setTotalPages(data.pagination.pages)
      setTotal(data.pagination.total)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [page, appliedFilters])

  const handleSearch = () => {
    setPage(1)
    setAppliedFilters(filters)
  }

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value })
  }

  return (
    <div className="min-h-screen bg-neutral">
      <Navbar />

      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-headline text-2xl font-bold text-gray-900 mb-4">
            Browse Job Listings
          </h1>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Job title or keyword"
              value={filters.keyword}
              onChange={(e) => handleFilterChange('keyword', e.target.value)}
              className="input-field flex-1"
            />
            <input
              type="text"
              placeholder="Location"
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="input-field flex-1"
            />
            <button onClick={handleSearch} className="btn-primary whitespace-nowrap">
              Search Jobs
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="card">
              <h3 className="font-headline font-semibold text-gray-900 mb-4">
                Filters
              </h3>

              {/* Category */}
              <div className="mb-6">
                <h4 className="font-body text-sm font-medium text-gray-700 mb-3">
                  Category
                </h4>
                <div className="space-y-2">
                  {CATEGORIES.map((cat) => (
                    <label key={cat} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={cat}
                        checked={filters.category === cat || (cat === 'All' && !filters.category)}
                        onChange={() => handleFilterChange('category', cat)}
                        className="accent-primary"
                      />
                      <span className="font-body text-sm text-gray-600">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Job Type */}
              <div className="mb-6">
                <h4 className="font-body text-sm font-medium text-gray-700 mb-3">
                  Job Type
                </h4>
                <div className="space-y-2">
                  {JOB_TYPES.map((type) => (
                    <label key={type} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="jobType"
                        value={type}
                        checked={filters.jobType === type || (type === 'All' && !filters.jobType)}
                        onChange={() => handleFilterChange('jobType', type)}
                        className="accent-primary"
                      />
                      <span className="font-body text-sm text-gray-600">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={handleSearch}
                className="btn-primary w-full text-sm text-center"
              >
                Apply Filters
              </button>
            </div>
          </div>

          {/* Job Results */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="font-body text-gray-500 text-sm">
                Showing <span className="font-semibold text-gray-900">{total}</span> jobs
              </p>
            </div>

            {loading ? (
              <Spinner />
            ) : jobs.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {jobs.map((job) => (
                    <JobCard key={job._id} job={job} />
                  ))}
                </div>
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-5xl mb-4">🔍</p>
                <p className="font-headline text-gray-500 text-xl">No jobs found</p>
                <p className="font-body text-gray-400 text-sm mt-2">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default JobListings