import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AdminDashboard = () => {
  const { isAdmin } = useAuth();

  if (!isAdmin()) {
    return <Navigate to="/giris" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Admin Paneli
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900">Doktorlar</h3>
              <p className="text-3xl font-bold text-blue-600">8</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900">Randevular</h3>
              <p className="text-3xl font-bold text-green-600">156</p>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-900">Faturalar</h3>
              <p className="text-3xl font-bold text-yellow-600">89</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-900">Gelir</h3>
              <p className="text-3xl font-bold text-purple-600">₺45,680</p>
            </div>
          </div>
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Hızlı İşlemler</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                Yeni Doktor Ekle
              </button>
              <button className="p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Randevuları Görüntüle
              </button>
              <button className="p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Raporları İncele
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;