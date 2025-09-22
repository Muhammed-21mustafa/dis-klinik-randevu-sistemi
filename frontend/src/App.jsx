import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Pages
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import DoctorsPage from './pages/DoctorsPage';
import AppointmentPage from './pages/AppointmentPage';
import AppointmentQueryPage from './pages/AppointmentQueryPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import DoctorDashboard from './pages/doctor/DoctorDashboard';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

function App() {
  return (
    <AuthProvider>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
          <Navbar />
          <main className="min-h-screen">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/hizmetler" element={<ServicesPage />} />
              <Route path="/doktorlar" element={<DoctorsPage />} />
              <Route path="/randevu-al" element={<AppointmentPage />} />
              <Route path="/randevu-sorgula" element={<AppointmentQueryPage />} />
              <Route path="/giris" element={<LoginPage />} />
              <Route path="/admin/*" element={<AdminDashboard />} />
              <Route path="/doktor/*" element={<DoctorDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;