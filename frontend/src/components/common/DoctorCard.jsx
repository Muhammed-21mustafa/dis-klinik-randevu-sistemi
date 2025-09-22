import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Star, Calendar, User } from 'lucide-react';

const DoctorCard = ({ doctor, onBookAppointment, showBookingButton = true }) => {
  const {
    id,
    ad,
    soyad,
    uzmanlik,
    deneyim,
    hakkinda,
    ucret,
    profileImageUrl
  } = doctor;

  const fullName = `${ad} ${soyad}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      {/* Doctor Image */}
      <div className="relative h-64 bg-gradient-to-br from-primary-100 to-primary-200">
        <img
          src={profileImageUrl || '/images/doctors/placeholder.jpg'}
          alt={fullName}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = '/images/doctors/placeholder.jpg';
          }}
        />
        
        {/* Overlay with specialization */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex items-center space-x-2 text-white">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium">{uzmanlik}</span>
          </div>
        </div>
      </div>

      {/* Doctor Info */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            Dr. {fullName}
          </h3>
          <p className="text-primary-600 font-medium">{uzmanlik}</p>
        </div>

        {/* Experience */}
        <div className="flex items-center space-x-2 mb-4">
          <div className="flex items-center space-x-1 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">{deneyim} yıl deneyim</span>
          </div>
        </div>

        {/* About */}
        {hakkinda && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {hakkinda}
          </p>
        )}

        {/* Price */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              ₺{ucret?.toLocaleString('tr-TR')}
            </span>
            <span className="text-gray-500 text-sm ml-1">/ muayene</span>
          </div>
        </div>

        {/* Action Button */}
        {showBookingButton && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onBookAppointment && onBookAppointment(doctor)}
            className="w-full btn-primary flex items-center justify-center space-x-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Randevu Al</span>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default DoctorCard;