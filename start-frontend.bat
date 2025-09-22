@echo off
echo ========================================
echo    Starting Frontend Server
echo    Professional Dental Clinic System
echo ========================================
echo.

cd /d "C:\Users\musta\OneDrive\Desktop\web sitesi\frontend"

echo Installing dependencies...
npm install

echo.
echo Starting development server...
npm run dev

echo.
echo Frontend server started at: http://localhost:3000
echo.
pause