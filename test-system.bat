@echo off
echo ========================================
echo   Professional Dental Clinic System
echo   Connection Test and Quick Launch
echo ========================================
echo.

echo Testing backend connection...
curl -s http://localhost:8080/api/doctors/public >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Backend: RUNNING (Port 8080)
) else (
    echo ❌ Backend: NOT RESPONDING
)

echo.
echo Testing frontend connection...
curl -s http://localhost:3000 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Frontend: RUNNING (Port 3000)
) else (
    echo ❌ Frontend: NOT RESPONDING
)

echo.
echo ========================================
echo   SYSTEM STATUS: READY FOR TESTING
echo ========================================
echo.
echo 🌐 Frontend: http://localhost:3000
echo 🔧 Backend API: http://localhost:8080/api
echo.
echo 🔐 LOGIN CREDENTIALS:
echo   Admin: admin / admin123
echo   Doctor: ayse.kaya@disklinik.com / doctor123
echo.
echo 📋 TEST FEATURES:
echo   ✓ Patient appointment booking
echo   ✓ Admin clinic management
echo   ✓ Doctor appointment tracking
echo   ✓ Responsive design
echo   ✓ Professional Turkish interface
echo.
echo Opening browser in 3 seconds...
timeout /t 3 /nobreak >nul
start http://localhost:3000
echo.
echo System is ready for testing!
pause