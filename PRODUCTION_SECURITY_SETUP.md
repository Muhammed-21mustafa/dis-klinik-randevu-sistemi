# 🔐 Production Security Setup Guide

## CRITICAL: Default Credentials Security Issue

Your application currently creates default credentials that are **NOT SECURE** for production use:

### Current Default Credentials (CHANGE IMMEDIATELY)
- **Admin Username:** `admin`
- **Admin Password:** `admin123`

### Doctor Default Credentials (CHANGE IMMEDIATELY)
- **Dr. Ayşe Kaya:** `ayse.kaya@disklinik.com` / `doctor123`
- **Dr. Mehmet Yılmaz:** `mehmet.yilmaz@disklinik.com` / `doctor123`

## 🛠️ IMMEDIATE ACTIONS REQUIRED

### 1. Disable Default Admin Creation in Production

Update `DataInitializer.java`:

```java
@Override
public void run(String... args) throws Exception {
    // Only create default data in development environment
    if (Arrays.asList(environment.getActiveProfiles()).contains("dev")) {
        createDefaultAdmin();
        createSampleDoctors();
        createSampleReviews();
    }
}
```

### 2. Create Production Admin via Command Line

Add this method to your AdminService:

```java
@Component
public class AdminSetupService {
    
    @Autowired
    private AdminService adminService;
    
    @EventListener(ApplicationReadyEvent.class)
    public void setupProductionAdmin() {
        if (Arrays.asList(environment.getActiveProfiles()).contains("prod") && 
            adminService.getAllAdmins().isEmpty()) {
            
            Scanner scanner = new Scanner(System.in);
            System.out.print("Create admin username: ");
            String username = scanner.nextLine();
            
            System.out.print("Create admin password: ");
            String password = scanner.nextLine();
            
            Admin admin = new Admin(username, password);
            adminService.createAdmin(admin);
            System.out.println("Production admin created successfully!");
        }
    }
}
```

### 3. Environment-Based Configuration

Create `application-prod.yml`:

```yaml
app:
  security:
    create-default-users: false
    password-strength: STRONG
    jwt:
      expiration: 3600000  # 1 hour
      secret: ${JWT_SECRET_KEY}  # From environment variable

spring:
  profiles:
    active: prod
```

### 4. Password Policy Implementation

Add password validation:

```java
@Component
public class PasswordValidator {
    
    public boolean isValidPassword(String password) {
        return password.length() >= 12 &&
               password.matches(".*[A-Z].*") &&
               password.matches(".*[a-z].*") &&
               password.matches(".*[0-9].*") &&
               password.matches(".*[!@#$%^&*()].*");
    }
}
```

## 📊 Database Security Checklist

### MySQL Production Configuration

```sql
-- Create dedicated database user
CREATE USER 'dis_klinik_user'@'localhost' IDENTIFIED BY 'STRONG_PASSWORD_HERE';
GRANT SELECT, INSERT, UPDATE, DELETE ON dis_klinik.* TO 'dis_klinik_user'@'localhost';
FLUSH PRIVILEGES;

-- Remove default/test users
DROP USER IF EXISTS ''@'localhost';
DROP USER IF EXISTS ''@'%';
DROP USER IF EXISTS 'root'@'%';
```

### Environment Variables Required

```bash
# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=dis_klinik
DB_USERNAME=dis_klinik_user
DB_PASSWORD=your_secure_database_password

# Security
JWT_SECRET_KEY=your_very_long_and_secure_jwt_secret_key_here
BCRYPT_ROUNDS=12

# Admin Setup
ADMIN_EMAIL=admin@yourdentalsomething.com
ADMIN_INITIAL_PASSWORD=generate_this_securely
```

## 🏥 Production Deployment Security

### 1. SSL/TLS Configuration
- **HTTPS Only** - No HTTP access allowed
- Valid SSL certificate from trusted CA
- HTTP to HTTPS redirect mandatory

### 2. Database Security
- Separate database user with minimal privileges
- Regular password rotation
- Database connection encryption
- Regular security updates

### 3. Application Security
- Remove all default/sample data in production
- Implement account lockout after failed attempts
- Enable audit logging for all admin actions
- Regular security vulnerability scans

### 4. Server Security
- Firewall configuration
- Regular OS security updates
- Intrusion detection system
- Backup encryption

## 🚨 IMMEDIATE TODO BEFORE PRODUCTION

1. [ ] Change all default passwords
2. [ ] Disable default user creation in production
3. [ ] Configure environment-specific profiles
4. [ ] Set up secure database connection
5. [ ] Configure HTTPS/SSL
6. [ ] Implement password policy
7. [ ] Set up audit logging
8. [ ] Configure backup strategy
9. [ ] Security penetration testing
10. [ ] Staff security training

## 📞 Emergency Access Recovery

Document secure procedures for:
- Admin password reset
- Database access recovery
- System restoration procedures
- Contact information for technical support

---

**REMEMBER:** Never share actual production credentials in documentation, code, or chat messages. Always use environment variables and secure credential management systems.