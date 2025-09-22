# Premium Diş Kliniği API Integration Guide

## Spring Boot Backend Integration

Bu dosya, React frontend'iniz ile Spring Boot backend'iniz arasındaki entegrasyonu kolaylaştırmak için hazırlanmıştır.

### API Base URL Configuration

```javascript
// Development
const API_BASE_URL = 'http://localhost:8080/api';

// Production
const API_BASE_URL = 'https://your-domain.com/api';
```

### Backend Controller Endpoints

#### 1. Authentication Controller (`/api/auth`)
```java
@PostMapping("/login")
@PostMapping("/reset-password")
```

#### 2. Public Doctors Controller (`/api/doctors/public`)
```java
@GetMapping("")                    // Tüm doktorları getir
@GetMapping("/{id}")              // ID ile doktor getir
@GetMapping("/uzmanlik/{uzmanlik}") // Uzmanlık alanına göre filtrele
@GetMapping("/uzmanliklar")       // Tüm uzmanlık alanlarını getir
```

#### 3. Appointments Controller (`/api/appointments`)
```java
@PostMapping("/public")           // Yeni randevu oluştur
@GetMapping("/public/patient")    // Hasta bilgileri ile randevu sorgula
@GetMapping("/public/tc/{tc}")    // TC ile randevu sorgula
@GetMapping("/public/telefon/{telefon}") // Telefon ile randevu sorgula
@GetMapping("/public/{id}")       // ID ile randevu getir
@GetMapping("/public/available-slots") // Müsait randevu saatleri
@PutMapping("/{id}/cancel")       // Randevu iptal et
@PutMapping("/{id}/reschedule")   // Randevu yeniden planla
```

#### 4. Hasta Controller (`/api/hasta`)
```java
@PostMapping("/register")         // Yeni hasta kaydı
@GetMapping("/tc/{tc}")          // TC ile hasta bilgisi getir
@PutMapping("/{id}")             // Hasta bilgilerini güncelle
@GetMapping("/{id}/medical-history") // Tıbbi geçmiş
@PostMapping("/{id}/medical-record") // Tıbbi kayıt ekle
@GetMapping("/{id}/treatment-history") // Tedavi geçmişi
```

#### 5. Public API Controller (`/api/public`)
```java
@GetMapping("/clinic-info")       // Klinik bilgileri
@GetMapping("/working-hours")     // Çalışma saatleri
@GetMapping("/holidays")          // Tatil günleri
@GetMapping("/emergency-contact") // Acil durum iletişim
@GetMapping("/blog")             // Blog yazıları
@GetMapping("/testimonials")      // Hasta yorumları
@PostMapping("/contact")          // İletişim formu
@PostMapping("/newsletter/subscribe") // Newsletter aboneliği
```

### Request/Response Examples

#### Randevu Oluşturma (Appointment Creation)
```javascript
const appointmentData = {
  hastaAd: "Ahmet",
  hastaSoyad: "Yılmaz",
  hastaTelefon: "05321234567",
  hastaEmail: "ahmet@example.com",
  hastaTc: "12345678901",
  doctorId: 1,
  appointmentDate: "2024-01-15",
  appointmentTime: "14:00",
  hizmet: "Ortodonti",
  notlar: "Ek bilgiler..."
};

const response = await appointmentsAPI.create(appointmentData);
```

#### Doktor Listesi (Doctors List)
```javascript
const doctors = await doctorsAPI.getAll();
// Response format:
[
  {
    id: 1,
    ad: "Dr. Ayşe",
    soyad: "Yılmaz",
    uzmanlik: "Ortodonti",
    deneyim: 12,
    hakkinda: "Ortodonti alanında uzman...",
    ucret: 750,
    profileImageUrl: "..."
  }
]
```

### Spring Boot Entity Classes Required

#### Doctor Entity
```java
@Entity
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String ad;
    private String soyad;
    private String uzmanlik;
    private Integer deneyim;
    private String hakkinda;
    private Double ucret;
    private String profileImageUrl;
    private String email;
    private String telefon;
    
    // getters and setters
}
```

#### Appointment Entity
```java
@Entity
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String hastaAd;
    private String hastaSoyad;
    private String hastaTelefon;
    private String hastaEmail;
    private String hastaTc;
    
    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;
    
    private LocalDate appointmentDate;
    private LocalTime appointmentTime;
    private String hizmet;
    private String notlar;
    private String status; // PENDING, CONFIRMED, CANCELLED, COMPLETED
    
    // getters and setters
}
```

### Environment Configuration

1. **Application Properties (application.yml)**
```yaml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/dental_clinic
    username: your_username
    password: your_password
  
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true

  cors:
    allowed-origins: 
      - "http://localhost:5173"  # React dev server
      - "https://your-domain.com"  # Production domain
```

2. **CORS Configuration**
```java
@Configuration
@EnableWebSecurity
public class CorsConfig {
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
```

### Error Handling

Frontend'de API hatalarını yakalamak için:

```javascript
try {
  const response = await appointmentsAPI.create(appointmentData);
  // Success handling
} catch (error) {
  if (error.response?.status === 400) {
    // Validation errors
    console.error('Validation error:', error.response.data);
  } else if (error.response?.status === 500) {
    // Server errors
    console.error('Server error:', error.response.data);
  } else {
    // Network errors
    console.error('Network error:', error.message);
  }
}
```

### Production Deployment Checklist

1. ✅ Environment variables configured (.env)
2. ✅ API base URL updated for production
3. ✅ CORS configuration set up on backend
4. ✅ Database connections configured
5. ✅ Authentication/JWT properly implemented
6. ✅ Error handling implemented
7. ✅ Loading states implemented in UI
8. ✅ Form validation implemented
9. ✅ Turkish language support completed
10. ✅ Mobile responsive design completed

### Support and Troubleshooting

Common issues and solutions:

1. **CORS Errors**: Ensure CORS is properly configured on Spring Boot backend
2. **Network Timeout**: Increase timeout settings in axios configuration
3. **Authentication Issues**: Check JWT token expiration and refresh logic
4. **Turkish Characters**: Ensure UTF-8 encoding in both frontend and backend