@echo off
echo Starting Magic Learn Backend...

REM Get the directory where this batch file is located
cd /d "%~dp0"

REM Activate virtual environment from root folder (3 levels up)
echo Activating virtual environment...
call ..\..\..\..\..\venv\Scripts\activate.bat

REM Verify Python is available
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not available in virtual environment
    pause
    exit /b 1
)

REM Check if required packages are installed, install if missing
echo Checking dependencies...
python -c "import flask, flask_cors, google.generativeai, cv2, mediapipe, PIL, dotenv" >nul 2>&1
if errorlevel 1 (
    echo Installing missing dependencies...
    pip install -q -r requirements.txt
)

REM Start the Flask backend server
echo Starting Flask server on http://localhost:5000
python magic_learn_backend.py
