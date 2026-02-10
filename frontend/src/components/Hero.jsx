import React from 'react';

const Hero = () => {
    return (
        <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                    {/* Text Content */}
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-lapis text-xs font-semibold uppercase tracking-wide mb-6">
                            <span className="w-2 h-2 rounded-full bg-lapis mr-2 animate-pulse"></span>
                            Yeni Nesil Diş Tedavisi
                        </div>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6">
                            Gülüşünüz <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lapis to-blue-600">
                                Bizim İmzamız
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed max-w-lg">
                            En son teknoloji ve uzman hekim kadromuzla, ağız ve diş sağlığınız için mükemmel çözümler sunuyoruz.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href="#appointment"
                                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white transition-all duration-200 bg-lapis rounded-full hover:bg-blue-800 hover:shadow-lg hover:shadow-blue-900/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lapis"
                            >
                                Hemen Randevu Al
                            </a>
                            <a
                                href="#doctors"
                                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-slate-700 transition-all duration-200 bg-white border border-slate-200 rounded-full hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-200"
                            >
                                Doktorlarımızı Tanı
                            </a>
                        </div>

                        <div className="mt-10 flex items-center gap-4 text-sm text-slate-500">
                            <div className="flex -space-x-2">
                                <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"></div>
                                <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"></div>
                                <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white"></div>
                            </div>
                            <p>5000+ Mutlu Hasta</p>
                        </div>
                    </div>

                    {/* Image/Visuals */}
                    <div className="relative lg:ml-auto">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/20 aspect-[4/3] lg:aspect-square max-w-lg mx-auto lg:max-w-none">
                            <div className="absolute inset-0 bg-gradient-to-tr from-lapis/20 to-transparent mix-blend-overlay z-10"></div>
                            <img
                                src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                alt="Modern Dental Clinic"
                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        {/* Floating Card */}
                        <div className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 bg-white p-6 rounded-xl shadow-xl z-20 max-w-xs animate-fade-in-up">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="p-2 bg-green-100 rounded-lg text-green-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-900">7/24 Destek</p>
                                    <p className="text-xs text-slate-500">Acil durumlarda yanınızdayız</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Elements */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-50 blur-3xl opacity-50 -z-10"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-teal-50 blur-3xl opacity-50 -z-10"></div>
        </div>
    );
};

export default Hero;
