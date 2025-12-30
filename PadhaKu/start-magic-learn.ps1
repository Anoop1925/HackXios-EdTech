# Magic Learn Backend Startup Script

Write-Host "🚀 Starting Magic Learn Backend..." -ForegroundColor Cyan
Write-Host ""

# Check if in correct directory
if (!(Test-Path ".\backend_api.py")) {
    Write-Host "⚠️  Please run this script from the feature-1 directory" -ForegroundColor Yellow
    Write-Host "   cd .\Eduverse\src\app\feature-1\" -ForegroundColor Yellow
    exit 1
}

# Check if virtual environment exists
if (!(Test-Path ".\venv")) {
    Write-Host "📦 Creating virtual environment..." -ForegroundColor Green
    python -m venv venv
}

# Activate virtual environment
Write-Host "🔧 Activating virtual environment..." -ForegroundColor Green
.\venv\Scripts\Activate.ps1

# Install/update dependencies
Write-Host "📥 Installing dependencies..." -ForegroundColor Green
pip install -r requirements.txt --quiet

# Start the backend
Write-Host ""
Write-Host "✨ Starting Flask Backend on http://localhost:5000" -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 Access Magic Learn at: http://localhost:3000/magic-learn" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

python backend_api.py
