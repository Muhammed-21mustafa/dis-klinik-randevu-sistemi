import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, AlertCircle } from 'lucide-react';
import { doctorsAPI } from '../services/api';
import DoctorCard from '../components/common/DoctorCard';
import LoadingSpinner from '../components/common/LoadingSpinner';

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUzmanlik, setSelectedUzmanlik] = useState('');
  const [uzmanliklar, setUzmanliklar] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data for when backend is not available
  const sampleDoctors = [
    {
      id: 1,
      ad: 'Ahmet',
      soyad: 'Yılmaz',
      uzmanlik: 'Ortodonti',
      deneyim: 12,
      hakkinda: 'Ortodonti alanında 12 yıllık deneyimi bulunan uzman hekim. Modern ortodonti tekniklerinde uzmanlaşmıştır.',
      ucret: 750,
      profileImageUrl: null
    },
    {
      id: 2,
      ad: 'Zeynep',
      soyad: 'Kaya',
      uzmanlik: 'İmplantoloji',
      deneyim: 8,
      hakkinda: 'İmplant tedavileri konusunda uzman. All-on-4 ve immediate loading tekniklerinde deneyimli.',
      ucret: 900,
      profileImageUrl: null
    },
    {
      id: 3,
      ad: 'Mehmet',
      soyad: 'Özkan',
      uzmanlik: 'Estetik Diş Hekimliği',
      deneyim: 15,
      hakkinda: 'Gülüş tasarımı ve estetik diş tedavileri konusunda uzman. Hollywood smile uygulamalarında deneyimli.',
      ucret: 1200,
      profileImageUrl: null
    },
    {
      id: 4,
      ad: 'Ayşe',
      soyad: 'Demir',
      uzmanlik: 'Periodontoloji',
      deneyim: 10,
      hakkinda: 'Diş eti hastalıkları ve periodontal cerrahi konularında uzman hekim.',
      ucret: 650,
      profileImageUrl: null
    },
    {
      id: 5,
      ad: 'Emre',
      soyad: 'Türk',
      uzmanlik: 'Endodonti',
      deneyim: 7,
      hakkinda: 'Kanal tedavisi uzmanı. Mikroskop altında kanal tedavisi uygulamalarında deneyimli.',
      ucret: 500,
      profileImageUrl: null
    },
    {
      id: 6,
      ad: 'Fatma',
      soyad: 'Şahin',
      uzmanlik: 'Çocuk Diş Hekimliği',
      deneyim: 9,
      hakkinda: 'Çocuk diş sağlığı konusunda uzman. Koruyucu diş hekimliği uygulamalarında deneyimli.',
      ucret: 400,
      profileImageUrl: null
    }
  ];

  const sampleUzmanliklar = [
    'Ortodonti',
    'İmplantoloji', 
    'Estetik Diş Hekimliği',
    'Periodontoloji',
    'Endodonti',
    'Çocuk Diş Hekimliği',
    'Çene Cerrahisi',
    'Protez'
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [doctorsRes, uzmanlikRes] = await Promise.all([
          doctorsAPI.getAll(),
          doctorsAPI.getUzmanliklar()
        ]);
        
        setDoctors(doctorsRes.data);
        setUzmanliklar(uzmanlikRes.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setError('Backend bağlantısı kurulamadı. Örnek veriler gösteriliyor.');
        
        // Use sample data when backend is not available
        setDoctors(sampleDoctors);
        setUzmanliklar(sampleUzmanliklar);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredDoctors = selectedUzmanlik 
    ? doctors.filter(doctor => doctor.uzmanlik === selectedUzmanlik)
    : doctors;

  const searchFilteredDoctors = searchTerm
    ? filteredDoctors.filter(doctor => 
        `${doctor.ad} ${doctor.soyad}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.uzmanlik.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredDoctors;

  if (loading) {
    return (
      <div className="pt-24 pb-20 gradient-bg min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card glass shadow-hard p-16"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                <LoadingSpinner size="lg" color="white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Doktorlar Yükleniyir...
              </h3>
              <p className="text-gray-600">
                Uzman doktor kadromuz hazırlanıyor, lütfen bekleyiniz.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 gradient-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="section-title">Doktorlarımız</h1>
          <p className="section-subtitle">
            Alanında uzman, deneyimli doktorlarımızla sizlere en kaliteli hizmeti sunuyoruz.
          </p>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="card bg-gradient-to-r from-warning-50 to-warning-100 border border-warning-200 p-6">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-6 h-6 text-warning-600" />
                <div>
                  <h3 className="font-semibold text-warning-800">Bilgilendirme</h3>
                  <p className="text-warning-700">{error}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Enhanced Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="card glass shadow-hard p-6 border border-white/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Doktor adı veya uzmanlık alanı ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-300 bg-white shadow-soft"
                />
              </div>
              
              {/* Specialty Filter */}
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={selectedUzmanlik}
                  onChange={(e) => setSelectedUzmanlik(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-300 bg-white shadow-soft appearance-none"
                >
                  <option value="">Tüm Branşlar</option>
                  {uzmanliklar.map(uzmanlik => (
                    <option key={uzmanlik} value={uzmanlik}>{uzmanlik}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Results Count */}
            <div className="mt-4 text-center">
              <span className="text-gray-600">
                <span className="font-bold text-primary-600">{searchFilteredDoctors.length}</span> doktor bulundu
              </span>
            </div>
          </div>
        </motion.div>

        {/* Doctors Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {searchFilteredDoctors.length === 0 ? (
            <div className="card text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Doktor Bulunamadı
              </h3>
              <p className="text-gray-600">
                Arama kriterlerinize uygun doktor bulunamadı. Lütfen filtrelerinizi kontrol edin.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {searchFilteredDoctors.map((doctor, index) => (
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <DoctorCard
                    doctor={doctor}
                    onBookAppointment={() => {
                      window.location.href = `/randevu-al?doktor=${doctor.id}`;
                    }}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default DoctorsPage;