import React, { useEffect, useState, useRef } from 'react';
import { AlertCircle, ChevronLeft, ChevronRight, Star, Calendar } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import api from '../api/api';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Custom navigation refs
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await api.get('/doctors/public');
                setDoctors(response.data);
            } catch (err) {
                setError('Doktor bilgileri yüklenirken bir hata oluştu.');
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    // Skeleton Loading Component
    const DoctorSkeleton = () => (
        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 flex flex-col items-center h-[420px] animate-pulse">
            <div className="w-24 h-24 rounded-full bg-slate-200 mb-6"></div>
            <div className="h-4 bg-slate-200 rounded w-16 mb-6"></div>
            <div className="h-6 bg-slate-200 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2 mb-6"></div>
            <div className="space-y-2 w-full mb-6">
                <div className="h-3 bg-slate-200 rounded w-full"></div>
                <div className="h-3 bg-slate-200 rounded w-5/6 mx-auto"></div>
                <div className="h-3 bg-slate-200 rounded w-4/6 mx-auto"></div>
            </div>
            <div className="mt-auto h-12 bg-slate-200 rounded-xl w-full"></div>
        </div>
    );

    return (
        <section className="bg-slate-50 py-24 relative" id="doctors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

                {/* Header with Turquoise Underline */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl uppercase inline-block relative pb-4">
                        HEKİMLERİMİZ
                        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-teal-400 rounded-full"></span>
                    </h2>
                </div>

                {loading ? (
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                        {[1, 2, 3, 4].map((n) => <DoctorSkeleton key={n} />)}
                    </div>
                ) : error ? (
                    <div className="max-w-md mx-auto">
                        <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-center gap-3 text-red-800">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <span className="text-sm font-medium">{error}</span>
                        </div>
                    </div>
                ) : (
                    <div className="relative group/carousel">

                        {/* Navigation Buttons (Outside wrapper) */}
                        <button
                            ref={prevRef}
                            className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-16 z-20 w-12 h-12 rounded-full bg-white shadow-lg border border-slate-100 text-slate-400 hover:text-slate-900 hover:scale-110 flex items-center justify-center transition-all duration-300 focus:outline-none"
                            aria-label="Önceki"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            ref={nextRef}
                            className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-16 z-20 w-12 h-12 rounded-full bg-white shadow-lg border border-slate-100 text-slate-400 hover:text-slate-900 hover:scale-110 flex items-center justify-center transition-all duration-300 focus:outline-none"
                            aria-label="Sonraki"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>

                        <Swiper
                            modules={[Navigation, Autoplay]}
                            spaceBetween={24}
                            slidesPerView={1}
                            navigation={{
                                prevEl: prevRef.current,
                                nextEl: nextRef.current,
                            }}
                            onBeforeInit={(swiper) => {
                                swiper.params.navigation.prevEl = prevRef.current;
                                swiper.params.navigation.nextEl = nextRef.current;
                            }}
                            autoplay={{
                                delay: 6000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true
                            }}
                            breakpoints={{
                                640: {
                                    slidesPerView: 2,
                                },
                                1024: {
                                    slidesPerView: 3,
                                },
                                1280: {
                                    slidesPerView: 4,
                                },
                            }}
                            className="!pb-12 !px-4 md:!px-0"
                        >
                            {doctors.map((doctor) => (
                                <SwiperSlide key={doctor.id} className="h-auto pb-4">
                                    <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 h-full flex flex-col items-center text-center relative group">

                                        {/* Avatar Circle with Ring */}
                                        <div className="relative mb-8">
                                            <div className="w-28 h-28 rounded-full p-1.5 border-[3px] border-blue-100/50 relative z-10 bg-white">
                                                <div className="w-full h-full rounded-full overflow-hidden bg-slate-50 flex items-center justify-center relative">
                                                    {doctor.profileImageUrl ? (
                                                        <img
                                                            src={doctor.profileImageUrl}
                                                            alt={`${doctor.ad} ${doctor.soyad}`}
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => {
                                                                e.target.style.display = 'none';
                                                                e.target.nextSibling.style.display = 'flex';
                                                            }}
                                                        />
                                                    ) : null}

                                                    {/* Initials Avatar */}
                                                    <div
                                                        className="w-full h-full flex items-center justify-center bg-white text-lapis"
                                                        style={{ display: doctor.profileImageUrl ? 'none' : 'flex' }}
                                                    >
                                                        <span className="text-2xl font-bold tracking-tight text-blue-600">
                                                            {doctor.ad.charAt(0)}{doctor.soyad.charAt(0)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Experience Badge (Pill) */}
                                            {doctor.deneyim > 0 && (
                                                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-sm border border-slate-100 flex items-center gap-1.5 z-20 whitespace-nowrap">
                                                    <Star size={12} className="text-amber-400 fill-current" />
                                                    <span className="text-xs font-bold text-slate-700">{doctor.deneyim} Yıl</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Info Section */}
                                        <div className="flex-1 w-full flex flex-col items-center">
                                            {/* Name */}
                                            <h3 className="text-lg font-bold text-slate-900 mb-2">
                                                Dr. {doctor.ad} {doctor.soyad}
                                            </h3>

                                            {/* Specialty Pill */}
                                            <div className="mb-4">
                                                <span className="inline-block bg-blue-50 text-blue-600 text-[10px] font-bold px-3 py-1 rounded md uppercase tracking-wider">
                                                    {doctor.uzmanlik}
                                                </span>
                                            </div>

                                            {/* Description */}
                                            <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                                                {doctor.hakkinda || 'Hastalarına her zaman güler yüzle yaklaşan, modern diş hekimliği uygulamalarında uzmanlaşmış deneyimli bir hekim.'}
                                            </p>

                                            {/* Action Button */}
                                            <div className="mt-auto w-full pt-4">
                                                <a
                                                    href="#appointment"
                                                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-900 text-white font-medium text-sm transition-all duration-300 hover:bg-lapis hover:shadow-lg hover:shadow-blue-500/20 group-hover:translate-y-0"
                                                >
                                                    <Calendar size={16} />
                                                    Randevu Al
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Doctors;
