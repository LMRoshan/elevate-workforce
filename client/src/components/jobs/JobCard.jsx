import { Link } from 'react-router-dom'

const JobCard = ({ job }) => {
  const formatDeadline = (date) => {
    return new Date(date).toLocaleDateString('en-NP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const isDeadlineSoon = (date) => {
    const deadline = new Date(date)
    const today = new Date()
    const diffDays = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24))
    return diffDays <= 7
  }

  return (
    <div className="card hover:shadow-md transition-shadow duration-200 border border-gray-100">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-white font-headline font-bold text-sm">
              {job.employer?.companyName?.charAt(0) || 'E'}
            </span>
          </div>
          <div>
            <h3 className="font-headline font-semibold text-gray-900 text-base">
              {job.title}
            </h3>
            <p className="font-body text-gray-500 text-sm">
              {job.employer?.companyName || 'Company'}
            </p>
          </div>
        </div>
        <span className="bg-blue-50 text-primary px-3 py-1 rounded-full text-xs font-semibold font-body">
          {job.jobType}
        </span>
      </div>

      {/* Details Row */}
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="flex items-center space-x-1">
          <span className="text-gray-400 text-xs">📍</span>
          <span className="font-body text-gray-600 text-sm">{job.location}</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-gray-400 text-xs">💰</span>
          <span className="font-body text-gray-600 text-sm">{job.salary}</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-gray-400 text-xs">📂</span>
          <span className="font-body text-gray-600 text-sm">{job.category}</span>
        </div>
      </div>

      {/* Description Preview */}
      <p className="font-body text-gray-500 text-sm mb-4 line-clamp-2">
        {job.description}
      </p>

      {/* Footer */}
      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
        <span className={`font-body text-xs ${isDeadlineSoon(job.deadline) ? 'text-red-500 font-semibold' : 'text-gray-400'}`}>
          📅 Deadline: {formatDeadline(job.deadline)}
        </span>
        <Link
          to={`/jobs/${job._id}`}
          className="btn-primary text-sm px-4 py-2"
        >
          Apply Now
        </Link>
      </div>
    </div>
  )
}

export default JobCard