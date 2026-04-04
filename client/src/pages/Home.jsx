import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiSearch,
  FiMapPin,
  FiBriefcase,
  FiUsers,
  FiCheck,
  FiArrowRight,
  FiClock,
  FiMap,
} from "react-icons/fi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { MdOutlineTrendingUp } from "react-icons/md";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import Spinner from "../components/common/Spinner";
import axios from "../utils/axios";
import Hero from "../assets/hero.png";
import Grid1 from "../assets/grid1.png";
import Grid2 from "../assets/grid2.png";
import Grid3 from "../assets/grid3.png";
import Grid4 from "../assets/grid4.png";

const Home = () => {
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get("/jobs?limit=6");
        setFeaturedJobs(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="z-10 order-2 lg:order-1">
              <h1 className="text-[40px] md:text-[56px] font-bold leading-tight mb-8">
                <span className="text-[#00236F]">Find Your Dream Job</span>{" "}
                <br />
                <span className="text-[#8B6E31]">in Nepal</span>
              </h1>
              <p className="text-slate-500 text-lg mb-12 leading-relaxed max-w-lg">
                Connecting talented professionals with top employers across
                Nepal.
              </p>

              {/* Search Bar */}
              <div className="bg-white p-2 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col md:flex-row items-stretch md:items-center gap-2 max-w-2xl">
                <div className="flex-1 flex items-center px-4 py-3 border-b md:border-b-0 md:border-r border-gray-100">
                  <FiSearch className="text-gray-400 mr-3" size={18} />
                  <input
                    type="text"
                    placeholder="Job title or keywords"
                    className="w-full outline-none text-sm text-gray-700 bg-transparent"
                  />
                </div>
                <div className="flex-1 flex items-center px-4 py-3">
                  <FiMapPin className="text-gray-400 mr-3" size={18} />
                  <input
                    type="text"
                    placeholder="Kathmandu, Nepal"
                    className="w-full outline-none text-sm text-gray-700 bg-transparent"
                  />
                </div>
                <button className="bg-[#00236F] text-white px-10 py-3 rounded-xl font-bold hover:bg-[#001a52] transition-colors">
                  Search Jobs
                </button>
              </div>
            </div>

            {/* Hero Image Stack */}
            <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end pr-8 h-full">
              <div className="absolute top-4 right-[-12px] w-full h-full bg-[#EBE3D5] rounded-[2.5rem] opacity-70 -z-10 transform translate-x-4 translate-y-4" />

              <div className="relative w-full max-w-[500px] h-full">
                <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white h-full">
                  <img
                    src={Hero}
                    alt="Hero"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating "Active Vacancies" Badge */}
                <div className="absolute -bottom-8 -left-10 bg-white p-5 rounded-2xl shadow-xl flex items-center space-x-4 border border-gray-50 min-w-[240px]">
                  <div className="w-12 h-12 bg-[#F9A01B] rounded-full flex items-center justify-center text-white shadow-lg">
                    <MdOutlineTrendingUp size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-gray-400 font-extrabold">
                      Active Vacancies
                    </p>
                    <p className="text-2xl font-bold text-[#00236F]">12,480+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <FiBriefcase />, number: "8,500+", label: "Total Jobs" },
              {
                icon: <HiOutlineOfficeBuilding />,
                number: "1,200+",
                label: "Companies Hiring",
              },
              { icon: <FiUsers />, number: "45,000+", label: "Job Seekers" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-3xl flex items-center space-x-6 border border-gray-100 shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-[#00236F] text-2xl">
                  {stat.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {stat.number}
                  </h3>
                  <p className="text-gray-500 text-sm font-medium">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Opportunities */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-[32px] font-bold text-[#00236F]">
                Featured Opportunities
              </h2>
              <p className="text-slate-500 mt-1">
                Hand-picked premium roles for top-tier professionals
              </p>
            </div>
            <Link
              to="/jobs"
              className="text-[#00236F] font-bold flex items-center hover:mr-[-4px] transition-all"
            >
              View All Jobs <FiArrowRight className="ml-2" />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Spinner />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredJobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all border border-gray-100 relative group"
                >
                  <span className="absolute top-6 right-6 bg-[#E0E7FF] text-[#4338CA] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {job.jobType || "Full Time"}
                  </span>

                  <div className="w-14 h-14 bg-gray-100 rounded-xl mb-6 flex items-center justify-center overflow-hidden">
                    {job.companyLogo ? (
                      <img
                        src={job.companyLogo}
                        alt="logo"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FiBriefcase className="text-gray-400" size={24} />
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-[#00236F] mb-1 group-hover:text-blue-700 transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-gray-500 text-sm font-medium mb-6">
                    {job.companyName || "TechMind Solutions"}
                  </p>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center text-gray-400 text-sm">
                      <FiMapPin className="mr-2" />{" "}
                      {job.location || "Kathmandu"}
                    </div>
                    <div className="flex items-center text-gray-400 text-sm">
                      <FiBriefcase className="mr-2" />{" "}
                      {job.salary || "Rs. 120k - 180k"}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                    <span className="text-[11px] text-gray-400 font-medium uppercase tracking-tighter">
                      Deadline:{" "}
                      {new Date(job.deadline).toLocaleDateString() || "Oct 24"}
                    </span>
                    <Link
                      to={`/job/${job._id}`}
                      className="bg-[#F1F5F9] text-[#00236F] px-5 py-2 rounded-lg font-bold text-sm hover:bg-[#00236F] hover:text-white transition-all"
                    >
                      Apply Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Employer Section (4-Image Grid) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Collage Grid - Updated Lines */}
            <div className="grid grid-cols-2 gap-4">
              <img
                src={Grid1}
                alt="Grid 1"
                className="w-full h-52 object-cover rounded-[2.5rem] shadow-sm"
              />
              <img
                src={Grid2}
                alt="Grid 2"
                className="w-full h-72 object-cover rounded-[2.5rem] shadow-sm -mt-10"
              />
              <img
                src={Grid3}
                alt="Grid 3"
                className="w-full h-72 object-cover rounded-[2.5rem] shadow-sm -mt-10"
              />
              <img
                src={Grid4}
                alt="Grid 4"
                className="w-full h-52 object-cover rounded-[2.5rem] shadow-sm"
              />
            </div>

            <div className="space-y-8">
              <div>
                <p className="text-[#8B6E31] font-bold text-xs uppercase tracking-widest mb-4">
                  For Employers
                </p>
                <h2 className="text-[48px] font-bold text-gray-900 leading-tight">
                  Hire the best talent <br /> Nepal has to offer.
                </h2>
              </div>
              <p className="text-slate-500 text-lg leading-relaxed">
                Elevate provides a curated platform to find, vet, and hire
                top-tier professionals.
              </p>
              <div className="space-y-4">
                {[
                  {
                    t: "Verified Talent Pool",
                    d: "Every candidate is pre-vetted.",
                  },
                  { t: "Advanced Matching", d: "AI-driven cultural fit." },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="mt-1 bg-blue-50 p-2 rounded-full text-[#00236F]">
                      <FiCheck size={14} strokeWidth={3} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">
                        {item.t}
                      </p>
                      <p className="text-slate-500 text-xs">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="bg-[#F97316] text-white px-10 py-4 rounded-xl font-bold hover:shadow-lg transition-all">
                Post a Job Opening
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Final Blue Banner */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto bg-gradient-to-r from-[#001D5E] to-[#0034A1] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Are You Hiring?
            </h2>
            <p className="text-blue-100 mb-10">
              Access Nepal's most talented professional network.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#8B6E31] text-white px-8 py-4 rounded-xl font-bold">
                Post a Job for Free
              </button>
              <button className="bg-white/10 text-white px-8 py-4 rounded-xl font-bold border border-white/20">
                Request Executive Search
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;