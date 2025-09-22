import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Menu, 
  X, 
  Calendar, 
  Search, 
  UserCheck, 
  LogOut,
  Shield,
  Stethoscope,
  Heart,
  Sparkles
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, logout, isAuthenticated, isAdmin, isDoctor } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'Ana Sayfa', path: '/', icon: null },
    { name: 'Hizmetler', path: '/hizmetler', icon: Heart },
    { name: 'Doktorlarımız', path: '/doktorlar', icon: Stethoscope },
    { name: 'Randevu Al', path: '/randevu-al', icon: Calendar },
    { name: 'Randevu Sorgula', path: '/randevu-sorgula', icon: Search },
  ];

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'navbar-glass shadow-lg backdrop-blur-xl' 
          : 'bg-white/95 backdrop-blur-sm shadow-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Professional Logo */}
          <Link to="/" className="clinic-logo">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="clinic-logo-icon"
            >
              <div className="relative z-10 flex items-center justify-center">
                <Heart className="w-7 h-7 text-white" fill="currentColor" />
                <Sparkles className="w-4 h-4 text-white absolute -top-1 -right-1" />
              </div>
            </motion.div>
            <div className="hidden sm:block clinic-logo-text">
              <h1 className="clinic-logo-title">Premium Diş Kliniği</h1>
              <p className="clinic-logo-subtitle">Sağlıklı Gülüşler, Mutlu Yaşamlar</p>
            </div>
          </Link>

          {/* Professional Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <div className="flex items-center space-x-2 bg-white/70 backdrop-blur-sm rounded-xl p-2 shadow-md border border-gray-200/50">
              {navLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.div key={link.path}>
                    <Link
                      to={link.path}
                      className={`nav-link ${isActivePath(link.path) ? 'active' : ''} flex items-center space-x-2`}
                    >
                      {Icon && <Icon className="w-4 h-4" />}
                      <span className="font-medium">{link.name}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Enhanced User Menu */}
          <div className="hidden lg:flex items-center space-x-3">
            {isAuthenticated() ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-3 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200/50">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">{user?.username?.charAt(0)?.toUpperCase()}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {user?.username}
                  </span>
                </div>
                
                {isAdmin() && (
                  <Link
                    to="/admin"
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-md"
                  >
                    <Shield className="w-4 h-4" />
                    <span className="font-medium">Admin</span>
                  </Link>
                )}
                
                {isDoctor() && (
                  <Link
                    to="/doktor"
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span className="font-medium">Doctor</span>
                  </Link>
                )}
                
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 shadow-md"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/giris"
                className="btn-primary"
              >
                Login
              </Link>
            )}
          </div>

          {/* Enhanced Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-3 rounded-lg bg-white/80 backdrop-blur-sm border border-gray-200/50 text-gray-700 hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              <motion.div
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.div>
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200/50 shadow-lg rounded-b-xl mx-4 mb-4"
            >
              <div className="py-6 space-y-3">
                {navLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center space-x-4 px-6 py-4 mx-4 rounded-lg transition-all duration-300 ${
                          isActivePath(link.path)
                            ? 'text-white bg-gradient-to-r from-blue-600 to-emerald-600 shadow-md transform scale-105'
                            : 'text-gray-700 hover:bg-gray-50 hover:shadow-md transform hover:scale-105'
                        }`}
                      >
                        {Icon && <Icon className="w-6 h-6" />}
                        <span className="font-semibold text-lg">{link.name}</span>
                      </Link>
                    </motion.div>
                  );
                })}
                
                <div className="border-t border-gray-200/50 pt-6 mt-6">
                  {isAuthenticated() ? (
                    <div className="space-y-3 px-4">
                      <div className="flex items-center space-x-3 px-6 py-3 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">{user?.username?.charAt(0)?.toUpperCase()}</span>
                        </div>
                        <span className="font-semibold text-gray-800">{user?.username}</span>
                      </div>
                      
                      {isAdmin() && (
                        <Link
                          to="/admin"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center space-x-4 px-6 py-4 mx-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow-md"
                        >
                          <Shield className="w-6 h-6" />
                          <span className="font-semibold">Admin Panel</span>
                        </Link>
                      )}
                      
                      {isDoctor() && (
                        <Link
                          to="/doktor"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center space-x-4 px-6 py-4 mx-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md"
                        >
                          <UserCheck className="w-6 h-6" />
                          <span className="font-semibold">Doctor Panel</span>
                        </Link>
                      )}
                      
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-4 px-6 py-4 mx-2 w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl text-left shadow-soft"
                      >
                        <LogOut className="w-6 h-6" />
                        <span className="font-semibold">Çıkış Yap</span>
                      </button>
                    </div>
                  ) : (
                    <div className="px-4">
                      <Link
                        to="/giris"
                        onClick={() => setIsOpen(false)}
                        className="block btn-primary text-center w-full"
                      >
                        Giriş Yap
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;