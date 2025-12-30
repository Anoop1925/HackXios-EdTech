# Script to add all environment variables to Vercel
# Run this from the Eduverse directory

Write-Host "Adding environment variables to Vercel..." -ForegroundColor Green

# Function to add env var
function Add-VercelEnv {
    param (
        [string]$Name,
        [string]$Value,
        [string]$Environment = "production"
    )
    
    Write-Host "Adding $Name to $Environment..." -ForegroundColor Cyan
    echo $Value | vercel env add $Name $Environment
}

# NextAuth
Add-VercelEnv "NEXTAUTH_SECRET" "dt4dBj9rQRrI88t7NjCpuUVAczGWYi9Z9LxxtWzA6Rk="
Add-VercelEnv "NEXTAUTH_URL" "https://padhaku-learning-reimagined.vercel.app"

# Google OAuth
Add-VercelEnv "GOOGLE_CLIENT_ID" "1005800343234-empcr4bda0s1dgj5ngace9anej039s44.apps.googleusercontent.com"
Add-VercelEnv "GOOGLE_CLIENT_SECRET" "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"

# Database
Add-VercelEnv "DATABASE_URL" "postgresql://postgres:I_am_awesome_@161923@db.ospnnykxlcskxsosnwpt.supabase.co:5432/postgres"

# Supabase
Add-VercelEnv "NEXT_PUBLIC_SUPABASE_URL" "https://ospnnykxlcskxsosnwpt.supabase.co"
Add-VercelEnv "NEXT_PUBLIC_SUPABASE_ANON_KEY" "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zcG5ueWt4bGNza3hzb3Nud3B0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0OTM3MzYsImV4cCI6MjA3NzA2OTczNn0.4CRzxzt5xguHB5llCsovg0wE1pczKkmsYZCPVZ591qU"

# AI APIs
Add-VercelEnv "GEMINI_API_KEY" "AIzaSyAdCNk20VR1j0nQ9Iigc8BQqReEyncYRGY"
Add-VercelEnv "YOUTUBE_API_KEY" "AIzaSyCnoYFJplPauyPDWiFy7WUt5-7CP4Wl8ZU"

# Vapi
Add-VercelEnv "NEXT_PUBLIC_VAPI_PUBLIC_KEY" "1a37dbb8-4f41-4ba9-a6fc-1bfc79511a6a"
Add-VercelEnv "NEXT_PUBLIC_VAPI_ASSISTANT_ID" "b350ccaa-7ae0-43fa-af46-f2d40bfd9828"

# Pixabay
Add-VercelEnv "PIXABAY_API_KEY" "53271752-e19c9a583c91cf2717db8b0e2"

# Python Backend
Add-VercelEnv "NEXT_PUBLIC_PYTHON_BACKEND_URL" "http://localhost:5000"

Write-Host "`nAll environment variables added successfully!" -ForegroundColor Green
Write-Host "Note: Update NEXT_PUBLIC_PYTHON_BACKEND_URL after deploying to Railway" -ForegroundColor Yellow
