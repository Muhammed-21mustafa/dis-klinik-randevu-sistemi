# MySQL Database Setup

## Prerequisites
1. Install MySQL Server 8.0 or higher
2. Create a database named `dis_klinik`
3. Update the database credentials in `backend/src/main/resources/application.properties`

## Default Database Configuration
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/dis_klinik?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=password
```

## Installation and Setup

### Backend (Spring Boot)
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```
   Or on Windows:
   ```bash
   mvnw.cmd spring-boot:run
   ```

3. The backend will start on http://localhost:8080

### Frontend (React + Vite)
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The frontend will start on http://localhost:3000

## Default Login Credentials

### Admin Login
- **Username:** admin
- **Password:** admin123

### Doctor Login (Sample)
- **Email:** ayse.kaya@disklinik.com
- **Password:** doctor123

## Features

### Patient Interface (Public)
- ✅ Modern homepage with clinic information
- ✅ Services page with all dental specializations
- ✅ Doctors page with filtering by specialization
- ✅ Online appointment booking system
- ✅ Appointment search functionality
- ✅ Patient reviews display

### Admin Panel
- ✅ JWT-based authentication
- ✅ Doctor management (add/remove doctors)
- ✅ View all appointments and patients
- ✅ Invoice management and revenue tracking
- ✅ Review moderation system
- ✅ System statistics dashboard

### Doctor Panel
- ✅ JWT-based authentication
- ✅ Profile management (specialization, experience, fees)
- ✅ View personal appointments and patients
- ✅ Personal invoice and earnings tracking
- ✅ Password change functionality
- ✅ Email-based password reset

### Technical Features
- ✅ Spring Security with JWT authentication
- ✅ MySQL database with JPA/Hibernate
- ✅ RESTful API design
- ✅ Responsive React frontend with Tailwind CSS
- ✅ Framer Motion animations
- ✅ Professional UI/UX design
- ✅ Email integration for password reset
- ✅ Appointment conflict prevention
- ✅ Professional Turkish language interface

## API Endpoints

### Public Endpoints
- `GET /api/doctors/public` - Get all doctors
- `GET /api/doctors/public/uzmanlik/{specialty}` - Get doctors by specialty
- `POST /api/appointments/public` - Create appointment
- `GET /api/appointments/public/patient` - Search patient appointments
- `GET /api/reviews/public` - Get approved reviews
- `POST /api/reviews/public` - Submit review

### Authentication
- `POST /api/auth/login` - Admin/Doctor login
- `POST /api/auth/reset-password` - Password reset

### Admin Endpoints (Requires ADMIN role)
- `GET /api/admin/doctors` - Manage doctors
- `GET /api/admin/appointments` - View all appointments
- `GET /api/admin/invoices` - Manage invoices
- `GET /api/admin/reviews` - Moderate reviews
- `GET /api/admin/statistics/summary` - System statistics

### Doctor Endpoints (Requires DOCTOR role)
- `GET /api/doctors/profile` - Get doctor profile
- `PUT /api/doctors/profile/{id}` - Update profile
- `GET /api/appointments/doctor/{id}` - Get doctor appointments
- `GET /api/invoices/doctor/{id}` - Get doctor invoices

## Database Schema

### Tables
- `doctors` - Doctor information and credentials
- `appointments` - Patient appointments
- `invoices` - Billing information (auto-generated)
- `admin` - Admin users
- `reviews` - Patient reviews (moderated)

### Sample Data
The application automatically creates sample data including:
- 8 specialist doctors across different fields
- Sample patient reviews
- Default admin account

## Technologies Used

### Backend
- **Spring Boot 3.2.0** - Main framework
- **Spring Security** - Authentication and authorization
- **Spring Data JPA** - Database operations
- **MySQL 8.0** - Database
- **JWT** - Token-based authentication
- **JavaMail** - Email functionality

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework
- **Framer Motion** - Animations
- **React Router** - Navigation
- **Axios** - HTTP client
- **Lucide React** - Icons

## Professional Features

This dental clinic system includes enterprise-level features:

1. **Security**: JWT authentication, role-based access control
2. **User Experience**: Modern, responsive design with smooth animations
3. **Functionality**: Complete appointment management, automatic invoicing
4. **Scalability**: Modular architecture, RESTful API design
5. **Maintainability**: Clean code structure, separation of concerns
6. **Professional UI**: Corporate design suitable for medical institutions

The system is production-ready and can be deployed to any cloud platform or on-premises server.