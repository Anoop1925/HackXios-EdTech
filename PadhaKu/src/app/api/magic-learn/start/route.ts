import { NextResponse } from 'next/server';

// Railway backend URL
const BACKEND_URL = process.env.NEXT_PUBLIC_PYTHON_BACKEND_URL || 'https://magic-learn-production.up.railway.app';

// Function to check if Magic Learn backend is responding
async function isBackendHealthy(): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(`${BACKEND_URL}/health`, {
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    console.error('Backend health check failed:', error);
    return false;
  }
}


export async function POST() {
  try {
    // Check if Railway backend is running
    const isHealthy = await isBackendHealthy();
    
    if (isHealthy) {
      console.log('Railway backend is running');
      return NextResponse.json({ 
        success: true, 
        message: 'Magic Learn backend is running on Railway',
        url: BACKEND_URL
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: 'Railway backend is not responding. Please check Railway deployment.',
        url: BACKEND_URL
      }, { status: 503 });
    }
  } catch (error: any) {
    console.error('Error checking Railway backend:', error);
    return NextResponse.json({ 
      success: false, 
      message: error.message || 'Failed to connect to Railway backend'
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const isHealthy = await isBackendHealthy();
    
    return NextResponse.json({ 
      running: isHealthy,
      url: isHealthy ? BACKEND_URL : null
    });
  } catch (error: any) {
    return NextResponse.json({ 
      running: false,
      error: error.message
    }, { status: 500 });
  }
}

// PUT - Heartbeat endpoint (no-op for Railway, backend is always running)
export async function PUT() {
  return NextResponse.json({ 
    success: true, 
    message: 'Railway backend is always running'
  });
}

// DELETE - Not applicable for Railway (backend is always running)
export async function DELETE() {
  return NextResponse.json({ 
    success: true, 
    message: 'Railway backend cannot be stopped from frontend' 
  });
}
