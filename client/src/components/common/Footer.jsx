import { Link } from 'react-router-dom'
import { FiShare2, FiGlobe } from 'react-icons/fi' 

const Footer = () => {
  return (
    <footer className="bg-[#f8f9fb] text-slate-600 mt-20 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

          {/* Brand Section */}
          <div className="md:col-span-4">
            <h2 className="font-headline font-bold text-[#1e3a8a] text-2xl mb-6 leading-tight">
              Elevate Workforce <br /> Solutions
            </h2>
            <p className="font-body text-slate-500 text-md leading-relaxed mb-8 max-w-xs">
              Nepal's premium workforce ecosystem connecting top-tier talent with ambitious organizations.
            </p>
            
            {/* Social Icons */}
            <div className="flex space-x-3">
              <button className="w-10 h-10 bg-[#e9ecef] rounded-full flex items-center justify-center text-slate-600 hover:bg-gray-200 transition-colors">
                <FiShare2 size={18} />
              </button>
              <button className="w-10 h-10 bg-[#e9ecef] rounded-full flex items-center justify-center text-slate-600 hover:bg-gray-200 transition-colors">
                <FiGlobe size={18} />
              </button>
            </div>
          </div>

          {/* Links Sections */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            
            {/* Candidate Services */}
            <div>
              <h4 className="font-headline font-bold text-[#1e3a8a] text-xs uppercase tracking-widest mb-6">
                Candidate Services
              </h4>
              <ul className="space-y-4">
                {/* Kept Browse Jobs active */}
                <li><Link to="/jobs" className="text-sm hover:text-[#1e3a8a] transition-colors">Browse Jobs</Link></li>
                {/* Others pointed to 404 */}
                <li><Link to="/404" className="text-sm hover:text-[#1e3a8a] transition-colors">Career Advice</Link></li>
                <li><Link to="/404" className="text-sm hover:text-[#1e3a8a] transition-colors">Resume Builder</Link></li>
                <li><Link to="/404" className="text-sm hover:text-[#1e3a8a] transition-colors">Job Alerts</Link></li>
              </ul>
            </div>

            {/* Employer Solutions */}
            <div>
              <h4 className="font-headline font-bold text-[#1e3a8a] text-xs uppercase tracking-widest mb-6">
                Employer Solutions
              </h4>
              <ul className="space-y-4">
                <li><Link to="/404" className="text-sm hover:text-[#1e3a8a] transition-colors">Post a Vacancy</Link></li>
                <li><Link to="/404" className="text-sm hover:text-[#1e3a8a] transition-colors">Candidate Search</Link></li>
                <li><Link to="/404" className="text-sm hover:text-[#1e3a8a] transition-colors">Recruitment Branding</Link></li>
                <li><Link to="/404" className="text-sm hover:text-[#1e3a8a] transition-colors">Pricing Plans</Link></li>
              </ul>
            </div>

            {/* Corporate */}
            <div>
              <h4 className="font-headline font-bold text-[#1e3a8a] text-xs uppercase tracking-widest mb-6">
                Corporate
              </h4>
              <ul className="space-y-4">
                <li><Link to="/404" className="text-sm hover:text-[#1e3a8a] transition-colors">About Us</Link></li>
                <li><Link to="/404" className="text-sm hover:text-[#1e3a8a] transition-colors">Privacy Policy</Link></li>
                <li><Link to="/404" className="text-sm hover:text-[#1e3a8a] transition-colors">Terms of Service</Link></li>
                <li><Link to="/404" className="text-sm hover:text-[#1e3a8a] transition-colors">Contact Support</Link></li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="border-t border-gray-200 mt-16 pt-8 text-center">
          <p className="font-body text-slate-400 text-xs tracking-wide">
            © 2024 Elevate Workforce Solutions. All rights reserved. Registered in Nepal.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer