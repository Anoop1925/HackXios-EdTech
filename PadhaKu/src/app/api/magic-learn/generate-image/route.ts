import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { topic } = await request.json();

    if (!topic) {
      return NextResponse.json(
        { success: false, error: 'Topic is required' },
        { status: 400 }
      );
    }

    // Extract the main topic name
    const topicName = topic.split('-').pop()?.trim() || topic.split(':').pop()?.trim() || topic.trim();
    
    // Create a strictly visual-only prompt - ZERO TEXT ALLOWED
    const imagePrompt = `Visual diagram of ${topicName}. IMPORTANT: ABSOLUTELY NO TEXT, NO WORDS, NO LETTERS, NO LABELS, NO TITLES - NOT EVEN THE TOPIC NAME. Show the complete process ONLY through pure visuals: arrows, symbols, icons, colors, shapes, and visual flow. Zero written language. Pure visual storytelling without any text elements. Professional infographic style, 16:9 widescreen 1408x792 pixels`;
    
    // Encode the prompt for URL
    const encodedPrompt = encodeURIComponent(imagePrompt);
    
    // Generate image URL using Pollinations AI (no API key needed)
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1408&height=792&nologo=true`;

    return NextResponse.json({
      success: true,
      imageUrl: imageUrl,
    });

  } catch (error: any) {
    console.error('Image generation error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
