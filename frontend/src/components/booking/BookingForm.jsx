import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { appointmentsAPI } from '../../services/api';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail,
  MessageSquare,
  CheckCircle
} from 'lucide-react';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const services = [
    'Genel Muayene',
    'Ortodonti',
    'İmplantoloji',
    'Estetik Diş Hekimliği',
    'Periodontoloji',
    'Endodonti',
    'Ağız ve Çene Cerrahisi',
    'Çocuk Diş Hekimliği'
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const appointmentData = {
        hastaAd: formData.firstName,
        hastaSoyad: formData.lastName,
        hastaEmail: formData.email,
        hastaTelefon: formData.phone,
        hizmet: formData.service,
        appointmentDate: formData.date,
        appointmentTime: formData.time,
        notlar: formData.message,
        doctorId: 1 // Default to first doctor for now
      };

      await appointmentsAPI.create(appointmentData);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Appointment booking error:', error);
      setError('Randevu alırken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto bg-white rounded-2xl p-8 shadow-lg text-center"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Randevu Onaylandı!</h3>
        <p className="text-gray-600 mb-6">
          Randevunuz başarıyla planlandı. Detayları onaylamak için yakında sizinle iletişime geçeceğiz.
        </p>
        <button 
          onClick={() => setIsSubmitted(false)}
          className="btn-primary w-full"
        >
          Başka Randevu Al
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-lg"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Randevunuzu Alın</h2>
        <p className="text-gray-600">Ziyaretinizi planlamak için aşağıdaki formu doldurun</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl"
          >
            {error}
          </motion.div>
        )}
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Ad
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="input-field"
              placeholder="Adınızı girin"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Soyad
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="input-field"
              placeholder="Soyadınızı girin"
              required
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              E-posta
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              placeholder="E-posta adresinizi girin"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Phone className="w-4 h-4 inline mr-2" />
              Telefon
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="input-field"
              placeholder="Telefon numaranızı girin"
              required
            />
          </div>
        </div>

        {/* Service Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            İhtiyaç Duyulan Hizmet
          </label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="input-field"
            required
          >
            <option value="">Bir hizmet seçin</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-2" />
              Tercih Edilen Tarih
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="input-field"
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Clock className="w-4 h-4 inline mr-2" />
              Tercih Edilen Saat
            </label>
            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="">Bir saat seçin</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Additional Message */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <MessageSquare className="w-4 h-4 inline mr-2" />
            Ek Mesaj (Opsiyonel)
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="input-field"
            rows="4"
            placeholder="Ek bilgi veya özel talepleriniz..."
          />
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          className={`btn-primary w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Randevu Alınıyor...' : 'Randevu Al'}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default BookingForm;