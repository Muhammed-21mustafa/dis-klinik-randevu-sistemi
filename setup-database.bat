@echo off
echo ========================================
echo   MySQL Database Setup
echo   Professional Dental Clinic System
echo ========================================
echo.

echo Connecting to MySQL and creating database...
mysql -u root -pM@stermind.21 -e "CREATE DATABASE IF NOT EXISTS dis_klinik CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

if %errorlevel% equ 0 (
    echo ✅ Database 'dis_klinik' created successfully
    echo ✅ Character set: utf8mb4 (supports Turkish characters)
) else (
    echo ❌ Error creating database
    echo Please check if MySQL is running and password is correct
)

echo.
echo ========================================
echo Database setup completed!
echo ========================================
pause