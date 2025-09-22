@echo off
echo ========================================
echo    Diş Kliniği Randevu Sistemi
echo    Premium Professional System
echo ========================================
echo.

echo Checking Java installation...
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Java is not installed or not in PATH
    echo Please install Java 17 or higher
    pause
    exit /b 1
)

echo Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js 16 or higher
    pause
    exit /b 1
)

echo.
echo All prerequisites satisfied!
echo.

echo ========================================
echo Please ensure MySQL is running and:
echo 1. Database 'dis_klinik' exists
echo 2. Username: root, Password: password
echo 3. MySQL is running on localhost:3306
echo ========================================
echo.
pause

echo Starting backend server...
start "Backend Server" cmd /k "cd backend && mvnw.cmd spring-boot:run"

echo Waiting for backend to start...
timeout /t 10 /nobreak >nul

echo Starting frontend development server...
start "Frontend Server" cmd /k "cd frontend && npm install && npm run dev"

echo.
echo ========================================
echo System is starting up...
echo.
echo Backend: http://localhost:8080/api
echo Frontend: http://localhost:3000
echo.
echo Default login credentials:
echo Admin: admin / admin123
echo Doctor: ayse.kaya@disklinik.com / doctor123
echo ========================================
echo.
echo Press any key to exit this window...
pause >nul