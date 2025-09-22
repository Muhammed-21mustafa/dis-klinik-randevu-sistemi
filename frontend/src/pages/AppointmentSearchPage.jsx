import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { appointmentsAPI } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';

const AppointmentSearchPage = () => {
  const [formData, setFormData] = useState({
    tc: '',
    hastaAd: '',
    hastaSoyad: ''
  });
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await appointmentsAPI.getByPatient(
        formData.tc, 
        formData.hastaAd, 
        formData.hastaSoyad
      );
      setAppointments(response.data);
      setSearched(true);
    } catch (error) {
      console.error('Error:', error);
      setAppointments([]);
      setSearched(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Randevu Sorgula
          </h1>
          <p className="text-lg text-gray-600">
            TC kimlik numaranız ve kişisel bilgilerinizle randevunuzu sorgulayın
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  TC Kimlik No
                </label>
                <input
                  type="text"
                  value={formData.tc}
                  onChange={(e) => setFormData({...formData, tc: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="12345678901"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adınız
                </label>
                <input
                  type="text"
                  value={formData.hastaAd}
                  onChange={(e) => setFormData({...formData, hastaAd: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Adınız"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Soyadınız
                </label>
                <input
                  type="text"
                  value={formData.hastaSoyad}
                  onChange={(e) => setFormData({...formData, hastaSoyad: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Soyadınız"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50"
            >
              {loading ? <LoadingSpinner size="sm" color="white" /> : 'Randevuları Sorgula'}
            </button>
          </form>
        </motion.div>

        {/* Results */}
        {searched && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Randevularınız</h2>
            {appointments.length > 0 ? (
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <span className="text-sm text-gray-500">Doktor</span>
                        <p className="font-medium">Dr. {appointment.doctor?.ad} {appointment.doctor?.soyad}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Tarih</span>
                        <p className="font-medium">{appointment.tarih}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Saat</span>
                        <p className="font-medium">{appointment.saat}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Durum</span>
                        <p className="font-medium">{appointment.status}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center py-8">
                Girilen bilgilere ait randevu bulunamadı.
              </p>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AppointmentSearchPage;