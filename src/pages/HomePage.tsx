import React, { useMemo } from 'react';
import { Users, Shield, Clock, Award } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import DoctorCard from '../components/DoctorCard';
import SearchBar from '../components/SearchBar';

const HomePage: React.FC = () => {
  const { doctors, searchTerm } = useAppContext();

  const filteredDoctors = useMemo(() => {
    if (!searchTerm) return doctors;
    
    return doctors.filter(doctor =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [doctors, searchTerm]);

  const stats = [
    { icon: Users, label: 'Expert Doctors', value: '500+' },
    { icon: Shield, label: 'Trusted by Patients', value: '10,000+' },
    { icon: Clock, label: 'Years of Experience', value: '15+' },
    { icon: Award, label: 'Awards Won', value: '25+' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Find & Book Appointments with
              <span className="block text-blue-200">Top Healthcare Professionals</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Connect with experienced doctors, check their availability, and book appointments 
              that fit your schedule. Quality healthcare is just a click away.
            </p>
            
            <div className="flex justify-center mb-12">
              <SearchBar />
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500 rounded-lg mb-3">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-blue-200 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Doctors Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our Expert Medical Team
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet our carefully selected healthcare professionals who are committed to 
            providing you with the best medical care possible.
          </p>
        </div>

        {filteredDoctors.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Users className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No doctors found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search terms to find more doctors.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;