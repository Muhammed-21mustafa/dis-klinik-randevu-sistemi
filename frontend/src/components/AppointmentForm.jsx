import React, { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import api from '../api/api';

const AppointmentForm = () => {
    const [formData, setFormData] = useState({
        hastaAd: '',
        hastaSoyad: '',
        tc: '',
        telefon: '',
        tarih: '',
        saat: '',
        bolum: 'Genel Diş',
        doctorId: ''
    });

    const [doctors, setDoctors] = useState([]);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await api.get('/doctors/public');
                setDoctors(response.data);
            } catch (err) {
                console.error("Doktorlar yüklenemedi", err);
            }
        };
        fetchDoctors();
    }, []);

    useEffect(() => {
        if (formData.doctorId && formData.tarih) {
            const fetchSlots = async () => {
                setLoadingSlots(true);
                try {
                    const response = await api.get('/appointments/public/available-slots', {
                        params: {
                            doctorId: formData.doctorId,
                            date: formData.tarih
                        }
                    });
                    setAvailableSlots(response.data);
                } catch (err) {
                    console.error("Saatler yüklenemedi", err);
                    setAvailableSlots([]);
                } finally {
                    setLoadingSlots(false);
                }
            };
            fetchSlots();
        } else {
            setAvailableSlots([]);
        }
    }, [formData.doctorId, formData.tarih]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus(null);
        setMessage('');

        const appointmentData = {
            hastaAd: formData.hastaAd,
            hastaSoyad: formData.hastaSoyad,
            tc: formData.tc,
            telefon: formData.telefon,
            tarih: formData.tarih,
            saat: formData.saat,
            bolum: formData.bolum,
            doctor: { id: formData.doctorId }
        };

        try {
            await api.post('/appointments/public', appointmentData);
            setSubmitStatus('success');
            setMessage('Randevunuz başarıyla oluşturuldu! Sizi en kısa sürede arayacağız.');
            setFormData({
                hastaAd: '',
                hastaSoyad: '',
                tc: '',
                telefon: '',
                tarih: '',
                saat: '',
                bolum: 'Genel Diş',
                doctorId: ''
            });
            setAvailableSlots([]);
        } catch (err) {
            setSubmitStatus('error');
            if (err.response && err.response.data) {
                setMessage(typeof err.response.data === 'string' ? err.response.data : JSON.stringify(err.response.data));
            } else {
                setMessage('Randevu oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
            }
        }
    };

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];

    const inputClasses = "mt-1 block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-lapis focus:ring-1 focus:ring-lapis shadow-sm transition-all duration-200 sm:text-sm hover:bg-white";
    const labelClasses = "block text-sm font-semibold text-slate-700 ml-1 mb-1";

    return (
        <section id="appointment" className="py-24 sm:py-32 bg-slate-50 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 -ml-20 -mt-20 w-80 h-80 rounded-full bg-blue-100 blur-3xl opacity-50 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 -mr-20 -mb-20 w-96 h-96 rounded-full bg-teal-50 blur-3xl opacity-50 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 flex flex-col lg:flex-row">

                    {/* Left Column: Benefits & Info */}
                    <div className="lg:w-2/5 bg-lapis p-8 lg:p-12 text-white flex flex-col justify-between relative overflow-hidden">

                        {/* Abstract Shapes */}
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-blue-700 opacity-20 blur-2xl"></div>
                        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-blue-500 opacity-20 blur-2xl"></div>

                        <div className="relative z-10">
                            <h3 className="text-3xl font-bold mb-6">Neden Biz?</h3>
                            <p className="text-blue-100 text-lg mb-10 leading-relaxed">
                                Modern kliniğimizde, sağlığınız ve konforunuz için her detayı düşündük.
                            </p>

                            <ul className="space-y-6">
                                <li className="flex items-start">
                                    <div className="bg-blue-800/50 p-2 rounded-lg mr-4">
                                        <CheckCircle className="w-6 h-6 text-blue-300" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white">Uzman Kadro</h4>
                                        <p className="text-blue-100 text-sm mt-1">Alanında deneyimli hekimler.</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <div className="bg-blue-800/50 p-2 rounded-lg mr-4">
                                        <Clock className="w-6 h-6 text-blue-300" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white">Hızlı Randevu</h4>
                                        <p className="text-blue-100 text-sm mt-1">7/24 online randevu imkanı.</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <div className="bg-blue-800/50 p-2 rounded-lg mr-4">
                                        <Calendar className="w-6 h-6 text-blue-300" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white">Esnek Saatler</h4>
                                        <p className="text-blue-100 text-sm mt-1">Size en uygun zaman dilimi.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="mt-12 relative z-10">
                            <div className="p-6 bg-blue-900/40 rounded-2xl backdrop-blur-sm border border-blue-700/30">
                                <p className="text-sm text-blue-200 italic">
                                    "Diş hekimi korkumu yendiğim tek yer. İlginiz için teşekkürler!"
                                </p>
                                <div className="mt-4 flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-xs font-bold text-blue-900">Ayşe Y.</div>
                                    <span className="ml-3 text-sm font-medium text-blue-100">Mutlu Hasta</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="lg:w-3/5 p-8 lg:p-12 bg-white">
                        <div className="mb-10">
                            <h2 className="text-2xl font-bold text-slate-900">Randevu Oluşturun</h2>
                            <p className="mt-2 text-slate-500">Formu eksiksiz doldurarak hemen randevunuzu planlayın.</p>
                        </div>

                        {submitStatus && (
                            <div className={`mb-8 p-4 rounded-xl border flex items-start gap-3 ${submitStatus === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'} animate-fade-in`}>
                                {submitStatus === 'success' ? <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" /> : <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />}
                                <div>
                                    <h3 className="text-sm font-bold">{submitStatus === 'success' ? 'Randevu Onaylandı' : 'Bir Sorun Oluştu'}</h3>
                                    <p className="text-sm mt-1 opacity-90">{message}</p>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
                            <div>
                                <label htmlFor="hastaAd" className={labelClasses}>Ad</label>
                                <input
                                    type="text"
                                    name="hastaAd"
                                    id="hastaAd"
                                    required
                                    value={formData.hastaAd}
                                    onChange={handleChange}
                                    className={inputClasses}
                                    placeholder="Adınız"
                                />
                            </div>
                            <div>
                                <label htmlFor="hastaSoyad" className={labelClasses}>Soyad</label>
                                <input
                                    type="text"
                                    name="hastaSoyad"
                                    id="hastaSoyad"
                                    required
                                    value={formData.hastaSoyad}
                                    onChange={handleChange}
                                    className={inputClasses}
                                    placeholder="Soyadınız"
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="tc" className={labelClasses}>TC Kimlik No</label>
                                <input
                                    type="text"
                                    name="tc"
                                    id="tc"
                                    required
                                    maxLength="11"
                                    pattern="\d{11}"
                                    value={formData.tc}
                                    onChange={handleChange}
                                    className={inputClasses}
                                    placeholder="11 haneli TC kimlik numaranız"
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="telefon" className={labelClasses}>Telefon</label>
                                <input
                                    type="tel"
                                    name="telefon"
                                    id="telefon"
                                    required
                                    value={formData.telefon}
                                    onChange={handleChange}
                                    className={inputClasses}
                                    placeholder="05XX..."
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="doctorId" className={labelClasses}>Doktor Seçimi</label>
                                <div className="relative">
                                    <select
                                        id="doctorId"
                                        name="doctorId"
                                        required
                                        value={formData.doctorId}
                                        onChange={handleChange}
                                        className={`${inputClasses} appearance-none cursor-pointer`}
                                    >
                                        <option value="">Doktor Seçiniz</option>
                                        {doctors.map(doctor => (
                                            <option key={doctor.id} value={doctor.id}>
                                                {doctor.ad} {doctor.soyad} - {doctor.uzmanlik}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="tarih" className={labelClasses}>Tarih</label>
                                <input
                                    type="date"
                                    name="tarih"
                                    id="tarih"
                                    required
                                    min={minDate}
                                    value={formData.tarih}
                                    onChange={handleChange}
                                    className={`${inputClasses} cursor-pointer`}
                                />
                            </div>

                            <div>
                                <label htmlFor="saat" className={labelClasses}>Saat</label>
                                <div className="relative">
                                    <select
                                        id="saat"
                                        name="saat"
                                        required
                                        value={formData.saat}
                                        onChange={handleChange}
                                        disabled={!formData.tarih || !formData.doctorId}
                                        className={`${inputClasses} appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
                                    >
                                        <option value="">Saat Seçiniz</option>
                                        {loadingSlots ? (
                                            <option disabled>Yükleniyor...</option>
                                        ) : (
                                            availableSlots.map((slot, index) => (
                                                <option key={index} value={slot}>
                                                    {slot}
                                                </option>
                                            ))
                                        )}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-2 mt-6">
                                <button
                                    type="submit"
                                    className="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl shadow-lg text-base font-bold text-white bg-lapis hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lapis transition-all duration-300 transform hover:-translate-y-0.5"
                                >
                                    Randevu Oluştur
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AppointmentForm;
