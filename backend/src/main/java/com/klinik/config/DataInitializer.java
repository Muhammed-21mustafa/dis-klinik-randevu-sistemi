package com.klinik.config;

import com.klinik.model.Admin;
import com.klinik.model.Doctor;
import com.klinik.model.Review;
import com.klinik.service.AdminService;
import com.klinik.service.DoctorService;
import com.klinik.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private AdminService adminService;

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private ReviewService reviewService;
    
    @Autowired
    private Environment environment;

    @Override
    public void run(String... args) throws Exception {
        // Only create default data in development environment
        String[] activeProfiles = environment.getActiveProfiles();
        boolean isDevelopment = activeProfiles.length == 0 || 
                               Arrays.asList(activeProfiles).contains("dev") ||
                               Arrays.asList(activeProfiles).contains("default");
        
        if (isDevelopment) {
            // Create default admin if not exists
            if (!adminService.existsByUsername("admin")) {
                Admin admin = new Admin("admin", "admin123");
                adminService.createAdmin(admin);
                System.out.println("[DEV] Default admin created: username=admin, password=admin123");
                System.out.println("[WARNING] This is for DEVELOPMENT only. Change credentials for production!");
            }

            // Create sample doctors if none exist
            if (doctorService.getAllDoctors().isEmpty()) {
                createSampleDoctors();
                System.out.println("[DEV] Sample doctors created");
            }

            // Create sample reviews if none exist
            if (reviewService.getAllReviews().isEmpty()) {
                createSampleReviews();
                System.out.println("[DEV] Sample reviews created");
            }
        } else {
            System.out.println("[PROD] Production mode - No default data created");
            System.out.println("[PROD] Please create admin user manually via secure process");
        }
    }

    private void createSampleDoctors() {
        // Ortodonti Uzmanı
        Doctor ortodonti = new Doctor();
        ortodonti.setAd("Dr. Ayşe");
        ortodonti.setSoyad("Kaya");
        ortodonti.setEmail("ayse.kaya@disklinik.com");
        ortodonti.setSifre("doctor123");
        ortodonti.setUzmanlik("Ortodonti");
        ortodonti.setDeneyim(8);
        ortodonti.setHakkinda("Diş düzensizlikleri ve çene sorunları konusunda uzman. Modern ortodonti yöntemleri ile gülüşünüzü güzelleştiriyoruz.");
        ortodonti.setCalismaSaatleri("09:00-17:00");
        ortodonti.setUcret(new BigDecimal("800"));
        ortodonti.setProfileImageUrl("/images/doctors/dr-ayse-kaya.jpg");
        doctorService.saveDoctor(ortodonti);

        // Implantoloji Uzmanı
        Doctor implantoloji = new Doctor();
        implantoloji.setAd("Dr. Mehmet");
        implantoloji.setSoyad("Özdemir");
        implantoloji.setEmail("mehmet.ozdemir@disklinik.com");
        implantoloji.setSifre("doctor123");
        implantoloji.setUzmanlik("İmplantoloji");
        implantoloji.setDeneyim(12);
        implantoloji.setHakkinda("İmplant tedavisi ve oral cerrahi alanında 12 yıllık deneyim. En son teknoloji ile güvenli implant uygulamaları.");
        implantoloji.setCalismaSaatleri("09:00-17:00");
        implantoloji.setUcret(new BigDecimal("1200"));
        implantoloji.setProfileImageUrl("/images/doctors/dr-mehmet-ozdemir.jpg");
        doctorService.saveDoctor(implantoloji);

        // Estetik Diş Hekimliği Uzmanı
        Doctor estetik = new Doctor();
        estetik.setAd("Dr. Zeynep");
        estetik.setSoyad("Yılmaz");
        estetik.setEmail("zeynep.yilmaz@disklinik.com");
        estetik.setSifre("doctor123");
        estetik.setUzmanlik("Estetik Diş Hekimliği");
        estetik.setDeneyim(10);
        estetik.setHakkinda("Gülüş tasarımı ve estetik diş tedavileri konusunda uzman. Hollywood gülüşü için profesyonel çözümler.");
        estetik.setCalismaSaatleri("09:00-17:00");
        estetik.setUcret(new BigDecimal("1000"));
        estetik.setProfileImageUrl("/images/doctors/dr-zeynep-yilmaz.jpg");
        doctorService.saveDoctor(estetik);

        // Periodontoloji Uzmanı
        Doctor periodontoloji = new Doctor();
        periodontoloji.setAd("Dr. Ali");
        periodontoloji.setSoyad("Demir");
        periodontoloji.setEmail("ali.demir@disklinik.com");
        periodontoloji.setSifre("doctor123");
        periodontoloji.setUzmanlik("Periodontoloji");
        periodontoloji.setDeneyim(7);
        periodontoloji.setHakkinda("Diş eti hastalıkları ve tedavisi konusunda uzman. Diş eti sağlığınız için kapsamlı çözümler.");
        periodontoloji.setCalismaSaatleri("09:00-17:00");
        periodontoloji.setUcret(new BigDecimal("700"));
        periodontoloji.setProfileImageUrl("/images/doctors/dr-ali-demir.jpg");
        doctorService.saveDoctor(periodontoloji);

        // Endodonti Uzmanı
        Doctor endodonti = new Doctor();
        endodonti.setAd("Dr. Fatma");
        endodonti.setSoyad("Şahin");
        endodonti.setEmail("fatma.sahin@disklinik.com");
        endodonti.setSifre("doctor123");
        endodonti.setUzmanlik("Endodonti");
        endodonti.setDeneyim(9);
        endodonti.setHakkinda("Kanal tedavisi uzmanı. Ağrısız ve etkili kanal tedavileri ile diş sağlığınızı koruyoruz.");
        endodonti.setCalismaSaatleri("09:00-17:00");
        endodonti.setUcret(new BigDecimal("600"));
        endodonti.setProfileImageUrl("/images/doctors/dr-fatma-sahin.jpg");
        doctorService.saveDoctor(endodonti);

        // Çene Cerrahisi Uzmanı
        Doctor cenecerrahi = new Doctor();
        cenecerrahi.setAd("Dr. Hasan");
        cenecerrahi.setSoyad("Koç");
        cenecerrahi.setEmail("hasan.koc@disklinik.com");
        cenecerrahi.setSifre("doctor123");
        cenecerrahi.setUzmanlik("Çene Cerrahisi");
        cenecerrahi.setDeneyim(15);
        cenecerrahi.setHakkinda("Çene cerrahisi ve ağız cerrahisi uzmanı. 20 gömülü diş çekimi ve çene ameliyatları konusunda deneyimli.");
        cenecerrahi.setCalismaSaatleri("09:00-17:00");
        cenecerrahi.setUcret(new BigDecimal("1500"));
        cenecerrahi.setProfileImageUrl("/images/doctors/dr-hasan-koc.jpg");
        doctorService.saveDoctor(cenecerrahi);

        // Pedodonti Uzmanı
        Doctor pedodonti = new Doctor();
        pedodonti.setAd("Dr. Elif");
        pedodonti.setSoyad("Arslan");
        pedodonti.setEmail("elif.arslan@disklinik.com");
        pedodonti.setSifre("doctor123");
        pedodonti.setUzmanlik("Pedodonti");
        pedodonti.setDeneyim(6);
        pedodonti.setHakkinda("Çocuk diş hekimi. Çocukların diş sağlığı konusunda uzman, eğlenceli ve güvenli tedavi ortamı.");
        pedodonti.setCalismaSaatleri("09:00-17:00");
        pedodonti.setUcret(new BigDecimal("500"));
        pedodonti.setProfileImageUrl("/images/doctors/dr-elif-arslan.jpg");
        doctorService.saveDoctor(pedodonti);

        // Protez Uzmanı
        Doctor protez = new Doctor();
        protez.setAd("Dr. Murat");
        protez.setSoyad("Çelik");
        protez.setEmail("murat.celik@disklinik.com");
        protez.setSifre("doctor123");
        protez.setUzmanlik("Protez");
        protez.setDeneyim(11);
        protez.setHakkinda("Diş protezi uzmanı. Tam ve kısmi protezler, porselen kaplamalar ve zirkonyum uygulamaları.");
        protez.setCalismaSaatleri("09:00-17:00");
        protez.setUcret(new BigDecimal("900"));
        protez.setProfileImageUrl("/images/doctors/dr-murat-celik.jpg");
        doctorService.saveDoctor(protez);
    }

    private void createSampleReviews() {
        Review review1 = new Review();
        review1.setHastaAd("Ahmet Yılmaz");
        review1.setYorum("Harika bir tedavi deneyimi yaşadım. Dr. Ayşe Kaya çok profesyonel ve deneyimli. Ortodonti tedavim mükemmel geçti.");
        review1.setRating(5);
        review1.setApproved(true);
        reviewService.createReview(review1);

        Review review2 = new Review();
        review2.setHastaAd("Elif Özkan");
        review2.setYorum("İmplant tedavisi için Dr. Mehmet Özdemir'i tercih ettim. Hem ağrısız hem de çok başarılı bir işlem oldu. Teşekkürler!");
        review2.setRating(5);
        review2.setApproved(true);
        reviewService.createReview(review2);

        Review review3 = new Review();
        review3.setHastaAd("Meryem Kara");
        review3.setYorum("Gülüş tasarımı için gelmiştim. Dr. Zeynep Yılmaz'ın ellerine sağlık. Çok doğal ve güzel bir sonuç elde ettik.");
        review3.setRating(5);
        review3.setApproved(true);
        reviewService.createReview(review3);

        Review review4 = new Review();
        review4.setHastaAd("Can Demir");
        review4.setYorum("Kanal tedavisi hiç ağrımadı. Dr. Fatma Şahin çok dikkatli ve titiz çalışıyor. Kesinlikle tavsiye ederim.");
        review4.setRating(4);
        review4.setApproved(true);
        reviewService.createReview(review4);

        Review review5 = new Review();
        review5.setHastaAd("Ayşe Polat");
        review5.setYorum("Çocuğum için Dr. Elif Arslan'ı tercih ettik. Çocukla iletimi çok iyi, korkusuz bir şekilde tedavi oldu.");
        review5.setRating(5);
        review5.setApproved(true);
        reviewService.createReview(review5);

        Review review6 = new Review();
        review6.setHastaAd("Mehmet Aslan");
        review6.setYorum("20 yaş dişim çekimi için Dr. Hasan Koç'u tercih ettim. Operasyon çok başarılı geçti. Profesyonel bir hekim.");
        review6.setRating(5);
        review6.setApproved(true);
        reviewService.createReview(review6);
    }
}