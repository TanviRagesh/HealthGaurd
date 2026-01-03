@echo off
REM HealthGuard AI Startup Script for Windows

echo 🏥 Starting HealthGuard AI...

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed. Please install Python 3.9+ first.
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

REM Start backend
echo 📦 Starting backend server...
cd backend
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

call venv\Scripts\activate.bat

if not exist "requirements.txt" (
    echo ❌ requirements.txt not found in backend directory
    pause
    exit /b 1
)

pip install -r requirements.txt >nul 2>&1

echo 🚀 Starting Flask backend on http://localhost:5000
start "HealthGuard Backend" cmd /k "python app.py"

cd ..

REM Start frontend
echo 📦 Starting frontend server...
if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
)

echo 🚀 Starting Vite frontend on http://localhost:5173
start "HealthGuard Frontend" cmd /k "npm run dev"

echo.
echo ✅ HealthGuard AI is running!
echo    Backend:  http://localhost:5000
echo    Frontend: http://localhost:5173
echo.
echo Close the command windows to stop the servers.
pause

