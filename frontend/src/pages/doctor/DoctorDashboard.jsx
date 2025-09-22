import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const DoctorDashboard = () => {
  const { isDoctor, user } = useAuth();

  if (!isDoctor()) {
    return <Navigate to="/giris" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Doktor Paneli
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Hoş geldiniz, {user?.username}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900">Bugünkü Randevular</h3>
              <p className="text-3xl font-bold text-blue-600">5</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900">Bu Ay Toplam</h3>
              <p className="text-3xl font-bold text-green-600">42</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-900">Gelir</h3>
              <p className="text-3xl font-bold text-purple-600">₺18,500</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Bugünkü Randevular</h2>
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Ahmet Yılmaz</p>
                      <p className="text-sm text-gray-600">09:00 - Ortodonti</p>
                    </div>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      Onaylandı
                    </span>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Elif Özkan</p>
                      <p className="text-sm text-gray-600">10:30 - Kontrol</p>
                    </div>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                      Bekliyor
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Hızlı İşlemler</h2>
              <div className="space-y-3">
                <button className="w-full p-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-left">
                  Profili Güncelle
                </button>
                <button className="w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-left">
                  Randevuları Görüntüle
                </button>
                <button className="w-full p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-left">
                  Faturalarım
                </button>
                <button className="w-full p-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-left">
                  Şifre Değiştir
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;