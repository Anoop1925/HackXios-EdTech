import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { imageData } = await request.json();
    
    // Call Flask backend on port 5000
    const response = await fetch('http://localhost:5000/api/analyze-drawing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageData }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error analyzing drawing:', error);
    return NextResponse.json(
      { error: 'Failed to analyze drawing' },
      { status: 500 }
    );
  }
}
