import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { authAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '', // DTO ile eşleşiyor
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [showReset, setShowReset] = useState(false);
  const [resetMessage, setResetMessage] = useState('');

  const navigate = useNavigate();
  const { login, isAuthenticated, isAdmin, isDoctor } = useAuth();

  useEffect(() => {
    if (isAuthenticated()) {
      if (isAdmin()) navigate('/admin');
      else if (isDoctor()) navigate('/doktor');
      else navigate('/');
    }
  }, [isAuthenticated, isAdmin, isDoctor, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Boş alan kontrolü frontend’de
    if (!formData.username || !formData.password) {
      setError("Kullanıcı adı ve şifre boş olamaz!");
      setLoading(false);
      return;
    }

    try {
      // DTO alan adlarıyla eşleşiyor
      const response = await authAPI.login({ 
        username: formData.username, 
        password: formData.password 
      });

      const { token, username, role, userId } = response.data;
      login({ username, role, userId }, token);

      if (role === 'ROLE_ADMIN') navigate('/admin');
      else if (role === 'ROLE_DOCTOR') navigate('/doktor');
      else navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        setError(error.response.data.message || 'Kullanıcı adı veya şifre hatalı');
      } else if (error.request) {
        setError('Sunucuya bağlanılamıyor. Lütfen daha sonra tekrar deneyin.');
      } else {
        setError('Giriş sırasında bir hata oluştu.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResetMessage('');

    try {
      await authAPI.resetPassword(resetEmail);
      setResetMessage('Şifre sıfırlama linki email adresinize gönderildi.');
      setShowReset(false);
      setResetEmail('');
    } catch (error) {
      setResetMessage('Email adresi bulunamadı.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full space-y-8"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="mx-auto h-16 w-16 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-2xl flex items-center justify-center shadow-glow animate-pulse-glow">
            <span className="text-white font-bold text-2xl drop-shadow-lg">D</span>
          </div>
          <h2 className="mt-6 text-center section-title text-3xl">
            Hesabınıza giriş yapın
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 font-medium">
            Admin veya doktor girişi
          </p>
        </motion.div>

        {!showReset ? (
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 space-y-6 card glass p-8 shadow-hard border border-white/50" 
            onSubmit={handleSubmit}
          >
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-r from-error-100 to-error-200 border border-error-400 text-error-700 px-4 py-3 rounded-xl shadow-soft"
              >
                {error}
              </motion.div>
            )}

            {resetMessage && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-r from-success-100 to-success-200 border border-success-400 text-success-700 px-4 py-3 rounded-xl shadow-soft"
              >
                {resetMessage}
              </motion.div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Kullanıcı Adı / Email
              </label>
              <input
                id="username"
                type="text"
                required
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Şifre
              </label>
              <input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="input-field"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50"
              >
                {loading ? <LoadingSpinner size="sm" color="white" /> : 'Giriş Yap'}
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowReset(true)}
                className="text-primary-600 hover:text-primary-500 text-sm font-medium hover:underline transition-all duration-200"
              >
                Şifremi unuttum
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-8 space-y-6 card glass p-8 shadow-hard border border-white/50" 
            onSubmit={handleResetPassword}
          >
            <div>
              <label htmlFor="resetEmail" className="block text-sm font-medium text-gray-700">
                Email Adresiniz
              </label>
              <input
                id="resetEmail"
                type="email"
                required
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="input-field"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50"
              >
                {loading ? <LoadingSpinner size="sm" color="white" /> : 'Şifre Sıfırla'}
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowReset(false)}
                className="text-primary-600 hover:text-primary-500 text-sm font-medium hover:underline transition-all duration-200"
              >
                Giriş sayfasına dön
              </button>
            </div>
          </motion.form>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 text-center text-sm text-gray-600 card glass p-4 shadow-soft border border-white/30"
        >
          <p className="font-semibold text-gray-700 mb-2">Demo hesaplar:</p>
          <p className="text-gray-600">Admin: admin / admin123</p>
          <p className="text-gray-600">Doktor: doktor@email.com / doctor123</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;

