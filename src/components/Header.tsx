import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, ArrowLeft } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {!isHomePage && (
              <Link 
                to="/" 
                className="mr-4 p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
            )}
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">HealthCare</h1>
                <p className="text-xs text-gray-500">Book your appointment</p>
              </div>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
              Find Doctors
            </Link>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
              About
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
              Contact
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;