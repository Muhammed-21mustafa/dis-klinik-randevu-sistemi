import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Doctors from './components/Doctors';
import AppointmentForm from './components/AppointmentForm';

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-inter text-slate-900 selection:bg-lapis selection:text-white">
      {/* Navigation - Glassmorphism Header */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {/* Logo */}
              <a href="#" className="flex items-center gap-2 group">
                <div className="bg-lapis text-white p-2 rounded-lg group-hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-slate-900 tracking-tight">Diş Kliniği</span>
              </a>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#doctors" className="text-sm font-medium text-slate-600 hover:text-lapis transition-colors">Doktorlarımız</a>
              <a href="#services" className="text-sm font-medium text-slate-600 hover:text-lapis transition-colors">Hizmetler</a>
              <a href="#contact" className="text-sm font-medium text-slate-600 hover:text-lapis transition-colors">İletişim</a>
              <a
                href="#appointment"
                className="bg-lapis text-white hover:bg-blue-800 px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transform hover:-translate-y-0.5"
              >
                Randevu Al
              </a>
            </div>

            {/* Mobile Menu Button (Placeholder) */}
            <div className="md:hidden flex items-center">
              <button className="text-slate-600 hover:text-lapis p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="w-full">
        <Hero />
        <Doctors />
        <AppointmentForm />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <span className="text-2xl font-bold text-white tracking-tight mb-6 block">Diş Kliniği</span>
              <p className="text-slate-400 max-w-sm leading-relaxed">
                Modern teknoloji, uzman kadro ve konforlu ortamımızla, ağız ve diş sağlığınız için en iyi hizmeti sunuyoruz. Gülüşünüz bizim için değerli.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Hızlı Erişim</h3>
              <ul className="space-y-4">
                <li><a href="#doctors" className="text-slate-400 hover:text-white transition-colors">Doktorlar</a></li>
                <li><a href="#services" className="text-slate-400 hover:text-white transition-colors">Hizmetler</a></li>
                <li><a href="#appointment" className="text-slate-400 hover:text-white transition-colors">Randevu Al</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">İletişim</h3>
              <ul className="space-y-4 text-slate-400">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-slate-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  İstanbul, Türkiye
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-slate-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  +90 (212) 555 0000
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-slate-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  info@dis-klinigi.com
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-slate-800 text-center flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
            <p>&copy; 2024 Diş Kliniği Randevu Sistemi. Tüm hakları saklıdır.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Gizlilik Politikası</a>
              <a href="#" className="hover:text-white transition-colors">Kullanım Şartları</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
