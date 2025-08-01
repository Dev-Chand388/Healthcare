import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Star, MapPin, Clock, GraduationCap, Calendar, CheckCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import BookingModal from '../components/BookingModal';

const DoctorProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { doctors } = useAppContext();
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const doctor = doctors.find(d => d.id === id);

  if (!doctor) {
    return <Navigate to="/" replace />;
  }

  const availableDates = Object.keys(doctor.availability);
  const totalSlots = Object.values(doctor.availability).reduce((sum, slots) => sum + slots.length, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Doctor Info Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-12">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              <div className="relative">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-4 border-white ${
                  doctor.isAvailable ? 'bg-green-500' : 'bg-gray-400'
                }`} />
              </div>
              
              <div className="text-center md:text-left text-white">
                <h1 className="text-3xl font-bold mb-2">{doctor.name}</h1>
                <p className="text-blue-100 text-lg font-medium mb-4">{doctor.specialization}</p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current mr-2" />
                    <span className="font-medium">{doctor.rating} Rating</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>{doctor.experience} Years Experience</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{doctor.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="px-8 py-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
                  Education & Credentials
                </h3>
                <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">{doctor.education}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-green-600" />
                  Availability Status
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  {doctor.isAvailable ? (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span className="font-medium">
                        {totalSlots} slots available across {availableDates.length} days
                      </span>
                    </div>
                  ) : (
                    <div className="text-gray-500">
                      <span>Currently not accepting new appointments</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">About Dr. {doctor.name.split(' ')[1]}</h2>
          <p className="text-gray-600 leading-relaxed text-lg">{doctor.about}</p>
        </div>

        {/* Availability & Booking */}
        {doctor.isAvailable && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Available Time Slots</h2>
                <p className="text-gray-600">Select a convenient time for your appointment</p>
              </div>
              <button
                onClick={() => setIsBookingOpen(true)}
                className="mt-4 md:mt-0 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Book Appointment
              </button>
            </div>
            
            <div className="grid gap-6">
              {availableDates.map(date => (
                <div key={date} className="border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    {new Date(date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {doctor.availability[date].map(time => (
                      <span
                        key={time}
                        className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium border border-blue-200"
                      >
                        {time}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      <BookingModal
        doctor={doctor}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
};

export default DoctorProfile;