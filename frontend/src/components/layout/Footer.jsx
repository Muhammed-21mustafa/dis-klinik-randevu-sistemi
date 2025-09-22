import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Heart,
  Facebook,
  Instagram,
  Twitter,
  Calendar,
  Stethoscope
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Hizmetler', path: '/hizmetler' },
    { name: 'Doktorlar', path: '/doktorlar' },
    { name: 'Randevu Al', path: '/randevu-al' },
    { name: 'Randevu Sorgula', path: '/randevu-sorgula' },
  ];

  const services = [
    'Ortodonti',
    'İmplantoloji',
    'Estetik Diş Hekimliği',
    'Periodontoloji',
    'Endodonti',
    'Ağız ve Çene Cerrahisi',
    'Çocuk Diş Hekimliği',
    'Protez'
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', name: 'Facebook' },
    { icon: Instagram, href: '#', name: 'Instagram' },
    { icon: Twitter, href: '#', name: 'Twitter' },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-medical-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-36 h-36 bg-dental-400 rounded-full blur-3xl"></div>
      </div>
      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-glow animate-pulse-glow">
                <Heart className="w-6 h-6 text-white drop-shadow-lg" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gradient-primary bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">Premium Diş Kliniği</h3>
                <p className="text-gray-400 text-sm font-medium">Sağlıklı Gülüşler</p>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm leading-relaxed">
              Modern teknoloji ve deneyimli kadromuzla üstün diş bakımı deneyimi yaşayın. 
              Güveniniz bizim önceliğimizdir.
            </p>
            
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl flex items-center justify-center hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-soft border border-gray-700 hover:border-primary-500"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <h4 className="text-lg font-semibold text-white mb-2 relative">
              Hızlı Bağlantılar
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-emerald-600 rounded-full"></div>
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-primary-400 transition-all duration-200 text-sm relative group"
                  >
                    <span className="relative z-10">{link.name}</span>
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-400 transition-all duration-200 group-hover:w-full rounded-full"></div>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h4 className="text-lg font-semibold text-white mb-2 relative">
              Hizmetlerimiz
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"></div>
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-gray-300 text-sm flex items-center space-x-3 group hover:text-gray-200 transition-colors duration-200">
                    <Stethoscope className="w-3 h-3 text-primary-400 group-hover:text-primary-300 transition-colors duration-200" />
                    <span>{service}</span>
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <h4 className="text-lg font-semibold text-white mb-2 relative">
              İletişim Bilgileri
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full"></div>
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <MapPin className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0 group-hover:text-primary-300 transition-colors duration-200" />
                <div>
                  <p className="text-gray-300 text-sm">
                    Şehir Merkezi Tıp Merkezi, Sağlık Caddesi No:123<br />
                    Merkez Ilçe, İstanbul
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 group">
                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0 group-hover:text-primary-300 transition-colors duration-200" />
                <p className="text-gray-300 text-sm">+90 (312) 123 45 67</p>
              </div>
              
              <div className="flex items-center space-x-3 group">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0 group-hover:text-primary-300 transition-colors duration-200" />
                <p className="text-gray-300 text-sm">info@premiumdisklinigi.com</p>
              </div>
              
              <div className="flex items-start space-x-3 group">
                <Clock className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0 group-hover:text-primary-300 transition-colors duration-200" />
                <div>
                  <p className="text-gray-300 text-sm">
                    Pazartesi - Cuma: 09:00 - 18:00<br />
                    Cumartesi: 09:00 - 16:00<br />
                    Pazar: Kapalı
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Emergency Contact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-600 py-4 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">Acil Durum: +90 (532) 123-4568</span>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-white" />
              <Link 
                to="/randevu-al" 
                className="text-white hover:text-primary-100 transition-colors font-medium"
              >
                Hemen Randevu Al
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 py-4 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} Premium Diş Kliniği. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200 hover:underline">
                Gizlilik Politikası
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200 hover:underline">
                Hizmet Koşulları
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200 hover:underline">
                Çerez Politikası
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;