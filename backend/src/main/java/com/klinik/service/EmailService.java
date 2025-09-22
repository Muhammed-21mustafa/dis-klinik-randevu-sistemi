package com.klinik.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendPasswordResetEmail(String to, String newPassword) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@disklinik.com");
        message.setTo(to);
        message.setSubject("Şifre Sıfırlama - Premium Diş Kliniği");
        message.setText("Merhaba,\n\n" +
                "Şifre sıfırlama talebiniz alınmıştır.\n" +
                "Yeni geçici şifreniz: " + newPassword + "\n\n" +
                "Güvenliğiniz için lütfen giriş yaptıktan sonra şifrenizi değiştirin.\n\n" +
                "Saygılarımızla,\n" +
                "Premium Diş Kliniği");

        mailSender.send(message);
    }

    public void sendAppointmentConfirmation(String to, String patientName, 
                                          String doctorName, String date, String time) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@disklinik.com");
        message.setTo(to);
        message.setSubject("Randevu Onayı - Premium Diş Kliniği");
        message.setText("Sayın " + patientName + ",\n\n" +
                "Randevunuz başarıyla oluşturulmuştur.\n\n" +
                "Randevu Detayları:\n" +
                "Doktor: " + doctorName + "\n" +
                "Tarih: " + date + "\n" +
                "Saat: " + time + "\n\n" +
                "Randevunuz için teşekkür ederiz.\n\n" +
                "Saygılarımızla,\n" +
                "Premium Diş Kliniği");

        mailSender.send(message);
    }
}