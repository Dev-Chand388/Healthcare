import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Calendar, Clock } from 'lucide-react';
import { Doctor } from '../types';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const availableDates = Object.keys(doctor.availability).length;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <div className="relative">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${
              doctor.isAvailable ? 'bg-green-500' : 'bg-gray-400'
            }`} />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {doctor.name}
            </h3>
            <p className="text-blue-600 font-medium text-sm">
              {doctor.specialization}
            </p>
            
            <div className="flex items-center mt-2 space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="ml-1 font-medium">{doctor.rating}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4" />
                <span className="ml-1">{doctor.experience} years</span>
              </div>
            </div>
            
            <div className="flex items-center mt-1 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              <span className="ml-1">{doctor.location}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 text-green-600" />
            <span className="ml-1 text-gray-600">
              {doctor.isAvailable 
                ? `${availableDates} slots available` 
                : 'No slots available'
              }
            </span>
          </div>
          
          <Link
            to={`/doctor/${doctor.id}`}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              doctor.isAvailable
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;