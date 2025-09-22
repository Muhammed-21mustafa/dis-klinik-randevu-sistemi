import React from 'react';
import { motion } from 'framer-motion';

const ServiceCard = ({ service, index = 0 }) => {
  const {
    title,
    description,
    icon: Icon,
    features,
    image
  } = service;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="card hover-lift shadow-hard overflow-hidden border border-white/50 group"
    >
      {/* Service Image or Icon */}
      <div className="h-48 bg-gradient-to-br from-primary-200 via-medical-200 to-dental-200 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 via-medical-400/15 to-dental-400/20 group-hover:opacity-30 transition-opacity duration-300"></div>
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="relative z-10">
            <Icon className="w-16 h-16 text-primary-600 group-hover:text-primary-700 transition-colors duration-300 drop-shadow-lg" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gradient-primary mb-3 group-hover:text-primary-700 transition-colors duration-300">{title}</h3>
        <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>
        
        {/* Features */}
        {features && features.length > 0 && (
          <ul className="space-y-3">
            {features.map((feature, idx) => (
              <motion.li 
                key={idx} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: (index * 0.1) + (idx * 0.05) }}
                className="flex items-center space-x-3 text-sm"
              >
                <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full shadow-soft animate-pulse-glow"></div>
                <span className="text-gray-600 font-medium">{feature}</span>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
};

export default ServiceCard;