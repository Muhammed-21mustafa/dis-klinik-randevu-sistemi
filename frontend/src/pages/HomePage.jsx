import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Star, 
  Shield, 
  Award, 
  Heart,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Search
} from 'lucide-react';

// Components
import DoctorCard from '../components/common/DoctorCard';
import ReviewCard from '../components/common/ReviewCard';
import LoadingSpinner from '../components/common/LoadingSpinner';

// API
import { doctorsAPI, reviewsAPI } from '../services/api';

const HomePage = () => {
  const [featuredDoctors, setFeaturedDoctors] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(4.8);
  const [loading, setLoading] = useState(true);

  // Sample data for when backend is not available
  const sampleDoctors = [
    {
      id: 1,
      ad: 'Dr. Ayşe',
      soyad: 'Yılmaz',
      uzmanlik: 'Ortodonti',
      deneyim: 12,
      hakkinda: 'Ortodonti alanında 12 yıllık deneyimi bulunan modern diş hizalama uzmanı.',
      ucret: 750,
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face'
    },
    {
      id: 2,
      ad: 'Dr. Mehmet',
      soyad: 'Kaya',
      uzmanlik: 'İmplantoloji',
      deneyim: 8,
      hakkinda: 'Diş implantları ve ağız cerrahisi işlemlerinde uzman hekim.',
      ucret: 900,
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face'
    },
    {
      id: 3,
      ad: 'Dr. Zeynep',
      soyad: 'Demir',
      uzmanlik: 'Estetik Diş Hekimliği',
      deneyim: 15,
      hakkinda: 'Gülüş tasarımı ve estetik diş tedavileri uzmanı.',
      ucret: 1200,
      image: 'https://images.unsplash.com/photo-1594824475953-190fd2b027b6?w=400&h=400&fit=crop&crop=face'
    }
  ];

  const sampleReviews = [
    {
      id: 1,
      hastaAd: 'Ayşe M.',
      yorum: 'Mükemmel hizmet! Personel çok profesyonel ve ilgiliydi, tedavi süreci boyunca kendimi güvende hissettim.',
      rating: 5,
      tarih: '2025-09-10'
    },
    {
      id: 2,
      hastaAd: 'Mehmet K.',
      yorum: 'Klinik çok modern ve temiz. Randevu sistemi çok pratik ve kolay kullanımlı.',
      rating: 5,
      tarih: '2025-09-08'
    },
    {
      id: 3,
      hastaAd: 'Fatma S.',
      yorum: 'İmplant işlemim çok başarılı geçti. Harika bakım için teşekkür ederim!',
      rating: 5,
      tarih: '2025-09-05'
    }
  ];

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [doctorsResponse, reviewsResponse, ratingResponse] = await Promise.all([
          doctorsAPI.getAll(),
          reviewsAPI.getApproved(),
          reviewsAPI.getAverageRating()
        ]);

        // Get first 3 doctors as featured
        setFeaturedDoctors(doctorsResponse.data.slice(0, 3));
        setReviews(reviewsResponse.data.slice(0, 6));
        setAverageRating(ratingResponse.data || 4.8);
      } catch (error) {
        console.error('Error fetching home data:', error);
        // Use sample data when backend is not available
        setFeaturedDoctors(sampleDoctors);
        setReviews(sampleReviews);
        setAverageRating(4.8);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  const features = [
    {
      icon: Shield,
      title: 'Güvenli Tedavi',
      description: 'En son teknoloji ve sterilizasyon standartları ile güvenli tedavi'
    },
    {
      icon: Award,
      title: 'Uzman Kadro',
      description: 'Alanında uzman ve deneyimli diş hekimleri'
    },
    {
      icon: Heart,
      title: 'Hasta Memnuniyeti',
      description: '%99 hasta memnuniyet oranı ile kişiselleştirilmiş bakım'
    },
    {
      icon: Clock,
      title: '7/24 Destek',
      description: 'Acil diş sağlığı ihtiyaçlarınız için kesintisiz hizmet'
    }
  ];

  const stats = [
    { number: '5000+', label: 'Mutlu Hasta', icon: Users },
    { number: '15+', label: 'Uzman Doktor', icon: Award },
    { number: '8+', label: 'Uzmanlık Alanı', icon: Star },
    { number: '10+', label: 'Yıl Deneyim', icon: Shield },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Professional Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Professional Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-emerald-50"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/30 via-transparent to-emerald-100/20"></div>
        </div>
        
        {/* Professional Geometric Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-200/20 via-emerald-200/15 to-teal-200/20 rounded-full blur-3xl animate-float-gentle"></div>
          <div className="absolute top-40 right-10 w-80 h-80 bg-gradient-to-br from-emerald-300/15 via-blue-300/20 to-cyan-300/15 rounded-full blur-3xl animate-float-gentle animation-delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
            {/* Enhanced Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex items-center space-x-3"
                >
                  <div className="flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-blue-500/10 via-emerald-500/10 to-teal-500/10 rounded-full border border-blue-200/50 backdrop-blur-sm">
                    <Sparkles className="w-5 h-5 text-blue-600 animate-pulse" />
                    <span className="font-semibold text-blue-700 text-sm tracking-wide">Profesyonel Diş Bakımı</span>
                  </div>
                </motion.div>
                
                <div className="space-y-4">
                  <h1 className="hero-title">
                    <span className="block mb-2">
                      Sağlıklı Gülüşler
                    </span>
                    <span className="block text-gray-800">
                      Mutlu Yaşamlar
                    </span>
                  </h1>
                  
                  <p className="hero-subtitle">
                    Modern teknoloji ve uzman diş hekimlerimizle{' '}
                    <span className="text-blue-600 font-semibold">en kaliteli diş sağlığı hizmetini</span>{' '}
                    sunuyoruz.
                  </p>
                </div>

                {/* Professional Rating Display */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex items-center space-x-6 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-white/50 shadow-md"
                >
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(averageRating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-gray-700">
                    <span className="text-2xl font-bold text-blue-600">{averageRating.toFixed(1)}</span>
                    <span className="text-sm text-gray-500 ml-1">({reviews.length} değerlendirme)</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    <span className="font-semibold text-emerald-600">%99</span> memnuniyet
                  </div>
                </motion.div>

                {/* Professional CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link to="/randevu-al" className="btn-primary group">
                    <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>Randevu Al</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link to="/doktorlar" className="btn-secondary group">
                    <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>Doktorlarımız</span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Professional Hero Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                {/* Main Professional Image */}
                <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&h=600&fit=crop&crop=center"
                    alt="Modern Dental Clinic"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-transparent to-emerald-600/20"></div>
                </div>
                
                {/* Floating Stats Cards */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-6 -left-6 bg-white rounded-xl p-4 shadow-lg border border-gray-200/50"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">99%</div>
                      <div className="text-sm text-gray-600">Success Rate</div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-lg border border-gray-200/50"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <Star className="w-6 h-6 text-white" fill="currentColor" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">5000+</div>
                      <div className="text-sm text-gray-600">Happy Patients</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Professional Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="section-title">Rakamlarla Biz</h2>
            <p className="section-subtitle">
              Yılların deneyimi ve binlerce mutlu hasta ile güvenilir hizmet
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 via-blue-200 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                    <Icon className="w-8 h-8 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
                  </div>
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-700 to-emerald-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium text-lg">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="section-title">Neden Bizi Tercih Etmelisiniz?</h2>
            <p className="section-subtitle">
              Modern teknoloji, uzman kadro ve hasta odaklı yaklaşımımızla 
              olaganüstü diş bakımı deneyimi yaşayın.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card card-service text-center group hover:shadow-lg"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 via-blue-700 to-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-700 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Doctors Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="section-title">Uzman Doktor Kadromuz</h2>
            <p className="section-subtitle">
              Alanında uzman, deneyimli doktorlarımızla size en kaliteli 
              diş sağlığı hizmetini sunuyoruz.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {featuredDoctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card card-featured group"
              >
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden shadow-md">
                    <img
                      src={doctor.image || doctor.profileImageUrl || `https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face`}
                      alt={`${doctor.ad} ${doctor.soyad}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/images/doctors/placeholder.jpg';
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {doctor.ad} {doctor.soyad}
                  </h3>
                  <p className="text-blue-600 font-semibold mb-3">{doctor.uzmanlik}</p>
                  <p className="text-gray-600 text-sm mb-4">{doctor.hakkinda}</p>
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                    <span>{doctor.deneyim} yıl deneyim</span>
                    <span>•</span>
                    <span>₺{doctor.ucret}</span>
                  </div>
                  <button className="mt-4 btn-primary w-full">
                    Randevu Al
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <Link 
              to="/doktorlar" 
              className="btn-secondary inline-flex items-center space-x-2"
            >
              <span>Tüm Doktorları Görüntüle</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="section-title">Hastalarımız Diyor Ki</h2>
            <p className="section-subtitle">
              Memnun hastalarımızın deneyimlerini okuyun ve 
              bizimle ilgili düşüncelerini öğrenin.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card group"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic leading-relaxed">
                  "{review.yorum}"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {review.hastaAd.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{review.hastaAd}</div>
                    <div className="text-sm text-gray-500">{review.tarih}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-emerald-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-white">
              Mükemmel Gülüşünüz İçin Hazır mısınız?
            </h2>
            <p className="text-xl text-blue-100">
              Uzman doktorlarımızla randevunuzu oluşturun ve 
              optimal diş sağlığına doğru ilk adımı atın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/randevu-al" 
                className="btn-success bg-white text-blue-700 hover:bg-gray-100 inline-flex items-center justify-center space-x-2 transform hover:scale-105 transition-all duration-300"
              >
                <Calendar className="w-5 h-5" />
                <span>Hemen Randevu Al</span>
              </Link>
              <Link 
                to="/randevu-sorgula" 
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-4 px-8 rounded-xl transition-all duration-300 inline-flex items-center justify-center space-x-2 transform hover:scale-105 shadow-md"
              >
                <Search className="w-5 h-5" />
                <span>Randevu Sorgula</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;