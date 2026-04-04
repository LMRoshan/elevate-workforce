import { Link } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#f8f9fb] flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md">
        <h1 className="text-9xl font-bold text-[#1e3a8a] opacity-20">404</h1>
        <div className="relative -mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 font-headline">
            Oops! Page Not Found
          </h2>
          <p className="text-slate-500 mb-8 font-body">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#1e3a8a] text-white rounded-xl font-bold hover:bg-[#162a63] transition-all group"
          >
            <HiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;