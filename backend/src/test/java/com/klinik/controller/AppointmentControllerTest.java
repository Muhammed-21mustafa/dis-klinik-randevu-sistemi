package com.klinik.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.klinik.model.Appointment;
import com.klinik.model.Doctor;
import com.klinik.service.AppointmentService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.time.LocalTime;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

@WebMvcTest(AppointmentController.class)
@AutoConfigureMockMvc(addFilters = false) // Disable security filters for simple testing
public class AppointmentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AppointmentService appointmentService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void createAppointment_WithNullDoctor_ReturnsBadRequest() throws Exception {
        Appointment appointment = new Appointment();
        appointment.setHastaAd("Test");
        appointment.setHastaSoyad("Patient");
        appointment.setTc("12345678901");
        appointment.setTelefon("5551234567");
        appointment.setTarih(LocalDate.now().plusDays(1));
        appointment.setSaat(LocalTime.of(10, 0));
        appointment.setBolum("Diş");
        // Doctor is null

        mockMvc.perform(post("/appointments/public")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(appointment)))
                .andExpect(status().isBadRequest())
                .andExpect(content().string(org.hamcrest.Matchers.containsString("Doktor seçilmeli")));
    }

    @Test
    public void createAppointment_WithNullDoctorId_ReturnsBadRequest() throws Exception {
        Appointment appointment = new Appointment();
        appointment.setHastaAd("Test");
        appointment.setHastaSoyad("Patient");
        appointment.setTc("12345678901");
        appointment.setTelefon("5551234567");
        appointment.setTarih(LocalDate.now().plusDays(1));
        appointment.setSaat(LocalTime.of(10, 0));
        appointment.setBolum("Diş");

        Doctor doctor = new Doctor();
        // Doctor ID is null
        appointment.setDoctor(doctor);

        // Mock service to throw exception (since validation passes controller logic but
        // fails in service)
        when(appointmentService.createAppointment(any(Appointment.class)))
                .thenThrow(new RuntimeException("Doktor seçimi yapılmalıdır"));

        mockMvc.perform(post("/appointments/public")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(appointment)))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Doktor seçimi yapılmalıdır"));
    }
}
