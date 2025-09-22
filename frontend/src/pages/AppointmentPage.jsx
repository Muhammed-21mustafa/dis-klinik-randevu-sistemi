import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BookingForm from '../components/booking/BookingForm';
import { Calendar, Clock, Users, CheckCircle } from 'lucide-react';

const AppointmentPage = () => {
  const features = [
    {
      icon: Calendar,
      title: 'Kolay Randevu',
      description: 'Kullanıcı dostu sistemimizle sadece birkaç tıklamayla randevunuzu alın.'
    },
    {
      icon: Clock,
      title: 'Esnek Saatler',
      description: 'Yoğun programınıza uygun çeşitli zaman dilimlerinden seçim yapın.'
    },
    {
      icon: Users,
      title: 'Uzman Doktorlar',
      description: 'Deneyimli ve uzman diş hekimlerimizden tedavi alın.'
    },
    {
      icon: CheckCircle,
      title: 'Anlık Onay',
      description: 'Randevunuz için anlık onay ve hatırlatmalar alın.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="section-title">Randevunuzu Alın</h1>
          <p className="section-subtitle">
            Uzman diş hekimi kadromuzla randevunuzu planlayın. 
            Kolay, hızlı ve kullanışlı online randevu sistemi.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Features Section */}
          <div className="lg:col-span-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Neden Bizimle Randevu Almalısınız?</h2>
              <div className="space-y-6">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                      className="flex items-start space-x-4"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Emergency Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-xl p-6"
            >
              <h3 className="font-bold text-red-900 mb-2">Acil Durum?</h3>
              <p className="text-red-700 text-sm mb-3">
                Diş acil durumları için bizi doğrudan arayın:
              </p>
              <a 
                href="tel:+905321234567" 
                className="text-red-600 font-bold text-lg hover:text-red-700 transition-colors"
              >
                +90 (532) 123-4567
              </a>
            </motion.div>
          </div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <BookingForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;