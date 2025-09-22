import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  MapPin,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff
} from 'lucide-react';
import { appointmentsAPI } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';

const AppointmentQueryPage = () => {
  const [queryType, setQueryType] = useState('tc');
  const [formData, setFormData] = useState({
    tc: '',
    telefon: '',
    randevuId: ''
  });
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [showDetails, setShowDetails] = useState({});

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSearched(false);

    try {
      let response;
      if (queryType === 'tc' && formData.tc) {
        response = await appointmentsAPI.getByTC(formData.tc);
      } else if (queryType === 'phone' && formData.telefon) {
        response = await appointmentsAPI.getByPhone(formData.telefon);
      } else if (queryType === 'id' && formData.randevuId) {
        response = await appointmentsAPI.getById(formData.randevuId);
      }
      
      setAppointments(response?.data || []);
      setSearched(true);
    } catch (error) {
      console.error('Search error:', error);
      setAppointments([]);
      setSearched(true);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ONAYLANDI':
        return 'text-success-600 bg-success-100 border-success-200';
      case 'BEKLEMEDE':
        return 'text-warning-600 bg-warning-100 border-warning-200';
      case 'IPTAL':
        return 'text-error-600 bg-error-100 border-error-200';
      default:
        return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ONAYLANDI':
        return <CheckCircle className="w-4 h-4" />;
      case 'BEKLEMEDE':
        return <AlertCircle className="w-4 h-4" />;
      case 'IPTAL':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const toggleDetails = (id) => {
    setShowDetails(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="pt-24 pb-20 gradient-bg min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="section-title">Randevu Sorgula</h1>
          <p className="section-subtitle">
            Mevcut randevularınızı sorgulayın ve detaylarını görüntüleyin
          </p>
        </motion.div>

        {/* Professional Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card glass shadow-hard border border-white/50 mb-8"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gradient-primary mb-6">Arama Seçenekleri</h2>
            
            {/* Query Type Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { type: 'tc', label: 'TC Kimlik No', icon: User },
                { type: 'phone', label: 'Telefon No', icon: Phone },
                { type: 'id', label: 'Randevu ID', icon: Calendar }
              ].map(({ type, label, icon: Icon }) => (
                <button
                  key={type}
                  onClick={() => setQueryType(type)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 flex items-center space-x-3 ${
                    queryType === type
                      ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-glow'
                      : 'border-gray-200 hover:border-primary-300 hover:bg-primary-25'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-semibold">{label}</span>
                </button>
              ))}
            </div>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="space-y-6">
              {queryType === 'tc' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    TC Kimlik Numarası
                  </label>
                  <input
                    type="text"
                    value={formData.tc}
                    onChange={(e) => setFormData({ ...formData, tc: e.target.value })}
                    placeholder="12345678901"
                    className="input-field"
                    maxLength="11"
                    required
                  />
                </div>
              )}

              {queryType === 'phone' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Telefon Numarası
                  </label>
                  <input
                    type="tel"
                    value={formData.telefon}
                    onChange={(e) => setFormData({ ...formData, telefon: e.target.value })}
                    placeholder="05XX XXX XX XX"
                    className="input-field"
                    required
                  />
                </div>
              )}

              {queryType === 'id' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Randevu ID
                  </label>
                  <input
                    type="text"
                    value={formData.randevuId}
                    onChange={(e) => setFormData({ ...formData, randevuId: e.target.value })}
                    placeholder="RND123456"
                    className="input-field"
                    required
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50"
              >
                {loading ? (
                  <LoadingSpinner size="sm" color="white" />
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>Randevu Ara</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>

        {/* Professional Results Section */}
        {searched && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {appointments.length === 0 ? (
              <div className="card text-center py-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Randevu Bulunamadı
                </h3>
                <p className="text-gray-600">
                  Girdiğiniz bilgilere ait herhangi bir randevu bulunamadı.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Bulunan Randevular ({appointments.length})
                </h3>
                
                {appointments.map((appointment, index) => (
                  <motion.div
                    key={appointment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="card hover-lift shadow-hard border border-white/50"
                  >
                    {/* Appointment Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900">
                            Randevu #{appointment.id}
                          </h4>
                          <p className="text-gray-600">
                            {appointment.hastaAd} {appointment.hastaSoyad}
                          </p>
                        </div>
                      </div>
                      
                      <div className={`flex items-center space-x-2 px-4 py-2 rounded-xl border ${getStatusColor(appointment.durum)}`}>
                        {getStatusIcon(appointment.durum)}
                        <span className="font-semibold">{appointment.durum}</span>
                      </div>
                    </div>

                    {/* Appointment Quick Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-primary-600" />
                        <div>
                          <p className="text-sm text-gray-500">Tarih</p>
                          <p className="font-semibold">{appointment.tarih}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-primary-600" />
                        <div>
                          <p className="text-sm text-gray-500">Saat</p>
                          <p className="font-semibold">{appointment.saat}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <User className="w-5 h-5 text-primary-600" />
                        <div>
                          <p className="text-sm text-gray-500">Doktor</p>
                          <p className="font-semibold">
                            {appointment.doctor ? `Dr. ${appointment.doctor.ad} ${appointment.doctor.soyad}` : 'Belirtilmemiş'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Toggle Details Button */}
                    <button
                      onClick={() => toggleDetails(appointment.id)}
                      className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                    >
                      {showDetails[appointment.id] ? (
                        <>
                          <EyeOff className="w-4 h-4" />
                          <span>Detayları Gizle</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4" />
                          <span>Detayları Göster</span>
                        </>
                      )}
                      <ArrowRight className={`w-4 h-4 transition-transform ${showDetails[appointment.id] ? 'rotate-90' : ''}`} />
                    </button>

                    {/* Detailed Information */}
                    {showDetails[appointment.id] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                        className="mt-6 pt-6 border-t border-gray-200"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <h5 className="font-bold text-gray-900">Hasta Bilgileri</h5>
                            <div className="space-y-2">
                              <p><span className="font-semibold">TC:</span> {appointment.tc}</p>
                              <p><span className="font-semibold">Telefon:</span> {appointment.telefon}</p>
                              <p><span className="font-semibold">Bölüm:</span> {appointment.bolum}</p>
                            </div>
                          </div>
                          
                          {appointment.doctor && (
                            <div className="space-y-4">
                              <h5 className="font-bold text-gray-900">Doktor Bilgileri</h5>
                              <div className="space-y-2">
                                <p><span className="font-semibold">Uzmanlık:</span> {appointment.doctor.uzmanlik}</p>
                                <p><span className="font-semibold">Deneyim:</span> {appointment.doctor.deneyim} yıl</p>
                                {appointment.doctor.ucret && (
                                  <p><span className="font-semibold">Muayene Ücreti:</span> ₺{appointment.doctor.ucret.toLocaleString('tr-TR')}</p>
                                )}
                              </div>
                            </div>
                          )}
                        </div>

                        {appointment.notlar && (
                          <div className="mt-6">
                            <h5 className="font-bold text-gray-900 mb-2">Notlar</h5>
                            <p className="text-gray-600 bg-gray-50 p-4 rounded-xl">
                              {appointment.notlar}
                            </p>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AppointmentQueryPage;