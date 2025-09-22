import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const ReviewCard = ({ review, index = 0 }) => {
  const { hastaAd, yorum, rating, tarih } = review;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
    >
      {/* Quote Icon */}
      <div className="flex justify-between items-start mb-4">
        <Quote className="w-8 h-8 text-primary-200" />
        <div className="flex items-center space-x-1">
          {renderStars(rating)}
        </div>
      </div>

      {/* Review Text */}
      <p className="text-gray-700 mb-4 leading-relaxed">
        "{yorum}"
      </p>

      {/* Reviewer Info */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div>
          <h4 className="font-semibold text-gray-900">{hastaAd}</h4>
          <p className="text-sm text-gray-500">Hasta</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">{formatDate(tarih)}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewCard;