import axios from 'axios';

// Environment-based API configuration
const getAPIBaseURL = () => {
  if (import.meta.env.PROD) {
    return import.meta.env.VITE_API_URL || 'https://your-domain.com/api';
  }
  return import.meta.env.VITE_API_URL || 'http://localhost:8082/api';
};

const API_BASE_URL = getAPIBaseURL();

// Request timeout configuration
const REQUEST_TIMEOUT = 30000; // 30 seconds

// Create axios instance with enhanced configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Utility function for retry logic
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const shouldRetry = (error) => {
  return (
    error.code === 'NETWORK_ERROR' ||
    error.code === 'TIMEOUT' ||
    (error.response && error.response.status >= 500)
  );
};

// Enhanced request interceptor with retry logic
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add request timestamp for debugging
    config.metadata = { startTime: new Date() };
    
    // Add Turkish language header
    config.headers['Accept-Language'] = 'tr-TR,tr;q=0.9,en;q=0.8';
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Enhanced response interceptor with retry and better error handling
api.interceptors.response.use(
  (response) => {
    // Calculate request duration for monitoring
    const duration = new Date() - response.config.metadata.startTime;
    if (import.meta.env.DEV) {
      console.log(`API Request to ${response.config.url} took ${duration}ms`);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/giris';
      return Promise.reject(error);
    }
    
    // Retry logic for network errors and server errors
    if (shouldRetry(error) && !originalRequest._retry && originalRequest._retryCount < MAX_RETRIES) {
      originalRequest._retry = true;
      originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;
      
      await delay(RETRY_DELAY * originalRequest._retryCount);
      return api(originalRequest);
    }
    
    // Enhanced error logging for development
    if (import.meta.env.DEV) {
      console.error('API Error:', {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        message: error.message,
        data: error.response?.data
      });
    }
    
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  resetPassword: (email) => api.post('/auth/reset-password', { email }),
};

// Doctors API
export const doctorsAPI = {
  getAll: () => api.get('/doctors/public'),
  getById: (id) => api.get(`/doctors/public/${id}`),
  getByUzmanlik: (uzmanlik) => api.get(`/doctors/public/uzmanlik/${uzmanlik}`),
  getUzmanliklar: () => api.get('/doctors/public/uzmanliklar'),
  getProfile: (email) => api.get(`/doctors/profile?email=${email}`),
  updateProfile: (id, data) => api.put(`/doctors/profile/${id}`, data),
  changePassword: (email, oldPassword, newPassword) => 
    api.post(`/doctors/change-password?email=${email}&oldPassword=${oldPassword}&newPassword=${newPassword}`),
};

// Appointments API with Turkish-specific features
export const appointmentsAPI = {
  create: (appointment) => api.post('/appointments/public', appointment),
  getByPatient: (tc, hastaAd, hastaSoyad) => 
    api.get(`/appointments/public/patient?tc=${tc}&hastaAd=${hastaAd}&hastaSoyad=${hastaSoyad}`),
  getByTC: (tc) => api.get(`/appointments/public/tc/${tc}`),
  getByPhone: (telefon) => api.get(`/appointments/public/telefon/${telefon}`),
  getById: (id) => api.get(`/appointments/public/${id}`),
  getAvailableSlots: (doctorId, date) => 
    api.get(`/appointments/public/available-slots?doctorId=${doctorId}&date=${date}`),
  getDoctorAppointments: (doctorId) => api.get(`/appointments/doctor/${doctorId}`),
  getDoctorAppointmentsByDateRange: (doctorId, startDate, endDate) => 
    api.get(`/appointments/doctor/${doctorId}/date-range?startDate=${startDate}&endDate=${endDate}`),
  update: (id, data) => api.put(`/appointments/${id}`, data),
  delete: (id) => api.delete(`/appointments/${id}`),
  getAll: () => api.get('/appointments/all'),
  getByDateRange: (startDate, endDate) => 
    api.get(`/appointments/date-range?startDate=${startDate}&endDate=${endDate}`),
  cancel: (id, reason) => api.put(`/appointments/${id}/cancel`, { reason }),
  reschedule: (id, newDate, newTime) => 
    api.put(`/appointments/${id}/reschedule`, { date: newDate, time: newTime }),
};

// Patient/Hasta API for Turkish dental clinic
export const hastaAPI = {
  register: (hastaData) => api.post('/hasta/register', hastaData),
  getByTC: (tc) => api.get(`/hasta/tc/${tc}`),
  updateProfile: (id, data) => api.put(`/hasta/${id}`, data),
  getMedicalHistory: (hastaId) => api.get(`/hasta/${hastaId}/medical-history`),
  addMedicalRecord: (hastaId, record) => api.post(`/hasta/${hastaId}/medical-record`, record),
  getTreatmentHistory: (hastaId) => api.get(`/hasta/${hastaId}/treatment-history`),
};

// Public API for general information
export const publicAPI = {
  getClinicInfo: () => api.get('/public/clinic-info'),
  getWorkingHours: () => api.get('/public/working-hours'),
  getHolidays: () => api.get('/public/holidays'),
  getEmergencyContact: () => api.get('/public/emergency-contact'),
  getBlogPosts: () => api.get('/public/blog'),
  getTestimonials: () => api.get('/public/testimonials'),
  contactForm: (formData) => api.post('/public/contact', formData),
  subscribeNewsletter: (email) => api.post('/public/newsletter/subscribe', { email }),
};

// Health API - sağlık durumu kontrolü
export const healthAPI = {
  check: () => api.get('/actuator/health'),
  ping: () => api.get('/ping'),
};

// Reviews API
export const reviewsAPI = {
  getApproved: () => api.get('/reviews/public'),
  getAverageRating: () => api.get('/reviews/public/average-rating'),
  create: (review) => api.post('/reviews/public', review),
};

// Admin API
export const adminAPI = {
  getDoctors: () => api.get('/admin/doctors'),
  createDoctor: (doctor) => api.post('/admin/doctors', doctor),
  deleteDoctor: (id) => api.delete(`/admin/doctors/${id}`),
  getAppointments: () => api.get('/admin/appointments'),
  getAppointmentById: (id) => api.get(`/admin/appointments/${id}`),
  getInvoices: () => api.get('/admin/invoices'),
  getTotalRevenue: () => api.get('/admin/invoices/revenue'),
  markInvoiceAsPaid: (id) => api.put(`/admin/invoices/${id}/mark-paid`),
  getReviews: () => api.get('/admin/reviews'),
  getPendingReviews: () => api.get('/admin/reviews/pending'),
  approveReview: (id) => api.put(`/admin/reviews/${id}/approve`),
  rejectReview: (id) => api.put(`/admin/reviews/${id}/reject`),
  deleteReview: (id) => api.delete(`/admin/reviews/${id}`),
  createAdmin: (admin) => api.post('/admin/create-admin', admin),
  getStatistics: () => api.get('/admin/statistics/summary'),
};

// Invoices API
export const invoicesAPI = {
  getDoctorInvoices: (doctorId) => api.get(`/invoices/doctor/${doctorId}`),
  getDoctorRevenue: (doctorId) => api.get(`/invoices/doctor/${doctorId}/revenue`),
  getDoctorInvoicesByDateRange: (doctorId, startDate, endDate) => 
    api.get(`/invoices/doctor/${doctorId}/date-range?startDate=${startDate}&endDate=${endDate}`),
  getAll: () => api.get('/invoices/all'),
  getById: (id) => api.get(`/invoices/${id}`),
  update: (id, data) => api.put(`/invoices/${id}`, data),
  delete: (id) => api.delete(`/invoices/${id}`),
};

export default api;