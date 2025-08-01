import React, { useState } from 'react';
import { X, Calendar, Clock, User, Mail, CheckCircle } from 'lucide-react';
import { Doctor } from '../types';
import { useAppContext } from '../context/AppContext';

interface BookingModalProps {
  doctor: Doctor;
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ doctor, isOpen, onClose }) => {
  const { addAppointment } = useAppContext();
  const [step, setStep] = useState<'form' | 'confirmation'>('form');
  const [formData, setFormData] = useState({
    patientName: '',
    patientEmail: '',
    date: '',
    time: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const availableDates = Object.keys(doctor.availability);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.patientName.trim()) {
      newErrors.patientName = 'Patient name is required';
    }

    if (!formData.patientEmail.trim()) {
      newErrors.patientEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.patientEmail)) {
      newErrors.patientEmail = 'Please enter a valid email address';
    }

    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }

    if (!formData.time) {
      newErrors.time = 'Please select a time';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      addAppointment({
        doctorId: doctor.id,
        patientName: formData.patientName,
        patientEmail: formData.patientEmail,
        date: formData.date,
        time: formData.time,
      });
      setStep('confirmation');
    }
  };

  const handleClose = () => {
    setStep('form');
    setFormData({ patientName: '', patientEmail: '', date: '', time: '' });
    setErrors({});
    onClose();
  };

  const availableTimes = formData.date ? doctor.availability[formData.date] || [] : [];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {step === 'form' ? (
          <>
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Book Appointment</h2>
                <p className="text-sm text-gray-600">with {doctor.name}</p>
              </div>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Patient Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="h-4 w-4 inline mr-1" />
                  Patient Name
                </label>
                <input
                  type="text"
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.patientName ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.patientName && (
                  <p className="mt-1 text-sm text-red-600">{errors.patientName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="h-4 w-4 inline mr-1" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.patientEmail}
                  onChange={(e) => setFormData({ ...formData, patientEmail: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.patientEmail ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email address"
                />
                {errors.patientEmail && (
                  <p className="mt-1 text-sm text-red-600">{errors.patientEmail}</p>
                )}
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 inline mr-1" />
                  Select Date
                </label>
                <select
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value, time: '' })}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.date ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a date</option>
                  {availableDates.map(date => (
                    <option key={date} value={date}>
                      {new Date(date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </option>
                  ))}
                </select>
                {errors.date && (
                  <p className="mt-1 text-sm text-red-600">{errors.date}</p>
                )}
              </div>

              {/* Time Selection */}
              {formData.date && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="h-4 w-4 inline mr-1" />
                    Select Time
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {availableTimes.map(time => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setFormData({ ...formData, time })}
                        className={`px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
                          formData.time === time
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                  {errors.time && (
                    <p className="mt-1 text-sm text-red-600">{errors.time}</p>
                  )}
                </div>
              )}

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Book Appointment
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Appointment Confirmed!
              </h2>
              <p className="text-gray-600 mb-6">
                Your appointment has been successfully booked with {doctor.name}.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Doctor:</span>
                  <span className="font-medium">{doctor.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Patient:</span>
                  <span className="font-medium">{formData.patientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">
                    {new Date(formData.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium">{formData.time}</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-6">
                A confirmation email has been sent to {formData.patientEmail}
              </p>
              
              <button
                onClick={handleClose}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Done
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingModal;