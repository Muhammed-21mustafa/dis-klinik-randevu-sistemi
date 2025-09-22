package com.klinik.service;

import com.klinik.model.Appointment;
import com.klinik.model.Doctor;
import com.klinik.model.Invoice;
import com.klinik.repository.AppointmentRepository;
import com.klinik.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private InvoiceService invoiceService;

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public Optional<Appointment> getAppointmentById(Long id) {
        return appointmentRepository.findById(id);
    }

    public List<Appointment> getAppointmentsByDoctor(Long doctorId) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doktor bulunamadı: " + doctorId));
        return appointmentRepository.findByDoctor(doctor);
    }

    public List<Appointment> getAppointmentsByPatient(String tc, String hastaAd, String hastaSoyad) {
        return appointmentRepository.findByTcAndHastaAdAndHastaSoyad(tc, hastaAd, hastaSoyad);
    }

    public List<Appointment> getAppointmentsByDateRange(LocalDate startDate, LocalDate endDate) {
        return appointmentRepository.findByTarihBetween(startDate, endDate);
    }

    public List<Appointment> getDoctorAppointmentsByDateRange(Long doctorId, LocalDate startDate, LocalDate endDate) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doktor bulunamadı: " + doctorId));
        return appointmentRepository.findByDoctorAndTarihBetween(doctor, startDate, endDate);
    }

    @Transactional
    public Appointment createAppointment(Appointment appointment) {
        // Validate doctor exists
        Doctor doctor = doctorRepository.findById(appointment.getDoctor().getId())
                .orElseThrow(() -> new RuntimeException("Doktor bulunamadı"));

        // Check for appointment conflicts
        if (hasConflict(doctor, appointment.getTarih(), appointment.getSaat())) {
            throw new RuntimeException("Bu tarih ve saatte zaten bir randevu mevcut");
        }

        // Check if time is within doctor's working hours
        if (!isWithinWorkingHours(doctor, appointment.getSaat())) {
            throw new RuntimeException("Seçilen saat doktorun çalışma saatleri dışında");
        }

        // Save appointment
        Appointment savedAppointment = appointmentRepository.save(appointment);

        // Create invoice automatically
        Invoice invoice = new Invoice();
        invoice.setAppointment(savedAppointment);
        invoice.setTutar(doctor.getUcret());
        invoice.setAciklama(doctor.getUzmanlik() + " muayenesi - " + doctor.getFullName());
        invoiceService.createInvoice(invoice);

        return savedAppointment;
    }

    public Appointment updateAppointment(Long id, Appointment appointmentDetails) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Randevu bulunamadı: " + id));

        // Check for conflicts if date/time is being changed
        if (!appointment.getTarih().equals(appointmentDetails.getTarih()) ||
            !appointment.getSaat().equals(appointmentDetails.getSaat())) {
            
            if (hasConflict(appointment.getDoctor(), appointmentDetails.getTarih(), appointmentDetails.getSaat())) {
                throw new RuntimeException("Bu tarih ve saatte zaten bir randevu mevcut");
            }
        }

        appointment.setHastaAd(appointmentDetails.getHastaAd());
        appointment.setHastaSoyad(appointmentDetails.getHastaSoyad());
        appointment.setTc(appointmentDetails.getTc());
        appointment.setTelefon(appointmentDetails.getTelefon());
        appointment.setTarih(appointmentDetails.getTarih());
        appointment.setSaat(appointmentDetails.getSaat());
        appointment.setBolum(appointmentDetails.getBolum());
        appointment.setStatus(appointmentDetails.getStatus());

        return appointmentRepository.save(appointment);
    }

    public void deleteAppointment(Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Randevu bulunamadı: " + id));
        appointmentRepository.delete(appointment);
    }

    public boolean hasConflict(Doctor doctor, LocalDate tarih, LocalTime saat) {
        List<Appointment> conflictingAppointments = appointmentRepository
                .findByDoctorAndTarihAndSaat(doctor, tarih, saat);
        return !conflictingAppointments.isEmpty();
    }

    private boolean isWithinWorkingHours(Doctor doctor, LocalTime appointmentTime) {
        String workingHours = doctor.getCalismaSaatleri();
        if (workingHours == null || workingHours.isEmpty()) {
            return true; // If no working hours specified, allow all times
        }

        // Parse working hours (format: "09:00-17:00")
        try {
            String[] hours = workingHours.split("-");
            LocalTime startTime = LocalTime.parse(hours[0]);
            LocalTime endTime = LocalTime.parse(hours[1]);
            
            return !appointmentTime.isBefore(startTime) && !appointmentTime.isAfter(endTime);
        } catch (Exception e) {
            return true; // If parsing fails, allow the appointment
        }
    }

    public List<LocalTime> getAvailableTimeSlots(Long doctorId, LocalDate date) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doktor bulunamadı: " + doctorId));

        List<Appointment> existingAppointments = appointmentRepository.findByTarihAndDoctor(date, doctor);
        
        // Generate available time slots based on working hours
        // This is a simplified implementation - you can enhance it based on your needs
        List<LocalTime> allSlots = List.of(
            LocalTime.of(9, 0), LocalTime.of(9, 30),
            LocalTime.of(10, 0), LocalTime.of(10, 30),
            LocalTime.of(11, 0), LocalTime.of(11, 30),
            LocalTime.of(14, 0), LocalTime.of(14, 30),
            LocalTime.of(15, 0), LocalTime.of(15, 30),
            LocalTime.of(16, 0), LocalTime.of(16, 30)
        );

        return allSlots.stream()
                .filter(slot -> existingAppointments.stream()
                        .noneMatch(app -> app.getSaat().equals(slot)))
                .filter(slot -> isWithinWorkingHours(doctor, slot))
                .toList();
    }
}