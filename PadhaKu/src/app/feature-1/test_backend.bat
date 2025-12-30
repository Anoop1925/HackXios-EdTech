@echo off
echo ===================================
echo Magic Learn Backend Test
echo ===================================
echo.

echo [1] Checking Python installation...
python --version
if %errorlevel% neq 0 (
    echo ERROR: Python not found!
    echo Please install Python from https://python.org
    pause
    exit /b 1
)
echo OK: Python is installed
echo.

echo [2] Checking if port 5000 is available...
netstat -ano | findstr :5000
if %errorlevel% equ 0 (
    echo WARNING: Port 5000 is already in use
    echo Another process might be running on this port
    echo.
) else (
    echo OK: Port 5000 is available
    echo.
)

echo [3] Checking .env file...
if exist ".env" (
    echo OK: .env file found
) else (
    echo ERROR: .env file not found!
    echo Please create .env with your API keys
    pause
    exit /b 1
)
echo.

echo [4] Testing backend startup...
echo Starting backend server...
echo Press Ctrl+C to stop the test server
echo.
python magic_learn_backend.py

pause
